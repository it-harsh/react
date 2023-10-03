import React, { useState } from "react";
export default function FunctionState(){
    
    let [counter,setCounter] = useState(0);

    let increase  =  ()  => {
        setCounter(counter + 1)
    }
    let decrease  =  ()  => {
        setCounter(counter - 1)
    }

    return(
        <div>
            <h1>Counter :  {counter}</h1>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    )
}