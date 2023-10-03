import React,{Component} from "react";
import Style from './StyleComponent2.module.css'
export default class StyleComponent2 extends Component{
    render(){
        return(
            <div>
                <h1 className={Style.heading}>Welcome Back</h1>
            </div>
        )
    }
}