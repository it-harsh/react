import React, { useState } from "react";
export default function ArrayInsideObject(){
    const [fruits,setFruits] = useState({fl  : []})
    const changeHandle = (e) => {
        const value =  e.target.value
        console.log(value)
        console.log(e.target.checked)
        if(e.target.checked){
            // below code works
            // setFruits((prev) => {
            //     return{
            //         ...prev,fl:[value,...prev.fl]
            //     }
            // })
        
            // below code works as well
            setFruits({
                fl:[value,...fruits.fl]
            })
        }
        else{
            // ways to remove anything from state

            //totally wrong but a good attempt it put array at 0th position of fl array
            // const finalfl = fruits.fl.filter((z) => z !== value)
            // console.log("FL:",finalfl," value : ",value)
            // setFruits((prev) => {
            //     return{
            //         ...prev,fl:[fruits.fl.filter((z) => z !== value)]
            //     }
            // })

            setFruits({
                    fl:fruits.fl.filter((z) => z !== value)
                })
        }
        console.log(fruits.fl)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Final fruits object below:")
        console.log(fruits)
        console.log(fruits.fl)
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
                {fruits.fl.map((f,id) =>  <li key={id}>{f}</li>)}
                </ul>
            </form>
        </div>
    )
}