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
import { Divider } from "@mui/material";
import { DeleteOutline, Info } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./index.scss";
import checksolid from "../../../../../assets/img/check-solid.png";
import { Formik, Form, FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  W8_state,
  getAllCountries,
  postW8BENForm,
  GetHelpVideoDetails,
  postSCIndividualEForm
} from "../../../../Redux/Actions";
import { StatusSchema } from "../../../../schemas/w8Ben";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import { GetAgentCountriesImportantForEform } from "../../../../Redux/Actions";
import moment from "moment";
import { GetBenPdf } from "../../../../Redux/Actions/PfdActions";
import Infoicon from "../../../../assets/img/info.png";
import { useLocation } from "react-router-dom";
import useAuth from "../../../../customHooks/useAuth";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import { StartSchema } from "../../../../schemas/cayman";
import DatePicker from 'react-date-picker';
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import View_Insructions from "../../../viewInstruction";

interface FormValues {
  accountHolderBasicDetailId: number,
  agentId: number,
  formTypeSelectionId:number;
  formTypeId: number,
  isHeldUSCitizenship:boolean;
  countryOfCitizenship: number;
  isTaxationUSCitizenOrResident: boolean;
  isHoldDualCitizenshipStatus: boolean;
  isHoldDualCitizenshipIncludeUSCitizenship: boolean;
  isRenouncedCitizenship: boolean;
  dateRenouncedUSCitizenship: string,
  countryTaxLiability:string;
  IsPresentAtleast31Days:boolean;
  renouncementProof:string;
  statusId:number;
  isPermamnentResidentCardHolder: boolean;
  stepName:string;
  items: { 
    isTaxLiabilityJurisdictions: boolean,
    permanentResidentialCountryId: number,
    taxReferenceNumber: string,
    isTINFormatNotAvailable: boolean,
  }[];
}

interface FormErrors {
  permanentResidentialCountryId?: string; // Optional because it might not exist if there are no errors
}

