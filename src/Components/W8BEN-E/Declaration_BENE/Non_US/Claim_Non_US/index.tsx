import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Paper,
  RadioGroup,
  Radio,
  Link,
  FormControlLabel,
  Tooltip,
  Divider,
  Checkbox,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import Infoicon from "../../../../../assets/img/info.png";
import { Formik, Form } from "formik";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { claimSchema } from "../../../../../schemas/w8Ben";
import { W8_state, getAllCountries, getAllCountriesWithTreaty, postW8BEN_EForm } from "../../../../../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import checksolid from "../../../../../assets/img/check-solid.png";
import check from "../../../../../assets/img/check.png";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import {
  GetHelpVideoDetails,
  GetAgentCountriesImportantForEform,
  GetLimitationBenefits,
} from "../../../../../Redux/Actions";
import PopupModal from "../../../../../Redux/Actions/poupModal";
import { claimSchemaW8BenE } from "../../../../../schemas/w8BenE";
import GlobalValues, { FormTypeId } from "../../../../../Utils/constVals";
import SaveAndExit from "../../../../Reusable/SaveAndExit/Index";
import useAuth from "../../../../../customHooks/useAuth";
import { GetBenEPdf } from "../../../../../Redux/Actions/PfdActions";
import Redirect from "../../../../../Router/RouterSkip";
export default function FCTA_Reporting(props: any) {
  const history = useNavigate();
  const { authDetails } = useAuth()
  const [report, setReport] = useState<string>("");
  const handleReportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReport((event.target as HTMLInputElement).value);
  };
  const [toolInfo, setToolInfo] = useState("");
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [popupState, setPopupState] = useState({
    data:"",
    status:false
});
  const [initialValues, setInitialValues] = useState({
    isClaimTreaty: "No",
    ownerResidentId: "0",
    limitationBenefitsId: 0,
    isSubmissionClaimTreaty: "",
  })
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const W8BENEData = useSelector((state: any) => state.W8BENE);
  const LoadData = () => {
    let temp = {
      ...PrevStepData,
      ...W8BENEData,
      isClaimTreaty: W8BENEData.isClaimTreaty === true ? "yes" : "no",
      isSubmissionClaimTreaty: W8BENEData.isSubmissionClaimTreaty === true ? "yes" : "no",
    };
    setInitialValues(temp);
  }


  const getCountriesData = useSelector((state: any) => state.CountriesTreaty.records?.filter((ele: any) => ele.treatyEffectiveYear !== 0 && ele.treatyEffectiveYear != null))
  console.log(getCountriesData, "get countries data")
  useEffect(() => {
    document.title = "Treaty Claim Statement";
    dispatch(getAllCountriesWithTreaty());
    dispatch(GetAgentCountriesImportantForEform());
    dispatch(GetLimitationBenefits());
    dispatch(GetHelpVideoDetails());
    LoadData();
  }, []);

  const viewPdf = () => {
    history("/w8BenE_pdf", { replace: true });
  }

  const AgentData = JSON.parse(localStorage.getItem("agentDetails") || "{}");
  const GetAgentCountriesImportantForEformData = useSelector(
    (state: any) =>
      state.GetAgentCountriesImportantForEformReducer
        .GetAgentCountriesImportantForEformData
  );

  console.log(GetAgentCountriesImportantForEformData, 'countries data')
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const GetLimitationBenefitsData = useSelector(
    (state: any) => state.GetLimitationBenefitsReducer.GetLimitationBenefitsData
  );



  return (
    <section
      className="inner_content"
      style={{
        backgroundColor: "#0c3d69",
        marginBottom: "10px",
        height: "100%",
      }}
    >
      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions">View Instructions</div>
          <div className="viewform" onClick={() => {
            dispatch(GetBenEPdf(authDetails?.accountHolderId, (callbackData:any)=>{
              setPopupState({
                  status:true,
                  data: callbackData?.pdf
              })
          }))
          }}>View Form</div>
          <div className="helpvideo">
            {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
            {GethelpData && GethelpData[8].id === 10 ? (
              <a
                href={GethelpData[8].fieldValue}
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor behavior
                  window.open(
                    GethelpData[8].fieldValue,
                    "popupWindow",
                    `width=${GethelpData[8].width},height=${GethelpData[8].height},top=${GethelpData[8].top},left=${GethelpData[8].left}`
                  )
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

      <div className="row w-100 ">
        <div className="col-4">
          <div
            style={{
              padding: "20px 0px",
              height: "100%",
              // backgroundColor: "#0c3d69",
            }}
          >
            <BreadCrumbComponent breadCrumbCode={1253} formName={3} />
          </div>
        </div>
        <div className="col-8 mt-3" >
          <div style={{ padding: "13px ", }}>
            <Paper style={{ padding: "10px" }}>
              <Formik
                validateOnChange={true}
                validateOnBlur={true}
                validateOnMount={true}

                initialValues={initialValues}
                enableReinitialize


                validationSchema={claimSchemaW8BenE}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log(values, "valuessss")
                  const temp = {
                    ...PrevStepData,
                    ...values,
                    agentId: authDetails?.agentId,
                    accountHolderBasicDetailId: authDetails?.accountHolderId,
                    isClaimTreaty: values.isClaimTreaty === "yes" ? true : false,
                    isSubmissionClaimTreaty: values.isSubmissionClaimTreaty === "yes" ? true : false,
                    stepName: null
                  };
                  const returnPromise = new Promise((resolve, reject) => {
                    dispatch(postW8BEN_EForm(
                      temp,
                      (data: any) => {
                        localStorage.setItem("PrevStepData", JSON.stringify(temp));
                        resolve(data);
                      },
                      (err: any) => {
                        reject(err);
                      }
                    ))
                  });
                  // dispatch(
                  //   W8_state(values, () => {
                  //     history(
                  //       "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE"
                  //     );
                  //   })
                  // );
                  // history(
                  //   "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE"
                  // );
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
                  setFieldValue,
                  isValid,
                  validateForm,
                  validateField,
                  submitForm
                }) => (
                  <Form onSubmit={handleSubmit}>

{values.ownerResidentId &&
values.ownerResidentId !== "---" && values.isSubmissionClaimTreaty === "yes" ?(


  <>
    <div
      style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
    >
      <Typography>
        Treaty107
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
          The country selected does not match the resident
          country selected earlier in the process. Your agent
          may contact you for further information.
        </span>
      </Typography>
      
    </div>

                      <>
                      
                      {values.ownerResidentId !== AgentData.permanentResidentialCountryId  ? (
                                            <div
                                              style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                                            >
                                             
                                              <Typography>
                                                Treaty120
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
                                                  The treaty country chosen does not match the country
                                                  selected earlier as the primary residence address
                                                  country. Please review the selections for accuracy.
                                                  Generally the primary residence address country will
                                                  be the same country applicable for treaty claim
                                                  purposes. The withholding agent may need to request
                                                  further information depending on answers given
                                                  elsewhere and attachments supplied.
                                                </span>
                                              </Typography>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                      
                      </>
  
  </>
                    ):""}


                    {values.isSubmissionClaimTreaty ==="no" ? (
                      <div
                        style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                      >
                        <Typography>
                          Treaty119
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
                            You have made a selection that indicates you do not
                            wish to claim treaty benefits that may be available.
                            If this is correct please continue to the next
                            stage. Your agent may contact you for further
                            information.
                          </span>
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )}

                    {/* {values.isSubmissionClaimTreaty && clickCount === 1 ? (<div  style={{backgroundColor: "#e8e1e1" , padding:"10px"}}>
                  <Typography>
                  Treaty107
                  <span className="mx-1">
                  <img src={Infoicon} style={{color: "#ffc107",height:"22px",
                  width:"20px",
                  boxShadow:"inherit",
                 

                         
                          cursor: "pointer",
                          marginBottom:"3px"
                         
                        }}/>
                    
              The country selected does not match the resident country selected earlier in the process. Your agent may contact you for further information.

 
                  </span>
   
                  
                  </Typography>
                  <Typography>
                  Treaty120
                  <span className="mx-1">
                  <img src={Infoicon} style={{color: "#ffc107",height:"22px",
                  width:"20px",
                  boxShadow:"inherit",
                 

                         
                          cursor: "pointer",
                          marginBottom:"3px"
                         
                        }}/>
                    
The treaty country chosen does not match the country selected earlier as the primary residence address country. Please review the selections for accuracy. Generally the primary residence address country will be the same country applicable for treaty claim purposes. The withholding agent may need to request further information depending on answers given elsewhere and attachments supplied.
 
                  </span>
   
                  
                  </Typography>
                
                
                 
                </div>):""}
                {!values.isSubmissionClaimTreaty && clickCount === 1 ? (
                
                <div  style={{backgroundColor: "#e8e1e1" , padding:"10px"}}>
                  <Typography>
                  Treaty119
                  <span className="mx-1">
                  <img src={Infoicon} style={{color: "#ffc107",height:"22px",
                  width:"20px",
                  boxShadow:"inherit",
                 

                         
                          cursor: "pointer",
                          marginBottom:"3px"
                         
                        }}/>
                    
 You have made a selection that indicates you do not wish to claim treaty benefits that may be available. If this is correct please continue to the next stage. Your agent may contact you for further information.
 
                  </span>
   
                  
                  </Typography>
                
                
                 
                </div>):""} */}
                    <>{console.log(errors, values, "valeeeeeeeeeee")}</>
                    <div>
                      <div style={{ margin: "10px" }}>
                        <Typography
                          align="left"
                          style={{
                            marginTop: "10px",
                            fontSize: "27px",
                            fontWeight: "550",
                          }}
                        >
                          Treaty Claim Statement
                          <span>
                            <Tooltip
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                              title={
                                <>
                                  <Typography color="inherit">
                                    Treaty claim information
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
                                  fontSize: "19px",
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
                                An entity that is claiming a reduced rate of, or
                                exemption from, withholding under an income tax
                                treaty must state they wish to make a treaty
                                claim.
                              </Typography>

                              <Typography style={{ marginTop: "10px" }}>
                                IRS Form Guidance
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                An entity that is claiming a reduced rate of, or
                                exemption from, withholding under an income tax
                                treaty must check the box to certify that it:
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                Derives the item of income for which the treaty
                                benefit is claimed, and meets the limitation on
                                benefits provisions contained in the treaty, if
                                any.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                An item of income may be derived by either the
                                entity receiving the item of income or by the
                                interest holders in the entity or, in certain
                                circumstances, both. An item of income paid to
                                an entity is considered to be derived by the
                                entity only if the entity is not fiscally
                                transparent under the laws of the entity’s
                                jurisdiction with respect to the item of income.
                                An item of income paid to an entity shall be
                                considered to be derived by the interest holder
                                in the entity only if:
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                - The interest holder is not fiscally
                                transparent in its jurisdiction with respect to
                                the item of income, and
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                - The entity is considered to be fiscally
                                transparent under the laws of the interest
                                holder’s jurisdiction with respect to the item
                                of income.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                An item of income paid directly to a type of
                                entity specifically identified in a treaty as a
                                resident of a treaty jurisdiction is treated as
                                derived by a resident of that treaty
                                jurisdiction. To determine whether an entity
                                meets the limitation on benefits provisions of a
                                treaty, you must consult the specific provisions
                                or articles under the treaty.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                Ref: EH156
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
                        <Typography
                          align="left"
                          style={{ fontSize: "22px", marginTop: "10px" }}
                        >
                          Is this submission being made to claim treaty
                          benefits?
                        </Typography>

                        <div
                          style={{
                            marginTop: "10px",
                            justifyContent: "center",
                          }}
                        >
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            value={values.isClaimTreaty}
                            onChange={(e) => {
                              console.log("form change", e)
                              handleChange(e); setTimeout(() => {
                                validateForm();
                              }, 100);
                            }}
                            name="isClaimTreaty"
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                            // name="isClaimTreaty"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                            // name="isClaimTreaty"
                            />
                          </RadioGroup>
                          {errors.isClaimTreaty &&
                            touched.isClaimTreaty ? (
                            <div>
                              <Typography color="error">
                                {errors.isClaimTreaty}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        {values.isClaimTreaty == "yes" ? (
                          <>
                            <Typography
                              align="left"
                              style={{ fontSize: "18px", marginTop: "20px" }}
                            >
                              I certify the beneficial owner is a resident of:{" "}
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
                                        Treaty Claim Q2
                                      </Typography>
                                      <a onClick={() => setToolInfo("claim")}>
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
                                      fontSize: "19px",
                                      cursor: "pointer",
                                      verticalAlign: "super",
                                    }}
                                  />
                                </Tooltip>
                              </span>
                            </Typography>

                            {toolInfo === "claim" ? (
                              <div>
                                <Paper
                                  style={{
                                    backgroundColor: "#dedcb1",
                                    padding: "15px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <Typography>
                                    Select the country where you claim the
                                    Treaty
                                  </Typography>

                                  <Typography
                                    style={{
                                      marginTop: "10px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    IRS Form Guidance:
                                  </Typography>
                                  <Typography style={{ marginTop: "10px" }}>
                                    Select the country where you claim the
                                    individual, business or organization is a
                                    resident for income tax treaty purposes.
                                  </Typography>
                                  <Typography style={{ marginTop: "10px" }}>
                                    Ref: EH032
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
                            <div className="row px-2">
                              <div
                                className="col-12"
                                style={{ padding: "0px" }}
                              >
                                <FormControl className="w-100">
                                  <div className="row">
                                    <div className="col-md-6 col-12 d-flex">
                                      <select
                                        style={{
                                          padding: " 0 10px",
                                          color: "#7e7e7e",
                                          fontStyle: "italic",
                                          height: "36px",
                                        }}
                                        name="ownerResidentId"
                                        id="Income"
                                        onChange={(e) => {
                                          handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        value={
                                          values.ownerResidentId
                                        }
                                      >
                                        <option value={0}>---select---</option>
                                        <option value={45}>Canada</option>
                                        <option value={257}>
                                          United Kingdom
                                        </option>
                                        <option value={258}>
                                          United States
                                        </option>
                                        <option value="">-----</option>
                                        {getCountriesData?.map(
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
                                    </div>
                                  </div>
                                  <p className="error">
                                    {touched.ownerResidentId && errors.ownerResidentId ? (<p>{errors.ownerResidentId}</p>) : ""}
                                  </p>
                                </FormControl>
                              </div>
                            </div>

                            {values.ownerResidentId && values.ownerResidentId !== "" && values.ownerResidentId !== "0" ?
                              <><div className="col-12" style={{ padding: "0px" }}>
                                <Typography style={{ fontWeight: "bold" }}>
                                  Please select type of limitations of benefits
                                  provisions that may be include in an applicable
                                  tax treaty (see instructions):
                                  <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <FormControl className="w-100">
                                  <div className="row">
                                    <div className="col-md-6 col-12 d-flex">
                                      <select
                                        style={{
                                          padding: " 0 10px",
                                          color: "#121112",
                                          fontStyle: "italic",
                                          height: "36px",
                                        }}
                                        name="limitationBenefitsId"
                                        id="Income"
                                        onChange={(e) => {
                                          handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        value={values.limitationBenefitsId}
                                      >
                                        <option value={0}>---select---</option>
                                        {GetLimitationBenefitsData?.map(
                                          (ele: any) => (
                                            <option key={ele?.id} value={ele?.id}>
                                              {ele?.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                  <p className="error">
                                    {touched.limitationBenefitsId && errors.limitationBenefitsId ? (<p>{errors.limitationBenefitsId}</p>) : ""}
                                  </p>

                                </FormControl>
                              </div>
                                <div>
                                  <Typography style={{ fontWeight: "bold" }}>
                                    Are you claiming treaty benefits on:
                                  </Typography>

                                  <Typography
                                    align="left"
                                    style={{ fontSize: "18px", marginTop: "10px" }}
                                  >
                                    U.S. source dividends paid to you by another
                                    foreign corporation?{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>

                                  <div
                                    style={{
                                      marginTop: "10px",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <RadioGroup
                                      row
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      value={values.isSubmissionClaimTreaty}
                                      name="isSubmissionClaimTreaty"
                                      onChange={handleChange}
                                    >
                                      <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                        name="isSubmissionClaimTreaty"
                                      />
                                      <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                        name="isSubmissionClaimTreaty"
                                      />
                                    </RadioGroup>
                                  </div>
                                  <p className="error">
                                    {touched.isSubmissionClaimTreaty ? errors.isSubmissionClaimTreaty : ""}
                                  </p>
                                </div>
                              </>
                              : <></>}

                          </>
                        ) : null}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "80px",
                      }}
                    >
                      {/* <Button variant="contained" style={{ color: "white" }}
                      onClick={()=>{
                        submitForm().then((data)=>{ 
                          const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                                const urlValue = window.location.pathname.substring(1);
                                dispatch(postW8BEN_EForm(
                                {
                                  ...prevStepData,
                                  stepName:`/${urlValue}`
                                }
                                ,()=>{
                                  history(
                                    GlobalValues.basePageRoute
                                   );
                                }))                               
                         
                        }).catch((err)=>{
                          console.log(err);
                        })
                      }}
                      >
                        SAVE & EXIT
                      </Button> */}

                      <SaveAndExit Callback={() => {
                        submitForm().then((data) => {
                          const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                          const urlValue = window.location.pathname.substring(1);
                          dispatch(postW8BEN_EForm(
                            {
                              ...prevStepData,
                              stepName: `/${urlValue}`
                            }
                            , () => {
                              history(
                                GlobalValues.basePageRoute
                              );
                            }))

                        }).catch((err) => {
                          console.log(err);
                        })
                      }} formTypeId={FormTypeId.BENE} />

                      <Button
                        style={{ color: "white", marginLeft: "15px" }}
                        variant="contained"
                        onClick={() => {
                          dispatch(GetBenEPdf(authDetails?.accountHolderId, (callbackData:any)=>{
                            setPopupState({
                                status:true,
                                data: callbackData?.pdf
                            })
                        }))
                        }}
                      >
                        VIEW FORM
                      </Button>
                      <Button
                        disabled={!isValid}
                        onClick={async () => {
                          validateForm().then(() => {
                            submitForm().then((data) => {
                              if (values?.isClaimTreaty == "no") {
                                Redirect('/Attach_document_BENE', authDetails?.agentId, history)
                              } else {
                                Redirect(
                                  "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE", authDetails?.agentId, history
                                );
                              }

                            }).catch((err) => {
                              console.log(err);
                            })
                          })

                          // history(
                          //   "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE"
                          // );
                        }}
                        //type="submit"
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
                          Redirect(
                            "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/US_Tin_BenE", authDetails?.agentId, history, true
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
      <PopupModal data={popupState} setPopupState={setPopupState} />
    </section>
  );
}
