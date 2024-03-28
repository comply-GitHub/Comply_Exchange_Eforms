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
import { Form, Formik } from "formik";
import { W8_state_ECI, GetHelpVideoDetails, postW8EXPForm } from "../../../Redux/Actions";
import { certificateSchema } from "../../../schemas/w8Exp";
import checksolid from "../../../../../assets/img/check-solid.png";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
export default function Certifications(props: any) {

  const { authDetails } = useAuth()
  const history = useNavigate();

  useEffect(()=>{
    document.title = "Certfication I"
  },[])

  useEffect(() => {
    dispatch(GetHelpVideoDetails());
  }, []);

  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [toolInfo, setToolInfo] = useState("");
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [initialValue, setInitialValue] = useState({
    isBeneficialOwnerIncome: false,
    isAuthorizeWithHoldingAgent: false,
    isCapacityForm: false,
    isElectronicForm: false,
  });

  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const W8EXPData = useSelector((state: any) => state.W8EXP);

  useEffect(() => {
    setInitialValue((prev: any) => {
      return {
        ...prev,
        ...PrevStepData,
        isBeneficialOwnerIncome: W8EXPData?.isBeneficialOwnerIncome ?? false,
        isAuthorizeWithHoldingAgent: W8EXPData?.isAuthorizeWithHoldingAgent ?? false,
        isCapacityForm: W8EXPData?.isCapacityForm ?? false,
        isElectronicForm: W8EXPData?.isElectronicForm ?? false,
      };
    });
    dispatch(GetHelpVideoDetails());
    // dispatch(getAllStateByCountryId(258));
  }, [W8EXPData]);
  const dispatch = useDispatch();
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
          <div className="viewform">View Form</div>
          <div className="helpvideo">
            {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
            {GethelpData && GethelpData[6].id === 8 ? (
              <a
                href={GethelpData[6].fieldValue}
                target="popup"
                onClick={() =>
                  window.open(
                    GethelpData[6].fieldValue,
                    'name',
                    `width=${GethelpData[6].width},height=${GethelpData[6].height},top=${GethelpData[6].top},left=${GethelpData[6].left}`
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
            <BreadCrumbComponent breadCrumbCode={1296} formName={FormTypeId.W8EXP} />
          </div>
        </div>
        <div className="col-8 mt-3">
          <div style={{ padding: "15px" }}>
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
                //history("/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp");
                setSubmitting(true);
                let temp = {
                  ...PrevStepData,
                  ...values,
                  agentId: authDetails?.agentId,
                  accountHolderBasicDetailId: authDetails?.accountHolderId,
                };
                const returnPromise = new Promise((resolve, reject) => {
                  dispatch(
                    postW8EXPForm(
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
                submitForm, isValid
              }) => (
                <Form onSubmit={handleSubmit}>
                  <>{console.log(values, "values")}</>
                  <>{console.log(errors, "errors")}</>
                  <Paper style={{ padding: "15px" }}>
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
                            EH054: You have selected to submit a form W-8EXP.
                            You must supply a Form W-8EXP to your withholding agent or payer if you are a foreign government, international organization, foreign central bank of issue, foreign tax-exempt organization, foreign private foundation, of government of a U.S. possession.
                          </Typography>

                          <Typography style={{ marginTop: "10px" }}>
                            You should submit Form W-8EXP whether or not you are claiming a reduced rate of, or exemption from U.S. tax withholding. If this is not correct you must go back and change your selection.
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            Please check the information and change where appropriate.
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            On completion this information will be transferred to an image (pdf) of the standard official form
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

                    <Typography
                      style={{
                        margin: "10px",
                        fontSize: "17px",
                        color: "grey",
                        marginLeft: "10px",
                      }}
                    >
                      I certify that.{" "}
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
                      information on this form and to the best of my knowledge and belief
                      it is true, correct, and complete. I further certify under penalties
                      of perjury that:
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
                          <Checkbox name="isBeneficialOwnerIncome"
                            value={values.isBeneficialOwnerIncome}
                            checked={values.isBeneficialOwnerIncome}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }} className="mx-2" />
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              marginTop: "10px",
                              textAlign: "justify"
                            }}
                          >
                            The organization for which I am signing is the beneficial owner of the income and other payments to which this form relates,
                            <strong>and  </strong>the beneficial owner is not a U.S. person; and/or
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
                          <Checkbox name="isAuthorizeWithHoldingAgent"
                            value={values.isAuthorizeWithHoldingAgent}
                            checked={values.isAuthorizeWithHoldingAgent}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }} className="mx-2" />
                          <Typography
                            style={{ fontSize: "14px", color: "black", marginTop: "7px", textAlign: "justify" }}
                          >
                            The organization for which I am signing is a withholding qualified holder because it is a qualified holder under Regulations section 1.897(I)-1(d) or it is a partnership and all of its interests are held, directly or indirectly, by qualified holders under Regulations section 1.1445-1(g)(11).
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
                          <Checkbox name="isCapacityForm"
                            value={values.isCapacityForm}
                            checked={values.isCapacityForm}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }} className="mx-2" />
                          <Typography
                            style={{ fontSize: "14px", color: "black", marginTop: "7px", textAlign: "justify", fontWeight: "600" }}
                          >
                            I certify that I have the capacity to sign for the entity identified on line 1 of this form.
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
                        <Typography style={{ display: "flex" }}>
                          <Checkbox name="isElectronicForm"
                            value={values.isElectronicForm}
                            checked={values.isElectronicForm}
                            onChange={handleChange}
                            size="medium"
                            style={{ fontSize: "2rem" }} className="mx-2" />
                          <Typography
                            style={{ fontSize: "14px", color: "black", marginTop: "7px" }}
                          >

                            Check to confirm you have reviewed the Electronic Form
                            <Link
                              onClick={() => {
                                history("/w8Exp_pdf");
                              }}
                              style={{
                                color: "blue",
                                fontSize: "16px",
                                cursor:"pointer",
                                marginLeft: "5px",
                              }}
                            >
                              (View Electronic Form)
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
                          dispatch(postW8EXPForm(
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
                      }} formTypeId={FormTypeId.W8EXP} />
                      <Button
                       onClick={() => {
                        history("/w8Exp_pdf");
                      }}
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                      >
                        View form
                      </Button>
                      <Button
                        //type="submit"
                        disabled={!isValid}
                        onClick={() => {
                          submitForm()
                            .then((data) => {
                              history("/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp");
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
                        onClick={() => {
                          history("/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp")
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
    </section >
  );
}
