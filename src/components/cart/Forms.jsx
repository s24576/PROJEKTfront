import React from "react";
import FormS1 from "./FormS1";
import FormS2 from "./FormS2";

function Forms({type}){
    if(type==="formS1"){
        return (<div><FormS1 /></div>);
    }
    else if(type==="formS2"){
        return (<div><FormS2 /></div>);
    }
}

export default Forms;