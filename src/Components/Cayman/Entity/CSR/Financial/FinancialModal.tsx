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
import Utils from "../../../../../Utils";
import SideBar from "../../../../Reusable/SideBar";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import { FormTypeId } from "../../../../../Utils/constVals";
import { SubmitSchema } from "../../../../../schemas/submit";
import { PostDualCert } from "../../../../../Redux/Actions";

export default function Declaration (props: any){

  const PrevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");
  const Headingdata = localStorage.getItem("lastClickedPanelHeading") ;
  const crsData = useSelector((state:any) => state?.CRSEntityReducer?.CRSClassificationData);

  localStorage.setItem("CRSSelfCertData", JSON.stringify(crsData));
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
  useEffect(() => {
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
      <SideBar/>
      <div className="row w-100">
        <div className="col-4 mt-3">

          <BreadCrumbComponent breadCrumbCode={1320} formName={FormTypeId.CaymanEntity} />
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


            <div >
                <Paper elevation={0} style={{backgroundColor:"#cecccd80",height:"300px",padding:"20px"}}>
                   <div className="my-3">
                   <Typography className="mt-3" align="center"  style={{fontSize:"13px",fontWeight:"550"}}>You have selected the below entity type for Chapter 4 purposes</Typography>
<Typography className="mt-3" align="center" style={{fontSize:"30px",fontWeight:"bold"}}>{Headingdata}
</Typography>
<Typography className="mt-3 mx-5" align="center"  style={{fontSize:"13px",fontWeight:"500"}}>If this is correct please select Confirm and you will be taken to the next stage of the submission process and will be asked questions relating to this entity type only. If this is not the correct selection please select Back which will take you back to the previous selection page, or close this help tool and make a direct selection from the drop down list.</Typography>
                   </div>

                </Paper>
            </div>

              


              <Typography align="center">
                {/* <Button
                 
                 onClick={() =>{
                    history(-1)
                    setIsAccordionVisible(false)
                }}
                  variant="outlined"
                  style={{
                    color: "#1976E2",
             fontSize:"10px",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Close
                </Button>
                <Button
              onClick={()=>{
                history("/Cayman/Entity/CRS/Complete")
              }}
                  variant="contained"
                 
                  style={{

                    fontSize:"10px",
                    marginTop: "10px",
                    marginBottom: "20px",
                    marginLeft: "10px"

                  }}
                >
                  Confirm
                </Button>

                <Button
                 
                 onClick={() =>{
                    history(-1)
                    setIsAccordionVisible(false)
                }}
                  variant="outlined"
                  style={{
                    color: "#1976E2",
                    fontSize:"10px",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Back
                </Button> */}

<Button
                 onClick={() => {
                
                  history("/Cayman/Entity/CRS/Start")
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
                 //disabled={!isContinueEnabled} 
                 onClick={() => {
                  setExpandedState(false)
                  history("/Cayman/Entity/CRS/Complete")
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
                  history(-1)
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

            {/* <Typography
                    align="center"
                    style={{
                      color: "#505E50",  
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

                      onClick={() => {
                        history(-1)
                      }}
                    >
                      Back
                    </Button>
                  </Typography> */}
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


