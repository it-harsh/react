import React,{Component} from "react";
import ChildComponent from './ChildComponent'
class ParentComponent extends Component{
    constructor(){
        super()
    }
    ParentComponent(childName){
        alert("Hello from Parent my dear "+childName)
    }
    render(){
        return(
            <div>
                <ChildComponent callMethod={this.ParentComponent}/>
            </div>
        )
    }
}
export default ParentComponent