import React, { useState,useEffect } from "react";
import {
  FormControl,
  Typography,
  Button,
  Tooltip,
  Link,
  Input,
  Divider,
  Paper,
  Checkbox,
} from "@mui/material";
import { Form, Formik } from "formik";
import { W8_state_ECI,GetHelpVideoDetails, postW81MY_EForm } from "../../../Redux/Actions";
import { certificateSchema } from "../../../schemas/w8Exp";
import checksolid from "../../../../../assets/img/check-solid.png";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import { useDispatch,useSelector } from "react-redux";
import { certificateSchema8IMY } from "../../../schemas/w81my";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import useAuth from "../../../customHooks/useAuth";
export default function Certifications(props: any) {
  const { authDetails } = useAuth();
  const history = useNavigate();
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);                               
  const [toolInfo, setToolInfo] = useState("");
  const [expanded, setExpanded] = React.useState<string | false>("");
  const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") ?? "null");

  const initialValue = {
    cerExaminedtheInfo: prevStepData?.CerExaminedtheInfo ? prevStepData?.CerExaminedtheInfo : false,
    cerDistributeorMakepayment: prevStepData?.CerDistributeorMakepayment ? prevStepData?.CerDistributeorMakepayment : false,
    cerSubitformwithin30Days: prevStepData?.CerSubitformwithin30Days ? prevStepData?.CerSubitformwithin30Days : false,
    cerConfirmReceivedElecForm: prevStepData?.CerConfirmReceivedElecForm ? prevStepData?.CerConfirmReceivedElecForm : false,
   
  };
  useEffect(()=>{
    document.title = "Certification I"
  },[])


  useEffect(() => {
    
    dispatch(GetHelpVideoDetails());
  
  }, []);
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const dispatch = useDispatch();
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
       <div className="overlay-div">
            <div className="overlay-div-group">
                <div className="viewInstructions">View Instructions</div>
                <div className="viewform">View Form</div>
                <div className="helpvideo"> 
                {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
                {GethelpData && GethelpData[7].id === 9 ? (
  <a
    href={GethelpData[7].fieldValue}
    target="popup"
    onClick={() =>
      window.open(
        GethelpData[7].fieldValue,
        'name',
        `width=${GethelpData[7].width},height=${GethelpData[7].height},top=${GethelpData[7].top},left=${GethelpData[7].left}`
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
        <div className="row w-100 ">
        <div className="col-4">
          <div style={{ padding: "20px 0px",height:"100%" }}>
            <BreadCrumbComponent breadCrumbCode={1500} formName={FormTypeId.FW81MY}/>
      </div>
      </div>
      <div className="col-8 mt-3">
  
    <div style={{ padding: "13px" }}>
      <Formik
       validateOnChange={true}
       validateOnBlur={true}
       validateOnMount={false}
            initialValues={initialValue}
            enableReinitialize
            validationSchema={certificateSchema8IMY}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              const temp = {
                agentId: authDetails.agentId,
                accountHolderBasicDetailId: authDetails.accountHolderId,
                ...prevStepData,
                ...values,
                stepName: null
              };
              const returnPromise = new Promise((resolve, reject) => {
                dispatch(
                  postW81MY_EForm(temp,
                    (responseData: any) => {
                      localStorage.setItem("PrevStepData", JSON.stringify(temp));
                      resolve(responseData);
                      history("/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY/Participation_IMY");
                    },
                    (err: any) => {
                      reject(err);
                    }
                  )
                );
              })
              return returnPromise
            //   dispatch(
            //     W8_state_ECI(values, () => {
            //      history("/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY/Participation_IMY");
            //     })
            //   );
            //  history("/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY/Participation_IMY");
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
              submitForm
            }) => (
              <Form onSubmit={handleSubmit}>
        <Paper style={{ padding: "14px" }}>
          <Typography
            align="left"
            style={{
              margin: "5px",
              fontSize: "27px",
              fontWeight: "550",
              marginLeft: "13px",
            }}
          >
            Certification <span style={{ color: "red" }}>*</span>
            <span>
              <Tooltip
                style={{ backgroundColor: "black", color: "white" }}
                title={
                  <>
                    <Typography color="inherit">
                      Legal certification details
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
                <InfoIcon
                  style={{
                    color: "#ffc107",
                    fontSize: "15px",
                    cursor: "pointer",
                    verticalAlign: "super",
                  }}
                />
              </Tooltip>
            </span>{" "}
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
                  You have selected to submit a form W-8BEN to claim that the
                  person, business or organization represented by the form is a
                  beneficial owner solely claiming foreign status or treaty
                  benefits. If this is not correct you must go back and change
                  your selection.
                </Typography>

                <Typography style={{ marginTop: "10px" }}>
                  Please check the information and change where appropriate. On
                  completion this information will be transferred to an image
                  (pdf) of the standard official form.
                </Typography>
                <Typography style={{ marginTop: "10px" }}>
                  Enter your U.S. or non-U.S. (i.e. Foreign) taxpayer
                  identification number along with the U.S. TIN Type and foreign
                  country correlating to such Foreign TIN. An individual's U.S.
                  TIN type is generally a Social Security Number (SSN) or an
                  Individual Tax Identification Number (ITIN). An entity's U.S.
                  TIN may be an employer identification number (EIN), including
                  a withholding foreign partnership/trust EIN (WP/T-EIN) or a
                  qualified intermediary EIN (QI-EIN). A U.S. TIN must be
                  furnished on U.S. tax returns when filed or when claiming
                  treaty benefits. A U.S. TIN must be on a withholding
                  certificate (i.e. W-8) if the beneficial owner is receiving
                  effectively connected income (ECI), claiming tax treaty
                  benefits (other than for income from marketable, actively
                  traded, securities), claiming an exemption for ECI or claiming
                  an exemption for certain annuities. If you are required to
                  have a U.S. TIN but do not you may apply for an EIN on Form
                  SS-4, Application for Employer Identification Number, a SSN on
                  Form SS-5, Application for a Social Security Card or an ITIN
                  on Form W-7, IRS Application for Individual Taxpayer
                  Identification Number.
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
            </div>
          ) : (
            ""
          )}

        
          <Typography
            style={{
              marginLeft: "13px",
             fontSize: "16px",
              color: "grey",
              
            }}
          >
            Under penalties of perjury, I declare that 
          </Typography>

          <Paper
            style={{
              marginLeft: "10px",
              width: "97%",
              backgroundColor: "#d2d6d3",
            }}
          >
            <div style={{ margin: "10px" }}>
              <Divider
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: "black",
                }}
              />
              <Typography style={{ display: "flex" }}>
                <Checkbox  name="cerExaminedtheInfo"
                        value={values.cerExaminedtheInfo}
                        onChange={handleChange}
                        size="medium"
                        style={{ fontSize: "2rem" }} className="mx-2" />
                <Typography
                  style={{
                   fontSize: "14px",
                    color: "black",
                    marginTop: "10px",
                    textAlign:"justify" 
                  }}
                >
                 I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete.
                </Typography>
              </Typography>
              {errors?.cerExaminedtheInfo && typeof errors?.cerExaminedtheInfo === 'string' && (
                                <p className="error">{errors?.cerExaminedtheInfo}</p>
                              )}
              {/* <p className="error">{errors.cerExaminedtheInfo}</p> */}
              <Divider
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: "black",
                }}
              />
              <Typography style={{ display: "flex" }}>
                <Checkbox  name="cerDistributeorMakepayment"
                        value={values.cerDistributeorMakepayment}
                        onChange={handleChange}
                        size="medium"
                        style={{ fontSize: "2rem" }} className="mx-2" />
                <Typography
                  style={{fontSize: "14px", color: "black", marginTop: "7px" ,textAlign:"justify" }}
                >
                 Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the income or proceeds for 
