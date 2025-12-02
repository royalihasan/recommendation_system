"""Import Netflix dataset into the database."""
import pandas as pd
import sqlite3
from pathlib import Path
import sys

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).parent.parent))

def clean_value(value):
    """Clean and validate CSV values."""
    if pd.isna(value) or value == '' or value == 'nan':
        return None
    return str(value).strip()

def parse_genres(genre_str):
    """Parse genre string into comma-separated format."""
    if not genre_str:
        return None
    # Split by comma and clean
    genres = [g.strip() for g in str(genre_str).split(',')]
    return ','.join(genres[:3])  # Limit to 3 genres

def import_netflix_data():
    """Import Netflix dataset from CSV to SQLite database."""
    
    # Paths
    base_dir = Path(__file__).parent.parent
    csv_path = base_dir / 'data' / 'NetflixDataset.csv'
    db_path = base_dir / 'data' / 'database.db'
    
    print(f"📂 Reading Netflix dataset from: {csv_path}")
    
    # Read CSV with proper encoding handling
    try:
        # Try utf-8 first
        df = pd.read_csv(csv_path, encoding='utf-8')
        print(f"✓ Loaded {len(df)} records from CSV (utf-8)")
    except UnicodeDecodeError:
        try:
            # Try latin-1 encoding
            df = pd.read_csv(csv_path, encoding='latin-1')
            print(f"✓ Loaded {len(df)} records from CSV (latin-1)")
        except Exception as e2:
            try:
                # Try cp1252 encoding
                df = pd.read_csv(csv_path, encoding='cp1252')
                print(f"✓ Loaded {len(df)} records from CSV (cp1252)")
            except Exception as e3:
                print(f"❌ Error reading CSV with all encodings: {e3}")
                return
    except Exception as e:
        print(f"❌ Error reading CSV: {e}")
        return
    
    # Connect to database
    print(f"📊 Connecting to database: {db_path}")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Drop existing movies table and recreate
    cursor.execute("DROP TABLE IF EXISTS movies")
    cursor.execute("DROP TABLE IF EXISTS ratings")
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS movies (
            movie_id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            release_date TEXT,
            genres TEXT,
            avg_rating REAL DEFAULT 0.0,
            rating_count INTEGER DEFAULT 0,
            image_url TEXT,
            summary TEXT,
            director TEXT,
            actors TEXT,
            imdb_score REAL,
            runtime TEXT,
            type TEXT,
            tags TEXT,
            languages TEXT,
            view_rating TEXT
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ratings (
            rating_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            movie_id INTEGER NOT NULL,
            rating REAL NOT NULL,
            timestamp INTEGER,
            FOREIGN KEY (movie_id) REFERENCES movies (movie_id)
        )
    """)
    
    print("✓ Database tables created")
    
    # Import movies
    imported = 0
    skipped = 0
    
    for idx, row in df.iterrows():
        try:
            # Extract and clean data
            title = clean_value(row.get('Title'))
            if not title:
                skipped += 1
                continue
            
            # Parse IMDb score
            imdb_score = row.get('IMDb Score')
            try:
                imdb_score = float(imdb_score) if pd.notna(imdb_score) else None
            except:
                imdb_score = None
            
            # Parse rating count from IMDb Votes
            imdb_votes = row.get('IMDb Votes')
            try:
                rating_count = int(float(imdb_votes)) if pd.notna(imdb_votes) else 0
            except:
                rating_count = 0
            
            movie_data = {
                'movie_id': idx + 1,
                'title': title,
                'release_date': clean_value(row.get('Release Date')),
                'genres': parse_genres(row.get('Genre')),
                'avg_rating': imdb_score if imdb_score else 0.0,
                'rating_count': rating_count,
                'image_url': clean_value(row.get('Image')),
                'summary': clean_value(row.get('Summary')),
                'director': clean_value(row.get('Director')),
                'actors': clean_value(row.get('Actors')),
                'imdb_score': imdb_score,
                'runtime': clean_value(row.get('Runtime')),
                'type': clean_value(row.get('Series or Movie')),
                'tags': clean_value(row.get('Tags')),
                'languages': clean_value(row.get('Languages')),
                'view_rating': clean_value(row.get('View Rating'))
            }
            
            cursor.execute("""
                INSERT INTO movies (
                    movie_id, title, release_date, genres, avg_rating, rating_count,
                    image_url, summary, director, actors, imdb_score, runtime,
                    type, tags, languages, view_rating
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                movie_data['movie_id'],
                movie_data['title'],
                movie_data['release_date'],
                movie_data['genres'],
                movie_data['avg_rating'],
                movie_data['rating_count'],
                movie_data['image_url'],
                movie_data['summary'],
                movie_data['director'],
                movie_data['actors'],
                movie_data['imdb_score'],
                movie_data['runtime'],
                movie_data['type'],
                movie_data['tags'],
                movie_data['languages'],
                movie_data['view_rating']
            ))
            
            imported += 1
            
            if imported % 1000 == 0:
                print(f"  Imported {imported} movies...")
                
        except Exception as e:
            print(f"  Warning: Error importing row {idx}: {e}")
            skipped += 1
            continue
    
    conn.commit()
    print(f"\n✅ Import complete!")
    print(f"  Imported: {imported} movies")
    print(f"  Skipped: {skipped} records")
    
    # Show sample
    print(f"\n📋 Sample of imported data:")
    cursor.execute("SELECT movie_id, title, imdb_score, type, image_url FROM movies LIMIT 5")
    for row in cursor.fetchall():
        print(f"  ID: {row[0]}, Title: {row[1]}, Score: {row[2]}, Type: {row[3]}, Has Image: {'Yes' if row[4] else 'No'}")
    
    conn.close()
    print(f"\n🎉 Database ready at: {db_path}")

if __name__ == "__main__":
    import_netflix_data()
