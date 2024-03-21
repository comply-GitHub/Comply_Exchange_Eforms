import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  TextField,
  Paper,
  Checkbox,
  Tooltip,
  Link,
  Select,
  Input,
} from "@mui/material";
// import { Info } from "@mui/icons-material";
import Infoicon from "../../../assets/img/info.png";
import InfoIcon from "@mui/icons-material/Info";
import { Formik, Form } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CREATE_8233,GetHelpVideoDetails } from "../../../Redux/Actions";
import { partCertiSchema } from "../../../schemas/8233";
import { ContentCopy } from "@mui/icons-material";
import BreadCrumbComponent from "../../reusables/breadCrumb";
export default function Penalties() {
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const [clickCount, setClickCount] = useState(0);
  const [toolInfo, setToolInfo] = useState("");
  const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
  const initialValue = {
    signedBy: "",
    EnterconfirmationCode:"",
    confirmationCode: "",
    date: "",
    isAgreeWithDeclaration: false,
    question:"",
    word :""
  };
  

  useEffect(()=>{
    dispatch(GetHelpVideoDetails());
  },[])

  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showRecoverSection, setShowRecoverSection] = useState(false);
  const [isSecurityWordMatched, setIsSecurityWordMatched] = useState(false);
  const [securityWordError, setSecurityWordError] = useState("");
  const toggleRecoverSection = () => {
    setShowRecoverSection(true);
   
    setSecurityWordError("");
  };
  return (
    <>
      <Formik
      validateOnChange={false}
      validateOnBlur={false}
        initialValues={initialValue}
        validationSchema={partCertiSchema}
        onSubmit={(values, { setSubmitting }) => {

          if (clickCount === 0) {
        
            setClickCount(clickCount+1);
          }else{
          console.log(values,"valuess")
          setSubmitting(true);
          dispatch(
            CREATE_8233(values, () => {
              history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233");
            })
          );
          }
          history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233");
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
          setFieldValue
        }) => (
          <Form onSubmit={handleSubmit}>
            <section
              className="inner_content"
              style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
            >

<div className="overlay-div">
            <div className="overlay-div-group">
                <div className="viewInstructions">View Instructions</div>
                <div className="viewform">View Form</div>
                <div className="helpvideo"> 
                
                {GethelpData && GethelpData[9].id === 12 ? (
  <a
    href={GethelpData[9].fieldValue}
    target="popup"
    onClick={() =>
      window.open(
        GethelpData[9].fieldValue,
        'name',
        `width=${GethelpData[9].width},height=${GethelpData[9].height},top=${GethelpData[9].top},left=${GethelpData[9].left}`
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
              <div className="row w-100 h-100">
        <div className="col-4">
          <div style={{ padding: "20px 0px",height:"100%" }}>
          <BreadCrumbComponent breadCrumbCode={1450} formName={2}/>
      </div>
      </div>
      {/* <>{console.log(errors,"errors!!!!!")}</> */}
      <div className="col-8 mt-3">
              <div style={{ padding: "12px" }}>
                <Paper style={{ padding: "10px" }}>
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
                    Part III Certification
                  </Typography>
                  <Typography
                    align="left"
                    style={{
                      margin: "10px",
                      fontSize: "27px",
                      fontWeight: "550",
                    }}
                  >
                    8233 Electronic Substitute Form Statement
                  </Typography>
                  <Typography
                    align="left"
                    style={{ margin: "10px", fontSize: "17px", color: "grey" }}
                  >
                    The Internal Revenue Service does not require your consent
                    to any provisions of this document other than the
                    certifications required to establish your status as a
                    non-U.S. person and, if applicable, obtain a reduced rate of
                    withholding.
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
                      <p className="error">{errors.signedBy}</p>
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
                          name="EnterconfirmationCode"
                          value={values.EnterconfirmationCode}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(
                            touched.EnterconfirmationCode && errors.EnterconfirmationCode
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
                            cursor:"pointer"
                          }}
                        >
                          Recover Password
                        </span>
                        <p className="error">{errors.EnterconfirmationCode}</p>
                      </div>
                    </div>
                  </div>
                  {showRecoverSection &&(<div style={{margin:"10px"}}>
  <Typography align="left" style={{fontWeight:"bold"}}>
  Electronic Signature Confirmation Code Recovery
  </Typography>
  <Typography style={{fontSize:"14px"}}>
  To recover your Confirmation Code, please type in your security word below. Select the 'Hint?' if you need a reminder of your security word.
  </Typography>

  <div className="d-flex my-3 col-8">
    <Typography className="my-2 col-4" style={{fontWeight:"bold"}}>Security Word</Typography>
    <Input className=" col-4 inputTextField"
   
                        style={{
                         color:"black !important",
                         
                          width: "50%",
                          backgroundColor:"#fff"
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
  <Link className="my-2 col-4" onClick={()=>{setFieldValue("question", obValues.securityQuestion.question)}}>Hint?</Link>
  <Input className=" col-4 inputTextField"
                        style={{
                         color:"black",
                         fontSize:"13px",
                          width: "50%",
                          backgroundColor:"#e3e6e4"
                        }}
                        fullWidth
                        type="text"
                        disabled
                        value={values.question}
                        
                        
                      />
  </div>
  <div className="d-flex my-3 col-8 ">
    <Typography className="my-2 col-4" style={{fontWeight:"bold"}}>Confirmation Code</Typography>
    <Input className=" col-3 inputTextField blackText"
                        style={{
                          color: "#7e7e7e",
                          fontStyle: "italic",
                          width: "50%",
                          backgroundColor:"#e3e6e4"
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
  <Typography className=" my-4 col-8 "align="center" >
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
      }}style={{justifyContent:"center"}}  variant="contained" size="small">
  OK
</Button>
  </Typography>
</div>)}
                  <div
                    className="row"
                    style={{
                      margin: "10px",

                      marginTop: "20px",
                    }}
                  >
                    <div className="col-6 col-md-12 p-0">
                      <Typography align="left" style={{ padding: "0px" }}>
                        <Typography style={{ fontSize: "15px" }}>
                          Date
                        </Typography>
                        <Input
                       className="inputTextField"
                        id="outlined"
                        fullWidth
                          name="dob"
                          
                         
                          value={
                            new Date().toLocaleDateString('en-US', {
                              month: '2-digit',
                              day: '2-digit',
                              year: 'numeric',
                            })
                          }
                          onBlur={handleBlur}
                          
                          
                          disabled
                        />
                        
                      {/* {values.date ?(""):<p className="error">{errors.date}</p>} */}
                      </Typography>
                    </div>
                  </div>

                  <Typography style={{ display: "flex" }}>
                    <Checkbox
                      name="isAgreeWithDeclaration"
                      value={values.isAgreeWithDeclaration}
                      checked={values.isAgreeWithDeclaration}
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
                             fontSize: "14px",
                              cursor: "pointer",
                              verticalAlign: "super",
                            }}
                          />
                        </Tooltip>
                      </span>
                      {errors.isAgreeWithDeclaration &&
                      touched.isAgreeWithDeclaration ? (
                        <div>
                          <Typography color="error">
                            {errors.isAgreeWithDeclaration}
                          </Typography>
                        </div>
                      ) : (
                        ""
                      )}
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
                      onClick={() => {
                        setOpen2(true);
                      }}
                      variant="contained"
                      style={{ color: "white" }}
                    >
                      SAVE & EXIT
                    </Button>
                    <Button
                      type="submit"
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
                      history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification")
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

      {/* <Declaration
        open={open2}
        setOpen={setOpen2}
        handleClickOpen={handleClickOpen2}
        handleClose={handleClose2}
      /> */}
    </>
  );
}
