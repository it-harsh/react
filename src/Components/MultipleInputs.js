import React,{Component} from "react";

export default class MultipleInputs extends Component{
    constructor(){
        super();
        this.state={
            name:"Steve",
            email:"steve.parker@gmail.com"
        }
    }
    // handleName = (e) =>  {
    //     this.setState({
    //         name:e.target.value
    //     })
    // }
    // handleEmail = (e) =>  {
    //     this.setState({
    //         email:e.target.value
    //     })
    // }
    handleChange = (e) => {
        console.log(e.target.name + ":" +e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        return(
            <div>
                <form>
                    <label>Enter Name: </label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
                    <br></br>
                    <label>Enter email : </label>
                    <input type="email" name="email" value={this.state.email}  onChange={this.handleChange}></input>
                    <br></br>
                    <button> Submit</button>
                    <h1> {this.state.name} : {this.state.email}</h1>
                </form>
            </div>
        )
    }
}