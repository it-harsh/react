import React, { Component, createRef } from "react";;
export default class RefComponent extends Component{
    constructor(props){
        super(props);
        this.myRef=createRef()
    }
    componentDidMount(){
        console.log(this.myRef)
        console.log(this.myRef.current.innerHTML)
    }
    handleClick = () => {
        this.myRef.current.align="right"
        this.myRef.current.style.color="red"
    }
    render(){
        return(
            <div>
                <h1 ref={this.myRef}>Hello mofos !!!</h1>
                <button  onClick={this.handleClick}>Click</button>
            </div>
        )
    }
}