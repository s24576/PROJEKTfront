import React, { useContext, useState } from "react";
import { ItemsContext } from "../context/ItemsContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Stars from "./Stars";

function AddOpinion(){
    const {user} = useContext(UserContext);
    const { item } = useContext(ItemsContext);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    
    const handleAdd = async () => {
        try {
          let author = "Gość";
          
          if (user) {
            author = user.email;
          }
    
          const values = {
            itemId: item._id,
            author: author,
            comment: comment,
            rating: rating,
          };
    
          const response = await axios.post(
            "http://localhost:3001/api/add/opinion",
            values
          );
    
          console.log("Dodano opinię:", response.data);
    
          setComment("");
          setRating(1);
        } catch (error) {
          console.log("Error:", error);
        }
    };

    return(
        <div>
            <h3>Dodaj opinie</h3>
            <label htmlFor="comment">Komentarz:</label>
            <input
              type="textarea"
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Stars onRatingChange={(newRating) => setRating(newRating)} />
            <button onClick={handleAdd}>Dodaj opinie</button>
        </div>
    );
}

export default AddOpinion;