import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Link,
  TextField,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox
} from "@mui/material";
import "./index.scss";
import Infoicon from "../../../assets/img/info.png";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { TinSchema_W9_DC} from "../../../schemas";
import { useNavigate } from "react-router-dom";
import { getTinTypes, postDualCertW9Form, GetHelpVideoDetails, getW9Form, getAllCountries, getDualCertW9} from "../../../Redux/Actions"
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import View_Insructions from "../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";

export default function Tin({data,index,handlePayloadUpdate,handleRadioChange}: any) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { authDetails } = useAuth();
  const [clickCount, setClickCount] = useState(0);
  const [continueId, setcontinueId] = useState(0);

 const onBoardingFormValues = JSON.parse(
    localStorage.getItem("agentDetails") ?? "null"
  );

 

  


  const urlValue = location.pathname.substring(1);
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const [payload, setPayload] = useState({...data});
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const GetDualCertData = useSelector(
    (state: any) => state?.GetDualCertW9Reducer?.DualCertData?.length>0?state?.GetDualCertW9Reducer?.DualCertData[0]:{}
  );


  useEffect(()=>{
    document.title = "Tax-Payer"
  },[])

  const formatTin = (e: any, values: any): any => {
    if (e.key === "Backspace" || e.key === "Delete") return;
    if (e.target.value.length === 3) {
      setPayload({ ...payload, Tin: payload.Tin + "-" });
      values.Tin = values.Tin + "-";
    }
    if (e.target.value.length === 6) {
      setPayload({ ...payload, Tin: payload.Tin + "-" });
      values.Tin = values.Tin + "-";
    }
  };
  
  const handleFormChange=(e:any)=>{
    let temp={...payload};
    temp[e.target.name]=e.target.value;
    setPayload({...temp})
  }

  useEffect(()=>{
    handlePayloadUpdate(payload,index);
  },[payload])

  const history = useNavigate()
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );
  
 

  return (
    <Formik
    initialValues={payload}
    enableReinitialize      
    validateOnChange={true}
    validateOnBlur={true}
    validationSchema={TinSchema_W9_DC} 
    onSubmit={(values, { setSubmitting }) => {
      
      
    
      return;
    }
    }
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
      isValid,
      submitForm
    }) => (
      <Form onSubmit={handleSubmit}>
    
                    
                     
                      <div style={{marginTop: "20px"}} >
                       
                       <div style={{marginTop: "20px",display: "flex" }} className="row">
                        <div className="col-lg-4 col-6">
                        <Typography style={{fontSize:"15px"}}>
                        Select the country where taxes are paid:<span style={{ color: "red" }}>*</span>
                         
                        </Typography>
                       
                        <select
                          disabled={values?.isTinAvailable}
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#121112",
                            fontStyle: "italic",
                            height: "40px",
                            width: "100%",
                          }}
                          name="countryId"
                          id="Income"
                          defaultValue={1}
                          
                          value={values?.countryId}
                          onChange={(e)=>{
                            handleChange(e)
                        handleFormChange(e)
                          }}
                         
                        >
                          <option value={1}>---select---</option>
                          <option value={256}>United States</option>
                          <option value={257}>United Kingdom</option>
                                {getCountriesReducer.allCountriesData?.map(
                                  (ele: any) => (
                                    <option key={ele?.id} value={ele?.id}>
                                      {ele?.name}
                                    </option>
                                  )
                                )}
                            
                        </select>
                   
                      </div>

                      <div className="col-lg-4 col-6">
                        <Typography style={{fontSize:"14px"}}>Enter TIN</Typography>
                        <Input
                          disabled={(values?.isTinAvailable)}
                          fullWidth
                          type="text"
                          name="tinNumber"
                          value={values.tinNumber}
                          inputProps={{ maxLength: 10}}
                          onKeyDown={(e) => formatTin(e, values)}
                         onChange={(e)=>{
                            handleChange(e)
                                handleFormChange(e)
                         }                            
                         }
                          
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#7e7e7e",
                            fontStyle: "italic",
                            height: "40px",
                            width: "100%",
                          }}
                        />

                        <>{console.log(errors,"88")}</>
                       
                        {/* <p className="error">{errors?.tinNumber}</p> */}
                        <div className="Alternate">
                          <Checkbox
                            value={values.isAlternativeTinFormat}
                            checked={values.isAlternativeTinFormat}
                           
                              
                            size="medium"
                            name="isAlternativeTinFormat"
                            onChange={(e) => {
                                const isChecked = e.target.checked; 
                                handleChange({ 
                                    target: { 
                                        name: 'isAlternativeTinFormat', 
                                        value: isChecked 
                                    } 
                                });
                                handleFormChange({ 
                                    target: { 
                                        name: 'isAlternativeTinFormat', 
                                        value: isChecked 
                                    } 
                                });
                            }}
                        />
                          <span style={{ fontSize: "12px" }}>
                            Alternative Tin Format 
                          
                          </span>
                        </div>
                       
                      </div>
                      <div className="col-lg-3 col-6">
                        <div className="radio" style={{ marginTop: "17px" }}>
                          <Checkbox
                            value={values.isTinAvailable}
                            checked={values.isTinAvailable}
                           
                              
                            size="medium"
                            name="isTinAvailable"
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                handleChange({ 
                                    target: { 
                                        name: 'isTinAvailable', 
                                        value: isChecked 
                                    } 
                                });
                                handleFormChange({ 
                                    target: { 
                                        name: 'isTinAvailable', 
                                        value: isChecked 
                                    } 
                                });
                            }}
                        />
                          <span style={{ fontSize: "12px" }}>
                            Not Available
                            {/* {errors.isTinAvailable && touched.isTinAvailable ? (
                              <div>
                                <p className="error">
                                  {errors?.isTinAvailable}
                                </p>
                              </div>
                            ) : (
                              ""
                            )} */}
                          </span>
                        </div>
                      </div>
                      <div style={{marginTop: "20px"}} >
                        <Typography>
                        Does the entityWithMultipleTaxJurisdictions represent an entity that has multiple tax jurisdictions?
                        </Typography>
                        <FormControl className="col-12 radio">
                            <RadioGroup
                              row
                              
                              name="entityWithMultipleTaxJurisdictions"
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              value={values.entityWithMultipleTaxJurisdictions}
                            onChange={(e)=>{
                                handleRadioChange(e,index+1)
                                handleChange(e)
                                handleFormChange(e)
                            }}
                            >
                              <FormControlLabel
                                value="Yes"
                               
                                control={<Radio />}
                                label="Yes"
                                name="entityWithMultipleTaxJurisdictions"
                              />
                              <FormControlLabel
                                className="label"
                                value="No"
                                control={<Radio />}
                                label="No"
                                // disabled={values.isFTINNotLegallyRequired}
                                name="entityWithMultipleTaxJurisdictions"
                              />

                              {/* {values.tinisFTINNotLegallyRequired === "Yes" ||
                              values.tinisFTINNotLegallyRequired === "No" ? (
                                <Delete
                                  onClick={() => {
                                    handleChange("tinisFTINNotLegallyRequired")(
                                      ""
                                    );
                                  }}
                                  style={{
                                    color: "red",
                                    fontSize: "20px",
                                    marginTop: "8px",
                                  
                                  }}
                                />
                              ) : (
                                ""
                              )} */}
                            </RadioGroup>

                            {/* {errors.tinisFTINNotLegallyRequired &&
                            touched.tinisFTINNotLegallyRequired ? (
                              <div>
                                <Typography color="error">
                                  {errors.tinisFTINNotLegallyRequired}
                                </Typography>
                              </div>
                            ) : (
                              ""
                            )} */}
                          </FormControl>
                        </div>
                    
                        </div>
                        {values.isTinAvailable ? (  <div style={{ marginLeft: "2px",marginTop:"20px" }}>
                      <Typography>
                        Please specify the reason for non-availability of US TIN{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Typography>

                      <Input
                        fullWidth
                        name="notAvailableReason"
                        value={values?.notAvailableReason}
                        type="text"
                        onChange={(e)=>{
                        
                            handleChange(e)
                            handleFormChange(e)
                        }}
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#121112",
                          fontStyle: "italic",
                          height: "6rem",
                          width: "100%",
                        }}
                      />
                    </div>):""}
                    </div>
                    </Form>
        )}
      </Formik>
               
        )}
      

