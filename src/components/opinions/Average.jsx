import React, { useContext, useState, useEffect } from "react";
import StarRating from 'react-rating-stars-component';
import { OpinionsContext } from "../context/OpinionsContext";

function Average({ id }) {
  const { average, setAverage, fetchAverage } = useContext(OpinionsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAverage(id);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setAverage]);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h4>Średnia: {average}</h4>
      <StarRating
        key={average}
        size={30}
        count={5}
        value={Math.round(average * 2) / 2}
        edit={false}
        isHalf={true}
      />
    </div>
  );
}

export default Average;
