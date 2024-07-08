import React, { useEffect, useState } from "react";
import FormW8IMY from "../../../../../formPDF/W8IMY";
// import Form1 from "../../formPDF/form1";
// import Formw9 from "../../formPDF/formw9";
// import FormEXP from "../../formPDF/formEXP";

import { Typography, Button } from "@mui/material";

import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import { GetBenPdf } from "../../../../../Redux/Actions/PfdActions";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../../../../../customHooks/useAuth";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
// import W8Ben from "../../../../../formPDF/W8BEN";

export default function Term() {
  //States
  const history = useNavigate();
  const pdfRef = useRef(null);
  const pdfRefnew = useRef(null);
  const { authDetails } = useAuth();
  const dispatch = useDispatch();
  const [notView, setNotView] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const authDetailsString = localStorage.getItem("authDetails") || "{}";
  const Version =localStorage.getItem("Version");
  const auth = JSON.parse(authDetailsString);
  const userType = auth?.configurations?.userType;
  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute("download", "generatedPDF.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
    }
  };

  useEffect(() => {
    document.title = "Thank You"
  }, [])



  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >

      <div style={{ paddingBlockStart: "30px" }}>
        {/* <W8Ben/> */}
      </div>

      <div className="container-fluid">
        <div className="col-lg-12 mt-20" style={{ padding: "18px" }}>
          <Paper elevation={6} style={{ padding: "17px", marginTop: "20px" }}>
            <Typography align="center">
              <DoneIcon
                style={{
                  color: "green",
                  fontSize: "50px",
                  fontWeight: "bold",
                  justifyContent: "center",
                }}
              />            </Typography>
            <Typography
              style={{ fontSize: "20px", color: "grey" }}
              align="center"
            >
              Thank you for completing
            </Typography>
            <Typography
              style={{ fontWeight: "550", fontSize: "17px" }}
              align="center"
              className="mt-3"
            >
              The U.S. Withholding Certification Submission Process
            </Typography>
            <Typography
              align="center"
              style={{ fontSize: "15px", color: "grey" }}
            >
              Submitted information has been passed on to our administration
              team to validate against data on file.
            </Typography>
            <Typography
              align="center"
              style={{ fontSize: "15px", color: "black", fontWeight: "550" }}
            >
              You do not need to contact us to confirm delivery.
            </Typography>
            <Typography
              align="center"
              style={{ fontSize: "15px", color: "grey" }}
            >
              You will be contacted if additional information is required.
            </Typography>
            <Typography
              align="center"
              style={{
                fontSize: "15px",
                color: "black",
                marginTop: "15px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              If you are using a public computer, please clear your cookies.
            </Typography>

            <Typography align="center">
              <div className="mt-5" style={{ justifyContent: "center" }}>


                <div style={{ marginTop: "25px" }}>
                  <Button
                    //type="submit"
                    onClick={() => {
                      dispatch(GetBenPdf(authDetails?.accountHolderId, () => { }, () => { }, true))
                    }}
                    style={{
                      border: "1px solid #0095dd",
                      background: "black",
                      height: "35px",
                      lineHeight: "normal",
                      textAlign: "center",
                      fontSize: "16px",
                      marginLeft: "12px",
                      textTransform: "uppercase",
                      borderRadius: "0px",
                      color: "#ffff",
                      padding: "0 35px",
                      letterSpacing: "1px",
                    }}
                    className="btn btn_submit  btn-primary-agent"
                  >
                    Download PDF
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => {
                      history("/login");
                    }}
                    style={{
                      border: "1px solid #0095dd",
                      background: "black",
                      height: "35px",
                      lineHeight: "normal",
                      textAlign: "center",
                      fontSize: "16px",
                      marginLeft: "12px",
                      textTransform: "uppercase",
                      borderRadius: "0px",
                      color: "#ffff",
                      padding: "0 35px",
                      letterSpacing: "1px",
                    }}
                    className="btn btn_submit  btn-primary-agent"
                  >
                    Exit
                  </Button>
                </div>
                {userType === "DC" ? (
                  <div style={{ marginTop: "25px" }}>
                    <Button
                      type="submit"
                      onClick={() => {
                        history("/TaxPayer_DC_BEN");
                      }}
                      style={{
                        border: "1px solid #0095dd",
                        background: "black",
                        height: "45px",
                        lineHeight: "normal",
                        textAlign: "center",
                        fontSize: "16px",
                        marginLeft: "12px",
                        textTransform: "uppercase",
                        borderRadius: "0px",
                        color: "#ffff",
                        padding: "0 35px",
                        letterSpacing: "1px",
                      }}
                      className="btn btn_submit  btn-primary-agent"
                    >
                      Continue To Self Certification Submission
                    </Button>
                  </div>
                ) : ""}
              </div>
            </Typography>
          </Paper>
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
              © Comply Exchange Ltd.2023 - Version: {Version} - Render
              Time:8.6691538s
            </Typography>
            <div className="col-12 col-sm-8 col-md-6 col-lg-6 footer_nav">
              <ul className="nav inner_header_right"></ul>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
