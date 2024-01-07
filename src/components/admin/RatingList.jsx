import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { OpinionsContext } from '../context/OpinionsContext';

function RatingList({ id }) {
  const { ratings, setRatings, fetchAllRatings } = useContext(OpinionsContext);
  const [error, setError]=useState(null);

  useEffect(() => {
    fetchAllRatings(id);
  }, [id, setRatings]);

  const handleDelete = async (ratingId)=>{
    try{
        const response = await axios.delete("http://localhost:3001/api/opinion/deleteRating", {
            params: { ratingId: ratingId },
        });
        fetchAllRatings(id);
    }catch(error){
        if (error.response) {
            setError(error.response.data.message);
        }
    }
  }

  if(error){
    return <p>{error}</p>
  }

  if(ratings.length===0){
    return <p>brak ocen</p>
  }

  return (
    <div>
      <h3>Oceny</h3>
      {ratings.map((rating) => (
        <div key={rating._id}>
          <p>
            <strong>{rating.author}:</strong> {rating.rating}
          </p>
          <button onClick={() => handleDelete(rating._id)}>Usuń</button>
        </div>
      ))}
    </div>
  );
}

export default RatingList;
