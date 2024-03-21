import React, { useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  TextField,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Tooltip,
  Link,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Declaration from "../../reusables/Declaration";
import { useNavigate } from "react-router-dom";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function Penalties(props: any) {
  const history = useNavigate()
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    const [showRecoverSection, setShowRecoverSection] = useState(false);

    const toggleRecoverSection = () => {
      setShowRecoverSection(true);
     
     
    };
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [selectedContinue, setselectedContinue] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
  });
  const [toolInfo, setToolInfo] = useState("");

  return (
    <>
       <section
    className="inner_content"
    style={{ backgroundColor: "#0c3d69", marginBottom: "10px" ,height:"100%"}}
  >
     <div className="row w-100 h-100">
              <div className="col-4"  >
          <div className="bg-none" style={{ padding: "10px 0px",height:"100%", }}>
        <Paper style={{ padding: "0px 0px 0px 0px", height:"100%" ,backgroundColor:"#ffffff33"}} >
        
             
                <div className="stepper" >
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChangestatus("panel1")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                          className="accordian-header"
                        >
                          <Typography
                          className="text-uppercase d-flex active"
                            sx={{
                              width: "100%",
                              flexShrink: 0,
                              fontSize: "20px",
                            }}
                          >
                            Step I<img className="steper-check-icon-solid my-auto mx-2"  src={checksolid}/>
                          </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                          <Paper
                            elevation={3}
                            style={{
                              padding: "20px",
                              backgroundColor: "#f0f0f0",
                              overflow: "auto",
                            }}
                          >
                            <ul>
                              <li className="active"> <label className="my-auto">Name and Address </label></li>
                              <li className="active">Account Information(Optional)</li>
                              <li  className="active">Tax Identification Number</li>
                              <li  className="active">Contact Details</li>
                              <li  className="active">Form Selection</li>
                            </ul>
                          </Paper>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChangestatus("panel2")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                          className="accordian-header"
                        >
                                     <Typography
                          className="text-uppercase d-flex"
                            sx={{
                              width: "100%",
                              flexShrink: 0,
                              fontSize: "20px",
                            }}
                          >
                            Step II<img className="steper-check-icon-solid my-auto mx-2"  src={checksolid}/>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Paper
                            elevation={3}
                            style={{
                              padding: "20px",
                              backgroundColor: "#f0f0f0",
                              overflow: "auto",
                            }}
                          >
                           <ul>
                              <li className="active"> <label className="my-auto">Federal Tax</label></li>
                              <li className="active">Exemption from Backup Withholding</li>
                              <li className="active">Exemption from FATCA reporting</li>
                              <li className="active">Tax Identification Number</li>
                             
                            </ul>
                        </Paper>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChangestatus("panel3")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                          className="accordian-header"
                        >
                                     <Typography
                          className="text-uppercase d-flex"
                            sx={{
                              width: "100%",
                              flexShrink: 0,
                              fontSize: "20px",
                            }}
                          >
                            Step III<img className="steper-check-icon-solid my-auto mx-2"  src={checksolid}/>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Paper
                            elevation={3}
                            style={{
                              padding: "20px",
                              backgroundColor: "#f0f0f0",
                              overflow: "auto",
                            }}
                          >
                            <ul>
                              <li > <label className="my-auto">Penalties of Perjury Certification</label></li>
                              <li >Electronic Signature</li>
                              <li>Electronic Signature Confirmation</li>
                              <li>U.S. Tax Certification Complete</li>
                              
                            </ul>
                        </Paper>
                        </AccordionDetails>
                      </Accordion>
                    </div>
          
          
        </Paper>
      </div>
          </div>
          <div className="col-8" style={{backgroundColor:"#ffff" }}> 
      
        <Typography
          align="left"
          style={{ margin: "10px", fontSize: "20px", fontWeight: "550" }}
        >
          Part II Certification<span style={{ color: "red" }}>*</span>
        </Typography>
        <Typography
          align="left"
          style={{ margin: "10px", fontSize: "20px", fontWeight: "550" }}
        >
          W-9 Electronic Substitute Form Statement
        </Typography>
        <Typography
          align="left"
          style={{ margin: "10px", fontSize: "12px", color: "grey" }}
        >
          The Internal Revenue Service does not require your consent to any
          provisions of this document other than the certifications required to
          avoid backup withholding.
        </Typography>
        <div
           className="row"
           style={{
             margin: "10px",

             marginTop: "20px",
           }}
        >
          <div className="col-md-6 col-12 p-0">
            <Typography style={{ fontSize: "15px" }}>
              Signed by<span style={{ color: "red" }}>*</span>
              <span>
                <Tooltip
                  style={{ backgroundColor: "black", color: "white" }}
                  title={
                    <>
                      <Typography color="inherit">
                        Signature information
                      </Typography>
                      <a onClick={() => setToolInfo("basic")}>
                        <Typography
                          style={{
                            cursor: "pointer",
                            textDecorationLine: "underline",
                          }}
                          align="center"
                        >
                          {" "}
                          View More...
                        </Typography>
                      </a>
                    </>
                  }
                >
                  <InfoIcon
                    style={{
                      color: "#ffc107",
                      fontSize: "16px",
                      cursor: "pointer",
                      verticalAlign: "super",
                    }}
                  />
                </Tooltip>
              </span>
            </Typography>
            {toolInfo === "basic" ? (
              <div>
                <Paper
                  style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    width: "70%",
                  }}
                >
                  <Typography>
                    Please enter the name of the authorized signatory.
                  </Typography>

                  <Typography style={{ marginTop: "10px" }}>
                    See 'More Info' for further information on signature
                    requirements.
                  </Typography>
                  <Typography style={{ marginTop: "10px" }}>
                    On submission an electronic version of this form will be
                    sent directly to the requester for their acceptance and
                    further validation. After submission you will be able to
                    save and print a copy for your own records.
                  </Typography>
                  <Typography style={{ marginTop: "10px" }}>
                    We will confirm receipt of the electronic form. Please note
                    that acceptance of the confirmation declaration for
                    electronic signature and the certification statement are
                    performed under penalty of perjury.
                  </Typography>

                  <Link
                    href="#"
                    underline="none"
                    style={{ marginTop: "10px", fontSize: "16px" }}
                    onClick={() => {
                      setToolInfo("");
                    }}
                  >
                    --Show Less--
                  </Link>
                </Paper>
              </div>
            ) : (
              ""
            )}

