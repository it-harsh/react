import React, { useEffect, useState } from "react";
export default function  FunctionEffect(){
    let [counter,setCounter]=useState(0)
    let [name,setName]=useState("No Name Yet")

    useEffect(()=>{
        console.log("state is rendered : "+counter)
    },[counter])

    useEffect(()=>{
        console.log("state is rendered : "+name)
    },[name])

    return(
        <div>
            <h1> {counter}</h1>
            <h1>{name}</h1>
            <button onClick={() => setCounter(counter  + 1)}>Increment</button>
            <button onClick={() => {name  === "Preksha" ? setName("Harsh") : setName("Preksha")}}>Name Change</button>
        </div>
    )
}