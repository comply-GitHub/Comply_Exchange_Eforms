import React, { useState, useEffect } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  FormControlLabel,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Checkbox,
  RadioGroup,
  Radio,
  Divider,
} from "@mui/material";
import { Info, DeleteOutline, Delete } from "@mui/icons-material";
import { Formik, Form, FieldArray } from "formik";
// import "./index.scss";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import useAuth from "../../../customHooks/useAuth";
import { US_TINSchema } from "../../../schemas/w8Ben";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import SideBar from "../../Reusable/SideBar";
import { GetAgentCountriesImportantForEform, GetHelpVideoDetails, UpsertSelfCertDetails, getAllCountries, getAllCountriesCode, getAllCountriesIncomeCode, getTinTypes, postSCEntityEForm, postSCIndividualEForm } from "../../../Redux/Actions";
import { EntityUS_TINSchema } from "../../../schemas/cayman";
import { error } from "console";
import { GetCaymanEntityPdf } from "../../../Redux/Actions/PfdActions";
import PopupModa from "../../../Redux/Actions/poupModal";
export default function Tin(props: any) {

  const { authDetails } = useAuth();

  const onBoardingFormValues = JSON.parse(localStorage.getItem("agentDetails") ?? "null");

  const onBoardingFormValuesPrevStepData = JSON.parse(localStorage.getItem("PrevStepData") ?? "null");


  const itemsData = onBoardingFormValuesPrevStepData?.taxLbltyOtherJurisdictions?.map((dataItem: any, index: number) => (
    {
      id: 0,
      agentId: dataItem?.agentId,
      formTypeId: dataItem.formTypeId,
      formEntryId: 0,
      accountHolderDetailsId: dataItem?.accountHolderDetailsId,
      doesIndiHavTaxLbltyinOtherJurisdictions: dataItem?.doesIndiHavTaxLbltyinOtherJurisdictions ? dataItem?.doesIndiHavTaxLbltyinOtherJurisdictions : "",
      countryId: dataItem.countryId,
      tinNumber: dataItem.tinNumber,
      isAlternativeTinFormat: dataItem.isAlternativeTinFormat,
      tinNotAvailable: dataItem.tinNotAvailable,
      countryError: dataItem.countryError,
      tinError: dataItem.tinError,
      selfCertId: 0,

    }


  ));


  const itemsData2 = [{
    id: 0,
    agentId: authDetails?.agentId,
    formTypeId: FormTypeId.CaymanEntity,
    formEntryId: 0,
    accountHolderDetailsId: authDetails?.accountHolderId,
    doesIndiHavTaxLbltyinOtherJurisdictions: "",
    countryId: "",
    tinNumber: "",
    isAlternativeTinFormat: false,
    tinNotAvailable: false,
    countryError: false,
    tinError: false,
    selfCertId: 0,
  }];

  const initialValue = {
    usTinTypeId: onBoardingFormValuesPrevStepData?.usTinTypeId ? onBoardingFormValuesPrevStepData?.usTinTypeId : "",
    usTin: onBoardingFormValuesPrevStepData?.usTin ? onBoardingFormValuesPrevStepData?.usTin : "",
    notAvailable: false,
    reasionForUSTIN_NotAvailable: onBoardingFormValuesPrevStepData?.reasionForUSTIN_NotAvailable ? onBoardingFormValuesPrevStepData?.reasionForUSTIN_NotAvailable : "",
    foreginTIN_CountryId: onBoardingFormValuesPrevStepData?.foreginTIN_CountryId ? onBoardingFormValuesPrevStepData?.foreginTIN_CountryId : "",
    foregionTIN: onBoardingFormValues?.foreignTIN ? onBoardingFormValues?.foreignTIN : onBoardingFormValuesPrevStepData?.foregionTIN ? onBoardingFormValuesPrevStepData?.foregionTIN : "",
    isFTINNotLegallyRequired: false,
    tinisFTINNotLegallyRequired: "",
    isNotLegallyFTIN: "",
    reasionForForegionTIN_NotAvailable: onBoardingFormValuesPrevStepData?.reasionForForegionTIN_NotAvailable ? onBoardingFormValuesPrevStepData?.reasionForForegionTIN_NotAvailable : "",
    taxLbltyOtherJurisdictions: (itemsData?.length > 0) ? itemsData : itemsData2,
  };

  // useEffect(()=>{
  //   document.title = ""
  // },[])

  const [ustinArray, setUStinArray] = useState([]);
  const [ustinValue, setUStinvalue] = useState([]);
  const [notUsIndividual, setNonUsIndividual] = useState([]);

  useEffect(() => {
    document.title = "Tax-Payer"
  }, [])

  useEffect(() => {
    dispatch(GetHelpVideoDetails());
    dispatch(getAllCountries())
    dispatch(getAllCountriesCode())
    dispatch(getAllCountriesIncomeCode())
    dispatch(GetAgentCountriesImportantForEform())
    // dispatch(getAllStateByCountryId())   
    dispatch(
      getTinTypes(3, (data: any) => {
        setUStinArray(data);
        let datas = data.filter((ele: any) => {
          return ele.usIndividual === true;
        });
        setUStinvalue(datas);
        let nonData = data.filter((ele: any) => {
          return ele.nonUSIndividual === true;
        });
        setNonUsIndividual(nonData)
      })
    );
  }, []);
  const [expanded, setExpanded] = React.useState<string | false>("");
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const getCountriesReducer = useSelector((state: any) => state.getCountriesReducer);
  const getCountriesCodeReducer = useSelector((state: any) => state.getCountriesCodeReducer);
  const GetAllIncomeCodesReducer = useSelector((state: any) => state.GetAllIncomeCodesReducer);
  const GetStateByCountryIdReducer = useSelector((state: any) => state.GetStateByCountryIdReducer);
  const history = useNavigate();
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const dispatch = useDispatch();
  const [toolInfo, setToolInfo] = useState("");
  const GetAgentCountriesImportantForEformData = useSelector(
    (state: any) =>
      state.GetAgentCountriesImportantForEformReducer
        .GetAgentCountriesImportantForEformData
  );

  const [popupState, setPopupState] = useState({
    data:"",
    status:false
})
  const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }

  const viewPdf = () => {
    history("w9_pdf");
  }

  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        validateOnMount={false}
        initialValues={initialValue}
        enableReinitialize
        validationSchema={EntityUS_TINSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const temp = {
            agentId: authDetails.agentId,
            accountHolderBasicDetailId: authDetails.accountHolderId,
            ...onBoardingFormValuesPrevStepData,
            ...values,
            stepName: null
          };

          if (values.taxLbltyOtherJurisdictions) {

            dispatch(UpsertSelfCertDetails(values.taxLbltyOtherJurisdictions, () => {

            }))


          }

          const returnPromise = new Promise((resolve, reject) => {
            dispatch(
              postSCEntityEForm(temp,
                (responseData: any) => {
                  localStorage.setItem("PrevStepData", JSON.stringify(temp));
                  resolve(responseData);
                  history("/Cayman/Entity/Certification");
                },
                (err: any) => {
                  reject(err);
                }
              )
            );
          })
          return returnPromise


          // dispatch(
          //   CREATE_8233(values, () => {
          //     history("/Form8233/TaxPayer_Identification/Owner");
          //   })
          // );
          // history("/Form8233/TaxPayer_Identification/Owner");
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
          <Form onSubmit={handleSubmit}>

            {/* <>{console.log("errors", errors)}</>
            <>{console.log("values", values)}</> */}
            <section
              className="inner_content"
              style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
            >
              <SideBar />
              <div className="row w-100">
                <div className="col-4">
                  <div style={{ padding: "20px 0px", height: "100%" }}>
                    <BreadCrumbComponent breadCrumbCode={1330} formName={FormTypeId.CaymanEntity} />
                  </div>
                </div>
                <div className="col-8 mt-3">
                  <div style={{ padding: "13px" }}>

                    <Paper style={{ padding: "10px" }}>
                      {toolInfo === "foregionTIN" ? (
                        <div className="mt-1">
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
                      <Typography
                        align="left"
                        style={{
                          margin: "10px",
                          fontSize: "23px",
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
                                        fontSize: "16px",
                                        color: "#0000C7"
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
                                // defaultValue={getUStinValue()}
                                onBlur={handleBlur}
                                value={values.usTinTypeId}
                                onChange={(e) => {
                                  handleChange(e);
                                  setTimeout(() => { setFieldValue("reasionForForegionTIN_NotAvailable", ""); }, 200)
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

                                {notUsIndividual?.map((ele: any) => (
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
                                ))}
                              </select>




                            </div>
                            {errors?.usTinTypeId && typeof errors?.usTinTypeId === 'string' && (
                              <p className="error">{errors?.usTinTypeId}</p>
                            )}

                            <div className="col-lg-5 col-12">
                              <Typography style={{ fontSize: "14px" }}>U.S. TIN</Typography>
                              <Input
                                disabled
                                fullWidth

                                placeholder="ENTER US TIN"
                                defaultValue="ENTER US TIN"
                                value={values.usTin}
                                // onBlur={handleBlur}
                                onChange={(e: any) => {
                                  handleChange(e);
                                  setTimeout(() => { setFieldValue("reasionForForegionTIN_NotAvailable", ""); }, 200)
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
                                  // onChange={handleChange}

                                  onChange={(e) => {
                                    handleChange(e); //condition

                                    if (!values.notAvailable) {
                                      setFieldValue("usTin", "");
                                      setFieldValue("usTinTypeId", 8);
                                    } else {
                                      setFieldValue("usTin", "");
                                      setFieldValue("usTinTypeId", 1);
                                    }
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
                                        fontSize: "16px",
                                        color: "#0000C7"
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
                                defaultValue={1}
                                onBlur={handleBlur}
                                value={values?.usTinTypeId}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              >
                                <option value={""}>---select---</option>

                                {notUsIndividual?.map((ele: any) => (
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
                                ))}
                              </select>
                              {errors?.usTinTypeId && typeof errors?.usTinTypeId === 'string' && (
                                <p className="error">{errors?.usTinTypeId}</p>
                              )}
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
                                //error={Boolean(touched.usTin && errors.usTin)}
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#7e7e7e",
                                  fontStyle: "italic",
                                  height: "40px",
                                  width: "100%",
                                }}
                              />
                              {errors?.usTin && typeof errors?.usTin === 'string' && (
                                <p className="error">{errors?.usTin}</p>
                              )}
                            </div>
                            <div className="col-lg-2 ">
                              <div className="radio" style={{ marginTop: "17px" }}>
                                <Checkbox
                                  value={values.notAvailable}
                                  checked={values.notAvailable}
                                  // onChange={handleChange}

                                  onChange={(e) => {
                                    handleChange(e); //condition

                                    if (!values.notAvailable) {
                                      setFieldValue("usTin", "");
                                      setFieldValue("usTinTypeId", "8");
                                    } else {
                                      setFieldValue("usTin", "");

                                      setFieldValue("usTinTypeId", 1);
                                    }
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
                              name="foreginTIN_CountryId"
                              id="Income"
                              onBlur={handleBlur}
                              value={values.foreginTIN_CountryId}
                              onChange={(e) => {
                                handleChange(e);
                                //setTimeout(() => { setFieldValue("reasionForForegionTIN_NotAvailable", ""); }, 200)
                                setTimeout(() => { setFieldValue("tinisFTINNotLegallyRequired", "No"); }, 200)
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
                            {errors?.foreginTIN_CountryId && typeof errors?.foreginTIN_CountryId === 'string' && (
                              <p className="error">{errors?.foreginTIN_CountryId}</p>
                            )}
                            {/* <p className="error">{errors?.foreginTIN_CountryId}</p> */}

                            {/* <div style={{ marginTop: "2px" }}>
                            <Checkbox
                              value={values.isFTINNotLegallyRequired}
                              checked={values.isFTINNotLegallyRequired}
                              onChange={(e)=>{handleChange(e);{setFieldValue("tinisFTINNotLegallyRequired", "")}setFieldValue("foregionTIN", "");
                            }}

                                size="medium"
                                name="isFTINNotLegallyRequired"
                              />
                              <span style={{ fontSize: "15px" }}>
                                Check if FTIN not legally required
                                {errors.isFTINNotLegallyRequired &&
                                  touched.isFTINNotLegallyRequired ? (
                                  <div>
                                    <Typography color="error">
                                      {errors.isFTINNotLegallyRequired}
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
                            </div> */}

                            {/* {toolInfo === "require" ? (
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
                                style={{ marginTop: "10px", fontSize: "16px",color: "#0000C7" }}
                                onClick={() => {
                                  setToolInfo("");
                                }}
                              >
                                --Show Less--
                              </Link>
                            </Paper>
                          ) : (
                            ""
                          )} */}
                          </div>
                          <div className="col-lg-5 col-12">
                            <Typography style={{ fontSize: "14px" }}>
                              Foreign TIN{" "}
                              {values.foreginTIN_CountryId == 257 ? (<span>  <Tooltip
                                style={{
                                  backgroundColor: "black",
                                  color: "white",

                                }}
                                title={
                                  <>

                                    <a onClick={() => setToolInfo("foregionTIN")}>

                                    </a>
                                  </>
                                }
                              >
                                <Info
                                  onClick={() => setToolInfo("foregionTIN")}
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

                            {values.tinisFTINNotLegallyRequired === "No" ? (
                              <Input
                                fullWidth
                                type="text"
                                disabled={
                                  values.isFTINNotLegallyRequired ||
                                  values.foreginTIN_CountryId == "1"



                                }
                                name="foregionTIN"
                                value={values.foregionTIN}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  const re = /^[0-9\b]+$/;
                                  if (e.target.value === '' || re.test(e.target.value)) {
                                    handleChange(e)
                                  }
                                }}

                                inputProps={{ maxLength: 10 }}
                                placeholder="ENTER FOREIGN TIN"


                                error={Boolean(
                                  touched.foregionTIN && errors.foregionTIN
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
                                  values.isFTINNotLegallyRequired ||
                                  values.foreginTIN_CountryId == "" ||
                                  values.tinisFTINNotLegallyRequired === "NO"
                                }
                                placeholder="ENTER FOREIGN TIN"
                                name="foregionTIN"
                                value={values.foregionTIN}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // error={Boolean(
                                //   touched.foregionTIN && errors.foregionTIN
                                // )}
                                inputProps={{ maxLength: 11 }}
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
                            {errors?.foregionTIN && typeof errors?.foregionTIN === 'string' && (
                              <p className="error">{errors?.foregionTIN}</p>
                            )}


                            {/* {errors.foregionTIN &&
                            touched.foregionTIN ? (
                              <div>
                                <Typography color="error">
                                  {errors.foregionTIN}
                                </Typography>
                              </div>
                            ) : (
                              ""
                            )} */}





                            {/* <FormControl >
                            <RadioGroup
                              row
                              
                              name="tinisFTINNotLegallyRequired"
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              value={values.tinisFTINNotLegallyRequired}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="Yes"
                                disabled={values.isFTINNotLegallyRequired}
                                control={<Radio />}
                                label="Not Available"
                                name="tinisFTINNotLegallyRequired"
                              />
                              <FormControlLabel
                                className="label"
                                value="No"
                                control={<Radio />}
                                label="Alternative Tin Format"
                                disabled={values.isFTINNotLegallyRequired}
                                name="tinisFTINNotLegallyRequired"
                              />

                              {values.tinisFTINNotLegallyRequired === "Yes" ||
                              values.tinisFTINNotLegallyRequired === "No" ? (
                                <Delete
                                  onClick={() => {
                                    handleChange("tinisFTINNotLegallyRequired")(
                                      ""
                                    );
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

                            {errors.tinisFTINNotLegallyRequired &&
                            touched.tinisFTINNotLegallyRequired ? (
                              <div>
                                <Typography color="error">
                                  {errors.tinisFTINNotLegallyRequired}
                                </Typography>
                              </div>
                            ) : (
                              ""
                            )}
                          </FormControl> */}

                            <div  >
                              <FormControl className="col-12 radio">

                                <RadioGroup
                                  row
                                  name="tinisFTINNotLegallyRequired"
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  value={values.tinisFTINNotLegallyRequired}
                                  onChange={handleChange}
                                  onClick={() => {
                                    setFieldValue("foregionTIN", "");
                                    setTimeout(() => {
                                      setFieldValue("foreginTIN_CountryId", "");
                                      //setFieldValue("isFTINNotLegallyRequired", true)
                                    }, 200);
                                  }}

                                >
                                  <FormControlLabel
                                    value="NO"
                                    disabled={values.isFTINNotLegallyRequired}
                                    control={<Radio />}
                                    label="Not Available"
                                    name="tinisFTINNotLegallyRequired"
                                  />
                                  <FormControlLabel
                                    className="label"
                                    value="No"
                                    control={<Radio />}
                                    label="Alternative Tin Format"
                                    disabled={values.isFTINNotLegallyRequired}
                                    name="tinisFTINNotLegallyRequired"
                                  />

                                  {values.tinisFTINNotLegallyRequired === "Yes" ||
                                    values.tinisFTINNotLegallyRequired === "No" ? (
                                    <Delete
                                      onClick={() => {
                                        handleChange("tinisFTINNotLegallyRequired")(
                                          ""
                                        );
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

                                {errors.tinisFTINNotLegallyRequired &&
                                  touched.tinisFTINNotLegallyRequired ? (
                                  <div>
                                    <Typography color="error">
                                      {errors.tinisFTINNotLegallyRequired}
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
                      {values.isFTINNotLegallyRequired === true && (
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
                              name="isNotLegallyFTIN"
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              value={values.isNotLegallyFTIN}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                                name="isNotLegallyFTIN"
                              />
                              <FormControlLabel
                                className="label"
                                value="No"
                                control={<Radio />}
                                label="No"
                              // name="isNotLegallyFTIN"
                              />
                            </RadioGroup>
                            {errors.isNotLegallyFTIN &&
                              touched.isNotLegallyFTIN ? (
                              <div>
                                <Typography color="error">
                                  {errors.isNotLegallyFTIN}
                                </Typography>
                              </div>
                            ) : (
                              ""
                            )}
                          </FormControl>
                          {values.isNotLegallyFTIN === "Yes" ? (
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
                          ) : values.isNotLegallyFTIN === "No" ? (
                            ""
                          ) : (
                            ""
                          )}
                        </>
                      )}

                      <Divider className="dividr" />
                      <FieldArray name="items">
                        {({ push, remove }) => (
                          <div>
                            {values?.taxLbltyOtherJurisdictions?.map((item: any, index: any) => (
                              <div key={index}>



                                <Typography
                                  style={{
                                    fontSize: "17px",
                                    marginTop: "10px",

                                    marginBottom: "10px",
                                  }}
                                >
                                  Does the individual the submission represents have
                                  tax liability in any other jurisdictions?
                                </Typography>





                                <FormControl>

                                  <RadioGroup
                                    row
                                    defaultValue=""
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name={`taxLbltyOtherJurisdictions.${index}.doesIndiHavTaxLbltyinOtherJurisdictions`}
                                    value={values.taxLbltyOtherJurisdictions[index].doesIndiHavTaxLbltyinOtherJurisdictions}
                                    onChange={(event) => {
                                      const currentValue = event.currentTarget.value;

                                      if (currentValue === "Yes") {
                                        // Push a new item into the array only if the selected value is "Yes"

                                        if (index > 0) {
                                          if (values.taxLbltyOtherJurisdictions[index - 1].countryId === "" && values.taxLbltyOtherJurisdictions[index - 1].tinNotAvailable === false) {
                                            setTimeout(() => {
                                              setFieldValue(`taxLbltyOtherJurisdictions.${index - 1}.countryError`, true)
                                              setFieldValue(`taxLbltyOtherJurisdictions.${index - 1}.tinError`, true)
                                            }, 200)

                                          } else {
                                            setTimeout(() => {
                                              setFieldValue(`taxLbltyOtherJurisdictions.${index - 1}.countryError`, false)
                                              setFieldValue(`taxLbltyOtherJurisdictions.${index - 1}.tinError`, false)

                                            }, 200)
                                          }

                                          if (values.taxLbltyOtherJurisdictions[index - 1].countryId !== "" || values.taxLbltyOtherJurisdictions[index - 1].tinNotAvailable === true) {
                                            handleChange({
                                              target: {
                                                name: "taxLbltyOtherJurisdictions",
                                                value: [
                                                  ...values.taxLbltyOtherJurisdictions,
                                                  {
                                                    id: 0,
                                                    agentId: authDetails?.agentId,
                                                    formTypeId: FormTypeId.CaymanIndividual,
                                                    formEntryId: 0,
                                                    accountHolderDetailsId: authDetails?.accountHolderId,
                                                    doesIndiHavTaxLbltyinOtherJurisdictions: "No",
                                                    countryId: "257",
                                                    taxReferenceNumber: "",
                                                    isTINFormatNotAvailable: false,
                                                    countryError: false,
                                                    tinError: false,
                                                    tinNotAvailable: false
                                                  }
                                                ],
                                              },
                                            });
                                            setFieldValue(`taxLbltyOtherJurisdictions.${index}.doesIndiHavTaxLbltyinOtherJurisdictions`, currentValue);
                                          }
                                        } else {
                                          handleChange({
                                            target: {
                                              name: "taxLbltyOtherJurisdictions",
                                              value: [
                                                ...values.taxLbltyOtherJurisdictions,
                                                {
                                                  id: 0,
                                                  agentId: authDetails?.agentId,
                                                  formTypeId: FormTypeId.CaymanIndividual,
                                                  formEntryId: 0,
                                                  accountHolderDetailsId: authDetails?.accountHolderId,
                                                  doesIndiHavTaxLbltyinOtherJurisdictions: "No",
                                                  countryId: "257",
                                                  taxReferenceNumber: "",
                                                  isTINFormatNotAvailable: false,
                                                  countryError: false,
                                                  tinError: false,
                                                  tinNotAvailable: false
                                                }
                                              ],
                                            },
                                          });
                                          setFieldValue(`taxLbltyOtherJurisdictions.${index}.doesIndiHavTaxLbltyinOtherJurisdictions`, currentValue);
                                        }



                                      }

                                    }}

                                    id="doesIndiHavTaxLbltyinOtherJurisdictions"
                                  >
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="Yes"
                                      name={`taxLbltyOtherJurisdictions.${index}.doesIndiHavTaxLbltyinOtherJurisdictions`}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="No"
                                      name={`taxLbltyOtherJurisdictions.${index}.doesIndiHavTaxLbltyinOtherJurisdictions`}
                                      label="No"
                                    />
                                  </RadioGroup>

                                  {/* <p className="error">
                                        {errors.doesIndiHavTaxLbltyinOtherJurisdictions}
                                      </p> */}
                                </FormControl>
                                {/* <Divider className="dividr" /> */}
                                {values.taxLbltyOtherJurisdictions[index].doesIndiHavTaxLbltyinOtherJurisdictions == 'Yes' ? (
                                  <>

                                    <DeleteOutline type="button" onClick={(e) => {
                                      //remove(index);
                                      setFieldValue(
                                        "taxLbltyOtherJurisdictions",
                                        values.taxLbltyOtherJurisdictions.filter((_: any, indexes: any) => indexes !== index)
                                      );

                                    }




                                    } />
                                    <Typography>
                                      Please select the country where taxes are paid:
                                      <span style={{ color: "red" }}>*</span>
                                    </Typography>
                                    <FormControl className="form">
                                      <select
                                        style={{
                                          padding: " 0 10px",
                                          color: "#121112",
                                          fontStyle: "italic",
                                          height: "36px",
                                        }}
                                        name={`taxLbltyOtherJurisdictions.${index}.countryId`}
                                        id="Income"
                                        defaultValue={1}
                                        onChange={(e) => {
                                          handleChange(e)
                                          setTimeout(() => {
                                            setFieldValue(`taxLbltyOtherJurisdictions.${index}.countryError`, false);

                                            // if(values?.taxLbltyOtherJurisdictions?.[index]?.countryId == 0)
                                            //   {
                                            //     setFieldValue(`taxLbltyOtherJurisdictions.${index}.countryError`, true);
                                            //   }else{
                                            //     setFieldValue(`taxLbltyOtherJurisdictions.${index}.countryError`, false);
                                            //   }

                                          }, 200)
                                        }}
                                        value={values?.taxLbltyOtherJurisdictions?.[index]?.countryId}
                                      >
                                        <option value="0">---select---</option>
                                        <option value={45}>-canada-</option>
                                        <option value={257}>United Kingdom</option>
                                        <option value={258}>United States</option>
                                        <option value="">-----</option>
                                        {GetAgentCountriesImportantForEformData?.map(
                                          (ele: any) => (
                                            <option key={ele?.id} value={ele?.id}>
                                              {ele?.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                      {
                                        values.taxLbltyOtherJurisdictions[index].countryError === true ?
                                          <p className="error">Please select Country</p>
                                          :
                                          ""
                                      }
                                    </FormControl>

                                    {/* <Divider className="dividr" /> */}

                                    <Typography>
                                      Enter TIN:
                                    </Typography>


                                    <div className="d-flex">
                                      <FormControl className="form">
                                        {values.taxLbltyOtherJurisdictions[index].tinNotAvailable === true ? (

                                          <Input
                                            name={`taxLbltyOtherJurisdictions.${index}.tinNumber`}
                                            onChange={(e) => {
                                              handleChange(e)
                                              setTimeout(() => {
                                                setFieldValue(`taxLbltyOtherJurisdictions.${index}.tinError`, false);
                                              }, 200)
                                            }}
                                            value={values.taxLbltyOtherJurisdictions[index].tinNumber}
                                            disabled
                                            className="input"
                                            placeholder="ENTER TIN"
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
                                            name={`taxLbltyOtherJurisdictions.${index}.tinNumber`}
                                            onChange={(e) => {
                                              handleChange(e)
                                              setTimeout(() => {
                                                setFieldValue(`taxLbltyOtherJurisdictions.${index}.tinError`, false);
                                              }, 200)
                                            }}
                                            value={values.taxLbltyOtherJurisdictions[index].tinNumber}
                                            className="number"
                                            placeholder="ENTER TIN"
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
                                        {/* {
                                                values.taxLbltyOtherJurisdictions[index].doesIndiHavTaxLbltyinOtherJurisdictions === 'Yes' &&
                                                values.taxLbltyOtherJurisdictions[index].taxReferenceNumber === "" 
                                                ? 
                                                (setFieldValue("isValid", false), <p className="error">Please enter Tax Reference Number</p>)
                                                : 
                                                (setFieldValue("isValid", true), null)
                                              } */}
                                        {
                                          values.taxLbltyOtherJurisdictions[index].tinError === true ?
                                            <p className="error">Please Enter TIN</p>
                                            :
                                            ""
                                        }

                                      </FormControl>
                                      {/* {values.permanentResidentialCountryId == 257?( */}
                                      <div className="d-flex">
                                        <Checkbox
                                          name={`taxLbltyOtherJurisdictions.${index}.tinNotAvailable`}
                                          onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            const newValue = isChecked ? true : false; // Convert checked state to boolean
                                            setFieldValue(`taxLbltyOtherJurisdictions.${index}.tinNotAvailable`, newValue);
                                            // Optionally, reset taxReferenceNumber when the checkbox is checked
                                            if (isChecked) {
                                              setFieldValue(`taxLbltyOtherJurisdictions.${index}.tinNumber`, "");
                                              setFieldValue(`taxLbltyOtherJurisdictions.${index}.countryId`, "");
                                            }
                                          }}
                                          checked={values.taxLbltyOtherJurisdictions[index].tinNotAvailable || false} // Ensure value is boolean
                                        />
                                        <div className="mt-2">
                                          Not Available
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <Checkbox
                                          name={`taxLbltyOtherJurisdictions.${index}.isAlternativeTinFormat`}
                                          onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            const newValue = isChecked ? true : false; // Convert checked state to boolean
                                            setFieldValue(`taxLbltyOtherJurisdictions.${index}.isAlternativeTinFormat`, newValue);
                                            // Optionally, reset taxReferenceNumber when the checkbox is checked
                                            //if (isChecked) {
                                            setFieldValue(`taxLbltyOtherJurisdictions.${index}.tinNumber`, "");
                                            setFieldValue(`taxLbltyOtherJurisdictions.${index}.tinError`, true)
                                            // setFieldValue(`taxLbltyOtherJurisdictions.${index}.countryId`, "");
                                            //}
                                          }}
                                          checked={values.taxLbltyOtherJurisdictions[index].isAlternativeTinFormat || false} // Ensure value is boolean
                                        />
                                        <div className="mt-2">
                                          Alternative TIN Format
                                        </div>
                                      </div>


                                    </div>

                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            ))}

                          </div>
                        )}
                      </FieldArray>
                      <Divider className="dividr" />
                      {values.notAvailable ? (<div style={{ marginLeft: "20px" }}>
                        <Typography>
                          Please specify the reason for non-availability of US TIN{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <textarea
                          name="reasionForUSTIN_NotAvailable"
                          value={
                            values.reasionForUSTIN_NotAvailable
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#121112",
                            //fontStyle: "italic",
                            height: "8rem",
                            width: "100%",
                          }} />
                        {/* <Input
                        fullWidth
                        value={values.reasionForUSTIN_NotAvailable}
                        name="reasionForUSTIN_NotAvailable"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // onChange={(e: any) => {
                        //   handleChange(e);
                        //     setFieldValue("","");
                        // }}
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#7e7e7e",
                          fontStyle: "italic",
                          height: "6rem",
                          width: "100%",
                        }}
                      /> */}
                        {errors?.reasionForUSTIN_NotAvailable && typeof errors?.reasionForUSTIN_NotAvailable === 'string' && (
                          <p className="error">{errors?.reasionForUSTIN_NotAvailable}</p>
                        )}


                      </div>) : ""}


                      {values.tinisFTINNotLegallyRequired === "NO" ? (
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


                          <textarea
                            name="reasionForForegionTIN_NotAvailable"
                            value={
                              values.reasionForForegionTIN_NotAvailable
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              //color: "#121112",
                              //fontStyle: "italic",
                              height: "8rem",
                              width: "100%",
                            }} />

                          {/* <Input
                            fullWidth
                            type="text"
                            name="reasionForForegionTIN_NotAvailable"
                            value={values.reasionForForegionTIN_NotAvailable}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.reasionForForegionTIN_NotAvailable && errors.reasionForForegionTIN_NotAvailable)}
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "#7e7e7e",
                              fontStyle: "italic",
                              height: "7rem",
                              width: "100%",
                            }}
                          /> */}
                          {errors?.reasionForForegionTIN_NotAvailable && typeof errors?.reasionForForegionTIN_NotAvailable === 'string' && (
                            <p className="error">{errors?.reasionForForegionTIN_NotAvailable}</p>
                          )}
                        </div>
                      ) : (
                        ""
                      )}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "5rem",
                        }}
                      >
                        <SaveAndExit Callback={() => {
                          submitForm().then(() => {
                            const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                            const urlValue = window.location.pathname.substring(1);
                            dispatch(postSCIndividualEForm(
                              {
                                ...prevStepData,
                                stepName: `/${urlValue}`
                              }
                              , () => { }))
                            history(
                              GlobalValues.basePageRoute
                            );
                          })
                        }} formTypeId={FormTypeId.CaymanEntity} ></SaveAndExit>
                        <Button
                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={() => {
                            dispatch(GetCaymanEntityPdf(authDetails?.accountHolderId, (callbackData:any)=>{
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
                          variant="contained"
                          //disabled={!isValid}
                          style={{ color: "white", marginLeft: "15px" }}
                        >
                          Continue
                        </Button>
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
                            history(-1)
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
                    </Paper>
                  </div>
                </div>
              </div>
              <PopupModa data={popupState} setPopupState={setPopupState} />
            </section>
          </Form>
        )}
      </Formik>
    </>
  );
}
