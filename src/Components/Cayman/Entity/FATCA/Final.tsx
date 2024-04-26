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
        heading1:FATCAClassificationData?.heading1 ? FATCAClassificationData?.heading1 : "",
        subHeading1:FATCAClassificationData?.subheading1 ? FATCAClassificationData?.subheading1 : "",
        heading2:FATCAClassificationData?.heading2 ? FATCAClassificationData?.heading2 : "",
        subHeading2:FATCAClassificationData?.subheading2 ? FATCAClassificationData?.subheading2 : "",
        heading3:FATCAClassificationData?.heading3 ? FATCAClassificationData?.heading3 : "",
        subHeading3:FATCAClassificationData?.subheading3 ? FATCAClassificationData?.subheading3 : "",
        heading4:FATCAClassificationData?.heading4 ? FATCAClassificationData?.heading4 : "",
        subHeading4:FATCAClassificationData?.subheading4 ? FATCAClassificationData?.subheading4 : "",
        heading5:FATCAClassificationData?.heading5 ? FATCAClassificationData?.heading5 : "",
        subHeading5:FATCAClassificationData?.subheading5 ? FATCAClassificationData?.subheading5 : "",
        selectedHeading: FATCAClassificationData?.selectedHeading ? FATCAClassificationData?.selectedHeading : "",
        selectedSubHeading: FATCAClassificationData?.selectedSubHeading ? FATCAClassificationData?.selectedSubHeading : "",
        GIIN:"",
        fullnameofsponsorsntity:"",
        sponsorentitygiin:"",
        trusteegiin:"",
        exemption:"",
        status:"",
        qualifyingcriteria:"",
        directreportinggiin:""
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
                    <Link className="mx-2"  onClick={() => {
                
                history("/Cayman/Entity/FATCA")
               }}
                    style={{fontSize:"19px",textDecorationLine:"none",color:"#1149c4",cursor:"pointer"}}>Click Here to start Process</Link>
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

                { values.heading2 === 'GIIN available' && (<>
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
                </>)}
                
                { values.selectedHeading === 'Sponsored FI in a Model 1 IGA jurisdiction' && (<>
                    <Typography>
                    Select Status:
                </Typography>
                <Typography>
                {values.selectedHeading}
                </Typography>
                   
                    
                

                <Typography>
                    Please enter the full legal name of the sponsoring entity here:
                </Typography>
                <Input
                    name="fullnameofsponsorsntity"
                    value={
                    values.fullnameofsponsorsntity
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.fullnameofsponsorsntity &&
                    errors.fullnameofsponsorsntity
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
                <Typography>
                Please provide the sponsoring entity's GIIN here:

                </Typography>
                <Input
                    name="sponsorentitygiin"
                    value={
                    values.sponsorentitygiin
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.sponsorentitygiin &&
                    errors.sponsorentitygiin
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
                </>)}



                { values.selectedHeading === 'Sponsor has obtained a Sponsored Entity GIIN on its behalf' && (<>
                    <Typography>
                    Select Status:
                </Typography>
                <Typography>
                {values.selectedHeading}
                </Typography>
                   
                    
                

                <Typography>
                    Please enter the full legal name of the sponsoring entity here:
                </Typography>
                <Input
                    name="fullnameofsponsorsntity"
                    value={
                    values.fullnameofsponsorsntity
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.fullnameofsponsorsntity &&
                    errors.fullnameofsponsorsntity
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
                <Typography>
                Please provide the sponsoring entity's GIIN here:

                </Typography>
                <Input
                    name="sponsorentitygiin"
                    value={
                    values.sponsorentitygiin
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.sponsorentitygiin &&
                    errors.sponsorentitygiin
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

                 <Typography>
                Please provide the sponsoring entity's GIIN here:

                </Typography>
                <Input
                    name="sponsorentitygiin"
                    value={
                    values.sponsorentitygiin
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.sponsorentitygiin &&
                    errors.sponsorentitygiin
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


                </>)}

                { values.selectedHeading === 'Trustee documented trust' && (<>
                    <Typography>
                    Select Status:
                </Typography>
                <Typography>
                {values.selectedHeading}
                </Typography>
                   
                    
                

                <Typography>
                    Please enter the full legal name of the sponsoring entity here:
                </Typography>
                <Input
                    name="fullnameofsponsorsntity"
                    value={
                    values.fullnameofsponsorsntity
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.fullnameofsponsorsntity &&
                    errors.fullnameofsponsorsntity
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
                <Typography>
                Please provide the trustee GIIN here:

                </Typography>
                <Input
                    name="trusteegiin"
                    value={
                    values.trusteegiin
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.trusteegiin &&
                    errors.trusteegiin
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

                 

                </>)}

                { values.selectedHeading === 'Non Reporting/Certified Deemed Compliant Financial Institution Cayman** ' && (<>
                    <Typography>
                    Select Status:
                </Typography>
                <Typography>
                {values.selectedHeading}
                </Typography>
                <Typography>
                Please indicate exemption here:

                </Typography>
                <Input
                    name="exemption"
                    value={
                    values.exemption
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.exemption &&
                    errors.exemption
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

                 

                </>)}

                { values.selectedHeading === 'Exempt Beneficial Owner' && (<>
                    <Typography>
                    Select Status:
                </Typography>
                <Typography>
                {values.selectedHeading}
                </Typography>
                <Typography>
                Please indicate status here:<span style={{ color: "red" }}>*</span>

                </Typography>
                <Input
                    name="status"
                    value={
                    values.status
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.status &&
                    errors.status
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

                 

                </>)}

                { values.selectedHeading === 'Active NFFE' && (<>
                    <Typography>
                    Select Status:
                </Typography>
                <Typography>
                {values.selectedHeading}
                </Typography>
                <Typography>
                Please indicate qualifying criteria here:
                {/* <span style={{ color: "red" }}>*</span> */}

                </Typography>
                <Input
                    name="qualifyingcriteria"
                    value={
                    values.qualifyingcriteria
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.qualifyingcriteria &&
                    errors.qualifyingcriteria
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

                 

                </>)}

                { values.selectedHeading === 'Direct Reporting NFFE' && (<>
                    <Typography>
                    Select Status:
                </Typography>
                <Typography>
                {values.selectedHeading}
                </Typography>
                <Typography>
                Please provide the Direct Reporting NFFE's GIIN here:
                {/* <span style={{ color: "red" }}>*</span> */}

                </Typography>
                <Input
                    name="directreportinggiin"
                    value={
                    values.directreportinggiin
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.directreportinggiin &&
                    errors.directreportinggiin
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

                 

                </>)}



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


