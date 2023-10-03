import React, { useState } from "react";

export default function USComponent(){
    
    const [name,setName] =  useState("Steve")

    let changeState = () => {
        if(name == "Nova"){
            setName("Steve")
        }else{
            setName("Nova")
        }
    }
    return(
        <div>
            <h1>{name}</h1>
            {/* <button onClick={() => setName("Nova")}>Update !</button> */}
            <button onClick={changeState}>Update</button>
        </div>
    )
}