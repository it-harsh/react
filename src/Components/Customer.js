import React,{Component} from "react";
import Hello from "./Hello";
function Customer({name,age}){
    return(
        <div>
            <h1>{name}</h1>
            <h1>{age}</h1>
        </div>
    )
}
export default Customer