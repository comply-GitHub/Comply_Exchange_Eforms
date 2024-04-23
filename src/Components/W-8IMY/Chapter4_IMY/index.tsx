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
import Infoicon from "../../../assets/img/info.png";
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
  postW81MY_EForm
} from "../../../Redux/Actions";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import { TaxPurposeSchemaW81Chapter4 } from "../../../schemas/w81my";
import PNFFE from "../components/PNFFE";
import ANFEE from "../components/ANFFE";
import TFI from "../components/TFI";
import SDRNFFE from "../components/SDRNFFE";
import CDCFFI from "../components/CDCFFI";
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import CDCLLD from "../components/CDCLLD";
import CDCNLB from "../components/CDCNLB";
import CDCSCHIV from "../components/CDCSCHIV";
import ENELB from "../components/ENELB";
import ENGE from "../components/ENGE";
import ENSUC from "../components/ENSUC";
import ETNFFE from "../components/ETNFFE";
import ERP from "../components/ERP";
import FCBI from "../components/FCBI";
import NPFFI from "../components/NPFFI";
import NRIGAFFI from "../components/NRIGAFFI";
import ODFFI from "../components/ODFFI";
import PTNFFE from "../components/PTNFFE";
import RD from "../components/RD";
import SFFE from "../components/SFFI";
import SFFI from "../components/SFFI";
import { GetImyPdf } from "../../../Redux/Actions/PfdActions";
export default function Fedral_tax(props: any) {
  const { authDetails } = useAuth();

  const dispatch = useDispatch();
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;
  const initialValue = {
    chapter4StatusId: PrevStepData?.chapter4StatusId ? PrevStepData?.chapter4StatusId : 0,
    //Passive NFFE
    isPart1Nationalprincipalcontract: PrevStepData?.isPart1Nationalprincipalcontract ? PrevStepData?.isPart1Nationalprincipalcontract : false,
    //Active NFFE
    lessthan50perentitygrossincome: PrevStepData?.lessthan50perentitygrossincome ? PrevStepData?.lessthan50perentitygrossincome : false,
    //CDCFFI
    isnotengagedprimarilyintheBusinessofInvesting: PrevStepData?.isnotengagedprimarilyintheBusinessofInvesting ? PrevStepData?.isnotengagedprimarilyintheBusinessofInvesting : false,
    //CDCLLD
    istrustindentureorsimilaragreement: PrevStepData?.istrustindentureorsimilaragreement ? PrevStepData?.istrustindentureorsimilaragreement : false,
    //CDCNLB
    isPart1greaterthan5perintrest: PrevStepData?.isPart1greaterthan5perintrest ? PrevStepData?.isPart1greaterthan5perintrest : false,
    //CDCSCHIV
    sponsoringEntity: PrevStepData?.sponsoringEntity ? PrevStepData?.sponsoringEntity : "",
    isPart1FFIinvestmententity: PrevStepData?.isPart1FFIinvestmententity ? PrevStepData?.isPart1FFIinvestmententity : false,
    //ENELB
    isPart1entityidentified: PrevStepData?.isPart1entityidentified ? PrevStepData?.isPart1entityidentified : false,
    planofLuquidation: PrevStepData?.planofLuquidation ? PrevStepData?.planofLuquidation : "",
    //ENGE
    isPart1Companyholdingentities: PrevStepData?.isPart1Companyholdingentities ? PrevStepData?.isPart1Companyholdingentities : false,
    //ENSUC
    isPart1NonfinancialIdentified: PrevStepData?.isPart1NonfinancialIdentified ? PrevStepData?.isPart1NonfinancialIdentified : false,
    dateofBoardresolution: PrevStepData?.dateofBoardresolution ? PrevStepData?.dateofBoardresolution : "",
    //ETNFFE
    isPart1bonafideresidentspossession: PrevStepData?.isPart1bonafideresidentspossession ? PrevStepData?.isPart1bonafideresidentspossession : false,
    //ERP
    isPart1Benefitsonincome: PrevStepData?.isPart1Benefitsonincome ? PrevStepData?.isPart1Benefitsonincome : false,
    isrighttomorethan5PeroftheFFI: PrevStepData?.isrighttomorethan5PeroftheFFI ? PrevStepData?.isrighttomorethan5PeroftheFFI : false,
    issponsoredbyoneormoreemployers: PrevStepData?.issponsoredbyoneormoreemployers ? PrevStepData?.issponsoredbyoneormoreemployers : false,
    isformedpursuansection401a: PrevStepData?.isformedpursuansection401a ? PrevStepData?.isformedpursuansection401a : false,
    isestablishedbenefitoneormoreRetFunds: PrevStepData?.IsestablishedbenefitoneormoreRetFunds ? PrevStepData?.IsestablishedbenefitoneormoreRetFunds : false,
    isestablishedCentralbankofissue: PrevStepData?.isestablishedCentralbankofissue ? PrevStepData?.isestablishedCentralbankofissue : false,
    //FCBI
    istreatedaspurposeofchapter4: PrevStepData?.istreatedaspurposeofchapter4 ? PrevStepData?.istreatedaspurposeofchapter4 : false,
    //NPFFI
    isusingportionofthepaymentallocated: PrevStepData?.isusingportionofthepaymentallocated ? PrevStepData?.isusingportionofthepaymentallocated : false,
    //NRIGAFFI
    iscertifythatNonreportingIGAFFI: PrevStepData?.iscertifythatNonreportingIGAFFI ? PrevStepData?.iscertifythatNonreportingIGAFFI : false,
    igAbetweentheUnitedStatesAnd: PrevStepData?.igAbetweentheUnitedStatesAnd ? PrevStepData?.igAbetweentheUnitedStatesAnd : "",
    applicableIGA: PrevStepData?.applicableIGA ? PrevStepData?.applicableIGA : "",
    istreatedAs: PrevStepData?.istreatedAs ? PrevStepData?.istreatedAs : false,
    istreatedAsOthers: PrevStepData?.istreatedAsOthers ? PrevStepData?.istreatedAsOthers : "",
    sponsoredEntityTrustee: PrevStepData?.sponsoredEntityTrustee ? PrevStepData?.sponsoredEntityTrustee : 0,
    nameoftheTrustee: PrevStepData?.nameoftheTrustee ? PrevStepData?.nameoftheTrustee : "",
    thetrusteeIs: PrevStepData?.thetrusteeIs ? PrevStepData?.thetrusteeIs : "",
    //ODFFI
    isnotaffiliatedwithanentity: PrevStepData?.isnotaffiliatedwithanentity ? PrevStepData?.isnotaffiliatedwithanentity : false,
    isProvidedFFIownerReportingstatement: PrevStepData?.isProvidedFFIownerReportingstatement ? PrevStepData?.isProvidedFFIownerReportingstatement : "",
    isProvidedAuditorsLetter: PrevStepData?.isProvidedAuditorsLetter ? PrevStepData?.isProvidedAuditorsLetter : "",
    //PTNFFE
    isnotaFinancialInstitution: PrevStepData?.isnotaFinancialInstitution ? PrevStepData?.isnotaFinancialInstitution : false,
    oneormoreEstablishedSecurities: PrevStepData?.oneormoreEstablishedSecurities ? PrevStepData?.oneormoreEstablishedSecurities : "",
    ismemberofthesameExpandedaffiliatedGroup: PrevStepData?.ismemberofthesameExpandedaffiliatedGroup ? PrevStepData?.ismemberofthesameExpandedaffiliatedGroup : false,
    nameoftheEntityRegularyTraded: PrevStepData?.nameoftheEntityRegularyTraded ? PrevStepData?.nameoftheEntityRegularyTraded : "",
    nameoftheSecuritiesMarket: PrevStepData?.nameoftheSecuritiesMarket ? PrevStepData?.nameoftheSecuritiesMarket : "",
    //RD
    isrequiredtoperformAML: PrevStepData?.isrequiredtoperformAML ? PrevStepData?.isrequiredtoperformAML : false,
    hasbeenboundbyTerminatedAgreement: PrevStepData?.hasbeenboundbyTerminatedAgreement ? PrevStepData?.hasbeenboundbyTerminatedAgreement : false,
    isprohibitiononthesaleofDebt: PrevStepData?.isprohibitiononthesaleofDebt ? PrevStepData?.isprohibitiononthesaleofDebt : false,
    //SDRNFFE
    nameofDirectSponsoringEntity: PrevStepData?.nameofDirectSponsoringEntity ? PrevStepData?.nameofDirectSponsoringEntity : "",
    isadirectReportingNFFE: PrevStepData?.isadirectReportingNFFE ? PrevStepData?.isadirectReportingNFFE : false,
    //SFFI
    nameofSponsoringEntity: PrevStepData?.nameofSponsoringEntity ? PrevStepData?.nameofSponsoringEntity : "",
    hasagreedwiththeNonparticipatingFFI: PrevStepData?.hasagreedwiththeNonparticipatingFFI ? PrevStepData?.hasagreedwiththeNonparticipatingFFI : false,
    IswhollyownedDirectlyIndirectlybytheUS: PrevStepData?.IswhollyownedDirectlyIndirectlybytheUS ? PrevStepData?.IswhollyownedDirectlyIndirectlybytheUS : false,
    //TFI
    tFI18a: PrevStepData?.TFI18a ? PrevStepData?.TFI18a : false,
    tFI18b: PrevStepData?.tFI18b ? PrevStepData?.tFI18b : false,
    tFI18c: PrevStepData?.tFI18c ? PrevStepData?.tFI18c : false,
    tFI18d: PrevStepData?.tFI18d ? PrevStepData?.tFI18d : false,
    tFI18e: PrevStepData?.tFI18e ? PrevStepData?.tFI18e : false,
    tFI18f: PrevStepData?.tFI18f ? PrevStepData?.tFI18f : false,


    foreginTIN_CountryId: 0,
    Wholly: false,



  };
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
    dispatch(getAllCountriesIncomeCode());
    // dispatch(getAllStateByCountryId());
    dispatch(GetChapter4Statuses());
    dispatch(GetHelpVideoDetails());
  }, []);



  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
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
  const [clickCount, setClickCount] = useState(0);
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
  useEffect(() => {
    document.title = "Chapter IV"
  }, [])

  return (
    <>
      <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        <div className="overlay-div">
          <div className="overlay-div-group">
            <div className="viewInstructions">View Instructions</div>
            <div className="viewform"
              onClick={() => {
                dispatch(GetImyPdf(authDetails?.accountHolderId))
              }}>View Form</div>
            <div className="helpvideo">
              {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
              {GethelpData && GethelpData[7].id === 9 ? (
                <a
                  href={GethelpData[7].fieldValue}
                  target="popup"
                  onClick={() =>
                    window.open(
                      GethelpData[7].fieldValue,
                      'name',
                      `width=${GethelpData[7].width},height=${GethelpData[7].height},top=${GethelpData[7].top},left=${GethelpData[7].left}`
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
        <div className="row w-100 ">
          <div className="col-4">
            <div style={{ padding: "20px 0px", height: "100%" }}>
              <BreadCrumbComponent breadCrumbCode={1210} formName={FormTypeId.FW81MY} />
            </div>
          </div>
          <div className="col-8 mt-3">
            <div style={{ padding: "13px" }}>
              <Paper style={{ padding: "10px" }}>
                <Formik
                  validateOnChange={false}
                  validateOnBlur={false}
                  initialValues={initialValue}
                  validationSchema={TaxPurposeSchemaW81Chapter4}
                  onSubmit={(values, { setSubmitting }) => {

                    const temp = {
                      agentId: authDetails.agentId,
                      accountHolderBasicDetailId: authDetails.accountHolderId,
                      ...PrevStepData,
                      ...values,
                      stepName: null
                    };

                    const returnPromise = new Promise((resolve, reject) => {
                      dispatch(
                        postW81MY_EForm(temp,
                          (responseData: any) => {
                            localStorage.setItem("PrevStepData", JSON.stringify(temp));
                            resolve(responseData);
                            history("/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY");
                          },
                          (err: any) => {
                            reject(err);
                          }
                        )
                      );
                    })

                    // if (clickCount === 0) {

                    //   setClickCount(clickCount + 1);
                    // } else {
                    //   setSubmitting(true);
                    //   // history(
                    //   //   "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY"
                    //   // );
                    // }
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
                    submitForm
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <>{console.log(values, errors, "errorsssss")}</>
                      <div style={{ width: "100%" }}>
                        <div>
                          {values.Wholly === true && clickCount === 1 ?
                            (<div style={{ backgroundColor: "#e8e1e1", padding: "10px" }}>
                              <Typography>
                                FATCA100
                                <span className="mx-1">
                                  <img src={Infoicon} style={{
                                    color: "#ffc107", height: "22px",
                                    width: "20px",
                                    boxShadow: "inherit",



                                    cursor: "pointer",
                                    marginBottom: "3px"

                                  }} />



                                </span>
                                <p>You have certified that the Chapter 4 status is an Exempt Retirement Plan, but the country of residence is not a country that has a treaty with the United States. Please review your response and go back and amend if required. If you continue your agent may require additional information to confirm the status.</p>
                              </Typography>


                            </div>
                            ) : ""
                          }
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
                                    onChange={(e) => {
                                      handleChange(e);
                                      setTimeout(() => {
                                        setFieldValue("isPart1Nationalprincipalcontract", false);
                                        setFieldValue("lessthan50perentitygrossincome", false);
                                        setFieldValue("isnotengagedprimarilyintheBusinessofInvesting", false);
                                        setFieldValue("istrustindentureorsimilaragreement", false);
                                        setFieldValue("isPart1greaterthan5perintrest", false);
                                        setFieldValue("sponsoringEntity", "");
                                        setFieldValue("isPart1FFIinvestmententity", false);


                                        setFieldValue("isPart1entityidentified", false);
                                        setFieldValue("planofLuquidation", "");
                                        setFieldValue("isPart1Companyholdingentities", false);
                                        setFieldValue("isPart1NonfinancialIdentified", false);
                                        setFieldValue("dateofBoardresolution", "");
                                        setFieldValue("isPart1bonafideresidentspossession", false);
                                        setFieldValue("isPart1Benefitsonincome", false);
                                        setFieldValue("isrighttomorethan5PeroftheFFI", false);
                                        setFieldValue("issponsoredbyoneormoreemployers", false);
                                        setFieldValue("isformedpursuansection401a", false);
                                        setFieldValue("isestablishedbenefitoneormoreRetFunds", false);
                                        setFieldValue("isestablishedCentralbankofissue", false);

                                        setFieldValue("istreatedaspurposeofchapter4", false);
                                        setFieldValue("isusingportionofthepaymentallocated", false);

                                        setFieldValue("iscertifythatNonreportingIGAFFI", false);
                                        setFieldValue("igAbetweentheUnitedStatesAnd", "");
                                        setFieldValue("applicableIGA", "");
                                        setFieldValue("istreatedAs", false);
                                        setFieldValue("istreatedAsOthers", "");
                                        setFieldValue("sponsoredEntityTrustee", "");
                                        setFieldValue("nameoftheTrustee", "");
                                        setFieldValue("thetrusteeIs", "");

                                        setFieldValue("isnotaffiliatedwithanentity", false);
                                        setFieldValue("isProvidedFFIownerReportingstatement", "");
                                        setFieldValue("isProvidedAuditorsLetter", "");

                                        setFieldValue("isnotaFinancialInstitution", false);
                                        setFieldValue("oneormoreEstablishedSecurities", "");
                                        setFieldValue("nameoftheEntityRegularyTraded", "");
                                        setFieldValue("ismemberofthesameExpandedaffiliatedGroup", false);
                                        setFieldValue("nameoftheSecuritiesMarket", "");

                                        setFieldValue("isrequiredtoperformAML", false);
                                        setFieldValue("hasbeenboundbyTerminatedAgreement", false);
                                        setFieldValue("isprohibitiononthesaleofDebt", false);

                                        setFieldValue("nameofDirectSponsoringEntity", "");
                                        setFieldValue("isadirectReportingNFFE", false);

                                        setFieldValue("nameofSponsoringEntity", "");
                                        setFieldValue("hasagreedwiththeNonparticipatingFFI", false);
                                        setFieldValue("IswhollyownedDirectlyIndirectlybytheUS", false);

                                        setFieldValue("tFI18a", false);
                                        setFieldValue("tFI18b", false);
                                        setFieldValue("tFI18c", false);
                                        setFieldValue("tFI18d", false);
                                        setFieldValue("tFI18e", false);
                                        setFieldValue("tFI18f", false);

                                      }, 200);
                                    }}
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

                                  {errors?.chapter4StatusId && typeof errors?.chapter4StatusId === 'string' && (
                                    <p className="error">{errors?.chapter4StatusId}</p>
                                  )}
                                </FormControl>
                              </div>

                            </div>
                            {(values.chapter4StatusId == 2 || values.chapter4StatusId == 27) && (
                              <PNFFE handleChange={handleChange} values={values} setFieldValue={setFieldValue} />
                            )}

                            {values.chapter4StatusId == 6 && (
                              <ANFEE handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}
                            {(values.chapter4StatusId == 8) && (
                              <CDCFFI handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}
                            {(values.chapter4StatusId == 9) && (
                              <CDCLLD handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}

                            {values.chapter4StatusId == 10 && (
                              <CDCNLB handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}

                            {values.chapter4StatusId == 11 && (
                              <CDCSCHIV handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}

                            {values.chapter4StatusId == 15 && (
                              <ENELB handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}

                            {values.chapter4StatusId == 16 && (
                              <ENGE handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}
                            {values.chapter4StatusId == 17 && (
                              <ENSUC handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}
                            {values.chapter4StatusId == 18 && (
                              <ETNFFE handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}

                            {values.chapter4StatusId == 19 && (
                              <ERP handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}
                            {values.chapter4StatusId == 20 && (
                              <FCBI handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}
                            {values.chapter4StatusId == 22 && (
                              <NPFFI handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}
                            {values.chapter4StatusId == 24 && (
                              <NRIGAFFI handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}
                            {values.chapter4StatusId == 25 && (
                              <ODFFI handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}
                            {values.chapter4StatusId == 28 && (
                              <PTNFFE handleChange={handleChange} values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                            )}

                            {(values.chapter4StatusId == 32) && (
                              <RD handleChange={handleChange} values={values} setFieldValue={setFieldValue} />
                            )}

                            {(values.chapter4StatusId == 33) && (
                              <SDRNFFE handleChange={handleChange} values={values} setFieldValue={setFieldValue} />
                            )}
                            {(values.chapter4StatusId == 34) && (
                              <SFFI handleChange={handleChange} values={values} setFieldValue={setFieldValue} />
                            )}
                            {(values.chapter4StatusId == 35) && (
                              <TFI handleChange={handleChange} values={values} setFieldValue={setFieldValue} />
                            )}






                            {/* {values.chapter4StatusId == 21 ? (
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
                                    <Checkbox />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that :
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
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
                                    <Checkbox />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I :
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    Is comprised primarily of foreign governments;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    Is recognized as an intergovernmental or supranational organization under a foreign law similar to the International Organizations Immunities Act or that has in effect a headquarters agreement with a foreign government;
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    The benefit of the entity's income does not inure to any private person;<span style={{ fontWeight: "bold" }}>
                                      and</span>

                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    Is the beneficial owner of the payment and is not engaged in commercial financial activities of a type engaged in by an insurance company, custodial institution, or depository institution with respect to the payments, accounts, or obligations for which this form is submitted (except as permitted in
                                  </Typography>
                                  <Link style={{ textDecorationLine: "none", marginLeft: "5px" }}>
                                    Regulations section 1.1471-6(h)(2)

                                  </Link>

                                  ).


                                </Paper>
                              </>

                            ) : ""} */}
                            {/* {values.chapter4StatusId == 23 ? (
                              <>
                                <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XXII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Non-profit Organization</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    36
                                  </Typography>
                                  <Typography>
                                    <Checkbox />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in Part I :
                                  </Typography>
                                </div>
                                <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    <>
                                      is a non-profit organization that meets the following requirements:

                                    </>
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    <>
                                      The entity is established and maintained in its country of residence exclusively for religious, charitable, scientific, artistic, cultural or educational purposes;

                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    The entity is exempt from income tax in its country of residence;


                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    The entity has no shareholders or members who have a proprietary or beneficial interest in its income or assets;

                                    <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  </Typography>
                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    Neither the applicable laws of the entity's country of residence nor the entity's formation documents permit any income or assets of the entity to be distributed to, or applied for the benefit of, a private person or non-charitable entity other than pursuant to the conduct of the entity's charitable activities or as payment of reasonable compensation for services rendered or payment representing the fair market value of property which the entity has purchased; <span style={{ fontWeight: "bold" }}>
                                      and</span>



                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />

                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    The applicable laws of the entity's country of residence or the entity's formation documents require that, upon the entity's liquidation or dissolution, all of its assets be distributed to an entity that is a foreign government, an integral part of a foreign government, a controlled entity of a foreign government, or another organization that is described in this Part XXII or escheats to the government of the entity's country of residence or any political subdivision thereof.


                                  </Typography>





                                </Paper>
                              </>

                            ) : ""} */}


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
                                    <Checkbox />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the entity identified in part I is a 501(c) organization that :

                                  </Typography>
                                </div>

                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    <>
                                      Has been issued a determination letter from the IRS that is currently in effect concluding that the payee is a section 501(c) organization that is dated:
                                      <br />
                                      <Input className="mb-4 date" type="date" />
                                      <Typography className="my-2" style={{ fontSize: "14px" }}>
                                        <>
                                          <span style={{ fontWeight: "bold" }}>
                                            ; or</span>
                                        </>
                                      </Typography>
                                    </>
                                  </Typography>
                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    <>
                                      Has provided a copy of an opinion from U.S. counsel certifying that the payee is a section 501(c) organization (without regard to whether the payee is a foreign private foundation).
                                    </>
                                  </Typography>








                                </Paper>


                              </>


                            ) : ""}

                          </Typography>

                        </div>

                        {values.chapter4StatusId !== 0 && (<>
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
                                  (values.chapter4StatusId == 2 || values.chapter4StatusId == 27) && values.isPart1Nationalprincipalcontract
                                )
                                  ||
                                  (
                                    (values.chapter4StatusId == 3 || values.chapter4StatusId == 4 || values.chapter4StatusId == 5 || values.chapter4StatusId == 12 || values.chapter4StatusId == 21 || values.chapter4StatusId == 23 || values.chapter4StatusId == 29 || values.chapter4StatusId == 30 || values.chapter4StatusId == 31)
                                  )
                                  ||
                                  (
                                    (values.chapter4StatusId == 6 && values.lessthan50perentitygrossincome)
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 7
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 8 && values.isnotengagedprimarilyintheBusinessofInvesting
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 9 && values.istrustindentureorsimilaragreement
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 10 && values.isPart1greaterthan5perintrest
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 11 && values.sponsoringEntity && values.isPart1FFIinvestmententity
                                  )

                                  ||
                                  (
                                    values.chapter4StatusId == 15 && values.isPart1entityidentified && values.planofLuquidation
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 16 && values.isPart1Companyholdingentities
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 17 && values.isPart1NonfinancialIdentified && values.dateofBoardresolution
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 18 && values.isPart1bonafideresidentspossession
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 19 && (values.isPart1Benefitsonincome || values.isrighttomorethan5PeroftheFFI || values.issponsoredbyoneormoreemployers || values.isformedpursuansection401a || values.isestablishedbenefitoneormoreRetFunds || values.isestablishedCentralbankofissue)
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 20 && values.istreatedaspurposeofchapter4
                                  )
                                  ||
                                  (
                                    values.chapter4StatusId == 22 && values.isusingportionofthepaymentallocated
                                  )
                                  ||
                                  values.chapter4StatusId == 24 &&
                                  (
                                    (
                                      values.iscertifythatNonreportingIGAFFI && values.igAbetweentheUnitedStatesAnd && values.applicableIGA
                                    ) &&
                                    (
                                      values.istreatedAs &&
                                      (
                                        (values.istreatedAs == 24 && values.istreatedAsOthers) || (values.istreatedAs != 24 && !values.istreatedAsOthers)
                                      )
                                    ) &&
                                    (
                                      values.sponsoredEntityTrustee &&
                                      (
                                        (values.sponsoredEntityTrustee == 1) && (values.nameoftheTrustee && values.thetrusteeIs)
                                        ||
                                        (values.sponsoredEntityTrustee == 2) && (values.nameoftheTrustee)
                                        ||
                                        (values.sponsoredEntityTrustee == 3)
                                      )
                                    )
                                  )
                                  ||
                                  values.chapter4StatusId == 25 && values.isnotaffiliatedwithanentity && (values.isProvidedFFIownerReportingstatement || values.isProvidedAuditorsLetter)
                                  ||
                                  values.chapter4StatusId == 28 &&
                                  (
                                    (values.isnotaFinancialInstitution && values.oneormoreEstablishedSecurities)
                                    ||
                                    (values.ismemberofthesameExpandedaffiliatedGroup && values.nameoftheEntityRegularyTraded && values.nameoftheSecuritiesMarket)
                                  )
                                  ||
                                  values.chapter4StatusId == 32 && values.isrequiredtoperformAML && (values.hasbeenboundbyTerminatedAgreement || values.isprohibitiononthesaleofDebt)
                                  ||
                                  values.chapter4StatusId == 33 && values.nameofDirectSponsoringEntity && values.isadirectReportingNFFE
                                  ||
                                  values.chapter4StatusId == 34 && values.nameofSponsoringEntity && (values.hasagreedwiththeNonparticipatingFFI || values.IswhollyownedDirectlyIndirectlybytheUS)
                                  ||
                                  values.chapter4StatusId == 35 && values.tFI18a && (values.tFI18b || values.tFI18c)

                                  ? false : true
                              }
                            >
                              Continue
                            </Button>
                          </div>
                        </>)}
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
                            type="submit"
                            onClick={() => {
                              history("/IMY/Tax_Purpose_Exp")
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
