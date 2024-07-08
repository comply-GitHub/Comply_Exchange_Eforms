import { Fragment, useState } from "react";
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
import View_Insructions from "../../../viewInstruction";
export default function Declaration (props: any){

  const PrevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");
  const Headingdata = localStorage.getItem("lastClickedPanelHeading") ;

  const history = useNavigate();
  const dispatch = useDispatch();
  const [expandedState, setExpandedState] = React.useState<string | false>("panel1");

  const handleChangeAccodionState = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpandedState(newExpanded ? panel : false);
  };

  const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }

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

          <BreadCrumbComponent breadCrumbCode={1210} formName={16} />
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
                  Close
                </Button>
                <Button
              onClick={()=>{
                history("/Complete_CRS_ECI")
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


