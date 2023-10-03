import React, { useState } from "react";
export default function ArrayInsideComplexObject(){
    const [data,setData] = useState({
        school : {
            name : "ABC",
            standard : {
                no :  "10",
                student : {
                    name : "Steve",
                    subjects : []
                }
            }
        }
    });

    const changeNameHandle = (e) => {
        const value =  e.target.value
        console.log(value)
        setData((prev) =>{
            // console.log('prev:',prev)
            return{
                ...prev,  school :  {
                            name: data.school.name,
                            standard : {
                                no : data.school.standard.no,
                                student : {
                                    name : e.target.value,
                                    subjects : prev.school.standard.student.subjects
                                }
                            }
                        }
            }
        })
        // console.log(data)
    }
    const changeSchoolNameHandle = (e) => {
        const value =  e.target.value
        console.log(value)
        setData((prev) =>{
            // console.log('prev:',prev)
            return{
                ...prev,  school :  {
                            name: e.target.value,
                            standard : {
                                no : data.school.standard.no,
                                student : {
                                    name : data.school.standard.student.name,
                                    subjects : prev.school.standard.student.subjects
                                }
                            }
                        }
            }
        })
        // console.log(data)
    }
    const changeStandardNoHandle = (e) => {
        const value =  e.target.value
        console.log(value)
        setData((prev) =>{
            // console.log('prev:',prev)
            return{
                ...prev,  school :  {
                            name: data.school.name,
                            standard : {
                                no : e.target.value,
                                student : {
                                    name : data.school.standard.student.name,
                                    subjects : prev.school.standard.student.subjects
                                }
                            }
                        }
            }
        })
        // console.log(data)
    }
    const changeCheckboxHandle = (e) => {
        const value =  e.target.value
        console.log(value)
        console.log(e.target.checked)
        if(e.target.checked){
        
            setData((prev) =>{
                // console.log('prev:',prev)
                return{
                    ...prev,school :  {
                        name:  data.school.name,
                        standard :  {
                            no : data.school.standard.no,
                            student : {
                                name : data.school.standard.student.name,
                                subjects : [...prev.school.standard.student.subjects,value]
                            }
                        }
                    }
                }
            })
        }
        else{
           
            setData({
                    school :  {
                        name:data.school.name,
                    standard :  {
                        no : data.school.standard.no,
                        student : {
                            name : data.school.standard.student.name,
                            subjects : data.school.standard.student.subjects.filter((z) => z !==value)
                        }
                        }
                    }
            })

        }
        // console.log(data)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Final data object below:")
        console.log(data)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <br/>
                <label>School Name</label>
                <input type="text" name="schoolName"  value={data.school.name} onChange={changeSchoolNameHandle}></input>
                <br/>
                <label>Standard No</label>
                <input type="text" name="standard"  value={data.school.standard.no} onChange={changeStandardNoHandle}></input>
                <br/>
                <label>Name</label>
                <input type="text" name="name"  value={data.school.standard.student.name} onChange={changeNameHandle}></input>
                <h2>Hello , I am {data.school.standard.student.name}, Standard : {data.school.standard.no}  from {data.school.name} </h2>
                <label>Please select subjects from below  : </label>
                <br/>
                <input type="checkbox" name="subjects"  value='Physics' onChange={changeCheckboxHandle}></input>
                <label>Physics</label>
                <br></br>
                <input type="checkbox" name="subjects"  value='Chemistry' onChange={changeCheckboxHandle}></input>
                <label>Chemistry</label>
                <br></br>
                <input type="checkbox" name="subjects"  value='Maths' onChange={changeCheckboxHandle}></input>
                <label>Maths</label>
                <br></br>
                <button>Submit</button>
                <h2>Your selected subjects : </h2>
                <ul>
                {data.school.standard.student.subjects.map((f,id) =>  <li key={id}>{f}</li>)}
                </ul>
            </form>
        </div>
    )
}
