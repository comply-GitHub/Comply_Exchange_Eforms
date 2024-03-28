import React, { useState, useEffect } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,

  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";

import Tooltip from "@mui/material/Tooltip";
import { CheckBox, ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import "./index.scss";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import {
  getAllCountries,
  getAllCountriesCode,
  getAllCountriesIncomeCode,
  getAllStateByCountryId,
  GetChapter4Statuses,
  GetHelpVideoDetails,
  GetSubstantialUsPassiveNFE,
  postW8EXPForm,
  UpsertSubstantialUsPassiveNFE
} from "../../../Redux/Actions";
import Infoicon from "../../../assets/img/info.png";
import { TaxPurposeSchema, chapter4Schema } from "../../../schemas/w8Exp";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import useAuth from "../../../customHooks/useAuth";
import SubstantialUsPassiveNFE from "../../W8BEN-E/Declaration_BENE/Non_US/Status/SubstantialUsPassiveNFE";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
export default function Fedral_tax(props: any) {
  const dispatch = useDispatch();
  const { authDetails } = useAuth();
  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;

  const [initialValue, setInitialValues] = useState({
    chapter4StatusId: 0,
    isNotFinancialInsititute: false,
    isNoSubstantialUSOwner: false,
    isNFFE: false,
    isCertify39: false,
    isCertify22Entity: false,
    isCertify18FFI: false,
    isCertify30Entity: false,
    isCertify41Entity: false,
    isCertify34Entity: false,
    planReorganization: "",
    isCertify32Entity: false,
    isCertify33Entity: false,
    priorDate: "",
    isCertify38Entity: false,
    isCertify27Entity: false,
    isCertify28aEntity: false,
    isCertify28bEntity: false,
    isCertify36Entity: false,
    isCertify26Entity: false,
    iGAbetweenUnitedStates: 0,
    iGA: "",
    istreated: 0,
    otherTreated: "",
    isCertify24aFFIPart1: false,
    isCertify24bFFIPart1: false,
    isCertify24cFFIPart1: false,
    isCertify24dFFIPart1: false,
    isCertify37a: false,
    aEntityStockMarket: "",
    isCertify37b: false,
    bEntityStockMarket: "",
    namesecuritiesmarket: "",
    isCertify25aEntityPart1: false,
    hasBeenBoundBy: false,
    currentBoundBy: false,
    nameSponsoringEntity: "",
    isCertify43: false,
    nameSponsoringEntity16: "",
    isCertify17a: false,
    isCertify17b: false,
    isCertify35: false,
    payeesection501: "",
    foreginTIN_CountryId: 0
  });



  const [submitPassiveNFEData, setSubmitPassiveNFEData] = useState<any[]>([]);

  const W8EXPData = useSelector((state: any) => (state?.W8EXP?.chapter4StatusId !== 0) ? state?.W8EXP : JSON.parse(localStorage.getItem("PrevStepData") || "{}"));
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const LoadData = () => {
    const temp = {
      ...PrevStepData,
      ...W8EXPData
    }
    setInitialValues({ ...initialValue, ...temp });

  }
  useEffect(()=>{
    document.title = "Chapter IV"
  },[])

  useEffect(() => {
    dispatch(GetSubstantialUsPassiveNFE(authDetails?.accountHolderId,
      (data: any[]) => {
        console.log(data);
        setSubmitPassiveNFEData([...data]);
      }));
  }, [authDetails])

  const [toolInfo, setToolInfo] = useState("");
  const history = useNavigate();
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [numPapers, setNumPapers] = useState(1);
  const addIncomeTypePaper = () => {
    setNumPapers(numPapers + 1);
  };
  const deleteIncomeTypePaper = () => {
    setNumPapers(numPapers - 1);
  };
  const handleCheckbox1Change = () => {
    setCheckbox1Checked(true);
    setCheckbox2Checked(false);
  };

  const handleCheckbox2Change = () => {
    setCheckbox1Checked(false);
    setCheckbox2Checked(true);
  };
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllCountriesCode());
    dispatch(GetHelpVideoDetails());
    dispatch(getAllCountriesIncomeCode());
    // dispatch(getAllStateByCountryId());
    dispatch(GetChapter4Statuses());
    LoadData();
  }, []);

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
  const GetChapter4StatusesReducer = useSelector(
    (state: any) => state.GetChapter4StatusesReducer
  );

  const handleChangeAccodion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

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


  const viewPdf = () => {
    history("/w8BenE_pdf", { replace: true });
  }

  return (
    <>
      <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        <div className="overlay-div">
          <div className="overlay-div-group">
            <div className="viewInstructions">View Instructions</div>
            <div className="viewform" onClick={viewPdf}>View Form</div>
            <div className="helpvideo">
              {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
              {GethelpData && GethelpData[3].id === 5 ? (
                <a
                  href={GethelpData[3].fieldValue}
                  target="popup"
                  onClick={() =>
                    window.open(
                      GethelpData[3].fieldValue,
                      'name',
                      `width=${GethelpData[3].width},height=${GethelpData[3].height},top=${GethelpData[3].top},left=${GethelpData[3].left}`
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
        <div className="row w-100 h-100">
          <div className="col-4">
            <div style={{ padding: "20px 0px", height: "100%" }}>
              <BreadCrumbComponent breadCrumbCode={1210} formName={FormTypeId.W8EXP} />
            </div>
          </div>
          <div className="col-8 mt-3">
            <div style={{ padding: "12px" }}>
              <Paper style={{ padding: "10px" }}>
                <Formik
                  enableReinitialize
                  validateOnChange={true}
                  validateOnBlur={false}
                  initialValues={initialValue}
                  validationSchema={chapter4Schema}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    console.log(values, "valuessss")
                    const temp = {
                      agentId: authDetails.agentId,
                      accountHolderBasicDetailId: authDetails.accountHolderId,
                      ...PrevStepData,
                      ...values,
                      stepName: null
                    };
                    const returnPromise = new Promise((resolve, reject) => {
                      dispatch(postW8EXPForm(
                        temp,
                        (responseData: any) => {
                          localStorage.setItem("PrevStepData", JSON.stringify(temp));
                          if (values.isNFFE == true && values.isNoSubstantialUSOwner == false) {
                            dispatch(
                              UpsertSubstantialUsPassiveNFE(
                                () => {
                                  resolve(responseData);
                                },
                                (err: any) => {
                                  reject(err);
                                }
                              )
                            );
                          } else {
                            resolve(responseData);
                          }

                        },
                        (err: any) => {
                          reject(err);
                        }
                      ))
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
                    <Form onSubmit={(e) => { handleSubmit(e); e.preventDefault(); }}>
                      {(() => { console.log(values, 'form values'); return <></>; })()}
                      {(() => { console.log(errors, 'error values'); return <></>; })()}
                      <div style={{ width: "100%" }}>
                        <div>
                          <Typography style={{ margin: "10px" }}>
                            <div
                              //   className="row"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                // className="col-md-6 col-6"
                                // align="left"
                                style={{
                                  color: "black",
                                  fontSize: "27px",
                                  fontWeight: "550",
                                }}
                              >
                                Chapter 4 Status:{" "}
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
                                    <Info
                                      style={{
                                        color: "#ffc107",
                                        fontSize: "16px",
                                        cursor: "pointer",
                                        verticalAlign: "super",
                                      }}
                                    />
                                  </Tooltip>
                                </span>
                              </Typography>
                              <Typography >
                                <Button onClick={() => {
                                  history("/Chapter4Guide_Exp")
                                }} variant="contained" style={{ backgroundColor: "#d3ae33", color: "black", fontSize: "10px", fontWeight: "bold" }}>
                                  Chapter 4 Status Guide
                                </Button>
                              </Typography>


                            </div>
                            <div>
                              {toolInfo === "basic" ? (
                                <div>
                                  <Paper
                                    style={{
                                      backgroundColor: "#dedcb1",
                                      padding: "15px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    <Typography style={{ fontSize: "12px" }}>
                                      You are required to provide a Chapter 4
                                      status on Form W-8BEN-E or W-8EXP if you
                                      are the payee of a withholdable payment or
                                      hold an account with an FFI requesting
                                      this form.
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginTop: "10px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      You are required to provide a Chapter 4
                                      status on Form W-8IMY if you are acting as
                                      an intermediary with respect to a
                                      withholdable payment, you are a
                                      flow-through entity receiving a
                                      withholdable payment on behalf of your
                                      owners (including a reverse hybrid entity
                                      providing documentation on behalf of its
                                      owners to claim treaty benefits), you are
                                      providing a withholding statement
                                      associated with this form that allocates a
                                      portion of the payment to a chapter 4
                                      withholding rate pool of U.S. payees with
                                      respect to your direct account holders (as
                                      described in Regulations section
                                      1.6049-4(c)(4)), you are providing this
                                      form to an FFI requesting this form to
                                      document your chapter 4 status, or you are
                                      a QI (including a QDD), WP, or WT. If you
                                      are a U.S. branch that does not agree to
                                      be treated as a U.S. person and that does
                                      not make the certification on line 19c,
                                      you should check nonparticipating FFI;
                                      otherwise, leave line 5 blank.
                                    </Typography>

                                    <Typography
                                      style={{
                                        marginTop: "10px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      By checking a box on this line, you are
                                      representing that you qualify for this
                                      classification.
                                    </Typography>

                                    <Link
                                      href="#"
                                      underline="none"
                                      style={{
                                        marginTop: "10px",
                                        fontSize: "16px",
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
                            </div>
                            <div className="row d-flex">
                              <div
                                className="col-12 col-md-12 mt-3"
                                style={{ marginTop: "20px" }}
                              >
                                <Typography
                                  align="left"
                                  className="d-flex w-100 "
                                  style={{ fontSize: "13px" }}
                                >
                                  Select Chapter 4 Status:
                                </Typography>

                                <FormControl className="w-50">
                                  <select
                                    name="chapter4StatusId"
                                    value={values.chapter4StatusId}
                                    onChange={handleChange}
                                    autoComplete="chapter4StatusId"
                                    onBlur={handleBlur}
                                    style={{
                                      padding: " 0 10px",
                                      color: "#121112",
                                      fontStyle: "italic",
                                      height: "36px",
                                    }}
                                  >
                                    {GetChapter4StatusesReducer.GetChapter4StatusesData?.map(
                                      (ele: any) => (
                                        <option key={ele?.id} value={ele?.id}>
                                          {ele?.name}
                                        </option>
                                      )
                                    )}
                                  </select>

                                  <p className="error">
                                    {errors.chapter4StatusId}
                                  </p>
                                </FormControl>
                              </div>

                            </div>
                            {values.chapter4StatusId == 2 || values.chapter4StatusId == 27
                              ? (
                                <>
                                  <div>
                                    <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                      Part XXVI  <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Passive NFFE </span>

                                    </Typography>
                                  </div>
                                  <div className="d-flex mt-3">
                                    <Typography className="mt-2" style={{ marginTop: "5px" }}>
                                      40a
                                    </Typography>
                                    <Typography>
                                      <Checkbox name="isNotFinancialInsititute" checked={values.isNotFinancialInsititute} value={values.isNotFinancialInsititute}
                                        onChange={handleChange} />
                                    </Typography>
                                    <Typography className="mt-2">
                                      I certify that the entity identified in Part I
                                    </Typography>
                                  </div>
                                  <div>
                                    <Paper style={{ padding: "10px", backgroundColor: "#dbd7d7", fontSize: "13px" }}>
                                      is a foreign entity that is not a financial institution (other than an investment entity organized in a possession of the United States) and is not certifying its status as a publicly traded NFFE (or affiliate), excepted territory NFFE, active NFFE, direct reporting NFFE, or sponsored direct reporting NFFE.
                                    </Paper>
                                  </div>
                                  <div className="mt-3">
                                    <Typography style={{ color: "grey", fontSize: "19px" }}>
                                      Check box 40b or 40c, whichever applies:
                                    </Typography>
                                  </div>
                                  <div className="d-flex mt-3">
                                    <Typography className="mt-2" style={{ marginTop: "13px" }}>
                                      b
                                    </Typography>
                                    <Typography>
                                      <Checkbox name="isNoSubstantialUSOwner" checked={values.isNoSubstantialUSOwner} value={values.isNoSubstantialUSOwner}
                                        onChange={(e) => { handleChange(e); setTimeout(() => { setFieldValue("isNFFE", false) }, 100) }} />
                                    </Typography>
                                    <Typography className="mt-2">
                                      I further certify that
                                    </Typography>
                                  </div>
                                  <div>
                                    <Paper style={{ padding: "10px", backgroundColor: "#dbd7d7", fontSize: "13px" }}>
                                      the entity identified in Part I has no substantial U.S. owners (or, if applicable, no controlling U.S. persons), or
                                    </Paper>
                                  </div>

                                  <div className="d-flex mt-3">
                                    <Typography className="mt-2" style={{ marginTop: "5px" }}>
                                      c
                                    </Typography>
                                    <Typography>
                                      <Checkbox name="isNFFE" checked={values.isNFFE} value={values.isNFFE}
                                        onChange={(e) => { handleChange(e); setTimeout(() => { setFieldValue("isNoSubstantialUSOwner", false) }, 100) }} />
                                    </Typography>
                                    <Typography className="mt-2">
                                      I certify that the entity identified in Part I
                                    </Typography>
                                  </div>

                                  <Paper style={{ padding: "10px", backgroundColor: "#dbd7d7", fontSize: "13px" }}>
                                    has provided the name, address, and TIN of each substantial U.S. owner (or, if applicable, controlling U.S. person) of the NFFE in Part XXIX.
                                  </Paper>

                                  {values.isNFFE ? (<SubstantialUsPassiveNFE formTypeId={FormTypeId.W8EXP} submitPassiveNFEData={submitPassiveNFEData} />) : ""}
                                </>) : ""}


                            {values.chapter4StatusId == 6 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XXV <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Active NFFE </span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    39
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify39" checked={values.isCertify39} value={values.isCertify39} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that :
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    The entity identified in Part I is a foreign entity that is not a financial institution;
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Less than 50% of such entity's gross income for the preceding calendar year is passive income; <span style={{ fontWeight: "bold" }}>
                                      and</span>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Less than 50% of the assets held by such entity are assets that produce or are held for the production of passive income (calculated as a weighted average of the percentage of passive assets measured quarterly) (see instructions for the definition of passive income)
                                  </Typography>
                                </Paper>
                              </>

                            ) : ""}


                            {values.chapter4StatusId == 7 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part IX  <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Certain Investment Entities that Do Not Maintain Financial Accounts </span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    39
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify39" checked={values.isCertify39} value={values.isCertify39} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    Is a financial institution solely because it is an investment entity described in <Link style={{ textDecorationLine: "none" }}>
                                      1.1471-5(e)(4)(i)(A);</Link>,
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2" >

                                    <span style={{ fontWeight: "bold" }}>
                                      and</span> Does not maintain financial accounts.
                                  </Typography>

                                </Paper>
                              </>

                            ) : ""}


                            {values.chapter4StatusId == 8 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part VI <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Certified Deemed-Compliant FFI with Only Low-Value Accounts</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    39
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify39" checked={values.isCertify39} value={values.isCertify39} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the FFI identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    Is not engaged primarily in the business of investing, reinvesting, or trading in securities, partnership interests, commodities, notional principal contracts, insurance or annuity contracts, or any interest (including a futures or forward contract or option) in such security, partnership interest, commodity, notional principal contract, insurance contract or annuity contract;
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    No financial account maintained by the FFI or any member of its expanded affiliated group, if any, has a balance or value in excess of $50,000 (as determined after applying applicable account aggregation rules); <span style={{ fontWeight: "bold" }}>
                                      and</span>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Neither the FFI nor the entire expanded affiliated group, if any, of the FFI, have more than $50 million in assets on its consolidated or combined balance sheet as of the end of its most recent accounting year.
                                  </Typography>
                                </Paper>
                              </>

                            ) : ""}

                            {values.chapter4StatusId == 9 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part VIII  <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Certified Deemed-Compliant Limited Life Debt Investment Entity</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    22
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify22Entity" checked={values.isCertify22Entity} value={values.isCertify22Entity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    Was in existence as of January 17, 2013;
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Issued all classes of its debt or equity interests to investors on or before January 17, 2013, pursuant to a trust indenture or similar agreement; <span style={{ fontWeight: "bold" }}>
                                      and</span>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Is certified deemed-compliant because it satisfies the requirements to be treated as a limited life debt investment entity (such as the restrictions with respect to its assets and other requirements under
                                    Regulations section 1.1471-5(f)(2)(iv)
                                  </Typography>
                                </Paper>
                              </>

                            ) : ""}

                            {values.chapter4StatusId == 10 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part V<span style={{ fontWeight: "bold", marginLeft: "10px" }}>Certified Deemed-Compliant Nonregistering Local Bank</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    18
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify18FFI" checked={values.isCertify18FFI} value={values.isCertify18FFI} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the FFI identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    Operates and is licensed solely as a bank or credit union (or similar cooperative credit organization operated without profit) in its country of incorporation or organization;
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Engages primarily in the business of receiving deposits from and making loans to, with respect to a bank, retail customers unrelated to such bank and, with respect to a credit union or similar cooperative credit organization, members, provided that no member has a greater than five percent interest in such credit union or cooperative credit organization;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Does not solicit account holders outside its country of organization;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Has no fixed place of business outside such country (for this purpose, a fixed place of business does not include a location that is not advertised to the public and from which the FFI performs solely administrative support functions);
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Has no more than $175 million in assets on its balance sheet and, if it is a member of an expanded affiliated group, the group has no more than $500 million in total assets on its consolidated or combined balance sheets; <span style={{ fontWeight: "bold" }}>
                                      and</span>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Does not have any member of its expanded affiliated group that is a foreign financial institution, other than a foreign financial institution that is incorporated or organized in the same country as the FFI identified in Part I and that meets the requirements set forth in this Part V.
                                  </Typography>
                                </Paper>
                              </>

                            ) : ""}

                            {values.chapter4StatusId == 11 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part VII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Certified Deemed-Compliant Sponsored, Closely Held Investment Vehicle</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    21
                                  </Typography>
                                  <Typography>
                                    <Checkbox />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    Is an FFI solely because it is an investment entity described in <Link style={{ textDecorationLine: "none" }}>
                                      Regulations section 1.1471-5(e)(4)
                                    </Link>
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Is not a QI, WP, or WT;
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Will have all of its due diligence, withholding, and reporting responsibilities (determined as if the FFI were a participating FFI) fulfilled by the sponsoring entity on line 20;<span style={{ fontWeight: "bold" }}>
                                      and</span>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    20 or fewer individuals own all of the debt and equity interests in the entity (disregarding debt interests owned by U.S. financial institutions, participating FFIs, registered deemed-compliant FFIs, and certified deemed-compliant FFIs and equity interests owned by an entity if that entity owns 100% of the equity interests in the FFI and is itself a sponsored FFI).
                                  </Typography>
                                </Paper>
                              </>

                            ) : ""}
                            {values.chapter4StatusId == 13 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XVI <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Entity Wholly Owned by Exempt Beneficial Owners</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    30
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify30Entity" value={values.isCertify30Entity} checked={values.isCertify30Entity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    Is an FFI solely because it is an investment entity;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Each direct holder of an equity interest in the investment entity is an exempt beneficial owner described in  <Link style={{ textDecorationLine: "none" }}>
                                      Regulations section 1.1471-6
                                    </Link>
                                    <span style={{ marginLeft: "5px" }}>
                                      or in an applicable Model 1 or Model 2 IGA;
                                    </span>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Each direct holder of a debt interest in the investment entity is either a depository institution (with respect to a loan made to such entity) or an exempt beneficial owner described in

                                    <Link style={{ textDecorationLine: "none", marginLeft: "5px" }}>
                                      Regulations section 1.1471-6

                                    </Link>
                                    <span style={{ marginLeft: "5px" }} >
                                      or an applicable Model 1 or Model 2 IGA.

                                    </span>
                                  </Typography>




                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Has provided an owner reporting statement that contains the name, address, TIN (if any), chapter 4 status, and a description of the type of documentation provided to the withholding agent for every person that owns a debt interest constituting a financial account or direct equity interest in the entity;<span style={{ fontWeight: "bold" }}>
                                      and</span>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Has provided documentation establishing that every owner of the entity is an entity described in

                                    <Link style={{ textDecorationLine: "none", marginLeft: "5px" }}>
                                      Regulations section 1.1471-6(b), (c), (d), (e), (f),

                                    </Link>

                                    and/or
                                    <Link style={{ textDecorationLine: "none", marginLeft: "5px" }}>
                                      (g)

                                    </Link>
                                    ,


                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    without regard to whether such owners are beneficial owners.
                                  </Typography>

                                </Paper>
                              </>

                            ) : ""}
                            {values.chapter4StatusId == 14 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XXVII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Excepted Inter-Affiliate FFI</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    41
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify41Entity" value={values.isCertify41Entity} checked={values.isCertify41Entity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    Is a member of an expanded affiliated group;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Does not maintain financial accounts (other than accounts maintained for members of its expanded affiliated group);
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Does not make withholdable payments to any person other than to members of its expanded affiliated group that are not limited FFIs or limited branches;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Does not hold an account (other than a depository accounts in the country in which the entity is operating to pay for expenses) with or receive payments from any withholding agent other than a member of its expanded affiliated group; <span style={{ fontWeight: "bold" }}>
                                      and</span>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Has not agreed to report under

                                    <Link style={{ textDecorationLine: "none", marginLeft: "5px" }}>
                                      Regulations section 1.1471-4(d)(2)(ii)(C)

                                    </Link>

                                    <span style={{ marginLeft: "5px" }}>
                                      or otherwise act as an agent for chapter 4 purposes on behalf of any financial institution, including a member of its expanded affiliated group.
                                    </span>



                                  </Typography>



                                </Paper>
                              </>

                            ) : ""}
                            {values.chapter4StatusId == 15 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XX <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Excepted Nonfinancial Entity in Liquidation or Bankruptcy</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    34
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify34Entity" value={values.isCertify34Entity} checked={values.isCertify34Entity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    Filed a plan of liquidation, filed a plan of reorganization, or filed for bankruptcy on:
                                  </Typography>
                                  <Input className="mb-4 date" name="planReorganization" type="date" value={values.planReorganization} onChange={handleChange} />
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    During the past 5 years has not been engaged in business as a financial institution or acted as a passive NFFE;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Is either liquidating or emerging from a reorganization or bankruptcy with the intent to continue or recommence operations as a nonfinancial entity;<span style={{ fontWeight: "bold" }}>
                                      and</span>

                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Has, or will provide, documentary evidence such as a bankruptcy filing or other public documentation that supports its claim if it remains in bankruptcy or liquidation for more than three years.
                                  </Typography>


                                </Paper>
                              </>

                            ) : ""}
                            {values.chapter4StatusId == 16 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XVIII <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Excepted Nonfinancial Group Entity</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    32
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify32Entity" value={values.isCertify32Entity} checked={values.isCertify32Entity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    Is a holding company, treasury center, or captive finance company and substantially all of the entity's activities are functions described in

                                    <Link style={{ textDecorationLine: "none", marginLeft: "5px" }}>
                                      Regulations section 1.1471-5(e)(5)(i)(C)
                                    </Link>
                                    <span style={{ marginLeft: "5px" }}>
                                      through
                                    </span>
                                    <Link style={{ textDecorationLine: "none", marginLeft: "5px" }}>
                                      (E);
                                    </Link>
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Is a member of a nonfinancial group described in
                                    <Link style={{ textDecorationLine: "none", marginLeft: "5px" }}>
                                      Regulations section 1.1471-5(e)(5)(i)(B);
                                    </Link>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Is not a depository or custodial institution (other than for members of the entity's expanded affiliated group);<span style={{ fontWeight: "bold" }}>
                                      and</span>

                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Does not function (or hold itself out) as an investment fund, such as a private equity fund, venture capital fund, leveraged buyout fund, or any investment vehicle with an investment strategy to acquire or fund companies and then hold interests in those companies as capital assets for investment purposes.
                                  </Typography>


                                </Paper>
                              </>

                            ) : ""}

                            {values.chapter4StatusId == 17 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XIX <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Excepted Nonfinancial Start-Up Company</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    33
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify33Entity" value={values.isCertify33Entity} checked={values.isCertify33Entity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      Was formed on (or, in the case of a new line of business, the date of board resolution approving the new line of business):
                                    </>
                                  </Typography>

                                  <Typography className="my-2">
                                    <Input className="mb-4 date" name="priorDate" type="date" value={values.priorDate} onChange={handleChange} />
                                    <span>(date must be less than 24 months prior to date of payment);</span>
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Is not yet operating a business and has no prior operating history or is investing capital in assets with the intent to operate a new line of business other than that of a financial institution or passive NFFE;

                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Is investing capital into assets with the intent to operate a business other than that of a financial institution;<span style={{ fontWeight: "bold" }}>
                                      and</span>

                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">

                                    Does not function (or hold itself out) as an investment fund, such as a private equity fund, venture capital fund, leveraged buyout fund, or any investment vehicle whose purpose is to acquire or fund companies and then hold interests in those companies as capital assets for investment purposes.
                                  </Typography>


                                </Paper>
                              </>

                            ) : ""}
                            {values.chapter4StatusId == 18 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XXIV <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Excepted Territory NFFE</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    38
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify38Entity" value={values.isCertify38Entity} checked={values.isCertify38Entity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that :
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      The entity identified in Part I is an entity that is organized in a possession of the United States;

                                    </>
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    The entity identified in Part I:

                                  </Typography>
                                  <Typography>
                                    (i) Does not accept deposits in the ordinary course of a banking or similar business;

                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    (iI) Does not hold, as a substantial portion of its business, financial assets for the account of others; or;


                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">

                                    (iii) Is not an insurance company (or the holding company of an insurance company) that issues or is obligated to make payments with respect to a financial account; and
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">

                                    All of the owners of the entity identified in Part I are bona fide residents of the possession in which the NFFE was organized or incorporated.
                                  </Typography>


                                </Paper>
                              </>

                            ) : ""}
                            {values.chapter4StatusId == 20 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XIII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Foreign Government, Government of a U.S. Possession, or Foreign Central Bank of Issue</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    27
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify27Entity" value={values.isCertify27Entity} checked={values.isCertify27Entity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that :
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      the entity identified in Part I is the beneficial owner of the payment, and is not engaged in commercial financial activities of a type engaged in by an insurance company, custodial institution, or depository institution with respect to the payments, accounts, or obligations for which this form is submitted (except as permitted in
                                    </>
                                    <Link style={{ textDecorationLine: "none", marginLeft: "5px" }}>
                                      Regulations section 1.1471-6(h)(2)

                                    </Link>
                                    )
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Less than 50% of such entity's gross income for the preceding calendar year is passive income; <span style={{ fontWeight: "bold" }}>
                                      and</span>

                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Less than 50% of the assets held by such entity are assets that produce or are held for the production of passive income (calculated as a weighted average of the percentage of passive assets measured quarterly) (see instructions for the definition of passive income)

                                  </Typography>



                                </Paper>
                              </>

                            ) : ""}
                            {values.chapter4StatusId == 21 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XIII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Foreign Government, Government of a U.S. Possession, or Foreign Central Bank of Issue</span>

                                </Typography>
                                <span>
                                  Check box 28a or 28b, whichever applies:
                                </span>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    28 a
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify28aEntity" value={values.isCertify28aEntity} checked={values.isCertify28aEntity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that :
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      the entity identified in Part I is an international organization described in section 7701(a)(18).
                                    </>

                                  </Typography>
                                </Paper>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    b
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify28bEntity" value={values.isCertify28bEntity} checked={values.isCertify28bEntity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I :
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    Is comprised primarily of foreign governments;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Is recognized as an intergovernmental or supranational organization under a foreign law similar to the International Organizations Immunities Act or that has in effect a headquarters agreement with a foreign government;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    The benefit of the entity's income does not inure to any private person;<span style={{ fontWeight: "bold" }}>
                                      and</span>

                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Is the beneficial owner of the payment and is not engaged in commercial financial activities of a type engaged in by an insurance company, custodial institution, or depository institution with respect to the payments, accounts, or obligations for which this form is submitted (except as permitted in
                                  </Typography>
                                  <Link style={{ textDecorationLine: "none", marginLeft: "5px" }}>
                                    Regulations section 1.1471-6(h)(2)

                                  </Link>

                                  ).


                                </Paper>
                              </>

                            ) : ""}
                            {values.chapter4StatusId == 23 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XXII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Non-profit Organization</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    36
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify36Entity" value={values.isCertify36Entity} checked={values.isCertify36Entity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I :
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      is a non-profit organization that meets the following requirements:

                                    </>
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      The entity is established and maintained in its country of residence exclusively for religious, charitable, scientific, artistic, cultural or educational purposes;

                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    The entity is exempt from income tax in its country of residence;


                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    The entity has no shareholders or members who have a proprietary or beneficial interest in its income or assets;

                                    <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  </Typography>
                                  <Typography className="my-2">
                                    Neither the applicable laws of the entity's country of residence nor the entity's formation documents permit any income or assets of the entity to be distributed to, or applied for the benefit of, a private person or non-charitable entity other than pursuant to the conduct of the entity's charitable activities or as payment of reasonable compensation for services rendered or payment representing the fair market value of property which the entity has purchased; <span style={{ fontWeight: "bold" }}>
                                      and</span>



                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    The applicable laws of the entity's country of residence or the entity's formation documents require that, upon the entity's liquidation or dissolution, all of its assets be distributed to an entity that is a foreign government, an integral part of a foreign government, a controlled entity of a foreign government, or another organization that is described in this Part XXII or escheats to the government of the entity's country of residence or any political subdivision thereof.


                                  </Typography>





                                </Paper>
                              </>

                            ) : ""}

                            {values.chapter4StatusId == 24 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Nonreporting IGA FFI</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    26
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify26Entity" value={values.isCertify26Entity} checked={values.isCertify26Entity} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I :
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      Meets the requirements to be considered a nonreporting financial institution pursuant to an applicable IGA between the United States and
                                    </>
                                  </Typography>
                                  <FormControl className="my-2">
                                    <select
                                      style={{
                                        border: " 1px solid #d9d9d9 ",
                                        padding: " 0 10px",
                                        color: "#7e7e7e",
                                        fontStyle: "italic",
                                        height: "50px",
                                        width: "100%",
                                      }}
                                      name="iGAbetweenUnitedStates"
                                      defaultValue={1}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    >
                                      <option value={1}>---select---</option>
                                      <option value={257}>United Kingdom</option>
                                      <option value={258}>United States</option>
                                      <option value="">---</option>
                                      {getCountriesReducer.allCountriesData?.map((ele: any) => (
                                        <option key={ele?.id} value={ele?.id}>{ele?.name}</option>
                                      ))}
                                    </select>
                                  </FormControl>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      The applicable IGA is a <span>
                                        <select
                                          style={{
                                            border: " 1px solid #d9d9d9 ",
                                            padding: " 0 10px",
                                            color: "#7e7e7e",
                                            fontStyle: "italic",
                                            height: "50px",
                                            width: "40%",
                                          }}
                                          name="iGA"
                                          value={values.iGA}
                                          defaultValue={""}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        >
                                          <option value={""} >-Select-</option>
                                          <option value={"Model 1 IGA"}>Model 1 IGA</option>
                                          <option value={"Model 2 IGA"}>Model 2 IGA</option>
                                        </select>
                                      </span>
                                      <span>; and <span style={{ color: 'red' }}>
                                        *</span></span>

                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    Is treated as a <span style={{ color: 'red' }}> *
                                    </span>
                                    <span>
                                      <select
                                        style={{
                                          border: " 1px solid #d9d9d9 ",
                                          padding: " 0 10px",
                                          color: "#121112",
                                          fontStyle: "italic",
                                          height: "50px",
                                          width: "40%",
                                        }}
                                        name="istreated"
                                        value={values.istreated}
                                        defaultValue={0}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      >
                                        <option value={0}>-Select-</option>
                                        <option value={1}>Deemed Compliant FFI</option>
                                        <option value={2}>Exempt Beneficial Owner</option>
                                        <option value={3}>Exempt Product</option>
                                        <option value={4}>Other</option>
                                      </select>
                                    </span>
                                    <span style={{ marginLeft: "6px" }}>
                                      <TextField
                                        style={{
                                          backgroundColor: "#fff",
                                          color: "#121112",
                                          fontStyle: "italic",
                                          height: "50px",
                                          width: "40%",
                                        }}
                                        name="otherTreated"
                                        placeholder="---Enter the specific entity type---"
                                        onChange={handleChange}
                                        value={values.otherTreated}
                                      />
                                      <span style={{ color: "red", verticalAlign: "super" }}>
                                        *
                                      </span>
                                    </span>
                                    <Typography>
                                      under the provisions of the applicable IGA or Treasury regulations (if applicable, see instructions);
                                    </Typography>



                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Are you a trustee or a sponsored entity?
                                    <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  </Typography>
                                  <Typography className="my-2">
                                    Neither the applicable laws of the entity's country of residence nor the entity's formation documents permit any income or assets of the entity to be distributed to, or applied for the benefit of, a private person or non-charitable entity other than pursuant to the conduct of the entity's charitable activities or as payment of reasonable compensation for services rendered or payment representing the fair market value of property which the entity has purchased; <span style={{ fontWeight: "bold" }}>
                                      and</span>



                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    The applicable laws of the entity's country of residence or the entity's formation documents require that, upon the entity's liquidation or dissolution, all of its assets be distributed to an entity that is a foreign government, an integral part of a foreign government, a controlled entity of a foreign government, or another organization that is described in this Part XXII or escheats to the government of the entity's country of residence or any political subdivision thereof.


                                  </Typography>





                                </Paper>
                              </>

                            ) : ""}


                            {values.chapter4StatusId == 32 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XI <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Restricted Distributor</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    25a
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify25aEntityPart1" value={values.isCertify25aEntityPart1} checked={values.isCertify25aEntityPart1} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    (All restricted distributors check here) I certify that: entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      Operates as a distributor with respect to debt or equity interests of the restricted fund with respect to which this form is furnished;
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      Provides investment services to at least 30 customers unrelated to each other and less than half of its customers are related to each other;
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    Is required to perform AML due diligence procedures under the anti-money laundering laws of its country of organization (which is an FATF-compliant jurisdiction);

                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Operates solely in its country of incorporation or organization, has no fixed place of business outside of that country, and has the same country of incorporation or organization as all members of its affiliated group, if any;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    Does not solicit customers outside its country of incorporation or organization;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Has no more than $175 million in total assets under management and no more than $7 million in gross revenue on its income statement for the most recent accounting year;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Is not a member of an expanded affiliated group that has more than $500 million in total assets under management or more than $20 million in gross revenue for its most recent accounting year on a combined or consolidated income statement;<span style={{ fontWeight: "bold" }}>
                                      and</span>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    Does not distribute any debt or securities of the restricted fund to specified U.S. persons, passive NFFEs with one or more substantial U.S. owners, or nonparticipating FFIs.
                                  </Typography>
                                </Paper>
                                <Typography className="my-2">
                                  Check box 25b or 25c, whichever applies:
                                  <br />
                                  I further certify that with respect to all sales of debt or equity interests in the restricted fund with respect to which this form is furnished that are made after December 31, 2011, the entity identified in Part I:
                                </Typography>

                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    b
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="hasBeenBoundBy" value={values.hasBeenBoundBy} checked={values.hasBeenBoundBy} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    Has been bound by
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    a distribution agreement that contained a general prohibition on the sale of debt or securities to U.S. entities and U.S. resident individuals and is currently bound by a distribution agreement that contains a prohibition of the sale of debt or securities to any specified U.S. person, passive NFFE with one or more substantial U.S. owners, or nonparticipating FFI.
                                  </Typography>
                                </Paper>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    c
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="currentBoundBy" value={values.currentBoundBy} checked={values.currentBoundBy} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    Is currently bound by
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    a distribution agreement that contains a prohibition on the sale of debt or securities to any specified U.S. person, passive NFFE with one or more substantial U.S. owners, or nonparticipating FFI and, for all sales made prior to the time that such a restriction was included in its distribution agreement, has reviewed all accounts related to such sales in accordance with the procedures identified in
                                    <br />
                                    <Link style={{ textDecorationLine: "none" }}>
                                      Regulations section 1.1471-4(c)</Link>
                                    <br />
                                    applicable to preexisting accounts and has redeemed or retired any, or caused the restricted fund to transfer the securities to a distributor that is a participating FFI or reporting Model 1 FFI securities which were sold to specified U.S. persons, passive NFFEs with one or more substantial U.S. owners, or nonparticipating FFIs.
                                  </Typography>
                                </Paper>
                              </>
                            ) : ""}
                            {values.chapter4StatusId == 33 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XXVIII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Sponsored Direct Reporting NFFE</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px", marginRight: "10px" }}>
                                    42
                                  </Typography>
                                  <Typography className="mt-2">
                                    Name of sponsoring entity:
                                    <span className="mx-2">
                                      <FormControl>
                                        <TextField
                                          style={{
                                            backgroundColor: "#fff",
                                            fontStyle: "italic",
                                          }}
                                          name="nameSponsoringEntity"
                                          value={values.nameSponsoringEntity}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        // error={Boolean(
                                        //   touched.subParagraphArticle &&
                                        //     errors.subParagraphArticle
                                        // )}
                                        />
                                        {/* <p className="error">
                                {errors.subParagraphArticle}
                              </p> */}
                                      </FormControl>
                                    </span>
                                  </Typography>
                                </div>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    43
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify43" value={values.isCertify43} checked={values.isCertify43} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that:
                                  </Typography>
                                </div>
                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

                                  <Typography className="my-2">
                                    <>
                                      The entity identified in Part I is a direct reporting NFFE that is sponsored by the entity identified in line 42.
                                    </>
                                  </Typography>









                                </Paper>


                              </>


                            ) : ""}
                            {values.chapter4StatusId == 34 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part IV <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Sponsored FFI</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px", marginRight: "10px" }}>
                                    16
                                  </Typography>
                                  <Typography className="mt-2">
                                    Name of sponsoring entity:
                                    <span className="mx-2">
                                      <FormControl>
                                        <TextField
                                          style={{
                                            backgroundColor: "#fff",
                                            fontStyle: "italic",
                                          }}
                                          name="nameSponsoringEntity16"
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.nameSponsoringEntity16}
                                        />

                                      </FormControl>
                                    </span>
                                  </Typography>
                                </div>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    17
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify17a" value={values.isCertify17a} checked={values.isCertify17a} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      Is an investment entity:
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      Is not a QI, WP(except to the extent permitted in the withholding foreign partnership agreement), or WT; <span style={{ fontWeight: "bold" }}>
                                        and</span>
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      Has agreed with the entity identified above (that is not a nonparticipating FFI) to act as the sponsoring entity for this entity.
                                    </>
                                  </Typography>
                                </Paper>
                                <div className="d-flex mt-3">
                                  <Typography>
                                    <Checkbox name="isCertify17b" value={values.isCertify17b} checked={values.isCertify17b} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I:
                                  </Typography>
                                </div>
                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      Is a controlled foreign corporation as defined in section 957(a);
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      Is not a QI, WP, or WT;
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    <>
                                      Is wholly owned, directly or indirectly,by the U.S. financial institution identified above that agrees to act as the sponsoring entity for this entity;<span style={{ fontWeight: "bold" }}>
                                        and</span>
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      Shares a common electronic account system with the sponsoring entity (identified above) that enables the sponsoring entity to identify all account holders and payees of the entity and to access all account and customer information maintained by the entity including, but not limited to, customer identification information, customer documentation, account balance, and all payments made to account holders or payees.
                                    </>
                                  </Typography>

                                </Paper>
                              </>


                            ) : ""}
                            {values.chapter4StatusId == 35 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XVII <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Territory Financial Institution</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    39
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify39" checked={values.isCertify39} value={values.isCertify39} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that:

                                  </Typography>
                                </div>

                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      I certify that the entity identified in Part I is a financial institution (other than an investment entity) that is incorporated or organized under the laws of a possession of the United States.
                                    </>
                                  </Typography>
                                </Paper>
                              </>


                            ) : ""}
                            {values.chapter4StatusId == 36 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XXI <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  501(c) Organization</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    35
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify35" value={values.isCertify35} checked={values.isCertify35} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in part I is a 501(c) organization that :
                                  </Typography>
                                </div>
                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      Has been issued a determination letter from the IRS that is currently in effect concluding that the payee is a section 501(c) organization that is dated:
                                      <br />
                                      <Input className="mb-4 date" type="date" name="payeesection501" value={values.payeesection501} onChange={handleChange} />
                                      <Typography className="my-2">
                                        <>
                                          <span style={{ fontWeight: "bold" }}>
                                            ; or</span>
                                        </>
                                      </Typography>
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      Has provided a copy of an opinion from U.S. counsel certifying that the payee is a section 501(c) organization (without regard to whether the payee is a foreign private foundation).
                                    </>
                                  </Typography>
                                </Paper>
                              </>
                            ) : ""}
                            {values.chapter4StatusId == 25 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part X <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Owner-Documented FFI</span>


                                </Typography>
                                <Typography className="mt-2">
                                  Note: This status only applies if the U.S. financial institution or participating FFI to which this form is given has agreed that it will treat the FFI as an owner-documented FFI (see instructions for eligibility requirements). In addition, the FFI must make the certifications below.
                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    24a
                                    <span>
                                      <Tooltip
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                        title={
                                          <>
                                            <Typography color="inherit">
                                              TT-196 W-8BEN-E-Q24a
                                            </Typography>

                                          </>
                                        }
                                      >
                                        <Info
                                          style={{
                                            color: "#ffc107",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            verticalAlign: "super",
                                          }}
                                        />
                                      </Tooltip>
                                    </span>

                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify24aFFIPart1" value={values.isCertify24aFFIPart1} checked={values.isCertify24aFFIPart1} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    (All owner Documented FFIs check here) I certify that the FFI identified in Part I:
                                  </Typography>
                                </div>

                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

                                  <Typography className="my-2">
                                    <>
                                      Does not act as an intermediary;
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      Does not accept deposits in the ordinary course of a banking or similar business;

                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    <>
                                      Does not hold, as a substantial portion of its business, financial assets for the account of others;

                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    <>
                                      Is not an insurance company (or the holding company of an insurance company) that issues or is obligated to make payments with respect to a financial account;
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    <>
                                      Is not owned by or in an expanded affiliated group with an entity that accepts deposits in the ordinary course of a banking or similar business, holds, as a substantial portion of its business, financial assets for the account of others, or is an insurance company (or the holding company of an insurance company) that issues or is obligated to make payments with respect to a financial account;
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    <>
                                      Does not maintain a financial account for any nonparticipating FFI. <span style={{ fontWeight: "bold" }}>
                                        and</span>

                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    <>
                                      Does not have any specified U.S. persons that own an equity inerest or debt interest (other than a debt interest that is not a financial account or that has a balance or value not exceeding $50,000) in lthe FFI other than those identified on the FFI owner reporting statement.

                                    </>
                                  </Typography>
                                </Paper>
                                Check box 24b or 24c, whichever applies:

                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    b
                                    <span>
                                      <Tooltip
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                        title={
                                          <>
                                            <Typography color="inherit">
                                              TT-197 W-8BEN-E-Q24b
                                            </Typography>

                                          </>
                                        }
                                      >
                                        <Info
                                          style={{
                                            color: "#ffc107",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            verticalAlign: "super",
                                          }}
                                        />
                                      </Tooltip>
                                    </span>

                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify24bFFIPart1" value={values.isCertify24bFFIPart1} checked={values.isCertify24bFFIPart1} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the FFI indentified in Part I:
                                  </Typography>
                                </div>
                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

                                  <Typography className="my-2">
                                    <>
                                      Has provided, or will provide, an FFI owner reporting statement that contains:
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      The name, address, TIN (if any), chapter 4 status, and type of documentation provided (if required) of every individual and specified U.S. person that owns a direct or indirect equity interest in the owner-documented FFI (looking through all entities other than specified U.S. persons);

                                    </>
                                  </Typography>


                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    <>
                                      The name, address, TIN (if any), chapter 4 status, and type of documentation provided (if required) of every individual and specified U.S. person that owns a debt interest in the owner-documented FFI (including any indirect debt interest, which includes debt interests in any entity that directly or indirectly owns the payee or any direct or indirect equity interest in a debt holder of the payee) that constitutes a financial account in excess of $50,000 (disregarding all such debt interests owned by participating FFIs, registered deemed-compliant FFIs, certified deemed-compliant FFIs, excepted NFFEs, exempt beneficial owners, or U.S. persons other than specified U.S. persons); <span style={{ fontWeight: "bold" }}>
                                        and</span>

                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    <>
                                      Any additional information the withholding agent requests in order to fulfill its obligations with respect to the entity.

                                    </>
                                  </Typography>
                                </Paper>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    c
                                    <span>
                                      <Tooltip
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                        title={
                                          <>
                                            <Typography color="inherit">
                                              TT-198 W-8BEN-E-Q24c
                                            </Typography>

                                          </>
                                        }
                                      >
                                        <Info
                                          style={{
                                            color: "#ffc107",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            verticalAlign: "super",
                                          }}
                                        />
                                      </Tooltip>
                                    </span>

                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify24cFFIPart1" value={values.isCertify24cFFIPart1} checked={values.isCertify24cFFIPart1} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the FFI indentified in Part I:
                                  </Typography>
                                </div>
                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

                                  <Typography className="my-2">
                                    <>
                                      has provided, or will provide, an auditor's letter, signed within 4 years of the date of payment, from an independent accounting firm or legal representative with a location in the United States stating that the firm or representative has reviewed the FFI's documentation with respect to all of its owners and debt holders identified in
                                      <br />
                                      <Link style={{ textDecorationLine: "none" }}>
                                        Regulations section 1.1471-3(d)(6)(iv)(A)(2) </Link>
                                      <br />
                                      ,
                                      and that the FFI meets all the requirements to be an owner-documented FFI. The FFI identified in Part I has also provided, or will provide, an FFI owner reporting statement of its owners that are specified U.S. persons and Form(s) W-9, with applicable waivers.
                                    </>
                                  </Typography>

                                </Paper>
                                <span>
                                  Check box 24d if applicable(optional, see instructions):
                                </span>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    d
                                    <span>
                                      <Tooltip
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                        title={
                                          <>
                                            <Typography color="inherit">
                                              TT-199 W-8BEN-E-Q24d                                        </Typography>

                                          </>
                                        }
                                      >
                                        <Info
                                          style={{
                                            color: "#ffc107",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            verticalAlign: "super",
                                          }}
                                        />
                                      </Tooltip>
                                    </span>
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify24dFFIPart1" value={values.isCertify24dFFIPart1} checked={values.isCertify24dFFIPart1} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that :
                                  </Typography>
                                </div>
                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

                                  <Typography className="my-2">
                                    <>
                                      the entity identified in line 1 is a trust that does not have any contingent beneficiaries or designated classes with unidentified beneficiaries.
                                    </>
                                  </Typography>

                                </Paper>

                              </>


                            ) : ""}
                            {values.chapter4StatusId == 28 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XXIII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>   Publicly Traded NFFE or NFFE Affiliate of a Publicly Traded Corporation</span>


                                </Typography>
                                <Typography className="mt-2">
                                  Check box 37a or 37b, whichever applies:
                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    37a
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify37a" value={values.isCertify37a} checked={values.isCertify37a} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that:
                                  </Typography>
                                </div>

                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2">
                                    <>
                                      The entity identified in Part I is a foreign corporation that is not a financial institution;<span style={{ fontWeight: "bold" }}>
                                        and</span>
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      The stock of such corporation is regularly traded on one or more established securities markets, including
                                      <FormControl className="w-100">
                                        <TextField
                                          className="col-md-6 col-12"
                                          style={{
                                            backgroundColor: "#fff",
                                            fontStyle: "italic",
                                          }}
                                          name="aEntityStockMarket"
                                          value={values.aEntityStockMarket}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        />

                                      </FormControl>
                                      (name one securities exchange upon which the stock is regularly traded)

                                    </>
                                  </Typography>
                                </Paper>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    b
                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isCertify37b" value={values.isCertify37b} checked={values.isCertify37b} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that:
                                  </Typography>
                                </div>

                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

                                  <Typography className="my-2">
                                    <>
                                      The entity identified in Part I is a foreign corporation that is not a financial institution;

                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      The entity identified in Part I is a member of the same expanded affiliated group as an entity the stock of which is regularly traded on an established securities market;

                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2">
                                    <>
                                      <Typography className="my-2">
                                        <>
                                          The name of the entity, the stock of which is regularly traded on an established securities market, is
                                          <FormControl className="w-100">
                                            <TextField
                                              className="col-md-6 col-12"
                                              style={{
                                                backgroundColor: "#fff",


                                                fontStyle: "italic",

                                              }}
                                              name="bEntityStockMarket"
                                              value={values.bEntityStockMarket}
                                              onBlur={handleBlur}
                                              onChange={handleChange}

                                            />

                                          </FormControl>


                                        </>
                                      </Typography><span style={{ fontWeight: "bold" }}>
                                        ;and</span>

                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    <>
                                      The name of the securities market on which the stock is regularly traded is
                                      <FormControl className="w-100">
                                        <TextField
                                          className="col-md-12 col-12"
                                          style={{
                                            backgroundColor: "#fff",


                                            fontStyle: "italic",

                                          }}
                                          name="namesecuritiesmarket"
                                          value={values.namesecuritiesmarket}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        />

                                      </FormControl>

                                    </>
                                  </Typography>
                                </Paper>


                              </>


                            ) : ""}
                          </Typography>

                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "80px",
                          }}
                        >
                          {/* <Button
                            variant="contained"
                            style={{ color: "white" }}
                            onClick={() => {
                              submitForm().then((data) => {
                                const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                                const urlValue = window.location.pathname.substring(1);
                                dispatch(postW8BEN_EForm(
                                  {
                                    ...prevStepData,
                                    stepName: `/${urlValue}`
                                  }
                                  , () => { }))
                                history(GlobalValues.basePageRoute)
                              }).catch((err) => {
                                console.log(err);
                              })
                            }}

                          >
                            SAVE & EXIT
                          </Button> */}
                          <SaveAndExit Callback={() => {
                            submitForm().then((data) => {
                              const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                              const urlValue = window.location.pathname.substring(1);
                              dispatch(postW8EXPForm(
                                {
                                  ...prevStepData,
                                  stepName: `/${urlValue}`
                                }
                                , () => { }))
                              history(GlobalValues.basePageRoute)
                            }).catch((err) => {
                              console.log(err);
                            })
                          }} formTypeId={FormTypeId.W8EXP} />
                          <Button
                            //type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            onClick={viewPdf}
                            style={{ color: "white", marginLeft: "15px" }}
                          >
                            View Form
                          </Button>
                          {values.chapter4StatusId ? (<Button
                            disabled={!isValid}
                            // type="submit"
                            onClick={() => {
                              submitForm().then((data) => {
                                history(
                                  "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp"
                                );
                              }).catch((err) => {
                                console.log(err);
                              })
                            }}
                            variant="contained"
                            style={{ color: "white", marginLeft: "15px" }}
                          >
                            Continue
                          </Button>) :
                            <Button
                              disabled
                              onClick={() => {
                                //history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/US_Tin_BenE")
                              }}
                              variant="contained"
                              style={{ color: "white", marginLeft: "15px" }}
                            >
                              Continue
                            </Button>
                          }
                        </div>
                        <Typography
                          align="center"
                          style={{
                            color: "#adadac",
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
                              history("/Exp/Tax_Purpose_Exp");
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
