/**
 * RatingStars component for displaying star ratings.
 */
import './RatingStars.css';

const RatingStars = ({ rating, readonly = true, onChange }) => {
    const stars = [1, 2, 3, 4, 5];

    const handleClick = (value) => {
        if (!readonly && onChange) {
            onChange(value);
        }
    };

    return (
        <div className={`rating-stars ${readonly ? 'readonly' : 'interactive'}`}>
            {stars.map((star) => {
                const filled = star <= Math.round(rating);
                return (
                    <span
                        key={star}
                        className={`star ${filled ? 'filled' : 'empty'}`}
                        onClick={() => handleClick(star)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default RatingStars;
