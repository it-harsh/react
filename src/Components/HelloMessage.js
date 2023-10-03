import React from "react"
import Sub from "./Sub"
let a = "Avi"

function HelloMessage(props){
    return(
        <div>
            <h1>Hello from HelloMessage!!! . {props.name} Age: {props.age}</h1>
            <h3>{props.children}</h3>
            <Sub name={props.name}>
                {props.children}
            </Sub>
        </div>
    )
}
export default HelloMessage