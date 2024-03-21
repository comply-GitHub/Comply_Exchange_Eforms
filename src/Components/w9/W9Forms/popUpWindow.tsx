import React, { useState } from "react";
export default function PopUp(props: any) {
  const { click, setClick } = props;
  return (
    <div
      className={click ? "popup-sidemenu-active" : "popup-sidemenu-inactive"}
    >
      <div className="popup-sidemenu-inner-div">
        <div className="content">
          <h5>Easy Help</h5>
          {/* <a>test</a> */}
        </div>
        <div className="content">
          <h5>IRS Form Instructions</h5>
          <a>W-8BEN - Foreign Status Individuals</a>
          <a>W-8BEN-E - Foreign Status Entities</a>
          <a>W-8IMY - Intermediaries</a>
          <a>W-8EXP - Exempt Organizations</a>
          <a>W-8ECI - U.S. Place of Business</a>
          <a>W-9 - U.S. Persons</a>
          <a>8233 - Personal Services</a>
        </div>
        <button onClick={()=>setClick(!click)}>
            x
        </button>
      </div>
    </div>
  );
}
