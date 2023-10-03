import React, { useContext } from "react";
import { NameContext } from "../App";

export default function CompC(){
    const arr  = useContext(NameContext)

    return(
        <div>
            <h1>Hi i am component c</h1>
            <h1> {arr.name2} </h1>
        </div>
    )
}