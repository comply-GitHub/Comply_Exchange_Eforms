import React, { useState, useEffect } from "react";
import {
  FormControl,
  Typography,
  Button,
  Tooltip,
  Link,
  Input,
  Divider,
  Paper,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { Form, Formik } from "formik";
import {
  W8_state_ECI,
  GetHelpVideoDetails,
  postW8BEN_EForm,
} from "../../../../../Redux/Actions";
import { certificateSchema } from "../../../../../schemas/w8BenE";
import checksolid from "../../../../../assets/img/check-solid.png";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import GlobalValues from "../../../../../Utils/constVals";
import SaveAndExit from "../../../../Reusable/SaveAndExit/Index";
import useAuth from "../../../../../customHooks/useAuth";
export default function Certifications(props: any) {
  const { authDetails } = useAuth();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [toolInfo, setToolInfo] = useState("");
  const [expanded, setExpanded] = React.useState<string | false>("");

  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const W8BENEData = useSelector((state: any) => state.W8BENE);

  const [initialValue, setInitialValue] = useState({
    isBeneficialOwnerIncome: false,
    isPersonNameNotUSPerson: false,
    isIncomeFormRelated: false,
    isAuthorizedForm: false,
    isBrokerTransactions: false,
    isAgree30DaysCertififcation: false,
    isCertifyCapacitySign: false,
    isConfirmElectronicForm: false,
  });

  useEffect(() => {
    setInitialValue((prev: any) => {
      return {
        ...prev,
        ...PrevStepData,
        ...(W8BENEData ? W8BENEData : {}),
      };
    });
    dispatch(GetHelpVideoDetails());
  }, []);

  const viewPdf = () => {
    history("/w8BenE_pdf", { replace: true });
  }

  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
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
            {GethelpData && GethelpData[8].id === 10 ? (
              <a
                href={GethelpData[8].fieldValue}
                target="popup"
                onClick={() =>
                  window.open(
                    GethelpData[8].fieldValue,
                    "name",
                    `width=${GethelpData[8].width},height=${GethelpData[8].height},top=${GethelpData[8].top},left=${GethelpData[8].left}`
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
      <div className="row w-100 ">
        <div className="col-4">
          <div style={{ padding: "20px 0px", height: "100%" }}>
            <BreadCrumbComponent breadCrumbCode={1282} formName={3} />
          </div>
        </div>
        <div className="col-8 mt-3">
          <div style={{ padding: "14px" }}>
            <Formik
              validateOnChange={true}
              validateOnBlur={true}
              validateOnMount={true}
              initialValues={initialValue}
              enableReinitialize
              validationSchema={certificateSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log(values, "vallllll");
                let temp = {
                  ...PrevStepData,
                  ...values,
                  agentId: authDetails?.agentId,
                  accountHolderBasicDetailId: authDetails?.accountHolderId,
                };
                const returnPromise = new Promise((resolve, reject) => {
                  dispatch(
                    postW8BEN_EForm(
                      temp,
                      (res: any) => {
                        localStorage.setItem(
                          "PrevStepData",
                          JSON.stringify(temp)
                        );

                        resolve(res);
                      },
                      (err: any) => {
                        reject(err);
                      }
                    )
                  );
                });
                return returnPromise;
                // dispatch(
                //   W8_state_ECI(values, () => {
                //     history(
                //       "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE/Participation_BenE"
                //     );
                //   })
                // );
              }}
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
                <Form onSubmit={handleSubmit} >
                  {(() => {
                    console.log(values, "values");
                    return <></>;
                  })()}
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
                              fontSize: "14px",
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
                            You have selected to submit a form W-8BEN to claim
                            that the person, business or organization
                            represented by the form is a beneficial owner solely
                            claiming foreign status or treaty benefits. If this
                            is not correct you must go back and change your
                            selection.
                          </Typography>

                          <Typography style={{ marginTop: "10px" }}>
                            Please check the information and change where
                            appropriate. On completion this information will be
                            transferred to an image (pdf) of the standard
                            official form.
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            Enter your U.S. or non-U.S. (i.e. Foreign) taxpayer
                            identification number along with the U.S. TIN Type
                            and foreign country correlating to such Foreign TIN.
                            An individual's U.S. TIN type is generally a Social
                            Security Number (SSN) or an Individual Tax
                            Identification Number (ITIN). An entity's U.S. TIN
                            may be an employer identification number (EIN),
                            including a withholding foreign partnership/trust
                            EIN (WP/T-EIN) or a qualified intermediary EIN
                            (QI-EIN). A U.S. TIN must be furnished on U.S. tax
                            returns when filed or when claiming treaty benefits.
                            A U.S. TIN must be on a withholding certificate
                            (i.e. W-8) if the beneficial owner is receiving
                            effectively connected income (ECI), claiming tax
                            treaty benefits (other than for income from
                            marketable, actively traded, securities), claiming
                            an exemption for ECI or claiming an exemption for
                            certain annuities. If you are required to have a
                            U.S. TIN but do not you may apply for an EIN on Form
                            SS-4, Application for Employer Identification
                            Number, a SSN on Form SS-5, Application for a Social
                            Security Card or an ITIN on Form W-7, IRS
                            Application for Individual Taxpayer Identification
                            Number.
                          </Typography>

                          <Link
                            href="#"
                            underline="none"
                            style={{ marginTop: "10px", fontSize: "16px" , color: "blue"}}
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
                        fontSize: "17px",
                        color: "grey",
                        marginLeft: "10px",
                      }}
                    >
                      I certify that (Check All).{" "}
                      <span style={{ fontWeight: "550" }}>
                        Checking the box signifies you have read the statement,
                        even if it does not directly apply.
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        margin: "10px",
                        fontSize: "14px",
                        color: "grey",
                        marginLeft: "10px",
                        textAlign: "justify",
                      }}
                    >
                      Under penalties of perjury, I declare that I have examined
                      the information on this form and to the best of my
                      knowledge and belief it is true, correct, and complete. I
                      further certify under penalties of perjury that:
                    </Typography>

                    <Paper
                      style={{
                        marginLeft: "10px",
                        width: "97%",
                        backgroundColor: "#d2d6d3",
                      }}
                    >
                      <div style={{ margin: "10px" }}>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isBeneficialOwnerIncome"
                            value={values.isBeneficialOwnerIncome}
                            checked={values.isBeneficialOwnerIncome}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                            className="mx-2"
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "10px",
                              textAlign: "justify",
                            }}
                          >
                            1. I am the individual that is the beneficial owner
                            (or am authorized to sign for the individual that is
                            the beneficial owner) of all the income to which
                            this form relates or am using this form to document
                            myself as an individual that is an owner or account
                            holder of a foreign financial institution
                          </Typography>
                        </Typography>
                        <p className="error">
                          {errors.isBeneficialOwnerIncome}
                        </p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isPersonNameNotUSPerson"
                            value={values.isPersonNameNotUSPerson}
                            checked={values.isPersonNameNotUSPerson}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                            className="mx-2"
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                              textAlign: "justify",
                            }}
                          >
                            2. The person named on line 1 of this form is not a
                            U.S. person,
                          </Typography>
                        </Typography>
                        <p className="error">
                          {errors.isPersonNameNotUSPerson}
                        </p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isIncomeFormRelated"
                            value={values.isIncomeFormRelated}
                            checked={values.isIncomeFormRelated}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                            className="mx-2"
                          />
                          <Typography
                            style={{
                              fontSize: "17px",
                              color: "black",
                              marginTop: "7px",
                            }}
                          >
                            3. The income to which this form relates is:
                          </Typography>
                        </Typography>

                        <div
                          style={{
                            marginLeft: "60px",
                            fontSize: "14px",
                            textAlign: "justify",
                          }}
                        >
                          <li>
                            (a) not effectively connected with the conduct of a
                            trade or business in the United States,
                          </li>
                          <li>
                            (b) effectively connected but is not subject to tax
                            under an applicable income tax treaty, or
                          </li>
                          <li>
                            (c) the partner's share of a partnership's
                            effectively connected income or,
                          </li>
                          <li>
                            (d) the partner’s amount realized from the transfer
                            of a partnership interest subject to withholding
                            under section 1446(f)
                          </li>
                        </div>
                        <p className="error">{errors.isIncomeFormRelated}</p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isAuthorizedForm"
                            value={values.isAuthorizedForm}
                            checked={values.isAuthorizedForm}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                            className="mx-2"
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                              textAlign: "justify",
                            }}
                          >
                            4. The person named on line 1 of this form is a
                            resident of the treaty country listed on line 9 of
                            the form (if any) within the meaning of the income
                            tax treaty between the United States and that
                            country, and
                          </Typography>
                        </Typography>
                        <p className="error">{errors.isAuthorizedForm}</p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isBrokerTransactions"
                            value={values.isBrokerTransactions}
                            checked={values.isBrokerTransactions}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                            className="mx-2"
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                              textAlign: "justify",
                            }}
                          >
                            5. For broker transactions or barter exchanges, the
                            beneficial owner is an exempt foreign person as
                            defined in the instructions.
                          </Typography>
                        </Typography>
                        <p className="error">{errors.isBrokerTransactions}</p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isAgree30DaysCertififcation"
                            value={values.isAgree30DaysCertififcation}
                            checked={values.isAgree30DaysCertififcation}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                            className="mx-2"
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                              textAlign: "justify",
                            }}
                          >
                            Furthermore, I authorize this form to be provided to
                            any withholding agent that has control, receipt, or
                            custody of the income of which I am the beneficial
                            owner or any withholding agent that can disburse or
                            make payments of the income of which I am the
                            beneficial owner.
                            <span style={{ fontWeight: "bold" }}>
                              I agree that I will submit a new form within 30
                              days if any certification made on this form
                              becomes incorrect.
                            </span>
                          </Typography>
                        </Typography>
                        <p className="error">
                          {errors.isAgree30DaysCertififcation}
                        </p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />

                        <Typography
                          style={{
                            fontSize: "14px",
                            color: "black",
                            marginTop: "10px",
                            marginBottom: "20px",
                          }}
                        ></Typography>
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isCertifyCapacitySign"
                            value={values.isCertifyCapacitySign}
                            checked={values.isCertifyCapacitySign}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                            className="mx-2"
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                            }}
                          >
                            I have been notified by IRS that I am currently
                            subject to backup withholding.
                          </Typography>
                        </Typography>
                        <p className="error">{errors.isCertifyCapacitySign}</p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isConfirmElectronicForm"
                            value={values.isConfirmElectronicForm}
                            checked={values.isConfirmElectronicForm}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                            className="mx-2"
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                            }}
                          >
                            Check to confirm you have reviewed the Electronic
                            Form
                            <Link
                              onClick={() => {
                                history("/w8BenE_pdf");
                              }}
                              style={{
                                color: "blue",
                                fontSize: "16px",
                                marginLeft: "5px",
                              }}
                            >
                              (view Electronic Form)
                            </Link>
                          </Typography>
                        </Typography>
                        <p className="error">
                          {errors.isConfirmElectronicForm}
                        </p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                      </div>
                    </Paper>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "40px",
                      }}
                    >
                      {/* <Button
                        variant="contained"
                        style={{ color: "white" }}
                        onClick={() => {
                          submitForm()
                            .then((data) => {
                              const prevStepData = JSON.parse(
                                localStorage.getItem("PrevStepData") || "{}"
                              );
                              const urlValue =
                                window.location.pathname.substring(1);
                              dispatch(
                                postW8BEN_EForm(
                                  {
                                    ...prevStepData,
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
                            });
                        }}
                      >
                        SAVE & EXIT
                      </Button> */}
                      <SaveAndExit
                        formTypeId={3}
                        Callback={() => {
                          submitForm()
                            .then((data) => {
                              const prevStepData = JSON.parse(
                                localStorage.getItem("PrevStepData") || "{}"
                              );
                              const urlValue =
                                window.location.pathname.substring(1);
                              dispatch(
                                postW8BEN_EForm(
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
                            });
                        }}

                      ></SaveAndExit>
                      <Button
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                        onClick={viewPdf}
                      >
                        View form
                      </Button>
                      <Button
                        //type="submit"
                        disabled={!isValid}
                        onClick={() => {
                          submitForm()
                            .then((data) => {
                              history(
                                "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE/Participation_BenE"
                              );
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
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
                          if (PrevStepData?.isClaimTreaty === "no" || PrevStepData?.isClaimTreaty === false) {
                            history(
                              "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E"
                            );

                          } else {
                            history(
                              "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE"
                            );
                          }
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
          </div>
        </div>
      </div>
    </section>
  );
}
