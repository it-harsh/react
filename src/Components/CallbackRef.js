import React, { Component } from "react";;
export default class CallbackRef extends Component{
    constructor(props){
        super(props);
        this.myRef=null
        // setting reference to element without createRef()
        this.setMyRef = (element) => {
            this.myRef = element
        }
    }
    componentDidMount(){
        console.log(this.myRef)
        this.myRef.focus()
        
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.myRef.style.color="red"
        this.myRef.style.backgroundColor="Yellow"
        console.log(this.myRef.value)
    }
    render(){
        return(
            <div>
                <form  onSubmit={this.handleSubmit}>
                    <label>Enter Name : &nbsp;</label>  
                    <input type="text" placeholder="Name" ref={this.setMyRef}></input>
                    <br/><br/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}