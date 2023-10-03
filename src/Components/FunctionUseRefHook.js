import React, { useEffect, useRef, useState } from "react";
export default function FunctionUseRefHook(){

    const [inputValue,setInputValue]  = useState("")
    const count = useRef(0)

    useEffect(()=>{
        //using setState inside useEffect causes it to run infinitely unless we add an empty array with useEffect
        //setCount(count+1)
        count.current= count.current+1
    })

    return(
        <div>
            <form>
                <label>Enter Name</label>
                <input type="text" placeholder="Name" value={inputValue}  onChange={(e) => setInputValue(e.target.value)}></input>
                <br/><br/>
                <h2>Count : {count.current}</h2>
                <h3>Input : {inputValue}</h3>
            </form>
        </div>
    )
}