export default function Index() {
  const { authDetails } = useAuth();
  const location = useLocation();
  const urlValue = location.pathname.substring(1);
  const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");
  const agentDefaultDetails = JSON.parse(
    localStorage.getItem("agentDefaultDetails") || "{}"
  );
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const convertToStandardFormat = (customDateString: any) => {
    const dateObject = new Date(customDateString);
    const year = dateObject.getUTCFullYear();
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //console.log(obValues)
  // const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");


  // const itemsData = accountStatementData?.map((dataItem: any, index: number) => ({
  //   id: index, // Assuming you want to use the index as the id
  //   agentId: authDetails?.agentId,
  //   formTypeSelectionId: obValues.businessTypeId,
  //   formTypeId: FormTypeId.CaymanIndividual,
  //   accountHolderBasicDetailId:authDetails?.accountHolderId,
  //   isHeldUSCitizenship: false,
  //   countryOfCitizenship: obValues?.countryOfCitizenshipId ? obValues?.countryOfCitizenshipId : "0",
  //   isTaxationUSCitizenOrResident: false,
  //   isPermamnentResidentCardHolder: false,
  //   isHoldDualCitizenshipStatus: false,
  //   isHoldDualCitizenshipIncludeUSCitizenship: false,
  //   isRenouncedCitizenship: false,
  //   dateRenouncedUSCitizenship: "",
    
  //   renouncementProof: "",
  //   items:{
  //     isTaxLiabilityJurisdictions: false,
  //     permanentResidentialCountryId: 0,
  //     taxReferenceNumber: "",
  //     isTINFormatNotAvailable: false,
  //   },
    
  //   countryTaxLiability: "",
    
  //   IsPresentAtleast31Days: false,
  //   statusId: 1,
  //   stepName: `/${urlValue}`,
  // }));

  const itemsData = [{
    isTaxLiabilityJurisdictions: false,
    permanentResidentialCountryId: 0,
    taxReferenceNumber: "",
    isTINFormatNotAvailable: false,
  }];


  const initialValues: FormValues = {
    agentId: authDetails?.agentId,
    formTypeSelectionId: obValues.businessTypeId,
    formTypeId: FormTypeId.CaymanIndividual,
    accountHolderBasicDetailId:authDetails?.accountHolderId,
    isHeldUSCitizenship: PrevStepData?.isHeldUSCitizenship ? PrevStepData.isHeldUSCitizenship : false,
    countryOfCitizenship: obValues?.countryOfCitizenshipId ? obValues?.countryOfCitizenshipId : "0",
    isTaxationUSCitizenOrResident: PrevStepData?.isTaxationUSCitizenOrResident ? PrevStepData.isTaxationUSCitizenOrResident :  false,
    isPermamnentResidentCardHolder: PrevStepData?.isPermamnentResidentCardHolder ? PrevStepData.isPermamnentResidentCardHolder : false,
    isHoldDualCitizenshipStatus: PrevStepData?.isHoldDualCitizenshipStatus ? PrevStepData.isHoldDualCitizenshipStatus:false,
    isHoldDualCitizenshipIncludeUSCitizenship: PrevStepData?.isHoldDualCitizenshipIncludeUSCitizenship ? PrevStepData.isHoldDualCitizenshipIncludeUSCitizenship:false,
    isRenouncedCitizenship: PrevStepData?.isRenouncedCitizenship ? PrevStepData.isRenouncedCitizenship: false,
    dateRenouncedUSCitizenship:PrevStepData?.dateRenouncedUSCitizenship ? PrevStepData.dateRenouncedUSCitizenship: "",
    renouncementProof: PrevStepData?.renouncementProof ? PrevStepData.renouncementProof:"",
    items: itemsData,
    countryTaxLiability: PrevStepData?.countryTaxLiability ? PrevStepData.countryTaxLiability:"",
    IsPresentAtleast31Days: PrevStepData?.IsPresentAtleast31Days ? PrevStepData.IsPresentAtleast31Days:false,
    statusId: 1,
    stepName: `/${urlValue}`,
  };

  const dispatch = useDispatch();
  const history = useNavigate();
  const [expanded, setExpanded] = React.useState<string | false>("");
  

  useEffect(() => {
    document.title = "Comply Exchange"
    dispatch(getAllCountries());
    dispatch(GetHelpVideoDetails());
    dispatch(GetAgentCountriesImportantForEform());
  }, []);

 
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const W8Data = useSelector((state: any) => state.w8Data);

  const [tax, setTax] = useState<string>("");

  const handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTax(event.target.value);
  };

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
  

  const GetAgentCountriesImportantForEformData = useSelector(
    (state: any) =>
      state.GetAgentCountriesImportantForEformReducer
        .GetAgentCountriesImportantForEformData
  );

  // const viewPdf = () => {
  //   // history("/w8Ben_pdf", { replace: true });
  //   //history("/w8Ben_pdf");
  // }

  function getNameById(id: any) {
    if (!Array.isArray(allCountriesData)) {
      console.error('Input is not an array.');
      return null;
    }

    const foundObject = allCountriesData.find((obj: any) => obj.id === id);
    return foundObject ? foundObject.name : null;
  }

  const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }

  const viewPdf=()=>{
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
          {/* <div className="viewform" onClick={viewPdf}>View Form</div> */}
          <div className="viewform" onClick={() => {
              dispatch(GetBenPdf(authDetails?.accountHolderId))
            }}>View Form</div>
          <div className="helpvideo">
            {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
            {GethelpData && GethelpData[4].id === 6 ? (
              <a
                href={GethelpData[4].fieldValue}
                target="popup"
                onClick={() =>
                  window.open(
                    GethelpData[4].fieldValue,
                    'name',
                    `width=${GethelpData[4].width},height=${GethelpData[4].height},top=${GethelpData[4].top},left=${GethelpData[4].left}`
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
            <BreadCrumbComponent breadCrumbCode={1301} formName={FormTypeId.CaymanIndividual} />
          </div>
        </div>
        <div className="col-8 mt-3">
          <div style={{ padding: "10px" }}>
            <Paper style={{ padding: "18px" }}>
              <Formik<FormValues>
               validateOnChange={false}
               validateOnBlur={false}
               validateOnMount={false}

                initialValues={initialValues}
                enableReinitialize
                //validationSchema={StartSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const temp = {
                    ...values,
                    ...PrevStepData,
                    stepName: `/${urlValue}`
                  };

                  // if (clickCount === 0) {
                  //   setClickCount(clickCount + 1);
                  // } else {

                    const new_obj = { ...PrevStepData, citizenshipCountry: getNameById(PrevStepData.citizenshipCountry) }
                    const result = { ...new_obj, ...values };
                    // console.log(result,"FINAL RESULT")
                    dispatch(
                      postSCIndividualEForm(values, () => {
                        // history("/W-8BEN/Declaration/US_Tin");
                        if (values?.IsPresentAtleast31Days=== true) {
                          history('/Cayman/Individual/start/SustantialPresence')
                        } else {
                          history(
                            "/Cayman/Individual/start/US_Tin"
                          );
                        }
                        localStorage.setItem(
                          "PrevStepData",
                          JSON.stringify(result)
                        );
                      })
                    );

                  }
                }
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
                }) => (
                  <Form onSubmit={handleSubmit}>
                   
                    
                    {values.isHeldUSCitizenship === true &&
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

                    {values.isHoldDualCitizenshipStatus === true
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

                    {values.isHeldUSCitizenship === true &&
                      values.isRenouncedCitizenship === true ? (
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

                    {values.isHeldUSCitizenship === true &&
                      values.isTaxationUSCitizenOrResident === true ? (
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

                    {values.isHeldUSCitizenship === true &&
                      values.isPermamnentResidentCardHolder === true? (
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

                    {values.isHeldUSCitizenship === true &&
                      values.isHoldDualCitizenshipIncludeUSCitizenship === true ? (
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

                    {values.IsPresentAtleast31Days === true ?
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
                          defaultValue=""
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="isHeldUSCitizenship"
                          value={values.isHeldUSCitizenship}
                          onChange={(event) => {
                            setFieldValue("isHeldUSCitizenship", event.currentTarget.value === "true" ? true : false)
                          }}
                          id="isHeldUSCitizenship"
                        >
                          <FormControlLabel
                            control={<Radio />}
                            value="true"
                            name="isHeldUSCitizenship"
                            label="Yes"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="false"
                            name="isHeldUSCitizenship"
                            label="No"
                          />
                        </RadioGroup>
                        <p className="error">{errors.isHeldUSCitizenship}</p>
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
                              defaultValue=""
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="isTaxationUSCitizenOrResident"
                              value={values.isTaxationUSCitizenOrResident}
                              onChange={(event) => {
                                setFieldValue("isTaxationUSCitizenOrResident", event.currentTarget.value === "true" ? true : false)
                              }}
                              id="isTaxationUSCitizenOrResident"
                            >
                              <FormControlLabel
                                control={<Radio />}
                                value="true"
                                name="isTaxationUSCitizenOrResident"
                                label="Yes"
                              />
                              <FormControlLabel
                                control={<Radio />}
                                value="false"
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
                                defaultValue=""
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="isPermamnentResidentCardHolder"
                                value={values.isPermamnentResidentCardHolder}
                                onChange={(event) => {
                                  setFieldValue("isPermamnentResidentCardHolder", event.currentTarget.value === "true" ? true : false)
                                }}
                                id="isPermamnentResidentCardHolder"
                              >
                                <FormControlLabel
                                  control={<Radio />}
                                  value="true"
                                  name="isPermamnentResidentCardHolder"
                                  label="Yes"
                                />
                                <FormControlLabel
                                  control={<Radio />}
                                  value="false"
                                  name="isPermamnentResidentCardHolder"
                                  label="No"
                                />
                              </RadioGroup>
                            
                            <p className="error">
                              {/* {errors.isPermamnentResidentCardHolder} */}
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
                                defaultValue=""
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="isHoldDualCitizenshipStatus"
                                value={values.isHoldDualCitizenshipStatus}
                                onChange={(event) => {
                                  setFieldValue("isHoldDualCitizenshipStatus", event.currentTarget.value === "true" ? true : false)
                                }}
                                id="isHoldDualCitizenshipStatus"
                              >
                                <FormControlLabel
                                  control={<Radio />}
                                  value="true"
                                  name="isHoldDualCitizenshipStatus"
                                  label="Yes"
                                />
                                <FormControlLabel
                                  control={<Radio />}
                                  value="false"
                                  name="isHoldDualCitizenshipStatus"
                                  label="No"
                                />
                              </RadioGroup>
                            
                            <p className="error">
                              {errors.isHoldDualCitizenshipStatus}
                            </p>
                          </FormControl>
                          <Divider className="dividr" />
                          {values.isHoldDualCitizenshipStatus == true ? (
                            <>
                              <Typography
                                style={{
                                  fontSize: "17px",
                                  marginTop: "10px",

                                  marginBottom: "10px",
                                }}
                              >
                                Does or did the dual citizenship include U.S.
                                citizenship?{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Typography>

                              <FormControl>
                                <RadioGroup
                                  row
                                  defaultValue=""
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="isHoldDualCitizenshipIncludeUSCitizenship"
                                  value={values.isHoldDualCitizenshipIncludeUSCitizenship}
                                  onChange={(event) => {
                                    setFieldValue("isHoldDualCitizenshipIncludeUSCitizenship", event.currentTarget.value === "true" ? true : false)
                                  }}
                                  id="isHoldDualCitizenshipIncludeUSCitizenship"
                                >
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="true"
                                    name="isHoldDualCitizenshipIncludeUSCitizenship"
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="false"
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

                          {values.isHeldUSCitizenship ===true ? (
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
                                    row
                                    defaultValue=""
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="isRenouncedCitizenship"
                                    value={values.isRenouncedCitizenship}
                                    onChange={(event) => {
                                      setFieldValue("isRenouncedCitizenship", event.currentTarget.value === "true" ? true : false)
                                    }}
                                    id="isRenouncedCitizenship"
                                  >
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="true"
                                      name="isRenouncedCitizenship"
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="false"
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

                          {values.isRenouncedCitizenship === true ? (
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
                              <Typography>
                              <DatePicker
                                  className="dateclass"
                                  onBlur={handleBlur}
                                  name="dateRenouncedUSCitizenship"
                                  onChange={(date:any) => { 
                                    setTimeout(() => { 
                                      const inputDate = new Date(date);
                                      const year = inputDate.getFullYear();
                                      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
                                      const day = String(inputDate.getDate()).padStart(2, '0');
                                      const formattedDate = `${year}-${month}-${day}`;
                                      setFieldValue("dateRenouncedUSCitizenship", formattedDate);
                                    }, 200);
                                  }}
                                  value={values.dateRenouncedUSCitizenship}
                                  clearIcon={null}
                                  format="yyyy-MM-dd"
                                  dayPlaceholder="dd"
                                  monthPlaceholder="mm"
                                  yearPlaceholder="yy"
                                />
                              {/* <DatePicker
                    
                                    className="dateclass"
                                    onBlur={handleBlur}
                                    name="dateRenouncedUSCitizenship"
                                    onChange={(date:any) => { 
                                      setTimeout(() => { 
                                        const inputDate = new Date(date);

                                      const year = inputDate.getFullYear();
                                      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
                                      const day = String(inputDate.getDate()).padStart(2, '0');

                                      const formattedDate = `${year}-${month}-${day}`;
                                        
                                        setFieldValue("dateRenouncedUSCitizenship", formattedDate); }, 200)
                                    }
                                  }
                                    
                                    //maxDate={moment().toDate()}
                                    value={values.dateRenouncedUSCitizenship}
                                    clearIcon={null}
                                    format="yyyy-MM-dd"
                                    dayPlaceholder="dd"
                                    monthPlaceholder="mm"
                                    yearPlaceholder="yy"
                                  /> */}
                                {/* <input
                                  className="my-2"
                                  style={{ fontSize: "15px", width: "100%" }}
                                  type="date"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="dateRenouncedUSCitizenship"
                                  value={values.dateRenouncedUSCitizenship}
                                /> */}

                                <p className="error"> {errors?.dateRenouncedUSCitizenship}</p>
                                 {(errors?.dateRenouncedUSCitizenship && touched?.dateRenouncedUSCitizenship && typeof errors.dateRenouncedUSCitizenship !== 'string') && (
                                    <p className="error"> {errors?.dateRenouncedUSCitizenship}</p>
                                  )}
                                
                              </Typography>
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
                          <FieldArray name="items">
                          {({ push, remove }) => (
                            <div>
                              {values.items.map((item:any, index:any) => (
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
                                          name={`items.${index}.isTaxLiabilityJurisdictions`}
                                          value={values.items[index].isTaxLiabilityJurisdictions}
                                          onChange={(event) => {
                                            handleChange({
                                                      
                                              target: {
                                                  name: "items",
                                                  value: [...values.items, { 
                                                    isTaxLiabilityJurisdictions: false,
                                                    permanentResidentialCountryId: 0,
                                                    taxReferenceNumber: "",
                                                    isTINFormatNotAvailable: false,
                                                   }],
                                              },
                                              })
                                            setFieldValue(`items.${index}.isTaxLiabilityJurisdictions`, event.currentTarget.value === "true" ? true : false)
                                          }}
                                          id="isTaxLiabilityJurisdictions"
                                        >
                                          <FormControlLabel
                                            control={<Radio />}
                                            value="true"
                                            name={`items.${index}.isTaxLiabilityJurisdictions`}
                                            label="Yes"
                                          />
                                          <FormControlLabel
                                            control={<Radio />}
                                            value="false"
                                            name={`items.${index}.isTaxLiabilityJurisdictions`}
                                            label="No"
                                          />
                                        </RadioGroup>
                                      
                                      {/* <p className="error">
                                        {errors.isTaxLiabilityJurisdictions}
                                      </p> */}
                                    </FormControl>
                                    <Divider className="dividr" />
                                    {values.items[index].isTaxLiabilityJurisdictions == true ? (
                                        <>

                                        <DeleteOutline type="button" onClick={() => remove(index)}/>
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
                                              name={`items.${index}.permanentResidentialCountryId`}
                                              id="Income"
                                              defaultValue={1}
                                              onChange={handleChange}
                                              value={values.items[index].permanentResidentialCountryId}
                                            >
                                              <option value={0}>---select---</option>
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
                                            
                                            {/* {(typeof errors === 'object' && 'permanentResidentialCountryId' in errors.items) && (
                                                      <p className="error">Please select Country</p>
                                                    )} */}
                                            {/* {errors?.permanentResidentialCountryId && typeof errors?.permanentResidentialCountryId === 'string' && (
                                              <p className="error">{errors?.permanentResidentialCountryId}</p>
                                            )} */}
                                          </FormControl>
                                          {/* {Array.isArray(errors?.items) && (
                                          <div>
                                           {errors.items
                                              .filter(error => error !== null) // Filter out null values
                                              .map((error, index) => (
                                                <div key={index}>
                                                  {error && (
                                                    <>
                                                      {(typeof error !== 'string' &&  error?.permanentResidentialCountryId) && (
                                                        <p className="error">{error.permanentResidentialCountryId}</p>
                                                      )}
                                                      
                                                    </>
                                                  )}
                                                </div>
                                              ))}
                                          </div>
                                        )} */}

                                          {/* {Array.isArray(errors?.items) && errors.items.length > 0 && (
                                            <div>
                                              {errors.items.map((error, index) => (
                                                <div key={index}>
                                                  {error && (
                                                    <>
                                                      {(typeof error !== 'string' &&  error?.permanentResidentialCountryId) && (
                                                        <p className="error">{error.permanentResidentialCountryId}</p>
                                                      )}
                                                      
                                                    </>
                                                  )}
                                                </div>
                                              ))}
                                            </div>
                                          )} */}


                                          {/* {Array.isArray(errors?.items) && errors.items.length > 0 && (
                                              <div>
                                                  {errors.items.map((error, index) => (
                                                        
                                                        (error !== undefined ? <>
                                                          <p className="error" key={index}>
                                                          {(typeof error !== 'string' && error?.permanentResidentialCountryId) ? error.permanentResidentialCountryId : ""}
                                                          
                                                          </p>
                                                            </> : "")
                                                      //   <p className="error" key={index}>
                                                      //   {(typeof error !== 'string' && error?.permanentResidentialCountryId) ? error.permanentResidentialCountryId : ""}
                                                      
                                                      // </p>

                                                    


                                                  ))}
                                              </div>
                                          )} */}
                                          <Divider className="dividr" />

                                          <Typography>
                                            Please enter the tax reference number:
                                            {values.items[index].permanentResidentialCountryId == 257 ? (
                                              <span>
                                                <Tooltip
                                                  style={{
                                                    backgroundColor: "black",
                                                    color: "white",
                                                  }}
                                                  title={
                                                    <>
                                                      <Typography color="inherit"></Typography>
                                                      <a
                                                        onClick={() =>
                                                          setToolInfo("refrence")
                                                        }
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
                                            ) : (
                                              ""
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
                                                <Typography>
                                                  United Kingdom TIN Format is 9999999999
                                                  <br />
                                                  9- Numeric value only
                                                  <br />
                                                  A- Alphabetic character only
                                                  <br />
                                                  *- Alphanumeric character only ?-
                                                  Characters optional after this
                                                  <br />
                                                  IF TIN format is not available, please
                                                  check the below box and continue
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
                                          <div className="d-flex">
                                            <FormControl className="form">
                                              {values.items[index].isTINFormatNotAvailable == false ? (
                                                <Input
                                                  name={`items.${index}.taxReferenceNumber`}
                                                  onChange={handleChange}
                                                  value={values.items[index].taxReferenceNumber}
                                                  disabled
                                                  className="input"
                                                />
                                              ) : (
                                                <Input
                                                  name={`items.${index}.taxReferenceNumber`}
                                                  onChange={handleChange}
                                                  value={values.items[index].taxReferenceNumber}
                                                  className="number"
                                                />
                                              )}
                                              {/* {Array.isArray(errors?.items) && errors.items.length > 0 && (
                                                <div>
                                                  {errors.items.map((error, index) => (
                                                    <div key={index}>
                                                      {error && (
                                                        <>
                                                          {(typeof error !== 'string' && error?.taxReferenceNumber) && (
                                                            <p className="error">{error.taxReferenceNumber}</p>
                                                          )}
                                                          
                                                        </>
                                                      )}
                                                    </div>
                                                  ))}
                                                </div>
                                              )} */}
                                              {/* {Array.isArray(errors?.items) && errors.items.length > 0 && (
                                              <div>
                                                  {errors.items.map((error, index) => (

                                                      (error ? <>
                                                      <p className="error" key={index}>
                                                      {(typeof error !== 'string' && error?.taxReferenceNumber) ? error.taxReferenceNumber : ""}
                                                      
                                                      </p>
                                                        </> : "")
                                                      

                                                     

                                                    


                                                  ))}
                                              </div>
                                          )} */}
                                            </FormControl>
                                            {/* {values.permanentResidentialCountryId == 257?( */}
                                            <div className="d-flex">
                                              <Checkbox
                                                name={`items.${index}.isTINFormatNotAvailable`}
                                                onChange={(e) => {
                                                  handleChange(e);
                                                  setFieldValue("taxReferenceNumber", "");
                                                }}
                                                value={values.items[index].isTINFormatNotAvailable}
                                                required
                                              />
                                              <div className="mt-2">
                                                TIN format not available
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
                          
                          

                          
                         

                          

                          {/* loop ends here */}
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
                                defaultValue=""
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="IsPresentAtleast31Days"
                                value={values.IsPresentAtleast31Days}
                                onChange={(event) => {
                                  setFieldValue("IsPresentAtleast31Days", event.currentTarget.value === "true" ? true : false)
                                }}
                                id="IsPresentAtleast31Days"
                              >
                                <FormControlLabel
                                  control={<Radio />}
                                  value="true"
                                  name="IsPresentAtleast31Days"
                                  label="Yes"
                                />
                                <FormControlLabel
                                  control={<Radio />}
                                  value="false"
                                  name="IsPresentAtleast31Days"
                                  label="No"
                                />
                              </RadioGroup>
                            
                            <p className="error">
                              {errors.IsPresentAtleast31Days}
                            </p>
                          </FormControl>
                        </div>
                          <Divider className="dividr" />
                        
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "80px",
                      }}
                    >
                      {/* <Button variant="contained" style={{ color: "white" }}>
                        SAVE & EXIT
                      </Button> */}
                      <SaveAndExit Callback={() => {
                        submitForm().then((data: any) => {
                          const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                          const urlValue = window.location.pathname.substring(1);
                          dispatch(postSCIndividualEForm(
                            {
                              ...prevStepData,
                              stepName: `/${urlValue}`
                            }
                            , () => { }))
                          history(GlobalValues.basePageRoute)
                        }).catch((err: any) => {
                          console.log(err);
                        })
                      }} formTypeId={FormTypeId.CaymanIndividual} />
                      <Button
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                        onClick={() => {
                          dispatch(GetBenPdf(authDetails?.accountHolderId))
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
                          history("/W-8BEN/Declaration");
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
                )}
              </Formik>
            </Paper>
          </div>
        </div>
      </div>
    </section>
  );
}
