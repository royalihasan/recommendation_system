/**
 * Navbar component for navigation.
 */
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className={`netflix-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <svg className="logo-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9.5v-2H11v-2H9.5V9H11V7H9.5V5H11c.8 0 1.5.7 1.5 1.5v7c0 .8-.7 1.5-1.5 1.5zm3.5 0h-1.5V5h1.5v10zm3.5 0H16v-2h1.5v-2H16V9h1.5V7H16V5h2c.8 0 1.5.7 1.5 1.5v7c0 .8-.7 1.5-1.5 1.5z" fill="currentColor"/>
                    </svg>
                    <span className="logo-text">MovieRec</span>
                </Link>

                <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
                    <li>
                        <Link 
                            to="/" 
                            className={isActive('/') ? 'active' : ''}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/movies" 
                            className={isActive('/movies') ? 'active' : ''}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Movies
                        </Link>
                    </li>
                    {user && (
                        <li>
                            <Link 
                                to="/recommendations" 
                                className={isActive('/recommendations') ? 'active' : ''}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                My List
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link 
                            to="/about" 
                            className={isActive('/about') ? 'active' : ''}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                    </li>
                </ul>

                <div className="navbar-actions">
                    {user ? (
                        <>
                            <div className="user-profile">
                                <div className="user-avatar">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="user-name">{user.username}</span>
                            </div>
                            <button onClick={handleLogout} className="btn-logout">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    <polyline points="16 17 21 12 16 7"/>
                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                </svg>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-signin">
                            Sign In
                        </Link>
                    )}
                </div>

                <button 
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
