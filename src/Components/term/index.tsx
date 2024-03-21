import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";

import Paper from "@mui/material/Paper";
import DialogEdit from "../reusables/ElectronicSign";

import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import GlobalValues from "../../Utils/constVals";
import { useSelector } from "react-redux";

export default function Term() {
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //States

  const ahdData: any = useSelector((state: any) => state?.accountHolder);
  const LoadRoute = () => {
    // if(ahdData!==null && ahdData!==undefined){      
    //   if(ahdData.businessTypeId===2){
    //     GlobalValues.basePageRoute="/EntityUs";
    //   }else{
    //     GlobalValues.basePageRoute="/IndividualUs";        
    //   }
    // }else{
    //   GlobalValues.basePageRoute="/IndividualUs";
    // }
  }

  useEffect(() => {
    LoadRoute();
  }, [])

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
            <Typography
              style={{ fontWeight: "550", fontSize: "17px" }}
              align="left"
            >
              Group Tax Business Unit
              <span
                style={{
                  fontSize: "12.8px",
                  marginBottom: "11px",
                  marginLeft: "6px",
                  verticalAlign: "super",
                  fontWeight: "500",
                }}
              >
                Generic Terms & Conditions (Client Specific T&C's to be added
                here)
              </span>
            </Typography>
            <Typography
              style={{ fontWeight: "550", fontSize: "17px" }}
              align="left"
              className="mt-3"
            >
              Submissions
            </Typography>
            <Typography align="left" style={{ fontSize: "12.8px", textAlign: "justify" }}>
              By using this site, you may submit, or Comply Exchange may gather,
              certain limited information about you and your usage of the site.
              Subject to the terms of the Privacy Policy Comply Exchange is free
              to use such information for any purpose it deems appropriate.
            </Typography>

            <Typography
              style={{ fontWeight: "550", fontSize: "17px" }}
              align="left"
              className="mt-3"
            >
              No Warranties and Limitation of Liability
            </Typography>
            <Typography align="left" style={{ fontSize: "12.8px", textAlign: "justify" }}>
              TO THE MAXIMUM EXTENT PERMISSIBLE BY APPLICABLE LAW, COMPLY
              EXCHANGE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
              BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY AND
              FITNESS FOR A PARTICULAR PURPOSE. THERE IS NO WARRANTY THAT ANY
              INFORMATION OR SERVICE PROVIDED OR REFERENCED BY THIS SITE IS
              EITHER ACCURATE, THAT SUCH INFORMATION OR SERVICE WILL FULFILL ANY
              OF YOUR PARTICULAR PURPOSES OR NEEDS, OR THAT SUCH INFORMATION OR
              SERVICE DOES NOT INFRINGE ON ANY THIRD PARTY RIGHTS. EXCEPT FOR
              ANY EXPRESS WARRANTIES STATED ON THIS SITE, IF ANY, THE
              INFORMATION AND SERVICES PROVIDED OR REFERENCED ON THIS SITE ARE
              PROVIDED "AS IS," "AS AVAILABLE," AND WITH ALL FAULTS, AND THE
              ENTIRE RISK AS TO SATISFACTORY QUALITY, PERFORMANCE, ACCURACY AND
              EFFORT IS WITH THE USER.
            </Typography>
            <Typography
              align="left"
              style={{ fontSize: "12.8px", textAlign: "justify" }}
              className="mt-3"
            >
              SO WHILE COMPLY EXCHANGE MAY USE REASONABLE EFFORTS TO INCLUDE
              ACCURATE AND UP-TO-DATE INFORMATION ON THE COMPLY EXCHANGE SITE,
              COMPLY EXCHANGE MAKES NO WARRANTIES OR REPRESENTATIONS AS TO ITS
              ACCURACY, TIMELINESS, OR COMPLETENESS. COMPLY EXCHANGE MAY
              PERIODICALLY ADD, CHANGE, OR IMPROVE ANY OF THE INFORMATION,
              PRODUCTS, SERVICES, PROGRAMS, AND TECHNOLOGY DESCRIBED ON THE
              COMPLY EXCHANGE SITE WITHOUT NOTICE. COMPLY EXCHANGE ASSUMES NO
              LIABILITY OR RESPONSIBILITY FOR ANY ERRORS OR OMISSIONS IN THE
              CONTENT OF THE COMPLY EXCHANGE SITE.
            </Typography>

            <Typography
              align="left"
              style={{ fontSize: "12.8px", textAlign: "justify" }}
              className="mt-3"
            >
              IN FACT, YOUR USE OF THE COMPLY EXCHANGE SITE IS AT YOUR OWN RISK.
              TO THE MAXIMUM EXTENT ALLOWED BY LAW, NEITHER COMPLY EXCHANGE NOR
              ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE
              COMPLY EXCHANGE SITE IS LIABLE FOR ANY DIRECT, INDIRECT,
              INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, HOWEVER CAUSED,
              ARISING OUT OF YOUR ACCESS TO, USE OF, OR RELIANCE ON THE COMPLY
              EXCHANGE SITE, EVEN IF COMPLY EXCHANGE HAS BEEN ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES. FOR EXAMPLE, COMPLY EXCHANGE ASSUMES
              NO RESPONSIBILITY FOR, AND WILL NOT BE LIABLE FOR ANY DAMAGES TO
              OR ANY VIRUSES WHICH MAY AFFECT YOUR COMPUTER EQUIPMENT OR OTHER
              PROPERTY ON ACCOUNT OF YOUR ACCESS TO, USE OF, OR DOWNLOADING
              FROM, THE COMPLY EXCHANGE SITE. PLEASE NOTE THAT SOME
              JURISDICTIONS MAY RESTRICT OR DISALLOW THE EXCLUSION OF IMPLIED
              WARRANTIES OR LIMITATIONS OF LIABILITY, SO SOME OF THE ABOVE
              EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU.
            </Typography>

            <Typography
              style={{ fontWeight: "550", fontSize: "17px" }}
              className="mt-3"
              align="left"
            >
              Other Agreements
            </Typography>
            <Typography align="left" style={{ fontSize: "12.8px", textAlign: "justify" }}>
              Your use of the Comply Exchange site, or certain features or
              information provided through the Comply Exchange site, may be
              subject to additional agreements apart from the Rules.
            </Typography>

            <Typography
              style={{ fontWeight: "550", fontSize: "17px" }}
              className="mt-3"
              align="left"
            >
              Links
            </Typography>
            <Typography align="left" style={{ fontSize: "12.8px", textAlign: "justify" }}>
              Comply Exchange has not reviewed all of the sites which are linked
              to or from the Comply Exchange site, and the fact of such links
              does not indicate any approval or endorsement of any material
              contained on any linked site. Comply Exchange is not responsible
              for the contents of any site linked to or from the Comply Exchange
              site; and your connection to any such linked site is at your own
              risk.
            </Typography>
            <Typography
              style={{ fontWeight: "550", fontSize: "17px" }}
              className="mt-3"
              align="left"
            >
              U.S. International Information
            </Typography>
            <Typography align="left" style={{ fontSize: "12.8px", textAlign: "justify" }}>
              Most of the information on the Comply Exchange site applies
              internationally, but a significant amount of information applies
              only to certain countries or regions. Although Comply Exchange
              tries to mark all country- and region-specific.
            </Typography>

          </Paper>
          <div
            className="d-flex mx-5 mt-5"
            style={{ justifyContent: "center" }}
          >
            <Button
              type="button"
              // disabled
              onClick={() => history(GlobalValues.basePageRoute)}
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
              Reject
            </Button>

            <Button
              type="submit"
              onClick={() =>
                history("/Security")
                // setOpen(true)
              }
              style={{
                border: "1px solid #0095dd",
                background: "#0095dd",
                height: "45px",
                lineHeight: "normal",
                textAlign: "center",
                fontSize: "16px",
                marginLeft: "12px",
                textTransform: "uppercase",
                borderRadius: "0px",
                color: "#fff",
                padding: "0 35px",
                letterSpacing: "1px",
              }}
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
              © Comply Exchange Ltd.2023 - Version: 2.2.0.29 - Render
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
