import React from "react";
export default function StudentList(){
    const names = ['Anil','Steve','Nova']
    let studentNames =  names.map((name,id) => <li>{id} : {name}</li>)
    return(
        <div>
            <ul>{studentNames}</ul>
        </div>
    )
}