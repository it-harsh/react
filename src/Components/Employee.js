import React,{Component} from 'react'
class Employee extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"Harsh",
            age:15,
            color:"green"
        }
        //use bind like below to bind event handler to component once in constructor
        //this.changeName = this.changeName.bind(this)
    }
    // state={
    //     name:this.props.name,
    //     age:this.props.age,
    //     color:this.props.color
    // }

    //changeName() causes error while referring this.setState
    //while creating changeName = () => {} using arrow function solves these issue as it automatically binds the eventhandler to component but causes performance and memory issues on complex applications
    //https://stackoverflow.com/questions/50375440/binding-vs-arrow-function-in-javascript-or-for-react-onclick

    changeName = () => {
        this.setState(
            {
                name:"Nova",
                age:24,
                color:"Blue"
            }
        )
    }
    render(){
        return(
            <div>
                <h1>Hello {this.state.name} {this.state.age} {this.state.color}</h1>
                <button onClick={this.changeName}>Click</button>
                {/* <button onClick={() => changeName()}>Click</button> */}
            </div>
        )
    }
}
export  default Employee