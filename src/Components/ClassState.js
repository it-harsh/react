import React,{Component} from "react";

export default class ClassState extends Component{
    constructor(props){
        super(props)
        this.state={
            counter:0
        }
    }
    increase  =  () =>  {
        this.setState({
            counter:this.state.counter + 1
        })
    }
    decrease  =  () =>  {
        this.setState({
            counter:this.state.counter - 1 
        })
    }
    eincrease  =  () =>  {
        this.setState({
            counter:this.state.counter * this.state.counter
        })
    }
    edecrease  =  () =>  {
        this.setState({
            counter:Math.sqrt(this.state.counter)
        })
    }
    render(){
        return(
            <div>
                <h1>Count :  {this.state.counter}</h1>
                <button onClick={this.increase}>increase</button>
                <button onClick={this.decrease}>decrease</button>
                <button onClick={this.eincrease}>eincrease</button>
                <button onClick={this.edecrease}>edecrease</button>
            </div>
        )
    }
}