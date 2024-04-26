import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button, Typography, Paper} from "@mui/material";
import { FormTypeId } from "../../../../Utils/constVals";
import { Formik } from "formik";
import {  postSCFATCAClassification } from "../../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import useAuth from "../../../../customHooks/useAuth";
export default function Declaration (props: any){

  const { authDetails } = useAuth();
  const PrevStepData = JSON.parse(localStorage.getItem("SelfCertData") || "{}");

  const FATCAClassificationData = useSelector((state:any) => state?.CaymanEntity?.FATCAClassificationData);

  console.log("FATCAClassificationData",FATCAClassificationData)
  const selectedHeading = localStorage.getItem("lastClickedPanelHeading") ;
  const selectedSubHeading = 'FATCA Classification -'+ selectedHeading+' Cayman';


  const heading1  = localStorage.getItem("Heading1") ? localStorage.getItem("Heading1") : "" ;
  const subheading1  = localStorage.getItem("SubHeading1")  ? localStorage.getItem("SubHeading1") : "" ;

  const heading2  = localStorage.getItem("Heading2") ? localStorage.getItem("Heading2") : "" ;
  const subheading2  = localStorage.getItem("SubHeading2") ? localStorage.getItem("SubHeading2")   :"";

  const heading3  = localStorage.getItem("Heading3") ? localStorage.getItem("Heading3") : "" ;
  const subheading3  = localStorage.getItem("SubHeading3") ? localStorage.getItem("SubHeading3") : "" ;

  const heading4  = localStorage.getItem("Heading4") ? localStorage.getItem("Heading4") : "" ;
  const subheading4  = localStorage.getItem("SubHeading4") ? localStorage.getItem("SubHeading4") : "" ;

  const heading5  = localStorage.getItem("Heading5") ? localStorage.getItem("Heading5")  : "" ;
  const subheading5  = localStorage.getItem("SubHeading5") ? localStorage.getItem("SubHeading5")  : "" ;
 

  const history = useNavigate();
  const dispatch = useDispatch();
  const [expandedState, setExpandedState] = React.useState<string | false>("panel1");

  const handleChangeAccodionState = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpandedState(newExpanded ? panel : false);
  };

  const isContinueEnabled = expandedState !== "panel1";
  const [isAccordionVisible, setIsAccordionVisible] = useState<boolean>(false);


  


    const initialValue = {
      id:0,
      // agentId: authDetails.agentId,
      // accountHolderBasicDetailId: authDetails.accountHolderId,
      formTypeId: FormTypeId.CaymanEntity,
      formEntryId:0,
      classificationType : "FATCA",
      userType:"Agent",
      heading1:heading1 ? heading1 : "",
      subheading1:subheading1 ? subheading1 : "",
      heading2:heading2 ? heading2 : "",
      subheading2:subheading2 ? subheading2 : "",
      heading3:heading3 ? heading3 : "",
      subheading3:subheading3 ? subheading3 : "",
      heading4:heading4 ? heading4 : "",
      subheading4:subheading4 ? subheading4 : "",
      heading5:heading5 ? heading5 : "",
      subheading5:subheading5 ? subheading5 : "",
      selectedHeading: selectedHeading ? selectedHeading : "",
      selectedSubHeading: selectedSubHeading ? selectedSubHeading : "",
    };


  return (
    <Fragment>
     <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions">View Instructions</div>
          <div className="viewform">View Form</div>
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

          <BreadCrumbComponent breadCrumbCode={1320} formName={FormTypeId.CaymanEntity} />
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

                const submitData = {
                  agentId: authDetails.agentId,
                  accountHolderDetailsId: authDetails.accountHolderId,
                  ...PrevStepData,
                  ...values,
                  stepName: null
                };


                
                console.log("submitData", submitData)
                const returnPromise = new Promise((resolve, reject) => {
                dispatch(
                  postSCFATCAClassification(submitData, (data: any) => {
                    localStorage.setItem("SelfCertData", JSON.stringify(submitData))
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
               FATCA Classification Guide
              </Typography>


            <div >
                <Paper elevation={0} style={{backgroundColor:"#cecccd80",height:"300px",padding:"20px"}}>
                   <div className="my-3">
                   <Typography className="mt-3" align="center"  style={{fontSize:"13px",fontWeight:"550"}}>You have selected the below entity type for  FATCA Classification purposes</Typography>
<Typography className="mt-3" align="center" style={{fontSize:"30px",fontWeight:"bold"}}>{selectedHeading}
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
                type="submit"
              // onClick={()=>{
              //   history("/Cayman/Entity/FATCA")
              // }}
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


