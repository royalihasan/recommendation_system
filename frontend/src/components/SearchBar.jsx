import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Search for movies..." }) => {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <img src="/search_icon.svg" alt="Search" className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                {value && (
                    <button
                        className="search-clear-btn"
                        onClick={() => onChange('')}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
