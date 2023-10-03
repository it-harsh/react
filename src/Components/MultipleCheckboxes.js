import React, { useState } from "react";
export default function MultipleCheckboxes(){
    const [fruits,setFruits] = useState([])
    const changeHandle = (e) => {
        const value =  e.target.value
        console.log(value)
        console.log(e.target.checked)
        if(e.target.checked){
            setFruits((fruits) => {
                return[
                    ...fruits,e.target.value
                    ]
            })
        }
        else{
            // ways to remove anything from state
            setFruits(fruits.filter((e)  =>  (e!==value)))
        }
        console.log(fruits)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(fruits)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Select fruits : </label>
                <br/>
                <input type="checkbox" name="fruits"  value='Apple' onChange={changeHandle}></input>
                <label>Apple</label>
                <br></br>
                <input type="checkbox" name="fruits"  value='Mango' onChange={changeHandle}></input>
                <label>Mango</label>
                <br></br>
                <input type="checkbox" name="fruits"  value='Banana' onChange={changeHandle}></input>
                <label>Banana</label>
                <br></br>
                <input type="checkbox" name="fruits"  value='Grapes' onChange={changeHandle}></input>
                <label>Grapes</label>
                <br></br>
                <button>Submit</button>
                <ul>
                {fruits.map((f,id) =>  <li key={id}>{f}</li>)}
                </ul>
            </form>
        </div>
    )
}
