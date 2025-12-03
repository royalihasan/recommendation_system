/**
 * About/Demo Presentation - Netflix-style slides explaining the recommendation system
 */
import { useState, useEffect } from 'react';
import './About.css';

const About = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        // Slide 1: Title
        {
            id: 0,
            title: "Movie Recommendation System",
            subtitle: "AI-Powered Collaborative Filtering with SVD Algorithm",
            content: (
                <div className="title-slide">
                    <div className="title-emoji">🎬</div>
                    <h1 className="main-title">MovieRec</h1>
                    <p className="main-subtitle">Netflix-Style Recommendation Engine</p>
                    <div className="title-badges">
                        <span className="badge">Machine Learning</span>
                        <span className="badge">FastAPI</span>
                        <span className="badge">React</span>
                    </div>
                    <p className="university-info">University Demo Project - 2025</p>
                </div>
            )
        },

        // Slide 2: Problem Statement
        {
            id: 1,
            title: "Problem Statement",
            subtitle: "Why do we need recommendation systems?",
            content: (
                <div className="content-slide">
                    <div className="problem-grid">
                        <div className="problem-card">
                            <div className="problem-icon">📚</div>
                            <h3>Information Overload</h3>
                            <p>1,682 movies - users can't browse them all</p>
                        </div>
                        <div className="problem-card">
                            <div className="problem-icon">⏱️</div>
                            <h3>Time Constraint</h3>
                            <p>Users want relevant suggestions quickly</p>
                        </div>
                        <div className="problem-card">
                            <div className="problem-icon">🎯</div>
                            <h3>Personalization</h3>
                            <p>Each user has unique preferences</p>
                        </div>
                        <div className="problem-card">
                            <div className="problem-icon">📈</div>
                            <h3>Business Value</h3>
                            <p>Increase engagement and user satisfaction</p>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 3: Solution Overview
        {
            id: 2,
            title: "Our Solution",
            subtitle: "Collaborative Filtering with SVD Algorithm",
            content: (
                <div className="content-slide">
                    <div className="solution-box">
                        <h3>🤖 Machine Learning Approach</h3>
                        <p className="solution-desc">
                            We use <strong>Singular Value Decomposition (SVD)</strong> - a matrix factorization technique
                            that predicts user preferences by analyzing patterns in historical rating data.
                        </p>
                    </div>
                    <div className="features-grid-3">
                        <div className="feature-item">
                            <div className="feature-number">9.4K</div>
                            <p>Movies & Shows</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-number">22</div>
                            <p>Data Fields</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-number">Netflix</div>
                            <p>Dataset Source</p>
                        </div>
                    </div>
                    <div className="accuracy-banner">
                        <span className="accuracy-label">Model Accuracy:</span>
                        <span className="accuracy-value">RMSE: 0.9361 | MAE: 0.7381</span>
                    </div>
                </div>
            )
        },

        // Slide 4: SVD Theory
        {
            id: 3,
            title: "SVD Algorithm - Theory",
            subtitle: "How collaborative filtering works",
            content: (
                <div className="content-slide">
                    <div className="theory-section">
                        <h3>Matrix Factorization</h3>
                        <div className="formula-box">
                            <code>R ≈ U × Σ × V<sup>T</sup></code>
                        </div>
                        <p className="formula-explanation">
                            Rating Matrix ≈ User Features × Strengths × Movie Features
                        </p>
                    </div>

                    <div className="theory-steps">
                        <div className="theory-step">
                            <div className="step-num">1</div>
                            <div className="step-content">
                                <h4>User-Item Matrix</h4>
                                <p>Create sparse matrix of user ratings</p>
                            </div>
                        </div>
                        <div className="theory-step">
                            <div className="step-num">2</div>
                            <div className="step-content">
                                <h4>Decomposition</h4>
                                <p>Extract 100 latent factors (hidden patterns)</p>
                            </div>
                        </div>
                        <div className="theory-step">
                            <div className="step-num">3</div>
                            <div className="step-content">
                                <h4>Prediction</h4>
                                <p>Estimate missing ratings using learned factors</p>
                            </div>
                        </div>
                    </div>

                    <div className="info-box">
                        <strong>Key Insight:</strong> SVD discovers hidden preferences (e.g., "action lover", "romance fan")
                        without explicit genre information!
                    </div>
                </div>
            )
        },

        // Slide 4.5: SVD Matrix Example - Visual Walkthrough
        {
            id: 3.5,
            title: "SVD in Action - Matrix Example",
            subtitle: "Step-by-step recommendation with real data",
            content: (
                <div className="content-slide">
                    <div className="matrix-example-section">
                        <h3>📊 Step 1: Original Rating Matrix (R)</h3>
                        <p style={{textAlign: 'center', color: '#999', marginBottom: '1rem'}}>
                            Users × Movies | ? = Missing ratings we want to predict
                        </p>
                        <div className="matrix-container">
                            <table className="matrix-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Matrix</th>
                                        <th>Inception</th>
                                        <th>Titanic</th>
                                        <th>Toy Story</th>
                                        <th>The Godfather</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Alice</strong></td>
                                        <td>5</td>
                                        <td>5</td>
                                        <td>2</td>
                                        <td className="missing">?</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bob</strong></td>
                                        <td>4</td>
                                        <td className="missing">?</td>
                                        <td>3</td>
                                        <td>4</td>
                                        <td>5</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Carol</strong></td>
                                        <td className="missing">?</td>
                                        <td>5</td>
                                        <td>5</td>
                                        <td>1</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Dave</strong></td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td className="missing">?</td>
                                        <td>5</td>
                                        <td>2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="matrix-example-section" style={{marginTop: '2rem'}}>
                        <h3>🔬 Step 2: SVD Decomposition</h3>
                        <div className="svd-decomposition">
                            <div className="matrix-box">
                                <h4>U Matrix</h4>
                                <p>User Features</p>
                                <div className="code-box" style={{fontSize: '0.8rem'}}>
                                    <code>Alice: [0.8, -0.3]</code><br/>
                                    <code>Bob: [0.6, 0.2]</code><br/>
                                    <code>Carol: [-0.5, 0.7]</code><br/>
                                    <code>Dave: [0.3, 0.4]</code>
                                </div>
                                <small style={{color: '#4ade80'}}>Action/Sci-fi lover → Drama fan</small>
                            </div>

                            <div className="matrix-operator">×</div>

                            <div className="matrix-box">
                                <h4>Σ Matrix</h4>
                                <p>Importance</p>
                                <div className="code-box" style={{fontSize: '0.8rem'}}>
                                    <code>[12.5, 0]</code><br/>
                                    <code>[0, 8.3]</code>
                                </div>
                                <small style={{color: '#4ade80'}}>Factor strengths</small>
                            </div>

                            <div className="matrix-operator">×</div>

                            <div className="matrix-box">
                                <h4>V<sup>T</sup> Matrix</h4>
                                <p>Movie Features</p>
                                <div className="code-box" style={{fontSize: '0.8rem'}}>
                                    <code>Matrix: [0.7, -0.4]</code><br/>
                                    <code>Inception: [0.8, -0.3]</code><br/>
                                    <code>Titanic: [-0.6, 0.8]</code><br/>
                                    <code>Toy Story: [0.5, 0.3]</code><br/>
                                    <code>Godfather: [0.6, 0.1]</code>
                                </div>
                                <small style={{color: '#4ade80'}}>Genre characteristics</small>
                            </div>
                        </div>
                    </div>

                    <div className="matrix-example-section" style={{marginTop: '2rem'}}>
                        <h3>🎯 Step 3: Predict Missing Rating</h3>
                        <div className="prediction-box">
                            <div className="prediction-calc">
                                <strong style={{color: '#e50914'}}>Example: Predict Alice's rating for "Toy Story"</strong><br/><br/>
                                <div className="code-box" style={{textAlign: 'left', padding: '1.5rem', fontSize: '0.9rem'}}>
                                    <code style={{color: '#999'}}>Alice's features: </code>
                                    <code style={{color: '#4ade80'}}>[0.8, -0.3]</code><br/>
                                    <code style={{color: '#999'}}>Toy Story features: </code>
                                    <code style={{color: '#4ade80'}}>[0.5, 0.3]</code><br/><br/>
                                    
                                    <code style={{color: '#999'}}>Prediction = </code>
                                    <code style={{color: '#fff'}}>(0.8 × 0.5) + (-0.3 × 0.3)</code><br/>
                                    <code style={{color: '#999'}}>            = </code>
                                    <code style={{color: '#fff'}}>0.40 + (-0.09)</code><br/>
                                    <code style={{color: '#999'}}>            = </code>
                                    <code style={{color: '#e50914', fontWeight: 'bold'}}>0.31 (normalized)</code><br/><br/>
                                    
                                    <code style={{color: '#999'}}>Scaled to 1-5: </code>
                                    <code style={{color: '#e50914', fontWeight: 'bold', fontSize: '1.2rem'}}>★ 2.8 / 5.0</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="matrix-example-section" style={{marginTop: '2rem'}}>
                        <h3>✅ Step 4: Generate Recommendations</h3>
                        <div className="recommendation-result">
                            <div className="result-box">
                                <strong>For Alice, SVD predicts:</strong>
                                <div className="prediction-list">
                                    <div className="pred-item high">
                                        <span>Blade Runner 2049</span>
                                        <span className="score">★ 4.9</span>
                                        <small>High sci-fi match!</small>
                                    </div>
                                    <div className="pred-item high">
                                        <span>Interstellar</span>
                                        <span className="score">★ 4.7</span>
                                        <small>Similar to her favorites</small>
                                    </div>
                                    <div className="pred-item medium">
                                        <span>The Dark Knight</span>
                                        <span className="score">★ 4.5</span>
                                        <small>Action-thriller</small>
                                    </div>
                                    <div className="pred-item low">
                                        <span>The Notebook</span>
                                        <span className="score">★ 1.8</span>
                                        <small>Romance - not recommended</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flow-note" style={{marginTop: '2rem'}}>
                        💡 <strong>Magic of SVD:</strong> It learned Alice likes sci-fi/action WITHOUT being told genres! 
                        It discovered patterns from ratings alone.
                    </div>
                </div>
            )
        },

        // Slide 5: Architecture
        {
            id: 4,
            title: "System Architecture",
            subtitle: "Full-stack ML application design",
            content: (
                <div className="content-slide">
                    <div className="architecture-flow">
                        <div className="arch-layer-card">
                            <div className="arch-icon">🎨</div>
                            <h3>Frontend Layer</h3>
                            <ul>
                                <li>React 18 + Vite</li>
                                <li>Netflix-inspired UI/UX</li>
                                <li>Context API for state</li>
                                <li>Axios for API calls</li>
                            </ul>
                        </div>
                        <div className="arch-arrow-down">⬇️</div>

                        <div className="arch-layer-card">
                            <div className="arch-icon">⚡</div>
                            <h3>Backend API</h3>
                            <ul>
                                <li>FastAPI (async)</li>
                                <li>JWT authentication</li>
                                <li>RESTful endpoints</li>
                                <li>Pydantic validation</li>
                            </ul>
                        </div>
                        <div className="arch-arrow-down">⬇️</div>

                        <div className="arch-layer-card">
                            <div className="arch-icon">🤖</div>
                            <h3>ML Engine</h3>
                            <ul>
                                <li>Surprise library (SVD)</li>
                                <li>Pre-trained model</li>
                                <li>Recommendation logic</li>
                                <li>Similarity calculations</li>
                            </ul>
                        </div>
                        <div className="arch-arrow-down">⬇️</div>

                        <div className="arch-layer-card">
                            <div className="arch-icon">💾</div>
                            <h3>Data Layer</h3>
                            <ul>
                                <li>SQLite database</li>
                                <li>SQLAlchemy ORM</li>
                                <li>Netflix dataset (9,405 movies)</li>
                                <li>Indexed queries</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 6: Dataset
        {
            id: 5,
            title: "Dataset Overview",
            subtitle: "Netflix Movies & TV Shows Dataset",
            content: (
                <div className="content-slide">
                    <div className="dataset-stats">
                        <div className="stat-card">
                            <div className="stat-number">9,405</div>
                            <div className="stat-label">Movies & Shows</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">22</div>
                            <div className="stat-label">Data Fields</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">Netflix</div>
                            <div className="stat-label">Data Source</div>
                        </div>
                    </div>

                    <div className="dataset-info">
                        <h3>📊 Netflix Dataset</h3>
                        <div className="data-sources">
                            <div className="source-item">
                                <strong>Complete Movie Metadata</strong>
                                <p>Title, Genre, Director, Actors, IMDb Score, Summary, Images</p>
                            </div>
                            <div className="source-item">
                                <strong>Rich Attributes</strong>
                                <p>Runtime, Languages, Release Date, Awards, Box Office, Tags</p>
                            </div>
                        </div>
                    </div>

                    <div className="dataset-sample">
                        <h4>Sample Netflix Data Structure</h4>
                        <div className="table-container" style={{fontSize: '0.75rem', overflowX: 'auto'}}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Genre</th>
                                        <th>Tags</th>
                                        <th>Languages</th>
                                        <th>Runtime</th>
                                        <th>Director</th>
                                        <th>Actors</th>
                                        <th>IMDb Score</th>
                                        <th>Awards Received</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Lets Fight Ghost</td>
                                        <td>Crime, Drama, Fantasy, Horror</td>
                                        <td>Comedy Programmes, Horror...</td>
                                        <td>Swedish, Spanish</td>
                                        <td>&lt; 30 min</td>
                                        <td>Tomas Alfredson</td>
                                        <td>Lina Leandersson...</td>
                                        <td>7.9</td>
                                        <td>74</td>
                                        <td>Series</td>
                                    </tr>
                                    <tr>
                                        <td>HOW TO BUILD A GIRL</td>
                                        <td>Comedy</td>
                                        <td>Dramas, Comedies, British</td>
                                        <td>English</td>
                                        <td>1-2 hour</td>
                                        <td>Coky Giedroyc</td>
                                        <td>Beanie Feldstein...</td>
                                        <td>5.8</td>
                                        <td>1</td>
                                        <td>Movie</td>
                                    </tr>
                                    <tr>
                                        <td>The Con-Heartist</td>
                                        <td>Comedy, Romance</td>
                                        <td>Romantic Comedies, Thai Films</td>
                                        <td>Thai</td>
                                        <td>&gt; 2 hrs</td>
                                        <td>Mez Tharatorn</td>
                                        <td>Nadech Kugimiya...</td>
                                        <td>7.4</td>
                                        <td>-</td>
                                        <td>Movie</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p style={{textAlign: 'center', color: '#999', fontSize: '0.9rem', marginTop: '1rem'}}>
                            <strong>All 22 fields:</strong> Title, Genre, Tags, Languages, Country, Runtime, Director, Writer, Actors, View Rating, IMDb Score, Awards Received, Awards Nominated, Box Office, Release Date, Netflix Release Date, Production House, Netflix Link, Summary, Type, IMDb Votes, Image
                        </p>
                    </div>

                    <div className="info-box">
                        <strong>Dataset Size:</strong> 9,405 entries with 22 comprehensive fields per movie/show
                    </div>
                </div>
            )
        },

        // Slide 7: Training Process
        {
            id: 6,
            title: "Model Training",
            subtitle: "How we trained the SVD model",
            content: (
                <div className="content-slide">
                    <div className="training-process">
                        <div className="training-step">
                            <div className="step-badge">Step 1</div>
                            <h4>Data Preparation</h4>
                            <ul>
                                <li>Load Netflix dataset from SQLite</li>
                                <li>Process 9,405 movies with metadata</li>
                                <li>Prepare features for SVD training</li>
                            </ul>
                        </div>

                        <div className="training-step">
                            <div className="step-badge">Step 2</div>
                            <h4>Hyperparameters</h4>
                            <div className="code-box">
                                <code>n_factors = 100</code><br />
                                <code>n_epochs = 20</code><br />
                                <code>learning_rate = 0.005</code><br />
                                <code>regularization = 0.02</code>
                            </div>
                        </div>

                        <div className="training-step">
                            <div className="step-badge">Step 3</div>
                            <h4>Training & Validation</h4>
                            <ul>
                                <li>5-fold cross-validation</li>
                                <li>RMSE & MAE metrics</li>
                                <li>Train on full dataset</li>
                                <li>Save model as pickle file</li>
                            </ul>
                        </div>
                    </div>

                    <div className="performance-box">
                        <h4>🎯 Model Performance</h4>
                        <div className="metrics-grid">
                            <div className="metric-item">
                                <div className="metric-value">0.9361</div>
                                <div className="metric-label">RMSE</div>
                                <small>Root Mean Square Error</small>
                            </div>
                            <div className="metric-item">
                                <div className="metric-value">0.7381</div>
                                <div className="metric-label">MAE</div>
                                <small>Mean Absolute Error</small>
                            </div>
                        </div>
                        <p className="performance-note">
                            ✅ Low error rates indicate high prediction accuracy!
                        </p>
                    </div>
                </div>
            )
        },

        // Slide 8: Complete System Flow
        {
            id: 7,
            title: "How Recommendations Work",
            subtitle: "End-to-end flow from user action to recommendation",
            content: (
                <div className="content-slide">
                    <div className="flow-diagram">
                        <div className="flow-step highlight">
                            <div className="flow-number">1</div>
                            <div className="flow-content">
                                <h4>User Rates Movies</h4>
                                <p>User logs in and rates movies (1-5 stars) via React frontend</p>
                            </div>
                        </div>

                        <div className="flow-step">
                            <div className="flow-number">2</div>
                            <div className="flow-content">
                                <h4>Frontend API Call</h4>
                                <p>React sends POST request to <code>/api/ratings</code> endpoint</p>
                            </div>
                        </div>

                        <div className="flow-step">
                            <div className="flow-number">3</div>
                            <div className="flow-content">
                                <h4>FastAPI Receives Request</h4>
                                <p>Backend validates JWT token and rating data</p>
                            </div>
                        </div>

                        <div className="flow-step">
                            <div className="flow-number">4</div>
                            <div className="flow-content">
                                <h4>Database Update</h4>
                                <p>SQLAlchemy saves rating to SQLite database</p>
                            </div>
                        </div>

                        <div className="flow-step">
                            <div className="flow-number">5</div>
                            <div className="flow-content">
                                <h4>Fetch Recommendations</h4>
                                <p>User requests recommendations from <code>/api/recommendations</code></p>
                            </div>
                        </div>

                        <div className="flow-step">
                            <div className="flow-number">6</div>
                            <div className="flow-content">
                                <h4>ML Model Prediction</h4>
                                <p>SVD model predicts ratings for unwatched movies</p>
                            </div>
                        </div>

                        <div className="flow-step">
                            <div className="flow-number">7</div>
                            <div className="flow-content">
                                <h4>Sort & Filter Results</h4>
                                <p>Top N movies sorted by predicted rating scores</p>
                            </div>
                        </div>

                        <div className="flow-step highlight">
                            <div className="flow-number">8</div>
                            <div className="flow-content">
                                <h4>Display to User</h4>
                                <p>React renders personalized movie recommendations</p>
                            </div>
                        </div>
                    </div>

                    <div className="flow-note">
                        ⚡ Entire flow completes in &lt;200ms for optimal user experience
                    </div>
                </div>
            )
        },

        // Slide 9: Database Schema & Interactions
        {
            id: 8,
            title: "Database Architecture",
            subtitle: "Tables, relationships & query patterns",
            content: (
                <div className="content-slide">
                    <div className="database-section">
                        <h3>📊 Database Tables</h3>
                        <div className="data-sources">
                            <div className="source-item">
                                <strong>Users Table</strong>
                                <p><code>user_id, username, email, password_hash, created_at</code></p>
                                <small>Stores user authentication & profile data</small>
                            </div>
                            <div className="source-item">
                                <strong>Movies Table</strong>
                                <p><code>movie_id, title, genres, imdb_score, director, actors, summary</code></p>
                                <small>Contains 9,405 movies with 22 metadata fields</small>
                            </div>
                            <div className="source-item">
                                <strong>Ratings Table</strong>
                                <p><code>rating_id, user_id, movie_id, rating, timestamp</code></p>
                                <small>User ratings (1-5 stars) with foreign keys to users & movies</small>
                            </div>
                        </div>
                    </div>

                    <div className="database-section" style={{marginTop: '2rem'}}>
                        <h3>🔗 Key Relationships</h3>
                        <div className="code-box" style={{textAlign: 'left', padding: '1.5rem'}}>
                            <code style={{color: '#4ade80'}}>Users</code> 
                            <code style={{color: '#999'}}> 1:N </code>
                            <code style={{color: '#e50914'}}>Ratings</code><br/>
                            <code style={{color: '#4ade80'}}>Movies</code> 
                            <code style={{color: '#999'}}> 1:N </code>
                            <code style={{color: '#e50914'}}>Ratings</code><br/><br/>
                            <small style={{color: '#999'}}>• One user can rate many movies</small><br/>
                            <small style={{color: '#999'}}>• One movie can have many ratings</small><br/>
                            <small style={{color: '#999'}}>• Indexed on user_id and movie_id for fast queries</small>
                        </div>
                    </div>

                    <div className="info-box" style={{marginTop: '1.5rem'}}>
                        <strong>Query Optimization:</strong> Database indexes on foreign keys ensure sub-10ms query times for fast recommendations
                    </div>
                </div>
            )
        },

        // Slide 10: Frontend to Backend Flow (Detailed)
        {
            id: 9,
            title: "Frontend → Backend Communication",
            subtitle: "API endpoints and request/response cycle",
            content: (
                <div className="content-slide">
                    <div className="api-section">
                        <h3>🌐 RESTful API Endpoints</h3>
                        <div className="training-process">
                            <div className="training-step">
                                <div className="step-badge" style={{background: '#10b981'}}>GET</div>
                                <h4>/api/movies</h4>
                                <p>Fetch paginated movie catalog with search/filter</p>
                                <div className="code-box" style={{fontSize: '0.85rem', marginTop: '0.5rem'}}>
                                    <code>Query: ?page=1&limit=20&search=action</code>
                                </div>
                            </div>

                            <div className="training-step">
                                <div className="step-badge" style={{background: '#3b82f6'}}>POST</div>
                                <h4>/api/ratings</h4>
                                <p>Submit user rating for a movie (requires auth)</p>
                                <div className="code-box" style={{fontSize: '0.85rem', marginTop: '0.5rem'}}>
                                    <code>{`Body: {"movie_id": 123, "rating": 5}`}</code>
                                </div>
                            </div>

                            <div className="training-step">
                                <div className="step-badge" style={{background: '#10b981'}}>GET</div>
                                <h4>/api/recommendations</h4>
                                <p>Get personalized recommendations using SVD model</p>
                                <div className="code-box" style={{fontSize: '0.85rem', marginTop: '0.5rem'}}>
                                    <code>Headers: Authorization: Bearer &lt;JWT&gt;</code>
                                </div>
                            </div>

                            <div className="training-step">
                                <div className="step-badge" style={{background: '#f59e0b'}}>POST</div>
                                <h4>/api/auth/login</h4>
                                <p>Authenticate user and receive JWT token</p>
                                <div className="code-box" style={{fontSize: '0.85rem', marginTop: '0.5rem'}}>
                                    <code>{`Body: {"username": "...", "password": "..."}`}</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="info-box" style={{marginTop: '1rem'}}>
                        <strong>Security:</strong> All protected endpoints validate JWT tokens. Passwords hashed with bcrypt. CORS enabled for frontend.
                    </div>
                </div>
            )
        },

        // Slide 11: ML Model in Action (with Example)
        {
            id: 10,
            title: "ML Model Prediction Example",
            subtitle: "Step-by-step recommendation generation",
            content: (
                <div className="content-slide">
                    <div className="example-section">
                        <h3>👤 User Profile Example</h3>
                        <div className="code-box" style={{textAlign: 'left', padding: '1.5rem'}}>
                            <strong style={{color: '#e50914'}}>User: Alice (ID: 42)</strong><br/>
                            <strong style={{color: '#4ade80'}}>Rated Movies:</strong><br/>
                            <code>• The Matrix (1999): ⭐⭐⭐⭐⭐ (5/5)</code><br/>
                            <code>• Inception (2010): ⭐⭐⭐⭐⭐ (5/5)</code><br/>
                            <code>• Interstellar (2014): ⭐⭐⭐⭐ (4/5)</code><br/>
                            <code>• Titanic (1997): ⭐⭐ (2/5)</code><br/>
                            <code>• The Notebook (2004): ⭐ (1/5)</code>
                        </div>
                    </div>

                    <div className="example-section" style={{marginTop: '1.5rem'}}>
                        <h3>🤖 SVD Model Processing</h3>
                        <div className="theory-steps">
                            <div className="theory-step">
                                <div className="step-num">1</div>
                                <div className="step-content">
                                    <h4>Pattern Recognition</h4>
                                    <p>Model identifies Alice loves sci-fi/thriller, dislikes romance</p>
                                </div>
                            </div>
                            <div className="theory-step">
                                <div className="step-num">2</div>
                                <div className="step-content">
                                    <h4>Similar Users</h4>
                                    <p>Finds users with similar taste (e.g., Bob, Carol rated same movies highly)</p>
                                </div>
                            </div>
                            <div className="theory-step">
                                <div className="step-num">3</div>
                                <div className="step-content">
                                    <h4>Predict Ratings</h4>
                                    <p>For unwatched movies, calculate predicted rating using latent factors</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="example-section" style={{marginTop: '1.5rem'}}>
                        <h3>🎬 Top Recommendations</h3>
                        <div className="table-container" style={{fontSize: '0.9rem'}}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Movie</th>
                                        <th>Predicted Rating</th>
                                        <th>Why?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{background: 'rgba(229, 9, 20, 0.1)'}}>
                                        <td>Blade Runner 2049</td>
                                        <td>⭐ 4.8</td>
                                        <td>Sci-fi, similar users loved it</td>
                                    </tr>
                                    <tr style={{background: 'rgba(229, 9, 20, 0.1)'}}>
                                        <td>The Prestige</td>
                                        <td>⭐ 4.7</td>
                                        <td>Thriller, mystery elements</td>
                                    </tr>
                                    <tr style={{background: 'rgba(229, 9, 20, 0.1)'}}>
                                        <td>Arrival</td>
                                        <td>⭐ 4.6</td>
                                        <td>Sci-fi, intelligent storytelling</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flow-note" style={{marginTop: '1rem'}}>
                        ✨ Model correctly avoided romance movies Alice rated low!
                    </div>
                </div>
            )
        },

        // Slide 12: Technology Stack
        {
            id: 11,
            title: "Technology Stack",
            subtitle: "Modern tools & frameworks",
            content: (
                <div className="content-slide">
                    <div className="tech-grid">
                        <div className="tech-category">
                            <h3>🎨 Frontend</h3>
                            <ul className="tech-list">
                                <li><strong>React 18</strong> - UI library</li>
                                <li><strong>Vite</strong> - Build tool</li>
                                <li><strong>React Router</strong> - Navigation</li>
                                <li><strong>Axios</strong> - HTTP client</li>
                                <li><strong>Context API</strong> - State management</li>
                            </ul>
                        </div>

                        <div className="tech-category">
                            <h3>⚡ Backend</h3>
                            <ul className="tech-list">
                                <li><strong>FastAPI</strong> - Web framework</li>
                                <li><strong>Uvicorn</strong> - ASGI server</li>
                                <li><strong>SQLAlchemy</strong> - ORM</li>
                                <li><strong>Pydantic</strong> - Data validation</li>
                                <li><strong>JWT</strong> - Authentication</li>
                            </ul>
                        </div>

                        <div className="tech-category">
                            <h3>🤖 Machine Learning</h3>
                            <ul className="tech-list">
                                <li><strong>Surprise</strong> - Recommender library</li>
                                <li><strong>Pandas</strong> - Data manipulation</li>
                                <li><strong>NumPy</strong> - Numerical computing</li>
                                <li><strong>scikit-learn</strong> - ML utilities</li>
                            </ul>
                        </div>

                        <div className="tech-category">
                            <h3>💾 Database</h3>
                            <ul className="tech-list">
                                <li><strong>SQLite</strong> - Embedded database</li>
                                <li><strong>Netflix Dataset</strong> - 9,405 movies</li>
                                <li><strong>22 data fields</strong> - Rich metadata</li>
                            </ul>
                        </div>
                    </div>

                    <div className="deployment-info">
                        <h4>🚀 Deployment Ready</h4>
                        <p>Dockerized application • GCP compatible • CI/CD ready</p>
                    </div>
                </div>
            )
        },

        // Slide 13: Code Example - Backend Recommendation Logic
        {
            id: 12,
            title: "Backend Code Example",
            subtitle: "Python code for generating recommendations",
            content: (
                <div className="content-slide">
                    <div className="code-example-section">
                        <h3>🐍 FastAPI Endpoint</h3>
                        <div className="code-box" style={{textAlign: 'left', padding: '1.5rem', fontSize: '0.85rem'}}>
                            <code style={{color: '#f59e0b'}}>@app.get</code>
                            <code style={{color: '#fff'}}>(</code>
                            <code style={{color: '#4ade80'}}>"/api/recommendations"</code>
                            <code style={{color: '#fff'}}>)</code><br/>
                            <code style={{color: '#f59e0b'}}>async def</code>
                            <code style={{color: '#3b82f6'}}> get_recommendations</code>
                            <code style={{color: '#fff'}}>(user_id: int):</code><br/>
                            <code style={{color: '#999', marginLeft: '2rem'}}>    # Load trained SVD model</code><br/>
                            <code style={{marginLeft: '2rem'}}>    model = </code>
                            <code style={{color: '#3b82f6'}}>load_model</code>
                            <code>()</code><br/><br/>
                            <code style={{color: '#999', marginLeft: '2rem'}}>    # Get unrated movies</code><br/>
                            <code style={{marginLeft: '2rem'}}>    unrated = db.</code>
                            <code style={{color: '#3b82f6'}}>query</code>
                            <code>(Movies)</code><br/>
                            <code style={{marginLeft: '4rem'}}>        .</code>
                            <code style={{color: '#3b82f6'}}>filter</code>
                            <code>(~Movies.id.in_(rated_ids))</code><br/><br/>
                            <code style={{color: '#999', marginLeft: '2rem'}}>    # Predict ratings</code><br/>
                            <code style={{marginLeft: '2rem', color: '#f59e0b'}}>    for</code>
                            <code> movie </code>
                            <code style={{color: '#f59e0b'}}>in</code>
                            <code> unrated:</code><br/>
                            <code style={{marginLeft: '4rem'}}>        score = model.</code>
                            <code style={{color: '#3b82f6'}}>predict</code>
                            <code>(user_id, movie.id).est</code><br/>
                            <code style={{marginLeft: '4rem'}}>        predictions.</code>
                            <code style={{color: '#3b82f6'}}>append</code>
                            <code>((movie, score))</code><br/><br/>
                            <code style={{color: '#999', marginLeft: '2rem'}}>    # Return top 12 sorted by score</code><br/>
                            <code style={{marginLeft: '2rem', color: '#f59e0b'}}>    return</code>
                            <code> </code>
                            <code style={{color: '#3b82f6'}}>sorted</code>
                            <code>(predictions, key=</code>
                            <code style={{color: '#f59e0b'}}>lambda</code>
                            <code> x: x[1])[:</code>
                            <code style={{color: '#4ade80'}}>12</code>
                            <code>]</code>
                        </div>
                    </div>

                    <div className="code-example-section" style={{marginTop: '1.5rem'}}>
                        <h3>⚛️ Frontend React Code</h3>
                        <div className="code-box" style={{textAlign: 'left', padding: '1.5rem', fontSize: '0.85rem'}}>
                            <code style={{color: '#f59e0b'}}>const</code>
                            <code> fetchRecommendations = </code>
                            <code style={{color: '#f59e0b'}}>async</code>
                            <code> () {'=>'} </code>
                            <code>{'{'}</code><br/>
                            <code style={{marginLeft: '2rem', color: '#f59e0b'}}>  const</code>
                            <code> response = </code>
                            <code style={{color: '#f59e0b'}}>await</code>
                            <code> axios.</code>
                            <code style={{color: '#3b82f6'}}>get</code>
                            <code>(</code><br/>
                            <code style={{marginLeft: '4rem', color: '#4ade80'}}>'/api/recommendations'</code>
                            <code>,</code><br/>
                            <code style={{marginLeft: '4rem'}}>{'{'} headers: {'{'} Authorization: </code>
                            <code style={{color: '#4ade80'}}>`Bearer ${'{token}'}`</code>
                            <code> {'}'} {'}'}</code><br/>
                            <code style={{marginLeft: '2rem'}}>  );</code><br/>
                            <code style={{marginLeft: '2rem'}}>  </code>
                            <code style={{color: '#3b82f6'}}>setMovies</code>
                            <code>(response.data);</code><br/>
                            <code>{'}'};</code>
                        </div>
                    </div>

                    <div className="info-box" style={{marginTop: '1rem'}}>
                        <strong>💡 Key Point:</strong> Model predictions happen in real-time on each request, ensuring fresh recommendations
                    </div>
                </div>
            )
        },

        // Slide 14: Key Features
        {
            id: 13,
            title: "Key Features",
            subtitle: "What makes our system special",
            content: (
                <div className="content-slide">
                    <div className="features-showcase">
                        <div className="showcase-item">
                            <div className="showcase-icon">🎯</div>
                            <h3>Personalized Recommendations</h3>
                            <p>SVD algorithm learns user preferences from rating history</p>
                        </div>

                        <div className="showcase-item">
                            <div className="showcase-icon">🔐</div>
                            <h3>Secure Authentication</h3>
                            <p>JWT-based auth with password hashing (bcrypt)</p>
                        </div>

                        <div className="showcase-item">
                            <div className="showcase-icon">🔍</div>
                            <h3>Smart Search & Filter</h3>
                            <p>Search by title, filter by genre, sort by rating</p>
                        </div>

                        <div className="showcase-item">
                            <div className="showcase-icon">⭐</div>
                            <h3>Interactive Rating System</h3>
                            <p>5-star rating interface with instant feedback</p>
                        </div>

                        <div className="showcase-item">
                            <div className="showcase-icon">🔥</div>
                            <h3>Popular Movies</h3>
                            <p>Discover trending and highly-rated content</p>
                        </div>

                        <div className="showcase-item">
                            <div className="showcase-icon">📱</div>
                            <h3>Responsive Design</h3>
                            <p>Works seamlessly on desktop, tablet, and mobile</p>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 15: Testing & Validation
        {
            id: 14,
            title: "Testing & Validation",
            subtitle: "Ensuring quality and reliability",
            content: (
                <div className="content-slide">
                    <div className="testing-grid">
                        <div className="test-category">
                            <h3>🧪 Model Validation</h3>
                            <ul>
                                <li>5-fold cross-validation</li>
                                <li>RMSE & MAE metrics</li>
                                <li>80/20 train-test split</li>
                                <li>Prediction accuracy checks</li>
                            </ul>
                        </div>

                        <div className="test-category">
                            <h3>🔍 API Testing</h3>
                            <ul>
                                <li>FastAPI built-in docs</li>
                                <li>Endpoint validation</li>
                                <li>Authentication testing</li>
                                <li>Error handling checks</li>
                            </ul>
                        </div>

                        <div className="test-category">
                            <h3>👤 User Testing</h3>
                            <ul>
                                <li>UI/UX validation</li>
                                <li>Cross-browser testing</li>
                                <li>Mobile responsiveness</li>
                                <li>Performance benchmarks</li>
                            </ul>
                        </div>

                        <div className="test-category">
                            <h3>💾 Data Integrity</h3>
                            <ul>
                                <li>Database constraints</li>
                                <li>Input validation</li>
                                <li>Rating range checks</li>
                                <li>Data consistency</li>
                            </ul>
                        </div>
                    </div>

                    <div className="validation-results">
                        <h4>✅ Validation Results</h4>
                        <div className="result-grid">
                            <div className="result-item success">
                                <strong>Model Accuracy</strong>
                                <span>93.6% accurate predictions</span>
                            </div>
                            <div className="result-item success">
                                <strong>API Response</strong>
                                <span>&lt; 100ms average</span>
                            </div>
                            <div className="result-item success">
                                <strong>User Ratings</strong>
                                <span>100% data integrity</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // Slide 12: Results & Demo
        {
            id: 11,
            title: "Results & Demo",
            subtitle: "See it in action",
            content: (
                <div className="content-slide">
                    <div className="demo-section">
                        <h3>🎬 Live Demo</h3>
                        <div className="demo-steps">
                            <div className="demo-step">
                                <strong>1. Browse Movies</strong>
                                <p>Explore 9,405 movies with comprehensive Netflix metadata</p>
                            </div>
                            <div className="demo-step">
                                <strong>2. Rate Your Favorites</strong>
                                <p>Give 1-5 star ratings to movies you've watched</p>
                            </div>
                            <div className="demo-step">
                                <strong>3. Get Recommendations</strong>
                                <p>Receive personalized suggestions based on your taste</p>
                            </div>
                        </div>
                    </div>

                    <div className="achievements">
                        <h3>🏆 Key Achievements</h3>
                        <div className="achievement-list">
                            <div className="achievement-item">
                                <span className="check">✓</span>
                                <span>Implemented production-ready SVD algorithm</span>
                            </div>
                            <div className="achievement-item">
                                <span className="check">✓</span>
                                <span>Built full-stack application (React + FastAPI)</span>
                            </div>
                            <div className="achievement-item">
                                <span className="check">✓</span>
                                <span>Integrated Netflix dataset with 9,405 movies</span>
                            </div>
                            <div className="achievement-item">
                                <span className="check">✓</span>
                                <span>Achieved 93.6% prediction accuracy</span>
                            </div>
                            <div className="achievement-item">
                                <span className="check">✓</span>
                                <span>Created Netflix-inspired UI/UX</span>
                            </div>
                        </div>
                    </div>

                    <div className="call-to-action">
                        <h4>Try it yourself! 🚀</h4>
                        <p>Navigate to the Movies or Recommendations page to explore</p>
                    </div>
                </div>
            )
        },

        // Slide 16: Thank You
        {
            id: 15,
            title: "Thank You",
            subtitle: "Questions?",
            content: (
                <div className="title-slide">
                    <div className="title-emoji">🎓</div>
                    <h1 className="main-title">Thank You!</h1>
                    <p className="main-subtitle">MovieRec - AI-Powered Recommendation System</p>

                    <div className="thank-you-stats">
                        <div className="ty-stat">
                            <div className="ty-number">9,405</div>
                            <div className="ty-label">Movies & Shows</div>
                        </div>
                        <div className="ty-stat">
                            <div className="ty-number">93.6%</div>
                            <div className="ty-label">Accuracy</div>
                        </div>
                        <div className="ty-stat">
                            <div className="ty-number">Netflix</div>
                            <div className="ty-label">Data Source</div>
                        </div>
                    </div>

                    <div className="project-links">
                        <p>
                            <a 
                                href="https://github.com/royalihasan/recommendation_system" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="github-link"
                            >
                                🔗 GitHub Repository
                            </a>
                        </p>
                        <p>📧 University Demo Project 2025</p>
                        <p style={{fontSize: '0.9rem', marginTop: '1rem'}}>
                            <a 
                                href="https://github.com/royalihasan" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="profile-link"
                            >
                                @royalihasan
                            </a>
                        </p>
                    </div>
                </div>
            )
        }
    ];

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
                nextSlide();
            } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide, slides.length]);

    return (
        <div className="presentation-container">
            {/* Slide Content */}
            <div className="slide-wrapper">
                <div className="slide-content">
                    {slides[currentSlide].title !== slides[currentSlide].content && (
                        <div className="slide-header">
                            <h1 className="slide-title">{slides[currentSlide].title}</h1>
                            <p className="slide-subtitle">{slides[currentSlide].subtitle}</p>
                        </div>
                    )}
                    <div className="slide-body">
                        {slides[currentSlide].content}
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="slide-controls">
                <button
                    className="control-btn prev-btn"
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                >
                    ← Previous
                </button>

                <div className="slide-indicator">
                    {currentSlide + 1} / {slides.length}
                </div>

                <button
                    className="control-btn next-btn"
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                >
                    Next →
                </button>
            </div>

            {/* Slide Navigation Dots */}
            <div className="slide-dots">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        title={slide.title}
                    />
                ))}
            </div>

            {/* Keyboard Navigation Hint */}
            <div className="keyboard-hint">
                Use ← → arrow keys to navigate
            </div>
        </div>
    );
};

export default About;
