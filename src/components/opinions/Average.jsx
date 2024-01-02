import React, { useContext, useState, useEffect } from "react";
import StarRating from 'react-rating-stars-component';
import { ItemsContext } from "../context/ItemsContext";
import axios from "axios";

function Average() {
  const { item } = useContext(ItemsContext);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/get/average", {
          params: { itemId: item._id },
        });

        console.log(response.data.average);
        setAverage(response.data.average);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [item._id, setAverage]);

  if(loading){
    return(<div>Ładowanie...</div>)
  }

  return (
    <div>
      <h4>Średnia: {average}</h4>
      <StarRating
      size={30}
      count={5}
      value={Math.round(average * 2)/2}
      edit={false}
      isHalf={true}
    />
    </div>
  );
}

export default Average;
