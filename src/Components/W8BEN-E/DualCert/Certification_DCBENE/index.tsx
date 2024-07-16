import React, { useState, useEffect } from "react";
import {
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
} from "@mui/material";
import PopupModa from "../../../../Redux/Actions/poupModal";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { PostDualCert, GetHelpVideoDetails } from "../../../../Redux/Actions";
import { certificateSchema_w9_DC } from "../../../../schemas/w8Exp";
import InfoIcon from "@mui/icons-material/Info";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import View_Insructions from "../../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import useAuth from "../../../../customHooks/useAuth";
import { GetBENEDCPdf } from "../../../../Redux/Actions/PfdActions";

export default function Certifications(props: any) {
  const location = useLocation();
  const PrevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");
  console.log(PrevStepData, "prevv")
  const urlValue = location.pathname.substring(1);
  const initialValue = {

    confirmThisisaTrueAndAccurate: false,
    confirmYouhaveRewiedElectronicForm: false,

  };
  const { authDetails } = useAuth();
  const dispatch = useDispatch();
  const [popupState, setPopupState] = useState({
    data:"",
    status:false
});
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }
  useEffect(() => {
    document.title = "Certification I"
  }, [])
  useEffect(() => {
    dispatch(GetHelpVideoDetails());
  }, [])
  const history = useNavigate()
  // const handleCheckbox2Change = () => {
  //   setCheckbox2(!checkbox2);
  //   setCheckbox5(false);
  //   setIsSaveButtonEnabled(!isSaveButtonEnabled);
  // }

  // const handleCheckbox5Change = () => {
  //   setCheckbox5(!checkbox5);
  //   setCheckbox2(false);
  //   setIsSaveButtonEnabled(!isSaveButtonEnabled);
  // }
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
          <div className="viewform"  onClick={() => {
              dispatch(GetBENEDCPdf(authDetails?.accountHolderId, (callbackData:any)=>{
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
      <div className="row w-100 " style={{ backgroundColor: "#0c3d69" }}>
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
                validateOnBlur={true}
                initialValues={initialValue}
                enableReinitialize
                validationSchema={certificateSchema_w9_DC}
                onSubmit={(values, { setSubmitting }) => {
                  const submitPromise = new Promise((resolve, reject) => {
                    setSubmitting(true);

                    const result = [{ ...PrevStepData[0], ...values, stepName: `/${urlValue}`, AccountHolderDetailsId:authDetails.accountHolderId,
                    agentId: authDetails?.agentId,
                    formTypeId: FormTypeId.BENE, }];
                    dispatch(
                      PostDualCert(result, () => {
                        localStorage.setItem("DualCertData", JSON.stringify(result))
                        history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE/Participation_BenE/Submit_DC");

                        resolve("");
                      },
                        (err: any) => {
                          reject(err);
                          setSubmitting(false);
                        })
                    );
                  });

                }}
              >
                {({
                  errors,
                  touched,
                  handleBlur,
                  values,
                  initialValues,
                  handleSubmit,
                  handleChange,
                  setFieldValue,
                  isValid,
                  submitForm
                }) => (

                  <Form onSubmit={handleSubmit}>
                    <Paper style={{ padding: "14px" }}>

                      <Typography
                        align="left"
                        style={{
                          margin: "10px",
                          fontSize: "27px",
                          fontWeight: "550",
                          marginLeft: "10px",
                        }}
                      >
                        Certification

                      </Typography>
                      <Typography align="left"
                        style={{
                          margin: "10px",
                          fontSize: "15px",

                          marginLeft: "10px",
                        }}>
                        Section 4: Declaration and Undertaking
                      </Typography>
                      <Divider style={{ borderWidth: "thin" }} />

                      <Typography
                        style={{
                          margin: "10px",
                          fontSize: "14px",
                          color: "grey",
                          marginLeft: "10px",
                        }}
                      >
                        I certify that the information provided in this form is, to the best of my knowledge and belief, accurate and complete. I undertake to advise the recipient promptly and <strong>provide an updated Self-Certification form within 30 days where any change in circumstances occurs which causes any of the information contained in this form to be Inaccurate or incomplete.</strong> Where legally obliged to do so, I hereby consent to the recipient sharing this information with the relevant tax information authorities.
                      </Typography>
                      <Typography style={{
                        margin: "10px",
                        fontSize: "14px",
                        color: "grey",
                        marginLeft: "10px",
                      }}>
                        I acknowledge that it is an offence to make a self-certification that is false in a material particular.
                      </Typography>

                      <Paper
                        style={{ marginLeft: "10px", width: "95%", backgroundColor: "#d2d6d3", marginBottom: "2rem" }}
                      >
                        <div style={{ margin: "10px" }}>
                          <Typography style={{ display: "flex" }}>
                            <Checkbox name="confirmThisisaTrueAndAccurate"
                              value={values.confirmThisisaTrueAndAccurate}
                              checked={values.confirmThisisaTrueAndAccurate}
                              onChange={handleChange}
                              size="medium"
                              style={{ fontSize: "2rem", marginTop: "6px" }} />
                            <Typography className="mx-2"
                              style={{ fontSize: "14px", color: "black", marginTop: "15px", textAlign: "justify" }}
                            >
                              Check to confirm this is a true and accurate statement
                            </Typography>
                          </Typography>
                          <p className="error">{errors.confirmThisisaTrueAndAccurate}</p>
                          <Typography style={{ display: "flex" }}>

                            <Checkbox name="confirmYouhaveRewiedElectronicForm"
                              value={values.confirmYouhaveRewiedElectronicForm}
                              checked={values.confirmYouhaveRewiedElectronicForm}
                              onChange={(e) => {
                                handleChange(e);

                              }}
                              size="medium"
                              style={{ fontSize: "2rem" }} />
                            <Typography className="mx-2"
                              style={{ fontSize: "14px", color: "black", marginTop: "10px", textAlign: "justify" }}

                            >
                              Check to confirm you have reviewed the Electronic Form  <span
                                style={{ color: "blue", fontSize: "14px", marginLeft: "5px", cursor: "pointer" }}
                                onClick={() => {
                                  dispatch(GetBENEDCPdf(authDetails?.accountHolderId, (callbackData:any)=>{
                                    setPopupState({
                                        status:true,
                                        data: callbackData?.pdf
                                    })
                                }))
                                }}
                              >
                                (View Electronic Form)
                              </span>
                            </Typography>
                          </Typography>
                          <p className="error">{errors.confirmYouhaveRewiedElectronicForm}</p>


                        </div>
                      </Paper>


                      <div
                        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
                      >
                        {/* <Button
                          onClick={() => {
                            submitForm().then((data) => {
                              history(GlobalValues.basePageRoute)
                            }).catch((error) => {
                              console.log(error);
                            })
                          }}

                          variant="contained"
                          style={{ color: "white" }}
                        >
                          SAVE & EXIT
                        </Button> */}
                        <SaveAndExit Callback={() => {
                          submitForm().then((data) => {
                            const prevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");
                            const urlValue = window.location.pathname.substring(1);
                            dispatch(PostDualCert(
                              {
                                ...prevStepData,
                                ...values,
                                AccountHolderDetailsId:authDetails.accountHolderId,
                                agentId: authDetails?.agentId,
                                formTypeId: FormTypeId.BENE,
                                stepName: `/${urlValue}`
                              }
                              , () => { },
                              () => { })
                            );
                            history(GlobalValues.basePageRoute)
                          }).catch((err) => {
                            console.log(err);
                          })

                        }} formTypeId={FormTypeId.BENE} />
                        <Button

                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={() => {
                            dispatch(GetBENEDCPdf(authDetails?.accountHolderId, (callbackData:any)=>{
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
                          //   disabled={!isValid}

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
      <PopupModa data={popupState} setPopupState={setPopupState} />
    </section>
  );
}
