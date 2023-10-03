import React, { useState } from "react";

export default function ControlFunction(){
    const [name,setName] = useState("Steve")

    const handleSubmit = (e) => {
        e.preventDefault()
        setName("haha"+e.target[0].value.toLowerCase())
    }

    return(
        <div>
            <form  onSubmit={handleSubmit}>
                <label> Enter Name</label>
                <input input="text" value={name} onChange={(e) => setName(e.target.value.toUpperCase())}></input>
                <br></br>
                <input type="Submit" value="Proceed" ></input>
                <button>Submit</button>
                <h1>{name}</h1>
            </form>
        </div>
    )
}