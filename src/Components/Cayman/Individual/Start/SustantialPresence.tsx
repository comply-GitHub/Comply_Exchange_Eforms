import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import {
  FormControl,
  Typography,
  Button,
  Tooltip,
  Accordion,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Link,
  Input,
  Paper,
  Checkbox,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import PopupModa from "../../../../Redux/Actions/poupModal";
import { GetHelpVideoDetails, postSCIndividualEForm } from "../../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../../customHooks/useAuth";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import { SubstantialSchema } from "../../../../schemas/8233";
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import { error } from "console";
import View_Insructions from "../../../viewInstruction";
import { GetCaymanIndividualPdf } from "../../../../Redux/Actions/PfdActions";

export default function Presence(props: any) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { authDetails } = useAuth();
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const W8BENData = useSelector((state: any) => state.w8Ben);
  const [toolInfo, setToolInfo] = useState("");
  const [expanded, setExpanded] = React.useState<string | false>("");


  const [totalQualifyingDays, setTotalQualifyingDays] = useState(0 || PrevStepData.totalQualifyingDays);
  const calculateTotalQualifyingDays = (values: any) => {
    const total =
      parseFloat(values.daysAvailableInThisYear) +
      (parseFloat(values.daysAvailableIn_OneYearbefore) * 0.34) +
      (parseFloat(values.daysAvailableIn_TwoYearbefore) * 0.17);
    setTotalQualifyingDays(Math.ceil(total));
  };
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  useEffect(() => {

    if (isNaN(totalQualifyingDays) || totalQualifyingDays === undefined) {

      setTotalQualifyingDays(0);
    }

  }, [totalQualifyingDays]);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


  useEffect(() => {
    dispatch(GetHelpVideoDetails());
  }, [])

  const [popupState, setPopupState] = useState({
    data:"",
    status:false
})
  useEffect(() => {
    document.title = "Steps | Substantial Presence Test"
  }, [])

  const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }

  const viewPdf = () => {
    history("w9_pdf");
  }


  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      initialValues={{
        daysAvailableInThisYear: PrevStepData?.daysAvailableInThisYear,
        daysAvailableIn_OneYearbefore: PrevStepData?.daysAvailableIn_OneYearbefore,
        daysAvailableIn_TwoYearbefore: PrevStepData?.daysAvailableIn_TwoYearbefore,
      }}
      enableReinitialize
      validationSchema={SubstantialSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        const temp = {
          agentId: authDetails.agentId,
          accountHolderBasicDetailId: authDetails.accountHolderId,
          ...PrevStepData,
          ...values,
          totalQualifyingDays,
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
                history('/Cayman/Individual/start/US_Tin')
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
        submitForm,
        validateForm,
        isValid
      }) => (
        <Form onSubmit={handleSubmit}>
          <section
            className="inner_content"
            style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
          >

            <View_Insructions canvaBx={canvaBx} handleCanvaClose={handleCanvaClose} />
            {canvaBx === true ? (<div className="offcanvas-backdrop fade show" onClick={() => { handleCanvaClose() }}></div>) : null}

            <div className="overlay-div">
              <div className="overlay-div-group">
                <div className="viewInstructions" onClick={() => { handleCanvaOpen(); }}>View Instructions</div>
                <div className="viewform" onClick={(e) => {
                   dispatch(GetCaymanIndividualPdf(authDetails?.accountHolderId, (callbackData:any)=>{
                    setPopupState({
                        status:true,
                        data: callbackData?.pdf
                    })
                }))
                }}>View Form</div>
                <div className="helpvideo">

                  {GethelpData && GethelpData[9].id === 12 ? (
                    <a
                      href={GethelpData[9].fieldValue}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the default anchor behavior
                        window.open(
                          GethelpData[9].fieldValue,
                          'popupWindow',
                          `width=${GethelpData[9].width},height=${GethelpData[9].height},top=${GethelpData[9].top},left=${GethelpData[9].left}`
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
            <div className="row w-100">
              <div className="col-4">
                <div style={{ padding: "20px 0px", height: "100%" }}>
                  <BreadCrumbComponent breadCrumbCode={1310} formName={FormTypeId.CaymanIndividual} />
                </div>
              </div>
              <div className="col-8 mt-3">
                <div style={{ padding: "13px" }}>
                  <Paper style={{ padding: "10px" }}>
                    <Typography
                      align="left"
                      style={{
                        margin: "10px",
                        fontSize: "27px",
                        fontWeight: "550",
                        marginLeft: "16px",
                      }}
                    >
                      The Substantial Presence Test for U.S. Tax Purposes
                      <span>
                        <Tooltip
                          style={{ backgroundColor: "black", color: "white" }}
                          title={
                            <>
                              <Typography color="inherit">
                                TT-148 Substantial Presence Test
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
                            EH029: To pass the Substantial Presence Test you must
                            pass both the 31-day and 183-day tests, calculated on
                            the number of qualifying days present in the U.S. over
                            the last 3 years.
                          </Typography>

                          <Typography style={{ marginTop: "10px" }}>
                            Enter the number of qualifying days for each year in the
                            box provided. They system will calculate if you pass
                            this test.
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            In the event you do pass this test you may need to
                            submit a Form W-9.
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            For a list of exemptions please see more help.
                            Exceptions
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            Do not count days of presence in the U.S. during which:
                            <ul>
                              <li>
                                you are a commuter from a residence in Canada or
                                Mexico;
                              </li>
                              <li>
                                you are in the U.S. less than 24 hours in transit;
                              </li>
                              <li>
                                you are unable to leave the U.S. due to a medical
                                condition that developed in the U.S.;
                              </li>
                              <li>you are an exempt individual;</li>
                              <li>
                                you are a regular member of the crew of a foreign
                                vessel traveling between the U.S. and a foreign
                                country or a possession of the U.S. (unless you are
                                otherwise engaged in conducting a trade or business
                                in the U.S.)
                              </li>
                            </ul>
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            Definition of Exempt Individual
                            <Typography style={{ marginTop: "10px" }}>
                              Foreign Government Related Individual
                              <ul>
                                <li>Employee of Foreign Government</li>
                                <li>Employee of International Organization</li>
                                <li>Usually on A or G visa;</li>
                              </ul>
                            </Typography>
                          </Typography>

                          <Typography style={{ marginTop: "10px" }}>
                            Teacher, Professor, Trainee, Researcher on J or Q visa;
                            <ul>
                              <li>Does NOT include students on J or Q visas;</li>
                              <li>
                                Does include any alien on a J or Q visa who is not a
                                student (physicians, au pairs, summer camp workers,
                                etc.);
                              </li>
                              <li>
                                must wait 2 years before counting 183 days; however
                                if the J or Q alien has been present in the U.S.
                                during any part of 2 of the prior 6 calendar years
                                in F, J, M, or Q status, then he is not an exempt
                                individual for the current year, and he must count
                                days in the current year toward the substantial
                                presence test;
                              </li>
                              <li>
                                Quality of being an Exempt Individual applies also
                                to spouse and child on J-2 or Q-3 visa;
                              </li>
                            </ul>
                          </Typography>

                          <Typography style={{ marginTop: "10px" }}>
                            Student on F, J, M or Q visa;
                            <ul>
                              <li>
                                must wait 5 calendar years before counting 183 days;
                              </li>
                              <li>
                                the 5 calendar years need not be consecutive; and
                                once a cumulative total of 5 calendar years is
                                reached during the student’s lifetime after 1984 he
                                may never be an exempt individual as a student ever
                                again during his lifetime;
                              </li>

                              <li>
                                Quality of being an Exempt Individual applies also
                                to spouse and child on F-2, J-2, M-2, or Q-3 visa;
                              </li>
                            </ul>
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            Professional athlete temporarily present in United
                            States to compete in a CHARITABLE sports event.
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
                    <div style={{ margin: "20px" }} className="col-12">
                      <div className="col-12"
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <Typography className="col-10" style={{ fontSize: "17px", marginTop: "10px" }}>
                          How many days has the Individual been in the U.S. in the
                          current year ? <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <FormControl className="col-4">
                          <Input
                            type="number"
                            name="daysAvailableInThisYear"
                            value={values.daysAvailableInThisYear}
                            // onBlur={handleBlur}
                            error={Boolean(
                              errors.daysAvailableInThisYear
                            )}
                            onChange={(e) => {
                              handleChange(e);
                              calculateTotalQualifyingDays({
                                ...values,
                                daysAvailableInThisYear: e.target.value,
                              });
                            }}
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "black",

                              height: "50px",
                              width: "30%",
                            }}
                          />

                          {/* <p className="error">{errors.DaysInCurrentYear}</p> */}
                          {errors?.daysAvailableInThisYear && typeof errors?.daysAvailableInThisYear === 'string' && (
                            <p className="error">{errors?.daysAvailableInThisYear}</p>
                          )}

                        </FormControl>
                      </div>
                    </div>
                    <div style={{ margin: "20px" }} className="col-12">
                      <div className="col-12"
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <Typography className="col-10" style={{ fontSize: "17px", marginTop: "10px" }}>
                          How many days has the Individual been in the first year
                          before the current year ?
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <FormControl className="col-4">
                          <Input
                            type="text"
                            name="daysAvailableIn_OneYearbefore"
                            value={values.daysAvailableIn_OneYearbefore}
                            // onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e);
                              calculateTotalQualifyingDays({
                                ...values,
                                daysAvailableIn_OneYearbefore: e.target.value,
                              });
                            }}
                            error={Boolean(
                              //  touched.daysAvailableIn_OneYearbefore &&
                              errors.daysAvailableIn_OneYearbefore
                            )}
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "black",
                              height: "50px",
                              width: "30%",
                            }}
                          />
                          {errors?.daysAvailableIn_OneYearbefore && typeof errors?.daysAvailableIn_OneYearbefore === 'string' && (
                            <p className="error">{errors?.daysAvailableIn_OneYearbefore}</p>
                          )}
                        </FormControl>
                      </div>
                    </div>
                    <div style={{ margin: "20px" }} className="col-12">
                      <div className="col-12"
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <Typography className="col-10" style={{ fontSize: "17px", marginTop: "10px" }}>
                          How many days has the Individual been in the second year
                          before the current year ?{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <FormControl className="col-4">
                          <Input
                            type="text"
                            name="daysAvailableIn_TwoYearbefore"
                            value={values.daysAvailableIn_TwoYearbefore}
                            // onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e);
                              calculateTotalQualifyingDays({
                                ...values,
                                daysAvailableIn_TwoYearbefore: e.target.value,
                              });
                            }}
                            error={Boolean(
                              // touched.daysAvailableIn_TwoYearbefore &&
                              errors.daysAvailableIn_TwoYearbefore
                            )}
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "black",
                              height: "50px",
                              width: "30%",
                            }}
                          />
                          {errors?.daysAvailableIn_TwoYearbefore && typeof errors?.daysAvailableIn_TwoYearbefore === 'string' && (
                            <p className="error">{errors?.daysAvailableIn_TwoYearbefore}</p>
                          )}
                        </FormControl>
                      </div>
                    </div>
                    <div style={{ margin: "20px" }} className="col-12">
                      <div className="col-12"
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <Typography className="col-10" style={{ fontSize: "17px", marginTop: "10px" }}>
                          Substantial Presence Test for U.S. tax purposes total
                          qualifying days:
                        </Typography>
                        <FormControl className="col-4">
                          <Input
                            type="text"
                            name="TotalQualifyingDays"
                            value={totalQualifyingDays}
                            style={{
                              backgroundColor: "#F3F3F0",
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "black",
                              height: "50px",
                              width: "30%",
                            }}
                          />
                        </FormControl>
                      </div>
                    </div>

                    {totalQualifyingDays <= 183 ? (
                      <div style={{ margin: "20px", marginTop: "2rem" }}>
                        <Paper
                          elevation={0}
                          style={{
                            padding: "18px",
                            backgroundColor: "#d6d6d6",
                            fontSize: "17px",
                          }}
                        >
                          Since the total number of qualifying days does not exceed 183, calculated over the last 3 year period. It is unlikely that the individual is considered a US resident for tax purposes for this current year.
                        </Paper>
                      </div>
                    ) : (
                      <div style={{ margin: "20px", marginTop: "2rem" }}>
                        <Paper
                          elevation={0}
                          style={{
                            padding: "18px",
                            backgroundColor: "#d6d6d6",
                            fontSize: "17px",
                          }}
                        >
                          <Typography>
                            Since the total number of qualifying days exceeds 183, calculated over the last 3 year period, it is likely that the individual is considered a US resident for tax purposes for this current year.
                          </Typography>
                          <Typography className="mt-3">
                            Please check the entries made confirming the number of days entered are considered "qualifying" days. See help or the IRS guidance for further information on what is considered a qualifying day. If you are still considered to have passed the Substantial Presence Test you may need to go back and change the classification for US tax purposes. If you continue through the submission process your agent may need to contact you for additional information.
                          </Typography>
                        </Paper>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "80px",
                      }}
                    >
                      {/* <Button variant="contained" style={{ color: "white" }}>
                    SAVE & EXIT
                  </Button> */}
                      <SaveAndExit Callback={() => {
                        submitForm().then((data) => {
                          const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                          const urlValue = window.location.pathname.substring(1);
                          dispatch(postSCIndividualEForm(
                            {
                              ...values,
                              ...prevStepData,
                              stepName: `/${urlValue}`
                            }
                            , () => { }))
                          history(GlobalValues.basePageRoute)
                        }).catch((err) => {
                          console.log(err);
                        })
                      }} formTypeId={FormTypeId.CaymanIndividual} />
                      <Button
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                        onClick={(e) => {
                          dispatch(GetCaymanIndividualPdf(authDetails?.accountHolderId, (callbackData:any)=>{
                            setPopupState({
                                status:true,
                                data: callbackData?.pdf
                            })
                        }))
                        }}
                      >
                        View Form
                      </Button>
                      <Button
                        disabled={
                          (values.daysAvailableInThisYear && values.daysAvailableIn_OneYearbefore && values.daysAvailableIn_TwoYearbefore ? false : true)
                        }
                        onClick={async () => {
                          validateForm().then(() => {
                            submitForm().then((data) => {
                              history('/Cayman/Individual/Start/US_Tin')

                            }).catch((err) => {
                              console.log(err);
                            })
                          })


                        }}

                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                      // type="submit"
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
                          history("/Cayman/Individual/Start")
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
          <PopupModa data={popupState} setPopupState={setPopupState} />
        </Form>
      )}
    </Formik>
  );
}
