import React, { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../context/ItemsContext";
import axios from "axios";

function AllOpinions(){
    const {item} = useContext(ItemsContext);
    const [opinions, setOpinions]=useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await axios.get("http://localhost:3001/api/get/opinions", item._id);
                setOpinions(response.data.opinions);
                setLoading(false);
            }
            catch (error) {
                if (error.response) {
                  setError(error.response.data.message);
                }
                setLoading(false);
              }
        }
    }, [setOpinions])
    

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
            {opinions.map((opinion)=>(
                <Opinion key={pinion._id} opinion={opinion}/>
            ))}
        </div>
    )
}