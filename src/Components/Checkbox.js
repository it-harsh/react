import React, { useState } from "react";
export default function Checkbox(){
    const [textarea,setTextarea] = useState({
        value : "Add your comments here"
    })
    const [dropdown,setDropDown] = useState("India")
    const [checkbox,setCheckbox] = useState(true)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target[0].value)
        // console.log(e.target[1].value)
        // console.log(e.target[2].checked)
        console.log(textarea.value)
        console.log(dropdown)
        console.log(checkbox)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label style={{verticalAlign:"top"}}>Comments : &nbsp;</label>
                <textarea cols="30" rows="2" value={textarea.value}  onChange={(e) => setTextarea(e.target.value)}></textarea>
                <br/>
                <label>Country : &nbsp;</label>
                <select value={dropdown} onChange={(e) => setDropDown(e.target.value)}>
                    <option>No Country</option>
                    <option>India</option>
                    <option>USA</option>
                    <option>Canada</option>
                    <option>France</option>
                </select>
                <br/>
                <input type="checkbox" checked={checkbox} onChange={(e) => setCheckbox(e.target.checked)}></input>
                <label>&nbsp; I agree</label>
                <br></br>
                <button>Submit</button>
            </form>
        </div>
    )
}