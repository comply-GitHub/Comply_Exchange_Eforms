import React, { useEffect, useState } from "react";
import { Button, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import GoogleTranslate from "../Reusable/multilanguage";
import { display } from "@mui/system";
import useAuth from "../../customHooks/useAuth";

export default function Nav( ) {
  const [languageDropdown,setLanguageDropDown]=useState(false)
  const hiddenRoutes=["login",""]
  const { authDetails } = useAuth();
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

  const returnTransale=()=>{
    if(authDetails?.configurations?.languageDropdown){
return (<GoogleTranslate />)
    }
  }
  useEffect(()=>{
    console.log(authDetails,"languageDropdown")
    setLanguageDropDown(authDetails?.configurations?.languageDropdown)
  },[authDetails])
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
        <div className="my-auto" style={{ height: "40px", display: "flex" }}>
       {returnTransale()}

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
              style={{ borderRadius: "30px", minWidth: "max-content",boxShadow:"none" }}
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
