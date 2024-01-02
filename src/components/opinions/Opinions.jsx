import React, { useContext, useState } from "react";
import AllOpinions from "./AllOpinions";
import AddOpinion from "./AddOpinion";
import Average from "./Average";

function Opinions(){
  return (
    <div>
      <AddOpinion/>
      <AllOpinions />
      <Average />
    </div>
  );
}

export default Opinions;
