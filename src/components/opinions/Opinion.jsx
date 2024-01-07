import React from "react";

function Opinion({opinion}){
    return(
        <div>
            <h4>Autor: {opinion.author}</h4>
            <p>Treść: {opinion.comment}</p>
        </div>
    )
}

export default Opinion;