import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import "./index.scss";
import React, { ReactEventHandler, useEffect, useState } from "react";
import SecurityCodeRecover from "../SecurityCodeRecover";
import { SaveAndExitSchema } from "./saveAndExit";
import GlobalValues from "../../../Utils/constVals";
import { useDispatch } from "react-redux";
import { UpsertSaveAndExitCreds } from "../../../Redux/Actions";
import { Close } from "@mui/icons-material";
import useAuth from "../../../customHooks/useAuth";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  // border: "2px solid #000",
  //maxWidth: "100%",
  // margin: "2%",
  // fontSize: "1.2rem",
  // overflow: "auto",
  // boxSizing: "border-box",  
};

const InternalBoxStyle = {
  backgroundColor: "#d3d3d3b8",
  width: "45vw",
  paddingLeft: "10px",
  borderRadius: "2px",
};

const SaveAndExit = ({ Callback, formTypeId }: any) => {
  const { authDetails } = useAuth()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [recoverPassword, setRecoverPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(undefined);

  const dispatch = useDispatch();

  const agentDetails = JSON.parse(localStorage.getItem("agentDetails") ?? "{}")
  const urlValue = window.location.pathname.substring(1);

  const [initialValues, setInitialValues] = useState(
    {
      agentId: authDetails?.agentId,
      accountHolderDetailsId: authDetails?.accountHolderId,
      stepName: urlValue,
      formTypeId: formTypeId,
      email: agentDetails?.contactEmail ?? "",
      token: "",
      password: "",
      confirmPassword: ""
    }
  );

  useEffect(() => {
    setInitialValues({
      agentId: authDetails?.agentId,
      accountHolderDetailsId: authDetails?.accountHolderId,
      stepName: urlValue,
      formTypeId: formTypeId,
      email: agentDetails?.contactEmail ?? "",
      token: "",
      password: "",
      confirmPassword: ""
    })
  }, [authDetails])

  useEffect(() => {
    // console.log("from valid", formValid)
  }, [formValid])

  useEffect(() => {
    SaveAndExitSchema().validate(initialValues).then((errors) => {
      //console.log("formValid true", errors)
      setFormValid(true);
    }).catch((errors) => {
      //console.log("formValid flase", errors)
      setFormValid(false);
    })
  }, [initialValues])

  const handleStateUpdate = (e: any) => {
    let data: any = { ...initialValues };
    data[e.target.name] = e.target.value;
    setInitialValues(data);
  }

  const handleSubmitPasswordUpdate = async () => {
    let payload = {
      id: 0,
      accountHolderDetailsId: initialValues.accountHolderDetailsId,
      agentId: initialValues.agentId,
      formTypeId: formTypeId,
      email: initialValues.email,
      password: initialValues.password,
      stepName: initialValues.stepName,
      token: initialValues.token
    }
    dispatch(UpsertSaveAndExitCreds(payload,
      (data: any) => {
        console.log(data);
        if (data.status == 200) {
          Callback();
        } else {
          //error case
          setError(data.message)
          setTimeout(() => { setError(undefined) }, 2000)
        }
      }
      , (err: any) => {
        setError(err.message)
        setTimeout(() => { setError(undefined) }, 2000)
      }
    ))
  }



  return (
    <div>
      <Button
        variant="contained"
        style={{ color: "white" }}
        onClick={(e) => {
          handleOpen();
        }}
      >
        SAVE & EXIT{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "grid", gridTemplateColumns: "7fr 1fr" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"primary"}
            >
              Save & Exit - Account Registration
            </Typography>
            <IconButton onClick={() => handleClose()} color="primary">
              x
            </IconButton>
          </div>

          <Box sx={InternalBoxStyle}>
            <div
              style={{
                display: "grid",
                gap: "1vh",
                overflow: "auto",
                maxHeight: "150px",
              }}
            >
              <Typography sx={{ color: "black", fontWeight: "500" }}>
                Registration
                <Typography color={"#7b7878"}>
                  This should be the same as one used in the form submission
                  process
                </Typography>
              </Typography>

              <Typography sx={{ color: "black", fontWeight: "500" }}>
                Note: Token has been sent to email address.
              </Typography>

              <Typography sx={{ color: "black", fontWeight: "500" }}>
                Token
                <Typography color={"#7b7878"}>
                  The Token (PIN) will have been sent to the email address used during the submission process, please enter here,
                  if not recived please look in your spam or junk mail file.
                </Typography>
              </Typography>
            </div>
          </Box>
          {!recoverPassword ? (
            <>
              {error ?
                <Alert icon={<Close fontSize="inherit" />} severity="error" sx={{ marginTop: "10px" }}>
                  {error}
                </Alert> : ""
              }
              <div style={{ padding: "10px" }}>
                <Formik initialValues={initialValues}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log("values", values)
                  }}
                  validationSchema={SaveAndExitSchema}
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
                    submitForm,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      {(() => {
                        console.log(values, "save and exit values", errors, "errors");
                        return <></>
                      })()}
                      <div className="detailsbox">
                        <FormControl className="w-98">
                          <Typography align="left">
                            Email<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Input
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              width: "80%",
                              lineHeight: "36px ",
                              background: "lightgray",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            name="email"
                            readOnly={true}
                            placeholder="example@domain.com"
                            onChange={(e) => { handleChange(e); handleStateUpdate(e) }}
                            value={values.email}
                            // onBlur={handleBlur}
                            error={Boolean(
                              touched.email && errors.email
                            )}
                          />
                          <p className="error">{touched.email && typeof (errors.email) === "string" ? errors.email : ""}</p>
                        </FormControl>
                        <FormControl
                          style={{
                            display: "grid",
                            gridTemplateColumns: "3fr 2fr",
                            gap: "5px",
                          }}
                        >
                          <div>
                            <Typography align="left">Token</Typography>
                            <Input
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                width: "80%",
                                lineHeight: "36px ",
                                background: "#fff ",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                              }}
                              name="token"
                              onChange={(e) => { handleChange(e); handleStateUpdate(e) }}
                              onBlur={handleBlur}
                              value={values.token}
                            />
                          </div>
                          <div className="recoverPassword">
                            <a
                              href=""
                              onClick={(e: any) => {
                                e.preventDefault();
                                setRecoverPassword(true);
                              }}
                            >
                              {"Recover Password"}
                            </a>
                          </div>

                          {/* <p className="error">{errors.contactEmail}</p> */}
                        </FormControl>
                        <FormControl className="w-98">
                          <Typography align="left">
                            Password<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Input
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              width: "80%",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            name="password"
                            type="password"
                            onChange={(e) => { handleChange(e); handleStateUpdate(e) }}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.password && errors.password
                            )}
                            value={values.password}
                          />
                          <p className="error">{touched.password ? errors.password : ""}</p>
                        </FormControl>
                        <FormControl className="w-98">
                          <Typography align="left">
                            Confirm Password
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Input
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              width: "80%",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            type="password"
                            name="confirmPassword"
                            onChange={(e) => { handleChange(e); handleStateUpdate(e) }}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.confirmPassword && errors.confirmPassword
                            )}
                            value={values.confirmPassword}
                          />
                          <p className="error">{touched.confirmPassword ? errors.confirmPassword : ""}</p>
                        </FormControl>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div style={{ display: "grid", justifyContent: "center" }}>
                <Button
                  disabled={!formValid}
                  variant="contained"
                  style={{ color: "white" }}
                  onClick={(e) => {
                    handleSubmitPasswordUpdate()
                  }}
                >
                  SAVE
                </Button>
              </div>
            </>
          ) : (
            <>
              <SecurityCodeRecover setRecoverPassword={setRecoverPassword} />
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default SaveAndExit;
