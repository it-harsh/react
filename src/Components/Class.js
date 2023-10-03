import React,{Component} from "react";

class Class extends Component{
    render(){
        return(
            <div>
                <h1>Hello {this.props.name ? this.props.name : "{PASS NAME PROP}"} ,Age : {this.props.age ? this.props.age : "{PASS AGE PROP}"} from Class !!!</h1>
                <h2>{this.props.children}</h2>
            </div>
        )
    }
}
export  default Class