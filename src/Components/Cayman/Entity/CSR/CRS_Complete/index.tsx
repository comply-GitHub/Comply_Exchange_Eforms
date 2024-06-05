import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Input, Typography, Paper, Checkbox, Link } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox, ExpandMore } from "@mui/icons-material";
import useAuth from "../../../../../customHooks/useAuth";
import { FormTypeId } from "../../../../../Utils/constVals";
import SideBar from "../../../../Reusable/SideBar";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import { postSCFATCAClassification, postSCStepsDetails } from "../../../../../Redux/Actions";
import { GetCaymanEntityPdf } from "../../../../../Redux/Actions/PfdActions";
export default function Declaration(props: any) {

  const PrevStepData = JSON.parse(localStorage.getItem("FATCASelfCertData") || "{}");
  const PrevStepData1 = JSON.parse(localStorage.getItem("CRSSelfCertData") || "{}");
  const CRSData = localStorage.getItem("lastClickedPanelHeading");

  const fatcaData = useSelector((state: any) => state?.CaymanEntity?.FATCAClassificationData);
  const FATCAClassificationData = (fatcaData ? fatcaData : PrevStepData);

  const crsData = useSelector((state: any) => state?.CRSEntityReducer?.CRSClassificationData);
  console.log(crsData, "CRSDATA");
  const CRSClassificationData = (crsData ? crsData : PrevStepData1);
  const { authDetails } = useAuth();
  const history = useNavigate();
  const dispatch = useDispatch();
  console.log("FATCAClassificationData", CRSClassificationData);
  const [expandedState, setExpandedState] = React.useState<string | false>("panel1");
  const handleChangeAccodionState = (panel: string, panelHeading: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    if (newExpanded) {
      setExpandedState(panel);
      localStorage.setItem("clickedPanelHeading", panelHeading);
    } else {
      setExpandedState(false);
      localStorage.removeItem("clickedPanelHeading");
    }
  };
  const isContinueEnabled = expandedState !== "panel1";
  const [isAccordionVisible, setIsAccordionVisible] = useState<boolean>(false);
  const initialValue = {
    id: 0,
    // agentId: authDetails.agentId,
    // accountHolderBasiacDetailId: authDetails.accountHolderId,
    formTypeId: FormTypeId.CaymanEntity,
    formEntryId: 0,
    classificationType: "CRS",
    userType: "SC",
    fatcaSelectedHeading: FATCAClassificationData?.selectedHeading ? FATCAClassificationData?.selectedHeading : "",
    heading1: CRSClassificationData?.heading1 ? CRSClassificationData?.heading1 : "",
    subHeading1: CRSClassificationData?.subheading1 ? CRSClassificationData?.subheading1 : "",
    heading2: CRSClassificationData?.heading2 ? CRSClassificationData?.heading2 : "",
    subHeading2: CRSClassificationData?.subheading2 ? CRSClassificationData?.subheading2 : "",
    heading3: CRSClassificationData?.heading3 ? CRSClassificationData?.heading3 : "",
    subHeading3: CRSClassificationData?.subheading3 ? CRSClassificationData?.subheading3 : "",
    heading4: CRSClassificationData?.heading4 ? CRSClassificationData?.heading4 : "",
    subHeading4: CRSClassificationData?.subheading4 ? CRSClassificationData?.subheading4 : "",
    heading5: CRSClassificationData?.heading5 ? CRSClassificationData?.heading5 : "",
    subHeading5: CRSClassificationData?.subheading5 ? CRSClassificationData?.subheading5 : "",
    selectedHeading: CRSClassificationData?.selectedHeading ? CRSClassificationData?.selectedHeading : "",
    selectedSubHeading: CRSClassificationData?.selectedSubHeading ? CRSClassificationData?.selectedSubHeading : "",
    stockExchangeNameWhereTraded: PrevStepData1?.stockExchangeNameWhereTraded ? PrevStepData1?.stockExchangeNameWhereTraded : "",
    regularlyTradedCorporationName: PrevStepData1?.regularlyTradedCorporationName ? PrevStepData1?.regularlyTradedCorporationName : "",
    nonFinancialRoreignEntityQualifyingCriteria: PrevStepData1?.nonFinancialRoreignEntityQualifyingCriteria ? PrevStepData1?.nonFinancialRoreignEntityQualifyingCriteria : "",
    selectedCRSClassification: PrevStepData1?.selectedCRSClassification ? PrevStepData1?.selectedCRSClassification : "",
    typeProvidedInDomesticLaw: PrevStepData1?.typeProvidedInDomesticLaw ? PrevStepData1?.typeProvidedInDomesticLaw : "",
    nonFinancialEntityQualifyingCriteria: PrevStepData1?.nonFinancialEntityQualifyingCriteria ? PrevStepData1?.nonFinancialEntityQualifyingCriteria : "",
  };


  useEffect(() => {
    document.title = "CRS Classification"
  }, [])
  return (
    <Fragment>
      <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        <SideBar />
        <div className="row w-100">
          <div className="col-4 mt-3">

            <BreadCrumbComponent breadCrumbCode={1330} formName={FormTypeId.CaymanEntity} />
          </div>

          <div className="col-8 mt-3">

            <div style={{ padding: "11px" }}>
              <Paper style={{ padding: "10px" }}>
                <Formik
                  validateOnChange={true}
                  validateOnBlur={true}
                  initialValues={initialValue}
                  // validationSchema={SubmitSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log("values", values)
                    setSubmitting(true);
                    const result = {
                      agentId: authDetails.agentId,
                      accountHolderDetailsId: authDetails.accountHolderId,
                      ...PrevStepData,
                      ...PrevStepData1,
                      ...values,

                    };
                    const returnPromise = new Promise((resolve, reject) => {
                      dispatch(
                        postSCStepsDetails(result, (data: any) => {

                          localStorage.setItem("CRSSelfCertData", JSON.stringify(result))



                          if (values.fatcaSelectedHeading === 'Passive Non Financial Entity' || values.fatcaSelectedHeading === 'Passive NFFE') {
                            history("/Cayman/Entity/CRS/SelfCertPassive")
                          } else {
                            history("/Cayman/Entity/TIN")
                          }

                          resolve(data);


                        }
                          , (err: any) => {
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
                    submitForm,
                    isValid
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <>
                        {console.log("values", values)}
                        <div style={{ marginTop: "10px", height: "210px", backgroundColor: "#fff" }}>
                          <div style={{ justifyContent: "space-between", display: "flex", marginTop: "10px" }}>
                            <Typography
                              align="left"
                              style={{
                                fontSize: "27px",
                                color: "black",
                                fontWeight: "bold",
                                marginLeft: '10px'

                              }}
                            >
                              CRS Classification:
                            </Typography>
                            <Button
                              onClick={() => {
                                history("/Cayman/Entity/CRS/Start")

                              }}
                              style={{ backgroundColor: "#d3ae33", cursor: "pointer", color: "black", fontSize: "12px", fontWeight: "bold" }}
                            >
                              CRS Classification Guide
                            </Button>
                          </div>

                          <div style={{ marginLeft: "10px", marginTop: "10px", }}>

                            <div className="d-flex mt-3">
                              <Typography style={{ fontSize: "19px" }}>Select CRS Classification:</Typography>
                              <Link className="mx-2" onClick={() => {
                                history("/Cayman/Entity/CRS/Start")

                              }} style={{ fontSize: "19px", textDecorationLine: "none", color: "#1149c4", cursor: "pointer" }}>Click Here to start Process</Link>
                            </div>
                          </div>
                          <div className="mt-3 " style={{ marginLeft: "10px" }}>
                            <Typography style={{ fontSize: "25px", fontWeight: "540" }}>{CRSClassificationData?.clickedPanelHeading}</Typography>
                          </div>
                        </div>

                        {values.selectedHeading === "Corporation that is regularly traded or a related entity of a regularly traded corporation" && (<>
                          <Typography>
                            Provide the name of the stock exchange where traded
                          </Typography>
                          <Input
                            name="stockExchangeNameWhereTraded"
                            value={values.stockExchangeNameWhereTraded}
                            placeholder="Name of Stock Exchange"
                            onBlur={handleBlur}
                            onChange={handleChange}

                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "#121112",
                              fontStyle: "italic",
                              height: "50px",
                              width: "100%",
                            }}
                          />
                          <Typography>
                            If you are a related entity of a regularly traded corporation, provide the name of the regularly traded corporation
                          </Typography>
                          <Input
                            name="regularlyTradedCorporationName"
                            value={values.regularlyTradedCorporationName}
                            onBlur={handleBlur}
                            onChange={handleChange}

                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "#121112",
                              fontStyle: "italic",
                              height: "50px",
                              width: "100%",
                            }}
                          />
                        </>)}


                        {values.selectedHeading === "Other Active Non-Financial Entity" && (<>
                          <Typography>
                            Please indicate qualifying criteria here:
                          </Typography>
                          <Input
                            name="nonFinancialEntityQualifyingCriteria"
                            value={values.nonFinancialEntityQualifyingCriteria}
                            onBlur={handleBlur}
                            onChange={handleChange}

                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "#121112",
                              fontStyle: "italic",
                              height: "50px",
                              width: "100%",
                            }}
                          />

                        </>)}



                        {values.selectedHeading === "Investment Entity managed by another Financial Institution" && (<>
                          <Typography>
                            Please indicate qualifying criteria here:
                          </Typography>

                          <Typography>
                            <>{console.log("values", values)}</>
                            <Checkbox
                              checked={values.selectedCRSClassification == 'widelyHeldCollectiveInvestmentVehicle'}
                              value="widelyHeldCollectiveInvestmentVehicle"
                              onChange={(e) => {
                                //handleChange(e)
                                setTimeout(() => {
                                  setFieldValue("selectedCRSClassification", e.target.value)
                                }, 200)
                              }}
                              size="medium"
                              style={{ fontSize: "2rem", marginTop: "6px" }} />
                            (a) a widely-held, regulated Collective Investment Vehicle (CIV) established as a trust; OR
                          </Typography>


                          <Typography>
                            <Checkbox
                              checked={values.selectedCRSClassification == 'pensionFundEstablished'}
                              value="pensionFundEstablished"
                              onChange={(e) => {
                                //handleChange(e)
                                setTimeout(() => {
                                  setFieldValue("selectedCRSClassification", e.target.value)
                                }, 200)
                              }}
                              size="medium"
                              style={{ fontSize: "2rem", marginTop: "6px" }} />
                            (b) a a pension fund established as a trust; OR
                          </Typography>


                          <Typography>
                            <Checkbox
                              checked={values.selectedCRSClassification == 'neitherOfAbove'}
                              value="neitherOfAbove"
                              onChange={(e) => {
                                //handleChange(e)
                                setTimeout(() => {
                                  setFieldValue("selectedCRSClassification", e.target.value)
                                }, 200)
                              }}
                              size="medium"
                              style={{ fontSize: "2rem", marginTop: "6px" }} />
                            (c) Neither of the exemptions under (a) and (b) above applies, please indicate the name of the Controlling Person(s)
                          </Typography>

                        </>)}


                        {values.selectedHeading === "Other Entity defined under the domestic law as low risk of being used to evade tax" && (<>
                          <Typography>
                            Please specify the type provided in domestic law:
                          </Typography>
                          <Input
                            name="typeProvidedInDomesticLaw"
                            value={values.typeProvidedInDomesticLaw}
                            placeholder="Specify the Law"
                            onBlur={handleBlur}
                            onChange={handleChange}

                            style={{
                              border: " 1px solid #d9d9d9 ",
                              padding: " 0 10px",
                              color: "#121112",
                              fontStyle: "italic",
                              height: "50px",
                              width: "100%",
                            }}
                          />

                        </>)}

                      </>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "40px",

                        }}
                      >

                        <Button
                          variant="contained"
                          style={{ color: "white", marginLeft: "15px", fontSize: "12px", }}
                          onClick={() => {
                            dispatch(GetCaymanEntityPdf(authDetails?.accountHolderId))
                          }}
                        >
                          View Form
                        </Button>

                        <Button
                          type="submit"
                          variant="contained"
                          style={{ color: "white", marginLeft: "15px", fontSize: "12px", }}
                        >
                          Confirm
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
                            history(-1)
                          }}
                        >
                          Back
                        </Button>
                      </Typography>



                    </form>

                  )}
                </Formik>
              </Paper>
            </div>
          </div>

        </div>
      </section>
    </Fragment>
  );
};


