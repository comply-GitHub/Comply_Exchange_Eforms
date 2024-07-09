import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Tooltip,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import Infoicon from "../../../assets/img/info.png";
import InfoIcon from "@mui/icons-material/Info";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { fctaSchema } from "../../../schemas";
import {
  W9_state, GetAgentFATCAEntityGIINChallengeDisabledForEformAction, postW9Form,
  GetHelpVideoDetails,
  getW9Form
} from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import View_Insructions from "../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import { GetW9Pdf } from "../../../Redux/Actions/PfdActions";
import Redirect from "../../../Router/RouterSkip";

import PopupModa from "../../../Redux/Actions/poupModal";
export default function FCTA_Reporting(props: any) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { authDetails } = useAuth();
  const history = useNavigate()
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }
  const [clickCount, setClickCount] = useState(0);
  const [report, setReport] = useState<string>("");
  const [popupState, setPopupState] = useState({
    data:"",
    status:false
})
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleReportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReport((event.target as HTMLInputElement).value);
  };
  var getReducerData = useSelector(
    (state: any) => state?.GetByW9FormReducer?.GetByW9FormData
  );
  const GetAgentFATCAEntityGIINChallengeDisabledForEformReducer = useSelector(
    (state: any) => state.GetAgentFATCAEntityGIINChallengeDisabledForEformReducer
  );
  const urlValue = location.pathname.substring(1);
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const AccountHolder = JSON.parse(localStorage.getItem("formSelection") || "{}");
  const BusinessId= JSON.parse(localStorage.getItem("accountHolderDetails") || "{}");
  const initialValue = {
    isExemptionFATCAReportings: getReducerData?.isExemptionFATCAReportings ?? "No",
    fatcaReportingId: getReducerData?.fatcaReportingId ?? 0
  };
  useEffect(() => {
    document.title = "Exemptions Fatca"
  }, [])
  useEffect(() => {
    console.log(getReducerData, "getReducerData")
    dispatch(GetAgentFATCAEntityGIINChallengeDisabledForEformAction());
    dispatch(GetHelpVideoDetails());
    dispatch(
      getW9Form(authDetails?.accountHolderId, (data: any) => {
      })
    );
  }, [authDetails]);

  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );

  const viewPdf = () => {
    history("w9_pdf");
  }
  return (

    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px", height: "100%" }}
    >  <View_Insructions canvaBx={canvaBx} handleCanvaClose={handleCanvaClose} />
      {canvaBx === true ? (<div className="offcanvas-backdrop fade show" onClick={() => { handleCanvaClose() }}></div>) : null}

      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions" onClick={() => { handleCanvaOpen(); }}>View Instructions</div>
          <div className="viewform"  onClick={() => {
                          dispatch(GetW9Pdf(authDetails?.accountHolderId, (callbackData:any)=>{
                              setPopupState({
                                  status:true,
                                  data: callbackData?.pdf
                              })
                          }))
                      }}>View Form</div>
          <div className="helpvideo">
            {GethelpData && GethelpData[8].id === 10 ? (
              <a
                href={GethelpData[8].fieldValue}
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor behavior
                  window.open(
                    GethelpData[8].fieldValue,
                    'popupWindow',
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
      <Formik
        validateOnChange={true}
        validateOnBlur={true}
        initialValues={initialValue}
        enableReinitialize
        validationSchema={fctaSchema} 
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const new_obj = { ...PrevStepData, stepName: `/${urlValue}`
          ,AccountHolderBasicDetailsId: AccountHolder.accountHolderId,AgentId:AccountHolder.agentId,FormTypeSelectionId:BusinessId.businessTypeId,
        }
          let result = { ...new_obj, ...values };
          
          console.log(result, "values ex", PrevStepData)

          const submitPromise = new Promise((resolve, reject) => {
            if (clickCount === 0) {
              setClickCount(clickCount + 1);
              setSubmitting(false);
              reject();
            } else {
              dispatch(
                postW9Form(result, () => {
                  localStorage.setItem("PrevStepData", JSON.stringify(result));
                 
                  resolve("success");
                  setSubmitting(true);
                  Redirect(
                    "/US_Purposes/Back/Exemption/Tax",
                    authDetails?.agentId,
                    history,
                    false
                  );
                  // history("/US_Purposes/Back/Exemption/Tax")
                },
                  (error: any) => {
                    reject(error);
                    setSubmitting(false);
                  }
                )
              );
            }

          })
          return submitPromise;

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
          submitForm
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row w-100">
              <div className="col-4">
                <div style={{ padding: "20px 0px", height: "100%" }}>
                  <BreadCrumbComponent breadCrumbCode={1239} formName={1} />

                </div>
              </div>
              <div className="col-8 mt-3" >
                <div style={{ padding: "10px 0px" }}>
                  <Paper elevation={6} style={{ padding: "17px", }}>
                    <div style={{ backgroundColor: "#ffff" }}>
                      {values.isExemptionFATCAReportings == false && clickCount === 1 ? (<div style={{ backgroundColor: "#e8e1e1", padding: "10px" }}>
                        <Typography>
                          FATCA100
                          <span className="mx-1">
                            <img src={Infoicon} style={{
                              color: "#ffc107", height: "22px",
                              width: "20px",
                              boxShadow: "inherit",



                              cursor: "pointer",
                              marginBottom: "3px"

                            }} />



                          </span>
                          You have not made a selection to state that you are exempt from FATCA reporting.<div>&nbsp;</div><div>You do not need to make a selection if you are only making this submission for an account held in the United States. The exemption codes available only apply to certain types of U.S. persons submitting this form for accounts maintained outside of the United States by foreign (non U.S.) Financial Organizations.</div>

                        </Typography>


                      </div>) : ""}

                      <Typography
                        align="left"
                        style={{ margin: "10px", fontSize: "27px" }}
                      >
                        Exemption from FATCA reporting<span style={{ color: "red" }}>*</span>
                      <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  TT-450 What is FATCA reporting?
                                </Typography>
                                <a >
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
                            <InfoIcon
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
                      <Typography
                        align="left"
                        style={{ margin: "10px", fontSize: "17px", marginTop: "10px" }}
                      >
                        Will payments be made into an account held outside of the United
                        States by a foreign institution?
                      </Typography>

                      <div style={{ marginLeft: "10px", marginTop: "20px", justifyContent: "center" }}>
                        <RadioGroup
                          id="isExemptionFATCAReportings"
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          row
                          value={values.isExemptionFATCAReportings}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            control={<Radio />}
                            value="Yes"
                            name="isExemptionFATCAReportings"
                            label="Yes"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="No"
                            name="isExemptionFATCAReportings"
                            label="No"
                          />

                        </RadioGroup>
                      </div>
                      {errors.isExemptionFATCAReportings && touched.isExemptionFATCAReportings ? (
                        <div>
                          <Typography color="error">
                            {typeof errors.isExemptionFATCAReportings === "string" ? errors.isExemptionFATCAReportings : ""}
                          </Typography>
                        </div>
                      ) : (
                        ""
                      )}
                      {values?.isExemptionFATCAReportings === "Yes" ? (
                        <>
                          <Typography
                            align="left"
                            style={{ fontSize: "17px", marginTop: "10px" }}
                          >
                            Please select from the list provided to apply for exemption
                            from FATCA Reporting or select confirm if no exemption
                            applies
                            <span>
                              <Tooltip
                                style={{ backgroundColor: "black", color: "white" }}
                                title={
                                  <>
                                    <Typography color="inherit">
                                      TT-085 FATCA Exemption Classification
                                    </Typography>
                                    <a >
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
                                <InfoIcon
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
                          <FormControl className="w-100 mt-2">
                            <select
                              className="col-md-6 col-12"
                              style={{
                                padding: " 0 10px",
                                color: "#121112",
                                fontStyle: "italic",
                                height: "36px",
                              }}
                              name="fatcaReportingId"
                              value={values?.fatcaReportingId}
                              id="Income"
                              // defaultValue={data.interestDividendPaymentId}
                              onChange={handleChange}
                            >
                              <option value={0}>---select---</option>
                              {GetAgentFATCAEntityGIINChallengeDisabledForEformReducer.GetAgentFATCAEntityGIINChallengeDisabledForEformData?.map(
                                (ele: any) => (
                                  <option key={ele?.fatcaEntityTypeId} value={ele?.fatcaEntityTypeId}>
                                    {ele?.name}
                                  </option>
                                )
                              )}
                            </select>
                          </FormControl>
                          {errors.fatcaReportingId && touched.fatcaReportingId ? (<p className="error">{typeof errors.fatcaReportingId === "string" ? errors.fatcaReportingId : ""}</p>) : ""}
                          {/* <p className="error">{typeof errors.fatcaReportingId==="string" ? errors.fatcaReportingId : ""}</p> */}

                        </>
                      ) : ""}
                    </div>
                  </Paper>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
             
              <SaveAndExit Callback={() => {
                submitForm().then((data) => {
                  const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                  const urlValue = window.location.pathname.substring(1);
                  dispatch(postW9Form(
                    {
                      ...prevStepData,
                      AccountHolderBasicDetailsId: AccountHolder.accountHolderId,AgentId:AccountHolder.agentId,FormTypeSelectionId:BusinessId.businessTypeId,
                      stepName: `/${urlValue}`
                    }
                    , () => { }))
                  history(GlobalValues.basePageRoute)
                }).catch((err) => {
                  console.log(err);
                })
              }} formTypeId={FormTypeId.W9} />
               <Button
                  variant="contained"
                  style={{ color: "white", marginLeft: "10px" }}
                  onClick={() => {
                    dispatch(GetW9Pdf(authDetails?.accountHolderId, (callbackData:any)=>{
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
                onClick={() => {
                  submitForm().then((data) => {
                    // history("/US_Purposes/Back/Exemption/Tax")
                  }).catch((error) => {
                    console.log(error);
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
                color: "#f5f5f5",
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
                    "/US_Purposes/Back",
                    authDetails?.agentId,
                    history,
                    true
                  ); 
                  // history("/US_Purposes/Back")
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
      <PopupModa data={popupState} setPopupState={setPopupState} />
    </section>

  )
}