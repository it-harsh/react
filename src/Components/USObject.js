import React, { useState } from "react";

export default function USObject(){
    
    const obj = {
        name:"Rohan",
        age:23,
        height:7.9,
        isYoung:true
    }

    const [person,setPerson] = useState(obj)

    let changeState = () => {
        if(person.name == "Rohan"){
            setPerson(prevState => {
                return{
                    ...prevState,
                    name:"Steve",
                    age:46 
                }
            })
        }
        else{
            setPerson({
                name:"Rohan",
                age:23,
                height:5.9,
                isYoung:true 
            })
        }
    }

    return(
        <div>
            <h1>{person.name}</h1>
            <h1>{person.age}</h1>
            <h1>{person.height}</h1>
            <h1>{person.isYoung.toString()}</h1>

            <button  onClick={changeState}>Change</button>
        </div>
    )
}