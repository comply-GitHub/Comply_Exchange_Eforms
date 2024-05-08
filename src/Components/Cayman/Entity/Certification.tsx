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
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import InfoIcon from "@mui/icons-material/Info";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../customHooks/useAuth";
import { GetHelpVideoDetails, postSCEntityEForm, postSCIndividualEForm } from "../../../Redux/Actions";
import SideBar from "../../Reusable/SideBar";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import { certificateSchema_BEN_DC } from "../../../schemas/w8Exp";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
export default function Certifications(props: any) {
  const location = useLocation();
  const { authDetails } = useAuth();
  const obValues = JSON.parse(localStorage.getItem("agentDetails") || "{}");
  const PrevStepData = JSON.parse(localStorage.getItem("SelfCertData") || "{}");
  const urlValue = location.pathname.substring(1);
  const initialValue = {
    agentId: authDetails?.agentId,
    accountHolderBasicDetailId: authDetails?.accountHolderId,
    confirmThisisaTrueAndAccurate: false,
    confirmYouhaveRewiedElectronicForm:false,

  };

  const dispatch = useDispatch();
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
  useEffect(()=>{
    document.title = "Comply Exchange"
  },[])
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

  const viewPdf=()=>{
    history("w9_pdf");
  }
  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <SideBar/>
      <div className="row w-100 " style={{ backgroundColor: "#0c3d69" }}>
        <div className="col-4">
          <div style={{ padding: "20px 0px", height: "100%" }}>
            <BreadCrumbComponent breadCrumbCode={1400} formName={FormTypeId.CaymanEntity} />

          </div>
        </div>

        <div className="col-8 mt-3">
          <div style={{ padding: "10px" }}>
            <Paper >
              <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={initialValue}
                enableReinitialize
                validationSchema={certificateSchema_BEN_DC}
                onSubmit={(values, { setSubmitting }) => {
                  const submitPromise = new Promise((resolve, reject) => {
                    setSubmitting(true);
                    const new_obj = { ...PrevStepData, stepName: `/${urlValue}` }
                    const result = { ...new_obj, ...values };
                    dispatch(
                        postSCEntityEForm([result], () => {
                        localStorage.setItem("SelfCertData", JSON.stringify(result))
                        
                        setSubmitting(true);
                        //history("/Cayman/Entity/Submission")
                        resolve("success");
                      },
                      (err:any)=>{
                        reject(err);
                        setSubmitting(false);
                      })
                    );
                  });
                  return submitPromise;

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
                      <Typography   align="left"
                        style={{
                          margin: "10px",
                          fontSize: "15px",
                        
                          marginLeft: "10px",
                        }}>
                            Declaration and Undertaking
                      </Typography>
                      <Divider style={{borderWidth:"thin"}}/>
                     
                      <Typography
                        style={{
                          margin: "10px",
                          fontSize: "14px",
                          color: "grey",
                          marginLeft: "10px",
                        }}
                      >
                       I/We declare ( as an authorised signatory o f the Entity) that the information provided in this form is, to the best of my/our knowledge and belief, accurate and complete. I /We undertake to advise the recipient promptly and <strong>provide an updated SelfCertification form within 30 days where any change in circumstances occurs</strong>, which causes any of the information contained in this form to be inaccurate or incomplete. Where legally obliged to do so , I/we hereby consent to the recipient sharing t his information with the relevant tax information authorities.
                      </Typography>
                      <Typography  style={{
                          margin: "10px",
                          fontSize: "14px",
                          color: "grey",
                          marginLeft: "10px",
                        }}>
                      I/we acknowledge that it is an offence to make a self-certification that is false in a material particular.

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
                              style={{ fontSize: "2rem",marginTop: "6px" }} />
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
                              style={{ fontSize: "14px", color: "black",marginTop: "10px", textAlign: "justify" }}
                            >
                             Check to confirm you have reviewed the Electronic Form  <span
                                style={{ color: "blue", fontSize: "14px", marginLeft: "5px",cursor:"pointer" }}
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
                          submitForm().then(() => {
                            const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                            const urlValue = window.location.pathname.substring(1);
                            dispatch(postSCEntityEForm(
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

                           {/* <SaveAndExit Callback={() => {
                            submitForm().then((data) => {
                              const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                              const urlValue = window.location.pathname.substring(1);
                              dispatch(postSCEntityEForm(
                                {
                                    ...prevStepData,
                                    ...values,
                                    stepName: `/${urlValue}`
                                }
                                , () => { }, 
                                () => { }) 
                            );
                              history(GlobalValues.basePageRoute)
                            }).catch((err) => {
                              console.log(err);
                            })
                          }} formTypeId={FormTypeId.CaymanEntity} /> */}
                        <Button

                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={viewPdf}
                        >
                          View form
                        </Button>
                        <Button
                        type="submit"
                          disabled={
                            ((values.confirmThisisaTrueAndAccurate && values.confirmYouhaveRewiedElectronicForm) === false ? true : false )}

                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={() => {
                            submitForm().then((data) => {
                              history("/Cayman/Entity/Submission")
                            }).catch((error) => {
                              console.log(error);
                            })
                          }}
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
                          history(
                            "/Cayman/Entity/TIN"   
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
