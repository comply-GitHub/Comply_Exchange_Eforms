import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  FormControlLabel,
  Tooltip,
  Link,
  Checkbox,
  RadioGroup,
  Radio,
  IconButton,
} from "@mui/material";
import { Info, Delete, YoutubeSearchedFor } from "@mui/icons-material";
import { Formik, Form } from "formik";
import "./index.scss";
import checksolid from "../../../../../assets/img/check-solid.png";
import { useNavigate } from "react-router-dom";
import {
  W8_state, getTinTypes, getAllCountries, GetHelpVideoDetails, postW8BEN_EForm,
  GetAgentSkippedSteps,
  GetAllGIINTypes,
} from "../../../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import CloseIcon from "@mui/icons-material/Close";
import { US_TINSchemaW8BenE } from "../../../../../schemas/w8BenE";
import GlobalValues, { FormTypeId } from "../../../../../Utils/constVals";
import useAuth from "../../../../../customHooks/useAuth";
import SaveAndExit from "../../../../Reusable/SaveAndExit/Index";
import { GetBenEPdf } from "../../../../../Redux/Actions/PfdActions";
import Redirect from "../../../../../Router/RouterSkip";
import { kMaxLength } from "buffer";
export default function Tin(props: any) {
  const history = useNavigate();
  const { authDetails } = useAuth();

  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [ustinValue, setUStinvalue] = useState([]);
  const [ustinArray, setUStinArray] = useState([]);
  const allCountriesData = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const onBoardingFormValues = JSON.parse(
    localStorage.getItem("agentDetails") ?? "null"
  );


  const skippedSteps = useSelector((state: any) => state.SkippedSteps);
  const [isGiinEnabled, setIsGiinEnabled] = useState(false);

  const W8BENEData = useSelector((state: any) => state.W8BENE);

  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");

  const LoadData = () => {
    const temp = {
      ...PrevStepData,
      ...W8BENEData,
      usTinTypeId: obValues?.taxpayerIdTypeID?.toString() ?? W8BENEData?.usTinTypeId,
      usTin: W8BENEData?.usTin == "" ? obValues?.usTin : W8BENEData?.usTin,
      notAvailable: W8BENEData.notAvailable ? W8BENEData.notAvailable : false,
      notAvailableReason: W8BENEData.notAvailableReason || "",
      foreignTINCountry: obValues.foreignTINCountryId == null || obValues.foreignTINCountryId == ""
        || obValues.foreignTINCountryId == "0" ? obValues.permanentResidentialCountryId : obValues.foreignTINCountryId,
      foreignTIN: W8BENEData?.foreignTIN == "" ? obValues?.foreignTIN : W8BENEData?.foreignTIN,
      isFTINLegally: W8BENEData.isFTINLegally ? W8BENEData.isFTINLegally : false,
      isNotAvailable: W8BENEData.isNotAvailable ? (W8BENEData.isNotAvailable == true && W8BENEData.alternativeTINFormat == false ? "Yes" : "") : "",
      fTinNotAvailableReason: W8BENEData.fTinNotAvailableReason || "",
      alternativeTINFormat: W8BENEData.alternativeTINFormat || "",
      isExplanationNotLegallyFTIN: W8BENEData.isExplanationNotLegallyFTIN || "",
      giinId: W8BENEData?.giinId ?? obValues.giinId ?? "",
      giinTypeId: W8BENEData?.giinTypeId ?? (obValues?.giinId ? 1 : 0) ?? 0,
      giinNotAvailable: W8BENEData?.giinNotAvailable ?? false,
      stepName: null
    }
    setInitialValues({ ...initialValue, ...temp });
  }

  const viewPdf = () => {
    history("/w8BenE_pdf", { replace: true });
  }

  function getUStinValue() {
    let val: number = 1;
    ustinValue.map((item: any) => {
      if (item?.taxpayerIdTypeID === onBoardingFormValues?.usTinTypeId) {
        val = item.taxpayerIdTypeId;
      }
    });
    console.log(ustinValue, "usTinvalue", val);
    return val;
  }
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  useEffect(() => {
    document.title = "Tax-Payer";
    dispatch(GetHelpVideoDetails());
    dispatch(getAllCountries());
    dispatch(
      getTinTypes(authDetails?.agentId, (data: any) => {
        setUStinArray(data);
        let datas = data.filter((ele: any) => {
          return ele.nonUSEntity == true;
        });
        setUStinvalue(datas);
      })
    );
    LoadData();

    dispatch(GetAllGIINTypes(() => { }))
  }, [authDetails]);

  const GIINTypes = useSelector((state: any) => state?.GIINTypes)

  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const [toolInfo, setToolInfo] = useState("");
  const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");

  const dispatch = useDispatch();
  const [initialValue, setInitialValues] = useState({
    usTinTypeId: obValues.taxpayerIdTypeID?.toString(),
    usTin: obValues.usTin,
    tinValue: "",
    notAvailable: false,
    notAvailableReason: "",
    foreignTINCountry: obValues.foreignTINCountryId == null || obValues.foreignTINCountryId == ""
      || obValues.foreignTINCountryId == "0" ? obValues.permanentResidentialCountryId : obValues.foreignTINCountryId,
    foreignTIN: "",
    isFTINLegally: false,
    isNotAvailable: "",
    fTinNotAvailableReason: "",
    alternativeTINFormat: "",
    isExplanationNotLegallyFTIN: "",
    giinId: "",
    giinTypeId: 0,
    giinNotAvailable: false,
    stepName: null
  });
  const [payload, setPayload] = useState({ usTin: "" });
  const formatTin = (e: any, values: any): any => {
    if (e.key === "Backspace" || e.key === "Delete") return;
    if (e.target.value.length === 2) {
      setPayload({ ...payload, usTin: payload.usTin + "-" });
      values.usTin = values.usTin + "-";
    }
  };


  useEffect(() => {
    if (skippedSteps.length === 0) {
      dispatch(
        GetAgentSkippedSteps(authDetails?.agentId, (data: any[]) => {
          // mappingAvailable = data; 
        })
      );
    }
  }, [authDetails?.agentId])

  useEffect(() => {
    let temp1: any[] = skippedSteps.filter((x: any) => x.id == 8 && x.agentId == authDetails?.agentId);
    setIsGiinEnabled(temp1?.length > 0 ? false : true);

  }, [skippedSteps, authDetails?.agentId])


  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions">View Instructions</div>
          <div className="viewform" onClick={() => {
            dispatch(GetBenEPdf(authDetails?.accountHolderId))
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
                    "name",
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
            <BreadCrumbComponent breadCrumbCode={1249} formName={3} />
          </div>
        </div>

        <div className="col-8 mt-3">
          <div style={{ padding: "13px" }}>
            <Paper style={{ padding: "10px" }}>
              <Formik
                validateOnChange={true}
                initialValues={initialValue}
                validateOnMount={true}
                enableReinitialize
                validationSchema={US_TINSchemaW8BenE(isGiinEnabled)}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  const temp = {
                    ...values,
                    agentId: authDetails?.agentId,
                    accountHolderBasicDetailId: authDetails?.accountHolderId,
                    foreignTIN: values.foreignTIN,
                    isNotAvailable: values.isNotAvailable === "Yes",
                    alternativeTINFormat: values.alternativeTINFormat === "No",
                    isExplanationNotLegallyFTIN: values.isExplanationNotLegallyFTIN == "Yes",
                    stepName: null,
                  };
                  const returnPromise = new Promise((resolve, reject) => {
                    dispatch(
                      postW8BEN_EForm(temp,
                        (responseData: any) => {
                          localStorage.setItem("PrevStepData", JSON.stringify(temp));
                          resolve(responseData);
                        },
                        (err: any) => {
                          reject(err);
                        }
                      )
                    );
                  })
                  return returnPromise;

                  // history(
                  //   "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E"
                  // );
                }}
              >
                {({
                  errors,
                  touched,
                  handleBlur,
                  values,
                  handleSubmit,
                  handleChange,
                  setFieldValue,
                  submitForm,
                  isSubmitting,
                  isValid
                }) => (
                  <Form onSubmit={handleSubmit}>
                    {(() => {
                      console.log(values, errors, "form");
                      return <></>
                    })()}
                    {toolInfo === "ForeignTin" ? (
                      <div className="mt-5">
                        <Paper
                          style={{
                            backgroundColor: "#d1ecf1",
                            padding: "15px",
                          }}
                        >
                          <div
                            className="d-flex"
                            style={{ justifyContent: "space-between" }}
                          >
                            <Typography style={{ color: "#0c5460" }}>
                              United Kingdom TIN Format is 9999999999 false{" "}
                              <br /> 9- Numeric value only <br /> A- Alphabetic
                              character only <br /> *- Alphanumeric character
                              only <br /> ?- Characters optional after this{" "}
                              <br /> IF TIN format is not available, please
                              check the below box and continue
                            </Typography>
                            <Typography>
                              <CloseIcon
                                style={{
                                  color: "#0c5460",
                                  cursor: "pointer",
                                  fontSize: "medium",
                                }}
                                onClick={() => {
                                  setToolInfo("");
                                }}
                              />
                            </Typography>
                          </div>
                        </Paper>
                      </div>
                    ) : (
                      ""
                    )}
                    <div style={{ margin: "10px" }}>
                      <Typography
                        align="left"
                        style={{
                          marginTop: "10px",
                          fontSize: "27px",
                          fontWeight: "550",
                        }}
                      >
                        Taxpayer Identification Number
                      </Typography>
                    </div>

                    <div>
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
                            U.S. TIN Type
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
                            //disabled={values.notAvailable}
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
                            // defaultValue={getUStinValue()}
                            onBlur={handleBlur}
                            value={values.usTinTypeId}
                            onChange={(e) => {
                              handleChange(e);
                              if (
                                e.target.value === "1" ||
                                e.target.value === "7"
                              ) {
                                setTimeout(() => { setFieldValue("usTin", ""); }, 100)
                                setTimeout(() => { setFieldValue("notAvailable", false); }, 200)
                              } else if (
                                e.target.value === "8"
                              ) {
                                setTimeout(() => { setFieldValue("usTin", ""); }, 100)
                                setTimeout(() => { setFieldValue("notAvailable", true); }, 200)
                              } else {
                                setTimeout(() => { setFieldValue("notAvailable", false); }, 100)
                              }
                            }}
                          >
                            <option value={0}>-Select-</option>
                            {ustinValue?.map((ele: any) => (
                              <option
                                key={ele?.taxpayerIdTypeID}
                                value={ele?.taxpayerIdTypeID}
                              >
                                {ele?.taxpayerIdTypeName}
                              </option>
                            ))}
                          </select>
                          {/* <p className="error">{errors.usTinTypeId}</p> */}
                        </div>
                        {values.notAvailable === true ? (
                          <>
                            <div className="col-lg-5 col-12">
                              <Typography style={{ fontSize: "14px" }}>
                                U.S. TIN
                              </Typography>
                              <Input
                                disabled
                                fullWidth
                                placeholder="ENTER US TIN"
                                defaultValue="ENTER US TIN"
                                value={values.tinValue}
                                // onBlur={handleBlur}
                                onChange={(e: any) => {
                                  handleChange(e);
                                  ///setFieldValue("", "");
                                }}
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#7e7e7e",
                                  fontStyle: "italic",
                                  height: "40px",
                                  width: "100%",
                                }}
                              />
                              {values.notAvailable
                                ? ""
                                : // <p className="error">{errors.usTin}</p>
                                " "}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-lg-5 col-12">
                              <Typography style={{ fontSize: "14px" }}>
                                U.S. TIN
                              </Typography>
                              <Input
                                disabled={
                                  values.notAvailable ||
                                  values.usTinTypeId === "0" ||
                                  values.usTinTypeId === "7" ||
                                  values.usTinTypeId === "8"
                                }
                                fullWidth
                                type="text"
                                name="usTin"
                                onKeyDown={(e) => formatTin(e, values)}
                                value={values.usTin}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{ maxLength: 10 }}
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
                              {values.notAvailable
                                ? ""
                                : // <p className="error">{errors.usTin}</p>
                                " "}
                            </div>
                          </>
                        )}
                        <div className="col-lg-2 ">
                          <div className="radio" style={{ marginTop: "17px" }}>
                            <Checkbox
                              value={values.notAvailable}
                              checked={values.notAvailable}
                              onChange={(e) => {
                                setTimeout(() => {
                                  setFieldValue("usTinTypeId", "8")
                                  setFieldValue("notAvailableReason", "")
                                  setFieldValue("usTin", "")
                                }, 100);
                                handleChange(e);
                              }}
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
                      {isGiinEnabled ? <div
                        style={{
                          margin: "10px",
                          display: "flex",
                          marginTop: "25px",
                        }}
                        className="row"
                      >
                        <div className="col-lg-5 col-12">
                          <Typography style={{ fontSize: "14px", minHeight: "25px" }}>
                            Global Intermediary Identification Number (GIIN)
                            <span style={{ color: "red" }}>*</span>

                          </Typography>
                          <select
                            //disabled={values.notAvailable}
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "#121112",
                              fontStyle: "italic",
                              height: "40px",
                              width: "100%",
                            }}
                            name="giinTypeId"
                            id="Income"
                            // defaultValue={getUStinValue()}
                            onBlur={handleBlur}
                            value={values.giinTypeId}
                            onChange={(e) => {
                              handleChange(e);
                              setTimeout(() => {
                                setFieldValue("giinId", "")

                              }, 100)
                            }}
                          >
                            <option value={0}>-Select-</option>
                            {GIINTypes?.map((ele: any) => (
                              <option
                                key={ele?.id}
                                value={ele?.id}
                              >
                                {ele?.giinType}
                              </option>
                            ))}
                          </select>
                          {/* <p className="error">{errors.usTinTypeId}</p> */}
                        </div>

                        <>
                          <div className="col-lg-5 col-12">
                            <FormControl className="w-100">
                              <Typography align="left" style={{ minHeight: "25px" }}>
                                GIIN
                                {/* <span style={{ color: 'red' }}>*</span> */}
                                <span>
                                  <Tooltip
                                    style={{
                                      backgroundColor: "black",
                                      color: "white"
                                    }}
                                    title={
                                      <>
                                        <Typography color="inherit">
                                          Tax Residency Information - GIIN
                                        </Typography>
                                        <a onClick={() => setToolInfo("giin")}>
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

                                {toolInfo === "giin" ? (
                                  <div>
                                    <Paper
                                      style={{
                                        backgroundColor: "#dedcb1",
                                        padding: "15px",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <Typography sx={{ color: "black", marginBottom: "10px" }}>GIIN means a Global Intermediary Identification Number assigned to a PFFI or Registered Deemed Compliant FFI.</Typography>
                                      <Typography sx={{ color: "gray", marginBottom: "10px" }}>
                                        A separate GIIN will be issued to the Financial Institution to identify each jurisdiction, including the FI's jurisdiction of residence, in which the FI maintains a branch that is not treated as a Limited Branch.
                                      </Typography>
                                      <Typography sx={{ color: "gray", marginBottom: "10px" }}>
                                        A GIIN will be issued to only those Financial Institutions that are not Limited FFIs, Limited Branches, or U.S. branches of an FFI, and will be issued after an FI's FATCA Registration is submitted and approved.
                                      </Typography>
                                      <Typography sx={{ color: "gray", marginBottom: "10px" }}>
                                        Format: XXXXXX.XXXXX.XX.XXX
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
                              </Typography>
                              <Input
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#7e7e7e",
                                  fontStyle: "italic",
                                  height: "40px",
                                  width: "100%",
                                }}
                                disabled={values.giinTypeId == 2 || values.giinTypeId == 3
                                  || values.giinNotAvailable
                                }
                                id="outlined"
                                name="giinId"
                                placeholder="Enter GIIN"
                                onChange={handleChange}
                                // inputProps={{ maxLength: 11 }}
                                onBlur={handleBlur}
                                error={Boolean(touched.giinId && errors.giinId)}
                                value={values.giinId}
                              />
                              {errors.giinId && touched.giinId ? <p className="error">{errors.giinId}</p> : <></>}
                            </FormControl>
                          </div>
                        </>

                        <div className="col-lg-2 ">
                          <div className="radio" style={{ marginTop: "17px" }}>
                            <Checkbox
                              value={values.giinNotAvailable}
                              checked={values.giinNotAvailable}
                              onChange={(e) => {
                                setTimeout(() => {
                                  setFieldValue("giinId", "")
                                }, 100);
                                handleChange(e);
                              }}
                              size="medium"
                              name="giinNotAvailable"
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

                        : <></>}
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
                            disabled
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
                            {getCountriesReducer.allCountriesData
                              ?.filter(
                                (x: any) =>
                                  x.name?.toLowerCase() !== "united states"
                              )
                              ?.map((ele: any) => (
                                <option key={ele?.id} value={ele?.id}>
                                  {ele?.name}
                                </option>
                              ))}
                          </select>
                          {/* <p className="error">{errors.foreignTINCountry}</p> */}

                          <div style={{ marginTop: "2px" }}>
                            <Checkbox
                              value={values.isFTINLegally}
                              checked={values.isFTINLegally}
                              onChange={(e) => {
                                handleChange(e);
                                {
                                  setTimeout(() => {
                                    setFieldValue(
                                      "isNotAvailable",
                                      ""
                                    );
                                  }, 100)

                                }
                                setTimeout(() => {
                                  setFieldValue("foreignTIN", "");
                                }, 200)

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
                            {values.foreignTINCountry == 257 ? (
                              <span>
                                {" "}
                                <Tooltip
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                  }}
                                  title={
                                    <>
                                      <a
                                        onClick={() =>
                                          setToolInfo("ForeignTin")
                                        }
                                      ></a>
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
                                </Tooltip>
                              </span>
                            ) : (
                              ""
                            )}
                          </Typography>

                          {values.isNotAvailable === "No" ? (
                            <Input
                              fullWidth
                              type="text"
                              disabled={
                                values.isFTINLegally
                              }
                              name="foreignTIN"
                              value={values.foreignTIN}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              inputProps={{ maxLength: 20 }}
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
                                values.isNotAvailable === "Yes"
                              }
                              placeholder="ENTER FOREIGN TIN"
                              name="foreignTIN"
                              value={values.foreignTIN}
                              onBlur={handleBlur}
                              inputProps={{ maxLength: 20 }}
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
                          {values.isFTINLegally ? "" : " "}

                          <div>
                            <FormControl className="col-12 radio">
                              <RadioGroup
                                row
                                name="isNotAvailable"
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                value={values.isNotAvailable}
                                onChange={(e) => {
                                  handleChange(e);
                                  setTimeout(() => {
                                    setFieldValue("foreignTIN", "");
                                  }, 100);
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
                                        handleChange(
                                          "isNotAvailable"
                                        )("");
                                        setFieldValue("fTinNotAvailableReason", "")
                                        setFieldValue("foreignTIN", "");
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
                        <FormControl
                          className="col-12 radio"
                          style={{ marginLeft: "17px" }}
                        >
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
                            //name="isExplanationNotLegallyFTIN"
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

                    {values.notAvailable ? (
                      <div style={{ marginLeft: "20px" }}>
                        <Typography>
                          Please specify the reason for non-availability of US
                          TIN <span style={{ color: "red" }}>*</span>
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
                            color: "#121112",
                            fontStyle: "italic",
                            height: "6rem",
                            width: "100%",
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    {values.isNotAvailable === "Yes" ? (
                      <div
                        style={{ marginLeft: "20px", marginRight: "20px" }}
                        className="my-3"
                      >
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
                          style={{
                            fontWeight: "bold",
                            marginTop: "2rem",
                            textAlign: "justify",
                          }}
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
                            color: "#121112",
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
                      {/* <Button variant="contained" style={{ color: "white" }}
                        onClick={() => {
                          submitForm().then(() => {
                            const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                            const urlValue = window.location.pathname.substring(1);
                            dispatch(postW8BEN_EForm(
                              {
                                ...prevStepData,
                                stepName: `/${urlValue}`
                              }
                              , () => { }))
                            history(
                              GlobalValues.basePageRoute
                            );
                          })
                        }}
                      >
                        SAVE & EXIT
                      </Button> */}
                      <SaveAndExit Callback={() => {
                        submitForm().then(() => {
                          const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                          const urlValue = window.location.pathname.substring(1);
                          dispatch(postW8BEN_EForm(
                            {
                              ...prevStepData,
                              stepName: `/${urlValue}`
                            }
                            , () => { }))
                          history(
                            GlobalValues.basePageRoute
                          );
                        })
                      }} formTypeId={FormTypeId.BENE} ></SaveAndExit>
                      <Button
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                        onClick={() => {
                          dispatch(GetBenEPdf(authDetails?.accountHolderId))
                        }}
                      >
                        View Form
                      </Button>
                      <Button
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                        disabled={!isValid}
                        //type="submit"
                        onClick={() => {
                          submitForm().then(() => {
                            Redirect(
                              "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E",
                              authDetails?.agentId,
                              history
                            );
                          })
                        }}
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
                          Redirect(
                            "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/DisregardedBeneE",
                            authDetails?.agentId,
                            history,
                            true
                          );
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
  );
}
