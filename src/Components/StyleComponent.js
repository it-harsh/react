import React,{Component} from "react";
import './stylecomponent.css'
export default class StyleComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            active:false
        }
    }
    changeStyle = () => {
       this.setState({
        active:true
       })
    }
    render(){
        let styleobj =  {
            color:"red",
            backgroundColor:"Yellow",
            fontSize:"50px"
        }
        // let fontstyleobj  = {
        //     fontSize:"50px",
        //     fontFamily:"Monotype Corsiva"
        // }
        if(this.state.active){
            styleobj.backgroundColor="Blue"
        }

        let x = this.props.check ? "myFont" : "myFont1"

        return(
            <div>
                {/* inline css */}
                {/* <h1 style={{...styleobj, ...fontstyleobj}}>Hello</h1> */}
                {this.state.active && <button style={styleobj} onClick={this.changeStyle}>Click</button>}
                <button style={styleobj} onClick={this.changeStyle}>Click</button>
                
                {/* external css  */}
                <h1 className={`${x} myFont2`}>Hello using external css</h1>
            </div>
        )
    }
}