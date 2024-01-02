import React, { useContext, useEffect, useState } from "react";

function Opinion({opinion}){
    return(
        <div>
            <h4>Autor: {opinion.author}</h4>
            <p>Ilość gwiazdek: {opinion.rating}</p>
            <p>Treść: {opinion.comment}</p>
        </div>
    )
}

export default Opinion;