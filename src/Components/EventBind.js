import React,{Component} from "react";
class EventBind extends Component{
    constructor(props){
        super(props);
        //needs to bind events to methods  i.e. without .bind(this) , it wont find reference when this.setState() is called
        //this.onClick=this.onClick.bind(this)
        //above code saves on a small callbacks on every instance of class pointing to prototype rather than putting whole method on every instance of class (using arrow function  , which is bad)
        this.state={
            name:"Amit",

        }
    }

    //Corelated example Employee.js
    //https://stackoverflow.com/questions/50375440/binding-vs-arrow-function-in-javascript-or-for-react-onclick

    onClick(){
        this.setState({
            name:"Piyu"
        })
    }
    render(){
        return(
            <div>
                <h1>{this.state.name}</h1>
                {/* below code will bind eventHandler everytime using arrowfunctions better to bind using constructor (better peformance)*/}
                <button onClick={this.onClick.bind(this)}>Click</button>
            </div>
        )
    }
}
export default EventBind