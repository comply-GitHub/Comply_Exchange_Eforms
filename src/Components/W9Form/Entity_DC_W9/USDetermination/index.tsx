import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { SelfCertSchema_DC } from "../../../../schemas/submit";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography, Paper, Checkbox, Link, FormControlLabel, Radio, FormControl, RadioGroup } from "@mui/material";
import Divider from "@mui/material/Divider";
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import { Form, Formik } from "formik";
import { W8_state_ECI,PostDualCert,GetAgentExemptionCodeHidden } from "../../../../Redux/Actions";
import { useDispatch ,useSelector} from "react-redux";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import { ExpandMore } from "@mui/icons-material";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import useAuth from "../../../../customHooks/useAuth";
export default function Declaration (props: any){
   const { authDetails } = useAuth();
  const PrevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");
  const CRSData = localStorage.getItem("lastClickedPanelHeading");

  const history = useNavigate();
  const dispatch = useDispatch();
  const [expandedState, setExpandedState] = React.useState<string | false>("panel1");
 
 
  
    const initialValue = {
     USSpecifiedPerson:"",
     FatcaExemption:0
    };
    useEffect(()=>{
        if(authDetails?.agentId){
          dispatch(GetAgentExemptionCodeHidden(authDetails?.agentId));
     }
      },[authDetails])
       
      const ExemptionData: any = useSelector((state: any) => state?.GetAgentExemptionCodeHiddenReducer?.GetAgentExemptionCodeHiddenData);
       console.log(ExemptionData,"11")
   
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

          <BreadCrumbComponent breadCrumbCode={1210} formName={3} />
        </div>

        <div className="col-8 mt-3">
         
        <div style={{ padding: "11px" }}>
          <Paper style={{ padding: "10px" }}>
            <Formik
            validateOnChange={true}
            validateOnBlur={true}
              initialValues={initialValue}
              validationSchema={SelfCertSchema_DC}
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
               <>
                  <div style={{marginTop:"10px",backgroundColor:"#fff"}}>
                  <div style={{marginTop:"10px"}}>
                  <Typography
                      align="left"
                      style={{
                        fontSize: "27px",
                        color: "black",
                        fontWeight: "bold",
                        marginLeft:'10px'
                      
                      }}
                    >
                   Specified U.S. Person Determination
                    </Typography>
                  
                  </div>
                
                  <div  style={{
                       
                     
                     
                        marginLeft:'10px'
                      
                      }}>
                            <Typography style={{ marginTop: "20px" }}>
                               Are you a Specified U.S. Person?
                             
                            </Typography>

                            <div className="d-flex">
                              <FormControl
                                error={Boolean(
                                  touched.USSpecifiedPerson &&
                                  errors.USSpecifiedPerson
                                )}
                              >
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                  value={values.USSpecifiedPerson}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel
                                    value="Yes"
                                    control={<Radio />}
                                    label="Yes"
                                    name="USSpecifiedPerson"
                                  />
                                  <FormControlLabel
                                    value="No"
                                    control={<Radio />}
                                    label="No"
                                    name="USSpecifiedPerson"
                                  />
                                </RadioGroup>
                                {errors.USSpecifiedPerson &&
                                  touched.USSpecifiedPerson ? (
                                  <div>
                                    <Typography color="error">
                                      <p className="error">
                                        {typeof errors.USSpecifiedPerson ===
                                          "string"
                                          ? errors.USSpecifiedPerson
                                          : ""}
                                      </p>
                                    
                                    </Typography>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </FormControl>
                            </div>
                          </div>

                          <div className="mt-2">

{values.USSpecifiedPerson ==="No" ?(

    <>
    <div style={{marginLeft:"14px"}}>
 <Typography style={{ marginTop: "20px" ,marginBottom:"20px"}}>
 Please select from the list provided to apply for exemption from FATCA Reporting or select confirm if no exemption applies<span style={{ color: "red" }}>*</span>

</Typography>


<FormControl 
//   error={Number(
//     touched.FatcaExemption &&
//     errors.FatcaExemption
//   )}
>
  <RadioGroup
    
    aria-labelledby="demo-row-radio-buttons-group-label"
    name="row-radio-buttons-group"
    value={values.FatcaExemption}
    onChange={handleChange}
  >
    {ExemptionData?.map((exemption:any) => (
              <FormControlLabel className="my-1" 
                key={exemption.fatcaExemptionCodeId}
                value={exemption.fatcaExemptionCodeId.toString()}
                control={<Radio />}
                label={exemption.name}
                name="FatcaExemption"
              />
           
            ))}
       
    
  </RadioGroup>
 
</FormControl>

</div>
</>

):""}
                          </div>
                  </div>
                  
                 </>
            
                 <div
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
                    disabled={!isValid}   
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" ,fontSize:"12px",}}
                    >
                      Confirm
                    </Button>
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


