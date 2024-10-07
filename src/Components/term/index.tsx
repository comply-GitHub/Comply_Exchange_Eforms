import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
 import Paper from "@mui/material/Paper";
import DialogEdit from "../reusables/ElectronicSign";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import GlobalValues from "../../Utils/constVals";
import { useSelector } from "react-redux";
import "./btnStyle.scss";
import useAuth from "../../customHooks/useAuth";
export default function Term() {
  const history = useNavigate();
  const { authDetails } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //States
  const Version =localStorage.getItem("Version");
  const ahdData: any = useSelector((state: any) => state?.accountHolder);
  const LoadRoute = () => {
   
  }

  useEffect(()=>{
    document.title = "Comply Exchange"
  },[])

  useEffect(() => {
    LoadRoute();
  }, [])

  const handleSignout = (e:any) => {
  
    localStorage.clear()
console.log("Logged out");
   
    window.location.replace("/login");

  };

  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <div className="container-fluid">
        <div className="col-lg-12" style={{ padding: "18px" }}>
          <Typography
            style={{
              fontSize: "32px",
              fontWeight: "500",
              color: "white",
              marginTop: "10px",
              marginBottom: "12.8px",
              textAlign: "center"
            }}
          >
            Terms & Conditions
          </Typography>
          <Paper elevation={6} style={{ padding: "17px", textAlign: "justify" }}>
            <div dangerouslySetInnerHTML={{__html: authDetails?.configurations?.termsAndConditions}}/>
            {/* {authDetails?.configurations?.termsAndConditions} */}
          </Paper>
          <div
            className="d-flex mx-5 mt-5 buttonEffect"
            style={{ justifyContent: "center" }}
          >
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleSignout(e);
              }}
              className="btn btn_submit  btn-primary-agent"
            >
              Reject
            </Button>

            <Button
              type="submit"
              onClick={() =>
                history("/Security")
                // setOpen(true)
              }
              
              className="btn btn_submit  btn-primary-agent"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <footer>
          <div className="row mx-1">
            <Typography
              className="mx-2"
              align="left"
              style={{ marginBottom: "10px", color: "white", fontSize: "12px" }}
            >
              © Comply Exchange Ltd.{new Date().getFullYear()} - Version: {Version} - Render
              Time:8.6691538s
            </Typography>

            <div className="col-12 col-sm-8 col-md-6 col-lg-6 footer_nav">
              <ul className="nav inner_header_right"></ul>
            </div>
          </div>
        </footer>
      </div>
      <DialogEdit
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </section>
  );
}
