import React, { useState } from "react";
export default function FunctionInputs(){
    const [data,setData] = useState({
        name:"Steve",
        email:"steve@gmail.com"
    })

    const [data2,setData2] = useState({
        age:"26",
        gender:"Male"
    })

    const handleChange  = (e)  =>  {
        console.log(e.target.name + ":" +e.target.value)
        setData((prev) =>{
            return{
                ...prev,[e.target.name]:e.target.value
            }
        })
        setData2((prev) =>{
            return{
                ...prev,[e.target.name]:e.target.value
            }
        })
    }

    const handleSubmit  = (e)  => {
        e.preventDefault()
        console.log(data)
        console.log(data2)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                    <label>Enter Name: </label>
                    <input type="text" name="name" value={data.name} onChange={handleChange}></input>
                    <br></br>
                    <label>Enter email : </label>
                    <input type="email" name="email" value={data.email}  onChange={handleChange}></input>
                    <br></br>
                    <button> Submit</button>
                    <h1> {data.name} : {data.email}</h1>
                    <label>Enter Age: </label>
                    <input type="text" name="age" value={data2.age} onChange={handleChange}></input>
                    <br></br>
                    <label>Enter Gender (Male/Female) : </label>
                    <input type="text" name="gender" value={data2.gender}  onChange={handleChange}></input>
                    <br></br>
                    <button> Submit</button>
                    <h1> {data2.age} : {data2.gender}</h1>
            </form>
        </div>
    )
}