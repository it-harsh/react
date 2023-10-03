import React,{Component} from "react";
export default class Control extends Component{
    constructor(props){
        super(props)
        this.state={
            data:"Rohan"
        }
    }

    handleForm = (e) => {
        console.log(e.target)
        this.setState({
            data:e.target.value
        })
    }

    handleForms = (e) => {
        e.preventDefault()
        console.log(e.target[0].value)
        this.setState({
            data:e.target[0].value.toLowerCase().substring(0,15)
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleForms}>
                    <label>Enter Name</label>
                    <input type="text"  value={this.state.data} onChange={this.handleForm}></input>
                    <br/>
                    <h1>{this.state.data}</h1>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}