import React, { useState, useEffect } from "react";
import {
  Collapse,
  FormControl,
  Typography,
  Button,
  Tooltip,
  Link,
  Input,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Checkbox,
  Divider,
  IconButton,
} from "@mui/material";
import { Form, Formik } from "formik";
import { W8_state_ECI, PostDualCert, GetHelpVideoDetails } from "../../../../Redux/Actions";
import { certificateSchema_w9_DC } from "../../../../schemas/w8Exp";
import InfoIcon from "@mui/icons-material/Info";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import View_Insructions from "../../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import { useNavigate } from "react-router-dom";
import { ControlPointOutlined, Info, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { CardHeader } from "reactstrap";
import moment from "moment";
import DatePicker from "react-date-picker";
type ValuePiece = Date | null;
type Value2 = ValuePiece | [ValuePiece, ValuePiece];
export default function Certifications(props: any) {
  const location = useLocation();
  const PrevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");
  console.log(PrevStepData, "prevv")
  const urlValue = location.pathname.substring(1);
  const initialValue = {

    confirmThisisaTrueAndAccurate: false,
    confirmYouhaveRewiedElectronicForm: false,

  };
  const [initialValues, setInitialValues] = useState({
    id: 0,
    isUSIndividual: "yes",
    firstName: "",
    lastName: "",
    countryOfCitizenshipId: 0,
    uniqueIdentifier: "",
    countryOfBirthId: 0,
    cityOfBirth: "",
    dob: "",
  });
  const history = useNavigate();
  const dispatch = useDispatch();
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [value, onChange] = useState<Value2>(null);
  const [canvaBx, setCanvaBx] = useState(false);
  const [open, setOpen] = useState("");
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const allCountriesData = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }
  const handleOpen = (val: any) => {
    if (open === val) {
      setOpen("");
    } else setOpen(val);
  };
  useEffect(() => {
    document.title = "Certification I"
  }, [])
  useEffect(() => {
    dispatch(GetHelpVideoDetails());
  }, [])
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [toolInfo, setToolInfo] = useState("");
  const ahdData: any = useSelector((state: any) => state?.accountHolder);

  const accountHolderDetails = JSON.parse(localStorage.getItem("accountHolderDetails") || "{}")
  const authDetailsString = localStorage.getItem("authDetails") || "{}";
  const auth = JSON.parse(authDetailsString);
  const userType = auth?.configurations?.userType;
  const LoadPageData = () => {
    if (ahdData !== null && ahdData !== undefined) {
      let temp = {
        ...ahdData,
        id: accountHolderDetails.id ?? 0,
        isUSEntity: ahdData.isUSEntity === true ? "yes" : "no",
        isUSIndividual: ahdData.isUSIndividual === true ? "yes" : "no",
        isAddressRuralRoute: ahdData.isAddressRuralRoute === true ? "yes" : "no",
        isAddressPostOfficeBox: ahdData.isAddressPostOfficeBox === true ? "yes" : "no",
        isCareOfAddress: ahdData.isCareOfAddress === true ? "yes" : "no",
        isalternativebusinessaddress: ahdData.isalternativebusinessaddress === true ? "yes" : "no",
      };
      setInitialValues(temp);
    }
  }
  const setAccountHolder = (e: any, values: any): any => {
    if (values.accountHolderName === "") {
      values.accountHolderName = values.firstName + values.lastName;
    } else values.accountHolderName = e.target.value;
  };
  const viewPdf = () => {
    history("w9_pdf");
  }
  
  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <View_Insructions canvaBx={canvaBx} handleCanvaClose={handleCanvaClose} />
      {canvaBx === true ? (<div className="offcanvas-backdrop fade show" onClick={() => { handleCanvaClose() }}></div>) : null}

      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions" onClick={() => { handleCanvaOpen(); }}>View Instructions</div>
          <div className="viewform" onClick={viewPdf}>View Form</div>
          <div className="helpvideo">
            {GethelpData && GethelpData[8].id === 10 ? (
              <a
                href={GethelpData[8].fieldValue}
                target="popup"
                onClick={() =>
                  window.open(
                    GethelpData[8].fieldValue,
                    'name',
                    `width=${GethelpData[8].width},height=${GethelpData[8].height},top=${GethelpData[8].top},left=${GethelpData[8].left}`
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
      <div className="row w-100 " >
        <div className="col-4">
          <div style={{ padding: "20px 0px", height: "100%" }}>
            <BreadCrumbComponent breadCrumbCode={1500} formName={1} />

          </div>
        </div>

        <div className="col-8 mt-3">
          <div style={{ padding: "10px" }}>
            <Paper >
              <Formik
                validateOnChange={true}
                initialValues={initialValues}
                validateOnBlur={true}
                enableReinitialize
                validationSchema={certificateSchema_w9_DC}
                onSubmit={(values, { setSubmitting }) => {
                  const submitPromise = new Promise((resolve, reject) => {
                    setSubmitting(true);

                    const result = [{ ...PrevStepData[0], ...values, stepName: `/${urlValue}` }];
                    // dispatch(
                    //   PostDualCert(result, () => {
                    //     localStorage.setItem("DualCertData", JSON.stringify(result))
                    //     history("/Participation_W9_DC")

                    //     resolve("");
                    //   },
                    //     (err: any) => {
                    //       reject(err);
                    //       setSubmitting(false);
                    //     })
                    // );
                  });

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
                    <Paper style={{ padding: "14px" }}>
                      <div
                        className="flex-row-reverse"
                        >
                          <IconButton
                            onClick={() => handleOpen("basics")}
                            aria-label="expand"
                            size="small"
                            // style={{ marginTop: "3px" }}
                          >
                            {open === "basics" ? (
                              <RemoveCircleOutlineOutlined />
                            ) : (
                              <ControlPointOutlined />
                            )}
                          </IconButton>
                        {/* } */}
                        Basics Details
                      </div>
                  {open==="basics" ?
                       ( <div className="row">
                          <div className="col-lg-3 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">
                                First Name<span style={{ color: "red" }}>*</span>
                              </Typography>
                              <Input
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  height: " 36px",
                                  lineHeight: "36px ",
                                  background: "#fff ",
                                  fontSize: "13px",
                                  color: " #000 ",
                                  fontStyle: "normal",
                                  borderRadius: "1px",
                                  padding: " 0 10px ",
                                }}
                                id="outlined"
                                name="firstName"
                                placeholder="Enter First Name"
                                onBlur={handleBlur}
                                error={Boolean(errors.firstName && touched.firstName)}
                                onChange={handleChange}
                                value={values.firstName}

                              />
                              {errors.firstName && touched.firstName ? <p className="error">{errors.firstName}</p> : <></>}

                            </FormControl>
                          </div>
                          <div className="col-lg-3 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">
                                Last Name<span style={{ color: "red" }}>*</span>
                              </Typography>
                              <Input
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  height: " 36px",
                                  lineHeight: "36px ",
                                  background: "#fff ",
                                  fontSize: "13px",
                                  color: " #000 ",
                                  fontStyle: "normal",
                                  borderRadius: "1px",
                                  padding: " 0 10px ",
                                }}
                                id="outlined"
                                name="lastName"
                                placeholder="Enter Last Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.lastName && errors.lastName
                                )}
                                value={values.lastName}
                              />

                              {errors.lastName && touched.lastName ? <p className="error">{errors.lastName}</p> : <></>}
                            </FormControl>
                          </div>
                          {userType === "DC" && (<>
                            <div className="col-lg-3 col-6 col-md-3 mt-2">
                              <FormControl className="w-100">
                                <Typography align="left">
                                  Country Of Citizenship
                                  <span style={{ color: "red" }}>*</span>
                                </Typography>

                                <select
                                  style={{
                                    padding: " 0 10px",
                                    color: "#121112",
                                    fontStyle: "italic",
                                    height: "36px",
                                  }}
                                  name="countryOfCitizenshipId"
                                  id="countryOfCitizenshipId"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  // error={Boolean(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                  value={values.countryOfCitizenshipId}
                                >
                                  <option value="">---select---</option>
                                  <option value={257}>United Kingdom</option>
                                  <option value={258}>United States</option>
                                  <option value={500}>---</option>
                                  {getCountriesReducer.allCountriesData?.map(
                                    (ele: any) => (
                                      <option key={ele?.id} value={ele?.id}>
                                        {ele?.name}
                                      </option>
                                    )
                                  )}
                                </select>
                                {errors.countryOfCitizenshipId && touched.countryOfCitizenshipId ? <p className="error">{errors.countryOfCitizenshipId}</p> : <></>}

                              </FormControl>
                            </div>
                          </>)}

                          <div className="col-lg-3 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">
                                Date of Birth
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                              <DatePicker
                                className="dateclass"
                                onBlur={handleBlur}
                                name="dob"
                                onChange={(date) => {
                                  onChange(date);
                                  setFieldValue("dob", date);
                                }}
                                maxDate={moment().toDate()}
                                value={value}
                                clearIcon={null}
                                format="MM-dd-yy"
                                dayPlaceholder="DD"
                                monthPlaceholder="MM"
                                yearPlaceholder="YYYY"
                              />
                              {errors.dob && touched.dob ? (<p className="error">{errors.dob}</p>) : ""}

                            </FormControl>
                          </div>
                          <div className="col-lg-3 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">
                                Country Of Birth
                                <span style={{ color: "red" }}>**</span>
                              </Typography>

                              <select
                                style={{
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "36px",
                                }}
                                name="countryOfBirthId"
                                id="countryOfBirthId"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                onBlur={handleBlur}
                                //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                value={values.countryOfBirthId}
                              >
                                <option value="">---select---</option>
                                <option value={257}>United Kingdom</option>
                                <option value={258}>United States</option>
                                <option value={500}>---</option>
                                {getCountriesReducer.allCountriesData?.map(
                                  (ele: any) => (
                                    <option key={ele?.id} value={ele?.id}>
                                      {ele?.name}
                                    </option>
                                  )
                                )}
                              </select>
                              {errors.countryOfBirthId && touched.countryOfBirthId ? (<p className="error">{errors.countryOfBirthId}</p>) : ""}
                              {/* {errors.countryOfBirthId && touched.countryOfBirthId ? <p className="error">{errors.countryOfBirthId}</p> : <></>} */}
                              {/* {errors?.countryOfBirthId && typeof errors?.countryOfBirthId === 'string' && (
                                    <p className="error">{errors?.countryOfBirthId}</p>
                                  )} */}
                              {/* <select
                    style={{
                        padding: " 0 10px",
                        color: "#7e7e7e",
                        fontStyle: "italic",
                        height: "36px",
                    }}
                    name="countryOfCitizenshipId"
                    id="countryOfCitizenshipId"
                    onChange={(e) => {
                        handleChange(e); 
                    }}
                    onBlur={handleBlur}
                    // error={Boolean(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                    value={values.countryOfCitizenshipId}
                >
                    <option value="">-Select-</option>
                    <option value={257}>United Kingdom</option>
                    <option value={258}>United States</option>
                    <option value="">---</option>
                    {getCountriesReducer.allCountriesData?.map(
                        (ele: any) => (
                            <option key={ele?.id} value={ele?.id}>
                                {ele?.name}
                            </option>
                        )
                    )}
                </select> */}
                              {/* {errors.countryOfCitizenshipId && touched.countryOfCitizenshipId ?<p className="error">{errors.countryOfCitizenshipId}</p>:<></>} */}
                              {/* {errors.countryOfBirthId && touched.countryOfBirthId ? <p className="error">{errors.countryOfBirthId}</p> : <></>} */}
                              {/* {errors?.countryOfBirthId && typeof errors?.countryOfBirthId === 'string' && (
                                    <p className="error">{errors?.countryOfBirthId}</p>
                                  )} */}
                            </FormControl>
                          </div>
                          <div className="col-lg-3 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">
                                Town/City of Birth<span style={{ color: "red" }}>**</span>
                              </Typography>
                              <Input
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  height: " 36px",
                                  lineHeight: "36px ",
                                  background: "#fff ",
                                  fontSize: "13px",
                                  color: " #000 ",
                                  fontStyle: "normal",
                                  borderRadius: "1px",
                                  padding: " 0 10px ",
                                }}
                                id="outlined"
                                name="cityOfBirth"
                                placeholder="Enter Town/City of Birth"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.cityOfBirth && errors.cityOfBirth
                                )}
                                value={values.cityOfBirth}
                              />

                              {errors.cityOfBirth && touched.cityOfBirth ? <p className="error">{errors.cityOfBirth}</p> : <></>}
                              {/* {errors?.cityOfBirth && touched.cityOfBirth && typeof errors?.cityOfBirth === 'string' && (
                                    <p className="error">{errors?.cityOfBirth}</p>
                                  )} */}
                            </FormControl>
                          </div>
                        </div>):""
                    
                                }







                      <div
                        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
                      >

                        <Button

                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={viewPdf}
                        >
                          View form
                        </Button>
                        <Button
                          type="submit"
                          //   disabled={!isValid}

                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={() => {
                            submitForm().then((data) => {
                              history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE/Participation_BenE/Submit_DC");
                            }).catch((error) => {
                              console.log(error);
                            })
                          }}
                        >
                          Continue
                        </Button>
                      </div>

                    </Paper>
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
