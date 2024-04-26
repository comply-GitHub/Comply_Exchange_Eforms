import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography, Paper, Checkbox, Link, Input } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ExpandMore } from "@mui/icons-material";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import { FormTypeId } from "../../../../Utils/constVals";
import { SubmitSchema } from "../../../../schemas/submit";
import { PostDualCert } from "../../../../Redux/Actions";
import Utils from "../../../../Utils";



export default function Final (props: any){

  const PrevStepData = JSON.parse(localStorage.getItem("SelfCertData") || "{}");

  const history = useNavigate();
  const dispatch = useDispatch();
  const [isAccordionVisible, setIsAccordionVisible] = useState<boolean>(false);
  const FATCAClassificationData = useSelector((state:any) => state?.CaymanEntity?.FATCAClassificationData);

  console.log("FATCAClassificationData",FATCAClassificationData)
  

  
    const initialValue = {
        selectedHeading: FATCAClassificationData?.selectedHeading ? FATCAClassificationData?.selectedHeading : "",
        selectedSubHeading: FATCAClassificationData?.selectedSubHeading ? FATCAClassificationData?.selectedSubHeading : "",
        GIIN:""
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
                     onClick={() =>{ 
                        history("Cayman/Entity/FATCA")
                      
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

              
              


              <Typography align="center">
                <Button
                 onClick={() => {
                
                  history("/Cayman/Entity/FATCA")
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
                {/* <Button
                 onClick={() => { 
                  history("/Cayman/Entity/FATCA")
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
                </Button> */}
                
              </Typography>

                
            </div>
            )}

            
                <Typography>
                    Select Status:
                </Typography>
                <Input
                    name="selectedHeading"
                    value={
                    values.selectedHeading
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.selectedHeading &&
                    errors.selectedHeading
                    )}
                    disabled={values.selectedHeading}
                    style={{
                    border: " 1px solid #d9d9d9 ",
                    padding: " 0 10px",
                    color: "#121112",
                    fontStyle: "italic",
                    height: "50px",
                    width: "100%",
                    }}
                />  

                <Typography>
                    Please provide GIIN here:
                </Typography>
                <Input
                    name="GIIN"
                    value={
                    values.GIIN
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.GIIN &&
                    errors.GIIN
                    )}
                    style={{
                    border: " 1px solid #d9d9d9 ",
                    padding: " 0 10px",
                    color: "#121112",
                    fontStyle: "italic",
                    height: "50px",
                    width: "100%",
                    }}
                />  

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


