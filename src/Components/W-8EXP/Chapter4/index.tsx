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
import { GetExpPdf } from "../../../Redux/Actions/PfdActions";
import Redirect from "../../../Router/RouterSkip";
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
    chapter4StatusId: 1,
    isNotFinancialInsititute: false,
    isNoSubstantialUSOwner: false,
    isNFFE: false,
    isSection114716: false,
    isRegulationSection114716: false,
    isNonReportingIGAFFI: false,
    iGAUSCountryId: 0,
    treatedAsId: 0,
    specifyEntity: "",
    gIINNumber: "",
    nameSponsoringEntity: "",
    isNFFESponsored: false,
    isFinancialLawUS: false,
    isSection501NotInsuranceCompany: false,
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
  useEffect(() => {
    document.title = "Chapter IV"
  }, [])

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
    dispatch(GetChapter4Statuses(FormTypeId.W8EXP));
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
            <div className="viewform" onClick={() => {
              dispatch(GetExpPdf(authDetails?.accountHolderId));
            }}>View Form</div>
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
        <div className="row w-100">
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
                  validateOnMount={true}
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
                            </div>
                            <div className="row d-flex" >
                              <div
                                className="col-12 col-md-12 mt-3"
                                style={{ marginTop: "20px", marginBottom: "30px" }}
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
                                    <option value={-1}>----------------------Plese select ---------------------------</option>
                                    <option value={2}>Passive NFFE</option>
                                    <option value={3}>Reporting Model 1 FFI</option>
                                    <option value={4}>Reporting Model 2 FFI</option>
                                    {GetChapter4StatusesReducer.GetChapter4StatusesData?.map(
                                      (ele: any) => (
                                        <option key={ele?.id} value={ele?.id}>
                                          {ele?.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </FormControl>
                              </div>

                            </div>
                            {values.chapter4StatusId == 2
                              ? (
                                <>
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr", border: "1px solid black" }}>
                                    <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                      Part III</Typography>
                                    <Typography>
                                      <span style={{ marginLeft: "10px", backgroundColor: "white" }}>Qualification Statement for Chapter 4 Status (if required) </span>
                                    </Typography>


                                  </div>
                                  <div className="d-flex mt-3">
                                    <Typography className="mt-2" style={{ marginTop: "5px" }}>
                                      21 <span style={{ marginLeft: "10px", fontWeight: "bold" }}>For a passive NFFE: </span>
                                      <span>
                                        <Tooltip
                                          style={{
                                            backgroundColor: "black",
                                            color: "white",
                                          }}
                                          title={
                                            <>
                                              <Typography color="inherit">
                                                TT307 W-8EXP-Q20
                                              </Typography>
                                              <a onClick={() => setToolInfo("21")}>
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
                                      {toolInfo === "21" ? (
                                        <div>
                                          <Paper
                                            style={{
                                              backgroundColor: "#dedcb1",
                                              padding: "15px",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <p><strong>Line 20 a/b/c Help.</strong> For a Passive NFFE </p>
                                            <p><strong>IRS Instructions Line 20.</strong> Check box 20a if you are passive NFFE. If you do not have any substantial U.S. owners, check box 20b. If you have any substantial U.S. owners, you must provide a statement providing the information set forth on line 20c.</p>

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
                                    </Typography>
                                  </div>
                                  <div style={{ display: "grid", gridTemplateColumns: "5% 90%" }}>
                                    <div>
                                      <span style={{ marginRight: "1%" }}>a</span>
                                      <Checkbox name="isNotFinancialInsititute" checked={values.isNotFinancialInsititute} value={values.isNotFinancialInsititute}
                                        onChange={handleChange} />
                                    </div>
                                    <Typography className="mt-2">
                                      I certify that the entity identified in Part I is a foreign entity that is not a financial institution (other than an investment entity organized in a territory of the United States).
                                    </Typography>
                                  </div>

                                  <div className="mt-3">
                                    <Typography style={{ color: "grey", fontWeight: "bolder", fontSize: "14px" }}>
                                      Check box 21b or 21c, whichever applies:
                                    </Typography>
                                  </div>
                                  <div style={{ display: "grid", gridTemplateColumns: "5% 90%" }}>
                                    <div>
                                      <span style={{ marginRight: "1%" }}> b</span>
                                      <Checkbox name="isNoSubstantialUSOwner" checked={values.isNoSubstantialUSOwner} value={values.isNoSubstantialUSOwner}
                                        onChange={(e) => { handleChange(e); setTimeout(() => { setFieldValue("isNFFE", false) }, 100) }} />
                                    </div>
                                    <Typography className="mt-2">
                                      I further certify that the entity identified in Part I has no substantial U.S. owner
                                    </Typography>
                                  </div>

                                  <div style={{ display: "grid", gridTemplateColumns: "5% 90%" }}>
                                    <div>
                                      <span style={{ marginRight: "1%" }}> c</span>
                                      <Checkbox name="isNFFE" checked={values.isNFFE} value={values.isNFFE}
                                        onChange={(e) => { handleChange(e); setTimeout(() => { setFieldValue("isNoSubstantialUSOwner", false) }, 100) }} />
                                    </div>
                                    <Typography>
                                      I further certify that the entity identified in Part I has provided a statement including the name, address, and TIN of each substantial U.S. owner of the NFFE (see instructions).
                                    </Typography>
                                  </div>
                                </>) : ""}

                            {values.chapter4StatusId == 37
                              ? (
                                <>
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr", border: "1px solid black" }}>
                                    <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                      Part III</Typography>
                                    <Typography>
                                      <span style={{ marginLeft: "10px", backgroundColor: "white" }}>Qualification Statement for Chapter 4 Status (if required) </span>
                                    </Typography>


                                  </div>
                                  <div className="d-flex mt-3">
                                    <Typography className="mt-2" style={{ marginTop: "5px" }}>
                                      19 <span style={{ marginLeft: "10px", fontWeight: "bold" }}>For an exempt retirement plan of a foreign government </span>
                                      <span>
                                        <Tooltip
                                          style={{
                                            backgroundColor: "black",
                                            color: "white",
                                          }}
                                          title={
                                            <>
                                              <Typography color="inherit">
                                                W-8EXP-Q19
                                              </Typography>
                                              <a onClick={() => setToolInfo("19")}>
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
                                      {toolInfo === "19" ? (
                                        <div>
                                          <Paper
                                            style={{
                                              backgroundColor: "#dedcb1",
                                              padding: "15px",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <p>Check if you are an exempt retirement plan of a foreign government as defined for purposes of chapter 4. Check either box 19a or box 19b, whichever applies.</p>

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
                                    </Typography>
                                  </div>

                                  <div className="mt-3">
                                    <Typography style={{ color: "grey", fontWeight: "bolder", fontSize: "14px" }}>
                                      Check box 19a or box 19b, whichever applies
                                    </Typography>
                                  </div>
                                  <div style={{ display: "grid", gridTemplateColumns: "5% 90%" }}>
                                    <div>
                                      <span style={{ marginRight: "1%" }}> a</span>
                                      <Checkbox name="isSection114716" checked={values.isSection114716} value={values.isSection114716}
                                        onChange={(e) => { handleChange(e); setTimeout(() => { setFieldValue("isRegulationSection114716", false) }, 100) }} />
                                    </div>
                                    <Typography className="mt-2">
                                      I certify that the entity identified in Part I is established and sponsored by a foreign government, international organization, central bank of issue, or government of a U.S. territory (each as defined in Regulations section 1.1471-6 or an applicable Model 1 or Model 2 IGA) to provide retirement, disability, or death benefits to beneficiaries or participants that are current or former employees of the sponsor (or persons designated by such employees);
                                      <strong>OR</strong>
                                    </Typography>
                                  </div>

                                  <div style={{ display: "grid", gridTemplateColumns: "5% 90%" }}>
                                    <div>
                                      <span style={{ marginRight: "1%" }}> b</span>
                                      <Checkbox name="isRegulationSection114716" checked={values.isRegulationSection114716} value={values.isRegulationSection114716}
                                        onChange={(e) => { handleChange(e); setTimeout(() => { setFieldValue("isSection114716", false) }, 100) }} />
                                    </div>
                                    <Typography>
                                      I certify that the entity identified in Part I is established and sponsored by a foreign government, international organization, central bank of issue, or government of a U.S. territory (each as defined in Regulations section 1.1471-6 or an applicable Model 1 or Model 2 IGA) to provide retirement, disability, or death benefits to beneficiaries or participants that are not current or former employees of such sponsor, but are in consideration of personal services performed for the sponsor.
                                    </Typography>
                                  </div>
                                </>) : ""}

                            {values.chapter4StatusId == 38
                              ? (
                                <>
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr", border: "1px solid black" }}>
                                    <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                      Part III</Typography>
                                    <Typography>
                                      <span style={{ marginLeft: "10px", backgroundColor: "white" }}>Qualification Statement for Chapter 4 Status (if required) </span>
                                    </Typography>


                                  </div>
                                  <div className="d-flex mt-3">
                                    <Typography className="mt-2" style={{ marginTop: "5px" }}>
                                      18 <span style={{ marginLeft: "10px", fontWeight: "bold" }}>For a foreign government (including a political subdivision), government of a U.S. territory, or foreign central bank of issue: </span>
                                      <span>
                                        <Tooltip
                                          style={{
                                            backgroundColor: "black",
                                            color: "white",
                                          }}
                                          title={
                                            <>
                                              <Typography color="inherit">
                                                TT-303 W-8EXP-Q17
                                              </Typography>
                                              <a onClick={() => setToolInfo("17")}>
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
                                      {toolInfo === "17" ? (
                                        <div>
                                          <Paper
                                            style={{
                                              backgroundColor: "#dedcb1",
                                              padding: "15px",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <p><strong>Line 17 Help.</strong> Check this box if you are a <strong>foreign government, government of a U.S. possession, or foreign central bank of issue</strong> as defined for purposes of chapter 4 (see Regulations section 1.1471-6). By checking this box, you are certifying to the statement made in line 17. </p>
                                            <p><strong>IRS Instructions Line 17.</strong> Check this box if you certify that the entity identified in Part I is the beneficial owner of the payment and is not engaged in commercial financial activities of a type&nbsp;engaged in by an insurance company, custodian institution, or depository institution with respect to the payments, accounts or obligations for which this form is submitted (Except as permitted in Regulations section 1.1471-6)(h)(2)).&nbsp;&nbsp;&nbsp;</p>
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
                                    </Typography>
                                  </div>

                                  <div className="mt-3">
                                    <Typography style={{ color: "grey", fontWeight: "bolder", fontSize: "14px" }}>
                                    </Typography>
                                  </div>
                                  <div style={{ display: "grid", gridTemplateColumns: "5% 90%" }}>
                                    <div>
                                      <Checkbox name="isRegulationSection114716" checked={values.isRegulationSection114716} value={values.isRegulationSection114716}
                                        onChange={(e) => {
                                          handleChange(e);
                                          //setTimeout(() => { setFieldValue("isRegulationSection114716", false) }, 100)
                                        }} />
                                    </div>
                                    <Typography className="mt-2">
                                      I certify that the entity identified in Part I is the beneficial owner of the payment and is not engaged in commercial financial activities of a type engaged in by an insurance company, custodial institution, or depository institution with respect to the payments, accounts, or obligations for which this form is submitted (except permitted in Regulations section
                                      <span style={{ color: "blue", marginLeft: "5px" }}>
                                        Regulations section 1.1471-6(h)(2)
                                      </span>
                                    </Typography>
                                  </div>

                                </>) : ""}


                            {values.chapter4StatusId == 24 ? (
                              <>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr", border: "1px solid black" }}>
                                  <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                    Part III</Typography>
                                  <Typography>
                                    <span style={{ marginLeft: "10px", backgroundColor: "white" }}>Qualification Statement for Chapter 4 Status (if required) </span>
                                  </Typography>


                                </div>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "5px" }}>
                                    16 <span style={{ marginLeft: "10px", fontWeight: "bold" }}>For a nonreporting IGA FFI: </span>
                                    <span>
                                      <Tooltip
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                        title={
                                          <>
                                            <Typography color="inherit">
                                              TT-301 W-8EXP-Q15
                                            </Typography>
                                            <a onClick={() => setToolInfo("16")}>
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
                                    {toolInfo === "16" ? (
                                      <div>
                                        <Paper
                                          style={{
                                            backgroundColor: "#dedcb1",
                                            padding: "15px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <p><strong>Line 15 Help.</strong> Check this box to indicate that you are treated as a non-reporting FFI under an applicable IGA (and as defined in the IGA). </p>
                                          <p><strong>IRS Instructions Line 15.</strong> You must identify the applicable IGA by entering the name of the jurisdiction that has the applicable IGA in effect with the United States. You must also provide the withholding agent with the class of entity described in Annex II of the IGA applicable to your status. If you are an FFI treated as a registered deemed-compliant FFI under an applicable Model 2 IGA, you must provide your GIIN in the space provided. </p>
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
                                  </Typography>
                                </div>
                                <div className="d-flex mt-3">

                                  <Typography>
                                    <Checkbox name="isNonReportingIGAFFI" value={values.isNonReportingIGAFFI} checked={values.isNonReportingIGAFFI} onChange={handleChange} />
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
                                      name="iGAUSCountryId"
                                      value={values.iGAUSCountryId}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    >
                                      <option value={0}>---select---</option>
                                      <option value={257}>United Kingdom</option>
                                      <option value={258}>United States</option>
                                      <option value={-1}>---</option>
                                      {getCountriesReducer.allCountriesData?.map((ele: any) => (
                                        <option key={ele?.id} value={ele?.id}>{ele?.name}</option>
                                      ))}
                                    </select>
                                  </FormControl>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    Is treated as a
                                    <div>
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
                                          name="treatedAsId"
                                          value={values.treatedAsId}
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
                                    </div>

                                    <div style={{ marginTop: "10px" }}>
                                      <TextField
                                        style={{
                                          backgroundColor: "#fff",
                                          color: "#121112",
                                          fontStyle: "italic",
                                          height: "50px",
                                          width: "40%",
                                        }}
                                        name="specifyEntity"
                                        placeholder="---Enter the specific entity type---"
                                        onChange={handleChange}
                                        value={values.specifyEntity}
                                      />
                                      <Typography>
                                        under the provisions of the applicable IGA (see instructions), <strong> and</strong>
                                      </Typography>

                                    </div>




                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2">
                                    <Typography>
                                      If you are an FFI treated as a registered deemed-compliant FFI under an applicable Model 2 IGA, provide your GIIN:
                                    </Typography>

                                    <div style={{ marginTop: "10px" }}>

                                      <TextField
                                        style={{
                                          backgroundColor: "#fff",
                                          color: "#121112",
                                          fontStyle: "italic",
                                          height: "50px",
                                          width: "40%",
                                        }}
                                        name="gIINNumber"
                                        placeholder="---Enter the specific entity type---"
                                        onChange={handleChange}
                                        value={values.gIINNumber}
                                      />
                                    </div>
                                  </Typography>
                                </Paper>
                              </>

                            ) : ""}


                            {values.chapter4StatusId == 33 ? (
                              <>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr", border: "1px solid black" }}>
                                  <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                    Part III</Typography>
                                  <Typography>
                                    <span style={{ marginLeft: "10px", backgroundColor: "white" }}>Qualification Statement for Chapter 4 Status (if required) </span>
                                  </Typography>


                                </div>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "5px" }}>
                                    22 <span style={{ marginLeft: "10px", fontWeight: "bold" }}> Name of sponsoring entity: </span>
                                    <span>
                                      <Tooltip
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                        title={
                                          <>
                                            <Typography color="inherit">
                                              TT-308 W-8EXP-Q21
                                            </Typography>
                                            <a onClick={() => setToolInfo("22")}>
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
                                    {toolInfo === "22" ? (
                                      <div>
                                        <Paper
                                          style={{
                                            backgroundColor: "#dedcb1",
                                            padding: "15px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <p><strong>Line 21 Help.</strong> <strong>Name of Sponsoring Entity.</strong> Check box 21 if you are a sponsored direct reporting NFFE. </p>
                                          <p><strong>IRS Instructions Line 21.</strong> Provide the name of your sponsoring entity in the space provided. By checking this box, you are certifying&nbsp;that the entity identified in Part I is a direct reporting NFFE that is sponsored by the entity identified in&nbsp;line 21.&nbsp;</p>
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
                                  </Typography>
                                </div>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2">

                                    <span className="mx-2">
                                      <FormControl>
                                        <TextField
                                          style={{
                                            backgroundColor: "#fff",
                                            fontStyle: "italic",
                                            minWidth: "400px"
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
                                  <Typography>
                                    <Checkbox name="isNFFESponsored" value={values.isNFFESponsored} checked={values.isNFFESponsored} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I is a direct reporting NFFE that is a sponsored by the entity identified in line 22.
                                  </Typography>
                                </div>
                              </>


                            ) : ""}

                            {values.chapter4StatusId == 35 ? (
                              <>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr", border: "1px solid black" }}>
                                  <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                    Part III</Typography>
                                  <Typography>
                                    <span style={{ marginLeft: "10px", backgroundColor: "white" }}>Qualification Statement for Chapter 4 Status (if required) </span>
                                  </Typography>


                                </div>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "5px" }}>
                                    17 <span style={{ marginLeft: "10px", fontWeight: "bold" }}>  For a territory financial institution: </span>
                                    <span>
                                      <Tooltip
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                        title={
                                          <>
                                            <Typography color="inherit">
                                              TT-302 W-8EXP-Q16
                                            </Typography>
                                            <a onClick={() => setToolInfo("17")}>
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
                                    {toolInfo === "17" ? (
                                      <div>
                                        <Paper
                                          style={{
                                            backgroundColor: "#dedcb1",
                                            padding: "15px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <p><strong>Line 16 Help. For a territory financial institution.</strong> Check this box if you are a territory financial institution. By checking this box, you are certifying to the statement in line 16. </p>
                                          <p><strong>IRS Instructions Line 16.</strong>&nbsp;Check this box if you certify that the&nbsp;entity identified in Part I is a financial institution (other than an investment entity) that is incorporated or organized under the laws of possession of the United States.&nbsp;</p>
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
                                  </Typography>
                                </div>

                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>

                                  </Typography>
                                  <Typography>
                                    <Checkbox name="isFinancialLawUS" checked={values.isFinancialLawUS} value={values.isFinancialLawUS} onChange={handleChange} />
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
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr", border: "1px solid black" }}>
                                  <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                    Part III</Typography>
                                  <Typography>
                                    <span style={{ marginLeft: "10px", backgroundColor: "white" }}>Qualification Statement for Chapter 4 Status (if required) </span>
                                  </Typography>


                                </div>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "5px" }}>
                                    20 <span style={{ marginLeft: "10px", fontWeight: "bold" }}>   For a 501(c) organization:</span>
                                    <span>
                                      <Tooltip
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                        title={
                                          <>
                                            <Typography color="inherit">
                                              TT-305 W-8EXP-Q19
                                            </Typography>
                                            <a onClick={() => setToolInfo("20")}>
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
                                    {toolInfo === "20" ? (
                                      <div>
                                        <Paper
                                          style={{
                                            backgroundColor: "#dedcb1",
                                            padding: "15px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <p><strong>Line 19 Help.</strong> Check this box if you are a <strong>501(c) organization</strong> other an insurance company described in section 501(c) (15). By checking this box, you are certifying to the statement made in line 19. </p>
                                          <p>
                                            <strong>IRS Instructions Line 19.</strong> &nbsp;By checking this box, you are certifying that the entity identified in Part I is an entity described in section 501(c) but is not an insurance company described in section 501(c)(15)
                                          </p>

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
                                  </Typography>
                                </div>
                                <div className="d-flex mt-3">
                                  <Typography>
                                    <Checkbox name="isSection501NotInsuranceCompany" value={values.isSection501NotInsuranceCompany} checked={values.isSection501NotInsuranceCompany} onChange={handleChange} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I Is and entity described in {" "}
                                    <span style={{ color: "blue" }}> section 501(c)</span>{" "}
                                    but is not an insurance company described in {" "}
                                    <span style={{ color: "blue" }}>section 501(c)(15).</span>{" "}
                                  </Typography>
                                </div>
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
                            onClick={() => {
                              dispatch(GetExpPdf(authDetails?.accountHolderId));
                            }}
                            style={{ color: "white", marginLeft: "15px" }}
                          >
                            View Form
                          </Button>
                          {values.chapter4StatusId ? (<Button
                            disabled={!isValid}
                            // type="submit"
                            onClick={() => {
                              submitForm().then((data) => {
                                Redirect(
                                  "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp", authDetails?.agentId, history
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
                              Redirect("/Exp/Tax_Purpose_Exp", authDetails?.agentId, history, true);
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
            </div >
          </div >
        </div >
      </section >
    </>
  );
}
