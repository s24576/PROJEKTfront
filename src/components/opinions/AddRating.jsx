import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Stars from "./Stars";
import { OpinionsContext } from "../context/OpinionsContext";

function AddRating({ id }) {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(1);
  const { fetchAverage } = useContext(OpinionsContext);

  const handleAdd = async () => {
    try {
      let author = "Gość";

      if (user) {
        author = user.email;
      }

      const values = {
        itemId: id,
        author: author,
        rating: rating,
      };

      const response = await axios.post(
        "http://localhost:3001/api/opinion/addRating",
        values
      );

      fetchAverage(id);
      setRating(1);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Dodaj ocenę</h3>
      <Stars onRatingChange={(newRating) => setRating(newRating)} />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Dodaj
      </button>
    </div>
  );  
}

export default AddRating;