import React,{Component} from "react";
import Style from './StyleComponent1.module.css'
export default class StyleComponent1 extends Component{
    render(){
        return(
            <div>
                <h1 className={Style.heading}>Hello World</h1>
            </div>
        )
    }
}