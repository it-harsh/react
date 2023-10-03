import React, { useState } from "react";

export default function USArray(){
    
    let num = [2,4,7,8]
    let [numbers,setNumbers]=useState(num)

    let changeArray = () => {
        setNumbers(num => {
           return [
            ...num,
            Math.floor(Math.random()*50)
           ]
        }
        )
    }

    return(
        <div>
            <button onClick={changeArray}>add</button>
            <br></br>
            <ol>
                {numbers.map((m,id) => <li type="I" key={id}>{m}</li>)}
            </ol>
            
        </div>
    )
}