import { Fragment, useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "@mui/material/Input";
import { ContentCopy } from "@mui/icons-material";
import { AppDispatch } from "../../Redux/store";
import DialogContentText from "@mui/material/DialogContentText";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Select, Button, Typography, Paper, Tooltip } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import {
  InsertConfirmationCode,
  getSecurityQuestions,
  postFormSelection,
  postSecurityCode,
} from "../../Redux/Actions";
import { Formik, Form } from "formik";
import { securitySchema } from "../../schemas";
import GlobalValues from "../../Utils/constVals";
import useAuth from "../../customHooks/useAuth";

const DialogEdit = (props: any) => {
  const { authDetails } = useAuth();
  const [toolInfo, setToolInfo] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const history = useNavigate();
  const { open, setOpen } = props;
  const textAreaRef = useRef(null);
  const postSecurityCodeData = useSelector(
    (state: any) => state.postSecurityCodeReducer.postSecurutyCodeData
  );

  const getSecurityQuestionsReducer = useSelector(
    (state: any) => state.getSecurityQuestionsReducer.getSecurityQuestionsData
  );

  const accountHolderId = useSelector((state: any) => state?.accountHolder?.returnData?.accountHolderID) ?? GlobalValues.AccountHolderBasicDetailsId

  var QuestionObject;

  const [payload, setPayload] = useState({
    confirmationCode: "",
    securityQuestionId: "",
    securityAnswer: "",
  });

  var initialValues = {
    confirmationCode: payload.confirmationCode,
    securityQuestionId: 0,
    securityAnswer: "",
  };


  useEffect(() => {
    document.title = "Comply Exchange"
  }, [])

  useEffect(() => {
    dispatch(postSecurityCode(() => console.log("hi")));
    dispatch(getSecurityQuestions());
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopyClick = (e: any) => {
    navigator.clipboard.writeText(payload.confirmationCode);
    document.execCommand('copy');
    e.target.focus();
    // toast.success("Code copied to clipboard!",{
    //  autoClose: 2000
    //  })

  };

  const [showPaper, setShowPaper] = useState(false);

  useEffect(() => {
    if (toolInfo === "basic") {
      setShowPaper(true);
      const timeoutId = setTimeout(() => {
        setShowPaper(false);
        setToolInfo("");
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [toolInfo]);

  useEffect(() => {
    setPayload({ ...payload, confirmationCode: postSecurityCodeData });
  }, [postSecurityCodeData]);

  return (
    <Fragment>
      <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        <div style={{ padding: "25px" }}>
          <Paper style={{ padding: "22px" }}>
            <Formik
              validateOnChange={true}
              isInitialValid={false}
              validateOnBlur={false}
              initialValues={initialValues}
              enableReinitialize
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                let submitData = {
                  accountHolderId: authDetails.accountHolderId,
                  agentId: authDetails.agentId,
                  confirmationCode: values.confirmationCode,
                  securityAnswer: values.securityAnswer,
                  securityQuestionId: values.securityQuestionId,
                };
                console.log("submit data", submitData);
                dispatch(InsertConfirmationCode(submitData, (data: any) => {
                  console.log(data);
                  history("/Certificates");
                }))

                localStorage.setItem("formSelection", JSON.stringify(submitData));
              }}
              validationSchema={securitySchema}
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
                isValid
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Typography
                    className="my-2"
                    align="left"
                    style={{
                      fontSize: "25px",
                      color: "#04506e",
                      fontWeight: "550",
                    }}
                  >
                    Temporary Electronic Signature Confirmation Code
                  </Typography>

                  <Divider style={{ background: "black" }} />

                  <Typography
                    align="left"
                    className="mt-3"
                    style={{ fontSize: "15px", color: "#383a3b" }}
                  >
                    Please note, you will be required to enter your Confirmation
                    Code into the corresponding box at the very end of this
                    electronic form submission.
                  </Typography>
                  <div className="row col-10 d-flex mt-3">
                    {toolInfo === "basic" ? (
                      <div>
                        <div
                          style={{
                            backgroundColor: "#d1ecf1",
                            padding: "10px",
                            marginBottom: "10px",
                            width: "100%",
                          }}
                        >
                          <Typography>
                            Confirmation code has been copied
                          </Typography>



                          {/* <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "16px" }}
                              onClick={() => {
                                setToolInfo("");
                              }}
                            >
                              --Show Less--
                            </Link> */}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <Typography className="col-3">
                      <Typography
                        style={{
                          fontSize: "20px",
                          color: "black",
                          marginTop: "8px",
                        }}
                      >
                        Your Confirmation Code:
                      </Typography>
                    </Typography>

                    <Typography className="col-5">
                      <TextField
                        fullWidth
                        size="small"
                        name="code"
                        className="blackText"
                        value={values.confirmationCode}
                        ref={textAreaRef}
                      // disabled
                      // type = "hidden"
                      />
                    </Typography>
                    <Typography className="col-1">
                      <Tooltip


                        style={{ backgroundColor: "black", color: "white" }}
                        title="Copy To Clipboard"
                      >
                        <ContentCopy
                          onClick={(e) => {
                            handleCopyClick(e);
                            setToolInfo("basic")
                          }}
                          style={{ fontSize: "18px", marginTop: "5px", cursor: "pointer" }}
                        />
                      </Tooltip>




                    </Typography>
                    <ToastContainer />
                  </div>

                  <Typography
                    align="left"
                    className="mt-3"
                    style={{ fontSize: "15px", color: "#383a3b" }}
                  >
                    To help you recover this Confirmation Code should you forget
                    it, please select a question from the dropdown below and
                    enter an answer to that question in the box to the right.
                  </Typography>
                  <Typography
                    align="left"
                    className="mt-2"
                    style={{ fontSize: "15px", color: "#383a3b" }}
                  >
                    To re-show the Confirmation Code, you will need to enter
                    this word later.
                  </Typography>

                  <div className="row col-12 d-flex mt-2">
                    <Typography className="col-5 ">
                      <select
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#121112",
                          fontStyle: "italic",
                          height: "50px",
                          width: "100%",
                        }}
                        name="securityQuestionId"
                        id="countryId"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        value={values.securityQuestionId}
                      >
                        <option value="">---select---</option>
                        {getSecurityQuestionsReducer?.map((ele: any) => (
                          <option key={ele?.id} value={ele?.id}>
                            {ele?.question}
                          </option>
                        ))}
                      </select>
                      <p className="error">{touched.securityQuestionId ? errors.securityQuestionId : ""}</p>
                    </Typography>
                    <Typography className="col-7 ">
                      <Input
                        fullWidth
                        type="text"
                        name="securityAnswer"
                        value={values.securityAnswer}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Security Word"
                        // error={Boolean(
                        //   touched.securityAnswer && errors.securityAnswer
                        // )}
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#7e7e7e",
                          fontStyle: "italic",
                          height: "50px",
                          width: "100%",
                        }}
                      />
                      <p className="error">{touched.securityAnswer ? errors.securityAnswer : ""}</p>

                      <Typography
                        className=" mt-2"
                        style={{
                          fontSize: "12px",
                          color: "black",
                          fontWeight: "550",
                        }}
                      >

                        Please note: This word is case sensitive
                      </Typography>
                    </Typography>
                  </div>

                  <Typography align="center" style={{ marginTop: "4rem" }}>
                    <Button
                      disabled={!isValid}
                      style={{ fontSize: "18px" }}
                      size="small"
                      type="submit"
                      variant="contained"
                    >
                      OK
                    </Button>
                  </Typography>
                </Form>
              )}
            </Formik>
          </Paper>
        </div>
      </section>
    </Fragment>
  );
};

export default DialogEdit;