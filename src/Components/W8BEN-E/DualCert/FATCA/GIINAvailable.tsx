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
import { SubmitSchema } from "../../../../schemas/submit";
import { GetHelpVideoDetails, PostDualCert } from "../../../../Redux/Actions";
import { FormTypeId } from "../../../../Utils/constVals";
import exp from "constants";
import Utils from "../../../../Utils";
import View_Insructions from "../../../viewInstruction";
import useAuth from "../../../../customHooks/useAuth";
import { GetW9Pdf } from "../../../../Redux/Actions/PfdActions";
import SideBar from "../../../Reusable/SideBar";
export default function GIINAvailable (props: any){
  const {authDetails} = useAuth();
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
      localStorage.setItem("clickedPanelHeading", panelHeading);

      const payload = {
        heading3: panelHeading,
        subheading3:'FATCA Classification -'+ panelHeading+' Cayman',
        selectedHeading : panelHeading,
        selectedSubHeading : 'FATCA Classification -'+ panelHeading+' Cayman'
      }
      dispatch({
        type: Utils.actionName.InsertCaymanEntityNonUSFATCAClassification,
        payload,
      });
      // localStorage.setItem("FATCASelfCertData", JSON.stringify(payload));


      // dispatch({
      //   type: Utils.actionName.InsertCaymanEntityNonUSFATCAClassification,
      //   payload: {
      //     heading3: panelHeading,
      //     subheading3:'FATCA Classification -'+ panelHeading+' Cayman',
      //     selectedHeading : panelHeading,
      //     selectedSubHeading : 'FATCA Classification -'+ panelHeading+' Cayman'
      //   },
      // });

      localStorage.setItem("Heading3",panelHeading)
      localStorage.setItem("SubHeading3",'FATCA Classification -'+ panelHeading+' Cayman')
    } else {
      setExpandedState(false);
      localStorage.removeItem("clickedPanelHeading");
    }
  };
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
      <SideBar/>
      <div className="row w-100">
        <div className="col-4 mt-3">

          <BreadCrumbComponent breadCrumbCode={1310} formName={FormTypeId.CaymanEntity} />
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
              //   console.log("values", values)
              //   setSubmitting(true);
              //   const result = {
              //     ...PrevStepData, 
              //     ...values,
                 
              //     statusId: 1,
              //   };
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
               
                   <div style={{ backgroundColor: "#fff", padding: "5px" }}>
              <Typography
                className="my-2 mx-2"
                style={{ fontSize: "20px", color: "#1976d2", fontWeight: "bold" }}
              >
               FATCA Classification GUIDE Financial Institution
              </Typography>


              <Accordion
                expanded={expandedState === "panel1"}
                onChange={handleChangeAccodionState("panel1","GIIN AVailable Overview")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    GIIN Available Overview
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                    FATCA Classification - GIIN Available Overview Cayman

                  </Typography>
                 
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel2"}
                onChange={handleChangeAccodionState("panel2","Reporting Model 1 FFI")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                   Reporting Model 1 FFI
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                   FATCA Classification - Reporting Model 1 FFI Cayman
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel3"}
                onChange={handleChangeAccodionState("panel3","Registered Deemed Compliant Foreign Financial Institution ")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                     Registered Deemed Compliant Foreign Financial Institution 
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                  FATCA Classification - Registered Deemed Compliant Foreign Financial Institution Cayman
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expandedState === "panel4"}
                onChange={handleChangeAccodionState("panel4","Reporting Model 2 FFI")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Reporting Model 2 FFI
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                  FATCA Classification - Reporting Model 2 FFI Cayman
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedState === "panel5"}
                onChange={handleChangeAccodionState("panel5","Participating Foreign Financial Institution")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px",color: "black" }}
                  >
                    Participating Foreign Financial Institution
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    style={{ fontSize: "14px",color: "black" }}
                    
                  >
                  FATCA Classification - Participating Foreign Financial Institution Cayman
                  </Typography>
                  
                </AccordionDetails>
              </Accordion>


              <Typography align="center">
              <Button
                 onClick={() => {
                 
                  history("/BENEEntityFatcaClassification")
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
                    
                  }
                    {expandedState!=="panel1"  ? history("/BENEIndividualFatcaClassificationComplete") : history("/BENEIndividualFatcaClassificationComplete")}

                    
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
                 onClick={() =>{setIsAccordionVisible(false)

                  history(-1)
                 }}
                  variant="outlined"
                  style={{
                    color: "#1976E2",
             fontSize:"12px",
             marginLeft: "10px",
                    marginTop: "10px",
                    marginBottom: "20px",
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


