import React, { useContext, useEffect, useState } from "react";
import Opinion from "./Opinion";
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
          <Opinion key={opinion._id} opinion={opinion} />
        ))
      )}
    </div>
  );
}

export default AllOpinions;
