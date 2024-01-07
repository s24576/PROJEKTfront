import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { OpinionsContext } from '../context/OpinionsContext';

function CommentList({ id }) {
  const { comments, setComments, fetchAllComments } = useContext(OpinionsContext);
  const [error, setError]=useState(null);

  useEffect(() => {
    fetchAllComments(id);
  }, [id, setComments]);

  const handleDelete = async (commentId)=>{
    try{
        const response = await axios.delete("http://localhost:3001/api/opinion/deleteComment", {
            params: { commentId: commentId },
        });
        fetchAllComments(id);
    }catch(error){
        if (error.response) {
            setError(error.response.data.message);
        }
    }
  }

  if(error){
    return <p>{error}</p>
  }

  if(comments.length===0){
    return <p>brak komentarzy</p>
  }

  return (
    <div>
      <h3>Komentarze</h3>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>
            <strong>{comment.author}:</strong> {comment.comment}
          </p>
          <button onClick={() => handleDelete(comment._id)}>Usuń</button>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
