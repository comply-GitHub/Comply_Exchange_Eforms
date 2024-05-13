import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography, Paper, Checkbox, Link } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ExpandMore } from "@mui/icons-material";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import { FormTypeId } from "../../../../Utils/constVals";
import { SubmitSchema } from "../../../../schemas/submit";
import { GetHelpVideoDetails, PostDualCert } from "../../../../Redux/Actions";
import Utils from "../../../../Utils";
import View_Insructions from "../../../viewInstruction";
import { GetW9Pdf } from "../../../../Redux/Actions/PfdActions";
import useAuth from "../../../../customHooks/useAuth";
import SideBar from "../../../Reusable/SideBar";



export default function Classification (props: any){
  const { authDetails } = useAuth();
  const PrevStepData = JSON.parse(localStorage.getItem("SelfCertData") || "{}");

  const history = useNavigate();
  const dispatch = useDispatch();
  const [expandedState, setExpandedState] = React.useState<string | false>("panel1");

  

  const handleChangeAccodionState = (panel: string, panelHeading: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    if (newExpanded) {
      setExpandedState(panel);
      const payload = {
        heading1: panelHeading,
        subheading1:'FATCA Classification -'+ panelHeading+' Cayman',
        selectedHeading : panelHeading,
        selectedSubHeading : 'FATCA Classification -'+ panelHeading+' Cayman'
      
      }
      dispatch({
        type: Utils.actionName.InsertCaymanEntityNonUSFATCAClassification,
        payload,
      });
      //localStorage.setItem("FATCASelfCertData", JSON.stringify(payload));

      localStorage.setItem("clickedPanelHeading", panelHeading);
      localStorage.setItem("Heading1",panelHeading)
      localStorage.setItem("SubHeading1",'FATCA Classification -'+ panelHeading+' Cayman')
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


    useEffect(() => {
      document.title = "FATCA Classification"
    }, [])
    useEffect(() => {
      if(isAccordionVisible===false){
        dispatch({
          type: Utils.actionName.InsertCaymanEntityNonUSFATCAClassification,
          payload: []
        });
      }
     


    }, [isAccordionVisible])

    useEffect(() => {
      console.log("calling")
      //const payload = {};
      dispatch({
        type: Utils.actionName.InsertCaymanEntityNonUSFATCAClassificationEmpty,
      });

    },[])
    


  return (
    <Fragment>
     <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <SideBar/>
      <div className="row w-100">
        <div className="col-4 mt-3">

          <BreadCrumbComponent breadCrumbCode={1310} formName={FormTypeId.BENE} />
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
                // console.log("values", values)
                // setSubmitting(true);
                // const result = {
                //   ...PrevStepData, 
                //   ...values,
                 
                //   statusId: 1,
                // };
              //   const returnPromise = new Promise((resolve, reject) => {
              //   dispatch(
              //     PostDualCert(result, (data: any) => {
              //       localStorage.setItem("SelfCertData", JSON.stringify(result))
              //       resolve(data);
              //     }
              //       , (err: any) => {
              //         reject(err);
              //       }
              //     )
              //   );
              // })
              // return returnPromise;

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
                    FATCA Classification:
                    </Typography>
                    <Button
                     onClick={() =>{ setIsAccordionVisible(!isAccordionVisible)
                      setExpandedState(false)
                     }}
                      style={{ backgroundColor: "#d3ae33",cursor:"pointer",color: "black", fontSize: "12px", fontWeight: "bold" }}
                    >
                    FATCA Classification Guide 
                    </Button>
                  </div>
                
                   <div style={{marginLeft:"10px",marginTop:"10px",backgroundColor:"#fff"}}>
                 
                  <div className="d-flex mt-3">
                    <Typography style={{fontSize:"19px"}}>Select FATCA Classification:</Typography>
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
               FATCA Classification Guide
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
                    FATCA Classification - Introduction Cayman
                  </Typography>
                 
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel2"}
                onChange={handleChangeAccodionState("panel2","Financial Institution")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Financial Institution
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                    FATCA Classification - Financial Institution Cayman
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel3"}
                onChange={handleChangeAccodionState("panel3","Exempt Beneficial Owner")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Exempt Beneficial Owner{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                   FATCA Classification - Exempt Beneficial Owner Cayman
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel4"}
                onChange={handleChangeAccodionState("panel4","Active NFFE")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Active NFFE{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                   FATCA Classification - Active NFFE Cayman
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedState === "panel5"}
                onChange={handleChangeAccodionState("panel5","Direct Reporting NFFE")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Direct Reporting NFFE{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                   FATCA Classification - Direct Reporting NFFE Cayman
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedState === "panel6"}
                onChange={handleChangeAccodionState("panel6","Sponsored Direct Reporting")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Sponsored Direct Reporting{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                    FATCA Classification - Sponsored Direct Reporting NFFE Cayman
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedState === "panel7"}
                onChange={handleChangeAccodionState("panel7","Passive NFFE")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Passive NFFE{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                    FATCA Classification - Passive NFFE Cayman
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              


              <Typography align="center">
                <Button
                 onClick={() => {
                
                  history("/BENEEntityFatcaClassification")
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
               {expandedState==='panel2' ? history("/BENEEntityFatcaClassificationFinancial") : history("/BENEIndividualFatcaClassificationComplete") }

                  
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
                  history("/BENEEntityFatcaClassification")
                  setIsAccordionVisible(false)
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


