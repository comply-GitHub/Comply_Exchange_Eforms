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
import DeleteIcon from "@mui/icons-material/Delete";
import { W8_state_ECI, PostDualCert, GetHelpVideoDetails, getAllCountries } from "../../../Redux/Actions";
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


  const IncomeType = ({handleSubmit, DeleteIncomeType, index, length, data, UpdateIncomeType, CountryArticle,SetIsCompDataValid }: any) => {
    const [initialValue, setInitialValues] = useState<any>(
      {}
    );
    const showInDropdownArticle = CountryArticle?.filter((ele: any) => ele.showInDropDown === true);
    const [articleBeneficialOwner, setArticleBeneficialOwner] = useState<any>({});
    useEffect(() => {
      setInitialValues({ ...data });
    }, [length])
  
    useEffect(() => {
      setInitialValues(data);
      let temp: any[] = showInDropdownArticle?.filter((x: any) => x.id === Number.parseInt({ ...data }.articleBeneficalOwner))
      if (temp) {
        setArticleBeneficialOwner(temp[0])
      }
    }, [data])
  
  
    const validateComponentData=(data:any)=>{
      SelfCertSchema_w9_DC(showAlternateAddress,showTin,showTin2).validate(data).then(()=>{
        SetIsCompDataValid(true);
      }).catch(()=>{
        SetIsCompDataValid(false);
      });
    }
  
    const handleUpdateOnFormChange = (e: any) => {
      let temp: any = { ...data };
      temp[e.target.name] = e.target.value;
      console.log("change", e)
      UpdateIncomeType({ ...temp }, index);
      validateComponentData({...temp});
    }
    const handleUpdateCheckboxChange = (e: any) => {
      let temp: any = { ...data };
      // Convert the value to boolean
      const isChecked = e.target.checked;
      temp[e.target.name] = isChecked;
      console.log("change", e);
      UpdateIncomeType({ ...temp }, index);
    }
  
    const [showAlternateAddress, setShowAlternateAddress] = useState(false);

  const handleToggleAddress = () => {
    setShowAlternateAddress(!showAlternateAddress);
  };

  const [showTin, setShowTin] = useState(false);

  const handleToggleTin = () => {
    setShowTin(!showTin);
  };

  const [showTin2, setShowTin2] = useState(false);

  const handleToggleTin2 = () => {
    setShowTin2(!showTin2);
  };

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
   
            <Paper >
              <Formik
                validateOnChange={true}
                initialValues={initialValue}
                validateOnBlur={true}
                enableReinitialize
                validationSchema={SelfCertSchema_w9_DC(showAlternateAddress,showTin,showTin2)}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit();
                  }}>
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
                    
                   
                      <div style={{backgroundColor:"#f1f1f1"}}>
                      <Typography align="right" >
                {length > 1 ? (<DeleteIcon
                  onClick={() => { DeleteIncomeType(index); }}
                  style={{ color: "red", fontSize: "26px",marginTop:"10px" }}
                />) : ""}
              </Typography>
                      
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

                            <Typography style={{ fontSize: "20px", fontWeight: "540", marginTop: "3px" }}> Basics Details</Typography>

                          </div>
                        </div>
                        {open === "basics" ?
                          (<div className="row mt-3" style={{ marginLeft: "10px" }}>
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
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  value={values.FirstName}

                                />
                              {errors.FirstName && touched.FirstName ? <p className="error">{typeof errors.FirstName === 'string' ? errors.FirstName : ''}</p> : <></>}
  
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
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.FamilyName && errors.FamilyName
                                  )}
                                  value={values.FamilyName}
                                />