<TextField
                        style={{
                          color: "#7e7e7e",
                          fontStyle: "italic",
                          height: "3.5rem",
                          width: "100%",
                        }}
                        fullWidth
                        type="text"
                        name="signedBy"
                        
                      />
          </div>

          <div className="col-md-6 col-12">
            <Typography style={{ fontSize: "15px" }}>
              Enter Confirmation Code:<span style={{ color: "red" }}>*</span>
              <span>
                <Tooltip
                  style={{ backgroundColor: "black", color: "white" }}
                  title={
                    <>
                      <Typography color="inherit">
                        Exemptions - Backup Withholding
                      </Typography>
                      <a onClick={() => setToolInfo("password")}>
                        <Typography
                          style={{
                            cursor: "pointer",
                            textDecorationLine: "underline",
                          }}
                          align="center"
                        >
                          {" "}
                          View More...
                        </Typography>
                      </a>
                    </>
                  }
                >
                  <InfoIcon
                    style={{
                      color: "#ffc107",
                      fontSize: "16px",
                      cursor: "pointer",
                      verticalAlign: "super",
                    }}
                  />
                </Tooltip>
              </span>
            </Typography>

            {toolInfo === "password" ? (
              <div>
                <Paper
                  style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                  }}
                >
                  <Typography>
                    To authenticate the electronic signature you must enter the
                    alpha numeric token you received at the start of the
                    process. If you cannot remember your confirmation code, you
                    can click the 'Recover Password' link to answer your
                    security question again and receive it.
                  </Typography>

                  <Typography style={{ marginTop: "10px" }}>
                    If you do not wish to submit the electronic form at this
                    stage, you will need to exit the process and undertake again
                    at a later date.
                  </Typography>

                  <Link
                    href="#"
                    underline="none"
                    style={{ marginTop: "10px", fontSize: "16px" }}
                    onClick={() => {
                      setToolInfo("");
                    }}
                  >
                    --Show Less--
                  </Link>
                </Paper>
              </div>
            ) : (
              ""
            )}
            <div>
            <TextField
                          name="confirmationCode"
                         
                          type="password"
                          style={{ width: "100%" }}
                        />
              <span
             onClick={toggleRecoverSection}
                style={{ fontSize: "12px", color: "blue", marginLeft: "10px" ,cursor:"pointer"}}
              >
                Recover Password
              </span>
            </div>
          </div>
        </div>


