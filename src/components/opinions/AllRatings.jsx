import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { OpinionsContext } from '../context/OpinionsContext';
import { UserContext } from '../context/UserContext';

function AllRatings({id}){
  const {user}= useContext(UserContext);
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Oceny:</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {ratings.length === 0 ? (
        <p className="text-gray-500">Brak ocen</p>
      ) : (
        ratings.map((rating) => (
          <div key={rating._id} className="bg-white p-4 mb-4 shadow-md rounded-md">
            <p className="text-gray-700 mb-4">
              {rating.author}: {rating.rating}
            </p>
            {user && user.admin && (
            <button
              onClick={() => handleDelete(rating._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Usuń
            </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AllRatings;