{errors.FamilyName && touched.FamilyName ? <p className="error">{typeof errors.FamilyName === 'string' ? errors.FamilyName : ''}</p> : <></>}
                              </FormControl>
                            </div>


                            <div className="col-lg-4 col-6 col-md-3 mt-2">
                              <FormControl className="w-100">
                                <Typography align="left">
                                  Date of birth:

                                </Typography>
                                <Input
                                type="date"
                                  className="dateclass"
                                  onBlur={handleBlur}
                                  name="dateofBirth"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                 
                                  value={values.dateofBirth}
                                
                                 
                                />
                               {errors.dateofBirth && touched.dateofBirth ? <p className="error">{typeof errors.dateofBirth === 'string' ? errors.dateofBirth : ''}</p> : <></>}

                              </FormControl>
                            </div>
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                  Country Of Birth
                                
                                </Typography>

                                <select
                                  style={{
                                    padding: " 0 10px",
                                    color: "#121112",
                                    fontStyle: "italic",
                                    height: "36px",
                                  }}
                                  name="countryofBirth"
                                  id="countryofBirth"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                  value={values.countryofBirth}
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
                                {errors.countryofBirth && touched.countryofBirth ? <p className="error">{typeof errors.countryofBirth === 'string' ? errors.countryofBirth : ''}</p> : <></>}

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
                                  name="cityofBirth"
                                  placeholder="Enter Town/City of Birth"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.cityofBirth && errors.cityofBirth
                                  )}
                                  value={values.cityofBirth}
                                />

{errors.cityofBirth && touched.cityofBirth ? <p className="error">{typeof errors.cityofBirth === 'string' ? errors.cityofBirth : ''}</p> : <></>}
                               
                              </FormControl>
                            </div>

                          </div>

                          ) : ""

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

                            <Typography style={{ fontSize: "20px", fontWeight: "540", marginTop: "3px" }}>Permanent Residence Address</Typography>
                          </div>
                        </div>

                        {open === "permanant" ?
                          (
                          <div className="row mt-3" style={{ marginLeft: "10px" }}>
                            <Typography style={{ fontWeight: "bold" }}>Please enter the permanent address details here:</Typography>
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
                                  name="permanentHouseNumberorName"
                                  placeholder="Enter House Name"
                                  onBlur={handleBlur}
                                  error={Boolean(errors.permanentHouseNumberorName && touched.permanentHouseNumberorName)}
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  value={values.permanentHouseNumberorName}

                                />
                                {errors.permanentHouseNumberorName && touched.permanentHouseNumberorName ? <p className="error">{typeof errors.permanentHouseNumberorName === 'string' ? errors.permanentHouseNumberorName : ''}</p> : <></>}

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
                                  name="permanentRoadName"
                                  placeholder="Enter Road Name"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.permanentRoadName && errors.permanentRoadName
                                  )}
                                  value={values.permanentRoadName}
                                />

{errors.permanentRoadName && touched.permanentRoadName ? <p className="error">{typeof errors.permanentRoadName === 'string' ? errors.permanentRoadName : ''}</p> : <></>}
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
                                  name="permanentLocation"
                                  placeholder="Enter Permanent Location"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.permanentLocation && errors.permanentLocation
                                  )}
                                  value={values.permanentLocation}
                                />

{errors.permanentLocation && touched.permanentLocation ? <p className="error">{typeof errors.permanentLocation === 'string' ? errors.permanentLocation : ''}</p> : <></>}
                              </FormControl>
                            </div>

                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                  City or Town:
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
                                  name="permanentCityorTown"
                                  placeholder="Enter Town/City of Birth"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.permanentCityorTown && errors.permanentCityorTown
                                  )}
                                  value={values.permanentCityorTown}
                                />

{errors.permanentCityorTown && touched.permanentCityorTown ? <p className="error">{typeof errors.permanentCityorTown === 'string' ? errors.permanentCityorTown : ''}</p> : <></>}

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
                                  name="permanentStateorProvince"
                                  placeholder="Enter Town/City of Birth"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.permanentStateorProvince && errors.permanentStateorProvince
                                  )}
                                  value={values.permanentStateorProvince}
                                />

{errors.permanentStateorProvince && touched.permanentStateorProvince ? <p className="error">{typeof errors.permanentStateorProvince === 'string' ? errors.permanentStateorProvince : ''}</p> : <></>}

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
                                  name="permanentZiporPostalCode"
                                  placeholder="Enter Zip And Postal Code"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.permanentZiporPostalCode && errors.permanentZiporPostalCode
                                  )}
                                  value={values.permanentZiporPostalCode}
                                />

