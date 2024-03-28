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
  // formPDFField  formPDFFieldDataReducer  

  //States
  const history = useNavigate();
  const pdfRef:any = useRef();
  const pdfRefnew = useRef(null);
  const [notView, setNotView] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // const handleDownload = () => {
  //   if (pdfUrl) {
  //     const link = document.createElement("a");
  //     link.href = pdfUrl;
  //     link.setAttribute("download", "generatedPDF.pdf"); // Change the filename if needed
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } else {
  //   }
  // };

useEffect(()=>{
document.title="Thank You"
},[])

  const handleDownload = async () => {
   

      const pixelRatio = 3;
      const canvas = await html2canvas(pdfRef.current, { scale: pixelRatio });
      const pageHeight = 295;
      const imgWidth = 210;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      console.log(imgHeight, canvas.height, imgWidth, canvas.width);
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

  // const exportPDF = () => {

  //     let htmlString = form1;
  //     // let htmlString =  "<!DOCTYPE html><html><body><p><b>This text is bold</b></p><p><i>This text is italic</i></p><p>This is<sub> subscript</sub> and <sup>superscript</sup></p></body></html>";

  // let iframe = document.createElement("iframe");
  // iframe.style.visibility = "hidden";
  // document.body.appendChild(iframe);
  // let iframedoc = iframe.contentDocument ;
  // if(iframedoc){
  //     iframedoc.body.innerHTML = htmlString;
  //     html2canvas(iframedoc.body, {}).then((canvas) => {
  //         const imgWidth = 10  ;
  //         const pageHeight = 10;
  //         const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //         let heightLeft = imgHeight;
  //         let position = 0;
  //         heightLeft -= pageHeight;
  //         const doc = new jsPDF("p", "mm");
  //         doc.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, "", "FAST");
  //         while (heightLeft >= 0) {
  //           position = heightLeft - imgHeight;
  //           doc.addPage();
  //           doc.addImage(
  //             canvas,
  //             "PNG",
  //             0,
  //             position,
  //             imgWidth,
  //             imgHeight,
  //             "",
  //             "FAST"
  //           );
  //           heightLeft -= pageHeight;
  //         }
  //         doc.save("Downld.pdf");
  //       });
  // }else{
  //     console.log("not Found")
  //   }
  //   };

  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      {/* <iframe src={form1}></iframe> */}
      {/* {notView ? (<div ref={pdfRef} dangerouslySetInnerHTML={{__html: form1}} />):""} */}
      <div ref={pdfRef} style={{ paddingBlockStart: "30px" }}>
        <Form8BEN />
      </div>
      {/* Pass setPdfUrl to Form2 */}
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
              {/* <Button
                // type="submit"
                // onClick={()=>{
                //     exportPDF()
                // }}
                onClick={handleDownload}
                style={{
                  border: "1px solid #0095dd",
                  background: "#0095dd",
                  height: "45px",
                  lineHeight: "normal",
                  textAlign: "center",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  borderRadius: "0px",
                  color: "#fff",
                  padding: "0 35px",
                  letterSpacing: "1px",
                }}
                className="btn btn_submit  btn-primary-agent"
              >
                Download PDF
              </Button> */}
              {/* <Form1/> */}

              <div style={{ marginTop: "25px" }}>
                <Button
                  type="submit"
                  onClick={() => {
                    history("/Certificates");
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
              © Comply Exchange Ltd.2023 - Version: 2.2.0.29 - Render
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
