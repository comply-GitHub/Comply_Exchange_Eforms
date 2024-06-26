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
} from "@mui/material";
import { Info, Delete, YoutubeSearchedFor } from "@mui/icons-material";
import { Formik, Form } from "formik";
import "./index.scss";
import checksolid from "../../../../../assets/img/check-solid.png";
import { useNavigate } from "react-router-dom";
import {
  W8_state, getTinTypes, getAllCountries, GetHelpVideoDetails, postW8BENForm, LoadExistingFormData,
} from "../../../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import CloseIcon from "@mui/icons-material/Close";
import { GetBenPdf } from "../../../../../Redux/Actions/PfdActions";
import { US_TINSchemaW8BenE } from "../../../../../schemas/w8Ben";
import GlobalValues, { FormTypeId } from "../../../../../Utils/constVals";
import useAuth from "../../../../../customHooks/useAuth";
import SaveAndExit from "../../../../Reusable/SaveAndExit/Index";
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

  const W8BENData = useSelector((state: any) => state.W8BEN);

  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");

  const LoadData = () => {
    const temp = {
      ...PrevStepData,
      ...W8BENData,
      usTinTypeId: W8BENData?.usTinTypeId?.toString() ?? obValues.taxpayerIdTypeID?.toString() ?? "",
      usTin: W8BENData?.usTin ?? obValues?.usTin,
      notAvailable: W8BENData?.notAvailable ? W8BENData?.notAvailable : false,
      notAvailableReason: W8BENData?.notAvailableReason || "",
      foreignTINCountry: obValues.foreignTINCountryId == null || obValues.foreignTINCountryId == ""
        || obValues.foreignTINCountryId == "0" ? obValues.permanentResidentialCountryId : obValues.foreignTINCountryId.toString(),
      foreignTIN: W8BENData?.foreignTIN ?? obValues?.foreignTIN ,
      isFTINLegally: W8BENData?.isFTINLegally ? W8BENData?.isFTINLegally : false,
      isNotAvailable: W8BENData?.isNotAvailable ? (W8BENData?.isNotAvailable == true && W8BENData?.alternativeTINFormat == false ? "Yes" : "") : "",
      fTinNotAvailableReason: W8BENData?.fTinNotAvailableReason || "",
      alternativeTINFormat: W8BENData?.alternativeTINFormat || "",
      isExplanationNotLegallyFTIN: W8BENData?.isExplanationNotLegallyFTIN || "",
      stepName: null
    }
    setInitialValues({ ...initialValue, ...temp });
  }

  const viewPdf = () => {
    // history("/w8Ben_pdf", { replace: true });
    history("/w8Ben_pdf");
  }

 
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    document.title = "Tax-Payer"
  }, [])

  useEffect(() => {
    dispatch(GetHelpVideoDetails());
    dispatch(getAllCountries());
    dispatch(
      getTinTypes(authDetails?.agentId, (data: any) => {
        setUStinArray(data);
        let datas = data.filter((ele: any) => {
          return ele.nonUSIndividual === true;
        });
        setUStinvalue(datas);
        LoadData();
      })
    );

  }, [authDetails]);



  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );

  const [toolInfo, setToolInfo] = useState("");
  const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");
  console.log(obValues.taxpayerIdTypeID, "pp")
  const [IsIndividual, setIsIndividual] = useState(obValues?.businessTypeId == 1);
  const dispatch = useDispatch();
  const [initialValue, setInitialValues] = useState({
    usTinTypeId: obValues.taxpayerIdTypeID?.toString(),

    usTin: obValues.usTin,
    tinValue: "",
    notAvailable: false,
    notAvailableReason: "",
    foreignTINCountry: obValues.foreignTINCountryId == null || obValues.foreignTINCountryId == ""
      || obValues.foreignTINCountryId == "0" ? obValues.permanentResidentialCountryId : obValues.foreignTINCountryId.toString(),
    foreignTIN: W8BENData?.foreignTIN ?? obValues?.foreignTIN ,
    isFTINLegally: false,
    isNotAvailable: "",
    fTinNotAvailableReason: "",
    alternativeTINFormat: "",
    isExplanationNotLegallyFTIN: "",
    stepName: null
  });

  function getUStinValue() {
    let val: string = ""
   ustinValue.map((item: any) => {
     if (item?.taxpayerIdTypeID === onBoardingFormValues?.usTinTypeId) {
       val = item.taxpayerIdTypeId;
     }
   });
   console.log(ustinValue, "usTinvalue", val);
   return val;
 }
  const [payload, setPayload] = useState({ usTin: "" });
  const formatTin = (e: any, values: any): any => {
    if (e.key === "Backspace" || e.key === "Delete") return;
    if (e.target.value.length === 2) {
      setPayload({ ...payload, usTin: payload.usTin + "-" });
      values.usTin = values.usTin + "-";
    }
  };
  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions">View Instructions</div>
          <div className="viewform" onClick={() => {
            dispatch(GetBenPdf(authDetails?.accountHolderId))
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
                validationSchema={US_TINSchemaW8BenE}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  const temp = {
                    ...values,
                    agentId: authDetails?.agentId,
                    accountHolderBasicDetailId: authDetails?.accountHolderId,
                    isNotAvailable: values?.isNotAvailable === "Yes",
                    alternativeTINFormat: values?.alternativeTINFormat === "No",
                    isExplanationNotLegallyFTIN: values?.isExplanationNotLegallyFTIN == "Yes",

                    stepName: null,
                  };

                  const returnPromise = new Promise((resolve, reject) => {
                    dispatch(
                      postW8BENForm(temp,
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
                  //   "/Ben/Tax_Purpose_Ben/Declaration_Ben/Non_US/Claim_Ben_E"
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
                    <>{console.log(errors, values)}</>
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
                            <option value={0}>---select---</option>
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
                                  color: "#121112",
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
                                <span style={{ color: "red" }}>*</span>
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
                                onKeyDown={(e: any) => formatTin(e, values)}
                                value={values.usTin}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{ maxLength: 10 }}
                                error={Boolean(touched.usTin && errors.usTin)}
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#121112",
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
                            {/* <option value={257}>United Kingdom</option> */}
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
                            <span style={{ color: "red" }}>*</span>
                            {values.foreignTINCountry == "257" ? (
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
                              // color: "#7e7e7e",
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
                                onChange={(e: any) => {
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
                                Please note, treaty benfits, where they may
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
                          providing we may not be able to apply treaty benfits
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
                            dispatch(postW8BENForm(
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
                          dispatch(postW8BENForm(
                            {
                              ...prevStepData,
                              stepName: `/${urlValue}`
                            }
                            , () => { }))
                          history(
                            GlobalValues.basePageRoute
                          );
                        })
                      }} formTypeId={FormTypeId.BEN} ></SaveAndExit>
                      <Button
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                        onClick={() => {
                          dispatch(GetBenPdf(authDetails?.accountHolderId))
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
                            history(
                              "/W-8BEN/Declaration/US_Tin/Claim"
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
                          if (PrevStepData.IsPresentAtleast31Days === "Yes") {
                            history("/Susbtantial_BEN")
                          } else {
                            history(
                              "/W-8BEN/Declaration/Non_US_Sorced/Status"

                            );
                          }

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