{errors.permanentZiporPostalCode && touched.permanentZiporPostalCode ? <p className="error">{typeof errors.permanentZiporPostalCode === 'string' ? errors.permanentZiporPostalCode : ''}</p> : <></>}

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
                                  name="permanentResidentialCountry"
                                  id="permanentResidentialCountry"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                  value={values.permanentResidentialCountry}
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
                                {errors.permanentResidentialCountry && touched.permanentResidentialCountry ? <p className="error">{typeof errors.permanentResidentialCountry === 'string' ? errors.permanentResidentialCountry : ''}</p> : <></>}

                              </FormControl>
                            </div>

                            <div className="col-lg-12 col-12 col-md-3 mt-3">
        <FormControl className="w-100">
          <Typography align="left">
            <Button variant="outlined" style={{ fontSize: "12px", width: "30%" }} onClick={handleToggleAddress}>
              {showAlternateAddress ? "- Hide Alternate Mailing Address" : "+ Add Alternate Mailing Address"}
            </Button>
          </Typography>
        </FormControl>
      </div>
                          </div>

                         

                          ) : ""

                        }
                      {showAlternateAddress && (
  <>
    <div className="row mt-3" style={{ marginLeft: "10px" }}>
      <Typography style={{ fontWeight: "bold" }}>Please enter the permanent address details here:</Typography>
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
            name="alterHouseNumberorName"
            placeholder="Enter House Name"
            onBlur={handleBlur}
            error={Boolean(errors.alterHouseNumberorName && touched.alterHouseNumberorName)}
            onChange={(e) => {
              handleChange(e);
              handleUpdateOnFormChange(e);
            }}
            value={values.alterHouseNumberorName}
          />
          {errors.alterHouseNumberorName && touched.alterHouseNumberorName ? <p className="error">{typeof errors.alterHouseNumberorName === 'string' ? errors.alterHouseNumberorName : ''}</p> : <></>}
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
            name="alterRoadName"
            placeholder="Enter Road Name"
            onChange={(e) => {
              handleChange(e);
              handleUpdateOnFormChange(e);
            }}
            onBlur={handleBlur}
            error={Boolean(
              touched.alterRoadName && errors.alterRoadName
            )}
            value={values.alterRoadName}
          />
          {errors.alterRoadName && touched.alterRoadName ? <p className="error">{typeof errors.alterRoadName === 'string' ? errors.alterRoadName : ''}</p> : <></>}
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
            name="alterLocation"
            placeholder="Enter Permanent Location"
            onChange={(e) => {
              handleChange(e);
              handleUpdateOnFormChange(e);
            }}
            onBlur={handleBlur}
            error={Boolean(
              touched.alterLocation && errors.alterLocation
            )}
            value={values.alterLocation}
          />
          {errors.alterLocation && touched.alterLocation ? <p className="error">{typeof errors.alterLocation === 'string' ? errors.alterLocation : ''}</p> : <></>}
        </FormControl>
      </div>
      <div className="col-lg-4 col-6 col-md-3 mt-3">
        <FormControl className="w-100">
          <Typography align="left">
            City or Town:
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
            name="alterCityorTown"
            placeholder="Enter Town/City of Birth"
            onChange={(e) => {
              handleChange(e);
              handleUpdateOnFormChange(e);
            }}
            onBlur={handleBlur}
            error={Boolean(
              touched.alterCityorTown && errors.alterCityorTown
            )}
            value={values.alterCityorTown}
          />
          {errors.alterCityorTown && touched.alterCityorTown ? <p className="error">{typeof errors.alterCityorTown === 'string' ? errors.alterCityorTown : ''}</p> : <></>}
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
            name="alterStateorProvince"
            placeholder="Enter Town/City of Birth"
            onChange={(e) => {
              handleChange(e);
              handleUpdateOnFormChange(e);
            }}
            onBlur={handleBlur}
            error={Boolean(
              touched.alterStateorProvince && errors.alterStateorProvince
            )}
            value={values.alterStateorProvince}
          />
          {errors.alterStateorProvince && touched.alterStateorProvince ? <p className="error">{typeof errors.alterStateorProvince === 'string' ? errors.alterStateorProvince : ''}</p> : <></>}
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
            name="alterZiporPostalCode"
            placeholder="Enter Zip And Postal Code"
            onChange={(e) => {
              handleChange(e);
              handleUpdateOnFormChange(e);
            }}
            onBlur={handleBlur}
            error={Boolean(
              touched.alterZiporPostalCode && errors.alterZiporPostalCode
            )}
            value={values.alterZiporPostalCode}
          />
          {errors.alterZiporPostalCode && touched.alterZiporPostalCode ? <p className="error">{typeof errors.alterZiporPostalCode === 'string' ? errors.alterZiporPostalCode : ''}</p> : <></>}
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
            name="alterResidentialCountry"
            id="alterResidentialCountry"
            onChange={(e) => {
              handleChange(e);
              handleUpdateOnFormChange(e);
            }}
            onBlur={handleBlur}
            //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
            value={values.alterResidentialCountry}
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
          {errors.alterResidentialCountry && touched.alterResidentialCountry ? <p className="error">{typeof errors.alterResidentialCountry === 'string' ? errors.alterResidentialCountry : ''}</p> : <></>}
        </FormControl>
      </div>
    </div>
  </>
)}

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

                            <Typography style={{ fontSize: "20px", fontWeight: "540", marginTop: "3px" }}>Primary Tax jurisdiction</Typography>
                          </div>
                        </div>

                        {open === "jurisdiction" ?
                          (
                            <div className="row mt-3" style={{ marginLeft: "10px" }}>
                              <Typography style={{ fontWeight: "bold" }}>Primary Tax Jurisdiction:</Typography>

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
                                    name="primaryTaxJurisdictionCountry1"
                                    id="primaryTaxJurisdictionCountry1"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                    value={values.primaryTaxJurisdictionCountry1}
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
                                 
                                  {errors.primaryTaxJurisdictionCountry1 && touched.primaryTaxJurisdictionCountry1 ? <p className="error">{typeof errors.primaryTaxJurisdictionCountry1 === 'string' ? errors.primaryTaxJurisdictionCountry1 : ''}</p> : <></>}
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
                                    name="tinType1"
                                    placeholder="Enter TIN Type"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.tinType1 && errors.tinType1
                                    )}
                                    value={values.tinType1}
                                  />

