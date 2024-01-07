import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { OpinionsContext } from "../context/OpinionsContext";
import axios from "axios";

function AddComment({ id }) {
    const { user } = useContext(UserContext);
    const { fetchAllComments } = useContext(OpinionsContext);
    const [comment, setComment] = useState("");
  
    const handleAdd = async (e) => {
      e.preventDefault();
  
      try {
        let author = "Gość";
  
        if (user) {
          author = user.email;
        }
  
        const values = {
          itemId: id,
          author: author,
          comment: comment,
        };
  
        const response = await axios.post(
          "http://localhost:3001/api/opinion/addComment",
          values
        );
        setComment("");
        fetchAllComments(id);
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
    return (
      <div>
        <h3>Dodaj komentarz</h3>
        <form onSubmit={handleAdd}>
          <label htmlFor="comment">Komentarz:</label>
          <textarea
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Dodaj</button>
        </form>
      </div>
    );
  }
  
  export default AddComment;
  