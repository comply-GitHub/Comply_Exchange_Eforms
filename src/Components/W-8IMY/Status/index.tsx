import React, { useState, useEffect } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { CheckBox, ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import "./index.scss";
import InfoIcon from "@mui/icons-material/Info";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import {
  getAllCountries,
  getAllCountriesCode,
  getAllCountriesIncomeCode,
  getAllStateByCountryId,
  GetChapter3Status,
  GetHelpVideoDetails,
  postW81MY_EForm
} from "../../../Redux/Actions";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import { TaxPurposeSchemaW81Chapter3 } from "../../../schemas/w81my";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";
import QDD from "./QDD";
import NQI from "./NQI";
import TFI from "./TFI";
import USBranch from "./USBranch";
import WFP from "./WFP";
import NWFP from "./NWFP";
import { GetImyPdf } from "../../../Redux/Actions/PfdActions";
export default function Fedral_tax(props: any) {

  const { authDetails } = useAuth();
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const agentDetails = JSON.parse(localStorage.getItem("agentDetails") ?? "null");
  const dispatch = useDispatch();
  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;

  const [initialValue, setInitialValue] = useState({
    formTypeSelectionId: agentDetails?.businessTypeId ? agentDetails?.businessTypeId : 0,
    businessName: PrevStepData?.businessName ? PrevStepData?.businessName : agentDetails?.entityName,
    businessNameOrDisgradedEntityName: PrevStepData?.businessNameOrDisgradedEntityName ? PrevStepData?.businessNameOrDisgradedEntityName : "",
    countryOfIncorporationId: PrevStepData?.countryOfIncorporationId ? PrevStepData?.countryOfIncorporationId : "",
    chapter3StatusId: PrevStepData?.chapter3StatusId ? PrevStepData?.chapter3StatusId : 0,
    //QDD starts here
    isPart1Integral: PrevStepData?.isPart1Integral ? PrevStepData?.isPart1Integral : "",
    isPart1FFI: PrevStepData?.isPart1FFI ? PrevStepData?.isPart1FFI : "",
    isPart1chap3and4: PrevStepData?.isPart1chap3and4 ? PrevStepData?.isPart1chap3and4 : "",
    isPart1Section1446f: PrevStepData?.isPart1Section1446f ? PrevStepData?.isPart1Section1446f : "",
    isPart1Section14464b: PrevStepData?.isPart1Section14464b ? PrevStepData?.isPart1Section14464b : "",
    isPart1QIacting: PrevStepData?.isPart1QIacting ? PrevStepData?.isPart1QIacting : "",
    isPart1ofchap3and41099repo: PrevStepData?.isPart1ofchap3and41099repo ? PrevStepData?.isPart1ofchap3and41099repo : "",
    isPart1regusection16049C: PrevStepData?.isPart1regusection16049C ? PrevStepData?.isPart1regusection16049C : "",
    isPart1andbackupwithholdingresp: PrevStepData?.isPart1andbackupwithholdingresp ? PrevStepData?.isPart1andbackupwithholdingresp : "",
    isPart1AllocatePorofchap4: PrevStepData?.isPart1AllocatePorofchap4 ? PrevStepData?.isPart1AllocatePorofchap4 : "",
    isPart1QDDidentified: PrevStepData?.isPart1QDDidentified ? PrevStepData?.isPart1QDDidentified : false,
    corporation: PrevStepData?.corporation ? PrevStepData?.corporation : false,
    partnership: PrevStepData?.partnership ? PrevStepData?.partnership : false,
    disregardedEntity: PrevStepData?.disregardedEntity ? PrevStepData?.disregardedEntity : false,
    //QDD Ends Here

    //NQI Starts Here
    isPart1QIeachamount: PrevStepData?.isPart1QIeachamount ? PrevStepData?.isPart1QIeachamount : false,
    isPart1transmitwithholdingCer: PrevStepData?.isPart1transmitwithholdingCer ? PrevStepData?.isPart1transmitwithholdingCer : false,
    isPart1meetsReguSection160494C: PrevStepData?.isPart1meetsReguSection160494C ? PrevStepData?.isPart1meetsReguSection160494C : false,
    isPart1OtherthanQI: PrevStepData?.isPart1OtherthanQI ? PrevStepData?.isPart1OtherthanQI : false,
    isPart1Section1441and1471: PrevStepData?.isPart1Section1441and1471 ? PrevStepData?.isPart1Section1441and1471 : false,
    //NQI Ends Here

    //TFI Starts here
    isPart1lawsofterritoryofUS: PrevStepData?.isPart1lawsofterritoryofUS ? PrevStepData?.isPart1lawsofterritoryofUS : false,
    isPart1EvidenceofChap3and4: PrevStepData?.isPart1EvidenceofChap3and4 ? PrevStepData?.isPart1EvidenceofChap3and4 : false,
    isPart1withholdablepayment: PrevStepData?.isPart1withholdablepayment ? PrevStepData?.isPart1withholdablepayment : false,
    isPart1regulationSec11446f4aiB: PrevStepData?.isPart1regulationSec11446f4aiB ? PrevStepData?.isPart1regulationSec11446f4aiB : false,
    isPart1regulationSec11446f41vA: PrevStepData?.isPart1regulationSec11446f41vA ? PrevStepData?.isPart1regulationSec11446f41vA : false,
    partVNomineeforDistribution: PrevStepData?.partVNomineeforDistribution ? PrevStepData?.partVNomineeforDistribution : false,
    //TFI Ends Here

    //USBrand Starts here
    isPart1PublictradedPartnership: PrevStepData?.isPart1PublictradedPartnership ? PrevStepData?.isPart1PublictradedPartnership : false,
    isPart119bRegulationSec11411b: PrevStepData?.isPart119bRegulationSec11411b ? PrevStepData?.isPart119bRegulationSec11411b : false,
    isPart119cRegulationSec11414d: PrevStepData?.isPart119cRegulationSec11414d ? PrevStepData?.isPart119cRegulationSec11414d : false,
    isPart119dRegulationSec11414a: PrevStepData?.isPart119dRegulationSec11414a ? PrevStepData?.isPart119dRegulationSec11414a : false,
    isPart119eRegulationSec11411b: PrevStepData?.isPart119eRegulationSec11411b ? PrevStepData?.isPart119eRegulationSec11411b : false,
    partVINomineeforDistribution: PrevStepData?.partVINomineeforDistribution ? PrevStepData?.partVINomineeforDistribution : false,
    //USBrand Ends Here

    //WEF Starts here
    isPart1WPorWTagreement: PrevStepData?.isPart1WPorWTagreement ? PrevStepData?.isPart1WPorWTagreement : false,
    //WFP Ends Here

    //WEF Starts here
    isPart1nonwithholdingpartnership: PrevStepData?.isPart1nonwithholdingpartnership ? PrevStepData?.isPart1nonwithholdingpartnership : false,
    isPart1partnerinlowertierpartnership: PrevStepData?.isPart1partnerinlowertierpartnership ? PrevStepData?.isPart1partnerinlowertierpartnership : false,
    isPart1forerignpartnershipsec1446f: PrevStepData?.isPart1forerignpartnershipsec1446f ? PrevStepData?.isPart1forerignpartnershipsec1446f : false,
    isPart1partnershipformodifiedamount: PrevStepData?.isPart1partnershipformodifiedamount ? PrevStepData?.isPart1partnershipformodifiedamount : false,
    isPart1foreigngrantortrustSec11446f: PrevStepData?.isPart1foreigngrantortrustSec11446f ? PrevStepData?.isPart1foreigngrantortrustSec11446f : false,
    isPart1knowledgeundersection1441and1471: PrevStepData?.isPart1knowledgeundersection1441and1471 ? PrevStepData?.isPart1knowledgeundersection1441and1471 : false,
    //WFP Ends Here


  })
  // const initialValue = {
  //   formTypeSelectionId : agentDetails?.businessTypeId ? agentDetails?.businessTypeId : 0,
  //   businessName:  PrevStepData?.businessName ? PrevStepData?.businessName : agentDetails?.entityName,
  //   businessNameOrDisgradedEntityName: PrevStepData?.businessNameOrDisgradedEntityName ? PrevStepData?.businessNameOrDisgradedEntityName : "",
  //   countryOfIncorporationId: PrevStepData?.countryOfIncorporationId ? PrevStepData?.countryOfIncorporationId :"",
  //   chapter3StatusId: PrevStepData?.chapter3StatusId ? PrevStepData?.chapter3StatusId :0,
  //   //QDD starts here
  //   isPart1Integral:PrevStepData?.isPart1Integral ? PrevStepData?.isPart1Integral :"",
  //   isPart1FFI:PrevStepData?.isPart1FFI ? PrevStepData?.isPart1FFI :"",
  //   isPart1chap3and4:PrevStepData?.isPart1chap3and4 ? PrevStepData?.isPart1chap3and4 :"",
  //   isPart1Section1446f:PrevStepData?.isPart1Section1446f ? PrevStepData?.isPart1Section1446f :"",
  //   isPart1Section14464b:PrevStepData?.isPart1Section14464b ? PrevStepData?.isPart1Section14464b :"",
  //   isPart1QIacting:PrevStepData?.isPart1QIacting ? PrevStepData?.isPart1QIacting :"",
  //   isPart1ofchap3and41099repo:PrevStepData?.isPart1ofchap3and41099repo ? PrevStepData?.isPart1ofchap3and41099repo :"",
  //   isPart1regusection16049C:PrevStepData?.isPart1regusection16049C ? PrevStepData?.isPart1regusection16049C :"",
  //   isPart1andbackupwithholdingresp:PrevStepData?.isPart1andbackupwithholdingresp ? PrevStepData?.isPart1andbackupwithholdingresp :"",
  //   isPart1AllocatePorofchap4:PrevStepData?.isPart1AllocatePorofchap4 ? PrevStepData?.isPart1AllocatePorofchap4 :"",
  //   isPart1QDDidentified: PrevStepData?.isPart1QDDidentified ? PrevStepData?.isPart1QDDidentified :false,
  //   corporation:PrevStepData?.corporation ? PrevStepData?.corporation :false,
  //   partnership:PrevStepData?.partnership ? PrevStepData?.partnership :false,
  //   disregardedEntity:PrevStepData?.disregardedEntity ? PrevStepData?.disregardedEntity :false,
  //   //QDD Ends Here

  //   //NQI Starts Here
  //   isPart1QIeachamount:PrevStepData?.isPart1QIeachamount ? PrevStepData?.isPart1QIeachamount :false,
  //   isPart1transmitwithholdingCer:PrevStepData?.isPart1transmitwithholdingCer ? PrevStepData?.isPart1transmitwithholdingCer :false,
  //   isPart1meetsReguSection160494C:PrevStepData?.isPart1meetsReguSection160494C ? PrevStepData?.isPart1meetsReguSection160494C :false,
  //   isPart1OtherthanQI:PrevStepData?.isPart1OtherthanQI ? PrevStepData?.isPart1OtherthanQI :false,
  //   isPart1Section1441and1471:PrevStepData?.isPart1Section1441and1471 ? PrevStepData?.isPart1Section1441and1471 :false,
  //   //NQI Ends Here

  //   //TFI Starts here
  //   isPart1lawsofterritoryofUS:PrevStepData?.isPart1lawsofterritoryofUS ? PrevStepData?.isPart1lawsofterritoryofUS :false,
  //   isPart1EvidenceofChap3and4:PrevStepData?.isPart1EvidenceofChap3and4 ? PrevStepData?.isPart1EvidenceofChap3and4 :false,
  //   isPart1withholdablepayment:PrevStepData?.isPart1withholdablepayment ? PrevStepData?.isPart1withholdablepayment :false,
  //   isPart1regulationSec11446f4aiB:PrevStepData?.isPart1regulationSec11446f4aiB ? PrevStepData?.isPart1regulationSec11446f4aiB :false,
  //   isPart1regulationSec11446f41vA:PrevStepData?.isPart1regulationSec11446f41vA ? PrevStepData?.isPart1regulationSec11446f41vA :false,
  //   partVNomineeforDistribution:PrevStepData?.partVNomineeforDistribution ? PrevStepData?.partVNomineeforDistribution :false,
  //   //TFI Ends Here

  //   //USBrand Starts here
  //   isPart1PublictradedPartnership:PrevStepData?.isPart1PublictradedPartnership ? PrevStepData?.isPart1PublictradedPartnership :false,
  //   isPart119bRegulationSec11411b:PrevStepData?.isPart119bRegulationSec11411b ? PrevStepData?.isPart119bRegulationSec11411b :false,
  //   isPart119cRegulationSec11414d:PrevStepData?.isPart119cRegulationSec11414d ? PrevStepData?.isPart119cRegulationSec11414d :false,
  //   isPart119dRegulationSec11414a:PrevStepData?.isPart119dRegulationSec11414a ? PrevStepData?.isPart119dRegulationSec11414a :false,
  //   isPart119eRegulationSec11411b:PrevStepData?.isPart119eRegulationSec11411b ? PrevStepData?.isPart119eRegulationSec11411b :false,
  //   partVINomineeforDistribution:PrevStepData?.partVINomineeforDistribution ? PrevStepData?.partVINomineeforDistribution :false,
  //   //USBrand Ends Here

  //    //WEF Starts here
  //    isPart1WPorWTagreement:PrevStepData?.isPart1WPorWTagreement ? PrevStepData?.isPart1WPorWTagreement :false,
  //   //WFP Ends Here

  //   //WEF Starts here
  //   isPart1nonwithholdingpartnership:PrevStepData?.isPart1nonwithholdingpartnership ? PrevStepData?.isPart1nonwithholdingpartnership :false,
  //   isPart1partnerinlowertierpartnership:PrevStepData?.isPart1partnerinlowertierpartnership ? PrevStepData?.isPart1partnerinlowertierpartnership :false,
  //   isPart1forerignpartnershipsec1446f:PrevStepData?.isPart1forerignpartnershipsec1446f ? PrevStepData?.isPart1forerignpartnershipsec1446f :false,
  //   isPart1partnershipformodifiedamount:PrevStepData?.isPart1partnershipformodifiedamount ? PrevStepData?.isPart1partnershipformodifiedamount :false,
  //   isPart1foreigngrantortrustSec11446f:PrevStepData?.isPart1foreigngrantortrustSec11446f ? PrevStepData?.isPart1foreigngrantortrustSec11446f :false,
  //   isPart1knowledgeundersection1441and1471:PrevStepData?.isPart1knowledgeundersection1441and1471 ? PrevStepData?.isPart1knowledgeundersection1441and1471 :false,
  //   //WFP Ends Here


  // };

  const [toolInfo, setToolInfo] = useState("");
  const history = useNavigate();
  const [expanded, setExpanded] = React.useState<string | false>("");
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  useEffect(() => {
    document.title = "Chapter III"
  }, [])

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllCountriesCode());
    dispatch(getAllCountriesIncomeCode());
    dispatch(GetHelpVideoDetails());
    dispatch(GetChapter3Status(FormTypeId.FW81MY));
  }, []);


  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
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
  const GetChapter3StatusReducer = useSelector(
    (state: any) => state.GetChapter3StatusReducer
  );

  const handleChangeAccodion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [expandedState, setExpandedState] = React.useState<string | false>(
    "panel1"
  );

  const handleChangeAccodionState =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedState(newExpanded ? panel : false);
    };
  const W9Data = useSelector((state: any) => state.w9Data);
  return (
    <>
      <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        <div className="overlay-div">
          <div className="overlay-div-group">
            <div className="viewInstructions">View Instructions</div>
            <div className="viewform" onClick={() => {
              dispatch(GetImyPdf(authDetails?.accountHolderId))
            }}>View Form</div>
            <div className="helpvideo">
              {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
              {GethelpData && GethelpData[7].id === 9 ? (
                <a
                  href={GethelpData[7].fieldValue}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default anchor behavior
                    window.open(
                      GethelpData[7].fieldValue,
                      'popupWindow',
                      `width=${GethelpData[7].width},height=${GethelpData[7].height},top=${GethelpData[7].top},left=${GethelpData[7].left}`
                    )
                  }}
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
              <BreadCrumbComponent breadCrumbCode={1203} formName={7} />
            </div>

          </div>
          <div className="col-8 mt-3">
            <div style={{ padding: "13px" }}>
              <Paper style={{ padding: "10px" }}>
                <Formik
                  validateOnChange={false}
                  validateOnBlur={false}
                  validateOnMount={false}
                  initialValues={initialValue}
                  validationSchema={TaxPurposeSchemaW81Chapter3}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    const temp = {
                      agentId: authDetails.agentId,
                      accountHolderBasicDetailId: authDetails.accountHolderId,
                      ...PrevStepData,
                      ...values,
                      stepName: null
                    };
                    //console.log(temp);
                    const returnPromise = new Promise((resolve, reject) => {
                      dispatch(
                        postW81MY_EForm(temp,
                          (responseData: any) => {
                            localStorage.setItem("PrevStepData", JSON.stringify(temp));
                            resolve(responseData);
                            history("/IMY/Tax_Purpose_Exp/Chapter4_IMY");
                          },
                          (err: any) => {
                            reject(err);
                          }
                        )
                      );
                    })
                    // dispatch(postW81MY_EForm(temp,() => {
                    //   history("/IMY/Tax_Purpose_Exp/Chapter4_IMY");
                    // }))

                    //  setSubmitting(true);
                    //history("/IMY/Tax_Purpose_Exp/Chapter4_IMY");
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
                    submitForm,
                    setFieldValue
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <div style={{ width: "100%" }}>
                        <div>
                          <Typography align="left" style={{ margin: "10px" }}>
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
                                            Classification details
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
                                          fontSize: "10px",
                                          cursor: "pointer",
                                          verticalAlign: "super",
                                        }}
                                      />
                                    </Tooltip>
                                  </span>
                                </Typography>
                                {/* <>{  console.log(values.chapter3StatusId)}</>
                                        <>{console.log("error",errors)}</> */}
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
                                        EH008: Please make a selection from the drop down list provided. The selection must represent the chapter 3 classification, under U.S. tax principles of the individual, business or organization the certificate will represent.
                                      </Typography>
                                      <Typography style={{ marginTop: "10px" }}>
                                        Complete this line or use the Chapter 3 Classification Guide to establish your entity status for purposes of chapter 3. Check the one appropriate box that applies.


                                      </Typography>
                                      <Typography
                                        style={{
                                          marginTop: "10px",
                                          //fontWeight: "550",
                                        }}
                                      >
                                        A foreign central bank of issue (wholly owned by a foreign sovereign) should check the “Foreign government” box. If you are a foreign private foundation, you should check the “foreign private foundation” box rather than the “foreign tax-exempt organization” box.
                                      </Typography>
                                      {/* <Typography style={{ marginTop: "10px" }}>
                                        Please selection the option that
                                        applies. By making this selection, you
                                        are representing that you qualify for
                                        this classification. You must select the
                                        option that represents your
                                        classification (for example,
                                        corporation, partnership, trust, estate,
                                        etc.) under U.S. tax principles. Do not
                                        select the option that describes your
                                        status under the law of the treaty
                                        country. If you are a partnership or a
                                        disregarded entity receiving a payment
                                        for which treaty benefits are being
                                        claimed, you must select the
                                        'partnership' or 'Disregarded entity'
                                        option. If you are a sole proprietor
                                        select the 'Individual' option, not
                                        'Disregarded entity'.
                                      </Typography> */}

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
                                    name="chapter3StatusId"
                                    value={values.chapter3StatusId}
                                    onChange={(e) => {
                                      handleChange(e);
                                      setTimeout(() => {
                                        //QDD form
                                        setFieldValue("isPart1Integral", false)
                                        setFieldValue("isPart1FFI", false)
                                        setFieldValue("isPart1chap3and4", false)
                                        setFieldValue("isPart1Section1446f", false)
                                        setFieldValue("isPart1Section14464b", false)
                                        setFieldValue("isPart1QIacting", false)
                                        setFieldValue("isPart1ofchap3and41099repo", false)
                                        setFieldValue("isPart1regusection16049C", false)
                                        setFieldValue("isPart1andbackupwithholdingresp", false)
                                        setFieldValue("isPart1AllocatePorofchap4", false)
                                        setFieldValue("isPart1QDDidentified", false)
                                        setFieldValue("corporation", false)
                                        setFieldValue("disregardedEntity", false)
                                        setFieldValue("partnership", false)
                                        setFieldValue("disregardedEntity", false)

                                        //NQI
                                        setFieldValue("isPart1QIeachamount", false)
                                        setFieldValue("isPart1transmitwithholdingCer", false)
                                        setFieldValue("isPart1meetsReguSection160494C", false)
                                        setFieldValue("isPart1OtherthanQI", false)
                                        setFieldValue("isPart1Section1441and1471", false)

                                        //TFI
                                        setFieldValue("isPart1lawsofterritoryofUS", false)
                                        setFieldValue("isPart1EvidenceofChap3and4", false)
                                        setFieldValue("isPart1withholdablepayment", false)
                                        setFieldValue("isPart1regulationSec11446f4aiB", false)
                                        setFieldValue("isPart1regulationSec11446f41vA", false)
                                        setFieldValue("partVNomineeforDistribution", false)

                                        //USBranch
                                        setFieldValue("isPart1PublictradedPartnership", false)
                                        setFieldValue("isPart119bRegulationSec11411b", false)
                                        setFieldValue("isPart119cRegulationSec11414d", false)
                                        setFieldValue("isPart119dRegulationSec11414a", false)
                                        setFieldValue("isPart119eRegulationSec11411b", false)
                                        setFieldValue("partVINomineeforDistribution", false)

                                        //WFP
                                        setFieldValue("isPart1WPorWTagreement", false)

                                        //NWFP
                                        setFieldValue("isPart1nonwithholdingpartnership", false)
                                        setFieldValue("isPart1partnerinlowertierpartnership", false)
                                        setFieldValue("isPart1forerignpartnershipsec1446f", false)
                                        setFieldValue("isPart1partnershipformodifiedamount", false)
                                        setFieldValue("isPart1foreigngrantortrustSec11446f", false)
                                        setFieldValue("isPart1knowledgeundersection1441and1471", false)
                                        // setFieldValue("isPart1nonwithholdingpartnership","")
                                        // setFieldValue("isPart1partnerinlowertierpartnership","")
                                        // setFieldValue("isPart1forerignpartnershipsec1446f","")
                                        // setFieldValue("isPart1partnershipformodifiedamount","")
                                        // setFieldValue("isPart1foreigngrantortrustSec11446f","")
                                        // setFieldValue("isPart1knowledgeundersection1441and1471","")

                                      }, 200)
                                    }}
                                    onBlur={handleBlur}
                                    style={{
                                      padding: " 0 10px",
                                      color: "#121112",
                                      fontStyle: "italic",
                                      height: "36px",
                                    }}
                                  >
                                    <option> ---select---</option>

                                    {GetChapter3StatusReducer.GetChapter3StatusData?.map(
                                      (ele: any) => (
                                        <option key={ele?.id} value={ele?.id}>
                                          {ele?.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  {errors?.chapter3StatusId && typeof errors?.chapter3StatusId === 'string' && (
                                    <p className="error">{errors?.chapter3StatusId}</p>
                                  )}

                                </FormControl>
                              </div>
                            </div>
                            {values.chapter3StatusId == 21 || values.chapter3StatusId == 22 || values.chapter3StatusId == 23 || values.chapter3StatusId == 24 || values.chapter3StatusId == 25 || values.chapter3StatusId == 26 || values.chapter3StatusId == 27 || values.chapter3StatusId == 28 || values.chapter3StatusId == 29 ? (
                              <>

                                <div
                                  style={{ marginTop: "20px", display: "flex" }}
                                  className="col-12"
                                >
                                  <div className="col-6">
                                    <Typography
                                      align="left"
                                      className="d-flex w-60 "
                                      style={{ fontSize: "13px" }}
                                    >
                                      Business Name:
                                      <span style={{ color: "red" }}>*</span>
                                      {/* <span>
                                        <Tooltip
                                          style={{
                                            backgroundColor: "black",
                                            color: "white",
                                          }}
                                          title={
                                            <>
                                              <Typography color="inherit">
                                                Name details
                                              </Typography>
                                              <a
                                                onClick={() => setToolInfo("name")}
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
                                              fontSize: "10px",
                                              cursor: "pointer",
                                              verticalAlign: "super",
                                            }}
                                          />
                                        </Tooltip>
                                      </span> */}
                                    </Typography>
                                    {toolInfo === "name" ? (
                                      <div>
                                        <Paper
                                          style={{
                                            backgroundColor: "#dedcb1",
                                            padding: "15px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <Typography>
                                            Please enter the first and last name of
                                            the person who is required or has been
                                            requested to submit an information
                                            return.
                                          </Typography>
                                          <Typography
                                            style={{
                                              marginTop: "10px",
                                              fontWeight: "550",
                                            }}
                                          >
                                            Specific instructions for U.S.
                                            individuals and sole proprietors: U.S.
                                            individuals:
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            If you are an{" "}
                                            <span style={{ fontWeight: "550" }}>
                                              individual
                                            </span>
                                            , you must enter the name shown on your
                                            income tax return. However, if you have
                                            changed your last name, for instance,
                                            due to marriage without informing the
                                            Social Security Administration of the
                                            name change, enter your first name, the
                                            last name shown on your social security
                                            card, and your new last name. In certain
                                            situations we may need to contact you
                                            for further verification.
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            <span style={{ fontWeight: "550" }}>
                                              Joint names:
                                            </span>
                                            If the account is in joint names, both
                                            parties will need to submit separate
                                            submissions.
                                          </Typography>
                                          <Typography style={{ marginTop: "10px" }}>
                                            <span style={{ fontWeight: "550" }}>
                                              {" "}
                                              Sole proprietor:
                                            </span>
                                            Enter your individual name as shown on
                                            your income tax return on the 'Name'
                                            line. You may enter your business,
                                            trade, or 'doing business as (DBA)' name
                                            on the 'Business name' line.
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

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="businessName"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        // helperText={
                                        //   touched.businessName && errors.businessName
                                        // }
                                        // error={Boolean(
                                        //   touched.businessName && errors.businessName
                                        // )}
                                        name="businessName"
                                        className="inputClassFull"
                                        value={values.businessName}
                                      />
                                    </FormControl>

                                    {/* <p className="error">{errors.businessName}</p> */}
                                    {errors?.businessName && typeof errors?.businessName === 'string' && (
                                      <p className="error">{errors?.businessName}</p>
                                    )}


                                  </div>
                                  <div
                                    className="col-6"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    <Typography
                                      align="left"
                                      className="d-flex w-60 "
                                      style={{ fontSize: "13px" }}
                                    >
                                      Business Name or disregarded entity name if
                                      different:
                                    </Typography>

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="lastName"
                                        type="text"
                                        name="businessNameOrDisgradedEntityName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={Boolean(
                                          touched.businessNameOrDisgradedEntityName && errors.businessNameOrDisgradedEntityName
                                        )}
                                        error={Boolean(
                                          touched.businessNameOrDisgradedEntityName && errors.businessNameOrDisgradedEntityName
                                        )}
                                        value={values.businessNameOrDisgradedEntityName}
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
                                          name="countryOfIncorporationId"
                                          value={values.countryOfIncorporationId}
                                          onChange={handleChange}
                                          autoComplete="businessName"
                                          //  placeholder="Business Name"
                                          onBlur={handleBlur}

                                          style={{
                                            padding: " 0 10px",
                                            color: "#121112",
                                            fontStyle: "italic",
                                            height: "36px",
                                          }}
                                        >
                                          <option value="">---select---</option>
                                          <option value={257}>
                                            United Kingdom
                                          </option>
                                          <option value={258}>United States</option>
                                          <option value="">---</option>
                                          {getCountriesReducer.allCountriesData?.map(
                                            (ele: any) => (
                                              <option key={ele?.id} value={ele?.id}>
                                                {ele?.name}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        {errors?.countryOfIncorporationId && typeof errors?.countryOfIncorporationId === 'string' && (
                                          <p className="error">{errors?.countryOfIncorporationId}</p>
                                        )}
                                        {/* <p className="error">
                                          {errors.countryOfIncorporationId}
                                        </p> */}
                                      </FormControl>
                                    </div>
                                  </div>
                                </>
                              </>) : ""}

                          </Typography>
                        </div>

                        <div style={{ padding: "10px", width: "100%" }}>
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
                                    Chapter 3 Classification Guide - Introduction
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "20px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    You have selected that this submission is being made on behalf of an entity that is not considered a United States person incorporated or established under the laws of the United States for tax purposes. We now need to determine the reason for the submission, for example:
                                    <ul>
                                      <li>Do you wish to apply for reduced rates of withholding that may apply if the country of your permanent establishment has an applicable tax treaty in place with the United States?</li>
                                      <li>Are applying for an exemption from U.S. tax obligations?</li>
                                      <li>Income derived effectively connected with the conduct of trade or business within the U.S.</li>
                                    </ul>
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Select "Confirm" and you will be taken to the first of a series of questions. Depending on your response you may be asked further questions or taken to the next stage in the process.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    We are not allowed nor aim to provide tax advice through this process. This tool is provided to take you through a process and help you determine which form is most appropriate for you to submit.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "30px",
                                      fontWeight: "bold",
                                    }}>
                                    Should you need specific help or guidance you should consult your tax advisers.

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
                                    Qualified Intermediary(Including a QDD){" "}
                                  </Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "1px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}>
                                    Chapter 3 Classification - Qualified Intermediary
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    A QI is a person that is a party to a withholding agreement with the IRS (described in Regulations section 1.1441-1(e)(5)(iii)) and is:</Typography>

                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}> A foreign financial institution (other than a U.S. branch of an FFI) that is a participating FFI, registered deemed-compliant FFI (including an FFI treated as a registered deemed-compliant FFI under an applicable IGA), FFI treated as a deemed-compliant FFI under an applicable IGA subject to due diligence and reporting requirements similar to those applicable to a registered deemed-compliant FFI under Regulations section 1.1471-5(f), or limited FFI (through December 31, 2015);
                                  </Typography>

                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>An exempt beneficial owner that is a central bank of issue that meets the requirements of and agrees to be treated as a participating FFI (including a reporting Model 2 FFI) or a registered deemed-compliant FFI (including a reporting Model 1 FFI) with respect to any account that it maintains and that is held in connection with a commercial financial activity described in Regulations section 1.1471-6(h) and for which it receives a withholdable payment;
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    A foreign branch or office of a U.S. financial institution or a foreign branch or office of a U.S. clearing organization;
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>A foreign corporation for purposes of presenting claims of benefits under an income tax treaty on behalf of its shareholders to the extent permitted to act as such by the IRS; or
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    A foreign entity other than an FFI that is acting as an intermediary for either withholdable payments or reportable amounts that the IRS accepts as a qualified intermediary.
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>Qualified securities lender (QSL).A QSL is a person that:
                                  </Typography>

                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>Is a bank, custodian, broker-dealer, or clearing organization that is subject to regulatory supervision by a governmental authority in the jurisdiction in which it was created or organized and is regularly engaged in a trade or business that includes the borrowing of securities of domestic corporations (as defined in section 7701(a)(4)) from, and lending of securities of domestic corporations to, its unrelated customers; and
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>Is subject to audit under section 7602 or is a QI that satisfies the requirements for QSL status and acts as a QSL under its QI agreement.
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>For more information on QSLs and the requirements related to withholding on substitute dividends, see Notice 2010-46. You can find Notice 2010-46 in Internal Revenue Bulletin (IRB) 2010-24 atwww.irs.gov/file_source/pub/irs-utl/notice_2010_46.pdf.
                                  </Typography>


                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => {
                                      setFieldValue("chapter3StatusId", 21);
                                      setExpanded("panel1")
                                      setTimeout(() => {
                                        //QDD form
                                        setFieldValue("isPart1Integral", false)
                                        setFieldValue("isPart1FFI", false)
                                        setFieldValue("isPart1chap3and4", false)
                                        setFieldValue("isPart1Section1446f", false)
                                        setFieldValue("isPart1Section14464b", false)
                                        setFieldValue("isPart1QIacting", false)
                                        setFieldValue("isPart1ofchap3and41099repo", false)
                                        setFieldValue("isPart1regusection16049C", false)
                                        setFieldValue("isPart1andbackupwithholdingresp", false)
                                        setFieldValue("isPart1AllocatePorofchap4", false)
                                        setFieldValue("isPart1QDDidentified", false)
                                        setFieldValue("corporation", false)
                                        setFieldValue("disregardedEntity", false)
                                        setFieldValue("partnership", false)
                                        setFieldValue("disregardedEntity", false)

                                        //NQI
                                        setFieldValue("isPart1QIeachamount", false)
                                        setFieldValue("isPart1transmitwithholdingCer", false)
                                        setFieldValue("isPart1meetsReguSection160494C", false)
                                        setFieldValue("isPart1OtherthanQI", false)
                                        setFieldValue("isPart1Section1441and1471", false)

                                        //TFI
                                        setFieldValue("isPart1lawsofterritoryofUS", false)
                                        setFieldValue("isPart1EvidenceofChap3and4", false)
                                        setFieldValue("isPart1withholdablepayment", false)
                                        setFieldValue("isPart1regulationSec11446f4aiB", false)
                                        setFieldValue("isPart1regulationSec11446f41vA", false)
                                        setFieldValue("partVNomineeforDistribution", false)

                                        //USBranch
                                        setFieldValue("isPart1PublictradedPartnership", false)
                                        setFieldValue("isPart119bRegulationSec11411b", false)
                                        setFieldValue("isPart119cRegulationSec11414d", false)
                                        setFieldValue("isPart119dRegulationSec11414a", false)
                                        setFieldValue("isPart119eRegulationSec11411b", false)
                                        setFieldValue("partVINomineeforDistribution", false)

                                        //WFP
                                        setFieldValue("isPart1WPorWTagreement", false)

                                        //NWFP
                                        setFieldValue("isPart1nonwithholdingpartnership", false)
                                        setFieldValue("isPart1partnerinlowertierpartnership", false)
                                        setFieldValue("isPart1forerignpartnershipsec1446f", false)
                                        setFieldValue("isPart1partnershipformodifiedamount", false)
                                        setFieldValue("isPart1foreigngrantortrustSec11446f", false)
                                        setFieldValue("isPart1knowledgeundersection1441and1471", false)
                                        // setFieldValue("isPart1nonwithholdingpartnership","")
                                        // setFieldValue("isPart1partnerinlowertierpartnership","")
                                        // setFieldValue("isPart1forerignpartnershipsec1446f","")
                                        // setFieldValue("isPart1partnershipformodifiedamount","")
                                        // setFieldValue("isPart1foreigngrantortrustSec11446f","")
                                        // setFieldValue("isPart1knowledgeundersection1441and1471","")

                                      }, 200)
                                    }}>Confirm</Button>
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
                                    Non Qualified Intermediary{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "1px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}>
                                    Chapter 3 Classification - Non Qualified Intermediary
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    A nonqualified intermediary is any intermediary that is not a U.S. person and that is not a qualified intermediary.

                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => {
                                      setFieldValue("chapter3StatusId", 22);
                                      setExpanded("panel1")
                                      setTimeout(() => {
                                        //QDD form
                                        setFieldValue("isPart1Integral", false)
                                        setFieldValue("isPart1FFI", false)
                                        setFieldValue("isPart1chap3and4", false)
                                        setFieldValue("isPart1Section1446f", false)
                                        setFieldValue("isPart1Section14464b", false)
                                        setFieldValue("isPart1QIacting", false)
                                        setFieldValue("isPart1ofchap3and41099repo", false)
                                        setFieldValue("isPart1regusection16049C", false)
                                        setFieldValue("isPart1andbackupwithholdingresp", false)
                                        setFieldValue("isPart1AllocatePorofchap4", false)
                                        setFieldValue("isPart1QDDidentified", false)
                                        setFieldValue("corporation", false)
                                        setFieldValue("disregardedEntity", false)
                                        setFieldValue("partnership", false)
                                        setFieldValue("disregardedEntity", false)

                                        //NQI
                                        setFieldValue("isPart1QIeachamount", false)
                                        setFieldValue("isPart1transmitwithholdingCer", false)
                                        setFieldValue("isPart1meetsReguSection160494C", false)
                                        setFieldValue("isPart1OtherthanQI", false)
                                        setFieldValue("isPart1Section1441and1471", false)

                                        //TFI
                                        setFieldValue("isPart1lawsofterritoryofUS", false)
                                        setFieldValue("isPart1EvidenceofChap3and4", false)
                                        setFieldValue("isPart1withholdablepayment", false)
                                        setFieldValue("isPart1regulationSec11446f4aiB", false)
                                        setFieldValue("isPart1regulationSec11446f41vA", false)
                                        setFieldValue("partVNomineeforDistribution", false)

                                        //USBranch
                                        setFieldValue("isPart1PublictradedPartnership", false)
                                        setFieldValue("isPart119bRegulationSec11411b", false)
                                        setFieldValue("isPart119cRegulationSec11414d", false)
                                        setFieldValue("isPart119dRegulationSec11414a", false)
                                        setFieldValue("isPart119eRegulationSec11411b", false)
                                        setFieldValue("partVINomineeforDistribution", false)

                                        //WFP
                                        setFieldValue("isPart1WPorWTagreement", false)

                                        //NWFP
                                        setFieldValue("isPart1nonwithholdingpartnership", false)
                                        setFieldValue("isPart1partnerinlowertierpartnership", false)
                                        setFieldValue("isPart1forerignpartnershipsec1446f", false)
                                        setFieldValue("isPart1partnershipformodifiedamount", false)
                                        setFieldValue("isPart1foreigngrantortrustSec11446f", false)
                                        setFieldValue("isPart1knowledgeundersection1441and1471", false)
                                        // setFieldValue("isPart1nonwithholdingpartnership","")
                                        // setFieldValue("isPart1partnerinlowertierpartnership","")
                                        // setFieldValue("isPart1forerignpartnershipsec1446f","")
                                        // setFieldValue("isPart1partnershipformodifiedamount","")
                                        // setFieldValue("isPart1foreigngrantortrustSec11446f","")
                                        // setFieldValue("isPart1knowledgeundersection1441and1471","")

                                      }, 200)
                                    }}>Confirm</Button>
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
                                    Territory Financial Institution{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "1px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}>
                                    Chapter 3 Classification - Territory Financial Institution
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    The term territory financial institution means a financial institution that is incorporated or organized under the laws of any U.S. territory. However, an investment entity that is not also a depository institution, custodial institution, or specified insurance company is not a territory financial institution. A territory financial institution acting as an intermediary or that is a flow-through entity may agree to be treated as a U.S. person under Regulations section 1.1441-1(b)(2)(iv)(A).</Typography>



                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => {
                                      setFieldValue("chapter3StatusId", 23);
                                      setExpanded("panel1")
                                      setTimeout(() => {
                                        //QDD form
                                        setFieldValue("isPart1Integral", false)
                                        setFieldValue("isPart1FFI", false)
                                        setFieldValue("isPart1chap3and4", false)
                                        setFieldValue("isPart1Section1446f", false)
                                        setFieldValue("isPart1Section14464b", false)
                                        setFieldValue("isPart1QIacting", false)
                                        setFieldValue("isPart1ofchap3and41099repo", false)
                                        setFieldValue("isPart1regusection16049C", false)
                                        setFieldValue("isPart1andbackupwithholdingresp", false)
                                        setFieldValue("isPart1AllocatePorofchap4", false)
                                        setFieldValue("isPart1QDDidentified", false)
                                        setFieldValue("corporation", false)
                                        setFieldValue("disregardedEntity", false)
                                        setFieldValue("partnership", false)
                                        setFieldValue("disregardedEntity", false)

                                        //NQI
                                        setFieldValue("isPart1QIeachamount", false)
                                        setFieldValue("isPart1transmitwithholdingCer", false)
                                        setFieldValue("isPart1meetsReguSection160494C", false)
                                        setFieldValue("isPart1OtherthanQI", false)
                                        setFieldValue("isPart1Section1441and1471", false)

                                        //TFI
                                        setFieldValue("isPart1lawsofterritoryofUS", false)
                                        setFieldValue("isPart1EvidenceofChap3and4", false)
                                        setFieldValue("isPart1withholdablepayment", false)
                                        setFieldValue("isPart1regulationSec11446f4aiB", false)
                                        setFieldValue("isPart1regulationSec11446f41vA", false)
                                        setFieldValue("partVNomineeforDistribution", false)

                                        //USBranch
                                        setFieldValue("isPart1PublictradedPartnership", false)
                                        setFieldValue("isPart119bRegulationSec11411b", false)
                                        setFieldValue("isPart119cRegulationSec11414d", false)
                                        setFieldValue("isPart119dRegulationSec11414a", false)
                                        setFieldValue("isPart119eRegulationSec11411b", false)
                                        setFieldValue("partVINomineeforDistribution", false)

                                        //WFP
                                        setFieldValue("isPart1WPorWTagreement", false)

                                        //NWFP
                                        setFieldValue("isPart1nonwithholdingpartnership", false)
                                        setFieldValue("isPart1partnerinlowertierpartnership", false)
                                        setFieldValue("isPart1forerignpartnershipsec1446f", false)
                                        setFieldValue("isPart1partnershipformodifiedamount", false)
                                        setFieldValue("isPart1foreigngrantortrustSec11446f", false)
                                        setFieldValue("isPart1knowledgeundersection1441and1471", false)
                                        // setFieldValue("isPart1nonwithholdingpartnership","")
                                        // setFieldValue("isPart1partnerinlowertierpartnership","")
                                        // setFieldValue("isPart1forerignpartnershipsec1446f","")
                                        // setFieldValue("isPart1partnershipformodifiedamount","")
                                        // setFieldValue("isPart1foreigngrantortrustSec11446f","")
                                        // setFieldValue("isPart1knowledgeundersection1441and1471","")

                                      }, 200)
                                    }}>Confirm</Button>
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
                                    U.S. Branch{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "1px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}>
                                    Chapter 3 Classification - U.S. Branch
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    U.S. branch treated as a U.S. person. The phrase U.S. branch treated as a U.S. person means a U.S. branch of a participating FFI, registered deemed-compliant FFI, or NFFE that is treated as a U.S. person under Regulations section 1.1441-1(b)(2)(iv)(A).
                                  </Typography>



                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => {
                                      setFieldValue("chapter3StatusId", 24);
                                      setExpanded("panel1")
                                      setTimeout(() => {
                                        //QDD form
                                        setFieldValue("isPart1Integral", false)
                                        setFieldValue("isPart1FFI", false)
                                        setFieldValue("isPart1chap3and4", false)
                                        setFieldValue("isPart1Section1446f", false)
                                        setFieldValue("isPart1Section14464b", false)
                                        setFieldValue("isPart1QIacting", false)
                                        setFieldValue("isPart1ofchap3and41099repo", false)
                                        setFieldValue("isPart1regusection16049C", false)
                                        setFieldValue("isPart1andbackupwithholdingresp", false)
                                        setFieldValue("isPart1AllocatePorofchap4", false)
                                        setFieldValue("isPart1QDDidentified", false)
                                        setFieldValue("corporation", false)
                                        setFieldValue("disregardedEntity", false)
                                        setFieldValue("partnership", false)
                                        setFieldValue("disregardedEntity", false)

                                        //NQI
                                        setFieldValue("isPart1QIeachamount", false)
                                        setFieldValue("isPart1transmitwithholdingCer", false)
                                        setFieldValue("isPart1meetsReguSection160494C", false)
                                        setFieldValue("isPart1OtherthanQI", false)
                                        setFieldValue("isPart1Section1441and1471", false)

                                        //TFI
                                        setFieldValue("isPart1lawsofterritoryofUS", false)
                                        setFieldValue("isPart1EvidenceofChap3and4", false)
                                        setFieldValue("isPart1withholdablepayment", false)
                                        setFieldValue("isPart1regulationSec11446f4aiB", false)
                                        setFieldValue("isPart1regulationSec11446f41vA", false)
                                        setFieldValue("partVNomineeforDistribution", false)

                                        //USBranch
                                        setFieldValue("isPart1PublictradedPartnership", false)
                                        setFieldValue("isPart119bRegulationSec11411b", false)
                                        setFieldValue("isPart119cRegulationSec11414d", false)
                                        setFieldValue("isPart119dRegulationSec11414a", false)
                                        setFieldValue("isPart119eRegulationSec11411b", false)
                                        setFieldValue("partVINomineeforDistribution", false)

                                        //WFP
                                        setFieldValue("isPart1WPorWTagreement", false)

                                        //NWFP
                                        setFieldValue("isPart1nonwithholdingpartnership", false)
                                        setFieldValue("isPart1partnerinlowertierpartnership", false)
                                        setFieldValue("isPart1forerignpartnershipsec1446f", false)
                                        setFieldValue("isPart1partnershipformodifiedamount", false)
                                        setFieldValue("isPart1foreigngrantortrustSec11446f", false)
                                        setFieldValue("isPart1knowledgeundersection1441and1471", false)
                                        // setFieldValue("isPart1nonwithholdingpartnership","")
                                        // setFieldValue("isPart1partnerinlowertierpartnership","")
                                        // setFieldValue("isPart1forerignpartnershipsec1446f","")
                                        // setFieldValue("isPart1partnershipformodifiedamount","")
                                        // setFieldValue("isPart1foreigngrantortrustSec11446f","")
                                        // setFieldValue("isPart1knowledgeundersection1441and1471","")

                                      }, 200)
                                    }}>Confirm</Button>
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
                                    Withholding Foreign partnership{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "1px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}>
                                    Withholding Foreign partnership
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    Withholding foreign partnership (WP). A WP is a foreign partnership that has entered into a withholding agreement with the IRS in which it agrees to assume primary withholding responsibility for purposes of chapter 3 or chapter 4 purposes for all payments that are made to its partners, beneficiaries, or owners, except as otherwise provided in the withholding agreement.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => {
                                      setFieldValue("chapter3StatusId", 25);
                                      setExpanded("panel1")
                                      setTimeout(() => {
                                        //QDD form
                                        setFieldValue("isPart1Integral", false)
                                        setFieldValue("isPart1FFI", false)
                                        setFieldValue("isPart1chap3and4", false)
                                        setFieldValue("isPart1Section1446f", false)
                                        setFieldValue("isPart1Section14464b", false)
                                        setFieldValue("isPart1QIacting", false)
                                        setFieldValue("isPart1ofchap3and41099repo", false)
                                        setFieldValue("isPart1regusection16049C", false)
                                        setFieldValue("isPart1andbackupwithholdingresp", false)
                                        setFieldValue("isPart1AllocatePorofchap4", false)
                                        setFieldValue("isPart1QDDidentified", false)
                                        setFieldValue("corporation", false)
                                        setFieldValue("disregardedEntity", false)
                                        setFieldValue("partnership", false)
                                        setFieldValue("disregardedEntity", false)

                                        //NQI
                                        setFieldValue("isPart1QIeachamount", false)
                                        setFieldValue("isPart1transmitwithholdingCer", false)
                                        setFieldValue("isPart1meetsReguSection160494C", false)
                                        setFieldValue("isPart1OtherthanQI", false)
                                        setFieldValue("isPart1Section1441and1471", false)

                                        //TFI
                                        setFieldValue("isPart1lawsofterritoryofUS", false)
                                        setFieldValue("isPart1EvidenceofChap3and4", false)
                                        setFieldValue("isPart1withholdablepayment", false)
                                        setFieldValue("isPart1regulationSec11446f4aiB", false)
                                        setFieldValue("isPart1regulationSec11446f41vA", false)
                                        setFieldValue("partVNomineeforDistribution", false)

                                        //USBranch
                                        setFieldValue("isPart1PublictradedPartnership", false)
                                        setFieldValue("isPart119bRegulationSec11411b", false)
                                        setFieldValue("isPart119cRegulationSec11414d", false)
                                        setFieldValue("isPart119dRegulationSec11414a", false)
                                        setFieldValue("isPart119eRegulationSec11411b", false)
                                        setFieldValue("partVINomineeforDistribution", false)

                                        //WFP
                                        setFieldValue("isPart1WPorWTagreement", false)

                                        //NWFP
                                        setFieldValue("isPart1nonwithholdingpartnership", false)
                                        setFieldValue("isPart1partnerinlowertierpartnership", false)
                                        setFieldValue("isPart1forerignpartnershipsec1446f", false)
                                        setFieldValue("isPart1partnershipformodifiedamount", false)
                                        setFieldValue("isPart1foreigngrantortrustSec11446f", false)
                                        setFieldValue("isPart1knowledgeundersection1441and1471", false)
                                        // setFieldValue("isPart1nonwithholdingpartnership","")
                                        // setFieldValue("isPart1partnerinlowertierpartnership","")
                                        // setFieldValue("isPart1forerignpartnershipsec1446f","")
                                        // setFieldValue("isPart1partnershipformodifiedamount","")
                                        // setFieldValue("isPart1foreigngrantortrustSec11446f","")
                                        // setFieldValue("isPart1knowledgeundersection1441and1471","")

                                      }, 200)
                                    }}>Confirm</Button>
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
                                    Withholding Foreign Trust{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "1px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}>
                                    Chapter 3 Classification - Withholding Foreign Trust
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    A Withholding foreign trust (WT) is a foreign simple or grantor trust that has entered into a withholding agreement with the IRS in which it agrees to assume primary withholding responsibility for purposes of chapter 3 and chapter 4 withholding for all payments that are made to its partners, beneficiaries, or owners, except as otherwise provided in the withholding agreement.

                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => {
                                      setFieldValue("chapter3StatusId", 26);
                                      setExpanded("panel1")
                                      setTimeout(() => {
                                        //QDD form
                                        setFieldValue("isPart1Integral", false)
                                        setFieldValue("isPart1FFI", false)
                                        setFieldValue("isPart1chap3and4", false)
                                        setFieldValue("isPart1Section1446f", false)
                                        setFieldValue("isPart1Section14464b", false)
                                        setFieldValue("isPart1QIacting", false)
                                        setFieldValue("isPart1ofchap3and41099repo", false)
                                        setFieldValue("isPart1regusection16049C", false)
                                        setFieldValue("isPart1andbackupwithholdingresp", false)
                                        setFieldValue("isPart1AllocatePorofchap4", false)
                                        setFieldValue("isPart1QDDidentified", false)
                                        setFieldValue("corporation", false)
                                        setFieldValue("disregardedEntity", false)
                                        setFieldValue("partnership", false)
                                        setFieldValue("disregardedEntity", false)

                                        //NQI
                                        setFieldValue("isPart1QIeachamount", false)
                                        setFieldValue("isPart1transmitwithholdingCer", false)
                                        setFieldValue("isPart1meetsReguSection160494C", false)
                                        setFieldValue("isPart1OtherthanQI", false)
                                        setFieldValue("isPart1Section1441and1471", false)

                                        //TFI
                                        setFieldValue("isPart1lawsofterritoryofUS", false)
                                        setFieldValue("isPart1EvidenceofChap3and4", false)
                                        setFieldValue("isPart1withholdablepayment", false)
                                        setFieldValue("isPart1regulationSec11446f4aiB", false)
                                        setFieldValue("isPart1regulationSec11446f41vA", false)
                                        setFieldValue("partVNomineeforDistribution", false)

                                        //USBranch
                                        setFieldValue("isPart1PublictradedPartnership", false)
                                        setFieldValue("isPart119bRegulationSec11411b", false)
                                        setFieldValue("isPart119cRegulationSec11414d", false)
                                        setFieldValue("isPart119dRegulationSec11414a", false)
                                        setFieldValue("isPart119eRegulationSec11411b", false)
                                        setFieldValue("partVINomineeforDistribution", false)

                                        //WFP
                                        setFieldValue("isPart1WPorWTagreement", false)

                                        //NWFP
                                        setFieldValue("isPart1nonwithholdingpartnership", false)
                                        setFieldValue("isPart1partnerinlowertierpartnership", false)
                                        setFieldValue("isPart1forerignpartnershipsec1446f", false)
                                        setFieldValue("isPart1partnershipformodifiedamount", false)
                                        setFieldValue("isPart1foreigngrantortrustSec11446f", false)
                                        setFieldValue("isPart1knowledgeundersection1441and1471", false)
                                        // setFieldValue("isPart1nonwithholdingpartnership","")
                                        // setFieldValue("isPart1partnerinlowertierpartnership","")
                                        // setFieldValue("isPart1forerignpartnershipsec1446f","")
                                        // setFieldValue("isPart1partnershipformodifiedamount","")
                                        // setFieldValue("isPart1foreigngrantortrustSec11446f","")
                                        // setFieldValue("isPart1knowledgeundersection1441and1471","")

                                      }, 200)
                                    }}>Confirm</Button>
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
                                    Non-withholding Foreign partnership{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "1px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}>
                                    Chapter 3 Classification - Nonwithholding partnership

                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    A nonwithholding foreign partnership is any foreign partnership other than a withholding foreign partnership.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => {
                                      setFieldValue("chapter3StatusId", 27);
                                      setExpanded("panel1")
                                      setTimeout(() => {
                                        //QDD form
                                        setFieldValue("isPart1Integral", false)
                                        setFieldValue("isPart1FFI", false)
                                        setFieldValue("isPart1chap3and4", false)
                                        setFieldValue("isPart1Section1446f", false)
                                        setFieldValue("isPart1Section14464b", false)
                                        setFieldValue("isPart1QIacting", false)
                                        setFieldValue("isPart1ofchap3and41099repo", false)
                                        setFieldValue("isPart1regusection16049C", false)
                                        setFieldValue("isPart1andbackupwithholdingresp", false)
                                        setFieldValue("isPart1AllocatePorofchap4", false)
                                        setFieldValue("isPart1QDDidentified", false)
                                        setFieldValue("corporation", false)
                                        setFieldValue("disregardedEntity", false)
                                        setFieldValue("partnership", false)
                                        setFieldValue("disregardedEntity", false)

                                        //NQI
                                        setFieldValue("isPart1QIeachamount", false)
                                        setFieldValue("isPart1transmitwithholdingCer", false)
                                        setFieldValue("isPart1meetsReguSection160494C", false)
                                        setFieldValue("isPart1OtherthanQI", false)
                                        setFieldValue("isPart1Section1441and1471", false)

                                        //TFI
                                        setFieldValue("isPart1lawsofterritoryofUS", false)
                                        setFieldValue("isPart1EvidenceofChap3and4", false)
                                        setFieldValue("isPart1withholdablepayment", false)
                                        setFieldValue("isPart1regulationSec11446f4aiB", false)
                                        setFieldValue("isPart1regulationSec11446f41vA", false)
                                        setFieldValue("partVNomineeforDistribution", false)

                                        //USBranch
                                        setFieldValue("isPart1PublictradedPartnership", false)
                                        setFieldValue("isPart119bRegulationSec11411b", false)
                                        setFieldValue("isPart119cRegulationSec11414d", false)
                                        setFieldValue("isPart119dRegulationSec11414a", false)
                                        setFieldValue("isPart119eRegulationSec11411b", false)
                                        setFieldValue("partVINomineeforDistribution", false)

                                        //WFP
                                        setFieldValue("isPart1WPorWTagreement", false)

                                        //NWFP
                                        setFieldValue("isPart1nonwithholdingpartnership", false)
                                        setFieldValue("isPart1partnerinlowertierpartnership", false)
                                        setFieldValue("isPart1forerignpartnershipsec1446f", false)
                                        setFieldValue("isPart1partnershipformodifiedamount", false)
                                        setFieldValue("isPart1foreigngrantortrustSec11446f", false)
                                        setFieldValue("isPart1knowledgeundersection1441and1471", false)
                                        // setFieldValue("isPart1nonwithholdingpartnership","")
                                        // setFieldValue("isPart1partnerinlowertierpartnership","")
                                        // setFieldValue("isPart1forerignpartnershipsec1446f","")
                                        // setFieldValue("isPart1partnershipformodifiedamount","")
                                        // setFieldValue("isPart1foreigngrantortrustSec11446f","")
                                        // setFieldValue("isPart1knowledgeundersection1441and1471","")

                                      }, 200)
                                    }}>Confirm</Button>
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
                                    Non-withholding Foriegn Simple Trust{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "1px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}>
                                    Chapter 3 Classification - Nonwithholding Simple Trust
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    A nonwithholding foreign simple trust is any foreign simple trust that is not a withholding foreign trust.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => {
                                      setFieldValue("chapter3StatusId", 28);
                                      setExpanded("panel1")
                                      setTimeout(() => {
                                        //QDD form
                                        setFieldValue("isPart1Integral", false)
                                        setFieldValue("isPart1FFI", false)
                                        setFieldValue("isPart1chap3and4", false)
                                        setFieldValue("isPart1Section1446f", false)
                                        setFieldValue("isPart1Section14464b", false)
                                        setFieldValue("isPart1QIacting", false)
                                        setFieldValue("isPart1ofchap3and41099repo", false)
                                        setFieldValue("isPart1regusection16049C", false)
                                        setFieldValue("isPart1andbackupwithholdingresp", false)
                                        setFieldValue("isPart1AllocatePorofchap4", false)
                                        setFieldValue("isPart1QDDidentified", false)
                                        setFieldValue("corporation", false)
                                        setFieldValue("disregardedEntity", false)
                                        setFieldValue("partnership", false)
                                        setFieldValue("disregardedEntity", false)

                                        //NQI
                                        setFieldValue("isPart1QIeachamount", false)
                                        setFieldValue("isPart1transmitwithholdingCer", false)
                                        setFieldValue("isPart1meetsReguSection160494C", false)
                                        setFieldValue("isPart1OtherthanQI", false)
                                        setFieldValue("isPart1Section1441and1471", false)

                                        //TFI
                                        setFieldValue("isPart1lawsofterritoryofUS", false)
                                        setFieldValue("isPart1EvidenceofChap3and4", false)
                                        setFieldValue("isPart1withholdablepayment", false)
                                        setFieldValue("isPart1regulationSec11446f4aiB", false)
                                        setFieldValue("isPart1regulationSec11446f41vA", false)
                                        setFieldValue("partVNomineeforDistribution", false)

                                        //USBranch
                                        setFieldValue("isPart1PublictradedPartnership", false)
                                        setFieldValue("isPart119bRegulationSec11411b", false)
                                        setFieldValue("isPart119cRegulationSec11414d", false)
                                        setFieldValue("isPart119dRegulationSec11414a", false)
                                        setFieldValue("isPart119eRegulationSec11411b", false)
                                        setFieldValue("partVINomineeforDistribution", false)

                                        //WFP
                                        setFieldValue("isPart1WPorWTagreement", false)

                                        //NWFP
                                        setFieldValue("isPart1nonwithholdingpartnership", false)
                                        setFieldValue("isPart1partnerinlowertierpartnership", false)
                                        setFieldValue("isPart1forerignpartnershipsec1446f", false)
                                        setFieldValue("isPart1partnershipformodifiedamount", false)
                                        setFieldValue("isPart1foreigngrantortrustSec11446f", false)
                                        setFieldValue("isPart1knowledgeundersection1441and1471", false)
                                        // setFieldValue("isPart1nonwithholdingpartnership","")
                                        // setFieldValue("isPart1partnerinlowertierpartnership","")
                                        // setFieldValue("isPart1forerignpartnershipsec1446f","")
                                        // setFieldValue("isPart1partnershipformodifiedamount","")
                                        // setFieldValue("isPart1foreigngrantortrustSec11446f","")
                                        // setFieldValue("isPart1knowledgeundersection1441and1471","")

                                      }, 200)
                                    }}>Confirm</Button>
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
                                    Non-withholding Foreign Grant Trust{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "1px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}>
                                    Chapter 3 Classification - Nonwithholding Grantor Trust
                                  </Typography>
                                  <Typography align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}>
                                    A nonwithholding foreign grantor trust is any foreign grantor trust that is not a withholding foreign trust.
                                  </Typography>

                                  <Typography
                                    align="center"
                                    style={{ marginTop: "30px" }}
                                  >
                                    <Button variant="contained" onClick={() => {
                                      setFieldValue("chapter3StatusId", 29);
                                      setExpanded("panel1")
                                      setTimeout(() => {
                                        //QDD form
                                        setFieldValue("isPart1Integral", false)
                                        setFieldValue("isPart1FFI", false)
                                        setFieldValue("isPart1chap3and4", false)
                                        setFieldValue("isPart1Section1446f", false)
                                        setFieldValue("isPart1Section14464b", false)
                                        setFieldValue("isPart1QIacting", false)
                                        setFieldValue("isPart1ofchap3and41099repo", false)
                                        setFieldValue("isPart1regusection16049C", false)
                                        setFieldValue("isPart1andbackupwithholdingresp", false)
                                        setFieldValue("isPart1AllocatePorofchap4", false)
                                        setFieldValue("isPart1QDDidentified", false)
                                        setFieldValue("corporation", false)
                                        setFieldValue("disregardedEntity", false)
                                        setFieldValue("partnership", false)
                                        setFieldValue("disregardedEntity", false)

                                        //NQI
                                        setFieldValue("isPart1QIeachamount", false)
                                        setFieldValue("isPart1transmitwithholdingCer", false)
                                        setFieldValue("isPart1meetsReguSection160494C", false)
                                        setFieldValue("isPart1OtherthanQI", false)
                                        setFieldValue("isPart1Section1441and1471", false)

                                        //TFI
                                        setFieldValue("isPart1lawsofterritoryofUS", false)
                                        setFieldValue("isPart1EvidenceofChap3and4", false)
                                        setFieldValue("isPart1withholdablepayment", false)
                                        setFieldValue("isPart1regulationSec11446f4aiB", false)
                                        setFieldValue("isPart1regulationSec11446f41vA", false)
                                        setFieldValue("partVNomineeforDistribution", false)

                                        //USBranch
                                        setFieldValue("isPart1PublictradedPartnership", false)
                                        setFieldValue("isPart119bRegulationSec11411b", false)
                                        setFieldValue("isPart119cRegulationSec11414d", false)
                                        setFieldValue("isPart119dRegulationSec11414a", false)
                                        setFieldValue("isPart119eRegulationSec11411b", false)
                                        setFieldValue("partVINomineeforDistribution", false)

                                        //WFP
                                        setFieldValue("isPart1WPorWTagreement", false)

                                        //NWFP
                                        setFieldValue("isPart1nonwithholdingpartnership", false)
                                        setFieldValue("isPart1partnerinlowertierpartnership", false)
                                        setFieldValue("isPart1forerignpartnershipsec1446f", false)
                                        setFieldValue("isPart1partnershipformodifiedamount", false)
                                        setFieldValue("isPart1foreigngrantortrustSec11446f", false)
                                        setFieldValue("isPart1knowledgeundersection1441and1471", false)
                                        // setFieldValue("isPart1nonwithholdingpartnership","")
                                        // setFieldValue("isPart1partnerinlowertierpartnership","")
                                        // setFieldValue("isPart1forerignpartnershipsec1446f","")
                                        // setFieldValue("isPart1partnershipformodifiedamount","")
                                        // setFieldValue("isPart1foreigngrantortrustSec11446f","")
                                        // setFieldValue("isPart1knowledgeundersection1441and1471","")

                                      }, 200)
                                    }}>Confirm</Button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>



                              <Accordion
                                expanded={expandedState === "11"}
                                onChange={handleChangeAccodionState("11")}
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
                                    Please read through each option above and choose whichever is most applicable to the individual or entity the submission is being made on behalf of. We cannot offer tax advise so if you need assistance, please Exit the process and consult you tax adviser.
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        <div>
                          {/* <input type="checkbox" name="isPart1QDDidentified" onChange={handleChange} value={values.isPart1QDDidentified}/> */}

                        </div>
                        {values.chapter3StatusId == 21 && (
                          <QDD handleChange={handleChange} values={values} setFieldValue={setFieldValue} />)}
                        {values.chapter3StatusId == 22 && (
                          <NQI handleChange={handleChange} values={values} setFieldValue={setFieldValue} />)}
                        {values.chapter3StatusId == 23 && (
                          <TFI handleChange={handleChange} values={values} setFieldValue={setFieldValue} />)}
                        {values.chapter3StatusId == 24 && (
                          <USBranch handleChange={handleChange} values={values} setFieldValue={setFieldValue} />)}
                        {(values.chapter3StatusId == 25 || values.chapter3StatusId == 26) && (
                          <WFP handleChange={handleChange} values={values} setFieldValue={setFieldValue} />)}
                        {(values.chapter3StatusId == 27 || values.chapter3StatusId == 28 || values.chapter3StatusId == 29) && (
                          <NWFP handleChange={handleChange} values={values} setFieldValue={setFieldValue} />)}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "80px",
                          }}
                        >
                          <SaveAndExit Callback={() => {
                            submitForm().then(() => {
                              const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                              const urlValue = window.location.pathname.substring(1);
                              const temp = {
                                agentId: authDetails.agentId,
                                accountHolderBasicDetailId: authDetails.accountHolderId,
                                ...PrevStepData,
                                ...values,
                                stepName: `/${urlValue}`
                              };
                              dispatch(postW81MY_EForm(
                                temp
                                , () => { }))
                              history(
                                GlobalValues.basePageRoute
                              );
                            })
                          }} formTypeId={FormTypeId.FW81MY} ></SaveAndExit>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            style={{ color: "white", marginLeft: "15px" }}
                            onClick={() => {
                              dispatch(GetImyPdf(authDetails?.accountHolderId))
                            }}
                          >
                            View Form
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            style={{ color: "white", marginLeft: "15px" }}
                            disabled={
                              (
                                values.chapter3StatusId == 21 && values.isPart1Integral && (values.isPart1QDDidentified && (values.corporation || values.partnership || values.disregardedEntity))
                              )
                                ||
                                (
                                  values.chapter3StatusId == 22 && values.isPart1QIeachamount && (values.isPart1transmitwithholdingCer || values.isPart1meetsReguSection160494C || values.isPart1OtherthanQI || values.isPart1Section1441and1471)
                                )

                                ||
                                (
                                  values.chapter3StatusId == 23 && values.isPart1lawsofterritoryofUS && (values.isPart1EvidenceofChap3and4 || values.isPart1withholdablepayment)
                                )

                                ||
                                (
                                  values.chapter3StatusId == 24 && values.isPart1PublictradedPartnership && (values.isPart119bRegulationSec11411b || values.isPart119cRegulationSec11414d)
                                )

                                ||
                                (
                                  (values.chapter3StatusId == 25 || values.chapter3StatusId == 26) && values.isPart1WPorWTagreement
                                )

                                ||
                                (
                                  (values.chapter3StatusId == 27 || values.chapter3StatusId == 28 || values.chapter3StatusId == 29) && values.isPart1nonwithholdingpartnership
                                )


                                ? false : true
                              // values.chapter3StatusId == 21 && values.isPart1Integral && (values.isPart1QDDidentified && (values.corporation || values.partnership || values.disregardedEntity) ? false : true)
                            }
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
                              history("/Certificates");
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
      </section>
    </>
  );
}
