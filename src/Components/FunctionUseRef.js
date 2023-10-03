import React, { useEffect, useRef } from "react";
export default function FunctionUseRef(){
    
    const firstRef = useRef()
    const lastRef = useRef()

    useEffect(() => {
        console.log(firstRef)
        console.log(lastRef)
        firstRef.current.focus()
        firstRef.current.style.color  =  "red"
    })

    const handleSubmit =  (e) => {
        e.preventDefault()
        console.log("Full Name",firstRef.current.value)
        console.log("Last Name ",lastRef.current.value)
    }

    return(
        <div>
            <form>
                <label>Enter First Name</label>
                <input type="text" placeholder="First Name" ref={firstRef}></input>
                <br/><br/>
                <label>Enter Last Name</label>
                <input type="text" placeholder="Last Name"  ref={lastRef}></input>
                <br/><br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}