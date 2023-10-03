import React,{Component} from "react";
class ChildComponent extends Component{
    render(){
        return(
        <>
            <button onDoubleClick={() => this.props.callMethod("Gujju")}>Click</button>
        </>
        )
    }
}
export default ChildComponent