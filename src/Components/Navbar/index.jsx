import React from "react";
import { Button, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import GoogleTranslate from "../Reusable/multilanguage";
import { display } from "@mui/system";

export default function Nav( ) {
  const hiddenRoutes=["login",""]
  const urlValue = window.location.pathname.substring(1);
  const isHide=hiddenRoutes.includes(urlValue);

  const history=useNavigate()
  

  const handleSignout=(e)=>{
    //clear call data
    localStorage.clear();
    //dispatch actions to clear store

    //redirect to login
    window.location.replace("/login")
    // history(
    //   "login"
    // )
  }

  return (
    <div style={{ width: "100%", backgroundColor: "white", display:isHide?"none":"block" }}>
      <div
        className="m-2"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <img
          style={{maxWidth:"250px",padding:"20px" }}
          className="navbar"
          src={require("../../assets/img/logo.png")}
        />
        <div className="my-auto" style={{ height: "40px", display: "flex" ,marginRight:"25px"}}>
        <GoogleTranslate />

          <Tooltip
            style={{ backgroundColor: "black", color: "white" }}
            title={
              <Typography>
                Are you sure you want to exit the process?
              </Typography>
            }
          >
            <Button
              className="my-auto mx-2"
              style={{ borderRadius: "30px", minWidth: "max-content",boxShadow:"none",maxWidth:"30%" }}
              variant="contained"
              onClick={(e)=>{
                e.preventDefault();
                handleSignout(e);
              }}
            >
              Sign out
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
