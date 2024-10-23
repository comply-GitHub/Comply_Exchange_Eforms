import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Paper,
  Checkbox,
  Tooltip,
  TextField,
  RadioGroup,
  Radio,
  Link,
  FormControlLabel,
  Input,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import InputMask from 'react-input-mask';
import { Divider } from "@mui/material";
import { Info } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./index.scss";
import checksolid from "../../../../../assets/img/check-solid.png";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  W8_state,
  getAllCountries,
  postW8BENForm,
  GetHelpVideoDetails
} from "../../../../../Redux/Actions";
import PopupModal from "../../../../../Redux/Actions/poupModal";
import { StatusSchema } from "../../../../../schemas/w8Ben";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import { GetAgentCountriesImportantForEform,getAllCountriesAgentWise } from "../../../../../Redux/Actions";
import moment from "moment";
import { GetBenPdf } from "../../../../../Redux/Actions/PfdActions";
import Infoicon from "../../../../../assets/img/info.png";
import { useLocation } from "react-router-dom";
import useAuth from "../../../../../customHooks/useAuth";
import GlobalValues, { FormTypeId } from "../../../../../Utils/constVals";
import SaveAndExit from "../../../../Reusable/SaveAndExit/Index";
import View_Insructions from "../../../../viewInstruction";
import { number } from "yup";
export default function Factors() {
  const { authDetails } = useAuth();
  const location = useLocation();
  const urlValue = location.pathname.substring(1);
  const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");
  const agentDefaultDetails = JSON.parse(
    localStorage.getItem("agentDefaultDetails") || "{}"
  );
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const PrevData = JSON.parse(localStorage.getItem("Formvalues") || "{}");
  console.log(PrevData.IsUsSourcedIncome,"12333")
  const convertToStandardFormat = (customDateString: any) => {
    const dateObject = new Date(customDateString);
    const year = dateObject.getUTCFullYear();
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [popupState, setPopupState] = useState({
    data:"",
    status:false
})
const [isTaxLiabilityJurisdictions, setIsTaxLiabilityJurisdictions] = useState(["no"]);
const [countryTaxLiability, setCountryTaxLiability] = useState([""]);
const [taxReferenceNumber, setTaxReferenceNumber] = useState([""]);
const [isTINFormatNotAvailable, setIsTINFormatNotAvailable] = useState([false]);


  // const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");
  const initialValue = {
    agentId: authDetails?.agentId,
    formTypeSelectionId: obValues.businessTypeId,
    formTypeId: FormTypeId.BEN,
    accountHolderBasicDetailId:authDetails?.accountHolderId,
    isHeldUSCitizenship: "no",
    countryOfCitizenship: obValues?.countryOfCitizenshipId ? obValues?.countryOfCitizenshipId : "0",
    isTaxationUSCitizenOrResident: "no",
    isPermamnentResidentCardHolder: "no",
    isHoldDualCitizenshipStatus: "no",
    isHoldDualCitizenshipIncludeUSCitizenship: "no",
    isRenouncedCitizenship: "no",
    dateRenouncedUSCitizenship: obValues.dateRenouncedUSCitizenship,
    permanentResidentialCountryId: 0,
    renouncementProof: "",
    // isTaxLiabilityJurisdictions: ["no"],
    // countryTaxLiability: ["no"],
    // taxReferenceNumber: [""],
    // isTINFormatNotAvailable: [false],

    CountryTaxLiabilityLst:[""],
    IsTaxLiabilityJurisdictionsLst:[''],
    IsTINFormatNotAvailableLst:[""],
    TaxReferenceNumberLst:[""],
    IsPresentAtleast31Days: "No",
    statusId: 1,
    stepName: `/${urlValue}`,
  };

  const dispatch = useDispatch();
  const history = useNavigate();
  const [expanded, setExpanded] = React.useState<string | false>("");
  

  useEffect(() => {
    document.title = "Comply Exchange";
    if(PrevStepData?.CountryTaxLiabilityLst?.length){
      setCountryTaxLiability([...PrevStepData?.CountryTaxLiabilityLst]);
    }
    if(PrevStepData?.IsTaxLiabilityJurisdictionsLst?.length){
      setIsTaxLiabilityJurisdictions([...PrevStepData?.IsTaxLiabilityJurisdictionsLst]);
    }
    if(PrevStepData?.TaxReferenceNumberLst?.length){
      setTaxReferenceNumber([...PrevStepData?.TaxReferenceNumberLst]);
    }
    if(PrevStepData?.IsTINFormatNotAvailableLst?.length){
      setIsTINFormatNotAvailable([...PrevStepData?.IsTINFormatNotAvailableLst]);
    }
  }, []);

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(GetHelpVideoDetails());
  }, []);
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
      if (authDetails?.agentId) {
       
        dispatch(getAllCountriesAgentWise(authDetails?.agentId));


      }
    }, [authDetails])
  const W8Data = useSelector((state: any) => state.w8Data);

  const [tax, setTax] = useState<string>("");

  const handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTax(event.target.value);
  };

  const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }

  const [tax1, setTax1] = useState<string>("");

  const handleTaxChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTax1(event.target.value);
  };
  const [renounced, setRenounced] = useState<string>("");
  const allCountriesData = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const handleRenouncedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRenounced(event.target.value);
  };

  const [individual, setIndividual] = useState<string>("");

  const handleIndividualChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIndividual(event.target.value);
  };
  const [citizenship, setCitizenship] = useState<string>("");

  const handleCitizenshipChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCitizenship(event.target.value);
  };

  const [toolInfo, setToolInfo] = useState("");
  const getCountriesAgentWiseReducer = useSelector(
    (state: any) => state.getCountriesAgentWiseReducer
  );
  useEffect(() => {
    dispatch(GetAgentCountriesImportantForEform());
  }, []);

  const GetAgentCountriesImportantForEformData = useSelector(
    (state: any) =>
      state.GetAgentCountriesImportantForEformReducer
        .GetAgentCountriesImportantForEformData
  );

  const viewPdf = () => {
    // history("/w8Ben_pdf", { replace: true });
    history("/w8Ben_pdf");
  }

  function getNameById(id: any) {
    if (!Array.isArray(allCountriesData)) {
      console.error('Input is not an array.');
      return null;
    }

    const foundObject = allCountriesData.find((obj: any) => obj.id === id);
    return foundObject ? foundObject.name : null;
  }

  function handleChangeIsTaxLiability(e:any, ind:any){
    if(e.target.value == "yes"){
      isTaxLiabilityJurisdictions[ind] = e.target.value;
      setIsTaxLiabilityJurisdictions([...isTaxLiabilityJurisdictions, "no"]);
      setCountryTaxLiability([...countryTaxLiability, ""]);
      setTaxReferenceNumber([...taxReferenceNumber, ""]);
      setIsTINFormatNotAvailable([...isTINFormatNotAvailable, false]);
    }else{
      if(ind == 0){
        setIsTaxLiabilityJurisdictions(["no"]);
        setCountryTaxLiability(["no"]);
        setTaxReferenceNumber([""]);
        setIsTINFormatNotAvailable([false]);
      }else{
        let tempVal = [...isTaxLiabilityJurisdictions];
        tempVal.splice(ind);
        let tempVal2 = [...countryTaxLiability];
        tempVal2.splice(ind);
        let tempVal3 = [...taxReferenceNumber];
        tempVal3.splice(ind);
        let tempVal4 = [...isTINFormatNotAvailable];
        tempVal4.splice(ind);
        setIsTaxLiabilityJurisdictions([...tempVal, "no"]);
        setCountryTaxLiability([...tempVal2]);
        setTaxReferenceNumber([...tempVal3]);
        setIsTINFormatNotAvailable([...tempVal4]);
      }
    }
  }

  function handleChangeTaxLiability(e:any, ind:any, type:any){
    console.log("handleChangeTaxLiability e.target.value==========", e.target.value)
    console.log("handleChangeTaxLiability e.target.checked==========", e.target.checked)
    if(type == "taxLiability"){
      countryTaxLiability[ind] = e.target.value;
      setCountryTaxLiability([...countryTaxLiability]);
    }else if(type == "taxReferenceNumber"){
      taxReferenceNumber[ind] = e.target.value;
      setTaxReferenceNumber([...taxReferenceNumber]);
    }else if(type == "isTINFormatNotAvailable"){
      isTINFormatNotAvailable[ind] = e.target.checked;
      setIsTINFormatNotAvailable([...isTINFormatNotAvailable]);
    }
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
          <div className="viewform" onClick={() => {
              dispatch(GetBenPdf(authDetails?.accountHolderId, (callbackData:any)=>{
                setPopupState({
                    status:true,
                    data: callbackData?.pdf
                })
            }))
        }}>View Form</div>
          <div className="helpvideo">
            {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
            {GethelpData && GethelpData[4].id === 6 ? (
              <a
              href={GethelpData[4].fieldValue}
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor behavior
                window.open(
                  GethelpData[4].fieldValue, // URL to open
                  'popupWindow', // Window name
                  `width=${GethelpData[4].width},height=${GethelpData[4].height},top=${GethelpData[4].top},left=${GethelpData[4].left},resizable=yes,scrollbars=yes` // Window features
                );
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
            <BreadCrumbComponent breadCrumbCode={1207} formName={2} />
          </div>
        </div>
        <div className="col-8 mt-3">
          <div style={{ padding: "10px" }}>
            <Paper style={{ padding: "18px" }}>
              <Formik
                validateOnChange={true}
                validateOnBlur={true}
                initialValues={initialValue}
                enableReinitialize
                // validationSchema={StatusSchema}
                // onSubmit={(values, { setSubmitting }) => {
                
                //     setSubmitting(true);
                //     const new_obj = { ...PrevStepData, citizenshipCountry: getNameById(PrevStepData.citizenshipCountry) }
                //     const result = { ...new_obj, ...values };
                //     // console.log(result,"FINAL RESULT")
                //     dispatch(
                //       postW8BENForm(values, () => {
                //         // history("/W-8BEN/Declaration/US_Tin");
                //         if (values?.IsPresentAtleast31Days=== "Yes") {
                //           history('/Susbtantial_BEN')
                //         } else {
                //           history(
                //             "/W-8BEN/Declaration/US_Tin"
                //           );
                //         }
                //         localStorage.setItem(
                //           "PrevStepData",
                //           JSON.stringify(result)
                //         );
                //       })
                //     );

                //   }
                // }

                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  const new_obj = { ...PrevStepData, citizenshipCountry: getNameById(PrevStepData.citizenshipCountry) }
                  const result = { ...new_obj, ...values ,agentId: authDetails?.agentId,
                    accountHolderBasicDetailId: authDetails?.accountHolderId,
                    CountryTaxLiabilityLst:countryTaxLiability,
                    IsTaxLiabilityJurisdictionsLst:isTaxLiabilityJurisdictions,
                    IsTINFormatNotAvailableLst:isTINFormatNotAvailable,
                    TaxReferenceNumberLst:taxReferenceNumber,
                  };
                 
                  const returnPromise = new Promise((resolve, reject) => {
                    dispatch(
                      postW8BENForm(
                        result,
                        (res: any) => {
                          if (values?.IsPresentAtleast31Days=== "Yes") {
                                      history('/Susbtantial_BEN')
                                    } else {
                                      history(
                                        "/W-8BEN/Declaration/US_Tin"
                                      );
                                    }
                          localStorage.setItem(
                            "PrevStepData",
                            JSON.stringify(result)
                          );

                          resolve(res);
                        },
                        (err: any) => {
                          reject(err);
                        }
                      )
                    );
                  });
                  return returnPromise;
                  // console.log(values, "vallllll");
                  //   dispatch(
                  //     W8_state_ECI(values, () => {
                  //       history("/W-8ECI/Certification/Participation");
                  //     })
                  //   );
                  //   history("/W-8ECI/Certification/Participation");
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
                }) => {
                  
                  const foreignTINCountryIdNumber = Number(values.permanentResidentialCountryId);

                  // Find the selected country
                  const selectedCountry = getCountriesAgentWiseReducer.agentWiseCountriesData
                    ?.find((country: any) => {
                      console.log("Country ID:", country.id, "Type of ID:", typeof country.id);
                      console.log("Foreign TIN Country ID:", foreignTINCountryIdNumber, "Type of Foreign TIN ID:", typeof foreignTINCountryIdNumber);
                      return Number(country.id) === foreignTINCountryIdNumber;
                    });
                  
                  // Extract the foreignTinFormatToolTip field from the selected country, if available
                  const selectedCountryTitle = selectedCountry ? selectedCountry.foreignTinFormatToolTip : "";
                  const selectedCountryMask = selectedCountry ? selectedCountry.foreignTinFormat : "";
                  return(
                  <Form onSubmit={handleSubmit}>
                    <>{console.log("VALUESSS", values)}</>

                    {values.isHeldUSCitizenship === "yes" &&
                      obValues?.isUSIndividual == false ? (
                      <div
                        style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                      >
                        <Typography>
                          RES116
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
                          </span>
                        </Typography>
                        <Typography className="mt-2">
                          You selected that you are making this submission on
                          behalf of a Non-U.S. Individual but the selections
                          made indicated that the individual may be considered a
                          citizen of the United States. If this is correct you
                          may be subject to taxation in the United States as a
                          U.S. citizen or resident alien.
                        </Typography>
                        <Typography className="mt-2">
                          We are not authorized to provide tax advice through
                          this process, but the answers provided suggest that
                          you may be considered as a U.S. person for U.S. tax
                          purposes and that you may need to provide a Form W-9
                          "Request for Taxpayer Identification Number and
                          Certification".
                        </Typography>

                        <Typography className="mt-2">
                          Please go back and review your selections or if the
                          circumstanced allow progress to submit a certificate
                          stating that you should not to be considered a U.S.
                          person for U.S. tax purposes in this case. In these
                          circumstances you must provide additional information
                          stating why this claim is being made. Please note that
                          any statements you make through this process are given
                          under the Penalties of Perjury.
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )}

                    {values.isHoldDualCitizenshipStatus === "yes"
                     ? (
                      <div
                        style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                      >
                        <Typography>
                          RES120
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
                          </span>
                        </Typography>
                        <Typography className="mt-2">
                          You have selected that the individual the submission
                          represents was either born in the United States,
                          Puerto Rico, Guam or the US Virgin Islands, or has a
                          parent who is a US citizen. You have also selected
                          that that the individual is not considered a US
                          citizen (including those nationalised) or a US
                          resident (including Green Card holders). Furthermore
                          you have not selected that the individual has
                          renounced their US citizenship.
                        </Typography>
                        <Typography className="mt-2">
                          It is considered that any person born in the United
                          States automatically adopts a US citizen status,
                          please go back and review your selections. If a non US
                          citizenship status is correct you must provide a
                          written statement explaining why a non US citizenship
                          status applies, this can be provided on the following
                          page. In some circumstances your agent may need to
                          contact you for further information to help confirm.
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )}

                    {values.isHeldUSCitizenship == "yes" &&
                      values.isRenouncedCitizenship == "yes" ? (
                      <div
                        style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                      >
                        <Typography>
                          RES105
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
                            You selected that you are making this submission on
                            behalf of a Non-U.S. Individual and indicated that
                            the individual was born in the United States, but
                            has formally renounced their U.S. citizenship.
                          </span>
                        </Typography>
                        <Typography className="mt-2">
                          If this is correct please select continue where you
                          will be asked to provide a statement confirming this
                          status. Please include any dates that may apply.
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )}

                    {values.isHeldUSCitizenship === "yes" &&
                      values.isTaxationUSCitizenOrResident === "yes" ? (
                      <div
                        style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                      >
                        <Typography>
                          RES106
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
                            You selected that you are making this submission on
                            behalf of a Non-U.S. Individual and indicated that
                            the individual is presently subject to taxation in
                            the United States as a U.S. citizen or resident
                            alien.
                          </span>
                        </Typography>
                        <Typography className="mt-2">
                          We are not authorized to provide tax advice through
                          this process, but the answers provided suggest that
                          you may be considered as a U.S. person for U.S. tax
                          purposes and that you may need to provide a Form W-9
                          "Request for Taxpayer Identification Number and
                          Certification".
                        </Typography>

                        <Typography className="mt-2">
                          Please go back and review your selections or if the
                          circumstanced allow progress to submit a certificate
                          stating that you are not to be considered a U.S.
                          person for U.S. tax purposes in this case. In these
                          circumstances you must provide additional information
                          stating why this claim is being made. Please note that
                          any statements you make through this process are given
                          under the Penalties of Perjury.
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )}

                    {values.isHeldUSCitizenship === "yes" &&
                      values.isPermamnentResidentCardHolder === "yes"? (
                      <div
                        style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                      >
                        <Typography>
                          RES107
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
                            You selected that you are making this submission on
                            behalf of a Non-U.S. Individual and indicated that
                            the individual holds a U.S. Permanent Residency
                            Card, often referred to as a Green Card. If this is
                            correct you may be presently subject to taxation in
                            the United States as a U.S. citizen or resident
                            alien.
                          </span>
                        </Typography>
                        <Typography className="mt-2">
                          We are not authorized to provide tax advice through
                          this process, but the answers provided suggest that
                          you may be considered as a U.S. person for U.S. tax
                          purposes and that you may need to provide a Form W-9
                          "Request for Taxpayer Identification Number and
                          Certification".
                        </Typography>

                        <Typography className="mt-2">
                          Please go back and review your selections or if the
                          circumstanced allow progress to submit a certificate
                          stating that you are not to be considered a U.S.
                          person for U.S. tax purposes in this case. In these
                          circumstances you must provide additional information
                          stating why this claim is being made. Please note that
                          any statements you make through this process are given
                          under the Penalties of Perjury.
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )}

                    {values.isHeldUSCitizenship === "yes" &&
                      values.isHoldDualCitizenshipIncludeUSCitizenship === "yes" ? (
                      <div
                        style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                      >
                        <Typography>
                          RES108
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
                            You selected that you are making this submission on
                            behalf of a Non-U.S. Individual and indicated that
                            the individual holds a Dual Citizenship, including
                            citizenship of the United States. If this is correct
                            you may be presently subject to taxation in the
                            United States as a U.S. citizen or resident alien.
                          </span>
                        </Typography>
                        <Typography className="mt-2">
                          We are not authorized to provide tax advice through
                          this process, but the answers provided suggest that
                          you may be considered as a U.S. person for U.S. tax
                          purposes and that you may need to provide a Form W-9
                          "Request for Taxpayer Identification Number and
                          Certification".
                        </Typography>

                        <Typography className="mt-2">
                          Please go back and review your selections or if the
                          circumstanced allow progress to submit a certificate
                          stating that you are not to be considered a U.S.
                          person for U.S. tax purposes in this case. In these
                          circumstances you must provide additional information
                          stating why this claim is being made. Please note that
                          any statements you make through this process are given
                          under the Penalties of Perjury.
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )}

                    {values.IsPresentAtleast31Days ==="Yes" ?
                      (
                      <div
                        style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                      >
                        <Typography>
                          RES109
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
                            You have identified that you are submitting a form
                            on behalf of a NON U.S. Individual or a NON US
                            Entity and have indicated that the individual or
                            Entity has been physically present in the U.S for 31
                            days or more in the current year.
                          </span>
                        </Typography>
                        <Typography className="mt-2">
                          You will be presented with a U.S Substantial Presence
                          Test to determine status for U.S tax purposes.
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )}
                    {values.countryOfCitizenship == 258 ? (
                      <div
                        style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                      >
                        <Typography>
                          RES117
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
                            You selected that you are making this submission on
                            behalf of a Non-U.S. Individual but have selected
                            the United States as your country of citizenship. If
                            this is correct you may be subject to taxation in
                            the United States as a U.S. citizen or resident
                            alien.<div>&nbsp;</div>
                            <div>
                              We are not authorized to provide tax advice
                              through this process, but the answers provided
                              suggest that you may be considered as a U.S.
                              person for U.S. tax purposes and that you may need
                              to provide a Form W-9 "Request for Taxpayer
                              Identification Number and Certification".
                            </div>
                            <div>&nbsp;</div>
                            <div>
                              Please go back and review your selections or if
                              the circumstanced allow progress to submit a
                              certificate stating that you should not to be
                              considered a U.S. person for U.S. tax purposes in
                              this case. In these circumstances you must provide
                              additional information stating why this claim is
                              being made. Please note that any statements you
                              make through this process are given under the
                              Penalties of Perjury.
                            </div>
                          </span>
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )}

                    <div style={{ margin: "7px" }}>
                      <Typography
                        align="left"
                        style={{ fontSize: "27px", fontWeight: "550" }}
                      >
                        United States Citizenship Status
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  United States citizenship status
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
                              If you are an alien (not a U.S. citizen), you are
                              considered a non resident alien unless you meet
                              one of two tests. You are a resident alien of the
                              United States for tax purposes if you meet either
                              the green card test or the substantial presence
                              test for the calendar year (January 1-December
                              31).
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              Certain rules exist for determining the Residency
                              Starting and Ending Dates for aliens.
                            </Typography>
                            <Typography style={{ marginTop: "20px" }}>
                              In some cases aliens are allowed to make elections
                              which override the green card test and the
                              substantial presence test, as follows:
                            </Typography>

                            <Typography style={{ marginTop: "20px" }}>
                              - Non-resident Spouse Treated as a Resident
                            </Typography>
                            <Typography style={{ marginTop: "20px" }}>
                              - Closer Connection to a Foreign Country
                            </Typography>
                            <Typography style={{ marginTop: "20px" }}>
                              - Effect of Tax Treaties
                            </Typography>
                            <Typography style={{ marginTop: "20px" }}>
                              You can be both a nonresident alien and a resident
                              alien during the same tax year. This usually
                              occurs in the year you arrive or depart from the
                              United States. If so, you may elect to be treated
                              as a Dual Status Alien for this taxable year and a
                              Resident Alien for the next taxable year if you
                              meet certain tests. (Refer to section 'Dual-Status
                              Aliens' - 'First Year Choice' in Publication 519,
                              U.S. Tax Guide for Aliens).
                            </Typography>
                            <Typography style={{ marginTop: "20px" }}>
                              A resident alien who is required to establish
                              their U.S. residency for the purposes of claiming
                              a tax treaty benefit with a foreign country should
                              refer to Certification of U.S. Residency for Tax
                              Treaty Purposes.
                            </Typography>
                            <Typography style={{ marginTop: "20px" }}>
                              Ref: EH162
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
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mt-4" style={{ margin: "10px" }}>
                      <Typography
                        style={{
                          fontSize: "17px",
                          marginTop: "10px",
                        }}
                      >
                        Was the individual born in the United States and held
                        U.S. citizenship?<span style={{ color: "red" }}>*</span>
                      </Typography>

                      <FormControl>
                        <RadioGroup
                          row
                          
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="isHeldUSCitizenship"
                          value={values.isHeldUSCitizenship}
                          onChange={handleChange}
                          id="isHeldUSCitizenship"
                        >
                          <FormControlLabel
                            control={<Radio />}
                            value="yes"
                            name="isHeldUSCitizenship"
                            label="Yes"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="no"
                            name="isHeldUSCitizenship"
                            label="No"
                          />
                        </RadioGroup>
                        <p className="error">{errors.isHeldUSCitizenship}</p>
                      </FormControl>
                      <Divider className="dividr" />

                      {values.isHeldUSCitizenship === "no" ? (
                        <>
                          <Typography
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",
                            }}
                          >
                            Country of citizenship of the individual?
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <FormControl className="form">
                            <select
                               disabled
                              className="my-2"
                              style={{
                                fontSize: "17px",
                                padding: " 0 10px",
                                color: "#121112",
                                fontStyle: "italic",
                                height: "33px",
                              }}
                              name="countryOfCitizenship"
                              id="countryOfCitizenshipId"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              value={values.countryOfCitizenship}
                            >
                             
                              <option value="">---select---</option>
                              {getCountriesReducer.allCountriesData?.map(
                                (ele: any) => (
                                  <option key={ele?.id} value={ele?.id}>
                                    {ele?.name}
                                  </option>
                                )
                              )}
                            </select>
                          </FormControl>

                          <Divider className="dividr" />
                          <Typography
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",

                              marginBottom: "10px",
                            }}
                          >
                            Date of Birth (MM/DD/YYYY).....
                          </Typography>
                          <FormControl className="form">
                            <input
                              className="input my-2"
                              type="date"
                              value={
                                obValues.dob
                                  ? moment(obValues.dob).format("YYYY-MM-DD")
                                  : ""
                              }
                            />
                          </FormControl>

                          <Divider className="dividr" />
                          <Typography
                            style={{
                              fontSize: "17px",
                              // marginTop: "10px",

                              // marginBottom: "10px",
                            }}
                          >
                            Is the individual subject to taxation as a U.S.
                            citizen or resident alien?
                            <span style={{ color: "red" }}>*</span>
                          </Typography>

                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              id="isTaxationUSCitizenOrResident"
                              onChange={handleChange}
                              value={values.isTaxationUSCitizenOrResident}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                                name="isTaxationUSCitizenOrResident"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                                name="isTaxationUSCitizenOrResident"
                              />
                            </RadioGroup>
                            <p className="error">
                              {errors.isTaxationUSCitizenOrResident}
                            </p>
                          </FormControl>
                          <Divider className="dividr" />
                          <Typography
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",

                              marginBottom: "10px",
                            }}
                          >
                            Is the individual a Permanent Resident Card Holder
                            (Green Card)?<span style={{ color: "red" }}>*</span>
                          </Typography>

                          <FormControl>
                            <RadioGroup
                              row
                              value={values.isPermamnentResidentCardHolder}
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                                name="isPermamnentResidentCardHolder"
                              />
                              <FormControlLabel
                                className="label"
                                value="no"
                                control={<Radio />}
                                label="No"
                                name="isPermamnentResidentCardHolder"
                              />
                            </RadioGroup>
                          </FormControl>
                          <Divider className="dividr" />
                          <Typography
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",

                              marginBottom: "10px",
                            }}
                          >
                            Does the individual hold dual citizenship status?
                          </Typography>

                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              id="isHoldDualCitizenshipStatus"
                              value={values.isHoldDualCitizenshipStatus}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                control={<Radio />}
                                value="yes"
                                name="isHoldDualCitizenshipStatus"
                                label="Yes"
                              />
                              <FormControlLabel
                                control={<Radio />}
                                value="no"
                                name="isHoldDualCitizenshipStatus"
                                label="No"
                              />
                            </RadioGroup>
                            <p className="error">
                              {errors.isHoldDualCitizenshipStatus}
                            </p>
                          </FormControl>
                          <Divider className="dividr" />
                          {values.isHoldDualCitizenshipStatus === "yes" ? (
                            <>
                              <Typography
                                style={{
                                  fontSize: "17px",
                                  marginTop: "10px",

                                  marginBottom: "10px",
                                }}
                              >
                                Does or did the dual citizenship include U.S.
                                citizenship?
                                <span style={{ color: "red" }}>*</span>
                              </Typography>

                              <FormControl>
                                <RadioGroup
                                  row
                                  value={
                                    values.isHoldDualCitizenshipIncludeUSCitizenship
                                  }
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="isHoldDualCitizenshipIncludeUSCitizenship"
                                  onChange={handleChange}
                                  id="isHoldDualCitizenshipIncludeUSCitizenship"
                                >
                                  <FormControlLabel
                                    value="yes"
                                    control={<Radio />}
                                    label="Yes"
                                    name="isHoldDualCitizenshipIncludeUSCitizenship"
                                  />
                                  <FormControlLabel
                                    className="label"
                                    value="no"
                                    control={<Radio />}
                                    label="No"
                                    name="isHoldDualCitizenshipIncludeUSCitizenship"
                                  />
                                </RadioGroup>
                              </FormControl>
                              <Divider className="dividr" />
                            </>
                          ) : (
                            ""
                          )}

                          {values.isHoldDualCitizenshipIncludeUSCitizenship ==
                            "yes" ? (
                            <>
                              <Typography
                                style={{
                                  fontSize: "17px",
                                  marginTop: "10px",

                                  marginBottom: "10px",
                                }}
                              >
                                Has the individual formally renounced U.S.
                                citizenship?{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Typography>

                              <FormControl>
                                <RadioGroup
                                  id="isRenouncedCitizenship"
                                  row
                                  name="isRenouncedCitizenship"
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  value={values.isRenouncedCitizenship}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="yes"
                                    name="isRenouncedCitizenship"
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="no"
                                    name="isRenouncedCitizenship"
                                    label="No"
                                  />
                                </RadioGroup>
                              </FormControl>
                              <Divider className="dividr" />
                            </>
                          ) : (
                            ""
                          )}

                          {values.isRenouncedCitizenship == "yes" ? (
                            <>
                              <Typography
                                style={{
                                  fontSize: "17px",
                                  marginTop: "10px",

                                  marginBottom: "10px",
                                }}
                              >
                                Please enter the date U.S. citizenship was
                                renounced:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Typography>

                             
                              <FormControl className="form">
                                <input
                                  className="my-2"
                                  style={{ fontSize: "15px", width: "100%" }}
                                  type="date"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="dateRenouncedUSCitizenship"
                                  value={values.dateRenouncedUSCitizenship}
                                />
                              </FormControl>
                              <Divider className="dividr" />
                              <Typography
                                style={{
                                  fontSize: "17px",
                                  marginTop: "10px",

                                  marginBottom: "10px",
                                }}
                              >
                                Please attach proof of formal renouncement:
                              </Typography>
                              <div style={{ marginTop: "10px" }}>
                                <Input
                                  className="my-2"
                                  style={{ fontSize: "12px" }}
                                  type="file"
                                  placeholder="proof of formal renouncement"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="renouncementProof"
                                  value={values.renouncementProof}
                                />
                              </div>
                              <Divider className="dividr" />
                            </>
                          ) : (
                            ""
                          )}

                          {isTaxLiabilityJurisdictions.map((dt, ind)=>{
                            return (
                              <>
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
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="isTaxLiabilityJurisdictions"
                              value={dt}
                              onChange={(e)=>handleChangeIsTaxLiability(e, ind)}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                                name="isTaxLiabilityJurisdictions"
                              />
                              <FormControlLabel
                                className="label"
                                value="no"
                                control={<Radio />}
                                label="No"
                                name="isTaxLiabilityJurisdictions"
                              />
                            </RadioGroup>
                          </FormControl>

                          {dt == "yes" ? (
                            <>
                              <Typography className="mt-3">
                                Please select the country where the individual
                                has a tax liability:
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
                                  name="permanentResidentialCountryId"
                                  id="Income"
                                  // defaultValue={1}
                                  onChange={(e:any)=>handleChangeTaxLiability(e, ind, "taxLiability")}
                                  // value={values.permanentResidentialCountryId}
                                  value={countryTaxLiability[ind]}
                                >
                                  <option value={0}>---select---</option>
                                  {getCountriesAgentWiseReducer.agentWiseCountriesData
                                    ?.filter((ele: any) => ele.isImportantCountry === "Yes")
                                    .map((ele: any) => (
                                      <option key={ele.id} value={ele.id}>
                                        {ele.name}
                                      </option>
                                    ))}
                                  <option value={500}>---</option>
                                  {getCountriesAgentWiseReducer.agentWiseCountriesData
                                    ?.filter((ele: any) => ele.isImportantCountry !== "Yes")
                                    .map((ele: any) => (
                                      <option key={ele.id} value={ele.id}>
                                        {ele.name}
                                      </option>
                                    ))}
                                </select>
                              </FormControl>
                              

                              <Typography className="mt-2">
                                Please enter the tax reference number:
                               
                                  {selectedCountry && selectedCountry.foreignTinFormatToolTip !== null &&(
              <span>
                <Tooltip
                  style={{
                    backgroundColor: "black",
                    color: "white",
                  }}
                  title={selectedCountry.foreignTinFormatToolTip}
                >
                  <Info
                    onClick={() => setToolInfo("refrence")}
                    style={{
                      color: "#ffc107",
                      fontSize: "15px",
                      verticalAlign: "super",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </span>
            )}
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                              {toolInfo === "refrence" ? (
                                <div>
                                  <Paper
                                    style={{
                                      backgroundColor: "#dedcb1",
                                      padding: "15px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    <Typography style={{ color: "#0c5460" }}>
                                     {selectedCountryTitle}
                           
                                         </Typography>

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
                                  </Paper>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="d-flex">
                                <FormControl className="form mt-2">
                                  {countryTaxLiability[ind] == "no" ? (
                                    <Input
                                      name="taxReferenceNumber"
                                      onChange={handleChange}
                                      value={taxReferenceNumber[ind]}
                                      disabled
                                      className="input"
                                    />
                                  ) : (
                                    <InputMask
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
                                      name="taxReferenceNumber"
                                      onChange={(e:any)=>handleChangeTaxLiability(e, ind, "taxReferenceNumber")}
                                      value={taxReferenceNumber[ind]}
                                      className="number"
                                      mask={
                                        isTINFormatNotAvailable[ind] ? '' : selectedCountryMask ? selectedCountryMask : "********************"
                                      }
                                    />
                                  )}
                                </FormControl>
                              
                                <div className="d-flex">
                                  <Checkbox
                                    name="isTINFormatNotAvailable"
                                    onChange={(e) => {
                                      handleChangeTaxLiability(e, ind, "isTINFormatNotAvailable");
                                      setFieldValue("taxReferenceNumber", "");
                                    }}
                                    value={isTINFormatNotAvailable[ind] || false}
                                    checked={isTINFormatNotAvailable[ind] || false}
                                    
                                  />
                                  <div className="mt-2">
                                    TIN format not available
                                  </div>
                                </div>
                               
                              </div>
                              <Divider className="dividr mt-2" />
                            </>
                          ) : (
                            ""
                          )}
                              </>
                            )
                          })}
                          
                          <Divider className="dividr" />

                          <Typography
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",

                              marginBottom: "10px",
                            }}
                          >
                            Has the individual been physically present in the
                            United States on at least 31 days during the current
                            calendar year?
                          </Typography>

                          <FormControl>
                            <RadioGroup
                              row
                              id="IsPresentAtleast31Days"
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="IsPresentAtleast31Days"
                              value={values.IsPresentAtleast31Days}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="Yes"
                                label="Yes"
                                control={<Radio />}
                                
                                name="IsPresentAtleast31Days"
                              />
                              <FormControlLabel
                                className="label"
                                value="No"
                                control={<Radio />}
                                label="No"
                                name="IsPresentAtleast31Days"
                              />
                            </RadioGroup>
                            <p className="error">
                              {errors.IsPresentAtleast31Days}
                            </p>
                          </FormControl>

                          <Divider className="dividr" />
                        </>
                      ) :  (
                        <>
                          <Typography
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            Date of Birth (mm/dd/yyyy)...
                          </Typography>
                          <FormControl className="form">
                            <input
                              className="input my-2"
                              type="date"
                              value={
                                obValues.dob
                                  ? convertToStandardFormat(obValues.dob)
                                  : ""
                              }
                              disabled
                            />
                          </FormControl>
                          <Divider className="dividr" />
                          <Typography
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",

                              marginBottom: "10px",
                            }}
                          >
                            Is the individual subject to taxation as a U.S.
                            citizen or resident alien?
                            <span style={{ color: "red" }}>*</span>
                          </Typography>

                          <FormControl>
                            <RadioGroup
                              row
                              id="isTaxationUSCitizenOrResident"
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              value={values.isTaxationUSCitizenOrResident}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                control={<Radio />}
                                name="isTaxationUSCitizenOrResident"
                                value="yes"
                                label="Yes"
                              />
                              <FormControlLabel
                                control={<Radio />}
                                value="no"
                                name="isTaxationUSCitizenOrResident"
                                label="No"
                              />
                            </RadioGroup>
                            <p className="error">
                              {errors.isTaxationUSCitizenOrResident}
                            </p>
                          </FormControl>
                          <Divider className="dividr" />

                          <Typography
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",

                              marginBottom: "10px",
                            }}
                          >
                            Is the individual a Permanent Resident Card Holder
                            (Green Card)?
                          </Typography>

                          <FormControl>
                            <RadioGroup
                              row
                              id="isPermamnentResidentCardHolder"
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              value={values.isPermamnentResidentCardHolder}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                control={<Radio />}
                                value="yes"
                                name="isPermamnentResidentCardHolder"
                                label="Yes"
                              />
                              <FormControlLabel
                                control={<Radio />}
                                value="no"
                                name="isPermamnentResidentCardHolder"
                                label="No"
                              />
                            </RadioGroup>
                            <p className="error">
                              {errors.isPermamnentResidentCardHolder}
                            </p>
                          </FormControl>
                          <Divider className="dividr" />
                          <Typography
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",

                              marginBottom: "10px",
                            }}
                          >
                            Does the individual hold dual citizenship status?
                          </Typography>

                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              id="isHoldDualCitizenshipStatus"
                              value={values.isHoldDualCitizenshipStatus}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                control={<Radio />}
                                value="yes"
                                name="isHoldDualCitizenshipStatus"
                                label="Yes"
                              />
                              <FormControlLabel
                                control={<Radio />}
                                value="no"
                                name="isHoldDualCitizenshipStatus"
                                label="No"
                              />
                            </RadioGroup>
                            <p className="error">
                              {errors.isHoldDualCitizenshipStatus}
                            </p>
                          </FormControl>
                          <Divider className="dividr" />
                          {values.isHoldDualCitizenshipStatus == "yes" ? (
                            <>
                              <Typography
                                style={{
                                  fontSize: "17px",
                                  marginTop: "10px",

                                  marginBottom: "10px",
                                }}
                              >
                                Does or did the dual citizenship include U.S.
                                citizenship?2
                                <span style={{ color: "red" }}>*</span>
                              </Typography>

                              <FormControl>
                                <RadioGroup
                                  id="isHoldDualCitizenshipIncludeUSCitizenship"
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  value={
                                    values.isHoldDualCitizenshipIncludeUSCitizenship
                                  }
                                  onChange={handleChange}
                                >
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="yes"
                                    name="isHoldDualCitizenshipIncludeUSCitizenship"
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="no"
                                    name="isHoldDualCitizenshipIncludeUSCitizenship"
                                    label="No"
                                  />
                                </RadioGroup>
                                <p className="error">
                                  {
                                    errors.isHoldDualCitizenshipIncludeUSCitizenship
                                  }
                                </p>
                              </FormControl>
                              <Divider className="dividr" />
                            </>
                          ) : (
                            ""
                          )}

                          {values.isHoldDualCitizenshipIncludeUSCitizenship ==
                            "no" ? (
                            <>
                              <Typography
                                style={{
                                  fontSize: "17px",
                                  marginTop: "10px",

                                  marginBottom: "10px",
                                }}
                              >
                                Has the individual formally renounced U.S.
                                citizenship?{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Typography>

                              <FormControl>
                                <RadioGroup
                                  id="isRenouncedCitizenship"
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  value={values.isRenouncedCitizenship}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="yes"
                                    name="isRenouncedCitizenship"
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="no"
                                    name="isRenouncedCitizenship"
                                    label="No"
                                  />
                                </RadioGroup>
                                <p className="error">
                                  {errors.isRenouncedCitizenship}
                                </p>
                              </FormControl>
                              <Divider className="dividr" />
                            </>
                          ) : (
                            ""
                          )}

                          {values.isRenouncedCitizenship == "yes" ? (
                            <>
                              <Typography
                                style={{
                                  fontSize: "17px",
                                  marginTop: "10px",

                                  marginBottom: "10px",
                                }}
                              >
                                Please enter the date U.S. citizenship was
                                renounced:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                              <FormControl>
                                <input
                                  className="my-2"
                                  style={{ fontSize: "15px", width: "100%" }}
                                  type="date"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="dateRenouncedUSCitizenship"
                                  value={values.dateRenouncedUSCitizenship}
                                />
                              </FormControl>
                              <Divider className="dividr" />
                              <Typography
                                style={{
                                  fontSize: "17px",
                                  marginTop: "10px",

                                  marginBottom: "10px",
                                }}
                              >
                                Please attach proof of formal renouncement:
                              </Typography>
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  className="my-2"
                                  style={{ fontSize: "12px" }}
                                  type="file"
                                  placeholder="proof of formal renouncement"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="renouncementProof"
                                  value={values.renouncementProof}
                                />
                              </div>
                              <Divider className="dividr" />
                            </>
                          ) : (
                            ""
                          )}

                          {/* <Typography
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
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              id="isTaxLiabilityJurisdictions"
                              value={values.isTaxLiabilityJurisdictions}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                control={<Radio />}
                                value="yes"
                                name="isTaxLiabilityJurisdictions"
                                label="Yes"
                              />
                              <FormControlLabel
                                control={<Radio />}
                                value="no"
                                name="isTaxLiabilityJurisdictions"
                                label="No"
                              />
                            </RadioGroup>
                            <p className="error">
                              {errors.isTaxLiabilityJurisdictions}
                            </p>
                          </FormControl> */}
                          <Divider className="dividr" />

                          {/* {values.isTaxLiabilityJurisdictions == "yes" ? (
                            <>
                              <Typography>
                                Please select the country where the individual
                                has a tax liability:
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
                                  name="permanentResidentialCountryId"
                                  id="Income"
                                  defaultValue={1}
                                  onChange={handleChange}
                                  value={values.permanentResidentialCountryId}
                                >
                                  <option value={0}>---select---</option>
                                  {getCountriesAgentWiseReducer.agentWiseCountriesData
                                    ?.filter((ele: any) => ele.isImportantCountry === "Yes")
                                    .map((ele: any) => (
                                      <option key={ele.id} value={ele.id}>
                                        {ele.name}
                                      </option>
                                    ))}
                                  <option value={500}>---</option>
                                  {getCountriesAgentWiseReducer.agentWiseCountriesData
                                    ?.filter((ele: any) => ele.isImportantCountry !== "Yes")
                                    .map((ele: any) => (
                                      <option key={ele.id} value={ele.id}>
                                        {ele.name}
                                      </option>
                                    ))}
                                </select>
                              </FormControl>
                              <Divider className="dividr" />

                              <Typography className="mt-2">
                                Please enter the tax reference number:
                                {selectedCountry && selectedCountry.foreignTinFormatToolTip !== null &&(
                                 <span>
                                 <Tooltip
                                   style={{
                                     backgroundColor: "black",
                                     color: "white",
                                   }}
                                   title={selectedCountry.foreignTinFormatToolTip}
                                 >
                                   <Info
                                     onClick={() => setToolInfo("refrence")}
                                     style={{
                                       color: "#ffc107",
                                       fontSize: "15px",
                                       verticalAlign: "super",
                                       cursor: "pointer",
                                     }}
                                   />
                                 </Tooltip>
                               </span>
                             )}
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                              {toolInfo === "refrence" ? (
                                <div>
                                  <Paper
                                    style={{
                                      backgroundColor: "#dedcb1",
                                      padding: "15px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                     <Typography style={{ color: "#0c5460" }}>
                                     {selectedCountryTitle}
                           
                                         </Typography>

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
                                  </Paper>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="d-flex">
                              <FormControl className="form mt-2">
                                  {values.permanentResidentialCountryId == 0 ? (
                                    <Input
                                      name="taxReferenceNumber"
                                      onChange={handleChange}
                                      value={values.taxReferenceNumber}
                                      disabled
                                      className="input"
                                    />
                                  ) : (
                                    <InputMask
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
                                      name="taxReferenceNumber"
                                      onChange={handleChange}
                                      value={values.taxReferenceNumber}
                                      className="number"
                                      mask={
                                        values.isTINFormatNotAvailable ? '' : selectedCountryMask ? selectedCountryMask : "********************"
                                      }
                                    />
                                  )}
                                </FormControl>
                                <div className="d-flex">
                                  <Checkbox
                                    name="isTINFormatNotAvailable"
                                    onChange={(e) => {
                                      handleChange(e);
                                      setFieldValue("taxReferenceNumber", "");
                                    }}
                                    value={values.isTINFormatNotAvailable}
                                    required
                                  />
                                  <div className="mt-2">
                                    TIN format not available
                                  </div>
                                </div>
                               
                              </div>
                              <Typography
                                style={{
                                  fontSize: "17px",
                                  marginTop: "10px",

                                  marginBottom: "10px",
                                }}
                              >
                                Does the individual the submission represents
                                have tax liability in any other jurisdictions?
                              </Typography>

                              <FormControl>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  id="isTaxLiabilityJurisdictions"
                                  value={values.isTaxLiabilityJurisdictions}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="yes"
                                    name="isTaxLiabilityJurisdictions"
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="no"
                                    name="isTaxLiabilityJurisdictions"
                                    label="No"
                                  />
                                </RadioGroup>
                                <p className="error">
                                  {errors.isTaxLiabilityJurisdictions}
                                </p>
                              </FormControl>
                            </>
                          ) : (
                            ""
                          )} */}
                          <Typography
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            Has the individual been physically present in the
                            United States on at least 31 days during the current
                            calendar year?
                          </Typography>

                          <FormControl>
                            <RadioGroup
                              row
                              id="IsPresentAtleast31Days"
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="IsPresentAtleast31Days"
                              value={values.IsPresentAtleast31Days}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                                name="IsPresentAtleast31Days"
                              />
                              <FormControlLabel
                                className="label"
                                value="No"
                                control={<Radio />}
                                label="No"
                                name="IsPresentAtleast31Days"
                              />
                            </RadioGroup>
                            <p className="error">
                              {errors.IsPresentAtleast31Days}
                            </p>
                          </FormControl>

                          <Divider className="dividr" />
                        </>
                      )}

                      {/* <Typography  style={{
                        
                            fontSize: "17px",
                            marginTop: "10px",
                           
                       
                          marginBottom: "10px",
                        }}>
              Is the individual subject to taxation as a U.S. citizen or resident alien?<span style={{ color: "red" }}>*</span>
            </Typography>


            <FormControl >

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Yes" />
                <FormControlLabel className="label" value="male" control={<Radio />} label="No" />

              </RadioGroup>


            </FormControl>
            <Divider className="dividr" />



            <Typography style={{ fontSize: "19px", marginTop: "10px" }}>
              Is the individual a Permanent Resident Card Holder (Green Card)?<span style={{ color: "red" }}>*</span>
            </Typography>


            <FormControl >

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Yes" />
                <FormControlLabel className="label" value="male" control={<Radio />} label="No" />

              </RadioGroup>


            </FormControl>
            <Divider className="dividr" />
            <Typography style={{ fontSize: "19px", marginTop: "10px" }}>
              Does the individual hold dual citizenship status? <span style={{ color: "red" }}>*</span>
            </Typography>


            <FormControl >

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Yes" />
                <FormControlLabel className="label" value="male" control={<Radio />} label="No" />

              </RadioGroup>


            </FormControl>
            <Divider className="dividr" />
            <Typography style={{ fontSize: "19px", marginTop: "10px" }}>
              Has the individual formally renounced U.S. citizenship?<span style={{ color: "red" }}>*</span>
            </Typography>


            <FormControl >

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Yes" />
                <FormControlLabel className="label" value="male" control={<Radio />} label="No" />

              </RadioGroup>


            </FormControl>
           


            <FormControl >

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Yes" />
                <FormControlLabel className="label" value="male" control={<Radio />} label="No" />

              </RadioGroup>


            </FormControl>
            <Divider className="dividr" />

            <Typography style={{ fontSize: "19px", marginTop: "10px" }}>
              Please attach proof of formal renouncement:
            </Typography>
            <div style={{ marginTop: "10px" }}>
              <input style={{ fontSize: "22px" }} type="file" />
            </div>
            <Divider className="dividr" />

            <Typography style={{ fontSize: "19px", marginTop: "10px", marginBottom: "10px" }}>
              Was the individual born in the United States and held U.S. citizenship?<span style={{ color: "red" }}>*</span>
            </Typography>


            <FormControl >

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Yes" />
                <FormControlLabel className="label" value="male" control={<Radio />} label="No" />

              </RadioGroup>


            </FormControl>
            <Divider className="dividr" />
            <Typography style={{ fontSize: "19px", marginTop: "10px" }}>
              Has the individual been physically present in the United States on at least 31 days during the current calendar year?<span style={{ color: "red" }}>*</span>
            </Typography>


            <FormControl >

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Yes" />
                <FormControlLabel className="label" value="male" control={<Radio />} label="No" />

              </RadioGroup>


            </FormControl>
            <Divider className="dividr" /> */}
                    </div>
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
                          dispatch(postW8BENForm(
                            {
                              ...prevStepData,
                              ...values,
                              stepName: `/${urlValue}`
                            }
                            , () => { }))
                          history(GlobalValues.basePageRoute)
                        })
                      }} formTypeId={FormTypeId.BEN} />
                      <Button
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                        onClick={() => {
                          dispatch(GetBenPdf(authDetails?.accountHolderId, (callbackData:any)=>{
                            setPopupState({
                                status:true,
                                data: callbackData?.pdf
                            })
                        }))
                    }}
                      >
                        View form
                      </Button>
                      <Button
                        type="submit"
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
                          if (PrevData?.IsUsSourcedIncome == true){
                          
                          history("/W-8BEN/Declaration/US_Sourced")
                        }
                        else{
                          history("/W-8BEN/Declaration");
                        }
                      
                      }}
                    
                       
                        variant="contained"
                        size="small"
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
                )}}
              </Formik>
            </Paper>
          </div>
        </div>
      </div>
      <PopupModal data={popupState} setPopupState={setPopupState} />
    </section>
  );
}
