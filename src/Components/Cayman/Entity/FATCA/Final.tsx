import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography, Paper, Checkbox, Link, Input, FormControl, Tooltip } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ExpandMore } from "@mui/icons-material";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import { FormTypeId } from "../../../../Utils/constVals";
import { SubmitSchema } from "../../../../schemas/submit";
import InfoIcon from "@mui/icons-material/Info";

import { PostDualCert, upsertFATCAStepsDetails } from "../../../../Redux/Actions";
import Utils from "../../../../Utils";
import SideBar from "../../../Reusable/SideBar";
import useAuth from "../../../../customHooks/useAuth";



export default function Final (props: any){
  const {authDetails} = useAuth();
  const PrevStepData = JSON.parse(localStorage.getItem("SelfCertData") || "{}");

  const history = useNavigate();
  const dispatch = useDispatch();
  const [isAccordionVisible, setIsAccordionVisible] = useState<boolean>(false);
  const FATCAClassificationData = useSelector((state:any) => state?.CaymanEntity?.FATCAClassificationData);
  const [toolInfo, setToolInfo] = useState("");
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
        
        classificationType:"FATCA",
        userType : "SC",
        gIINNumber:"",
        sponsoringEntityGIIN:"",
        sponsoredEntityGIIN:"",
        trusteeGIIN:"",
        exemptionFromGIIN:"",
        gIINStatus:"",
        qualifyingCriteria:"",
        directReportingNFFEsGIIN:"",
        isSubstantialUSOwnerInformation:false,
        isControllingPersonsInformation:false,
        fullNameOfSponsorsEntity:"",
    };
    useEffect(() => {
      localStorage.setItem('FATCAClassificationData', JSON.stringify(initialValue));
    }, [initialValue]);


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
              //validationSchema={SubmitSchema}
              onSubmit={(values, { setSubmitting }) => {

                
                // console.log("values", values)
                // setSubmitting(true);
                const result = {
                  agentId: authDetails.agentId,
                  accountHolderDetailsId: authDetails.accountHolderId,
                  ...PrevStepData, 
                  ...values,
                 
                  statusId: 1,
                };
                const returnPromise = new Promise((resolve, reject) => {
                dispatch(
                  upsertFATCAStepsDetails(result, (data: any) => {
                    localStorage.setItem("SelfCertData", JSON.stringify(result))
                    resolve(data);
                    history("/Cayman/Entity/CRS/Start")
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
                  <>{console.log("values", values)}</>
                  <>{console.log("error", errors)}</>
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

                { values.heading2 === 'GIIN available' && values.selectedHeading!=="Sponsored Direct Reporting" && values.selectedHeading!=="Passive NFFE" && (<>
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
                    name="gIINNumber"
                    value={
                    values.gIINNumber
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.gIINNumber &&
                    errors.gIINNumber
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
                    name="fullNameOfSponsorsEntity"
                    value={
                    values.fullNameOfSponsorsEntity
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.fullNameOfSponsorsEntity &&
                    errors.fullNameOfSponsorsEntity
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
                    name="sponsoringEntityGIIN"
                    value={
                    values.sponsoringEntityGIIN
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.sponsoringEntityGIIN &&
                    errors.sponsoringEntityGIIN
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



                { (values.selectedHeading === 'Sponsor has obtained a Sponsored Entity GIIN on its behalf' || values.selectedHeading === 'Sponsored Direct Reporting') && (<>
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
                    name="fullNameOfSponsorsEntity"
                    value={
                    values.fullNameOfSponsorsEntity
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.fullNameOfSponsorsEntity &&
                    errors.fullNameOfSponsorsEntity
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
                    name="sponsoringEntityGIIN"
                    value={
                    values.sponsoringEntityGIIN
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.sponsoringEntityGIIN &&
                    errors.sponsoringEntityGIIN
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
                Please provide the sponsored entity's GIIN here:

                </Typography>
                <Input
                    name="sponsoredEntityGIIN"
                    value={
                    values.sponsoredEntityGIIN
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.sponsoredEntityGIIN &&
                    errors.sponsoredEntityGIIN
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
                    name="fullNameOfSponsorsEntity"
                    value={
                    values.fullNameOfSponsorsEntity
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.fullNameOfSponsorsEntity &&
                    errors.fullNameOfSponsorsEntity
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
                    name="trusteeGIIN"
                    value={
                    values.trusteeGIIN
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.trusteeGIIN &&
                    errors.trusteeGIIN
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
                    name="exemptionFromGIIN"
                    value={
                    values.exemptionFromGIIN
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.exemptionFromGIIN &&
                    errors.exemptionFromGIIN
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
                    name="gIINStatus"
                    value={
                    values.gIINStatus
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.gIINStatus &&
                    errors.gIINStatus
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
                  <div style={{marginLeft:"10px"}}>
                  <Typography>
                    Select Status:
                </Typography>
                <Typography style={{fontSize:"20px",fontWeight:"550"}}>
                {values.selectedHeading}
                </Typography>
                <Typography>
                Please indicate qualifying criteria here:
                {/* <span style={{ color: "red" }}>*</span> */}

                </Typography>
                <Input
                    name="qualifyingCriteria"
                    value={
                    values.qualifyingCriteria
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.qualifyingCriteria &&
                    errors.qualifyingCriteria
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

                  </div>
                 

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
                    name="directReportingNFFEsGIIN"
                    value={
                    values.directReportingNFFEsGIIN
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(
                    touched.directReportingNFFEsGIIN &&
                    errors.directReportingNFFEsGIIN
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

                { values.selectedHeading === 'Passive NFFE' && (<>
                    <Typography>
                    Select Status:
                </Typography>
                <Typography>
                {values.selectedHeading}
                </Typography>
                <Typography>
                Please select from the options below to provide either:
                {/* <span style={{ color: "red" }}>*</span> */}

                </Typography>
                <FormControl className="w-100">
                                          
                  <Checkbox 
                      value={values.isSubstantialUSOwnerInformation}
                      checked={values.isSubstantialUSOwnerInformation}
                      onChange={(e:any) => {
                        handleChange(e);
                        setTimeout(() => {
                          setFieldValue("isControllingPersonsInformation", false)
                        },200)
                      }}
                      name="isSubstantialUSOwnerInformation"
                      size="medium"
                      style={{ fontSize: "2rem",marginTop: "6px" }} />
                    <Typography className="mx-2"
                      style={{ fontSize: "14px", color: "black", marginTop: "15px", textAlign: "justify" }}
                    >
                    Substantial U.S. owner information(if you choose to use the definition of 'Substantial U.S. Owner' from the U.S. Treasury Regulation)
                    <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  Passive NFFE- Substantial U.S.Owner Information
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
                                fontSize: "20px",
                                cursor: "pointer",
                                verticalAlign: "super",
                              }}
                            />
                          </Tooltip>
                        </span>
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
                            Passive NFFE - Substantial U.S. owner information
                            </Typography>

                            

                            <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "16px" , color: "#0000C7"}}
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
                    </Typography>

                    <Checkbox 
                      value={values.isControllingPersonsInformation}
                      checked={values.isControllingPersonsInformation}
                      onChange={(e:any) => {
                        handleChange(e);
                        setTimeout(() => {
                          setFieldValue("isSubstantialUSOwnerInformation", false)
                        },200)
                      }}
                      name="isControllingPersonsInformation"
                      size="medium"
                      style={{ fontSize: "2rem",marginTop: "6px" }} />
                    <Typography className="mx-2"
                      style={{ fontSize: "14px", color: "black", marginTop: "15px", textAlign: "justify" }}
                    >
                      Controlling persons information (as per the CRS definition)
                      <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  Passive NFFE- Controlling Persons Information
                                </Typography>
                                <a onClick={() => setToolInfo("controlling")}>
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
                                fontSize: "20px",
                                cursor: "pointer",
                                verticalAlign: "super",
                              }}
                            />
                          </Tooltip>
                        </span>
                        {toolInfo === "controlling" ? (
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
                            Passive NFFE- Controlling Persons Information
                            </Typography>

                            

                            <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "16px" , color: "#0000C7"}}
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
                    </Typography>


                </FormControl>

                 

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
                      type="submit"
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" ,fontSize:"12px",}}
                      disabled={
                        (values.gIINStatus == "")
                        &&
                        (values.gIINNumber == "")
                        &&
                        (values.directReportingNFFEsGIIN == "")
                        &&
                        (values.exemptionFromGIIN == "")
                        &&
                        (values.fullNameOfSponsorsEntity == "" || values.sponsoringEntityGIIN == "")
                        &&
                        (values.qualifyingCriteria == "")
                        &&
                        (values.sponsoredEntityGIIN == "")
                        &&
                        ((values.isSubstantialUSOwnerInformation == false) && (values.isControllingPersonsInformation == false))
                        
                       
                        
                        ? true 
                        : false
                      }
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


