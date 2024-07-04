import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  Accordion,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Link,
  Checkbox,
  RadioGroup,
  Radio,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Info, Delete } from "@mui/icons-material";
import { Formik, Form } from "formik";
import checksolid from "../../../assets/img/check-solid.png";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { TaxPayerSchema } from "../../../../schemas/w8ECI";
import { GetHelpVideoDetails, W8_state_ECI, getAllCountries, getTinTypes, PostDualCert } from "../../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import CloseIcon from '@mui/icons-material/Close';
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import useAuth from "../../../../customHooks/useAuth";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import { GetECIDCPdf } from "../../../../Redux/Actions/PfdActions";
// import { GetEciPdf } from "../../../Redux/Actions/PfdActions";
export default function Tin(props: any) {

  const { authDetails } = useAuth();
  const obValues = JSON.parse(localStorage.getItem("agentDetails") || '{}')
  const isIndividual = obValues?.businessTypeId == 1;
  const isEntity = obValues?.businessTypeId == 2;
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const W8ECIData = useSelector((state: any) => state.W8ECI);
  const LoadData = () => {
    const temp = {
      ...initialValue,
      // ...W8ECIData,
      usTinTypeId: W8ECIData?.usTinTypeId?.toString() ?? obValues.taxpayerIdTypeID?.toString() ?? "",
      usTin: W8ECIData?.usTin ?? obValues?.usTin,
      notAvailable: W8ECIData?.notAvailable ? W8ECIData?.notAvailable : false,
      notAvailableReason: W8ECIData?.notAvailableReason ?? "",
      foreignTINCountry: W8ECIData?.foreignTINCountry ?? obValues?.foreignTINCountryId ?? obValues.permanentResidentialCountryId,
      foreignTIN: W8ECIData?.foreignTIN ?? "",
      isFTINLegally: W8ECIData?.isFTINLegally ? W8ECIData?.isFTINLegally : false,
      isNotAvailable: W8ECIData?.isNotAvailable ? "Yes" : W8ECIData?.alternativeTINFormat ? "No" : "",
      fTinNotAvailableReason: W8ECIData?.fTinNotAvailableReason ?? "",
      alternativeTINFormat: W8ECIData?.alternativeTINFormat ?? "",
      isExplanationNotLegallyFTIN: W8ECIData?.isExplanationNotLegallyFTIN === true ? "Yes" : "No" ?? "",
      stepName: null
    }
    setInitialValues(temp);
  }

  useEffect(() => {
    document.title = "Tax-Payer"
  }, []);


  useEffect(() => {
    dispatch(GetHelpVideoDetails());
    dispatch(getAllCountries());
  }, []);

  useEffect(() => {
    dispatch(
      getTinTypes(authDetails?.agentId, (data: any) => {
        setUStinArray(data)
        let datas = data.filter((ele: any) => { return isIndividual ? ele.nonUSIndividual === true : isEntity ? ele.nonUSEntity == true : false })
        setUStinvalue(datas);
        LoadData();
      })
    );

  }, [authDetails])

  // const initialValue = {
  //   usTinTypeId: obValues.usTinTypeId,
  //   usTin: obValues.usTin,
  //   tinValue:"",
  //   notAvailable: false,
  //   foreignTINCountry: obValues.foreignTINCountryId,
  //   foreignTIN: "",
  //   isFTINLegally: false,
  //   isNotAvailable: "Yes",
  //   // tinAlternativeFormate: true,
  //   isExplanationNotLegallyFTIN: "",
  // };
  const [initialValue, setInitialValues] = useState({
    usTinTypeId: obValues.taxpayerIdTypeID?.toString() || PrevStepData?.usTinTypeId,
    usTin: obValues.usTin || PrevStepData?.usTin,
    tinValue: "",
    notAvailable: false,
    notAvailableReason: "",
    foreignTINCountry: 0,
    foreignTIN: "",
    isNotAvailable: "",
    isFTINLegally: false,
    fTinNotAvailableReason: "",
    alternativeTINFormat: "",
    isExplanationNotLegallyFTIN: "",
    stepName: null
  });


  const history = useNavigate();
  const dispatch = useDispatch();
  const [tax, setTax] = useState<string>("");
  const viewPdf = () => {
    history("/w8Eci_pdf", { replace: true });
  }
  const handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTax(event.target.value);
  };
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [ustinValue, setUStinvalue] = useState([]);
  const [ustinArray, setUStinArray] = useState([]);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );

  const onBoardingFormValues = JSON.parse(
    localStorage.getItem("agentDetails") ?? "null"
  );

  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );

  function getUStinValue() {
    let val: string = ""
    ustinValue.filter((item: any) => {
      if (item?.taxpayerIdTypeID ==
        onBoardingFormValues?.usTinTypeId) {
        val = item.taxpayerIdTypeName
      }
    })
    return val;
  }
  const [toolInfo, setToolInfo] = useState("");
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
                dispatch(GetECIDCPdf(authDetails?.accountHolderId))
              }}>View Form</div>
            <div className="helpvideo">
              {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
              {GethelpData && GethelpData[5].id === 7 ? (
                <a
                  href={GethelpData[5].fieldValue}
                  target="_self"
                  onClick={() =>
                    (
                      GethelpData[5].fieldValue,
                      'name',
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
            <div
              style={{ padding: "20px 0px", height: "100%" }}
            >
             {obValues?.businessTypeId == 2?( <BreadCrumbComponent breadCrumbCode={1230} formName={16} />):
             
             <BreadCrumbComponent breadCrumbCode={1230} formName={15} />
             }
            </div>
          </div>
          <div className="col-8 mt-3">
            <div style={{ padding: "13px" }}>
              <Paper style={{ padding: "11px" }}>
                <Formik
                  validateOnChange={true}
                  enableReinitialize
                  validateOnMount={true}
                  validateOnBlur={false}
                  initialValues={initialValue}
                  validationSchema={TaxPayerSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    const temp = {
                      // ...PrevStepData,
                      ...values,
                      id: 0,
                      FormTypeID: FormTypeId.W8ECI,
                      agentId: authDetails?.agentId,

                      AccountHolderDetailsId: authDetails?.accountHolderId,
                      isNotAvailable: values.isNotAvailable === "Yes",
                      alternativeTINFormat: values.isNotAvailable === "No",
                      isExplanationNotLegallyFTIN: values.isExplanationNotLegallyFTIN == "Yes",
                      stepName: null,
                    };
                    const returnPromise = new Promise((resolve, reject) => {
                      dispatch(
                        PostDualCert([temp],
                          (responseData: any) => {
                            localStorage.setItem("DualCertData", JSON.stringify(temp));
                            resolve(responseData);
                          },
                          (err: any) => {
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
                    isValid,
                    submitForm,
                    setFieldValue
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <>{console.log("values", values)}</>
                      <>{console.log("errors", errors)}</>
                      {toolInfo === "ForeignTin" ? (
                        <div className="mt-5">
                          <Paper
                            style={{ backgroundColor: "#d1ecf1", padding: "15px" }}
                          >
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                              <Typography style={{ color: "#0c5460" }}>
                                United Kingdom TIN Format is 9999999999 false <br /> 9- Numeric value only <br /> A- Alphabetic character only <br /> *- Alphanumeric character only <br /> ?- Characters optional after this <br /> IF TIN format is not available, please check the below box and continue
                              </Typography>
                              <Typography>
                                <CloseIcon style={{ color: "#0c5460", cursor: "pointer", fontSize: "medium" }} onClick={() => {
                                  setToolInfo("");
                                }} />
                              </Typography>
                            </div>
                          </Paper>
                        </div>
                      ) : (
                        ""
                      )}
                      <>{console.log(errors, values)}</>
                      <Typography
                        align="left"
                        style={{
                          margin: "10px",
                          fontSize: "27px",
                          fontWeight: "550",
                        }}
                      >
                        Taxpayer Identification Number SelfCert
                      </Typography>

                      <div>
                        {values.notAvailable === true ? (

                          <div
                            style={{
                              margin: "10px",
                              display: "flex",
                              marginTop: "25px",
                            }}
                            className="row"
                          >
                            <div className="col-lg-5 col-12">
                              <Typography style={{ fontSize: "14px" }}>
                                U.S. TIN Type<span style={{ color: "red" }}>*</span>
                                <span>
                                  <Tooltip
                                    style={{
                                      backgroundColor: "black",
                                      color: "white",
                                    }}
                                    title={
                                      <>
                                        <Typography color="inherit">
                                          U.S. TIN Type Info
                                        </Typography>
                                        <a onClick={() => setToolInfo("basic")}>
                                          <Typography
                                            style={{
                                              cursor: "pointer",
                                              textDecorationLine: "underline",
                                            }}
                                            align="center"
                                          >
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
                                      Please select a U.S. TIN type status from the
                                      dropdown.
                                    </Typography>

                                    <Typography style={{ marginTop: "10px" }}>
                                      If a TIN type is not available, ensure you
                                      select the checkbox to the right of the field
                                      and provide an explanation as to why it is not
                                      available in the corresponding boxes at the
                                      bottom of the screen.
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
                              <select
                                disabled
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "40px",
                                  width: "100%",
                                }}
                                name="usTinTypeId"
                                id="Income"

                                defaultValue={1}
                                onBlur={handleBlur}
                                value={values.usTinTypeId}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              >
                                <option value="1">U.S. TIN not available</option>
                                {/* {ustinValue?.map((ele: any) => (
                                  // ele?.nonUSIndividual &&
                                  //   values?.isUSIndividual == "no" ||
                                  // ele?.usIndividual &&
                                  //   values?.isUSIndividual == "Yes" ?
                                  // (
                                  <option
                                    key={ele?.taxpayerIdTypeID}
                                    value={ele?.taxpayerIdTypeID}
                                  >
                                    {ele?.taxpayerIdTypeName}
                                  </option>
                                  // ) : (
                                  //   ""
                                  // );
                                ))} */}
                              </select>
                              {/* <p className="error">{errors.usTinTypeId}</p> */}
                            </div>

                            <div className="col-lg-5 col-12">
                              <Typography style={{ fontSize: "14px" }}>U.S. TIN</Typography>
                              <Input
                                disabled
                                fullWidth

                                placeholder="ENTER US TIN"
                                defaultValue="ENTER US TIN"
                                value={values.tinValue}
                                // onBlur={handleBlur}
                                onChange={(e: any) => {
                                  handleChange(e);


                                  setFieldValue("", "");
                                }}

                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "40px",
                                  width: "100%",

                                }}
                              />
                              {values.notAvailable ? (
                                ""
                              ) :
                                // <p className="error">{errors.usTin}</p>
                                " "
                              }
                            </div>
                            <div className="col-lg-2 ">
                              <div className="radio" style={{ marginTop: "17px" }}>
                                <Checkbox
                                  value={values.notAvailable}
                                  checked={values.notAvailable}
                                  onChange={handleChange}
                                  size="medium"
                                  name="notAvailable"
                                />
                                <span style={{ fontSize: "12px" }}>
                                  Not Available
                                  {errors.notAvailable && touched.notAvailable ? (
                                    <div>
                                      <Typography color="error">
                                        {errors.notAvailable}
                                      </Typography>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>) :

                          <div
                            style={{
                              margin: "10px",
                              display: "flex",
                              marginTop: "25px",
                            }}
                            className="row"
                          >
                            <div className="col-lg-5 col-12">
                              <Typography style={{ fontSize: "14px" }}>
                                U.S. TIN Type<span style={{ color: "red" }}>*</span>
                                <span>
                                  <Tooltip
                                    style={{
                                      backgroundColor: "black",
                                      color: "white",
                                    }}
                                    title={
                                      <>
                                        <Typography color="inherit">
                                          U.S. TIN Type Info
                                        </Typography>
                                        <a onClick={() => setToolInfo("basic")}>
                                          <Typography
                                            style={{
                                              cursor: "pointer",
                                              textDecorationLine: "underline",
                                            }}
                                            align="center"
                                          >
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
                                      Please select a U.S. TIN type status from the
                                      dropdown.
                                    </Typography>

                                    <Typography style={{ marginTop: "10px" }}>
                                      If a TIN type is not available, ensure you
                                      select the checkbox to the right of the field
                                      and provide an explanation as to why it is not
                                      available in the corresponding boxes at the
                                      bottom of the screen.
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
                              <select
                                disabled={values.notAvailable}
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "40px",
                                  width: "100%",
                                }}
                                name="usTinTypeId"
                                id="Income"
                                defaultValue={"0"}
                                onBlur={handleBlur}
                                value={values.usTinTypeId}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              >
                                <option value="0">---select---</option>
                                {ustinValue?.map((ele: any) => (

                                  <option
                                    key={ele?.taxpayerIdTypeID}
                                    value={ele?.taxpayerIdTypeID}
                                  >
                                    {ele?.taxpayerIdTypeName}
                                  </option>
                                ))}
                                {getUStinValue()}
                              </select>
                              {/* <p className="error">{errors.usTinTypeId}</p> */}
                            </div>

                            <div className="col-lg-5 col-12">
                              <Typography style={{ fontSize: "14px" }}>U.S. TIN</Typography>
                              <Input
                                disabled={values.notAvailable}
                                fullWidth
                                type="text"
                                name="usTin"
                                value={values.usTin}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.usTin && errors.usTin)}
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#7e7e7e",
                                  fontStyle: "italic",
                                  height: "40px",
                                  width: "100%",
                                }}
                              />
                              {values.notAvailable ? (
                                ""
                              ) :
                                // <p className="error">{errors.usTin}</p>
                                " "
                              }
                            </div>
                            <div className="col-lg-2 ">
                              <div className="radio" style={{ marginTop: "17px" }}>
                                <Checkbox
                                  value={values.notAvailable}
                                  checked={values.notAvailable}
                                  onChange={handleChange}
                                  size="medium"
                                  name="notAvailable"
                                />
                                <span style={{ fontSize: "12px" }}>
                                  Not Available
                                  {errors.notAvailable && touched.notAvailable ? (
                                    <div>
                                      <Typography color="error">
                                        {errors.notAvailable}
                                      </Typography>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        }

                        <div
                          style={{
                            margin: "10px",
                            display: "flex",
                            marginTop: "25px",
                          }}
                          className="row"
                        >
                          <div className="col-lg-5">
                            <Typography style={{ fontSize: "14px" }}>
                              Foreign TIN Country
                              <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <select
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#121112",
                                fontStyle: "italic",
                                height: "40px",
                                width: "100%",
                              }}
                              name="foreignTINCountry"
                              id="Income"
                              onBlur={handleBlur}
                              value={values.foreignTINCountry}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            >
                              <option value={0}>---select---</option>
                              <option value={257}>United Kingdom</option>
                              {getCountriesReducer.allCountriesData?.map(
                                (ele: any) => (
                                  <option key={ele?.id} value={ele?.id}>
                                    {ele?.name}
                                  </option>
                                )
                              )}
                            </select>
                            {/* <p className="error">{errors.foreignTINCountry}</p> */}

                            <div style={{ marginTop: "2px" }}>
                              <Checkbox
                                value={values.isFTINLegally}
                                checked={values.isFTINLegally}
                                onChange={(e) => {
                                  handleChange(e);
                                  setTimeout(() => {
                                    setFieldValue("isNotAvailable", "")

                                    setFieldValue("foreignTIN", "");

                                  }, 50);
                                }}

                                size="medium"
                                name="isFTINLegally"
                              />
                              <span style={{ fontSize: "15px" }}>
                                Check if FTIN not legally required
                                {errors.isFTINLegally &&
                                  touched.isFTINLegally ? (
                                  <div>
                                    <Typography color="error">
                                      {errors.isFTINLegally}
                                    </Typography>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <span>
                                  <Tooltip
                                    style={{
                                      backgroundColor: "black",
                                      color: "white",
                                    }}
                                    title={
                                      <>
                                        <Typography color="inherit">
                                          FTIN not legally required
                                        </Typography>
                                        <a onClick={() => setToolInfo("require")}>
                                          <Typography
                                            style={{
                                              cursor: "pointer",
                                              textDecorationLine: "underline",
                                            }}
                                            align="center"
                                          >
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
                              </span>
                            </div>

                            {toolInfo === "require" ? (
                              <Paper
                                style={{
                                  backgroundColor: "#dedcb1",
                                  padding: "15px",
                                  marginBottom: "10px",
                                }}
                              >
                                <Typography>
                                  You may check the box on this line 6b (for Form
                                  W-8BEN), line 9c (for Form W-8BEN-E) or line 8b
                                  (For Form W-8ECI) if you are an account holder
                                  as described for purposes of line 6a (for Form
                                  W-8BEN), line 9b (for Form W-8BEN-E) or line 8a
                                  (for Form W-8ECI) and you are not legally
                                  required to obtain an FTIN from your
                                  jurisdiction of residence (including if the
                                  jurisdiction does not issue TINs). By checking
                                  this box, you will be treated as having provided
                                  an explanation for not providing an FTIN on line
                                  6a (W-8BEN), line 9b (W-8BEN-E), or line line 8a
                                  (W-8ECI). If you wish to provide a further (or
                                  other) explanation why you are not required to
                                  provide an FTIN, which appears on line 6a, 9b or
                                  8a (W-8BEN, W-8BEN-E or W-8ECI respectively),
                                  you will be able to enter this as part of the
                                  eForms process.
                                </Typography>
                                <Link
                                  href="#"
                                  underline="none"
                                  style={{ marginTop: "10px", fontSize: "16px", color: "#0000C7" }}
                                  onClick={() => {
                                    setToolInfo("");
                                  }}
                                >
                                  --Show Less--
                                </Link>
                              </Paper>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-lg-5 col-12">
                            <Typography style={{ fontSize: "14px" }}>
                              Foreign TIN{" "}
                              {values.foreignTINCountry == 257 ? (<span>  <Tooltip
                                style={{
                                  backgroundColor: "black",
                                  color: "white",

                                }}
                                title={
                                  <>

                                    <a onClick={() => setToolInfo("ForeignTin")}>

                                    </a>
                                  </>
                                }
                              >
                                <Info
                                  onClick={() => setToolInfo("ForeignTin")}
                                  style={{
                                    color: "#ffc107",
                                    fontSize: "15px",
                                    verticalAlign: "super",
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                />
                              </Tooltip></span>) : ""}
                            </Typography>

                            {values.isNotAvailable === "No" ? (
                              <Input
                                fullWidth
                                type="text"
                                disabled={
                                  values.isFTINLegally ||
                                  values.foreignTINCountry == 1



                                }
                                name="foreignTIN"
                                value={values.foreignTIN}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{ maxLength: 10 }}
                                placeholder="ENTER FOREIGN TIN"


                                error={Boolean(
                                  touched.foreignTIN && errors.foreignTIN
                                )}
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#7e7e7e",
                                  fontStyle: "italic",
                                  height: "40px",
                                  width: "100%",
                                }}
                              />
                            ) : (
                              <Input
                                fullWidth
                                type="text"
                                disabled={
                                  values.isFTINLegally ||
                                  values.foreignTINCountry == 1 ||
                                  values.isNotAvailable === "Yes"
                                }
                                placeholder="ENTER FOREIGN TIN"
                                name="foreignTIN"
                                value={values.foreignTIN}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(
                                  touched.foreignTIN && errors.foreignTIN
                                )}
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#7e7e7e",
                                  fontStyle: "italic",
                                  height: "40px",
                                  width: "100%",
                                }}
                              />
                            )}
                            {values.isFTINLegally ? (
                              ""
                            ) : (
                              // <p className="error">{errors.foreignTIN}</p>
                              ""
                            )}

                            <FormControl className="col-12 radio" >
                              <RadioGroup
                                row
                                name="isNotAvailable"
                                //aria-labelledby="demo-row-radio-buttons-group-label"
                                value={values?.isNotAvailable}
                                onChange={(e) => {
                                  handleChange(e);
                                  setTimeout(() => {
                                    setFieldValue("foreignTIN", "");
                                  }, 50);
                                }}
                              >
                                <FormControlLabel
                                  value="Yes"
                                  disabled={values.isFTINLegally}
                                  control={<Radio />}
                                  label="Not Available"
                                  name="isNotAvailable"
                                />
                                <FormControlLabel
                                  className="label"
                                  value="No"
                                  control={<Radio />}
                                  label="Alternative Tin Format"
                                  disabled={values.isFTINLegally}
                                  name="isNotAvailable"
                                />

                                {values.isNotAvailable === "Yes" ||
                                  values.isNotAvailable === "No" ? (
                                  <IconButton>
                                    <Delete
                                      onClick={() => {
                                        handleChange("isNotAvailable")(
                                          ""
                                        );
                                      }}
                                      style={{
                                        color: "red",
                                        fontSize: "20px",
                                        marginTop: "11px",

                                      }}
                                    />
                                  </IconButton>

                                ) : (
                                  ""
                                )}
                              </RadioGroup>

                              {errors.isNotAvailable &&
                                touched.isNotAvailable ? (
                                <div>
                                  <Typography color="error">
                                    {errors.isNotAvailable}
                                  </Typography>
                                </div>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      {values.isFTINLegally === true && (
                        <>
                          <Typography

                            className="mt-3"
                            style={{ marginLeft: "20px", fontSize: "15px" }}
                          >
                            Do you wish to provide a further (or other)
                            explanation why you are not legally required to
                            provide an FTIN?
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <FormControl className="col-12 radio" style={{ marginLeft: "20px" }}>
                            <RadioGroup
                              row
                              name="isExplanationNotLegallyFTIN"
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              value={values.isExplanationNotLegallyFTIN}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                                name="isExplanationNotLegallyFTIN"
                              />
                              <FormControlLabel
                                className="label"
                                value="No"
                                control={<Radio />}
                                label="No"
                              // name="isExplanationNotLegallyFTIN"
                              />
                            </RadioGroup>
                            {errors.isExplanationNotLegallyFTIN &&
                              touched.isExplanationNotLegallyFTIN ? (
                              <div>
                                <Typography color="error">
                                  {errors.isExplanationNotLegallyFTIN}
                                </Typography>
                              </div>
                            ) : (
                              ""
                            )}
                          </FormControl>
                          {values.isExplanationNotLegallyFTIN === "Yes" ? (
                            <div style={{ margin: "20px" }}>
                              <Typography
                                style={{ fontSize: "25px", fontWeight: "550" }}
                              >
                                Foreign TIN Provision – Reasonable Explanation
                              </Typography>
                              <Typography
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "550",
                                  marginTop: "15px",
                                }}
                              >
                                Reasonable Explanation Provision
                              </Typography>
                              <Typography
                                style={{ fontSize: "20px", marginTop: "15px" }}
                              >
                                You have not provided a Foreign Tax Identification
                                Number, FTIN, where one would generally be
                                provided. The IRS provides for a range of
                                circumstances where it is considered reasonable to
                                not provide a FTIN, including but not limited to:
                              </Typography>
                              <Typography
                                style={{ fontSize: "20px", marginTop: "15px" }}
                              >
                                <ul>
                                  <li>
                                    The account holder is resident of a
                                    jurisdiction that is not listed in section 3
                                    of Revenue Procedure 2017-46, 2017-43 I.R.B.
                                    372, which may be further updated in future
                                    published guidance;
                                  </li>
                                  <li>
                                    The account holder is resident in a
                                    jurisdiction that has been identified by the
                                    IRS on a list of jurisdictions for which
                                    withholding agents are not required to obtain
                                    foreign TINs;
                                  </li>
                                  <li>
                                    The account holder is a government,
                                    international organization, foreign central
                                    bank of issue, or resident of a U.S.
                                    territory; or
                                  </li>
                                  <li>
                                    You obtain a reasonable explanation for why
                                    the account holder has not been issued a
                                    foreign TIN.
                                  </li>
                                </ul>
                                <Typography
                                  style={{ fontSize: "20px", marginTop: "15px" }}
                                >
                                  Please select the appropriate explanation below,
                                  or where none apply, please select, ‘Other/None
                                  of the above’ and you will have the opportunity
                                  to provide a written explanation.
                                </Typography>
                                <Typography
                                  style={{ fontSize: "20px", marginTop: "15px" }}
                                >
                                  Please note, treaty benefits, where they may
                                  otherwise apply, may not be provided if you do
                                  not enter either a U.S TIN or a Foreign TIN or
                                  provide an acceptable and reasonable
                                  explanation. The recipient of the submission
                                  document may need to obtain further information.
                                </Typography>
                              </Typography>
                            </div>
                          ) : values.isExplanationNotLegallyFTIN === "No" ? (
                            ""
                          ) : (
                            ""
                          )}
                        </>
                      )}



                      {values.notAvailable ? (<div style={{ marginLeft: "20px" }}>
                        <Typography>
                          Please specify the reason for non-availability of US TIN{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <Input
                          fullWidth
                          type="text"
                          name="notAvailableReason"
                          value={values.notAvailableReason}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#7e7e7e",
                            fontStyle: "italic",
                            height: "6rem",
                            width: "100%",
                          }}
                        />
                      </div>) : ""}
                      {values.isNotAvailable === "Yes" ? (
                        <div style={{ marginLeft: "20px", marginRight: "20px" }} className="my-3">
                          <Typography align="left" style={{ fontWeight: "bold" }}>
                            Please specify the reason for non-availability of
                            Foreign TIN{" "}
                            <span
                              style={{ color: "red", verticalAlign: "super" }}
                            >
                              *
                            </span>
                            <br />
                          </Typography>
                          <Typography
                            align="left"
                            style={{ fontWeight: "bold", marginTop: "2rem", textAlign: "justify" }}
                          >
                            You have selected a FTIN country that is not on the
                            IRS exemption list, where, in most cases a FTIN should
                            be provided. You must provide a written explanation
                            here explaining why you are not providing. By not
                            providing we may not be able to apply treaty benefits
                            should they apply and may render the form invalid.
                          </Typography>
                          <Input
                            fullWidth
                            type="text"
                            name="fTinNotAvailableReason"
                            value={values.fTinNotAvailableReason}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "#7e7e7e",
                              fontStyle: "italic",
                              height: "7rem",
                              width: "100%",
                            }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
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
                            dispatch(PostDualCert(
                              {
                                ...prevStepData,
                                ...values,
                                stepName: `/${urlValue}`
                              }
                              , () => { },
                              () => { })
                            );
                            history(
                              GlobalValues.basePageRoute
                            );
                          })
                        }} formTypeId={FormTypeId.W8ECI} />

                        <Button
                          variant="contained"
                          onClick={() => {
                            dispatch(GetECIDCPdf(authDetails?.accountHolderId))
                          }}
                          style={{ color: "white", marginLeft: "15px" }}
                        >
                          View Form
                        </Button>
                        <Button
                          disabled={!isValid}
                          onClick={() => {
                            submitForm().then(() => {
                              history("/Certi_dualCert_Eci");
                            })
                          }}
                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}

                        >
                          Continue
                        </Button>
                      </div>
                      <Typography
                        align="center"
                        style={{

                          //color: "#f5f5f5",
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
                            history("/CRS_ECI_DC");
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
