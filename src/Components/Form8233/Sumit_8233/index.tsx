import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {  SubmitSchemaForm8233 } from "../../../schemas/submit";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography, Paper, Checkbox } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Form, Formik } from "formik";
import { W8_state_ECI, post8233_EForm } from "../../../Redux/Actions";
import { useDispatch } from "react-redux";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";
import { GetForm8233Pdf } from "../../../Redux/Actions/PfdActions";



const Declaration = (props: any) => {
  const { authDetails } = useAuth();
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");

  const { open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(event.target.checked);
  };

  useEffect(() => {
    document.title = "Electronic Signature Confirmation"
  }, [])

  const history = useNavigate();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const initialValue = {
    declaration: PrevStepData?.isDeclaration ? PrevStepData?.isDeclaration : false,
    IsSubmit: PrevStepData?.isConsentRecipent ? PrevStepData?.isConsentRecipent : false,
    IsSubmit_not: PrevStepData?.isNotConsentRecipent ? PrevStepData?.isNotConsentRecipent : false,
  };
  return (
    <Fragment>
      <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        <div style={{ padding: "25px" }}>
          <Paper style={{ padding: "22px" }}>
            <Formik
              initialValues={initialValue}
              validationSchema={SubmitSchemaForm8233}
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
                    post8233_EForm(
                      temp,
                      (res: any) => {
                        localStorage.setItem(
                          "PrevStepData",
                          JSON.stringify(temp)
                        );

                        resolve(res);
                        history('/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233/ThankYou_8233')
                      },
                      (err: any) => {
                        reject(err);
                      }
                    )
                  );
                })
                return returnPromise;
                // dispatch(
                //   W8_state_ECI(values, () => {
                //     history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233/ThankYou_8233");
                //   })
                // );
                // history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233/ThankYou_8233");
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
                isValid,
                setFieldValue,
                submitForm
              }) => (
                <form onSubmit={handleSubmit}>
                  {/* <form> */}
                  {
                    <Typography
                      align="left"
                      style={{
                        fontSize: "26px",
                        color: "#04506e",
                        fontWeight: "bold",
                      }}
                    >
                      Electronic Signature Confirmation
                    </Typography>
                  }
                  <Divider style={{ background: "black" }} />

                  <div>
                    <Accordion
                      expanded={expanded === "panel1"}
                      onChange={handleChangestatus("panel1")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography
                          sx={{
                            width: "100%",
                            flexShrink: 0,
                            fontSize: "20px",
                          }}
                        >
                          Electronic Submission Declaration
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Paper
                          elevation={3}
                          style={{
                            padding: "20px",
                            backgroundColor: "#d4d9d4",
                            height: "280px",
                            overflow: "auto",
                          }}
                        >
                          <Typography
                            align="left"
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "18px",
                              width: "100%",
                            }}
                          >
                            Electronic Submission Declaration
                          </Typography>

                          <Typography
                            align="left"
                            style={{ fontSize: "15px", marginTop: "13px" }}
                          >
                            <span
                              style={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Under Penalties or Perjury
                            </span>{" "}
                            you hereby declare that, pursuant to the
                            Electronic Signature in Global and National
                            Commerce Act - the E-Sign Act - Title 15 U.S.C.
                            §7001, you are declaring that you have examined
                            the information you are about to electronically
                            submit and that to the best of your knowledge and
                            belief it is true, correct and complete.
                          </Typography>

                          <Typography
                            align="left"
                            style={{ fontSize: "15px", marginTop: "13px" }}
                          >
                            Furthermore you acknowledge that you understand
                            your rights and obligations under Title 28 U.S.C.
                            §1746 governing unsworn declarations made under
                            the Penalties of Perjury.
                          </Typography>
                          <Typography
                            align="left"
                            style={{ fontSize: "15px", marginTop: "13px" }}
                          >
                            Additionally, you are certifying that you have
                            read and agreed the certification statement
                            presented through the submission process,
                            confirming that:
                          </Typography>
                          <Typography
                            align="left"
                            style={{ fontSize: "15px", marginTop: "13px" }}
                          >
                            1. You are the beneficial owner (or an authorized
                            to sign for the beneficial owner) of all the
                            income to which the form relates,
                          </Typography>
                          <Typography
                            align="left"
                            style={{ fontSize: "15px", marginTop: "13px" }}
                          >
                            2. The beneficial owner is not a U.S person.
                          </Typography>
                          <Typography
                            align="left"
                            style={{ fontSize: "15px", marginTop: "13px" }}
                          >
                            3. You are a U.S. person submitting a Form type
                            W-9
                          </Typography>

                          <Typography
                            align="left"
                            style={{
                              fontSize: "17px",
                              marginTop: "13px",
                              fontWeight: "bold",
                            }}
                          >
                            To Confirm:
                          </Typography>
                          <Typography
                            align="left"
                            style={{ fontSize: "15px" }}
                          >
                            1. You have entered your name in the box provided
                          </Typography>
                          <Typography
                            align="left"
                            style={{ fontSize: "15px" }}
                          >
                            2. Checked the{" "}
                            <span
                              style={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              "I agree with the above declaration"
                            </span>
                            and
                          </Typography>
                          <Typography
                            align="left"
                            style={{ fontSize: "15px" }}
                          >
                            3. By submitting this form you are providing
                            a legally binding self certified electronic
                            signature.
                          </Typography>

                          <Typography
                            align="left"
                            style={{ fontSize: "15px", marginTop: "13px" }}
                          >
                            On submission your details will be transmitted to
                            your previously selected withholding agent previously selected, who
                            may wish to contact you for further confirmation.
                            No data is stored within the Comply Exchange
                            Service on transfer and it is again recommended
                            that you save a copy locally for your own records.
                          </Typography>
                        </Paper>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                          <Checkbox name="declaration" value={values.declaration} onChange={handleChange} checked={values.declaration} />
                          <Typography style={{ marginTop: "9px" }}>
                            I agree with the above Declarations
                          </Typography>
                        </div>
                        {errors?.declaration && typeof errors?.declaration === 'string' && (
                          <p className="error">{errors?.declaration}</p>
                        )}
                        {/* <p className="error">{errors.declaration}</p> */}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel2"}
                      onChange={handleChangestatus("panel2")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <Typography
                          sx={{
                            width: "100%",
                            flexShrink: 0,
                            fontSize: "20px",
                          }}
                        >
                          Electronic Recipient Statement
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Paper
                          elevation={3}
                          style={{
                            padding: "20px",
                            backgroundColor: "#d4d9d4",
                          }}
                        >
                          <Divider
                            style={{ marginTop: "10px", color: "black" }}
                          />
                          <Typography
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "16px",
                              marginTop: "10px",
                            }}
                          >
                            We may be required to provide you with a Form
                            1042-S or 1099 depending on your U.S. status. In
                            order to receive this statement electronically, by
                            email or accessible through our onboarding portal
                            you must provide your consent by checking the box
                            below. If you do not provide consent a paper copy
                            will be provided. Furthermore: The statement will
                            be provided in PDF format. This consent will
                            remain in place until you withdraw your consent.
                            You may withdraw this consent at any time by
                            writing to our support centre requesting that a
                            paper copy is provided to you. If you require a
                            paper copy after giving consent you may request a
                            copy by writing to our support centre requesting
                            that a paper copy is provided to you. We reserve
                            the right to change our delivery processes and
                            should circumstances change we will contact you by
                            written notice after which time statements will be
                            provided by paper, until a further consent is
                            given by you.
                          </Typography>
                          <Divider style={{ marginBottom: "10px" }} />
                        </Paper>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                          <Checkbox name="IsSubmit"
                            value={values.IsSubmit}
                            onChange={(e) => {
                              handleChange(e);
                              setTimeout(() => { setFieldValue("IsSubmit_not", false) }, 50)
                            }}
                            checked={values.IsSubmit} />

                          <Typography style={{ marginTop: "9px" }}>
                            I give consent to receiving a recipent statement
                            electronically.
                          </Typography>

                        </div>
                        {errors?.IsSubmit && typeof errors?.IsSubmit === 'string' && (
                          <p className="error">{errors?.IsSubmit}</p>
                        )}
                        {/* <p className="error">{errors.IsSubmit}</p> */}


                        <div style={{ display: "flex", marginTop: "10px" }}>
                          <Checkbox name="IsSubmit_not" value={values.IsSubmit_not}
                            onChange={(e) => {
                              handleChange(e);
                              setTimeout(() => { setFieldValue("IsSubmit", false) }, 50)
                            }}
                            checked={values.IsSubmit_not} />
                          <Typography style={{ marginTop: "9px" }}>
                            {" "}
                            I do not give consent to receiving a recipent
                            statement electronically.
                          </Typography>
                        </div>
                        {errors?.IsSubmit_not && typeof errors?.IsSubmit_not === 'string' && (
                          <p className="error">{errors?.IsSubmit_not}</p>
                        )}
                        {/* <p className="error">{errors.IsSubmit_not}</p> */}
                      </AccordionDetails>
                    </Accordion>
                  </div>


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
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" }}
                      onClick={() => {
                        dispatch(GetForm8233Pdf(authDetails?.accountHolderId));
                      }}
                    >
                      View Form
                    </Button>

                    <Button
                      // onClick={()=>{
                      //   history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233")
                      // }}
                      disabled={
                        values.IsSubmit && (values.IsSubmit_not || values.IsSubmit)
                      }
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
                      variant="contained"
                      style={{
                        color: "white",
                        backgroundColor: "black",
                        marginTop: "10px",
                        marginBottom: "20px",
                      }}

                      onClick={() => {
                        history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission")
                      }}
                    >
                      Back
                    </Button>
                  </Typography>
                </form>
                // </Form>
              )}
            </Formik>
          </Paper>

        </div>
      </section>
    </Fragment>
  );
};

export default Declaration;
