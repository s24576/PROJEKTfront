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
    return <div className="text-center mt-4">Ładowanie...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="text-2xl font-semibold mb-2">Średnia ocena:</h4>
      <div className="flex items-center">
      <p className="text-xl font-bold mr-2">{average.toFixed(2)}</p>
        <StarRating
          key={average}
          size={30}
          count={5}
          value={Math.round(average * 2) / 2}
          edit={false}
          isHalf={true}
        />
      </div>
    </div>
  );
}

export default Average;
