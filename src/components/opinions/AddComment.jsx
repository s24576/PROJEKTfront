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

      if(values.comment){
        const response = await axios.post(
          "http://localhost:3001/api/opinion/addComment",
          values
        );
      }
      setComment("");
      fetchAllComments(id);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Dodaj komentarz</h3>
      <form onSubmit={handleAdd} className="space-y-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Komentarz:
        </label>
        <textarea
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Dodaj
        </button>
      </form>
    </div>
  );
}

export default AddComment;
