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
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import "./index.scss";
import Infoicon from "../../../assets/img/info.png";
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
  getAllStateByCountryId,
  postW8ECI_EForm,
} from "../../../Redux/Actions";
import { TaxPurposeSchema } from "../../../schemas/w8ECI";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import useAuth from "../../../customHooks/useAuth";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import { GetEciPdf } from "../../../Redux/Actions/PfdActions";
import Redirect from "../../../Router/RouterSkip";
import PopupModal from "../../../Redux/Actions/poupModal";
export default function Fedral_tax(props: any) {
  const dispatch = useDispatch();
  const {
    handleTaxClassificationChange,
    // selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;

  const { authDetails } = useAuth();
  const W8ECI = useSelector((state: any) => state.W8ECI);
  const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");
  const [IsIndividual, setIsIndividual] = useState(obValues?.businessTypeId == 1);
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const [selectedfile, setSelectedFile] = useState<any>(null);

  const initialValue = {
    businessName: W8ECI?.entityName ?? obValues?.entityName,
    businessDisgradedEntity:
      W8ECI?.businessDisgradedEntity ?? obValues?.businessDisgradedEntity,
    countryOfIncorporation:
      W8ECI?.countryOfIncorporation ?? obValues?.foreignTINCountryId,
    chapter3Status: W8ECI?.chapter3Status ?? 0,
    firstName: W8ECI?.firstName ?? obValues?.firstName ?? "",
    lastName: W8ECI?.lastName ?? obValues?.lastName ?? "",
    isSubmissionSingleUSOwner: W8ECI?.isSubmissionSingleUSOwner === true ? "yes" : "no" ?? "",
    descriptionHybridStatus: W8ECI?.descriptionHybridStatus ?? "",
    attachSupportingDocument: W8ECI?.attachSupportingDocument ?? "",
    attachSupportingDocumentFile: W8ECI?.attachSupportingDocumentFile ?? "",
    isDisRegardedSection1446: W8ECI?.isDisRegardedSection1446 === true ? "yes" : "no" ?? "",
    isHybridStatus: W8ECI?.isHybridStatus ?? "",
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

  const [popupState, setPopupState] = useState({
    data:"",
    status:false
})

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllCountriesCode());
    dispatch(getAllCountriesIncomeCode());
    // dispatch(getAllStateByCountryId())
    dispatch(GetHelpVideoDetails());
    dispatch(GetChapter3Status(FormTypeId.W8ECI));
  }, []);
  const viewPdf = () => {
    history("/w8Eci_pdf", { replace: true });
  }

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
        className="inner_content"
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
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default anchor behavior
                    window.open(
                      GethelpData[5].fieldValue,
                      "popupWindow",
                      `width=${GethelpData[5].width},height=${GethelpData[5].height},top=${GethelpData[5].top},left=${GethelpData[5].left}`
                    )
                  }
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
              <BreadCrumbComponent breadCrumbCode={1203} formName={4} />
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
                    TaxPurposeSchema(IsIndividual)
                  }
                  onSubmit={(values, { setSubmitting }) => {
                    let temp = {
                      ...PrevStepData,
                      ...values,
                      isSubmissionSingleUSOwner: values.isSubmissionSingleUSOwner === "yes",
                      isDisRegardedSection1446: values.isDisRegardedSection1446 === "yes",
                      attachSupportingDocumentFile: selectedfile,
                      isHybridStatus: Number.parseInt(values.isHybridStatus) ?? 3,
                      agentId: authDetails?.agentId,
                      accountHolderBasicDetailId: authDetails?.accountHolderId,
                    };
                    setSubmitting(true);
                    const returnPromise = new Promise((resolve, reject) => {
                      dispatch(
                        postW8ECI_EForm(
                          temp,
                          (data: any) => {
                            resolve(data);
                            localStorage.setItem(
                              "PrevStepData",
                              JSON.stringify(temp)
                            );
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
                                        Country of incorporation is different from
                                        the PRA country.
                                      </span>
                                    </Typography>
                                  </div>
                                ) : (
                                  ""
                                )}
                            {values.isHybridStatus == "Not" &&
                              clickCount === 1 ? (
                              <div
                                style={{
                                  backgroundColor: "#e8e1e1",
                                  padding: "10px",
                                }}
                              >
                                <Typography>
                                  HYB109
                                  <span className="mx-1">
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
                                    You have selected the type of beneficial
                                    owner is a Partnership, but have not
                                    selected "Hybrid Status". The beneficial
                                    owner may qualify for a reduced rate of
                                    withholding under an income tax treaty when
                                    it has Hybrid entity status.
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
                                    onChange={handleChange}
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

                                    {GetChapter3StatusReducer.GetChapter3StatusData?.filter((x: any) => (x?.name.toLowerCase() == "individual") == IsIndividual).map(
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
                            {values.chapter3Status == 20 ?
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
                                      First Name:
                                      <span style={{ color: "red" }}>*</span>

                                    </Typography>

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="firstName"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        sx={{ backgroundColor: "#e9ecef" }}
                                        type="text"
                                        onChange={handleChange}
                                        error={Boolean(
                                          touched.firstName &&
                                          errors.firstName
                                        )}
                                        name="firstName"
                                        className="inputClassFull"
                                        value={values.firstName}
                                      />
                                    </FormControl>
                                  </div>
                                  <div
                                    className="col-lg-6 col-md-6 col-sm-12"
                                  // style={{ marginLeft: "10px" }}
                                  >
                                    <Typography
                                      align="left"
                                      className="d-flex w-60 "
                                      style={{ fontSize: "13px" }}
                                    >
                                      Last Name:
                                      {/* <span style={{ color: "red" }}>*</span> */}
                                    </Typography>

                                    <FormControl className="w-100">
                                      <TextField
                                        autoComplete="lastName"
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
                                          touched.lastName &&
                                          errors.lastName
                                        )}
                                        name="lastName"
                                        value={values.lastName}
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
                                          onChange={handleChange}
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
                              </> : <></>}
                            {
                              values.chapter3Status == 1 ||
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
                                    // style={{ marginLeft: "10px" }}
                                    >
                                      <Typography
                                        align="left"
                                        className="d-flex w-60 "
                                        style={{ fontSize: "13px" }}
                                      >
                                        Business Name or disregarded entity name if different:
                                        {/* <span style={{ color: "red" }}>*</span> */}
                                      </Typography>

                                      <FormControl className="w-100">
                                        <TextField
                                          autoComplete="businessDisgradedEntity"
                                          type="text"
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
                                            onChange={handleChange}
                                            autoComplete="countryOfIncorporation"
                                            // placeholder="Business Name"
                                            // onBlur={handleBlur}
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

                                      </Typography>


                                      <FormControl className="w-100">
                                        <TextField
                                          autoComplete="businessName"
                                          type="text"
                                          onChange={handleChange}
                                          // onBlur={handleBlur}
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
                                          Country of incorporation /
                                          organization:
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </Typography>

                                        <FormControl className="w-50">
                                          <select
                                            name="countryOfIncorporation"
                                            value={
                                              values.countryOfIncorporation
                                            }
                                            onChange={handleChange}
                                            autoComplete="countryOfIncorporation"
                                            // onBlur={handleBlur}
                                            style={{
                                              padding: " 0 10px",
                                              color: "#121112",
                                              fontStyle: "italic",
                                              height: "39px",
                                            }}
                                          >
                                            <option value="">---select---</option>
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
                                      defaultValue="3"
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
                                      {errors.isHybridStatus?.toString()}
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
                                    <TextField
                                      className="textfield1"
                                      name="descriptionHybridStatus"
                                      value={values.descriptionHybridStatus}
                                      onChange={handleChange}
                                    />
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
                                      style={{ fontSize: "12px" }}
                                    />
                                    {selectedfile?.name}
                                  </div>
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
                                        defaultValue="No"
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
                                        {/* {errors.isHybridStatus} */}
                                      </p>
                                    </FormControl>
                                  </div>
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
                                          defaultValue="No"
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          name="isDisRegardedSection1446"
                                          value={
                                            values.isDisRegardedSection1446
                                          }
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
                                          {/* {errors.isHybridStatus} */}
                                        </p>
                                      </FormControl>
                                    </div>
                                  ) : values.isSubmissionSingleUSOwner ==
                                    "no" ? (
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
                                    postW8ECI_EForm(
                                      {
                                        ...prevStepData,
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
                            formTypeId={FormTypeId.W8ECI}
                          >
                          </SaveAndExit>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            onClick={() => {
                              dispatch(GetEciPdf(authDetails?.accountHolderId, (callbackData:any)=>{
                                setPopupState({
                                    status:true,
                                    data: callbackData?.pdf
                                })
                            }))
                        }}
                            style={{ color: "white", marginLeft: "15px" }}
                          >
                            View Form
                          </Button>
                          <Button
                            //type="submit"
                            disabled={!isValid}
                            variant="contained"
                            style={{ color: "white", marginLeft: "15px" }}
                            onClick={() => {
                              submitForm().then((data) => {
                                console.log(data)
                                // history("/W-8ECI/Tax_Payer");
                                Redirect("/W-8ECI/Tax_Payer",authDetails?.agentId,history,false)
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
                              // history("/W-8ECI/Info");
                              Redirect("/W-8ECI/Info", authDetails?.agentId, history, true);
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
      </section >
    </>
  );
}
