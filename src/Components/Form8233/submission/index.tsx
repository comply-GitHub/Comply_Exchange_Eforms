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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CREATE_8233, GetHelpVideoDetails, post8233_EForm } from "../../../Redux/Actions";
import { partCertiSchema } from "../../../schemas/8233";
import { ContentCopy } from "@mui/icons-material";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import { GetForm8233Pdf } from "../../../Redux/Actions/PfdActions";
import SecurityCodeRecover from "../../Reusable/SecurityCodeRecover";
export default function Penalties() {
  const { authDetails } = useAuth();

  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const [clickCount, setClickCount] = useState(0);
  const [toolInfo, setToolInfo] = useState("");
  const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");

  const showHideRecoverSection = (data: boolean) => {
    setShowRecoverSection(data);
  }
  const toggleRecoverSection = () => {
    setShowRecoverSection(!showRecoverSection);
    setSecurityWordError("");
  };

  const initialValue = {
    signBy: PrevStepData?.signBy ? PrevStepData.signBy : "",
    enterConfirmationCode: PrevStepData?.enterConfirmationCode ? PrevStepData.enterConfirmationCode : "",
    signDate: new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }),
    confirmationOfAcceptanceWithTheAboveDeclarations: PrevStepData?.isDeclaration ? PrevStepData.isDeclaration : false,
  };


  useEffect(() => {
    document.title = "Comply Exchange"
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

  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        validateOnMount={false}
        initialValues={initialValue}
        validationSchema={partCertiSchema}
        onSubmit={(values, { setSubmitting }) => {

          if (clickCount === 0) {
            setClickCount(clickCount + 1);
          } else {
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
                post8233_EForm(
                  temp,
                  (res: any) => {
                    localStorage.setItem(
                      "PrevStepData",
                      JSON.stringify(temp)
                    );

                    resolve(res);
                    history('/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233')
                  },
                  (err: any) => {
                    reject(err);
                  }
                )
              );
            })
            return returnPromise;
            // dispatch(
            //   CREATE_8233(values, () => {
            //     history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233");
            //   })
            // );
          }
          // history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233");
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
              <>{console.log(errors, "errors")}</>
              <div className="overlay-div">
                <div className="overlay-div-group">
                  <div className="viewInstructions">View Instructions</div>
                  <div className="viewform"
                    onClick={() => {
                      dispatch(GetForm8233Pdf(authDetails?.accountHolderId));
                    }}>View Form</div>
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
              <div className="row w-100">
                <div className="col-4">
                  <div style={{ padding: "20px 0px", height: "100%" }}>
                    <BreadCrumbComponent breadCrumbCode={1450} formName={FormTypeId.F8233} />
                  </div>
                </div>
                {/* <>{console.log(errors,"errors!!!!!")}</> */}
                <div className="col-8 mt-3">
                  <div style={{ padding: "12px" }}>
                    <Paper style={{ padding: "10px" }}>
                      {obValues.uniqueIdentifier !== values.signBy ? (
                        <div style={{ backgroundColor: "#e8e1e1", padding: "10px" }}>
                          <Typography>
                            SIG101
                            <span className="mx-1">
                              <img src={Infoicon} style={{
                                color: "#ffc107", height: "22px",
                                width: "20px",
                                boxShadow: "inherit",



                                cursor: "pointer",
                                marginBottom: "3px"

                              }} />


                              You have entered an electronic signature name that is different to the one expected
                            </span>


                          </Typography>

                        </div>

                      ) : ""}
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
                            name="signBy"
                            value={values.signBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.signBy && errors.signBy)}
                          />
                          {errors?.signBy && typeof errors?.signBy === 'string' && (
                            <p className="error">{errors?.signBy}</p>
                          )}
                          {/* <p className="error">{errors.signBy}</p> */}
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
                              name="enterConfirmationCode"
                              value={values.enterConfirmationCode}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.enterConfirmationCode && errors.enterConfirmationCode
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
                            {errors?.enterConfirmationCode && typeof errors?.enterConfirmationCode === 'string' && (
                              <p className="error">{errors?.enterConfirmationCode}</p>
                            )}
                            {/* <p className="error">{errors.enterConfirmationCode}</p> */}
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

                        <SecurityCodeRecover setRecoverPassword={showHideRecoverSection} hideBack={true}></SecurityCodeRecover>
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
                              name="signDate"
                              value={values.signDate}
                              onBlur={handleBlur}
                              readOnly
                            />

                            {/* {values.signDate ?(""):<p className="error">{errors.signDate}</p>} */}
                          </Typography>
                        </div>
                      </div>

                      <Typography style={{ display: "flex" }}>
                        <Checkbox
                          name="confirmationOfAcceptanceWithTheAboveDeclarations"
                          value={values.confirmationOfAcceptanceWithTheAboveDeclarations}
                          checked={values.confirmationOfAcceptanceWithTheAboveDeclarations}
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
                          {errors?.confirmationOfAcceptanceWithTheAboveDeclarations && typeof errors?.confirmationOfAcceptanceWithTheAboveDeclarations === 'string' && (
                            <p className="error">{errors?.confirmationOfAcceptanceWithTheAboveDeclarations}</p>
                          )}
                          {/* {errors.confirmationOfAcceptanceWithTheAboveDeclarations &&
                      touched.confirmationOfAcceptanceWithTheAboveDeclarations ? (
                        <div>
                          <Typography color="error">
                            {errors.confirmationOfAcceptanceWithTheAboveDeclarations}
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
                            dispatch(post8233_EForm(
                              {
                                ...prevStepData,
                                stepName: `/${urlValue}`
                              }
                              , () => { }))
                            history(
                              GlobalValues.basePageRoute
                            );
                          })
                        }} formTypeId={FormTypeId.F8233} ></SaveAndExit>
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
