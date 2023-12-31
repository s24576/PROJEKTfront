import React, { useContext, useEffect, useState } from "react";
import Opinion from "./Opinion";
import { OpinionsContext } from "../context/OpinionsContext";

function AllOpinions({ id }) {
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
    return <div>Loading...</div>;
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
      {comments.map((opinion) => (
        <Opinion key={opinion._id} opinion={opinion} />
      ))}
    </div>
  );
}

export default AllOpinions;
