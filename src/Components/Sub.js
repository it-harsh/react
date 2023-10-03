import React from "react";

function Sub(props){
    return(
        <div>
            <h2>These is {props.name} with h2</h2>
            <h5>{props.children}</h5>
        </div>
    )
}
export default Sub