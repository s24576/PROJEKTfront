import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Opinion({opinion}){
    const {user} = useContext(UserContext);

    const handleDelete = async (commentId) =>{
        console.log("aa");
        
    }

    return(
        <div>
            <h4>Autor: {opinion.author}</h4>
            <p>Treść: {opinion.comment}</p>
            {user && user.admin && <button onClick={handleDelete}>Usuń</button>}
        </div>
    )
}

export default Opinion;