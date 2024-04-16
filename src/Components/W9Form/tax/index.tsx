import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Link,
  TextField,
  MenuItem,
  Select
} from "@mui/material";
import Infoicon from "../../../assets/img/info.png";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { firstStepBusinessSchema, firstStepSchema, tinSchema } from "../../../schemas";
import { useNavigate } from "react-router-dom";
import { getTinTypes, postW9Form, GetHelpVideoDetails, getW9Form } from "../../../Redux/Actions"
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import View_Insructions from "../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import { GetW9Pdf } from "../../../Redux/Actions/PfdActions";

export default function Tin(props: any) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { authDetails } = useAuth();
  const [clickCount, setClickCount] = useState(0);
  const [continueId, setcontinueId] = useState(0);

  const {
    // handleTaxClassificationChange,
    // selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;

  const onBoardingFormValues = JSON.parse(
    localStorage.getItem("agentDetails") ?? "null"
  );
  const urlValue = location.pathname.substring(1);
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const [payload, setPayload] = useState({
    taxpayerIdTypeID: 0,
    Tin: ""
  });
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  var getReducerData = useSelector(
    (state: any) => state?.GetByW9FormReducer?.GetByW9FormData
  );
  const [ustinArray, setUStinArray] = useState([]);
  const [ustinValue, setUStinvalue] = useState([]);
  const [notUsIndividual, setNonUsIndividual] = useState([]);
  const [canvaBx, setCanvaBx] = useState(false);
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }
  useEffect(() => {
    document.title = "Tax-Payer"
  }, [])

  const formatTin = (e: any, values: any): any => {
    if (e.key === "Backspace" || e.key === "Delete") return;
    if (e.target.value.length === 3) {
      setPayload({ ...payload, Tin: payload.Tin + "-" });
      values.Tin = values.Tin + "-";
    }
    if (e.target.value.length === 6) {
      setPayload({ ...payload, Tin: payload.Tin + "-" });
      values.Tin = values.Tin + "-";
    }
  };
  const initialValue = {
    taxpayerIdTypeID: onBoardingFormValues?.usTinTypeId
      ? onBoardingFormValues?.usTinTypeId
      : getReducerData?.taxpayerIdTypeID,
    Tin: onBoardingFormValues?.usTin ? onBoardingFormValues?.usTin : getReducerData?.tiN_USTIN,
  };
  const [selectedTaxClassification, setSelectedTaxClassification] =
    useState(0);
  const handleTaxClassificationChange = (
    event: any
  ) => {

    setSelectedTaxClassification(event.target.value);
  };
  useEffect(() => {
    dispatch(GetHelpVideoDetails());
    dispatch(
      getTinTypes(3, (data: any) => {
        setUStinArray(data);
        let datas = data.filter((ele: any) => {
          return ele.usIndividual === true;
        });
        setUStinvalue(datas);
        let nonData = data.filter((ele: any) => {
          return ele.usEntity === true;
        });
        setNonUsIndividual(nonData)
      })
    );
    dispatch(
      getW9Form(authDetails?.accountHolderId, (data: any) => {
      })
    );
  }, [authDetails]);
  const history = useNavigate()
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [toolInfo, setToolInfo] = useState("");

  const viewPdf = () => {
    history("w9_pdf");
  }
  return (

    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px", height: "100%" }}
    >
      <View_Insructions canvaBx={canvaBx} handleCanvaClose={handleCanvaClose} />
      {canvaBx === true ? (<div className="offcanvas-backdrop fade show" onClick={() => { handleCanvaClose() }}></div>) : null}

      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions" onClick={() => { handleCanvaOpen(); }}>View Instructions</div>
          <div className="viewform" onClick={() => {
            dispatch(GetW9Pdf(authDetails?.accountHolderId))
          }}>View Form</div>
          <div className="helpvideo">
            {GethelpData && GethelpData[8].id === 10 ? (
              <a
                href={GethelpData[8].fieldValue}
                target="popup"
                onClick={() =>
                  window.open(
                    GethelpData[8].fieldValue,
                    'name',
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
      <Formik
        initialValues={initialValue}
        enableReinitialize
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={
          selectedTaxClassification == 0
            ? tinSchema
            : selectedTaxClassification == 1
              ? firstStepSchema
              : firstStepBusinessSchema
        } 
        onSubmit={(values, { setSubmitting }) => {


          const submitPromise = new Promise((resolve, reject) => {
            if (clickCount === 0) {
              setClickCount(clickCount + 1);
            } else {
              setSubmitting(true);
              const new_obj = { ...PrevStepData, stepName: `/${urlValue}` }
              const result = { ...new_obj, ...values };
              dispatch(
                postW9Form(result, () => {
                  localStorage.setItem("PrevStepData", JSON.stringify(result))
                  if (continueId == 1) {
                    setcontinueId(0);
                    history("/US_Purposes/Back/Exemption/Tax/Certificates")
                  }
                  setSubmitting(false);
                  resolve("success");
                }, (error: any) => { reject(error); setSubmitting(false); })
              );


            }

          });
          return submitPromise;
        }
        }
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
          submitForm
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row w-100">
              <div className="col-4">
                <div style={{ padding: "20px 0px", height: "100%" }}>
                  <BreadCrumbComponent breadCrumbCode={1249} formName={1} />

                </div>
              </div>
              <div className="col-8 mt-3" >
                <div style={{ padding: "10px 0px" }}>
                  <Paper elevation={6} style={{ padding: "17px", }}>


                    <div style={{ backgroundColor: "#ffff", }}>
                      {values.Tin && clickCount === 1 ? (<div style={{ backgroundColor: "#e8e1e1", padding: "10px" }}>
                        <Typography>
                          TIN 100
                          <span className="mx-1">
                            <img src={Infoicon} style={{
                              color: "#ffc107", height: "22px",
                              width: "20px",
                              boxShadow: "inherit",



                              cursor: "pointer",
                              marginBottom: "3px"

                            }} />


                          </span>
                          You have selected an entity type that would normally expect to supply an SSN/ITIN

                        </Typography>



                      </div>) : ""}

                      {values.Tin == "" && clickCount === 1 ? (<div style={{ backgroundColor: "#e8e1e1", padding: "10px" }}>
                        <Typography>
                          TIN
                          <span className="mx-1">
                            <img src={Infoicon} style={{
                              color: "#ffc107",
                              fontSize: "2px",
                              cursor: "pointer",
                              marginBottom: "3px"

                            }} />

                          </span>
                          You have not provided a Tax-payer Identification Number
                        </Typography>



                      </div>) : ""}

                      <Typography
                        align="left"
                        style={{ margin: "5px", fontSize: "27px", fontWeight: "550" }}
                      >
                        Taxpayer Identification Number

                      </Typography>

                      <div style={{ marginLeft: "4px", display: "flex", marginTop: "25px", justifyContent: "space-between" }} className="row">
                        <div className="col-md-6 col-12">
                          <Typography>
                            U.S. TIN Type

                            <span style={{ color: "red" }}>*</span>
                            <span><Tooltip style={{ backgroundColor: "black", color: "white" }} title={
                              <>
                                <Typography color="inherit">U.S. TIN Type Info</Typography>
                                <a onClick={() => setToolInfo("basic")}>
                                  <Typography style={{ cursor: "pointer", textDecorationLine: "underline" }} align="center" > View More...</Typography>
                                </a>
                              </>
                            }>
                              <Info
                                style={{
                                  color: '#ffc107',
                                  fontSize: '10px',
                                  cursor: 'pointer',
                                  verticalAlign: "super"
                                }}

                              />
                            </Tooltip></span>
                          </Typography>
                          {toolInfo === "basic" ? (<div>
                            <Paper style={{ backgroundColor: "#dedcb1", padding: '15px', marginBottom: "10px" }}>
                              <Typography>
                                Please select a U.S. TIN type status from the dropdown.
                              </Typography>

                              <Typography style={{ marginTop: "10px" }}>
                                If a TIN type is not available, ensure you select the checkbox to the right of the field and provide an explanation as to why it is not available in the corresponding boxes at the bottom of the screen.
                              </Typography>


                              <Link href="#" underline="none" style={{ marginTop: "10px", fontSize: "16px", color: "#0000C7" }} onClick={() => { setToolInfo("") }}>--Show Less--</Link>
                            </Paper>

                          </div>) : ""}
                          <FormControl className="w-100">
                            {onBoardingFormValues?.isUSIndividual == true ? (

                              <select
                                onChange={
                                  handleChange
                                }
                                onBlur={handleBlur}
                                // error={Boolean(
                                //   touched.taxpayerIdTypeID &&
                                //     errors.taxpayerIdTypeID
                                // )}
                                name="taxpayerIdTypeID"
                                value={values.taxpayerIdTypeID}
                                style={{
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "36px",
                                }}
                              >
                                <option value="0">---select---</option>

                                {ustinValue?.map((ele: any) => (
                                  // ele?.nonUSIndividual &&
                                  //   values?.isUSIndividual == "no" ||
                                  // ele?.usIndividual &&
                                  //   values?.isUSIndividual == "Yes" ?
                                  // (
                                  <option
                                    key={ele?.taxpayerIdTypeID}
                                    value={ele?.taxpayerIdTypeID}
                                  >
                                    {ele?.taxpayerIdTypeName}
                                  </option>
                                  // ) : (
                                  //   ""
                                  // );
                                ))}
                              </select>) :

                              <select
                                onChange={
                                  handleChange
                                }
                                onBlur={handleBlur}
                                // error={Boolean(
                                //   touched.taxpayerIdTypeID &&
                                //     errors.taxpayerIdTypeID
                                // )}
                                name="taxpayerIdTypeID"
                                value={values.taxpayerIdTypeID}
                                style={{
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "36px",
                                }}
                              >
                                <option value="0">---select---</option>

                                {notUsIndividual?.map((ele: any) => (
                                  // ele?.nonUSIndividual &&
                                  //   values?.isUSIndividual == "no" ||
                                  // ele?.usIndividual &&
                                  //   values?.isUSIndividual == "Yes" ?
                                  // (
                                  <option
                                    key={ele?.taxpayerIdTypeID}
                                    value={ele?.taxpayerIdTypeID}
                                  >
                                    {ele?.taxpayerIdTypeName}
                                  </option>
                                  // ) : (
                                  //   ""
                                  // );
                                ))}
                              </select>}
                            {errors.taxpayerIdTypeID &&
                              touched.taxpayerIdTypeID ? (
                              <div>
                                <p className="error">
                                  {errors.taxpayerIdTypeID.toString()}
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </div>

                        <div className="col-md-6 col-12">

                          <Typography>U.S. TIN</Typography>
                          <Input
                            name="Tin"
                            value={values.Tin}
                            id="Tin"
                            disabled={values.taxpayerIdTypeID == 0 || values.taxpayerIdTypeID == 1 || values.taxpayerIdTypeID == 7 || values.taxpayerIdTypeID == 8}
                            onChange={
                              handleChange
                            }
                            className="input-w9-cstm"
                            inputProps={{ maxLength: 11 }}
                            onKeyDown={(e: any) => formatTin(e, values)}
                            fullWidth

                            style={{
                              width: "100%",
                              border: " 1px solid #d9d9d9 ",
                              height: "40px",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                          />
                          <p className="error">{errors.Tin?.toString()}</p>
                        </div>

                      </div>
                    </div>
                  </Paper>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "80px",
              }}
            >
              {/* <Button variant="contained" style={{ color: "white" }}
                onClick={() => {
                  submitForm().then((data) => {
                    history(GlobalValues.basePageRoute)
                  }).catch((error) => {
                    console.log(error);
                  })
                }}>
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
              <Button variant="contained"
                onClick={() => {
                  dispatch(GetW9Pdf(authDetails?.accountHolderId))
                }}
                style={{ color: "white", marginLeft: "15px" }}
              >
                View Form
              </Button>
              <Button
                // type="submit" 

                onClick={() => {
                  setcontinueId(1);
                  submitForm().then((data) => {
                    // history("/US_Purposes/Back/Exemption/Tax/Certificates")
                  }).catch((error) => {
                    console.log(error);
                  })
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

                color: "#f5f5f5",
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
                  history("/US_Purposes/Back/Exemption")
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
    </section>)
}
