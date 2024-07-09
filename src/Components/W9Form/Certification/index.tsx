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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { W8_state_ECI, postW9Form, GetHelpVideoDetails, getW9Form } from "../../../Redux/Actions";
import { certificateSchema_w9 } from "../../../schemas/w8Exp";
import InfoIcon from "@mui/icons-material/Info";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import View_Insructions from "../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import useAuth from "../../../customHooks/useAuth";
import { GetW9Pdf } from "../../../Redux/Actions/PfdActions";
import Redirect from "../../../Router/RouterSkip";
import PopupModa from "../../../Redux/Actions/poupModal";
export default function Certifications(props: any) {
  const location = useLocation();
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const urlValue = location.pathname.substring(1);
  const [popupState, setPopupState] = useState({
    data:"",
    status:false
})
  const { authDetails } = useAuth();
  const dispatch = useDispatch();
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [canvaBx, setCanvaBx] = useState(false);
  var getReducerData = useSelector(
    (state: any) => state?.GetByW9FormReducer?.GetByW9FormData
  );
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
    dispatch(
      getW9Form(authDetails?.accountHolderId, (data: any) => {
      })
    );

  }, [authDetails])


  const history = useNavigate()
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

  var initialValue = {
    certification_CorrectTaxpayerIdentification: getReducerData?.certification_CorrectTaxpayerIdentification ?? false,
    certification_IRSBackupWithHolding: getReducerData?.certification_IRSBackupWithHolding ?? false,
    certification_FATCACode: getReducerData?.certification_FATCACode ?? false,
    certification_IRS: getReducerData?.certification_IRS ?? false,
    certification_ElectronicForm: getReducerData?.certification_ElectronicForm ?? false,
    certification_USCitizenPerson: getReducerData?.certification_USCitizenPerson ?? false,
  };
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
                          dispatch(GetW9Pdf(authDetails?.accountHolderId, (callbackData:any)=>{
                              setPopupState({
                                  status:true,
                                  data: callbackData?.pdf
                              })
                          }))
                      }} >View Form</div>
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
            <BreadCrumbComponent breadCrumbCode={1269} formName={1} />

          </div>
        </div>

        <div className="col-8 mt-3">
          <div style={{ padding: "10px" }}>
            <Paper >
              <Formik
                validateOnChange={true}
                validateOnBlur={false}
                initialValues={initialValue}
                enableReinitialize
                validationSchema={certificateSchema_w9}
                onSubmit={(values, { setSubmitting }) => {
               
                  // const submitPromise = new Promise((resolve, reject) => {
                    setSubmitting(true);
                    const new_obj = { ...PrevStepData, stepName: `/${urlValue}` }
                    const result = { ...new_obj, ...values };
                    dispatch(
                      postW9Form(result, () => {
                        localStorage.setItem("PrevStepData", JSON.stringify(result))
                        Redirect(
                          "/US_Purposes/Back/Exemption/Tax/Certificates/Penlities_W9",
                          authDetails?.agentId,
                          history,
                          false
                        );
                        // history("/US_Purposes/Back/Exemption/Tax/Certificates/Penlities_W9")
                        setSubmitting(false);
                        // resolve("");
                      },
                      (err:any)=>{
                        // reject(err);
                        setSubmitting(false);
                      })
                    );

                  // });

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
                                fontSize: "16px",
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
                              Legal certification details: This form must be signed and dated to
                              establish to the requester or withholding agent that you are a
                              U.S. person or a valid resident alien. Note that our system
                              requires an electronic signature to confirm electronic submission.
                            </Typography>

                            <Typography style={{ marginTop: "10px" }}>
                              Requirement for signature:
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              You may be requested to sign your submission by the withholding
                              agent or requester, even if indicated otherwise below. Please note
                              that this electronic forms submission process requires a valid
                              electronic signature in all cases. Signature requirements:
                              Complete the certification as indicated in 1 through 5 below.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              1. For interest, dividend, and barter exchange accounts opened
                              before 1984 and broker accounts considered active during 1983, you
                              must give your correct TIN, but you do not have to sign the
                              certification.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              2. For interest, dividend, broker, and barter exchange accounts
                              opened after 1983 and broker accounts considered inactive during
                              1983, you must sign the certification or backup withholding will
                              apply. If you are subject to backup withholding and you are only
                              providing your correct TIN to the requester, select either (i) an
                              appropriate box in 2; or (ii) box 3.
                            </Typography>

                            <Typography style={{ marginTop: "10px" }}>
                              3. For real estate transactions, you must sign the certification.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              4. Other payments. You must give your correct TIN, but you do not
                              have to sign the certification unless you have been notified that
                              you have previously given an incorrect TIN. 'Other payments'
                              include payments made in the course of the requester's trade or
                              business for rents, royalties, goods (other than bills for
                              merchandise), medical and health care services (including payments
                              to corporations), payments to a nonemployee for services, payments
                              to certain fishing boat crew members and fishermen, and gross
                              proceeds paid to attorneys (including payments to corporations).
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              5. Mortgage interest paid by you, acquisition or abandonment of
                              secured property, cancellation of debt, qualified tuition program
                              payments (under Section 529), IRA, Coverdell ESA, Archer MSA or
                              HSA contributions or distributions, and pension distributions. You
                              must give your correct TIN, but you do not have to sign the
                              certification.
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

                      <Typography
                        style={{
                          margin: "10px",
                          fontSize: "18px",
                          color: "#474747",
                          marginLeft: "10px",
                        }}
                      >
                        Under penalties of perjury, I certify that:
                      </Typography>
                      <Paper
                        style={{ marginLeft: "10px", width: "95%", backgroundColor: "#d2d6d3", marginBottom: "2rem" }}
                      >
                        <div style={{ margin: "10px" }}>
                          <Typography style={{ display: "flex" }}>
                            <Checkbox name="certification_CorrectTaxpayerIdentification"
                              value={values.certification_CorrectTaxpayerIdentification}
                              checked={values.certification_CorrectTaxpayerIdentification}
                              onChange={handleChange}
                              size="medium"
                              style={{ fontSize: "2rem", marginTop: "6px" }} />
                            <Typography className="mx-2"
                              style={{ fontSize: "14px", color: "black", marginTop: "15px", textAlign: "justify" }}
                            >
                              1. The number shown on this form is my correct taxpayer
                              identification number (or I am waiting for a number to be issued
                              to me), and
                            </Typography>
                          </Typography>
                          {errors.certification_CorrectTaxpayerIdentification && touched.certification_CorrectTaxpayerIdentification ? (
                            <div>
                              <Typography color="error">

                                {typeof errors.certification_CorrectTaxpayerIdentification === "string" ? errors.certification_CorrectTaxpayerIdentification : ""}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                          {/* <p className="error">{errors.certification_CorrectTaxpayerIdentification}</p> */}
                          <Typography style={{ display: "flex" }}>

                            <Checkbox name="certification_IRSBackupWithHolding"
                              value={values.certification_IRSBackupWithHolding}
                              checked={values.certification_IRSBackupWithHolding}
                              onChange={(e) => {
                                handleChange(e);
                                setTimeout(() => {
                                  setFieldValue("certification_IRS", false);
                                }, 50)
                              }}
                              size="medium"
                              style={{ fontSize: "2rem" }} />
                            <Typography className="mx-2"
                              style={{ fontSize: "14px", color: "black", marginTop: "1px", textAlign: "justify" }}
                            >
                              2. I am not subject to backup withholding because:(a) I am exempt
                              from backup withholding, or (b) I have not been notified by the
                              Internal Revenue Service (IRS) that I am subject to backup
                              withholding as a result of a failure to report all interest or
                              dividends, or (c) the IRS has notified me that I am no longer
                              subject to backup withholding
                            </Typography>
                          </Typography>
                          {errors.certification_IRSBackupWithHolding && touched.certification_IRSBackupWithHolding ? (
                            <div>
                              <Typography color="error">

                                {typeof errors.certification_IRSBackupWithHolding === "string" ? errors.certification_IRSBackupWithHolding : ""}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                          {/* <p className="error">{errors.certification_IRSBackupWithHolding}</p> */}
                          <Typography style={{ display: "flex" }}>
                            <Checkbox name="certification_USCitizenPerson"
                              value={values.certification_USCitizenPerson}
                              checked={values.certification_USCitizenPerson}
                              onChange={handleChange}
                              size="medium"
                              style={{ fontSize: "2rem" }} />
                            <Typography className="mx-2"
                              style={{ fontSize: "14px", color: "black", marginTop: "9px", textAlign: "justify" }}
                            >
                              3. I am a U.S. citizen or other U.S. person (See Glossary of Terms
                              for a definition of a U.S. person), and
                            </Typography>
                          </Typography>
                          {/* <p className="error">{errors.certification_USCitizenPerson}</p> */}
                          {errors.certification_USCitizenPerson && touched.certification_USCitizenPerson ? (
                            <div>
                              <Typography color="error">

                                {typeof errors.certification_USCitizenPerson === "string" ? errors.certification_USCitizenPerson : ""}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                          <Typography style={{ display: "flex" }}>
                            <Checkbox name="certification_FATCACode"
                              value={values.certification_FATCACode}
                              checked={values.certification_FATCACode}
                              onChange={handleChange}
                              size="medium"
                              style={{ fontSize: "2rem" }} />
                            <Typography className="mx-2"
                              style={{ fontSize: "14px", color: "black", marginTop: "8px", textAlign: "justify" }}
                            >
                              4. The FATCA code(s) entered on this form (if any) indicate that I
                              am exempt from FATCA reporting is correct.
                            </Typography>
                          </Typography>
                          {errors.certification_FATCACode && touched.certification_FATCACode ? (
                            <div>
                              <Typography color="error">

                                {typeof errors.certification_FATCACode === "string" ? errors.certification_FATCACode : ""}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                          {/* <p className="error">{errors.certification_FATCACode}</p> */}
                          <Typography
                            style={{
                              fontSize: "14px",
                              marginLeft: "13px",
                              textAlign: "justify",
                              color: "black",
                              marginTop: "10px",
                              marginBottom: "20px",
                            }}
                          >
                            Please check the box below if you have been notified by the IRS that
                            you are currently subject to backup withholding because you have
                            failed to report all interest and dividends on your tax return. For
                            real estate transactions, item 2 does not apply.For mortgage
                            interest paid, acquisition or abandonment of secured property,
                            cancellation of debt, contributions to an individual retirement
                            arrangement (IRA), and generally, payments other than interest and
                            dividends, you are not required to sign the Certification, but you
                            must provide your correct TIN.{" "}
                            <span style={{ fontWeight: "bold" }}>
                              (Please note e-submission through this service requires an
                              e-signature)
                            </span>
                          </Typography>
                          <Typography style={{ display: "flex" }}>
                            <Checkbox name="certification_IRS"
                              value={values.certification_IRS}
                              checked={values.certification_IRS}
                              onChange={(e) => {
                                handleChange(e);
                                setTimeout(() => {
                                  setFieldValue("certification_IRSBackupWithHolding", false);
                                }, 50);
                              }}
                              size="medium"
                              style={{ fontSize: "2rem" }} />
                            <Typography className="mx-2"
                              style={{ fontSize: "14px", color: "black", marginTop: "11px", textAlign: "justify" }}
                            >
                              I have been notified by IRS that I am currently subject to backup
                              withholding.
                            </Typography>
                          </Typography>
                          {errors.certification_IRS && touched.certification_IRS ? (
                            <div>
                              <Typography color="error">

                                {typeof errors.certification_IRS === "string" ? errors.certification_IRS : ""}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                          {/* <p className="error">{errors.certification_IRS}</p> */}
                          <Typography style={{ display: "flex" }}>
                            <Checkbox name="certification_ElectronicForm"
                              value={values.certification_ElectronicForm}
                              checked={values.certification_ElectronicForm}
                              onChange={handleChange}
                              size="medium"
                              style={{ fontSize: "2rem" }} />
                            <Typography className="mx-2"
                              style={{ fontSize: "14px", color: "black", marginTop: "11px", textAlign: "justify" }}
                            >
                              Check to confirm you have reviewed the Electronic Form
                              <span
                                style={{ color: "blue", fontSize: "14px", marginLeft: "5px", cursor: "pointer" }}
                              >
                                (View Electronic Form)
                              </span>
                            </Typography>
                          </Typography>
                          {errors.certification_ElectronicForm && touched.certification_ElectronicForm ? (
                            <div>
                              <Typography color="error">

                                {typeof errors.certification_ElectronicForm === "string" ? errors.certification_ElectronicForm : ""}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                          {/* <p className="error">{errors.certification_ElectronicForm}</p> */}
                        </div>
                      </Paper>

<>{console.log(errors,"ERRORS")}</>
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
                            const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                            const urlValue = window.location.pathname.substring(1);
                            dispatch(postW9Form(
                              {
                                ...prevStepData,
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
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={() => {
                            dispatch(GetW9Pdf(authDetails?.accountHolderId, (callbackData:any)=>{
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
                          disabled={!isValid}
                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          // onClick={() => {
                          //   submitForm().then((data) => {
                          //     history("/US_Purposes/Back/Exemption/Tax/Certificates/Penlities_W9")
                          //   }).catch((error) => {
                          //     console.log(error);
                          //   })
                          // }}
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
                          onClick={() => {
                           
                            Redirect(
                              "/Attach_document_w9",
                              authDetails?.agentId,
                              history,
                              true
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
      <PopupModa data={popupState} setPopupState={setPopupState} />
    </section>
  );
}
