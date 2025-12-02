/**
 * About/Demo page - explains how the system works
 */
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <h1>🎬 MovieRec</h1>
                <p className="subtitle">AI-Powered Collaborative Filtering with SVD Algorithm</p>
            </section>

            {/* System Overview */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">📊 System Overview</h2>
                    <div className="overview-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Personalized Recommendations</h3>
                            <p>SVD algorithm analyzes 100,000 ratings from 943 users across 1,682 movies</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Fast & Accurate</h3>
                            <p>RMSE: 0.9361, MAE: 0.7381 - Highly accurate predictions</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎨</div>
                            <h3>Real Movie Data</h3>
                            <p>TMDB API integration for authentic posters and metadata</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture */}
            <section className="section dark-section">
                <div className="container">
                    <h2 className="section-title">🏗️ System Architecture</h2>
                    <div className="architecture-diagram">
                        <div className="arch-layer">
                            <div className="arch-box frontend">
                                <h4>Frontend</h4>
                                <p>React + Vite</p>
                                <p>Netflix-style UI</p>
                            </div>
                        </div>
                        <div className="arch-arrow">↓</div>
                        <div className="arch-layer">
                            <div className="arch-box backend">
                                <h4>Backend API</h4>
                                <p>FastAPI</p>
                                <p>REST endpoints</p>
                            </div>
                        </div>
                        <div className="arch-arrow">↓</div>
                        <div className="arch-layer">
                            <div className="arch-box ml">
                                <h4>ML Engine</h4>
                                <p>SVD Algorithm</p>
                                <p>Surprise Library</p>
                            </div>
                        </div>
                        <div className="arch-arrow">↓</div>
                        <div className="arch-layer">
                            <div className="arch-box data">
                                <h4>Database</h4>
                                <p>SQLite</p>
                                <p>MovieLens 100k</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How SVD Works */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">🤖 How SVD Works</h2>
                    <div className="svd-explanation">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Collect Ratings</h3>
                            <p>Users rate movies on a scale of 1-5 stars</p>
                            <div className="code-snippet">
                                User Matrix: 943 users × 1,682 movies
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Matrix Factorization</h3>
                            <p>SVD decomposes the rating matrix into latent features</p>
                            <div className="code-snippet">
                                R ≈ U × Σ × V<sup>T</sup>
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Find Similar Users</h3>
                            <p>Identify users with similar taste patterns in latent space</p>
                            <div className="code-snippet">
                                100 latent factors per user/movie
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-number">4</div>
                            <h3>Predict Ratings</h3>
                            <p>Estimate how much you'll like unwatched movies</p>
                            <div className="code-snippet">
                                Predicted Rating = U<sub>user</sub> × Σ × V<sub>movie</sub><sup>T</sup>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Flow */}
            <section className="section dark-section">
                <div className="container">
                    <h2 className="section-title">🔄 Data Flow</h2>
                    <div className="flow-diagram">
                        <div className="flow-step">
                            <div className="flow-box">User rates a movie</div>
                            <div className="flow-arrow">→</div>
                        </div>
                        <div className="flow-step">
                            <div className="flow-box">Saved to database</div>
                            <div className="flow-arrow">→</div>
                        </div>
                        <div className="flow-step">
                            <div className="flow-box">SVD predicts scores</div>
                            <div className="flow-arrow">→</div>
                        </div>
                        <div className="flow-step">
                            <div className="flow-box">Top N recommendations</div>
                            <div className="flow-arrow">→</div>
                        </div>
                        <div className="flow-step">
                            <div className="flow-box">Display to user</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Test the System */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">🧪 How to Test the Recommendation System</h2>
                    <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#e5e5e5' }}>
                        Follow these steps to see the recommendation engine in action
                    </p>

                    <div className="svd-explanation">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Register & Login</h3>
                            <p>Create a new account or login with existing credentials</p>
                            <div className="code-snippet">
                                Navigate to: /login or /register
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
                                ✓ Your session will persist across page reloads
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Rate 5-10 Movies</h3>
                            <p>Browse movies and rate them based on your preferences</p>
                            <div className="code-snippet">
                                Click any movie → Rate with stars
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
                                💡 Tip: Rate movies from different genres for better results
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>View Recommendations</h3>
                            <p>Navigate to Recommendations page to see personalized suggestions</p>
                            <div className="code-snippet">
                                Home → Recommendations section
                                <br />or /recommendations page
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
                                ⭐ Each movie shows a predicted rating (how much you'll like it)
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">4</div>
                            <h3>Explore Movie Details</h3>
                            <p>Click on any movie to see full details and similar movies</p>
                            <div className="code-snippet">
                                Movie Card → Detail Page
                                <br />View: Summary, Cast, Director, IMDb Score
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
                                🎬 Similar movies are computed using SVD latent factors
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">5</div>
                            <h3>Test Search</h3>
                            <p>Use the search bar to find specific movies instantly</p>
                            <div className="code-snippet">
                                Home Page → Search Bar
                                <br />Start typing movie title...
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
                                🔍 Real-time client-side filtering for instant results
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">6</div>
                            <h3>Verify Predictions</h3>
                            <p>Rate a recommended movie to see how accurate our predictions are!</p>
                            <div className="code-snippet">
                                Compare: Predicted Rating vs Your Actual Rating
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
                                📊 Our model achieves MAE of 0.53 (highly accurate!)
                            </p>
                        </div>
                    </div>

                    {/* What to Expect */}
                    <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(229, 9, 20, 0.1)', borderRadius: '8px', border: '1px solid rgba(229, 9, 20, 0.3)' }}>
                        <h3 style={{ color: '#e50914', marginBottom: '1rem' }}>🎯 What to Expect</h3>
                        <ul style={{ color: '#e5e5e5', lineHeight: '1.8' }}>
                            <li><strong>After 3-5 ratings:</strong> Basic recommendations appear</li>
                            <li><strong>After 5-10 ratings:</strong> More personalized suggestions</li>
                            <li><strong>After 10+ ratings:</strong> Highly accurate predictions</li>
                            <li><strong>Different genres:</strong> Better diversity in recommendations</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">🛠️ Technology Stack</h2>
                    <div className="tech-grid">
                        <div className="tech-category">
                            <h3>Frontend</h3>
                            <ul>
                                <li>React 18</li>
                                <li>Vite</li>
                                <li>Axios</li>
                                <li>React Router</li>
                            </ul>
                        </div>
                        <div className="tech-category">
                            <h3>Backend</h3>
                            <ul>
                                <li>Python 3.12</li>
                                <li>FastAPI</li>
                                <li>SQLAlchemy</li>
                                <li>Pydantic</li>
                            </ul>
                        </div>
                        <div className="tech-category">
                            <h3>Machine Learning</h3>
                            <ul>
                                <li>Scikit-Surprise</li>
                                <li>SVD Algorithm</li>
                                <li>NumPy</li>
                                <li>Pandas</li>
                            </ul>
                        </div>
                        <div className="tech-category">
                            <h3>Database</h3>
                            <ul>
                                <li>SQLite</li>
                                <li>MovieLens 100k</li>
                                <li>TMDB API</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Model Performance */}
            <section className="section dark-section">
                <div className="container">
                    <h2 className="section-title">📈 Model Performance</h2>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-value">0.9361</div>
                            <div className="metric-label">RMSE</div>
                            <p>Root Mean Square Error</p>
                        </div>
                        <div className="metric-card">
                            <div className="metric-value">0.7381</div>
                            <div className="metric-label">MAE</div>
                            <p>Mean Absolute Error</p>
                        </div>
                        <div className="metric-card">
                            <div className="metric-value">100,000</div>
                            <div className="metric-label">Ratings</div>
                            <p>Training Dataset Size</p>
                        </div>
                        <div className="metric-card">
                            <div className="metric-value">5-fold</div>
                            <div className="metric-label">Cross-Validation</div>
                            <p>Model Validation</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dataset Info */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">📚 Dataset Information</h2>
                    <div className="dataset-info">
                        <div className="dataset-stat">
                            <h3>943</h3>
                            <p>Unique Users</p>
                        </div>
                        <div className="dataset-stat">
                            <h3>1,682</h3>
                            <p>Movies</p>
                        </div>
                        <div className="dataset-stat">
                            <h3>100K</h3>
                            <p>Ratings</p>
                        </div>
                        <div className="dataset-stat">
                            <h3>19</h3>
                            <p>Genres</p>
                        </div>
                    </div>
                    <div className="dataset-source">
                        <p>📂 Source: <strong>MovieLens 100k</strong> by GroupLens Research</p>
                        <p>🎬 Enriched with <strong>TMDB API</strong> for real movie posters</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="about-footer">
                <p>Built for University Project Demonstration</p>
                <p>Movie Recommendation System using Collaborative Filtering</p>
            </section>
        </div>
    );
};

export default About;
