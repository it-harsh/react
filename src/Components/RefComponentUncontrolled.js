import React, { Component, createRef } from "react";;
export default class RefComponentUncontrolled extends Component{
    constructor(props){
        super(props);
        this.nameRef=createRef()
        this.ageRef=createRef()
    }
    componentDidMount(){
        console.log(this.nameRef)
        console.log(this.ageRef)
    }
    handleSubmit =  (e)  => {
        e.preventDefault()
        console.log(this.nameRef.current.value)
        console.log(this.ageRef.current.value)

        let  email = document.getElementById('email').value
        console.log(email)
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter Name : &nbsp;</label>
                    <input type="text" placeholder="name"  ref={this.nameRef}></input>
                    <br></br>
                    <label>Enter Age :  &nbsp;</label>
                    <input type="number" placeholder="age"  ref={this.ageRef}></input>
                    <br/>
                    <label>Enter email :  &nbsp;</label>
                    <input type="email" placeholder="email@email.com" id="email"></input>
                    <br/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}