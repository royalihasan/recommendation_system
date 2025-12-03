import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Search for movies..." }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="netflix-search-container">
            <div className={`netflix-search-wrapper ${isFocused || value ? 'active' : ''}`}>
                <div className="search-icon-wrapper">
                    <svg 
                        className="search-icon" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </div>
                <input
                    type="text"
                    className="netflix-search-input"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {value && (
                    <button
                        className="netflix-clear-btn"
                        onClick={() => onChange('')}
                        aria-label="Clear search"
                    >
                        <svg 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
            </div>
            {(isFocused || value) && (
                <div className="search-hint">
                    💡 Try searching by title, genre, actor, or director
                </div>
            )}
        </div>
    );
};

export default SearchBar;