{showRecoverSection &&(<div style={{margin:"10px"}}>
  <Typography align="left" style={{fontWeight:"bold"}}>
  Electronic Signature Confirmation Code Recovery
  </Typography>
  <Typography style={{fontSize:"14px"}}>
  To recover your Confirmation Code, please type in your security word below. Select the 'Hint?' if you need a reminder of your security word.
  </Typography>

  <div className="d-flex my-3 col-8">
    <Typography className="my-2 col-4" style={{fontWeight:"bold"}}>Security Word</Typography>
    <TextField className="col-4"
                        style={{
                          color: "#7e7e7e",
                          fontStyle: "italic",
                          height: "3.5rem",
                          width: "50%",
                        }}
                        fullWidth
                        type="text"
                        name="signedBy"
                        
                      />

  </div>
  <div className="d-flex my-3 col-8">
    <Link className="my-2 col-4" >Hint?</Link>
    <TextField className=" col-4 blackText"
                        style={{
                          color: "#7e7e7e",
                          fontStyle: "italic",
                          height: "3.5rem",
                          width: "50%",
                        }}
                        fullWidth
                        type="text"
                        
                        
                      />

  </div>
  <div className="d-flex my-3 col-8 ">
    <Typography className="my-2 col-4" style={{fontWeight:"bold"}}>Security Word</Typography>
    <TextField className="col-4"
                        style={{
                          color: "#7e7e7e",
                          fontStyle: "italic",
                          height: "3.5rem",
                          width: "50%",
                        }}
                        fullWidth
                        type="text"
                       
                        
                      />

  </div>
</div>)}

        <div
                    className="row"
                    style={{
                      margin: "10px",

                      marginTop: "20px",
                    }}
                  >
                    <div className="col-12 col-md-6 p-0">
        <Typography align="left" style={{ margin: "10px" }}>
          <Typography style={{ fontSize: "15px" }}>Date</Typography>
          <TextField
            type="date"
            required
            style={{
              width: "100%",
             
            }}
            value={new Date().toISOString().split('T')[0]}
          />

        </Typography>
</div>
</div>
        <Typography style={{ display: "flex", marginLeft: "10px" }}>
          <Checkbox />
          <Typography
            style={{ fontSize: "13px", color: "black", marginTop: "7px" }}
          >
            Please "check" box to confirm your acceptance with the above
            declarations{" "}
            <span>
              <Tooltip
                style={{ backgroundColor: "black", color: "white" }}
                title={
                  <>
                    <Typography color="inherit">
                      Certification information
                    </Typography>
                    <a onClick={() => setToolInfo("check")}>
                      <Typography
                        style={{
                          cursor: "pointer",
                          textDecorationLine: "underline",
                        }}
                        align="center"
                      >
                        {" "}
                        View More...
                      </Typography>
                    </a>
                  </>
                }
              >
                <InfoIcon
                  style={{
                    color: "#ffc107",
                    fontSize: "16px",
                    cursor: "pointer",
                    verticalAlign: "super",
                  }}
                />
              </Tooltip>
            </span>
          </Typography>
        </Typography>
        {toolInfo === "check" ? (
          <div>
            <Paper
              style={{
                backgroundColor: "#dedcb1",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                This submission <span>must</span> be signed and dated by the
                beneficial owner of the income, or, if the beneficial owner is
                not an individual, by an authorized representative or officer of
                the beneficial owner.
              </Typography>
              <Typography>
                If this submission is being completed by an agent acting under a
                duly authorized power of attorney for the beneficial owner or
                account holder, the form must be accompanied by the power of
                attorney in proper form or a copy thereof specifically
                authorizing the agent to represent the principal in making,
                executing, and presenting the form.
              </Typography>

              <Typography style={{ marginTop: "10px" }}>
                Form 2848, Power of Attorney and Declaration of Representative,
                can be used for this purpose. The agent, as well as the
                beneficial owner or account holder, may incur liability for the
                penalties provided for an erroneous, false, or fraudulent form.
              </Typography>
              <Typography style={{ marginTop: "10px" }}>Ref: EH015</Typography>

              <Link
                href="#"
                underline="none"
                style={{ marginTop: "10px", fontSize: "16px" }}
                onClick={() => {
                  setToolInfo("");
                }}
              >
                --Show Less--
              </Link>
            </Paper>
          </div>
        ) : (
          ""
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <Button
            onClick={() => {
              setOpen2(true);
            }}
            variant="contained"
            style={{ color: "white" }}
          >
            SAVE & EXIT
          </Button>
          <Button
            // onClick={() => {
            //   setOpen2(true);
            // }}
            variant="contained"
            style={{ color: "white" ,marginLeft: "15px"}}
          >
            View Form
          </Button>

          <Button
             onClick={() => {
              history("/Submit")
            //  setOpen2(true)
            }}
            variant="contained"
            style={{ color: "white", marginLeft: "15px" }}
          >
            Submit Electronically
          </Button>
        </div>
        <Typography
          align="center"
          style={{
            color: "#adadac",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          Do you want to go back?
        </Typography>
        <Typography align="center">
          <Button
            variant="contained"
            style={{
              color: "white",
              backgroundColor: "black",
              marginTop: "10px",
              marginBottom: "20px",
            }}
            onClick={() =>
              setselectedContinue({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: true,
                step6: false,
                step7: false,
                step8: false,
              })
            }
          >
            Back
          </Button>
        </Typography>
   
      </div>
    </div>
    </section>
      <Declaration
        open={open2}
        setOpen={setOpen2}
        handleClickOpen={handleClickOpen2}
        handleClose={handleClose2}
      />
    </>
  );
}
