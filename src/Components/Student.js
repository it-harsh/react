import  React,{Component} from 'react'
class Student extends Component{
    constructor(props){
        super(props)
        console.log("Constructor called for prop : "+ this.props.name)
    }
    render(){
        return(
            <div>
                <h1>Hello {this.props.name}</h1>
            </div>
        )
    }
}
export default Student