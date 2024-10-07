import React, { useState,useRef, useEffect } from "react";
import FormW8IMY from "../../formPDF/W8IMY";
// import Form1 from "../../formPDF/form1";
import Formw9 from "../../formPDF/formw9";
import FormEXP from "../../formPDF/W8ECI";
import Form8BEN from "../../formPDF/W8BEN";
import Form8BENE from "../../formPDF/W8BENE";

import { Typography, Button } from "@mui/material";

import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";


import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import W8Ben from "../../formPDF/W8BEN";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Term() {

  const history = useNavigate();
  const pdfRef:any = useRef();
  const pdfRefnew = useRef(null);
  const [notView, setNotView] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const Version =localStorage.getItem("Version");
  const Forms = localStorage.getItem("Form") ;
useEffect(()=>{
document.title="Thank You"
},[])

  const handleDownload = async () => {
   

      const pixelRatio = 3;
      const canvas = await html2canvas(pdfRef.current, { scale: pixelRatio });
      const pageHeight = 295;
      const imgWidth = 210;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      const doc = new jsPDF("p", "mm");

      while (heightLeft > 0) {
        doc.addImage(
          canvas,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );
        position -= pageHeight;
        heightLeft -= pageHeight;
        if (heightLeft > 0) doc.addPage();
      }

      doc.save("Download.pdf");
    
  };
  const handleSignout = (e: any) => {
 
    if(Forms == "entity"){
      window.location.replace("/Entity");
    }
    else{
      window.location.replace("/Individual");
    }
    localStorage.clear()
console.log("Logged out");
 
  
  }

 

  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
     
      <div ref={pdfRef} style={{ paddingBlockStart: "30px" }}>
        <Form8BEN />
      </div>
    
      <button onClick={handleDownload}>Download PDF</button>
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
          </Paper>
          <Typography align="center">
            <div className="mt-5" style={{ justifyContent: "center" }}>
            

              <div style={{ marginTop: "25px" }}>
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignout(e);
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
            </div>
          </Typography>
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
    </section>
  );
}
