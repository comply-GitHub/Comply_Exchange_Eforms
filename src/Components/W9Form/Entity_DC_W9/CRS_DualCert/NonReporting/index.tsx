import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { SubmitSchema } from "../../../../../schemas/submit";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography, Paper, Checkbox, Link } from "@mui/material";
import Divider from "@mui/material/Divider";
import GlobalValues, { FormTypeId } from "../../../../../Utils/constVals";
import { Form, Formik } from "formik";
import { W8_state_ECI,PostDualCert } from "../../../../../Redux/Actions";
import { useDispatch } from "react-redux";
import SaveAndExit from "../../../../Reusable/SaveAndExit/Index";
import { ExpandMore } from "@mui/icons-material";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import Utils from "../../../../../Utils";
import View_Insructions from "../../../../viewInstruction";
export default function Declaration (props: any){

  const PrevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");
  const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }
  const history = useNavigate();
  const dispatch = useDispatch();
  const [expandedState, setExpandedState] = React.useState<string | false>("panel1");

  const handleChangeAccodionState = (panel: string, panelHeading: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    if (newExpanded) {
      setExpandedState(panel);
      dispatch({
        type: Utils.actionName.InsertCRSEntityNonUSClassification,
        payload: {
          heading1: panelHeading,
          subheading1:'CRS Classification -'+ panelHeading,
          selectedHeading : panelHeading,
          selectedSubHeading : 'CRS Classification -'+ panelHeading
        
        },
      })
      localStorage.setItem("clickedPanelHeading", panelHeading);
      localStorage.setItem("Heading1",panelHeading)
      localStorage.setItem("SubHeading1",'CRS Classification -'+ panelHeading)
    } else {
      setExpandedState(false);
      localStorage.removeItem("clickedPanelHeading");
    }
  };
  useEffect(() => {
    console.log("expandedState",expandedState)
    if(expandedState=== 'panel1'){
      localStorage.removeItem("Heading1");
      localStorage.removeItem("SubHeading1");
      localStorage.removeItem("Heading2");
      localStorage.removeItem("SubHeading2");
      localStorage.removeItem("Heading3");
      localStorage.removeItem("SubHeading3");
      localStorage.removeItem("Heading4");
      localStorage.removeItem("SubHeading4");
    }
  },[expandedState])
  const isContinueEnabled = expandedState !== "panel1";
  const [isAccordionVisible, setIsAccordionVisible] = useState<boolean>(false);
  
    const initialValue = {
    isAgreeWithDeclaration: false,
    isConsentReceipentstatement: false,
    isNotConsentReceipentstatement: false
    };


  return (
    <Fragment>
     <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <View_Insructions canvaBx={canvaBx} handleCanvaClose={handleCanvaClose} />
      {canvaBx === true ? (<div className="offcanvas-backdrop fade show" onClick={() => { handleCanvaClose() }}></div>) : null}
              <div className="overlay-div">
                <div className="overlay-div-group">
                <div className="viewInstructions" onClick={() => { handleCanvaOpen(); }}>View Instructions</div>
          <div className="viewform">View Form</div>
          <div className="helpvideo">
            <a
              href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor behavior
                window.open(
                  "https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-",
                  "popupWindow",
                  "width=600,height=400"
                )
              }}
            >
              Help Video
            </a>
          </div>
        </div>
      </div>
      <div className="row w-100">
        <div className="col-4 mt-3">

          <BreadCrumbComponent breadCrumbCode={1210} formName={13} />
        </div>

        <div className="col-8 mt-3">
         
        <div style={{ padding: "11px" }}>
          <Paper style={{ padding: "10px" }}>
            <Formik
            validateOnChange={true}
            validateOnBlur={true}
              initialValues={initialValue}
              validationSchema={SubmitSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log("values", values)
                setSubmitting(true);
                const result = {
                  ...PrevStepData, 
                  ...values,
                 
                  statusId: 1,
                };
                const returnPromise = new Promise((resolve, reject) => {
                dispatch(
                  PostDualCert(result, (data: any) => {
                    localStorage.setItem("DualCertData", JSON.stringify(result))
                    resolve(data);
                  }
                    , (err: any) => {
                      reject(err);
                    }
                  )
                );
              })
              return returnPromise;

            }}
            >
              {({
                errors,
                touched,
                handleBlur,
                values,
                handleSubmit,
                handleChange,
                isSubmitting,
                setFieldValue,
                submitForm,
                isValid
              }) => (
                <form onSubmit={handleSubmit}>
               
                   <div style={{ backgroundColor: "#fff", padding: "5px" }}>
              <Typography
                className="my-2 mx-2"
                style={{ fontSize: "20px", color: "#1976d2", fontWeight: "bold" }}
              >
               CRS Classification Guide
              </Typography>


              <Accordion
                expanded={expandedState === "panel1"}
                onChange={handleChangeAccodionState("panel1","Non-Reporting Financial Institution under CRS Overview")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Non-Reporting Financial Institution under CRS Overview
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                    No key is specified for this content block
                  </Typography>
                 
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel2"}
                onChange={handleChangeAccodionState("panel2"," Governmental Entity")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                  Governmental Entity
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                  CRS Classification - Governmental Entity
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel3"}
                onChange={handleChangeAccodionState("panel3","International Organization Under CRS")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    International Organization Under CRS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                 CRS Classification - International Organization Under CRS
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel4"}
                onChange={handleChangeAccodionState("panel4","Central Bank")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Central Bank
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                 CRS Classification - Central Bank
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel5"}
                onChange={handleChangeAccodionState("panel5","Broad Participation Retirement Fund")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                   Broad Participation Retirement Fund
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                CRS Classification - Broad Participation Retirement Fund
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel6"}
                onChange={handleChangeAccodionState("panel6"," Narrow Participation Retirement Fund")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Narrow Participation Retirement Fund
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                CRS Classification - Narrow Participation Retirement Fund
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel7"}
                onChange={handleChangeAccodionState("panel7","Pension Fund of a Governmental Entity, International Organization, or Central Bank")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                   Pension Fund of a Governmental Entity, International Organization, or Central Bank
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                 CRS Classification - Pension Fund of a Governmental Entity, International Organization, or Central Bank
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel8"}
                onChange={handleChangeAccodionState("panel8","Exempt Collective Investment Vehicle")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                   Exempt Collective Investment Vehicle
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                 CRS Classification - Exempt Collective Investment Vehicle
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel9"}
                onChange={handleChangeAccodionState("panel9","Trust whose trustee reports all required information with respect to all CRS Reportable Accounts")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                   Trust whose trustee reports all required information with respect to all CRS Reportable Accounts
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                CRS Classification - Trust whose trustee reports all required information with respect to all CRS Reportable Accounts
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel10"}
                onChange={handleChangeAccodionState("panel10"," Qualified Credit Card Issuer")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                   Qualified Credit Card Issuer
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
               CRS Classification - Qualified Credit Card Issuer
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel11"}
                onChange={handleChangeAccodionState("panel11","Other Entity defined under the domestic law as low risk of being used to evade tax")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                   Other Entity defined under the domestic law as low risk of being used to evade tax
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                CRS Classification - Other Entity defined under the domestic law as low risk of being used to evade tax
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
            
              


              <Typography align="center">
              <Button
                 onClick={() => {
                 
                  history("/CRS_W9_DC")
                }}
                  variant="outlined"
                  style={{
                    color: "#1976E2",
                    fontSize:"12px",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Close
                </Button>
                
                <Button
                 disabled={!isContinueEnabled} 
                  variant="contained"
                  onClick={() => {
                    const clickedPanelHeading = localStorage.getItem("clickedPanelHeading");
                     if (clickedPanelHeading) {
                    localStorage.setItem("lastClickedPanelHeading", clickedPanelHeading);
                    history("/FinancialReport_CRS_W9_DC");
                  }
                }}
                  style={{
fontSize:"12px",
                 
                    marginTop: "10px",
                    marginBottom: "20px",
                    marginLeft: "10px"

                  }}
                >
                  Confirm
                </Button>
                <Button
                 onClick={() => {setIsAccordionVisible(false)
                  history(-1)
                 }}
                  variant="outlined"
                  style={{
                    color: "#1976E2",
                     fontSize:"12px",
                    marginTop: "10px",
                    marginBottom: "20px",
                    marginLeft: "10px"
                  }}
                >
                  Back
                </Button>
                
              </Typography>

            </div>

            

                
                </form>
           
              )}
            </Formik>
          </Paper>
          </div>
        </div>
   
      </div>
      </section>
    </Fragment>
  );
};


