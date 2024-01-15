import React, { useState, useMemo } from "react";
import { FaStar } from "react-icons/fa";

function Stars({ onRatingChange }) {
  const [rating, setRating] = useState(1);
  const [hover] = useState(null);

  const stars = useMemo(() => {
    return [...Array(5)].map((star, index) => {
      const currentRating = index + 1;
      return (
        <label key={index} className="flex items-center">
          <input
            type="radio"
            name="rating"
            value={currentRating}
            onClick={() => {
              setRating(currentRating);
              onRatingChange(currentRating);
            }}
            className="hidden"
          />
          <FaStar
            className="star"
            size={30}
            color={currentRating <= (hover || rating) ? "#FFD700" : "grey"}
          />
        </label>
      );
    });
  }, [hover, rating, onRatingChange]);

  return <div className="flex">{stars}</div>;
}

export default Stars;
