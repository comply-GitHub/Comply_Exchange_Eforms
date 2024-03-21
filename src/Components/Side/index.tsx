import React, {useState} from "react";
import { useNavigate } from "react-router";
export default function Tab(props:any){
   const {click,setClick}=props
   const history=useNavigate();
    return(
        <div className="overlay-div">
            <div className="overlay-div-group">
                <div className="viewInstructions" onClick={()=>setClick(!click)}>View Instructions</div>
                <div className="viewform" onClick={()=>history("/PDFViewer")}>View Form</div>
                <div className="helpvideo"> 
                {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
                <a href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-" target="popup" onClick={()=>window.open('https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-','name','width=600,height=400')}>Help Video</a>
                </div>
            </div>
        </div>
    )
}