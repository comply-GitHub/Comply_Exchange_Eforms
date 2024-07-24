import React, { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
// import "./index.scss";
import { postW8ECI_EForm } from "../../../Redux/Actions";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import {
  getAllCountries,
  getAllCountriesCode,
  getAllCountriesIncomeCode,
  getAllStateByCountryId,
  GetChapter3Status,
  GetHelpVideoDetails
} from "../../../Redux/Actions";
import Infoicon from "../../../assets/img/info.png";
import { TaxPurposeSchema } from "../../../schemas/w8BenE";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import { useLocation } from "react-router-dom";
import PopupModal from "../../../Redux/Actions/poupModal";
import GlobalValues, { FormTypeId, FormTypeSelection } from "../../../Utils/constVals";
import Chapter3StatusGuide from "../Chapter3Guide";
import { convertToFormData } from "../../../Helpers/convertToFormData";
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import { GetBenEPdf, GetEciPdf } from "../../../Redux/Actions/PfdActions";
import Redirect from "../../../Router/RouterSkip";
import View_Insructions from "../../viewInstruction";
export default function Fedral_tax(props: any) {
  const { authDetails } = useAuth();
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const {
    handleTaxClassificationChange,
    // selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;
  const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");

  const urlValue = location.pathname.substring(1);
  const agentDefaultDetails = JSON.parse(
    localStorage.getItem("agentDefaultDetails") || "{}"
  );

  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");

  const [initialValue, setInitialValue] = useState({
    agentId: authDetails?.agentId,
    formTypeSelectionId: 2,
    accountHolderBasicDetailId: authDetails?.accountHolderId,
    businessName: obValues.entityName,
    businessDisgradedEntity: "",
    other: "",
    countryOfIncorporation: 0,
    chapter3Status: 0,
    attachSupportingDocumentFile: null,
    attachSupportingDocument: null,
    descriptionHybridStatus: "",
    isHybridStatus: 0,
    isSubmissionSingleUSOwner: "",
    isDisRegardedSection1446: "",
    statusId: 1,
    stepName: `/${urlValue}`,
  });

  const [toolInfo, setToolInfo] = useState("");
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [clickCount, setClickCount] = useState(0);
  const [selectedfile, setSelectedFile] = useState<any>();
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const W8ECIData = useSelector((state: any) => (state?.W8ECI?.chapter3Status !== 0) ? state?.W8ECI : JSON.parse(localStorage.getItem("PrevStepData") || "{}"));


  const LoadPageData = () => {
    if (W8ECIData !== null && W8ECIData !== undefined) {
      const tempData = {
        ...W8ECIData,
        chapter3Status: Number.parseInt(W8ECIData.chapter3Status ?? 0),
        countryOfIncorporation: Number.parseInt(W8ECIData.countryOfIncorporation),
        isHybridStatus: Number.parseInt(W8ECIData.isHybridStatus),
        businessName: W8ECIData.entityName && W8ECIData.entityName !== null && W8ECIData.entityName !== "" ? W8ECIData.entityName : obValues.entityName,
        isSubmissionSingleUSOwner: W8ECIData.isSubmissionSingleUSOwner === true ? "yes" : "no",
        isDisRegardedSection1446: W8ECIData.isDisRegardedSection1446 === true ? "yes" : "no",
        stepName: `/${urlValue}`,
      };
      setInitialValue(tempData);
    }
  }
  useEffect(() => {
    document.title = "Chapter III"
  }, [])

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllCountriesCode());
    dispatch(getAllCountriesIncomeCode());
    dispatch(GetHelpVideoDetails());
    // dispatch(getAllStateByCountryId(258));
    dispatch(GetChapter3Status(FormTypeId.BENE));
    LoadPageData();
  }, []);
  const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }
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
  const [selectedTaxClassification, setSelectedTaxClassification] = useState(0);

  const handleChangeAccodionState =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedState(newExpanded ? panel : false);
    };

  const confirmFunction = (value: any, setFieldValue: any) => {
    setExpandedState(""); setFieldValue("chapter3Status", value); setSelectedTaxClassification(value)
  }
  const W9Data = useSelector((state: any) => state.w9Data);

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  }

  const [popupState, setPopupState] = useState({
    data:"",
    status:false
})
const [showMessages, setShowMessages] = useState(true);

