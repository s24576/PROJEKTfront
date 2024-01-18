import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { OpinionsContext } from "../context/OpinionsContext";
import { UserContext } from "../context/UserContext";

function AllOpinions({ id }) {
  const { user } = useContext(UserContext);
  const { comments, setComments, fetchAllComments } = useContext(OpinionsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllComments(id);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setComments]);

  const handleDelete = async (commentId) => {
    try {
      await axios.delete("http://localhost:3001/api/opinion/deleteComment", {
        params: { commentId: commentId },
      });
      
      fetchAllComments(id, () => setLoading(false));
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Komentarze:</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">Brak komentarzy.</p>
      ) : (
        comments.map((opinion) => (
          <div key={opinion._id} className="bg-white p-4 mb-4 shadow-md rounded-md">
            <h4 className="text-xl font-semibold mb-2">Autor: {opinion.author}</h4>
            <p className="text-gray-700 mb-4">Treść: {opinion.comment}</p>
            {user && user.admin && (
              <button
                onClick={() => handleDelete(opinion._id)}
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

export default AllOpinions;
