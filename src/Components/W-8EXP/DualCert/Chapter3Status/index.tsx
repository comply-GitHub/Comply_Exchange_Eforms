import React, { useState, useEffect } from "react";
import {
  FormControl,
  Typography,
  Button,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Select,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import "./index.scss";
// import Infoicon from "../../../assets/img/info.png";
// import { Info } from "@mui/icons-material";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import {
  GetHelpVideoDetails,
  GetChapter3Status,
  getAllCountries,
  getAllCountriesCode,
  getAllCountriesIncomeCode,
  PostDualCertW9Entity,
  PostDualCert,
} from "../../../../Redux/Actions";
import { FederalTaxSchema_dualCert } from "../../../../schemas/w8ECI";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import useAuth from "../../../../customHooks/useAuth";
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import { GetEciPdf } from "../../../../Redux/Actions/PfdActions";
export default function Fedral_tax(props: any) {
  const dispatch = useDispatch();
  const {
    handleTaxClassificationChange,
    // selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;
  const EntityDualCert = JSON.parse(localStorage.getItem("EntityDualCertPrevStepData") || "{}");
  const { authDetails } = useAuth();
  const W8ECI = useSelector((state: any) => state.W8ECI);
  const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");
  const [IsIndividual, setIsIndividual] = useState(obValues?.businessTypeId == 1);
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const [selectedfile, setSelectedFile] = useState<any>(null);

  const initialValue = {
    
    businessDisgradedEntity:
      PrevStepData?.businessDisgradedEntity ||"",
    countryOfIncorporation:
      PrevStepData?.countryOfIncorporationId || 0,
    chapter3Status: PrevStepData?.chapter3StatusId,
    businessName: PrevStepData?.businessName || "",
    DateOfIncorporation:EntityDualCert?.DateOfIncorporation ||"",
    IsJurisdictionforTaxPurposes: EntityDualCert ?. IsJurisdictionforTaxPurposes ||"No",
    IsTieBreakerClauseUnderApplicableTaxTreaty:EntityDualCert?.IsTieBreakerClauseUnderApplicableTaxTreaty || "",
    CountryIdwhereTaxesarePaid:EntityDualCert?.CountryIdwhereTaxesarePaid ||0,
    ContentforTaxJurisdictionMismatchExplanation:EntityDualCert?.ContentforTaxJurisdictionMismatchExplanation || "",
    IsTrueandAccurateStatement:EntityDualCert?.IsTrueandAccurateStatement||false
    
  };

  const [clickCount, setClickCount] = useState(0);
  const [toolInfo, setToolInfo] = useState("");
  const history = useNavigate();
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [selectedTaxClassification, setSelectedTaxClassification] = useState(0);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  }


  useEffect(() => {
    document.title = "Chapter III"
  }, [])

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllCountriesCode());
    dispatch(getAllCountriesIncomeCode());
    // dispatch(getAllStateByCountryId())
    dispatch(GetHelpVideoDetails());
    dispatch(GetChapter3Status(FormTypeId.W8EXP));
  }, []);
  // const viewPdf = () => {
  //   history("/w8Eci_pdf", { replace: true });
  // }

  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const getCountriesCodeReducer = useSelector(
    (state: any) => state.getCountriesCodeReducer
  );
  const GetAllIncomeCodesReducer = useSelector(
    (state: any) => state.GetAllIncomeCodesReducer
  );
  const GetStateByCountryIdReducer = useSelector(
    (state: any) => state.GetStateByCountryIdReducer
  );

  const handleChangeAccodion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
    const GetChapter3StatusReducer = useSelector(
      (state: any) => state.GetChapter3StatusReducer
    );
  const [expandedState, setExpandedState] = React.useState<string | false>(
    "panel1"
  );
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const handleChangeAccodionState =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedState(newExpanded ? panel : false);
    };

  const confirmFunction = (value: any, setFieldValue: any) => {
    setExpandedState(""); setFieldValue("chapter3Status", value); setSelectedTaxClassification(value)
  }
  const W9Data = useSelector((state: any) => state.w9Data);
  return (
    <>
      <section

        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        <div className="overlay-div">
          <div className="overlay-div-group">
            <div className="viewInstructions">View Instructions</div>
            <div className="viewform" onClick={() => {
              dispatch(GetEciPdf(authDetails?.accountHolderId))
            }}>View Form</div>
            <div className="helpvideo">
              {GethelpData && GethelpData[5].id === 7 ? (
                <a
                  href={GethelpData[5].fieldValue}
                  target="popup"
                  onClick={() =>
                    window.open(
                      GethelpData[5].fieldValue,
                      "name",
                      `width=${GethelpData[5].width},height=${GethelpData[5].height},top=${GethelpData[5].top},left=${GethelpData[5].left}`
                    )
                  }
                >
                  Help Video
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="row w-100">
          <div className="col-4">
            <div style={{ padding: "20px 0px", height: "100%" }}>
              <BreadCrumbComponent breadCrumbCode={1200} formName={17} />
            </div>
          </div>
          <div className="col-8 mt-3">
            <div style={{ padding: "12px" }}>
              <Paper style={{ padding: "10px" }}>
                <Formik
                  validateOnChange={true}
                  validateOnBlur={true}
                  initialValues={initialValue}
                  enableReinitialize
                  validateOnMount={true}
                  validationSchema={
                    FederalTaxSchema_dualCert
                  }
                  onSubmit={(values, { setSubmitting }) => {
                    let temp = {
                  
                      ...values,
                      
                      AccountHolderBasicDetailsId: authDetails?.accountHolderId ??
                      obValues?.AccountHolderBasicDetailsId,
                    FormTypeSelectionId: obValues.businessTypeId,
                    agentId: authDetails?.agentId,
                    accountHolderBasicDetailId: authDetails?.accountHolderId,
                    };
                    setSubmitting(true);
                    const returnPromise = new Promise((resolve, reject) => {
                      dispatch(
                        PostDualCertW9Entity(
                          temp,
                          (data: any) => {
                            resolve(data);
                            localStorage.setItem(
                              "EntityDualCertPrevStepData",
                              JSON.stringify(temp)
                            );
                            history("/ECIEntityFatcaClassification");
                          },
                          (err: any) => {
                            reject(err);
                          }
                        )
                      );
                    });
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
                    isValid,
                    submitForm,
                    setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <div style={{ width: "100%" }}>
                        <>{console.log("values", values)}</>
                        <>{console.log("errors", errors)}</>
                        <>{console.log("touched", touched)}</>
                        <div>
                          <Typography align="left" style={{ margin: "10px" }}>
                            {
                              //touched.countryOfIncorporation &&
                              values?.countryOfIncorporation && values?.countryOfIncorporation?.toString() !== "0" &&
                                values?.countryOfIncorporation !== obValues?.permanentResidentialCountryId
                                ? (
                                  <div
                                    style={{
                                      backgroundColor: "#e8e1e1",
                                      padding: "10px",
                                    }}
                                  >
                                    <Typography>
                                      ICOR114
                                      <span>
                                       
                                        Country of incorporation is different from
                                        the PRA country.
                                      </span>
                                    </Typography>
                                  </div>
                                ) : (
                                  ""
                                )}
                          
                            <div
                              className="row"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                className="col-md-12 col-12"
                                align="left"
                                style={{
                                  color: "black",
                                  fontSize: "27px",
                                  fontWeight: "550",
                                }}
                              >
                                Select your status for U.S. tax purposes
                              </Typography>
                            </div>
                            <div className="row">
                              <div
                                className="col-12 col-md-12 mt-3"
                                style={{ marginTop: "20px" }}
                              >
                                <Typography
                                  align="left"
                                  className="d-flex w-100 "
                                  style={{ fontSize: "13px" }}
                                >
                                  Select Chapter 3 Status
                                  <span style={{ color: "red" }}>*</span>
                                  <span>
                                    <Tooltip
                                      style={{
                                        backgroundColor: "black",
                                        color: "white",
                                      }}
                                      title={
                                        <>
                                          <Typography color="inherit">
                                            TT-061 - Classification selection.
                                          </Typography>
                                          <a
                                            onClick={() => setToolInfo("basic")}
                                          >
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
                                      <Info
                                        style={{
                                          color: "#ffc107",
                                          fontSize: "12px",
                                          cursor: "pointer",
                                          verticalAlign: "super",
                                        }}
                                      />
                                    </Tooltip>
                                  </span>
                                </Typography>

                                {toolInfo === "basic" ? (
                                  <div>
                                    <Paper
                                      style={{
                                        backgroundColor: "#dedcb1",
                                        padding: "15px",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <Typography>
                                        EH008:  Please make a selection from the drop down list provided. The selection must represent the chapter 3 classification, under U.S. tax principles of the individual, business or organization the certificate will represent.
                                      </Typography>
                                      <Typography style={{ marginTop: "10px" }}>
                                        Complete this line or use the Chapter 3 Classification Guide to establish your entity status for purposes of chapter 3. Check the one appropriate box that applies.
                                      </Typography>
                                      <Typography style={{ marginTop: "10px" }}>
                                        A foreign central bank of issue (wholly owned by a foreign sovereign) should check the “Foreign government” box. If you are a foreign private foundation, you should check the “foreign private foundation” box rather than the “foreign tax-exempt organization” box.
                                      </Typography>

                                      <Link
                                        href="#"
                                        underline="none"
                                        style={{
                                          marginTop: "10px",
                                          fontSize: "16px", color: "#0000C7"
                                        }}
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

                                <FormControl className="w-50">
                                  <select
                                    name="chapter3Status"
                                    value={values.chapter3Status}
                                    
                                    autoComplete="chapter3Status"
                                    // onBlur={handleBlur}
                                    style={{
                                      padding: " 0 10px",
                                      color: "#121112",
                                      fontStyle: "italic",
                                      height: "39px",
                                    }}
                                  >
                                    <option value={0}> ---select---</option>

                                    {GetChapter3StatusReducer.GetChapter3StatusData?.map(
                                      (ele: any) => (
                                        <option key={ele?.id} value={ele?.id}>
                                          {ele?.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <p className="error">
                                    {touched.chapter3Status ? errors.chapter3Status?.toString() : ""}
                                  </p>
                                </FormControl>
                              </div>
                            </div>
                          
                              <>
                                <div
                                  style={{ alignItems: "center" }}
                                  className="row"
                                >
                                  <div className="col-lg-6 col-md-6 col-sm-12">
                                    <Typography
                                      align="left"
                                      className="d-flex w-60 "
                                      style={{ fontSize: "13px" }}
                                    >
                                      Business Name:
                                      <span style={{ color: "red" }}>*</span>

                                    </Typography>

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="businessName"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        sx={{ backgroundColor: "#e9ecef" }}
                                        type="text"
                                        onChange={handleChange}
                                        error={Boolean(
                                          touched.businessName &&
                                          errors.businessName
                                        )}
                                        name="businessName"
                                        className="inputClassFull"
                                        value={values.businessName}
                                      />
                                    </FormControl>
                                  </div>
                                  <div
                                    className="col-lg-6 col-md-6 col-sm-12"
                                  
                                  >
                                    <Typography
                                      align="left"
                                      className="d-flex w-60 "
                                      style={{ fontSize: "13px" }}
                                    >
                                      Business Name or disregarded entity name if different:
                                     
                                    </Typography>

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="businessDisgradedEntity"
                                        type="text"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        sx={{ backgroundColor: "#e9ecef" }}
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        // helperText={
                                        //   touched.businessDisgradedEntity && errors.businessDisgradedEntity
                                        // }
                                        error={Boolean(
                                          touched.businessDisgradedEntity &&
                                          errors.businessDisgradedEntity
                                        )}
                                        name="businessDisgradedEntity"
                                        value={values.businessDisgradedEntity}
                                        className="inputClass"
                                      />
                                    </FormControl>
                                  </div>
                                </div>

                                <>
                                  <div className="row">
                                    <div className=" col-12">
                                      <Typography
                                        align="left"
                                        className="d-flex w-60 "
                                        style={{
                                          fontSize: "13px",
                                          marginTop: "15px",
                                        }}
                                      >
                                        Country of incorporation / organization:
                                        <span style={{ color: "red" }}>*</span>
                                      </Typography>

                                      <FormControl className="w-50">
                                        <select
                                          name="countryOfIncorporation"
                                          value={values.countryOfIncorporation}
                                         
                                          autoComplete="countryOfIncorporation"
                                          // placeholder="Business Name"
                                          onBlur={(e) => { handleBlur(e) }}
                                          style={{
                                            padding: " 0 10px",
                                            color: "#121112",
                                            fontStyle: "italic",
                                            height: "39px",
                                          }}
                                        >
                                          <option value={0}>---select---</option>
                                          <option value={257}>
                                            United Kingdom
                                          </option>
                                          <option value={258}>
                                            United States
                                          </option>
                                          <option value="">---</option>
                                          {getCountriesReducer.allCountriesData?.map(
                                            (ele: any) => (
                                              <option
                                                key={ele?.id}
                                                value={ele?.id}
                                              >
                                                {ele?.name}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </FormControl>
                                    </div>
                                  </div>
                                </>
                              </> 
                        
                               
                          </Typography>
                        </div>
                        <div style={{marginTop:"10px",marginLeft:"10px"}}>
                              <div>

                                <Typography
                                  align="left"
                                  className="d-flex w-60 "
                                  style={{
                                    fontSize: "16px",
                                    marginTop: "5px",
                                  }}
                                >
                                 Date of incorporation:
                                  <span style={{ color: "red" }}>
                                    *
                                  </span>

                                </Typography>
                                <FormControl className="datee" style={{width:"30%"}}>
                                  <input
                                    style={{height:"37px"}}
                                    
                                    autoComplete="DateOfIncorporation"
                                    type="date"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  
                                   
                                    name="DateOfIncorporation"
                                  
                                    value={values.DateOfIncorporation}
                                  />
                                </FormControl>
                               {errors.DateOfIncorporation && touched.DateOfIncorporation ?( <p className="error">
                                        {errors.DateOfIncorporation?.toString()}
                                      </p>):""}
                              </div>
                              <div>
                              <Typography
                                      className="mt-3"
                                      style={{
                                        fontSize: "16px",
                                      }}
                                    >
                                    <span style={{fontWeight:"bold"}}>Jurisdiction for Tax Purposes:</span> Is the jurisdiction in which your organisation is resident for tax purposes different from the country of incorporation?<span className="error" style={{verticalAlign:"super",fontSize:"15px"}}>*</span>
                                    </Typography>
                                    <FormControl style={{ marginLeft: "2px" }}>
                                      <RadioGroup
                                        row

                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="IsJurisdictionforTaxPurposes"
                                        value={values.IsJurisdictionforTaxPurposes}
                                        onChange={handleChange}
                                        id="IsJurisdictionforTaxPurposes"
                                      >
                                        <FormControlLabel
                                          control={<Radio />}
                                          value="Yes"
                                          name="IsJurisdictionforTaxPurposes"
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          control={<Radio />}
                                          value="No"
                                          name="IsJurisdictionforTaxPurposes"
                                          label="No"
                                        />

                                      </RadioGroup>
                                      <p className="error">
                                        {errors.IsJurisdictionforTaxPurposes?.toString()}
                                      </p>
                                    </FormControl>
                              </div>

                          {values.IsJurisdictionforTaxPurposes === "Yes" ?(  <><div className="col-12 d-flex">
                            <div className="col-7">
                              <Typography
                                      className="mt-3"
                                      style={{
                                        fontSize: "16px",
                                      }}
                                    >
                                   If you are applying a tie-breaker clause under an applicable tax treaty then please select Yes here. <span className="error" style={{verticalAlign:"super",fontSize:"15px"}}>*</span>
                                    </Typography>
                                    <FormControl style={{ marginLeft: "2px" }}>
                                      <RadioGroup
                                        row

                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="IsTieBreakerClauseUnderApplicableTaxTreaty"
                                        value={values.IsTieBreakerClauseUnderApplicableTaxTreaty}
                                        onChange={handleChange}
                                        id="IsTieBreakerClauseUnderApplicableTaxTreaty"
                                      >
                                        <FormControlLabel
                                          control={<Radio />}
                                          value="Yes"
                                          name="IsTieBreakerClauseUnderApplicableTaxTreaty"
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          control={<Radio />}
                                          value="No"
                                          name="IsTieBreakerClauseUnderApplicableTaxTreaty"
                                          label="No"
                                        />

                                      </RadioGroup>
                                     {errors.IsTieBreakerClauseUnderApplicableTaxTreaty && touched?.IsTieBreakerClauseUnderApplicableTaxTreaty?( <p className="error">
                                        {errors.IsTieBreakerClauseUnderApplicableTaxTreaty?.toString()}
                                      </p>):""}
                                    </FormControl>
                              </div>
                              <div className=" col-5" style={{marginRight:"50px"}}>
                                    <Typography
                                      align="right"
                                    
                                      style={{
                                        fontSize: "15px",
                                        marginTop: "15px",
                                      }}
                                    >
                                      Country where taxes Are Paid:
                                      <span style={{ color: "red" }}>
                                        *
                                      </span>
                                    </Typography>
                                    <Typography align="right">
                                    <FormControl className="w-50">
                                      <select
                                        
                                        name="CountryIdwhereTaxesarePaid"
                                        value={
                                          values.CountryIdwhereTaxesarePaid
                                        }
                                        onChange={handleChange}
                                        autoComplete="CountryIdwhereTaxesarePaid"
                                        onBlur={handleBlur}
                                        style={{
                                          padding: " 0 10px",
                                          color: "#121112",
                                          fontStyle: "italic",
                                          height: "39px",
                                        }}
                                      >
                                        <option value={0}>---select---</option>
                                        <option value={257}>
                                          United Kingdom
                                        </option>
                                        <option value={258}>
                                          United States
                                        </option>
                                        <option value={-1}>---</option>
                                        {getCountriesReducer.allCountriesData?.map(
                                          (ele: any) => (
                                            <option
                                              key={ele?.id}
                                              value={ele?.id}
                                            >
                                              {ele?.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                      {errors.CountryIdwhereTaxesarePaid && touched.CountryIdwhereTaxesarePaid?(<p className="error">
                                        {errors.CountryIdwhereTaxesarePaid?.toString()}
                                      </p>):""}
                                    </FormControl>
                                  
                                    </Typography>
                                  </div>
                              

                                   

                            </div>
                            
                             <div>

                             <Typography
                               align="left"
                               className="d-flex w-60 "
                               style={{
                                 fontSize: "16px",
                                 marginTop: "5px",
                               }}
                             >
                             Content block for tax jurisdiction mismatch explanation
                               <span style={{ color: "red" }}>
                                 *
                               </span>
                             
                             </Typography>
                             <FormControl className="explanation">
                               <TextField
                               
                                 
                                 autoComplete="ContentforTaxJurisdictionMismatchExplanation"
                                 type="text"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                               
                                placeholder="PLease Provide an explanation here:"
                                 name="ContentforTaxJurisdictionMismatchExplanation"
                                 className="othertext"
                                 value={values.ContentforTaxJurisdictionMismatchExplanation}
                               />
                              {errors.ContentforTaxJurisdictionMismatchExplanation && touched?.ContentforTaxJurisdictionMismatchExplanation?(   <p className="error">
                                        {errors.ContentforTaxJurisdictionMismatchExplanation?.toString()}
                                      </p>):""}
                             </FormControl>
                           
                             <div className="mt-1">
                               <div className="d-flex col-6">
                                 <Checkbox name="IsTrueandAccurateStatement" checked={values.IsTrueandAccurateStatement} onChange={handleChange}
                                 />
                                 <Typography className="mt-2">
                                 Check to confirm this is a true and accurate statement:
                                 </Typography>
                               </div>
                               {errors.IsTrueandAccurateStatement && touched.IsTrueandAccurateStatement ? (  <p className="error">
                               {typeof errors.IsTrueandAccurateStatement === 'string' ? errors.IsTrueandAccurateStatement : ''}
                                       
                                      </p>):""}
                             
                             </div>
                             </div>
                             </> 
                          
                          ):""}
                           
                            </div>

                        <div style={{ padding: "10px" }}>
                          <Accordion
                            expanded={expanded === "groupPanel"}
                            onChange={handleChangeAccodion("groupPanel")}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-controls="panel-content"
                              id="panel-header"
                            >
                              <Typography
                                style={{ fontSize: "14px", color: "blue" }}
                              >
                                Chapter 3 Status Guide
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Accordion
                                expanded={expandedState === "panel1"}
                                onChange={handleChangeAccodionState("panel1")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel1d-content"
                                  id="panel1d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Introduction
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    align="center"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Classification Guide - Introduction
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "20px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    This guide is provided to help you determine
                                    the classification of the entity the
                                    submission represents.
                                  </Typography>

                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    In the left hand menu you will see several
                                    different classification types. Please
                                    select each in turn reading the definition
                                    provided. When you are satisfied the
                                    description matches the entity type select
                                    “confirm”.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Depending on the type selected you may
                                    either be provided with further selections,
                                    more detailed guidance or the pop up will
                                    close and you will be taken to the next
                                    stage in the submission process.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Please note that although this guide is
                                    provided to assist your selection, it is not
                                    intended nor aims to provide tax advice.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "30px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Should you need specific help or guidance
                                    you should consult your tax advisers.
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                              <Accordion
                                expanded={expandedState === "panel2"}
                                onChange={handleChangeAccodionState("panel2")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Corporation{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    It is a legal entity that is separate and
                                    distinct from its owners formed under the
                                    laws of the country or state in which it is
                                    registered.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    A corporation is created “incorporated” by
                                    one or more of shareholders who have
                                    ownership of the corporation, represented by
                                    their holding of common stock. In general, a
                                    corporation is formed under state law by the
                                    filing of articles of incorporation with the
                                    state. The state must generally date-stamp
                                    the articles before they are effective. You
                                    may wish to consult the law of the state in
                                    which the organization is incorporated. In
                                    the normal course of business the
                                    corporation itself and not the shareholders
                                    that own it, is held legally liable for the
                                    actions and debts the business incurs.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(1, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel3"}
                                onChange={handleChangeAccodionState("panel3")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Disregarded Entity{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A business entity that is not a corporation
                                    and that has a single owner may be
                                    disregarded as an entity separate from its
                                    owner (a disregarded entity) for federal tax
                                    purposes.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    The payee of a payment made to a disregarded
                                    entity is the owner of the entity.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(2, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel4"}
                                onChange={handleChangeAccodionState("panel4")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Partnership{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A partnership is a relationship between two
                                    or more entities or persons who join to
                                    carry on a trade or business, with each
                                    partner contributing money, property,
                                    labour, or skill, and each expecting to
                                    share in the profits and losses. Every
                                    partnership that engages in a trade or
                                    business or has income from sources in the
                                    United States must file an annual
                                    information return, Form 1065, U.S.
                                    Partnership Return of Income, or Form
                                    1065-B, U.S. Return of Income for Electing
                                    Large Partnerships, with the Internal
                                    Revenue Service, showing the partnership's
                                    taxable income or loss for the year. A
                                    partnership must file this return even if
                                    its principal place of business is outside
                                    the United States and even if all of its
                                    members are non-resident aliens.
                                  </Typography>
                                  <Typography
                                    align="center"
                                    style={{ marginTop: "10px" }}
                                  >
                                    Foreign Partnerships
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    Partnerships not created or organized in the
                                    United States, or under the law of the
                                    United States or of any state, are foreign
                                    partnerships. In general, if a foreign
                                    partnership has gross income from trade or
                                    business within the United States or has
                                    gross income derived from sources within the
                                    United States, it must file a partnership
                                    return.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(3, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel5"}
                                onChange={handleChangeAccodionState("panel5")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Simple Trust{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    Generally, a foreign simple trust is a
                                    foreign trust that is required to distribute
                                    all of its income annually.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    Simple trusts are defined by three main
                                    conditions.
                                  </Typography>
                                  <Typography align="left">
                                    <li>
                                      Income from a simple trust may not be
                                      distributed to charitable beneficiaries.
                                    </li>

                                    <li>
                                      Distributions may not be made from the
                                      corpus (capital or principle amount) of a
                                      simple trust.
                                    </li>
                                    <li>
                                      For an entity to be classified as a simple
                                      trust, the trust instrument must require
                                      the trustee to distribute all of the
                                      trust’s fiduciary accounting income to the
                                      beneficiaries.
                                    </li>
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    These conditions are evaluated on a yearly
                                    basis. If a trust fails to meet any one of
                                    the three conditions, it is considered a
                                    complex trust for that tax year.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(4, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel6"}
                                onChange={handleChangeAccodionState("panel6")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Grantor Trust{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A grantor trust is a foreign (non-U.S.)
                                    trust to the extent that all or a portion of
                                    the income of the trust is treated as owned
                                    by the grantor or another person under
                                    sections 670 through 671 of the U.S. tax
                                    code. Please click on the link below to open
                                    the pdf in another window.
                                  </Typography>
                                  <Link
                                    align="left"
                                    style={{ marginTop: "10px", color: "blue" }}
                                  >
                                    Click here to open the U.S. Internal Revenue
                                    Code
                                  </Link>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(5, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                              <Accordion
                                expanded={expandedState === "panel7"}
                                onChange={handleChangeAccodionState("panel7")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Complex Trust{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A complex trust is defined as any trust that
                                    does not meet the definition of a simple
                                    trust. Therefore, a complex trust must
                                    distribute to charitable beneficiaries,
                                    distribute amounts from the corpus (capital
                                    or principle amount) , and/or retain some
                                    current income by directive of the trust
                                    instrument
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(6, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel8"}
                                onChange={handleChangeAccodionState("panel8")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Estate{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    An Estate is defined as the whole of one's
                                    possessions, especially all the property and
                                    debts left by one at death
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(7, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel9"}
                                onChange={handleChangeAccodionState("panel9")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Foreign Government – Integral Part
                                    (Temporary regulations definition){" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    Foreign government defined (temporary
                                    regulations).
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    The term “foreign government” means only the
                                    integral parts or controlled entities of a
                                    foreign sovereign.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    (i) It is wholly owned and controlled by a
                                    foreign sovereign directly or indirectly
                                    through one or more controlled entities;
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    <span style={{ fontWeight: "bold" }}>
                                      Integral part.
                                    </span>{" "}
                                    An “integral part” of a foreign sovereign is
                                    any person, body of persons, organization,
                                    agency, bureau, fund, instrumentality, or
                                    other body, however designated, that
                                    constitutes a governing authority of a
                                    foreign country. The net earnings of the
                                    governing authority must be credited to its
                                    own account or to other accounts of the
                                    foreign sovereign, with no portion inuring
                                    to the benefit of any private person. An
                                    integral part does not include any
                                    individual who is a sovereign, official, or
                                    administrator acting in a private or
                                    personal capacity. Consideration of all the
                                    facts and circumstances will determine
                                    whether an individual is acting in a private
                                    or personal capacity.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(8, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel10"}
                                onChange={handleChangeAccodionState("panel10")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Foreign Government – Controlled Entity
                                    (Temporary regulations definition){" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    The term “foreign government” means only the
                                    integral parts or controlled entities of a
                                    foreign sovereign.
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    <span style={{ fontWeight: "bold" }}>
                                      {" "}
                                      Controlled entity.
                                    </span>{" "}
                                    The term “controlled entity” means an entity
                                    that is separate in form from a foreign
                                    sovereign or otherwise constitute a separate
                                    juridical entity if it satisfies the
                                    following requirements:
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    (i) It is wholly owned and controlled by a
                                    foreign sovereign directly or indirectly
                                    through one or more controlled entities;
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    (ii) It is organized under the laws of the
                                    foreign sovereign by which owned;
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    (iii) Its net earnings are credited to its
                                    own account or to other accounts of the
                                    foreign sovereign, with no portion of its
                                    income inuring to the benefit of any private
                                    person; and
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    (iv) Its assets vest in the foreign
                                    sovereign upon dissolution.
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    A controlled entity does not include
                                    partnerships or any other entity owned and
                                    controlled by more than one foreign
                                    sovereign. Thus, a foreign financial
                                    organization organized and wholly owned and
                                    controlled by several foreign sovereigns to
                                    foster economic, financial, and technical
                                    cooperation between various foreign nations
                                    is not a controlled entity for purposes of
                                    this section.
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(9, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel11"}
                                onChange={handleChangeAccodionState("panel11")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    International Organization{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    An Estate is defined as the whole of one's
                                    possessions, especially all the property and
                                    debts left by one at death
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(10, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel12"}
                                onChange={handleChangeAccodionState("panel12")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Central Bank of Issue{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A bank that is constituted by a government
                                    or international organization to issue and
                                    regulate currency, regulate banks under its
                                    jurisdiction, act as a lender of last
                                    resort, and generally ensure a sustainable
                                    monetary policy.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(11, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel13"}
                                onChange={handleChangeAccodionState("panel13")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Tax-Exempt Organization{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    A Foreign Tax-Exempt Organization is an
                                    organization that is exempt under Section
                                    501( C ) of the Internal Revenue Code
                                  </Typography>

                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    As a general rule this can include amongst
                                    other types:
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    1. Corporations, and any community chest,
                                    fund, or foundation, organized and operated
                                    exclusively for religious, charitable,
                                    scientific, testing for public safety
                                    literary, or educational purposes
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    2. To foster national or international
                                    amateur sports competition (but only if no
                                    part of its activities involve the provision
                                    of athletic facilities or equipment)
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    3. For the prevention of cruelty to children
                                    or animals, no part of the net earnings of
                                    which inures to the benefit of any private
                                    shareholder or individual, no substantial
                                    part of the activities of which is carrying
                                    on propaganda, or otherwise attempting, to
                                    influence legislation (except as otherwise
                                    provided in subsection (h)), and which does
                                    not participate in, or intervene in
                                    (including the publishing or distributing of
                                    statements), any political campaign on
                                    behalf of (or in opposition to) any
                                    candidate for public office.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(12, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel14"}
                                onChange={handleChangeAccodionState("panel14")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Private Foundation{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                    Typically have a single major source of
                                    funding (usually gifts from one family or
                                    corporation rather than funding from many
                                    sources) and most have as their primary
                                    activity the making of grants to other
                                    charitable organizations and to individuals,
                                    rather than the direct operation of
                                    charitable programs.
                                  </Typography>

                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    In order to demonstrate that it is a private
                                    operating foundation, an organization must
                                    meet an assets test, a support test, or an
                                    endowment test and demonstrate that it
                                    distributes substantially all (85% or more)
                                    of the lesser of its adjusted net income or
                                    minimum investment return directly for the
                                    active conduct of activities that further
                                    its exempt purposes.
                                  </Typography>
                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => { confirmFunction(13, setFieldValue) }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel15"}
                                onChange={handleChangeAccodionState("panel15")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel3d-content"
                                  id="panel3d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Don't Know?
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    align="center"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Don't Know?
                                  </Typography>
                                  <Typography style={{ marginTop: "10px" }}>
                                    Please pick a category from the left hand
                                    menu. We cannot offer tax advice so if you
                                    need assistance, please Exit the process and
                                    consult your tax adviser.
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </AccordionDetails>
                          </Accordion>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "80px",
                          }}
                        >
                          <SaveAndExit
                            Callback={
                              () => {
                                submitForm().then((data) => {
                                  const prevStepData = JSON.parse(
                                    localStorage.getItem("PrevStepData") || "{}"
                                  );
                                  const urlValue =
                                    window.location.pathname.substring(1);
                                    dispatch(
                                      PostDualCert(
                                        {
                                          ...prevStepData,
                                          AccountHolderDetailsId:authDetails.accountHolderId,
                                          AgentId: authDetails?.agentId,
                                          formTypeId: FormTypeId.W8EXP,
                                          stepName: `/${urlValue}`,
                                        },
                                        () => {
                                          history(GlobalValues.basePageRoute);
                                        }
                                      )
                                    );
                                }).catch((error) => {
                                  console.log(error);
                                })
                              }
                            }
                            formTypeId={FormTypeId.W8EXP}
                          >
                          </SaveAndExit>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            onClick={() => {
                              dispatch(GetEciPdf(authDetails?.accountHolderId))
                            }}
                            style={{ color: "white", marginLeft: "15px" }}
                          >
                            View Form
                          </Button>
                          <Button
                            type="submit"
                            disabled={!isValid}
                            variant="contained"
                            style={{ color: "white", marginLeft: "15px" }}
                            onClick={() => {
                              submitForm().then((data) => {
                              //   console.log(data)
                              // history("/IMY/ThankYou/Status_DC/Tax_DC");
                              
                              })
                              // history("/IMY/ThankYou/Status_DC/Tax_DC");
                            }}
                          >
                            Continue
                          </Button>
                        </div>
                        <Typography
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
                            onClick={() => {
                              history("/W-8ECI/Certification/Participation/Submit_Eci/ThankYou_Eci");
                            }}
                            variant="contained"
                            style={{
                              color: "white",
                              backgroundColor: "black",
                              marginTop: "10px",
                              marginBottom: "20px",
                            }}
                          >
                            Back
                          </Button>
                        </Typography>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </div>
          </div>
        </div>
      </section >
    </>
  );
}




