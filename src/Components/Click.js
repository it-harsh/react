import React,{Component} from "react";
class Click extends Component{
    render(){
        const onClick =(name) => {
            alert("Alert "+this.props.name)
        }
        
        return(
            <div>
                <button  onClick={() => onClick("Steve")}>Button</button>
            </div>
        )
    }
}
export default Click;