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
import InfoIcon from "@mui/icons-material/Info";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GetHelpVideoDetails, postSCIndividualEForm } from "../../../../Redux/Actions";

import { partCertiSchema } from "../../../../schemas/8233";
import { ContentCopy } from "@mui/icons-material";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import useAuth from "../../../../customHooks/useAuth";
import { GetCaymanIndividualPdf } from "../../../../Redux/Actions/PfdActions";
export default function Penalties() {
  const { authDetails } = useAuth();

  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const [clickCount, setClickCount] = useState(0);
  const [toolInfo, setToolInfo] = useState("");
  const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");


  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so add 1
  const year = date.getFullYear();

  // Pad day and month with leading zeros if needed
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  // const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  const initialValue = {
    signedBy: PrevStepData?.signedBy ? PrevStepData.signedBy : "",
    EnterconfirmationCode: PrevStepData?.confirmationCode ? PrevStepData.confirmationCode : "",
    confirmationCode: PrevStepData?.confirmationCode ? PrevStepData.confirmationCode : "",
    date: formattedDate,
    isAgreeWithDeclaration: PrevStepData?.isAgreeWithDeclaration ? PrevStepData.isAgreeWithDeclaration : false,
    question: PrevStepData?.question ? PrevStepData.question : "",
    word: PrevStepData?.word ? PrevStepData.word : "",
  };


  useEffect(() => {
    document.title = "Certification II"
    dispatch(GetHelpVideoDetails());
  }, [])

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
        validateOnBlur={true}
        validateOnMount={false}
        initialValues={initialValue}
        validationSchema={partCertiSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const temp = {
            agentId: authDetails.agentId,
            accountHolderBasicDetailId: authDetails.accountHolderId,
            ...PrevStepData,
            ...values,
            stepName: null
          };
          const returnPromise = new Promise((resolve, reject) => {

            dispatch(
              postSCIndividualEForm(
                temp,
                (res: any) => {
                  localStorage.setItem(
                    "PrevStepData",
                    JSON.stringify(temp)
                  );

                  resolve(res);
                  history('/Cayman/Individual/Start/ESConfirmation')
                },
                (err: any) => {
                  reject(err);
                }
              )
            );
          })
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
          isSubmitting,
          setFieldValue,
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
                  <div className="viewform" onClick={(e) => {
                    dispatch(GetCaymanIndividualPdf(authDetails?.accountHolderId));
                  }}>View Form</div>
                  <div className="helpvideo">

                    {GethelpData && GethelpData[9].id === 12 ? (
                      <a
                        href={GethelpData[9].fieldValue}
                      target="_self"
                        onClick={() =>
                          (
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
              <div className="row w-100">
                <div className="col-4">
                  <div style={{ padding: "20px 0px", height: "100%" }}>
                    <BreadCrumbComponent breadCrumbCode={1410} formName={FormTypeId.CaymanIndividual} />
                  </div>
                </div>

                <div className="col-8 mt-3">
                  <div style={{ padding: "12px" }}>
                    <Paper style={{ padding: "10px" }}>

                      <Typography
                        align="left"
                        style={{
                          margin: "10px",
                          fontSize: "27px",
                          fontWeight: "550",
                        }}
                      >
                        Certification
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
                                  EH016: Electronic Signature Help. Please enter the name of the authorized signatory.


                                  See more help for further information on an electronic signature or providing a paper signature.
                                  Electronic Signature: The electronic signature facility will only be available as an option if the requester accepts forms W-8 and W-9 with electronic signatures.

                                  If the electronic signature option is available, on submission an electronic version of this form will be sent directly to the requester for their acceptance and further validation.

                                  After submission you will be able to save and print off a copy for your own records. It is the responsibility of your agent to confirm receipt of the electronic form.

                                  Please note that acceptance of the confirmation declaration for electronic signature and the Certification Statement are performed under penalties of perjury.

                                  Paper Signature: If you do not wish to sign with an e-signature or your agent does not accept e-signed forms you will still be able to save and print off a paper copy of the form. This paper form will need to be signed, dated and sent to your agent.
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
                          {errors?.signedBy && typeof errors?.signedBy === 'string' && (
                            <p className="error">{errors?.signedBy}</p>
                          )}
                          {/* <p className="error">{errors.signedBy}</p> */}
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
                                cursor: "pointer"
                              }}
                            >
                              Recover Password
                            </span>
                            {errors?.EnterconfirmationCode && typeof errors?.EnterconfirmationCode === 'string' && (
                              <p className="error">{errors?.EnterconfirmationCode}</p>
                            )}
                            {/* <p className="error">{errors.EnterconfirmationCode}</p> */}
                          </div>
                        </div>
                      </div>
                      {showRecoverSection && (<div style={{ margin: "10px" }}>
                        <Typography align="left" style={{ fontWeight: "bold" }}>
                          Electronic Signature Confirmation Code Recovery
                        </Typography>
                        <Typography style={{ fontSize: "14px" }}>
                          To recover your Confirmation Code, please type in your security word below. Select the 'Hint?' if you need a reminder of your security word.
                        </Typography>

                        <div className="d-flex my-3 col-8">
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


                              value={values.date}
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
                          {errors?.isAgreeWithDeclaration && typeof errors?.isAgreeWithDeclaration === 'string' && (
                            <p className="error">{errors?.isAgreeWithDeclaration}</p>
                          )}
                          {/* {errors.isAgreeWithDeclaration &&
                      touched.isAgreeWithDeclaration ? (
                        <div>
                          <Typography color="error">
                            {errors.isAgreeWithDeclaration}
                          </Typography>
                        </div>
                      ) : (
                        ""
                      )} */}
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
                            dispatch(postSCIndividualEForm(
                              {
                                ...prevStepData,
                                stepName: `/${urlValue}`
                              }
                              , () => { }))
                            history(
                              GlobalValues.basePageRoute
                            );
                          })
                        }} formTypeId={FormTypeId.CaymanIndividual} ></SaveAndExit>
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
                          //color: "#505E50",
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
                            history("/Cayman/Individual/Start/Certification")
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
