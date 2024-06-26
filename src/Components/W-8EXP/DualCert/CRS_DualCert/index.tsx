import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { SubmitSchema } from "../../../../schemas/submit";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography, Paper, Checkbox, Link } from "@mui/material";
import Divider from "@mui/material/Divider";
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import { Form, Formik } from "formik";
import { W8_state_ECI,PostDualCert } from "../../../../Redux/Actions";
import { useDispatch } from "react-redux";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import { ExpandMore } from "@mui/icons-material";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import Utils from "../../../../Utils";
import { GetEXPDCPdf } from "../../../../Redux/Actions/PfdActions";
import useAuth from "../../../../customHooks/useAuth";
export default function Declaration (props: any){

  const PrevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");

  const history = useNavigate();
  const dispatch = useDispatch();
  const [expandedState, setExpandedState] = React.useState<string | false>("panel1");
  const handleChangeAccodionState = (panel: string, panelHeading: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
    //CRSEntityReducer
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
  const isContinueEnabled = expandedState !== "panel1";
  const [isAccordionVisible, setIsAccordionVisible] = useState<boolean>(false);
  const { authDetails } = useAuth();
    const initialValue = {
    isAgreeWithDeclaration: false,
    isConsentReceipentstatement: false,
    isNotConsentReceipentstatement: false
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

    useEffect(() => {
      document.title = "CRS Classification"
    }, [])
  return (
    <Fragment>
     <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions">View Instructions</div>
          <div className="viewform" onClick={() => {
                              dispatch(GetEXPDCPdf(authDetails?.accountHolderId))
                            }}>View Form</div>
          <div className="helpvideo">
            <a
              href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-"
              target="popup"
              onClick={() =>
                window.open(
                  "https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-",
                  "name",
                  "width=600,height=400"
                )
              }
            >
              Help Video
            </a>
          </div>
        </div>
      </div>
      <div className="row w-100">
        <div className="col-4 mt-3">

          <BreadCrumbComponent breadCrumbCode={1210} formName={17}/>
        </div>

        <div className="col-8 mt-3">
         
        <div style={{ padding: "11px" }}>
          <Paper style={{ padding: "10px" }}>
            <Formik
            validateOnChange={true}
            validateOnBlur={true}
              initialValues={initialValue}
              // validationSchema={SubmitSchema}
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
                 {!isAccordionVisible && ( <>
                   <div style={{justifyContent:"space-between",display:"flex",marginTop:"10px"}}>
                  <Typography
                      align="left"
                      style={{
                        fontSize: "27px",
                        color: "black",
                        fontWeight: "bold",
                        marginLeft:'10px'
                      
                      }}
                    >
                    CRS Classification:
                    </Typography>
                    <Button
                     onClick={() =>{ setIsAccordionVisible(!isAccordionVisible)
                      setExpandedState(false)
                     }}
                      style={{ backgroundColor: "#d3ae33",cursor:"pointer",color: "black", fontSize: "12px", fontWeight: "bold" }}
                    >
                    CRS Classification Guide
                    </Button>
                  </div>
                
                   <div style={{marginLeft:"10px",marginTop:"10px",backgroundColor:"#fff"}}>
                 
                  <div className="d-flex mt-3">
                    <Typography style={{fontSize:"19px"}}>Select CRS Classification:</Typography>
                    <Link className="mx-2"  onClick={() => setIsAccordionVisible(!isAccordionVisible)}style={{fontSize:"19px",textDecorationLine:"none",color:"#1149c4",cursor:"pointer"}}>Click Here to start Process</Link>
                  </div>
                   </div>
                  
                 </>)}
              {isAccordionVisible && (
              <div style={{ backgroundColor: "#fff", padding: "5px" }}>
              <Typography
                className="my-2 mx-2"
                style={{ fontSize: "20px", color: "#1976d2", fontWeight: "bold" }}
              >
               CRS Classification Guide
              </Typography>


              <Accordion
                expanded={expandedState === "panel1"}
                onChange={handleChangeAccodionState("panel1","Introduction")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Introduction
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "17px", color: "#1976d2", fontWeight: "bold" }}
                    
                  >
                    FATCA & CRS Classification Guide- CRS Introduction
                  </Typography>
                 
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel2"}
                onChange={handleChangeAccodionState("panel2","Financial Institution CRS")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Financial Institution CRS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                    Chapter 4 Classification - Financial Entity Overview
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel3"}
                onChange={handleChangeAccodionState("panel3","Active Non Financial Entity")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Active Non Financial Entity{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                   CRS Classification - Active Non-Financial Entity
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel4"}
                onChange={handleChangeAccodionState("panel4","Passive Non Financial Entity")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Passive Non Financial Entity{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                   CRS Classification - Passive Non-Financial Entity
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>

              


              <Typography align="center">
                <Button
                 onClick={() => {
                
                  history("/Complete_CRS_ECI")
                  setExpandedState(false)
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
                 onClick={() => {
                  setExpandedState(false)
                  const clickedPanelHeading = localStorage.getItem("clickedPanelHeading");
                  if (clickedPanelHeading) {
                 localStorage.setItem("lastClickedPanelHeading", clickedPanelHeading);
                 
               }
                  if (expandedState === "panel2") {
                    history("/Financial_CRS_ECI_DC");
                  } else if (expandedState === "panel3") {
                    history("/Active_Non_Financial_ECI_DC");
                  }
                  else if(expandedState === "panel4"){
                    history("/FinancialReport_CRS_ECI_DC");
                    // history("/Passive_Non_Financial_W9_DC")
                  }
                }}
                  variant="contained"
                 
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
                 onClick={() => { 
                  history("/Complete_CRS_ECI")
                  setExpandedState(false)
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
            )}

            
            

{!isAccordionVisible && (<div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "40px",

                    }}
                  >
                   
                    <Button
                     onClick={() => {
                      dispatch(GetEXPDCPdf(authDetails?.accountHolderId))
                    }}
                       
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" ,fontSize:"12px",}}
                    >
                      View Form
                    </Button>

                    <Button    

                      disabled           
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" ,fontSize:"12px",}}
                    >
                      Confirm
                    </Button>
                  </div>)}
                
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


