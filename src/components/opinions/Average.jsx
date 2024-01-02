import React, { useContext, useState, useEffect } from "react";
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

  return (
    <div>
      <h4>Średnia: {average}</h4>
    </div>
  );
}

export default Average;