{errors.tinType1 && touched.tinType1 ? <p className="error">{typeof errors.tinType1 === 'string' ? errors.tinType1 : ''}</p> : <></>}
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
                                    name="tiN1"
                                    placeholder="Enter TIN"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.tiN1 && errors.tiN1
                                    )}
                                    value={values.tiN1}
                                  />

{errors.tiN1 && touched.tiN1 ? <p className="error">{typeof errors.tiN1 === 'string' ? errors.tiN1 : ''}</p> : <></>}

                                </FormControl>
                              </div>

                              <div className="col-lg-12 col-12 col-md-3">
                                <div className="d-flex">
                                  <Checkbox name="tinUnavailable1" checked={values?.tinUnavailable1}  onChange={(e) => {
                        handleChange(e);
                        handleUpdateCheckboxChange(e);
                      }} />
                                  <Typography className="mt-2" style={{ fontSize: "14px" }}>
                                    TIN Unavailable
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-lg-12 col-12 col-md-3 mt-3 mb-3">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    <Button onClick={handleToggleTin} variant="outlined" style={{ fontSize: "12px", width: "30%" }}>
                                       {showTin ? "- Hide an additional TIN" : "+ Add an additional TIN"}
                                    </Button>
                                   
                                  </Typography>

                                </FormControl>
                              </div>
                             {showTin &&(

                              <>
                               <Typography style={{ fontWeight: "bold" }}>Additional Tax Jurisdiction:</Typography>

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
      name="primaryTaxJurisdictionCountry2"
      id="primaryTaxJurisdictionCountry2"
      onChange={(e) => {
          handleChange(e);
          handleUpdateOnFormChange(e);
        }}
      onBlur={handleBlur}
      //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
      value={values.primaryTaxJurisdictionCountry2}
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
    {errors.primaryTaxJurisdictionCountry2 && touched.primaryTaxJurisdictionCountry2 ? <p className="error">{typeof errors.primaryTaxJurisdictionCountry2 === 'string' ? errors.primaryTaxJurisdictionCountry2 : ''}</p> : <></>}

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
      name="tinType2"
      placeholder="Enter TIN Type"
      onChange={(e) => {
          handleChange(e);
          handleUpdateOnFormChange(e);
        }}
      onBlur={handleBlur}
      error={Boolean(
        touched.tinType2 && errors.tinType2
      )}
      value={values.tinType2}
    />

{errors.tinType2 && touched.tinType2 ? <p className="error">{typeof errors.tinType2 === 'string' ? errors.tinType2 : ''}</p> : <></>}
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
      name="tiN2"
      placeholder="Enter TIN"
      onChange={(e) => {
          handleChange(e);
          handleUpdateOnFormChange(e);
        }}
      onBlur={handleBlur}
      error={Boolean(
        touched.tiN2 && errors.tiN2
      )}
      value={values.tiN2}
    />

{errors.tiN2 && touched.tiN2 ? <p className="error">{typeof errors.tiN2 === 'string' ? errors.tiN2 : ''}</p> : <></>}

  </FormControl>
</div>
<div className="col-lg-12 col-12 col-md-3">
  <div className="d-flex">
    <Checkbox name="tinUnavailable2" checked={values?.tinUnavailable2}  onChange={(e) => {
handleChange(e);
handleUpdateCheckboxChange(e);
}} />
    <Typography className="mt-2" style={{ fontSize: "14px" }}>
      TIN Unavailable
    </Typography>
  </div>
</div>

                              </>
                             )}

                              <div className="col-lg-12 col-12 col-md-3 mt-3 mb-3">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    <Button variant="outlined" style={{ fontSize: "12px", width: "30%" }} onClick={handleToggleTin2}>
                                    {showTin2 ? "- Hide an additional TIN" : "+ Add an additional TIN"}
                                    </Button>
                                   
                                  </Typography>

                                </FormControl>
                              </div>
                             {showTin2 &&(
                              <>
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
                                    name="primaryTaxJurisdictionCountry3"
                                    id="primaryTaxJurisdictionCountry3"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                    value={values.primaryTaxJurisdictionCountry3}
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
                                  {errors.primaryTaxJurisdictionCountry3 && touched.primaryTaxJurisdictionCountry3 ? <p className="error">{typeof errors.primaryTaxJurisdictionCountry3 === 'string' ? errors.primaryTaxJurisdictionCountry3 : ''}</p> : <></>}

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
                                    name="tinType3"
                                    placeholder="Enter TIN Type"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.tinType3 && errors.tinType3
                                    )}
                                    value={values.tinType3}
                                  />

