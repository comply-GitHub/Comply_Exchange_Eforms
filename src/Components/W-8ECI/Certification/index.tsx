import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import {
  Typography,
  Button,
  Tooltip,
  Link,
  Accordion,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { W8_state_ECI, GetHelpVideoDetails, postW8ECI_EForm } from "../../../Redux/Actions";
import { certificateSchema } from "../../../schemas/w8ECI";
import checksolid from "../../../assets/img/check-solid.png";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import useAuth from "../../../customHooks/useAuth";
import { GetEciPdf } from "../../../Redux/Actions/PfdActions";
import Redirect from "../../../Router/RouterSkip";

export default function Certifications(props: any) {

  const { authDetails } = useAuth()
  const history = useNavigate();
  const dispatch = useDispatch();
  const [initialValue, setInitialValue] = useState({
    isBeneficialOwnerIncome: false,
    isAmountCertificationUS: false,
    isBeneficialOwnerGrossIncome: false,
    isBeneficialOwnerNotUSPerson: false,
    isAuthorizeWithHoldingAgent: false,
    isCapacityForm: false,
    isElectronicForm: false,
  });
  const [expanded, setExpanded] = React.useState<string | false>("");

  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const W8ECIData = useSelector((state: any) => state.W8ECI);
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );

  useEffect(() => {
    document.title = "Certfication I"
  }, [])

  useEffect(() => {
    setInitialValue((prev: any) => {
      return {
        ...prev,
        ...PrevStepData,
        isBeneficialOwnerIncome: W8ECIData?.isBeneficialOwnerIncome ?? false,
        isAmountCertificationUS: W8ECIData?.isAmountCertificationUS ?? false,
        isBeneficialOwnerGrossIncome: W8ECIData?.isBeneficialOwnerGrossIncome ?? false,
        isBeneficialOwnerNotUSPerson: W8ECIData?.isBeneficialOwnerNotUSPerson ?? false,
        isAuthorizeWithHoldingAgent: W8ECIData?.isAuthorizeWithHoldingAgent ?? false,
        isCapacityForm: W8ECIData?.isCapacityForm ?? false,
        isElectronicForm: W8ECIData?.isElectronicForm ?? false,
      };
    });
    dispatch(GetHelpVideoDetails());
    // dispatch(getAllStateByCountryId(258));
  }, [W8ECIData]);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [toolInfo, setToolInfo] = useState("");
  // const initialValue = {
  //   isBeneficialOwnerIncome: false,
  //   isAmountCertificationUS: false,
  //   isBeneficialOwnerGrossIncome: false,
  //   isBeneficialOwnerNotUSPerson: false,
  //   isAuthorizeWithHoldingAgent: false,
  //   isCapacityForm: false,
  //   isElectronicForm: false,
  // };
  const viewPdf = () => {
    history("/w8Eci_pdf", { replace: true });
  }

  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions">View Instructions</div>
          <div className="viewform"
            onClick={() => {
              dispatch(GetEciPdf(authDetails?.accountHolderId))
            }}
          >View Form</div>
          <div className="helpvideo">
            {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
            {GethelpData && GethelpData[5].id === 7 ? (
              <a
                href={GethelpData[5].fieldValue}
                target="popup"
                onClick={() =>
                  window.open(
                    GethelpData[5].fieldValue,
                    'name',
                    `width=${GethelpData[5].width},height=${GethelpData[5].height},top=${GethelpData[5].top},left=${GethelpData[5].left}`
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
            <BreadCrumbComponent breadCrumbCode={1300} formName={4} />
          </div>
        </div>
        <div className="col-8 mt-3">
          <div style={{ padding: "12px" }}>
            <Paper style={{ padding: "18px" }}>
              <Formik
                validateOnChange={true}
                validateOnMount={true}
                validateOnBlur={true}
                initialValues={initialValue}
                enableReinitialize
                validationSchema={certificateSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  let temp = {
                    ...PrevStepData,
                    ...values,
                    agentId: authDetails?.agentId,
                    accountHolderBasicDetailId: authDetails?.accountHolderId,
                  };
                  const returnPromise = new Promise((resolve, reject) => {
                    dispatch(
                      postW8ECI_EForm(
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
                  // console.log(values, "vallllll");
                  //   dispatch(
                  //     W8_state_ECI(values, () => {
                  //       history("/W-8ECI/Certification/Participation");
                  //     })
                  //   );
                  //   history("/W-8ECI/Certification/Participation");
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
                  submitForm,
                  isValid
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <>{console.log("values", values)}</>
                    <>{console.log("errors", errors)}</>
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
                      <span style={{ color: "red" }}>*</span>
                      <span>
                        <Tooltip
                          style={{ backgroundColor: "black", color: "white" }}
                          title={
                            <>
                              <Typography color="inherit">
                                TT-282 W-8ECI-General
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
                              fontSize: "13px",
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
                            EH049: You have selected to submit a form W-8ECI to
                            claim that the person, business or organization
                            represented by the form is a foreign person and the
                            beneficial owner of U.S. sourced income that is (or is
                            deemed to be) effectively connected with the conduct of
                            a trade or business within the United States.
                          </Typography>

                          <Typography style={{ marginTop: "10px" }}>
                            If this is not correct you must go back and change your
                            selection.
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            Please check the information and change where
                            appropriate. On completion this information will be
                            presented as a pdf image, which you can save locally or
                            print off.
                          </Typography>

                          <Link
                            href="#"
                            underline="none"
                            style={{ marginTop: "10px", fontSize: "16px",color: "#0000C7" }}
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
                        fontSize: "14px",
                        color: "grey",
                        marginLeft: "10px",
                      }}
                    >
                      I certify that (Check All).{" "}
                      <span style={{ fontWeight: "550" }}>
                        Checking the box signifies you have read the statement, even
                        if it does not directly apply.
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        margin: "10px",
                        fontSize: "14px",
                        color: "grey",
                        marginLeft: "10px",
                        textAlign: "justify"
                      }}
                    >
                      Under penalties of perjury, I declare that I have examined the
                      information on this form and to the best of my knowledge and
                      belief it is true, correct, and complete. I further certify
                      under penalties of perjury that:
                    </Typography>

                    <Paper
                      style={{
                        marginLeft: "10px",
                        width: "96%",
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
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "10px",
                              textAlign: "justify"
                            }}
                          >
                            I am the beneficial owner (or I am authorized to sign
                            for the beneficial owner) of all the payments to which
                            this form relates,
                          </Typography>
                        </Typography>
                        <p className="error">{errors.isBeneficialOwnerIncome}</p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isAmountCertificationUS"
                            value={values.isAmountCertificationUS}
                            checked={values.isAmountCertificationUS}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                              textAlign: "justify"
                            }}
                          >
                            The amounts for which this certification is provided are
                            effectively connected with the conduct of a trade or
                            business in the United States,
                          </Typography>
                        </Typography>
                        <p className="error">{errors.isAmountCertificationUS}</p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isBeneficialOwnerGrossIncome"
                            value={values.isBeneficialOwnerGrossIncome}
                            checked={values.isBeneficialOwnerGrossIncome}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                              textAlign: "justify"
                            }}
                          >
                            The income for which this form was provided is
                            includible in my gross income (or the beneficial owner’s
                            gross income) for the taxable year,
                          </Typography>
                        </Typography>
                        <p className="error">{errors.isBeneficialOwnerGrossIncome}</p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isBeneficialOwnerNotUSPerson"
                            value={values.isBeneficialOwnerNotUSPerson}
                            checked={values.isBeneficialOwnerNotUSPerson}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                            }}
                          >
                            The beneficial owner is not a U.S. person.
                          </Typography>
                        </Typography>
                        <p className="error">{errors.isBeneficialOwnerNotUSPerson}</p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isAuthorizeWithHoldingAgent"
                            value={values.isAuthorizeWithHoldingAgent}
                            checked={values.isAuthorizeWithHoldingAgent}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                              textAlign: "justify"
                            }}
                          >
                            Furthermore, I authorize this form to be provided to any
                            withholding agent that has control, receipt, or custody
                            of the payments of which I am the beneficial owner or
                            any withholding agent that can disburse or make payments
                            of the amounts of which I am the beneficial owner
                          </Typography>
                        </Typography>
                        <p className="error">{errors.isAuthorizeWithHoldingAgent}</p>
                        <Divider
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "black",
                          }}
                        />
                        <Typography style={{ display: "flex" }}>
                          <Checkbox
                            name="isCapacityForm"
                            value={values.isCapacityForm}
                            checked={values.isCapacityForm}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                              textAlign: "justify"
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              I certify that I have the capacity to sign for the
                              entity identified on line 1 of this form.
                            </span>
                          </Typography>
                        </Typography>
                        <p className="error">{errors.isCapacityForm}</p>
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
                            name="isElectronicForm"
                            value={values.isElectronicForm}
                            checked={values.isElectronicForm}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }}
                          />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "7px",
                            }}
                          >
                            Check to confirm you have reviewed the Electronic Form
                            <Link
                              onClick={() => {
                                history("/w8Eci_pdf");
                              }}
                              style={{
                                color: "blue",
                                cursor: "pointer",
                                fontSize: "16px",
                                marginLeft: "5px",
                              }}
                            >
                              (view Electronic Form)
                            </Link>
                          </Typography>
                        </Typography>
                        <p className="error">{errors.isElectronicForm}</p>

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
                      <SaveAndExit Callback={() => {
                        submitForm().then(() => {
                          const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                          const urlValue = window.location.pathname.substring(1);
                          dispatch(postW8ECI_EForm(
                            {
                              ...prevStepData,
                              ...values,
                              stepName: `/${urlValue}`
                            }
                            , () => { }))
                          history(
                            GlobalValues.basePageRoute
                          );
                        })
                      }} formTypeId={FormTypeId.W8ECI} />
                      <Button
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                        onClick={() => {
                          dispatch(GetEciPdf(authDetails?.accountHolderId))
                        }}
                      >
                        View form
                      </Button>
                      <Button
                        disabled={!isValid}
                        onClick={() => {
                          submitForm()
                            .then((data) => {
                              Redirect("/W-8ECI/Certification/Participation",authDetails?.agentId,history,false)
                              // history(
                              //   "/W-8ECI/Certification/Participation"
                              // );
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
                          Redirect("/W-8ECI/Certification/Participation",authDetails?.agentId,history,true)
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
