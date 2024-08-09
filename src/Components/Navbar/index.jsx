import React, { useEffect, useState } from "react";
import { Button, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import GoogleTranslate from "../Reusable/multilanguage";
import { display } from "@mui/system";
import useAuth from "../../customHooks/useAuth";
import { Link } from "react-router-dom";

export default function Nav() {
  const [languageDropdown, setLanguageDropDown] = useState(false);
  const [logoUrl,setLogoUrl]=useState(
    require("../../assets/img/logo.png")
    
)
  const [logoNavigateUrl,setLogoNavigateUrl]=useState("/login")
  const hiddenRoutes = ["login", ""];
  const { authDetails } = useAuth();
  const urlValue = window.location.pathname.substring(1);
  const isHide = hiddenRoutes.includes(urlValue);
  const history = useNavigate();

  const handleSignout = (e) => {
  
    localStorage.clear();
   
    window.location.replace("/login");

  };

  const returnTransale = () => {
    if (authDetails?.configurations?.languageDropdown) {
      return <GoogleTranslate />;
    }
  };
  useEffect(() => {
    console.log(authDetails, "languageDropdown");
    setLanguageDropDown(authDetails?.configurations?.languageDropdown);
   
  }, [authDetails]);
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        display: isHide ? "none" : "block",
      }}
    >
      <div
        className="m-2"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
      <Link to={logoNavigateUrl}>
        <img
          style={{ width: "250px", padding: "20px" }}
          className="navbar img-fluid"
          loading="eager"
      
          src={logoUrl}

        />
        </Link>
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
              onClick={(e) => {
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