{errors.tinType3 && touched.tinType3 ? <p className="error">{typeof errors.tinType3 === 'string' ? errors.tinType3 : ''}</p> : <></>}
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
                                    name="tiN3"
                                    placeholder="Enter TIN"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.tiN3 && errors.tiN3
                                    )}
                                    value={values.tiN3}
                                  />

{errors.tiN3 && touched.tiN3 ? <p className="error">{typeof errors.tiN3 === 'string' ? errors.tiN3 : ''}</p> : <></>}

                                </FormControl>
                              </div>
                              <div className="col-lg-12 col-12 col-md-3">
                                <div className="d-flex">
                                  <Checkbox name="tinUnavailable3" checked={values?.tinUnavailable3} onChange={(e) => {
                        handleChange(e);
                        handleUpdateCheckboxChange(e);
                      }} />
                                  <Typography className="mt-2" style={{ fontSize: "14px" }}>
                                    TIN Unavailable
                                  </Typography>
                                </div>
                              </div>
                              </>
                             )}


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
                                      width: "60%",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="reasonforNonAvailabilityofTIN"
                                    placeholder="Enter Reason"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.reasonforNonAvailabilityofTIN && errors.reasonforNonAvailabilityofTIN
                                    )}
                                    value={values.reasonforNonAvailabilityofTIN}
                                  />

{errors.reasonforNonAvailabilityofTIN && touched.reasonforNonAvailabilityofTIN ? <p className="error">{typeof errors.reasonforNonAvailabilityofTIN === 'string' ? errors.reasonforNonAvailabilityofTIN : ''}</p> : <></>}

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
                                    name="legalNameofEntity1"
                                    placeholder="Enter Town/City of Birth"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.legalNameofEntity1 && errors.legalNameofEntity1
                                    )}
                                    value={values.legalNameofEntity1}
                                  />

