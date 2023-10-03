import React from "react";
import { useState } from "react";
function Click(props){
    const [isHovering,setIsHovering] = useState(false);
    const [isClicked,setIsClicked] = useState(false);
    function onDoubleClick(){
        alert("Hello double click")
        setIsClicked(true);
    }
    const onMouseOver =  (e) => {
        e.target.style.background = 'red';
        setIsHovering(true);
    }
    function onMouseOut(e) {
        e.target.style.background = 'green';
        setIsHovering(false);
    }
    return(
        <div>
            <button onDoubleClick={()  => onDoubleClick()} onMouseLeave={onMouseOut} onMouseEnter={onMouseOver}>Click me !</button>
            {isHovering && (
                    <div>
                        <h2>{props.hoveredMessage}</h2>
                    </div>
            )}
            {isClicked && (
                    <div>
                        <h2>{props.clickedMessage}</h2>
                    </div>
            )}
        </div>
    )
}
export default Click;