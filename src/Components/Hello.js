import React from "react";

let a  = 10;
let msg = "";



function Hello(){
    if(a>10){
        return(
            <div>
                <h1>Hello Guys from {'Harsh'} , Hello.js !</h1>
    
            </div>
        )
    }
    else{
        return(
            <div>
                <h1>Bye Guys from {'Harsh'} , Hello.js !</h1>
    
            </div>
        )
    }
    
}
export default Hello