{errors.legalNameofEntity1 && touched.legalNameofEntity1 ? <p className="error">{typeof errors.legalNameofEntity1 === 'string' ? errors.legalNameofEntity1 : ''}</p> : <></>}

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
                                    name="legalNameofEntity2"
                                    placeholder="Enter Town/City of Birth"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.legalNameofEntity2 && errors.legalNameofEntity2
                                    )}
                                    value={values.legalNameofEntity2}
                                  />

{errors.legalNameofEntity2 && touched.legalNameofEntity2 ? <p className="error">{typeof errors.legalNameofEntity2 === 'string' ? errors.legalNameofEntity2 : ''}</p> : <></>}

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
                                    name="legalNameofEntity3"
                                    placeholder="Enter Town/City of Birth"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.legalNameofEntity3 && errors.legalNameofEntity3
                                    )}
                                    value={values.legalNameofEntity3}
                                  />

{errors.legalNameofEntity3 && touched.legalNameofEntity3 ? <p className="error">{typeof errors.legalNameofEntity3 === 'string' ? errors.legalNameofEntity3 : ''}</p> : <></>}

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
                                    name="statusEntity1"
                                    id="statusEntity1"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                    value={values.statusEntity1}
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
                                  {errors.statusEntity1 && touched.statusEntity1 ? <p className="error">{typeof errors.statusEntity1 === 'string' ? errors.statusEntity1 : ''}</p> : <></>}

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
                                    name="statusEntity2"
                                    id="statusEntity2"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                    value={values.statusEntity2}
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
                                  {errors.statusEntity2 && touched.statusEntity2 ? <p className="error">{typeof errors.statusEntity2 === 'string' ? errors.statusEntity2 : ''}</p> : <></>}

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
                                    name="statusEntity3"
                                    id="statusEntity3"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUpdateOnFormChange(e);
                                      }}
                                    onBlur={handleBlur}
                                    //  error={Boolen(touched.countryOfCitizenshipId && errors.countryOfCitizenshipId)}
                                    value={values.statusEntity3}
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
                                  {errors.statusEntity3 && touched.statusEntity3 ? <p className="error">{typeof errors.statusEntity3 === 'string' ? errors.statusEntity3 : ''}</p> : <></>}

                                </FormControl>
                              </div>

                            </div>

                          ) : ""

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

                            <Typography style={{ fontSize: "20px", fontWeight: "540", marginTop: "3px" }}>Other Details</Typography>
                          </div>
                        </div>

                        {open === "other" ?
                          (<div className="row mt-3" style={{ marginLeft: "10px" }}>
                            <Typography style={{ fontWeight: "bold" }}>Please enter the permanent address details here:</Typography>
                            <div className="col-lg-4 col-6 col-md-3 mt-3">
                              <FormControl className="w-100">
                                <Typography align="left">
                                  ownershipPercentage:  in(%):
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
                                  name="ownershipPercentage"
                                  placeholder="Enter ownershipPercentage"
                                  onBlur={handleBlur}
                                  error={Boolean(errors.ownershipPercentage && touched.ownershipPercentage)}
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  value={values.ownershipPercentage}

                                />
                               {errors.ownershipPercentage && touched.ownershipPercentage ? <p className="error">{typeof errors.ownershipPercentage === 'string' ? errors.ownershipPercentage : ''}</p> : <></>}

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
                                  name="emailAddress"
                                  placeholder="Enter Email Address"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpdateOnFormChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.emailAddress && errors.emailAddress
                                  )}
                                  value={values.emailAddress}
                                />

{errors.emailAddress && touched.emailAddress ? <p className="error">{typeof errors.emailAddress === 'string' ? errors.emailAddress : ''}</p> : <></>}
                              </FormControl>
                            </div>





                            <div className="col-lg-12 col-12 col-md-3">
                              <div className="d-flex">
                                <Checkbox name="usTaxCertificateSubmissionRequest" checked={values?.usTaxCertificateSubmissionRequest}  onChange={(e) => {
                        handleChange(e);
                        handleUpdateCheckboxChange(e);
                      }} />
                                <Typography className="mt-2" style={{ fontSize: "14px" }}>
                                  U.S. Tax Certificate Submission Request:
                                </Typography>
                              </div>
                            </div>
                          </div>

                          ) : ""

                        }
                        <hr className="w-100"></hr>

                      </div>

                    

               
                  </Form>
                )}
              </Formik>
            </Paper>

      
    

  );
}
export default IncomeType
