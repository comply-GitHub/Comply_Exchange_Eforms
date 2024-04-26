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
import { W8_state_ECI, PostDualCert, GetHelpVideoDetails,getAllCountries } from "../../../Redux/Actions";
import { SelfCertSchema_w9_DC } from "../../../schemas/w8Exp";
import InfoIcon from "@mui/icons-material/Info";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import View_Insructions from "../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import { useNavigate } from "react-router-dom";
import { ControlPointOutlined, Info, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { CardHeader } from "reactstrap";
import moment from "moment";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "./index.scss";
type ValuePiece = Date | null;
type Value2 = ValuePiece | [ValuePiece, ValuePiece];
export default function Certifications(props: any) {
  const location = useLocation();
  const PrevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");
  console.log(PrevStepData, "prevv")
  const urlValue = location.pathname.substring(1);
  const initialValue = {

    FirstName:"",
    FamilyName:"",
    DateOfBirth:"",
    CountryOfBirth:"",
    CityOfBirth:"",
    HouseNo:"",
    RoadName:"",
    Location:"",
    CityNTown:"",
    StateNProvience:"",
    ZipNPostal:"",
    ResidentialCountry:"",
    Country:"",
    TinType:"",
    Tin:"",
    TinAvailable:false,
    Country1:"",
    TinType1:"",
    Tin1:"",
    TinAvailable1:false,
    Country2:"",
    TinType2:"",
    Tin2:"",
    TinAvailable2:false,
    ReasonNonAvailability:"",
    LegalEntity1:"",
    LegalEntity2:"",
    LegalEntity3:"",
    StatusEntity1:"",
    StatusEntity2:"",
    StatusEntity3:"",
    Ownership:"",
    EmailAdd:"",
    SubmissionRequest:false
  };
  const [initialValues, setInitialValues] = useState({
  
   FirstName:"",
   FamilyName:"",
   DateOfBirth:"",
   CountryOfBirth:"",
   CityOfBirth:"",
   HouseNo:"",
   RoadName:"",
   Location:"",
   CityNTown:"",
   StateNProvience:"",
   ZipNPostal:"",
   ResidentialCountry:"",
   Country:"",
   TinType:"",
   Tin:"",
   TinAvailable:false,
   Country1:"",
   TinType1:"",
   Tin1:"",
   TinAvailable1:false,
   Country2:"",
   TinType2:"",
   Tin2:"",
   TinAvailable2:false,
   ReasonNonAvailability:"",
   LegalEntity1:"",
   LegalEntity2:"",
   LegalEntity3:"",
   StatusEntity1:"",
   StatusEntity2:"",
   StatusEntity3:"",
   Ownership:"",
   EmailAdd:"",
   SubmissionRequest:false


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
    document.title = "Controlling Person(s) of a Passive NFE"
  }, [])
  useEffect(() => {
    dispatch(GetHelpVideoDetails());
    dispatch(getAllCountries());
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
      values.accountHolderName = values.FirstName + values.FamilyName;
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
                validationSchema={SelfCertSchema_w9_DC}
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
                     <div>
<Typography style={{fontSize:"26px",fontWeight:"550",marginLeft:"8px"}}className="mt-2 mb-3">Self Certification - Controlling Person(s) of a Passive NFE</Typography>
                     <div
                        className="flex-row-reverse"
                        >
                          <div className="d-flex">
                          <IconButton
                            onClick={() => handleOpen("basics")}
                            aria-label="expand"
                            size="small"
                            
                          >
                            {open === "basics" ? (
                              <RemoveCircleOutlineOutlined />
                            ) : (
                              <ControlPointOutlined />
                            )}
                          </IconButton>
                
                       <Typography style={{fontSize:"20px",fontWeight:"540",marginTop:"3px"}}> Basics Details</Typography>
                          </div>
                      </div>
                  {open==="basics" ?
                       ( <div className="row mt-3" style={{marginLeft:"10px"}}>
                          <div className="col-lg-4 col-6 col-md-3 mt-2">
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
                                name="FirstName"
                                placeholder="Enter First Name"
                                onBlur={handleBlur}
                                error={Boolean(errors.FirstName && touched.FirstName)}
                                onChange={handleChange}
                                value={values.FirstName}

                              />
                              {errors.FirstName && touched.FirstName ? <p className="error">{errors.FirstName}</p> : <></>}

                            </FormControl>
                          </div>
                          <div className="col-lg-4 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">
                              Family Name:<span style={{ color: "red" }}>*</span>
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
                                name="FamilyName"
                                placeholder="Enter Last Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.FamilyName && errors.FamilyName
                                )}
                                value={values.FamilyName}
                              />

                              {errors.FamilyName && touched.FamilyName ? <p className="error">{errors.FamilyName}</p> : <></>}
                            </FormControl>
                          </div>
                        

                          <div className="col-lg-4 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">
                              Date of birth:
                              
                              </Typography>
                              <DatePicker 
                                className="dateclass"
                                onBlur={handleBlur}
                                name="DateOfBirth"
                                onChange={(date) => {
                                  onChange(date);
                                  setFieldValue("DateOfBirth", date);
                                }}
                                maxDate={moment().toDate()}
                                value={value}
                                clearIcon={null}
                                format="MM-dd-yy"
                                dayPlaceholder="DD"
                                monthPlaceholder="MM"
                                yearPlaceholder="YYYY"
                              />
                              {errors.DateOfBirth && touched.DateOfBirth ? (<p className="error">{errors.DateOfBirth}</p>) : ""}

                            </FormControl>
                          </div>
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
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
                                name="CountryOfBirth"
                                id="CountryOfBirth"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                onBlur={handleBlur}
                                //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                value={values.CountryOfBirth}
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
                              {errors.CountryOfBirth && touched.CountryOfBirth ? (<p className="error">{errors.CountryOfBirth}</p>) : ""}
                            
                            </FormControl>
                          </div>
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                             City of Birth
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
                                name="CityOfBirth"
                                placeholder="Enter Town/City of Birth"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.CityOfBirth && errors.CityOfBirth
                                )}
                                value={values.CityOfBirth}
                              />

                              {errors.CityOfBirth && touched.CityOfBirth ? <p className="error">{errors.CityOfBirth}</p> : <></>}
                              {/* {errors?.CityOfBirth && touched.CityOfBirth && typeof errors?.CityOfBirth === 'string' && (
                                    <p className="error">{errors?.CityOfBirth}</p>
                                  )} */}
                            </FormControl>
                          </div>
                         
                        </div>
                        
                        ):""
                    
                    }
                     <hr className="w-100"></hr>
                     <div
                        className="flex-row-reverse"
                        >
                          <div className="d-flex">
                          <IconButton
                            onClick={() => handleOpen("permanant")}
                            aria-label="expand"
                            size="small"
                            
                          >
                            {open === "permanant" ? (
                              <RemoveCircleOutlineOutlined />
                            ) : (
                              <ControlPointOutlined />
                            )}
                          </IconButton>
                
                       <Typography style={{fontSize:"20px",fontWeight:"540",marginTop:"3px"}}>Permanent Residence Address</Typography>
                          </div>
                      </div>

                     {open==="permanant" ?
                       ( <div className="row mt-3" style={{marginLeft:"10px"}}>
                        <Typography style={{fontWeight:"bold"}}>Please enter the permanent address details here:</Typography>
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              House Number or Name:
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
                                name="HouseNo"
                                placeholder="Enter House Name"
                                onBlur={handleBlur}
                                error={Boolean(errors.HouseNo && touched.HouseNo)}
                                onChange={handleChange}
                                value={values.HouseNo}

                              />
                              {errors.HouseNo && touched.HouseNo ? <p className="error">{errors.HouseNo}</p> : <></>}

                            </FormControl>
                          </div>
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              Road Name:
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
                                name="RoadName"
                                placeholder="Enter Road Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.RoadName && errors.RoadName
                                )}
                                value={values.RoadName}
                              />

                              {errors.RoadName && touched.RoadName ? <p className="error">{errors.RoadName}</p> : <></>}
                            </FormControl>
                          </div>
                        

                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              Location:
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
                                name="Location"
                                placeholder="Enter Location"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.Location && errors.Location
                                )}
                                value={values.Location}
                              />

                              {errors.Location && touched.Location ? <p className="error">{errors.Location}</p> : <></>}
                            </FormControl>
                          </div>

                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              City or Town:<span style={{ color: "red" }}>*</span>
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
                                name="CityNTown"
                                placeholder="Enter Town/City of Birth"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.CityNTown && errors.CityNTown
                                )}
                                value={values.CityNTown}
                              />

                              {errors.CityNTown && touched.CityNTown ? <p className="error">{errors.CityNTown}</p> : <></>}
                            
                            </FormControl>
                          </div>
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              State or Province:
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
                                name="StateNProvience"
                                placeholder="Enter Town/City of Birth"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.StateNProvience && errors.StateNProvience
                                )}
                                value={values.StateNProvience}
                              />

                              {errors.StateNProvience && touched.StateNProvience ? <p className="error">{errors.StateNProvience}</p> : <></>}
                            
                            </FormControl>
                          </div>
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              Zip or Postal Code:
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
                                name="ZipNPostal"
                                placeholder="Enter Zip And Postal Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.ZipNPostal && errors.ZipNPostal
                                )}
                                value={values.ZipNPostal}
                              />

                              {errors.ZipNPostal && touched.ZipNPostal ? <p className="error">{errors.ZipNPostal}</p> : <></>}
                            
                            </FormControl>
                          </div>
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              Residential Country:
                                <span style={{ color: "red" }}>*</span>
                              </Typography>

                              <select
                                style={{
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "36px",
                                }}
                                name="ResidentialCountry"
                                id="ResidentialCountry"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                onBlur={handleBlur}
                                //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                value={values.ResidentialCountry}
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
                              {errors.ResidentialCountry && touched.ResidentialCountry ? (<p className="error">{errors.ResidentialCountry}</p>) : ""}
                            
                            </FormControl>
                          </div>
                          
                          <div className="col-lg-12 col-12 col-md-3 mt-3">
                            <FormControl className="w-100">
                             <Typography align="left">
                             <Button variant="outlined" style={{fontSize:"12px",width:"30%"}}>
                              +Alternate Mailing Address
                              </Button>
                             </Typography>
                            
                            </FormControl>
                          </div>
                        </div>
                        
                        ):""
                    
                    }
                     <hr className="w-100"></hr>
                     <div
                        className="flex-row-reverse"
                        >
                          <div className="d-flex">
                          <IconButton
                            onClick={() => handleOpen("jurisdiction")}
                            aria-label="expand"
                            size="small"
                            
                          >
                            {open === "jurisdiction" ? (
                              <RemoveCircleOutlineOutlined />
                            ) : (
                              <ControlPointOutlined />
                            )}
                          </IconButton>
                
                       <Typography style={{fontSize:"20px",fontWeight:"540",marginTop:"3px"}}>Primary Tax jurisdiction</Typography>
                          </div>
                      </div>

                     {open==="jurisdiction" ?
                       (
                         <div className="row mt-3" style={{marginLeft:"10px"}}>
                        <Typography style={{fontWeight:"bold"}}>Primary Tax Jurisdiction:</Typography>
                          
                        <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              Country:
                              
                              </Typography>

                              <select
                                style={{
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "36px",
                                }}
                                name="Country"
                                id="Country"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                onBlur={handleBlur}
                                //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                value={values.Country}
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
                              {errors.Country && touched.Country ? (<p className="error">{errors.Country}</p>) : ""}
                            
                            </FormControl>
                          </div>
                        

                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              TIN Type:
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
                                name="TinType"
                                placeholder="Enter Tin Type"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.TinType && errors.TinType
                                )}
                                value={values.TinType}
                              />

                              {errors.TinType && touched.TinType ? <p className="error">{errors.TinType}</p> : <></>}
                            </FormControl>
                          </div>

                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              TIN:
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
                                name="Tin"
                                placeholder="Enter TIN"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.Tin && errors.Tin
                                )}
                                value={values.Tin}
                              />

                              {errors.Tin && touched.Tin ? <p className="error">{errors.Tin}</p> : <></>}
                            
                            </FormControl>
                          </div>
                         
                          <div className="col-lg-12 col-12 col-md-3">
                            <div className="d-flex">
                              <Checkbox name="TinAvailable" checked={values?.TinAvailable} onChange={handleChange} />
                              <Typography className="mt-2" style={{fontSize:"14px"}}>
                                TIN Unavailable
                              </Typography>
                            </div>
                          </div>
                          <div className="col-lg-12 col-12 col-md-3 mt-3 mb-3">
                            <FormControl className="w-100">
                             <Typography align="left">
                             <Button variant="outlined" style={{fontSize:"12px",width:"30%"}}>
                             Add an additional TIN
                              </Button>
                             </Typography>
                            
                            </FormControl>
                          </div>
                          <Typography style={{fontWeight:"bold"}}>Additional Tax Jurisdiction:</Typography>
                          
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                Country:
                               
                                </Typography>
  
                                <select
                                  style={{
                                    padding: " 0 10px",
                                    color: "#121112",
                                    fontStyle: "italic",
                                    height: "36px",
                                  }}
                                  name="Country1"
                                  id="Country1"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                  value={values.Country1}
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
                                {errors.Country1 && touched.Country1 ? (<p className="error">{errors.Country1}</p>) : ""}
                              
                              </FormControl>
                            </div>
                          
  
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                TIN Type:
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
                                  name="TinType1"
                                  placeholder="Enter TIN Type"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.TinType1 && errors.TinType1
                                  )}
                                  value={values.TinType1}
                                />
  
                                {errors.TinType1 && touched.TinType1 ? <p className="error">{errors.TinType1}</p> : <></>}
                              </FormControl>
                            </div>
  
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                TIN:
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
                                  name="Tin1"
                                  placeholder="Enter TIN"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.Tin1 && errors.Tin1
                                  )}
                                  value={values.Tin1}
                                />
  
                                {errors.Tin1 && touched.Tin1 ? <p className="error">{errors.Tin1}</p> : <></>}
                              
                              </FormControl>
                            </div>
                            <div className="col-lg-12 col-12 col-md-3">
                            <div className="d-flex">
                              <Checkbox  name="TinAvailable1" checked={values?.TinAvailable1} onChange={handleChange}  />
                              <Typography className="mt-2" style={{fontSize:"14px"}}>
                                TIN Unavailable
                              </Typography>
                            </div>
                          </div>
                          <div className="col-lg-12 col-12 col-md-3 mt-3 mb-3">
                            <FormControl className="w-100">
                             <Typography align="left">
                             <Button variant="outlined" style={{fontSize:"12px",width:"30%"}}>
                             Add an additional TIN
                              </Button>
                             </Typography>
                            
                            </FormControl>
                          </div>
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                Country:
                                
                                </Typography>
  
                                <select
                                  style={{
                                    padding: " 0 10px",
                                    color: "#121112",
                                    fontStyle: "italic",
                                    height: "36px",
                                  }}
                                  name="Country2"
                                  id="Country2"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                  value={values.Country2}
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
                                {errors.Country2 && touched.Country2 ? (<p className="error">{errors.Country2}</p>) : ""}
                              
                              </FormControl>
                            </div>
                          
  
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                TIN Type:
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
                                  name="TinType2"
                                  placeholder="Enter TIN Type"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.TinType2 && errors.TinType2
                                  )}
                                  value={values.TinType2}
                                />
  
                                {errors.TinType2 && touched.TinType2 ? <p className="error">{errors.TinType2}</p> : <></>}
                              </FormControl>
                            </div>
  
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                TIN:
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
                                  name="Tin2"
                                  placeholder="Enter TIN"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.Tin2 && errors.Tin2
                                  )}
                                  value={values.Tin2}
                                />
  
                                {errors.Tin2 && touched.Tin2 ? <p className="error">{errors.Tin2}</p> : <></>}
                              
                              </FormControl>
                            </div>
                            <div className="col-lg-12 col-12 col-md-3">
                            <div className="d-flex">
                              <Checkbox  name="TinAvailable2" checked={values?.TinAvailable2} onChange={handleChange} />
                              <Typography className="mt-2" style={{fontSize:"14px"}}>
                                TIN Unavailable
                              </Typography>
                            </div>
                          </div>
                          <div className="col-lg-9 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                * Please specify the reason for non-availability of TIN:
                                </Typography>
                                <Input
                                  style={{
                                    border: " 1px solid #d9d9d9 ",
                                    height: " 36px",
                                    lineHeight: "36px ",
                                    background: "#fff ",
                                    fontSize: "13px",
                                    width:"60%",
                                    color: " #000 ",
                                    fontStyle: "normal",
                                    borderRadius: "1px",
                                    padding: " 0 10px ",
                                  }}
                                  id="outlined"
                                  name="ReasonNonAvailability"
                                  placeholder="Enter Reason"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.ReasonNonAvailability && errors.ReasonNonAvailability
                                  )}
                                  value={values.ReasonNonAvailability}
                                />
  
                                {errors.ReasonNonAvailability && touched.ReasonNonAvailability ? <p className="error">{errors.ReasonNonAvailability}</p> : <></>}
                              
                              </FormControl>
                            </div>
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                Legal name of Entity 1: <span style={{ color: "red" }}>*</span>
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
                                  name="LegalEntity1"
                                  placeholder="Enter Town/City of Birth"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.LegalEntity1 && errors.LegalEntity1
                                  )}
                                  value={values.LegalEntity1}
                                />
  
                                {errors.LegalEntity1 && touched.LegalEntity1 ? <p className="error">{errors.LegalEntity1}</p> : <></>}
                              
                              </FormControl>
                            </div>
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                Legal name of Entity 2: 
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
                                  name="LegalEntity2"
                                  placeholder="Enter Town/City of Birth"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.LegalEntity2 && errors.LegalEntity2
                                  )}
                                  value={values.LegalEntity2}
                                />
  
                                {errors.LegalEntity2 && touched.LegalEntity2 ? <p className="error">{errors.LegalEntity2}</p> : <></>}
                              
                              </FormControl>
                            </div>
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                Legal name of Entity 3: 
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
                                  name="LegalEntity3"
                                  placeholder="Enter Town/City of Birth"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.LegalEntity3 && errors.LegalEntity3
                                  )}
                                  value={values.LegalEntity3}
                                />
  
                                {errors.LegalEntity3 && touched.LegalEntity3 ? <p className="error">{errors.LegalEntity3}</p> : <></>}
                              
                              </FormControl>
                            </div>
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                Status Entity 1:
                                  <span style={{ color: "red" }}>*</span>
                                </Typography>
  
                                <select
                                  style={{
                                    padding: " 0 10px",
                                    color: "#121112",
                                    fontStyle: "italic",
                                    height: "36px",
                                  }}
                                  name="StatusEntity1"
                                  id="StatusEntity1"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                  value={values.StatusEntity1}
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
                                {errors.StatusEntity1 && touched.StatusEntity1 ? (<p className="error">{errors.StatusEntity1}</p>) : ""}
                              
                              </FormControl>
                            </div>
                          
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                Status Entity 2:
                                  
                                </Typography>
  
                                <select
                                  style={{
                                    padding: " 0 10px",
                                    color: "#121112",
                                    fontStyle: "italic",
                                    height: "36px",
                                  }}
                                  name="StatusEntity2"
                                  id="StatusEntity2"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                  value={values.StatusEntity2}
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
                                {errors.StatusEntity2 && touched.StatusEntity2 ? (<p className="error">{errors.StatusEntity2}</p>) : ""}
                              
                              </FormControl>
                            </div>
                          
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                Status Entity 3:
                                 
                                </Typography>
  
                                <select
                                  style={{
                                    padding: " 0 10px",
                                    color: "#121112",
                                    fontStyle: "italic",
                                    height: "36px",
                                  }}
                                  name="StatusEntity3"
                                  id="StatusEntity3"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                  value={values.StatusEntity3}
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
                                {errors.StatusEntity3 && touched.StatusEntity3 ? (<p className="error">{errors.StatusEntity3}</p>) : ""}
                              
                              </FormControl>
                            </div>
                          
                        </div>
                        
                        ):""
                    
                    }
                     <hr className="w-100"></hr>
                     <div
                        className="flex-row-reverse"
                        >
                          <div className="d-flex">
                          <IconButton
                            onClick={() => handleOpen("other")}
                            aria-label="expand"
                            size="small"
                            
                          >
                            {open === "other" ? (
                              <RemoveCircleOutlineOutlined />
                            ) : (
                              <ControlPointOutlined />
                            )}
                          </IconButton>
                
                       <Typography style={{fontSize:"20px",fontWeight:"540",marginTop:"3px"}}>Other Details</Typography>
                          </div>
                      </div>

                     {open==="other" ?
                       ( <div className="row mt-3" style={{marginLeft:"10px"}}>
                        <Typography style={{fontWeight:"bold"}}>Please enter the permanent address details here:</Typography>
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              Ownership:  in(%):
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
                                name="Ownership"
                                placeholder="Enter Ownership"
                                onBlur={handleBlur}
                                error={Boolean(errors.Ownership && touched.Ownership)}
                                onChange={handleChange}
                                value={values.Ownership}

                              />
                              {errors.Ownership && touched.Ownership ? <p className="error">{errors.Ownership}</p> : <></>}

                            </FormControl>
                          </div>
                          <div className="col-lg-4 col-6 col-md-3 mt-3">
                            <FormControl className="w-100">
                              <Typography align="left">
                              Email Address:
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
                                name="EmailAdd"
                                placeholder="Enter Email Address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.EmailAdd && errors.EmailAdd
                                )}
                                value={values.EmailAdd}
                              />

                              {errors.EmailAdd && touched.EmailAdd ? <p className="error">{errors.EmailAdd}</p> : <></>}
                            </FormControl>
                          </div>
                        

                        
                        
                          
                          <div className="col-lg-12 col-12 col-md-3">
                          <div className="d-flex">
                              <Checkbox name="SubmissionRequest" checked={values?.SubmissionRequest} onChange={handleChange}/>
                              <Typography className="mt-2" style={{fontSize:"14px"}}>
                              U.S. Tax Certificate Submission Request:
                              </Typography>
                            </div>
                          </div>
                        </div>
                        
                        ):""
                    
                    }
                     <hr className="w-100"></hr>
                     
                     </div>

<div>
  <Button variant="contained" style={{backgroundColor:"#364048",color:"#fff"}}>
    Add a controlling person
  </Button>
  </div>






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

                           disabled={!isValid}

                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={() => {
                            submitForm().then((data) => {
                             
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

