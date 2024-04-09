import React, { useEffect } from "react";
import { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Paper,
  Checkbox,
  Tooltip,
  Link,
  FormControl,
  Input,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import "./index.scss"
import { ContentCopy } from "@mui/icons-material";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import InfoIcon from "@mui/icons-material/Info";
import Declaration from "../../../../reusables/Declaration";
import { Formik, Form } from "formik";
import { useDispatch ,useSelector} from "react-redux";
import { postW8BENForm ,GetHelpVideoDetails} from "../../../../../Redux/Actions";
import { useNavigate } from "react-router";
import checksolid from "../../../../../assets/img/check-solid.png";
import Accordion from "@mui/material/Accordion";
import Infoicon from "../../../../../assets/img/info.png";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { partCertiSchema_DC_BEN } from "../../../../../schemas/w8Ben";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import { useLocation } from "react-router-dom";
import SecurityCodeRecover from "../../../../Reusable/SecurityCodeRecover";
import useAuth from "../../../../../customHooks/useAuth";
import SaveAndExit from "../../../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../../../../Utils/constVals";
import moment from "moment";
type ValuePiece = Date | null;
type Value2 = ValuePiece | [ValuePiece, ValuePiece];
export default function Penalties() {
  const location = useLocation();
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [value, onChange] = useState<Value2>(null);
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [showRecoverSection, setShowRecoverSection] = useState(false);
  const [payload, setPayload] = useState({
    confirmationCode: "",
    
  });

  const urlValue = location.pathname.substring(1);
 const agentDefaultDetails = JSON.parse(
    localStorage.getItem("agentDefaultDetails") || "{}"
  );
  const W8BENData = useSelector((state: any) => state.W8BEN);
  // const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
    // const toggleRecoverSection = () => {
    //   setShowRecoverSection(true);
    // };
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const toggleRecoverSection = () => {
      setShowRecoverSection(true);
     
      setSecurityWordError("");
    };

    useEffect(()=>{
      document.title = "Certification II"
    },[])

    useEffect(() => {
   
      dispatch(GetHelpVideoDetails());
  
    }, []);
    const GethelpData = useSelector(
      (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
    );
    const [clickCount, setClickCount] = useState(0);
    const [isSecurityWordMatched, setIsSecurityWordMatched] = useState(false);
    const [securityWordError, setSecurityWordError] = useState("");
  const [toolInfo, setToolInfo] = useState("");
  const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
  const initialValue = {
    signedBy: W8BENData?.signedBy ?? "",
    EnterconfirmationCode:"",
    confirmationCode: W8BENData?.confirmationCode ?? "",
    date:W8BENData?.date ?? new Date().toLocaleDateString('en-US', { month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }),
  isCheckAcceptance: W8BENData?.isCheckAcceptance ? true : false
   
  };
 

  const dispatch = useDispatch();
  const history = useNavigate();

  const viewPdf=()=>{
    // history("/w8Ben_pdf", { replace: true });
    history("/w8Ben_pdf");
  }
  return (
    <>
      <Formik
      validateOnChange={true}
      validateOnBlur={true}
        initialValues={initialValue}
        validationSchema={partCertiSchema_DC_BEN}
        onSubmit={(values, { setSubmitting }) => {
          history("/Submit_DC_BEN");
         
          if (clickCount === 0) {
        
            setClickCount(clickCount+1);
          }else{
            setSubmitting(true)
            const new_obj = { ...PrevStepData, stepName: `/${urlValue}`,date:moment(values.date).format() }
            const result = { ...new_obj, ...values };
                        dispatch(
                          postW8BENForm(result, () => {
                            localStorage.setItem("PrevStepData",JSON.stringify(result))
                             history("/Submit_DC_BEN")
                          })
                        );
          }
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
         isValid,
         submitForm
        }) => (
          <Form onSubmit={handleSubmit}>
            <section
              className="inner_content"
              style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
            >
<div className="overlay-div">
            <div className="overlay-div-group">
                <div className="viewInstructions">View Instructions</div>
                <div className="viewform" onClick={viewPdf}>View Form</div>
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
          <div style={{ padding: "20px 0px",height:"100%"}}>
            <BreadCrumbComponent breadCrumbCode={1290} formName={2}/>
          
      </div>
      </div>
      <div className="col-8 mt-3">

              <div style={{ padding: "10px" }}>

               
                <Paper style={{ padding: "18px" }}>
                {obValues.uniqueIdentifier !== values.signedBy && clickCount === 1 ?(
                  <div  style={{backgroundColor: "#e8e1e1" , padding:"10px"}}>
                  <Typography>
                SIG101
                  <span className="mx-1">
                  <img src={Infoicon} style={{color: "#ffc107",height:"22px",
                  width:"20px",
                  boxShadow:"inherit",
                 

                         
                          cursor: "pointer",
                          marginBottom:"3px"
                         
                        }}/>
                    
                    
                    You have entered an electronic signature name that is different to the one expected
                  </span>
   
                  
                  </Typography>
                 
                </div>

                ):""}
                  <Typography
                    align="left"
                    style={{
                      margin: "10px",
                      fontSize: "27px",
                      fontWeight: "550",
                    }}
                  >
                   Certification<span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Typography
                    align="left"
                    style={{
                      margin: "10px",
                      fontSize: "27px",
                      fontWeight: "550",
                    }}
                  >
                    Self Cert Individual Electronic Substitute Form Statement
                  </Typography>
                  <Typography
                    align="left"
                    style={{ margin: "10px", fontSize: "18px", color: "grey" }}
                  >
                    The Internal Revenue Service does not require your consent
                    to any provisions of this document other than the
                    certifications required to avoid backup withholding. 
                  </Typography>

                  <div
                    className="row"
                    style={{
                      margin: "10px",

                      marginTop: "20px",
                    }}
                  >
                    <div className="col-md-6 col-12 p-0">
                      <Typography style={{ fontSize: "15px" }}>
                        Signed by<span style={{ color: "red" }}>*</span>
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  Signature information
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
                                fontSize: "20px",
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
                              width: "70%",
                            }}
                          >
                            <Typography>
                              Please enter the name of the authorized signatory.
                            </Typography>

                            <Typography style={{ marginTop: "10px" }}>
                              See 'More Info' for further information on
                              signature requirements.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              On submission an electronic version of this form
                              will be sent directly to the requester for their
                              acceptance and further validation. After
                              submission you will be able to save and print a
                              copy for your own records.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              We will confirm receipt of the electronic form.
                              Please note that acceptance of the confirmation
                              declaration for electronic signature and the
                              certification statement are performed under
                              penalty of perjury.
                            </Typography>

                            <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "16px" }}
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

<Input
                            className="inputTextField"
                            id="outlined"
                            fullWidth
                            type="text"
                            name="signedBy"
                            value={values.signedBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.signedBy && errors.signedBy)}
                          />
                          <p className="error">{typeof (errors.signedBy) === "string" ? errors.signedBy : ""}</p>
                        </div>

                        <div className="col-md-6 col-12">
                          <Typography style={{ fontSize: "15px" }}>
                            Enter Confirmation Code:
                            <span style={{ color: "red" }}>*</span>
                            <span>
                              <Tooltip
                                style={{ backgroundColor: "black", color: "white" }}
                                title={
                                  <>
                                    <Typography color="inherit">
                                      Exemptions - Backup Withholding
                                    </Typography>
                                    <a onClick={() => setToolInfo("password")}>
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
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    verticalAlign: "super",
                                  }}
                                />
                              </Tooltip>
                            </span>
                          </Typography>

                          {toolInfo === "password" ? (
                            <div>
                              <Paper
                                style={{
                                  backgroundColor: "#dedcb1",
                                  padding: "15px",
                                  marginBottom: "10px",
                                }}
                              >
                                <Typography>
                                  To authenticate the electronic signature you must
                                  enter the alpha numeric token you received at the
                                  start of the process. If you cannot remember your
                                  confirmation code, you can click the 'Recover
                                  Password' link to answer your security question
                                  again and receive it.
                                </Typography>

                                <Typography style={{ marginTop: "10px" }}>
                                  If you do not wish to submit the electronic form
                                  at this stage, you will need to exit the process
                                  and undertake again at a later date.
                                </Typography>

                                <Link
                                  href="#"
                                  underline="none"
                                  style={{ marginTop: "10px", fontSize: "16px" }}
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
                          <div>
                            <Input
                              className="inputTextField"
                              id="outlined"
                              fullWidth
                              name="confirmationCode"
                              value={values.confirmationCode}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                handleChange(e)
                                setTimeout(() => {
                                  setShowRecoverSection(false)
                                }, 200);
                              }}
                              error={Boolean(
                                touched.confirmationCode && errors.confirmationCode
                              )}
                              type="password"

                              style={{ width: "100%" }}
                            />
                            <span
                              onClick={toggleRecoverSection}
                              style={{
                                fontSize: "16px",
                                color: "blue",
                                marginLeft: "10px",
                                cursor: "pointer"
                              }}
                            >
                              Recover Password
                            </span>
                            <p className="error">{touched.confirmationCode && typeof (errors.confirmationCode) == "string" ? errors.confirmationCode : ""}</p>
                          </div>
                        </div>
                      </div>
                      {showRecoverSection &&
                        (<div style={{ margin: "10px" }}>
                          <Typography align="left" style={{ fontWeight: "bold" }}>
                            Electronic Signature Confirmation Code Recovery
                          </Typography>
                          <Typography style={{ fontSize: "14px" }}>
                            To recover your Confirmation Code, please type in your security word below. Select the 'Hint?' if you need a reminder of your security word.
                          </Typography>

                          {/* <div className="d-flex my-3 col-8">
                          <Typography className="my-2 col-4" style={{ fontWeight: "bold" }}>Security Word</Typography>
                          <Input className=" col-4 inputTextField"

                            style={{
                              color: "black !important",

                              width: "50%",
                              backgroundColor: "#fff"
                            }}
                            fullWidth
                            type="text"
                            name="word"
                            onChange={handleChange}
                            value={values.word}


                          />



                        </div>
                        {securityWordError && <p className="error">{securityWordError}</p>}
                        <div className="d-flex my-3 col-8">
                          <Link className="my-2 col-4" onClick={() => { setFieldValue("question", obValues.securityQuestion.question) }}>Hint?</Link>
                          <Input className=" col-4 inputTextField"
                            style={{
                              color: "black",
                              fontSize: "13px",
                              width: "50%",
                              backgroundColor: "#e3e6e4"
                            }}
                            fullWidth
                            type="text"
                            disabled
                            value={values.question}


                          />
                        </div>
                        <div className="d-flex my-3 col-8 ">
                          <Typography className="my-2 col-4" style={{ fontWeight: "bold" }}>Confirmation Code</Typography>
                          <Input className=" col-3 inputTextField blackText"
                            style={{
                              color: "#7e7e7e",
                              fontStyle: "italic",
                              width: "50%",
                              backgroundColor: "#e3e6e4"
                            }}
                            fullWidth
                            disabled
                            value={values.confirmationCode}
                            type="text"


                          />
                          <Typography className="col-1 mx-2 my-1" >
                            <ContentCopy

                              onClick={() => {
                                navigator.clipboard.writeText(
                                  values.confirmationCode
                                );
                              }}
                              style={{ fontSize: "18px", marginTop: "5px" }}
                            />
                          </Typography>

                        </div>
                        <Typography className=" my-4 col-8 " align="center" >
                          <Button onClick={() => {
                            if (!values.word) {
                              setSecurityWordError("Please enter the security word");
                            } else {
                              const storedSecurityWord = obValues.securityAnswer;
                              if (values.word !== storedSecurityWord) {
                                setSecurityWordError("Security word does not match");
                                setIsSecurityWordMatched(false);
                              } else {
                                setSecurityWordError("");
                                setIsSecurityWordMatched(true);
                                setFieldValue("confirmationCode", obValues.confirmationCode);
                              }
                            }
                          }} style={{ justifyContent: "center" }} variant="contained" size="small">
                            OK
                          </Button>
                        </Typography> */}

                          <SecurityCodeRecover setRecoverPassword={setShowRecoverSection} ></SecurityCodeRecover>

                        </div>
                        )}



                      <div
                        className="row"
                        style={{
                          margin: "10px",

                          marginTop: "20px",
                        }}
                      >
                        <div className="col-12 col-md-6 p-0">
                          <Typography align="left" style={{ padding: "0px" }}>
                            <Typography style={{ fontSize: "15px" }}>
                              Date
                            </Typography>
                            {/* <TextField */}
                            <FormControl style={{ width: "100%" }}>
                              <Input
                                className="inputTextField"
                                id="outlined"
                                fullWidth
                                name="date"
                                value={
                                  new Date().toLocaleDateString('en-US', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: 'numeric',
                                  })
                                }
                                onBlur={handleBlur}
                                readOnly={true}
                              />

                            </FormControl>

                            {/* /> */}
                            {/* <p className="error">{errors.date}</p> */}
                          </Typography>
                        </div>
                      </div>

                      <Typography style={{ display: "flex", marginLeft: "10px" }}>
                        <Checkbox
                          name="isCheckAcceptance"
                          value={values.isCheckAcceptance}
                          checked={values.isCheckAcceptance}
                          onChange={handleChange}
                        />
                        <Typography
                          style={{
                            fontSize: "15px",
                            color: "black",

                          }}
                        >
                          Please "check" box to confirm your acceptance with the
                          above declarations{" "}
                          {errors.isCheckAcceptance &&
                            touched.isCheckAcceptance ? (
                            <div>
                              <Typography color="error">
                                {errors.isCheckAcceptance}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                          <span>
                            <Tooltip
                              style={{ backgroundColor: "black", color: "white" }}
                              title={
                                <>
                                  <Typography color="inherit">
                                    Certification information
                                  </Typography>
                                  <a onClick={() => setToolInfo("check")}>
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
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  verticalAlign: "super",
                                }}
                              />
                            </Tooltip>
                          </span>
                        </Typography>
                      </Typography>
                  {toolInfo === "check" ? (
                    <div>
                      <Paper
                        style={{
                          backgroundColor: "#dedcb1",
                          padding: "15px",
                          marginBottom: "10px",
                        }}
                      >
                        <Typography>
                          This submission <span>must</span> be signed and dated
                          by the beneficial owner of the income, or, if the
                          beneficial owner is not an individual, by an
                          authorized representative or officer of the beneficial
                          owner.
                        </Typography>
                        <Typography>
                          If this submission is being completed by an agent
                          acting under a duly authorized power of attorney for
                          the beneficial owner or account holder, the form must
                          be accompanied by the power of attorney in proper form
                          or a copy thereof specifically authorizing the agent
                          to represent the principal in making, executing, and
                          presenting the form.
                        </Typography>

                        <Typography style={{ marginTop: "10px" }}>
                          Form 2848, Power of Attorney and Declaration of
                          Representative, can be used for this purpose. The
                          agent, as well as the beneficial owner or account
                          holder, may incur liability for the penalties provided
                          for an erroneous, false, or fraudulent form.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          Ref: EH015
                        </Typography>

                        <Link
                          href="#"
                          underline="none"
                          style={{ marginTop: "10px", fontSize: "16px" }}
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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "40px",
                    }}
                  >
                     <Button
                     onClick={viewPdf}
                      variant="contained"
                      style={{ color: "white" }}
                    >
                    View Form
                    </Button>
                    <div style={{ color: "white", marginLeft: "15px" }}>
                          <SaveAndExit Callback={() => {
                            submitForm().then(() => {
                              const prevStepData = JSON.parse(
                                localStorage.getItem("PrevStepData") || "{}"
                              );
                              const urlValue =
                                window.location.pathname.substring(1);
                              dispatch(
                                postW8BENForm(
                                  {
                                    ...prevStepData,
                                    ...values,
                                    stepName: `/${urlValue}`,
                                  },
                                  () => {
                                    history(GlobalValues.basePageRoute);
                                  }
                                )
                              );
                            })
                              .catch((err) => {
                                console.log(err);
                              })
                          }} formTypeId={FormTypeId.BEN} />
                        </div>
                    <Button
                      type="submit"
                      // onClick={() => {
                      //   history("/Submit");
                      //   //  setOpen2(true)
                      // }}
                      // onClick={() => {
                      //   setOpen2(true);
                      // }}
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" }}
                    >
                      Submit Electronically
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
                    onClick={()=>{
                      history('/Certification_DC_BEN')
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
              </div>
              </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>

      <Declaration
        open={open2}
        setOpen={setOpen2}
        handleClickOpen={handleClickOpen2}
        handleClose={handleClose2}
      />
    </>
  );
}