which I am providing this form or any withholding agent that can disburse or make payments of the amounts for which I am providing this form
                </Typography>
              </Typography>
              {errors?.cerDistributeorMakepayment && typeof errors?.cerDistributeorMakepayment === 'string' && (
                                <p className="error">{errors?.cerDistributeorMakepayment}</p>
                              )}
              {/* <p className="error">{errors.cerDistributeorMakepayment}</p> */}
              <Divider
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: "black",
                }}
              />
              
              <Typography style={{ display: "flex" }}>
                <Checkbox name="cerSubitformwithin30Days"
                        value={values.cerSubitformwithin30Days}
                        onChange={handleChange}
                        size="medium"
                        style={{ fontSize: "2rem" }} className="mx-2" />
                <Typography
                  style={{fontSize: "14px", color: "black", marginTop: "7px" ,fontWeight:"bold",textAlign:"justify" }}
                >
                 I agree that I will submit a new form within 30 days if any certification on this form becomes incorrect.
                </Typography>
              </Typography>
              {errors?.cerSubitformwithin30Days && typeof errors?.cerSubitformwithin30Days === 'string' && (
                                <p className="error">{errors?.cerSubitformwithin30Days}</p>
                              )}
              {/* <p className="error">{errors.cerSubitformwithin30Days}</p> */}
              <Divider
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: "black",
                }}
              />
          
             
              

              
              <Typography style={{ display: "flex" }}>
                <Checkbox name="cerConfirmReceivedElecForm"
                        value={values.cerConfirmReceivedElecForm}
                        onChange={handleChange}
                        size="medium"
                        style={{ fontSize: "2rem" }}className="mx-2" />
                <Typography
                  style={{fontSize: "14px", color: "black", marginTop: "7px",textAlign:"justify"  }}
                >
                  Check to confirm you have reviewed the Electronic Form
                  <span
                    style={{
                      color: "blue",
                      fontSize: "15px",
                      marginLeft: "5px",
                    }}
                  >
                    (view Electronic Form)
                  </span>
                </Typography>
              </Typography>
              {errors?.cerConfirmReceivedElecForm && typeof errors?.cerConfirmReceivedElecForm === 'string' && (
                                <p className="error">{errors?.cerConfirmReceivedElecForm}</p>
                              )}
              {/* <p className="error">{errors.cerConfirmReceivedElecForm}</p> */}
              <Divider
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: "black",
                }}
              />
            </div>
          </Paper>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <SaveAndExit Callback={() => {
                        submitForm().then(() => {
                          const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                          const urlValue = window.location.pathname.substring(1);
                          const temp = {
                            agentId: authDetails.agentId,
                            accountHolderBasicDetailId: authDetails.accountHolderId,
                            ...prevStepData,
                            ...values,
                            stepName: `/${urlValue}`
                          };
                          dispatch(postW81MY_EForm(
                            temp
                            , () => { }))
                          history(
                            GlobalValues.basePageRoute
                          );
                        })
                      }} formTypeId={FormTypeId.F8233} ></SaveAndExit>
            <Button
              variant="contained"
              style={{ color: "white", marginLeft: "15px" }}
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
            onClick={()=>{
              history("/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY")
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
        </Form>
            )}
          </Formik>
      </div>
   
      </div>
      </div>
    </section>
  );
}
