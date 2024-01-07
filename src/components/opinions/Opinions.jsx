import React from "react";
import AddComment from "./AddComment";
import AddRating from "./AddRating";
import AllOpinions from "./AllOpinions";
import Average from "./Average";
import { OpinionsProvider } from "../context/OpinionsContext";

function Opinions({id}){
  return (
    <div>
      <OpinionsProvider>
        <AllOpinions id={id}/>
        <AddComment id={id}/>
        <Average id={id}/>
        <AddRating id={id}/>
      </OpinionsProvider>
      
    </div>
  );
}

export default Opinions;