useEffect(() => {
  // Check localStorage for the showMessages state
  const savedShowMessages = localStorage.getItem('showMessages');
  if (savedShowMessages !== null) {
    setShowMessages(JSON.parse(savedShowMessages));
  }
}, []);

  const viewPdf = () => {
    history("/w8BenE_pdf");
  }

  return (
    <>
      <section
        className="inner_content"
        style={{  marginBottom: "10px" }}
      >
        <View_Insructions canvaBx={canvaBx} handleCanvaClose={handleCanvaClose} />
      {canvaBx === true ? (<div className="offcanvas-backdrop fade show" onClick={() => { handleCanvaClose() }}></div>) : null}
              <div className="overlay-div">
                <div className="overlay-div-group">
                <div className="viewInstructions" onClick={() => { handleCanvaOpen(); }}>View Instructions</div>
            <div className="viewform"
               onClick={() => {
                dispatch(GetEciPdf(authDetails?.accountHolderId, (callbackData:any)=>{
                  setPopupState({
                      status:true,
                      data: callbackData?.pdf
                  })
              }))
          }}>View Form</div>
            <div className="helpvideo">
              {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
              {GethelpData && GethelpData[3].id === 5 ? (
                <a
                  href={GethelpData[3].fieldValue}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default anchor behavior
                    window.open(
                      GethelpData[3].fieldValue,
                      'popupWindow',
                      `width=${GethelpData[3].width},height=${GethelpData[3].height},top=${GethelpData[3].top},left=${GethelpData[3].left}`
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
              <BreadCrumbComponent breadCrumbCode={1203} formName={3} />
            </div>
          </div>
          <div className="col-8 mt-3">
            <div style={{ padding: "12px" }}>
              <Paper style={{ padding: "10px" }}>
                <Formik
                  enableReinitialize
                  validateOnChange={true}
                  validateOnBlur={true}
                  validateOnMount={true}
                  initialValues={initialValue}
                  validationSchema={TaxPurposeSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    const submitPromise = new Promise((resolve, reject) => {
                      
                        setSubmitting(true);
                        const temp = {
                          ...PrevStepData, ...values,
                          agentId: authDetails?.agentId,
                          accountHolderBasicDetailId: authDetails?.accountHolderId,
                          isSubmissionSingleUSOwner: values.isSubmissionSingleUSOwner === "yes" ? true : false,
                          isDisRegardedSection1446: values.isDisRegardedSection1446 === "yes" ? true : false,
                        };
                        const result = {
                          ...temp,
                          isHybridStatus: Number.isNaN(temp.isHybridStatus) ? 0 : temp.isHybridStatus,
                          formTypeSelectionId: FormTypeSelection.Entity,
                          attachSupportingDocumentFile: selectedfile,
                        };
                        dispatch(
                          postW8ECI_EForm(result, () => {
                            localStorage.setItem("PrevStepData", JSON.stringify(temp));
                            resolve("success");
                            setSubmitting(false);
                            localStorage.setItem('showMessages', JSON.stringify(false));
                              setShowMessages(false);
                          },
                            (error: any) => {
                              reject(error);
                              setSubmitting(false);
                              
                            }
                          )
                        );
                      
                    })
                    return submitPromise;
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
                    isValid,
                    setFieldValue,
                    validateForm
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <div style={{ width: "100%" }}>
                      {showMessages && (
            <>
              {values?.countryOfIncorporation && values?.countryOfIncorporation?.toString() !== "0" &&
                values?.countryOfIncorporation !== obValues?.permanentResidentialCountryId ? (
                <div
                  style={{
                    backgroundColor: "#e8e1e1",
                    padding: "10px",
                  }}
                >
                  <Typography>
                    ICOR114
                    <span className="mx-2">
                      <img
                        src={Infoicon}
                        style={{
                          color: "#ffc107",
                          height: "22px",
                          width: "20px",
                          boxShadow: "inherit",
                          cursor: "pointer",
                          marginBottom: "3px",
                        }}
                      />
                      Country of incorporation is different from the PRA country.
                    </span>
                  </Typography>
                </div>
              ) : values.countryOfIncorporation === 186 ? (
                <div
                  style={{
                    backgroundColor: "#e8e1e1",
                    padding: "10px",
                  }}
                >
                  <Typography>
                    ICOR104
                    <span className="mx-2">
                      <img
                        src={Infoicon}
                        style={{
                          color: "#ffc107",
                          height: "22px",
                          width: "20px",
                          boxShadow: "inherit",
                          cursor: "pointer",
                          marginBottom: "3px",
                        }}
                      />
                      You have selected 'other' for Country of incorporation or organization. Your agent may need to contact you for further information.
                    </span>
                  </Typography>
                </div>
              ) : values.countryOfIncorporation === 186 &&
                values.other === "" ? (
                <div
                  style={{
                    backgroundColor: "#e8e1e1",
                    padding: "10px",
                  }}
                >
                  <Typography>
                    ICOR105
                    <span className="mx-2">
                      <img
                        src={Infoicon}
                        style={{
                          color: "#ffc107",
                          height: "22px",
                          width: "20px",
                          boxShadow: "inherit",
                          cursor: "pointer",
                          marginBottom: "3px",
                        }}
                      />
                      You have selected "other" for Country of incorporation or organization, but have not entered the country.
                    </span>
                  </Typography>
                </div>
              ) : obValues.isUSEntity === false &&
                obValues.isUSIndividual === false &&
                values.countryOfIncorporation && values.countryOfIncorporation === 258 ? (
                <div
                  style={{
                    backgroundColor: "#e8e1e1",
                    padding: "10px",
                  }}
                >
                  <Typography>
                    ICOR110
                    <span className="mx-2">
                      <img
                        src={Infoicon}
                        style={{
                          color: "#ffc107",
                          height: "22px",
                          width: "20px",
                          boxShadow: "inherit",
                          cursor: "pointer",
                          marginBottom: "3px",
                        }}
                      />
                      You have identified that you are submitting a form on behalf of a NON U.S. Entity and indicated that the Country of Incorporation was in the United States. The Entity may be classed as a U.S person for U.S tax purposes. Your agent may need to contact you for further information.
                    </span>
                  </Typography>
                </div>
              ) : null}
            </>
          )}

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
                                          fontSize: "16px",
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
                                        Please make a selection from the
                                        dropdown provided. The selection must
                                        represent the Chapter 3 classification,
                                        under U.S. tax principles, of the
                                        individual, business, or organization
                                        that the certificate will represent.
                                      </Typography>
                                      <Typography style={{ marginTop: "10px" }}>
                                        For more information, please review the
                                        Chapter 3 Classification Guide to
                                        establish your entity status for
                                        purposes of Chapter 3.
                                      </Typography>
                                      <Typography
                                        style={{
                                          marginTop: "10px",
                                          fontWeight: "550",
                                        }}
                                      >
                                        IRS Guidance:
                                      </Typography>
                                      <Typography style={{ marginTop: "10px" }}>
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
                                        'Partnership' or 'Disregarded entity'
                                        option. If you are a sole proprietor
                                        select the 'Individual' option, not
                                        'Disregarded entity'.
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{
                                      padding: " 0 10px",
                                      color: "#121112",
                                      fontStyle: "italic",
                                      height: "39px",
                                    }}
                                  >
                                    <option value={0}>---select---</option>

                                    {GetChapter3StatusReducer.GetChapter3StatusData?.map(
                                      (ele: any) => (
                                        <option key={ele?.id} value={ele?.id}>
                                          {ele?.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <p className="error">
                                    {errors.chapter3Status}
                                  </p>
                                </FormControl>
                              </div>
                            </div>
                            {values.chapter3Status == 1 ||
                              values.chapter3Status == 6 ||
                              values.chapter3Status == 7 ||
                              values.chapter3Status == 8 ||
                              values.chapter3Status == 9 ||
                              values.chapter3Status == 10 ||
                              values.chapter3Status == 11 ||
                              values.chapter3Status == 12 ||
                              values.chapter3Status == 13 ? (
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
                                      <span>
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
                                                onClick={() =>
                                                  setToolInfo("name")
                                                }
                                              >
                                                <Typography
                                                  style={{
                                                    cursor: "pointer",
                                                    textDecorationLine:
                                                      "underline",
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
                                            Please enter the first and last name
                                            of the person who is required or has
                                            been requested to submit an
                                            information return.
                                          </Typography>
                                          <Typography
                                            style={{
                                              marginTop: "10px",
                                              fontWeight: "550",
                                            }}
                                          >
                                            Specific instructions for U.S.
                                            individuals and sole proprietors:
                                            U.S. individuals:
                                          </Typography>
                                          <Typography
                                            style={{ marginTop: "10px" }}
                                          >
                                            If you are an{" "}
                                            <span style={{ fontWeight: "550" }}>
                                              individual
                                            </span>
                                            , you must enter the name shown on
                                            your income tax return. However, if
                                            you have changed your last name, for
                                            instance, due to marriage without
                                            informing the Social Security
                                            Administration of the name change,
                                            enter your first name, the last name
                                            shown on your social security card,
                                            and your new last name. In certain
                                            situations we may need to contact
                                            you for further verification.
                                          </Typography>
                                          <Typography
                                            style={{ marginTop: "10px" }}
                                          >
                                            <span style={{ fontWeight: "550" }}>
                                              Joint names:
                                            </span>
                                            If the account is in joint names,
                                            both parties will need to submit
                                            separate submissions.
                                          </Typography>
                                          <Typography
                                            style={{ marginTop: "10px" }}
                                          >
                                            <span style={{ fontWeight: "550" }}>
                                              {" "}
                                              Sole proprietor:
                                            </span>
                                            Enter your individual name as shown
                                            on your income tax return on the
                                            'Name' line. You may enter your
                                            business, trade, or 'doing business
                                            as (DBA)' name on the 'Business
                                            name' line.
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
                                        error={Boolean(
                                          touched.businessName && errors.businessName
                                        )}
                                        name="businessName"
                                        // className="inputClassFull"
                                        value={values.businessName}
                                      />
                                    </FormControl>
                                    <p className="error">
                                      {typeof (errors.businessName) == "string" && touched.businessName ? errors.businessName : <></>}
                                    </p>
                                  </div>
                                  <div
                                    className="col-6  "
                                    style={{ marginLeft: "10px" }}
                                  >
                                    <Typography
                                      align="left"
                                      className="d-flex w-60 "
                                      style={{ fontSize: "13px" }}
                                    >
                                      Business Name or disregarded entity name
                                      if different:
                                    </Typography>

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="businessDisgradedEntity"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={
                                          touched.businessDisgradedEntity && errors.businessDisgradedEntity
                                        }
                                        error={Boolean(
                                          touched.businessDisgradedEntity && errors.businessDisgradedEntity
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

                                      <FormControl className="w-50" error={Boolean(
                                        touched.businessName && errors.businessName
                                      )}>
                                        <select
                                          name="countryOfIncorporation"
                                          value={values.countryOfIncorporation}
                                          onChange={handleChange}
                                          autoComplete="countryOfIncorporation"
                                          // placeholder="Business Name"
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
                                          <option value={0}>---</option>
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
                                      <p className="error">
                                        {touched.countryOfIncorporation ? errors.countryOfIncorporation : ""}
                                      </p>
                                    </div>

                                    {values.countryOfIncorporation == 186 ? (
                                      <div className=" col-12">
                                        <Typography
                                          align="left"
                                          className="d-flex w-60 "
                                          style={{
                                            fontSize: "13px",
                                            marginTop: "15px",
                                          }}
                                        >
                                          Other Country of incorporation /
                                          organization:
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </Typography>

                                        <FormControl className="w-50">
                                          <TextField
                                            name="other"
                                            value={values.other}
                                            onChange={handleChange}
                                            style={{
                                              color: "#121112",
                                              fontStyle: "italic",
                                              height: "39px",
                                            }}
                                          />
                                        </FormControl>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </>
                              </>
                            ) : (
                              ""
                            )}

                            {values.chapter3Status == 2 ||
                              values.chapter3Status == 3 ||
                              values.chapter3Status == 4 ||
                              values.chapter3Status == 5 ? (
                              <>
                                <>
                                  <div
                                    style={{
                                      marginTop: "20px",
                                      display: "flex",
                                    }}
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
                                        <span>
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
                                                  onClick={() =>
                                                    setToolInfo("name")
                                                  }
                                                >
                                                  <Typography
                                                    style={{
                                                      cursor: "pointer",
                                                      textDecorationLine:
                                                        "underline",
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
                                              Please enter the first and last
                                              name of the person who is required
                                              or has been requested to submit an
                                              information return.
                                            </Typography>
                                            <Typography
                                              style={{
                                                marginTop: "10px",
                                                fontWeight: "550",
                                              }}
                                            >
                                              Specific instructions for U.S.
                                              individuals and sole proprietors:
                                              U.S. individuals:
                                            </Typography>
                                            <Typography
                                              style={{ marginTop: "10px" }}
                                            >
                                              If you are an{" "}
                                              <span
                                                style={{ fontWeight: "550" }}
                                              >
                                                individual
                                              </span>
                                              , you must enter the name shown on
                                              your income tax return. However,
                                              if you have changed your last
                                              name, for instance, due to
                                              marriage without informing the
                                              Social Security Administration of
                                              the name change, enter your first
                                              name, the last name shown on your
                                              social security card, and your new
                                              last name. In certain situations
                                              we may need to contact you for
                                              further verification.
                                            </Typography>
                                            <Typography
                                              style={{ marginTop: "10px" }}
                                            >
                                              <span
                                                style={{ fontWeight: "550" }}
                                              >
                                                Joint names:
                                              </span>
                                              If the account is in joint names,
                                              both parties will need to submit
                                              separate submissions.
                                            </Typography>
                                            <Typography
                                              style={{ marginTop: "10px" }}
                                            >
                                              <span
                                                style={{ fontWeight: "550" }}
                                              >
                                                {" "}
                                                Sole proprietor:
                                              </span>
                                              Enter your individual name as
                                              shown on your income tax return on
                                              the 'Name' line. You may enter
                                              your business, trade, or 'doing
                                              business as (DBA)' name on the
                                              'Business name' line.
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
                                      className="col-6  "
                                      style={{ marginLeft: "10px" }}
                                    >
                                      <Typography
                                        align="left"
                                        className="d-flex w-60 "
                                        style={{ fontSize: "13px" }}
                                      >
                                        Business Name or disregarded entity name
                                        if different:
                                      </Typography>

                                      <FormControl className="w-100">
                                        <TextField
                                          autoComplete="businessDisgradedEntity"
                                          type="text"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          helperText={
                                            touched.businessDisgradedEntity && errors.businessDisgradedEntity
                                          }
                                          error={Boolean(
                                            touched.businessDisgradedEntity && errors.businessDisgradedEntity
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
                                          Country of incorporation /
                                          organization:
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </Typography>

                                        <FormControl className="w-50">
                                          <select
                                            name="countryOfIncorporation"
                                            value={values.countryOfIncorporation}
                                            onChange={handleChange}
                                            autoComplete="countryOfIncorporation"
                                            // placeholder="Business Name"
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
                                            <option value={258}>
                                              United States
                                            </option>
                                            <option value={0}>---</option>
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

                                <div>
                                  <Typography
                                    className="mt-3"
                                    style={{
                                      fontSize: "15px",
                                    }}
                                  >
                                    Hybrid status:
                                  </Typography>
                                  <FormControl>
                                    <RadioGroup
                                      row
                                      defaultValue="Not"
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      name="isHybridStatus"
                                      value={values.isHybridStatus}
                                      onChange={handleChange}
                                      id="isHybridStatus"
                                    >
                                      <FormControlLabel
                                        control={<Radio />}
                                        value="1"
                                        name="isHybridStatus"
                                        label="Hybrid"
                                      />
                                      <FormControlLabel
                                        control={<Radio />}
                                        value="2"
                                        name="isHybridStatus"
                                        label="Reverse Hybrid"
                                      />
                                      <FormControlLabel
                                        control={<Radio />}
                                        value="3"
                                        name="isHybridStatus"
                                        label="Not Applicable"
                                      />
                                    </RadioGroup>
                                    <p className="error">
                                      {errors.isHybridStatus}
                                    </p>
                                  </FormControl>
                                </div>

                                <div className="mt-2">
                                  <Typography
                                    style={{
                                      fontSize: "15px",
                                    }}
                                  >
                                    Please provide a description of your hybrid
                                    status and if applicable attach additional
                                    information to substantiate your statement
                                    for United States tax purposes.
                                  </Typography>
                                  <FormControl className="w-100 textfield1">
                                    <TextField className="textfield1" name="descriptionHybridStatus" value={values.descriptionHybridStatus} onChange={handleChange} />
                                  </FormControl>
                                  <div className="d-flex mt-3 ">
                                    <Typography
                                      className="mx-2"
                                      style={{
                                        fontSize: "15px",
                                      }}
                                    >
                                      Attach supporting documentation:
                                    </Typography>
                                    <input
                                      type="file"
                                      name="attachSupportingDocumentFile"
                                      onChange={handleFileChange}
                                      //defaultValue={values.attachSupportingDocumentFile}
                                      style={{ fontSize: "12px" }}
                                    />
                                  </div>
                                  {values.isHybridStatus == 3 ?
                                    (
                                      <div className="mt-2">
                                        <Typography
                                          style={{
                                            fontSize: "15px",
                                          }}
                                        >
                                          Is this submission being made on behalf of
                                          a disregarded entity that has a Single
                                          U.S. Owner?
                                        </Typography>
                                        <FormControl>
                                          <RadioGroup
                                            row
                                            defaultValue="no"
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="isSubmissionSingleUSOwner"
                                            value={values.isSubmissionSingleUSOwner}
                                            onChange={handleChange}
                                          >
                                            <FormControlLabel
                                              control={<Radio />}
                                              value="yes"
                                              name="isSubmissionSingleUSOwner"
                                              label="Yes"
                                            />
                                            <FormControlLabel
                                              control={<Radio />}
                                              value="no"
                                              name="isSubmissionSingleUSOwner"
                                              label="No"
                                            />
                                          </RadioGroup>
                                          <p className="error">
                                            {/* {errors.isDisRegardedSection1446} */}
                                          </p>
                                        </FormControl>
                                      </div>
                                    )
                                    : ("")}

                                  {values.isSubmissionSingleUSOwner == "yes" ? (
                                    <div>
                                      <Typography
                                        style={{
                                          fontSize: "15px",
                                        }}
                                      >
                                        Are you considered disregarded for
                                        purposes of Section 1446?
                                      </Typography>
                                      <FormControl>
                                        <RadioGroup
                                          row
                                          defaultValue="no"
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          name="isDisRegardedSection1446"
                                          //   value={values.isDisRegardedSection1446}
                                          onChange={handleChange}
                                          id="isDisRegardedSection1446"
                                        >
                                          <FormControlLabel
                                            control={<Radio />}
                                            value="yes"
                                            name="isDisRegardedSection1446"
                                            label="Yes"
                                          />
                                          <FormControlLabel
                                            control={<Radio />}
                                            value="no"
                                            name="isDisRegardedSection1446"
                                            label="No"
                                          />
                                        </RadioGroup>
                                        <p className="error">
                                          {/* {errors.isDisRegardedSection1446} */}
                                        </p>
                                      </FormControl>
                                    </div>
                                  ) : values.isSubmissionSingleUSOwner == "no" ? (
                                    ""
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </Typography>
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
                                style={{ fontSize: "20px", color: "blue" }}
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
                                  </Typography>

                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                   1. Do you wish to apply for reduced rates of withholding that may apply if the country of your permanent establishment has an applicable tax treaty in place with the United States?

                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    2. Are applying for an exemption from U.S. tax obligations?

                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                   3. Income derived effectively connected with the conduct of trade or business within the U.S.

                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "30px",
                                      
                                    }}
                                  >
                                    Select "Confirm" and you will be taken to the first of a series of questions. Depending on your response you may be asked further questions or taken to the next stage in the process.
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "30px",
                                      
                                    }}
                                  >
                                    We are not allowed nor aim to provide tax advice through this process. This tool is provided to take you through a process and help you determine which form is most appropriate for you to submit.
 
                                  </Typography>

                                  <Typography
                                    align="left"
                                    style={{
                                      marginTop: "30px",
                                      fontWeight: "bold",
                                    }}
                                  >
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
                                   Individual
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography align="left">
                                  Chapter 3 Classification - Individual       
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                  An individual is a single person who is not connected to an Business or Organisation and would be declaring only personal income.
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
                          {/* <Button
                            variant="contained"
                            style={{ color: "white" }}
                            onClick={() => {
                              validateForm().then((err) => {
                                if (Object.keys(err).length == 0) {
                                  submitForm().then((data) => {
                                    history(GlobalValues.basePageRoute);
                                  }).catch((error) => {
                                    console.log(error);
                                  })
                                }
                              });

                            }}
                          >
                            SAVE & EXIT
                          </Button> */}
                          <SaveAndExit Callback={() => {
                            submitForm().then(() => {
                              const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                              const urlValue = window.location.pathname.substring(1);
                              dispatch(postW8ECI_EForm(
                                {
                                  ...prevStepData,
                                  stepName: `/${urlValue}`
                                }
                                , () => { }))
                              history(
                                GlobalValues.basePageRoute
                              );
                            })
                          }} formTypeId={FormTypeId.W8ECI} />

                          <Button
                            //type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            style={{ color: "white", marginLeft: "15px" }}
                            onClick={() => {
                              dispatch(GetEciPdf(authDetails?.accountHolderId, (callbackData:any)=>{
                                setPopupState({
                                    status:true,
                                    data: callbackData?.pdf
                                })
                            }))
                        }}
                          >
                            View Form
                          </Button>
                          <Button
                            type="submit"
                            disabled={!isValid}
                            variant="contained"
                            style={{ color: "white", marginLeft: "15px" }}
                            onClick={() => {
                              validateForm().then((err) => {
                                if (Object.keys(err).length == 0) {
                                  submitForm().then((data) => {
                                    Redirect("/W-8ECI/Tax_Payer",authDetails?.agentId,history,false)
                                  }).catch((error) => {
                                    console.log(error);
                                  })
                                }

                              })

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
                              history("/W-8ECI/Info");
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
        <PopupModal data={popupState} setPopupState={setPopupState} />
      </section>
    </>
  );
}
