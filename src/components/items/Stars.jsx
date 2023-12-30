import React, { useState, useMemo } from "react";
import { FaStar } from "react-icons/fa";

function Stars({ onRatingChange }) {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null);

  const stars = useMemo(() => {
    return [...Array(5)].map((star, index) => {
      const currentRating = index + 1;
      return (
        <label key={index}>
          <input
            type="radio"
            name="rating"
            value={currentRating}
            onClick={() => {
              setRating(currentRating);
              onRatingChange(currentRating);
            }}
          />
          <FaStar
            className="star"
            size={50}
            color={currentRating <= (hover || rating) ? "yellow" : "grey"}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      );
    });
  }, [hover, rating, onRatingChange]);

  return (
    <div>
      {stars}
      <p>Twoja ocena to: {rating}</p>
    </div>
  );
}

export default Stars;
