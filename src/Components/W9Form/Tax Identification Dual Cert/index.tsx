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
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox
} from "@mui/material";
import "./index.scss";
import Infoicon from "../../../assets/img/info.png";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { TinSchema_DualCert, TinSchema_W9_DC } from "../../../schemas";
import { useNavigate } from "react-router-dom";
import { getTinTypes, PostDualCertDetails, GetHelpVideoDetails, getW9Form, getAllCountries, getDualCertW9, PostDualCert } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import View_Insructions from "../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import Text from "./tesxt";
import { GetW9DCPdf } from "../../../Redux/Actions/PfdActions";
import Redirect from "../../../Router/RouterSkip";

export default function TaxPayer(props: any) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { authDetails } = useAuth();
  const [clickCount, setClickCount] = useState(0);
  const [continueId, setcontinueId] = useState(0);

  const onBoardingFormValues = JSON.parse(
    localStorage.getItem("agentDetails") ?? "null"
  );



  const [yesCount, setYesCount] = useState(0)

  const handleRadioChange = (event: any, index: number) => {
    console.log(event.target.value, "99")
    let Temp: any = values;
    Temp[event.target.name] = event.target.value
    setValues(Temp)

    // Handle your existing form field changes here
    // For the specific case of entityWithMultipleTaxJurisdictions
    if (event.target.name === 'additionalTaxJurisdictions' || event.target.name === "entityWithMultipleTaxJurisdictions") {
      if (event.target.value === 'Yes') {
        setPayload([...payload, { ...defuaultPayload }]);
      } else if (event.target.value === 'No' && index >= 1) {
        let temp = [...payload];
        temp?.splice(index, 1)
        setPayload([...temp]); 
      }
    }
  };

  const renderMultipleTimes = () => {
    let elements = [];
    for (let i = 0; i < payload.length; i++) {
      elements.push(
        <div key={i}>
          <Text data={payload[i]} index={i} handlePayloadUpdate={handlePayloadUpdate} handleRadioChange={handleRadioChange} />
        </div>
      );
    }
    return elements;
  };
  const urlValue = location.pathname.substring(1);
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const defuaultPayload = {
    usTinTypeId: 0,
    usTin: "",
    isTinAvailable: false,
    entityWithMultipleTaxJurisdictions: "",
    countryId: 0,
    tinNumber: "",
    isAlternativeTinFormat: false,
    notAvailableReason: "",
    formTypeId: FormTypeId?.W9,
    accountHolderDetailsId: authDetails?.accountHolderId,
    agentId: authDetails?.agentId,
    formEntryId: 0,
    id: 0

  }
  const [payload, setPayload] = useState<any[]>([]);
  const [payload1, setPayload1] = useState({
    usTinTypeId: 0,
    usTin: ""
  });
  useEffect(() => {
    console.log(payload, "parentData")
  }, [payload])


  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const GetDualCertData = useSelector(
    (state: any) => state?.GetDualCertW9Reducer?.DualCertData?.length > 0 ? state?.GetDualCertW9Reducer?.DualCertData[0] : {}
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
      setPayload1({ ...payload1, usTin: payload1.usTin + "-" });
      values.usTin = values.usTin + "-";
    }
    if (e.target.value.length === 6) {
      setPayload1({ ...payload1, usTin: payload1.usTin + "-" });
      values.usTin = values.usTin + "-";
    }
  };

  const [TinTax, setTinTax] = useState(false);

  const handlePayloadUpdate = (data: any, index: number) => {
    console.log(data, index, "parent method");
    const temp = [...payload.map((ele: any, ind: number) => {
      if (ind == index) {
        return { ...data };
      } else {
        return { ...ele };
      }
    })];
    setPayload([...temp])
  }


  useEffect(() => {
    Promise.all(payload.map(x => TinSchema_DualCert().validate(x))).then(() => {
      setTinTax(true);
    }).catch((err) => {
      console.log(err, "123")

      setTinTax(false);
    })

  }, [payload])


  useEffect(() => {
    dispatch(GetHelpVideoDetails());
    dispatch(getAllCountries());
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
    dispatch(getDualCertW9(authDetails?.accountHolderId, FormTypeId?.W9))
  }, [authDetails]);



  useEffect(() => {
    if (GetDualCertData?.length > 0) {
      const dataFromApi = GetDualCertData;
      setPayload(dataFromApi?.map((ele: any, index: number) => {
        return {
          id: 0,
          agentId: authDetails?.agentId,
          accountHolderDetailsId: authDetails?.accountHolderId,
          formTypeId: FormTypeId.W9,
          formEntryId: index,
          additionalTaxJurisdictions: ele?.additionalTaxJurisdictions,
          countryId: parseInt(ele?.countryId),
          otherCountry: ele.otherCountry || "",
          isTinAvailable: ele?.isTinAvailable,
          tinNumber: ele?.tinNumber,
          isAlternativeTinFormat: ele.isAlternativeTinFormat

        }
      }));
    }
  }, [GetDualCertData]);

  const initialValues = {
    agentId: authDetails?.agentId,
    accountHolderId: authDetails?.accountHolderId,
    entityWithMultipleTaxJurisdictions: "",
    usTinTypeId: onBoardingFormValues?.taxpayerIdTypeID
      ? onBoardingFormValues?.taxpayerIdTypeID : getReducerData?.taxpayerIdTypeID || 0,
    usTin: onBoardingFormValues?.usTin || "",
    formEntryId: "",
    id: ""
  };

  const [values, setValues] = useState(initialValues);
  console.log(values.entityWithMultipleTaxJurisdictions, "90")
  console.log(values, "90")

  const TaxJurisdictions = values.entityWithMultipleTaxJurisdictions
  const history = useNavigate()
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [toolInfo, setToolInfo] = useState("");
  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const viewPdf = () => {
    history("w9_pdf");
  }
  const handleTextChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues({ ...values, [name]: newValue });
  }


  const handlePayloadSubmit = async (e: any): Promise<any> => {

    const payloadSubmitPromise = new Promise((resolve, reject) => {
      let updateData = payload.map((ele, index) => {
        return {
          id: 0,
          agentId: authDetails?.agentId,
          accountHolderDetailsId: authDetails?.accountHolderId,
          formTypeId: FormTypeId.W9,
          formEntryId: FormTypeId.W9,
          additionalTaxJurisdictions: ele?.additionalTaxJurisdictions,
          countryId: parseInt(ele?.countryId),
          otherCountry: ele?.otherCountry || "",
          isTinAvailable: ele?.isTinAvailable,
          tinNumber: ele?.tinNumber,
          isAlternativeTinFormat: ele?.isAlternativeTinFormat,
        };
      });
      console.log(updateData, "090");

      dispatch(
        PostDualCertDetails(
          [...updateData],
          (data: any) => {
            localStorage.setItem('DualCertChild', JSON.stringify(updateData));
            resolve(data)
          },
          (err: any) => reject(err)
        )
      );

    });
    return payloadSubmitPromise;
  };


  const handleSecondPayloadSubmit = async (values: any): Promise<any> => {
    const secondPayloadSubmitPromise = new Promise((resolve, reject) => {
      let secondPayload = [
        {
          id: 0,
          accountHolderDetailsId: authDetails?.accountHolderId,
          agentId: authDetails?.agentId,
          formTypeID: FormTypeId.W9,
          entityWithMultipleTaxJurisdictions: TaxJurisdictions,
          usTinTypeId: onBoardingFormValues?.taxpayerIdTypeID
            ? onBoardingFormValues?.taxpayerIdTypeID : getReducerData?.taxpayerIdTypeID,
          usTin: onBoardingFormValues?.usTin || values.usTin,
        },
      ];
      console.log(secondPayload, "Second Payload");
      dispatch(PostDualCert(secondPayload,
        (data: any) => {
          localStorage.setItem('DualCertData', JSON.stringify(secondPayload));
          resolve(data)
        },
        (err: any) => reject(err)
      ));

      // Dispatch action or perform any other necessary operation here
    });
    return secondPayloadSubmitPromise;
  };

  // const handlePayloadSubmit = async (e:any) :Promise<any>=> {
  //   e.preventDefault()
  //   const payloadSubmitPromise=new Promise((resolve,reject)=>{
  //     let updateData = payload.map((ele, index)=>{
  //       return {
  //         id: 0,
  //         agentId: authDetails?.agentId,
  //         accountHolderDetailsId: authDetails?.accountHolderId,
  //         formTypeId: FormTypeId.W9,
  //         formEntryId: index,
  //         additionalTaxJurisdictions: ele?.additionalTaxJurisdictions ,
  //         countryId: ele?.countryId ,
  //         otherCountry: ele?.otherCountry ||"",
  //         isTinAvailable: ele?.isTinAvailable ,
  //         tinNumber: ele?.tinNumber ,
  //         isAlternativeTinFormat:ele?.isAlternativeTinFormat 

  //       }
  //     })
  //     console.log(updateData,"090")

  //     dispatch(PostDualCertDetails([...updateData],(data:any)=>resolve(data),(err:any)=>reject(err)));
  //     // history("/Certification_W9_DC")

  //   })  
  //   return payloadSubmitPromise;  
  // };
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
            dispatch(GetW9DCPdf(authDetails?.accountHolderId))
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
        initialValues={initialValues}
        enableReinitialize
        validateOnChange={true}
        validateOnBlur={true}
        validationSchema={TinSchema_W9_DC}
        onSubmit={(values, { setSubmitting }) => {
          const returnPromise = new Promise((resolve, reject) => {
            let temp = {
              ...values,
              accountHolderId: authDetails?.accountHolderId,
              agentId: authDetails?.agentId
            };

            localStorage.setItem("DualCertData", JSON.stringify(temp));
            if (values.entityWithMultipleTaxJurisdictions === 'No') {
              console.log("Nooo", values.entityWithMultipleTaxJurisdictions)

              handleSecondPayloadSubmit(values)
              Redirect(
                "/Certification_W9_DC",
                authDetails?.agentId,
                history,
                false
              );
              // history("/Certification_W9_DC");
              setSubmitting(false);
            } else {
              console.log("Yess", values.entityWithMultipleTaxJurisdictions)
              handleSecondPayloadSubmit(values)
                .then(() => {
                  handlePayloadSubmit(values)
                    .then(() => {
                      Redirect(
                        "/Certification_W9_DC",
                        authDetails?.agentId,
                        history,
                        false
                      );
                      // history("/Certification_W9_DC");
                    })
                    .catch((error) => {
                      console.error("Error in first payload submission:", error);
                    });
                })
                .catch((error) => {
                  console.error("Error in second payload submission:", error);
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }

          })
          return returnPromise;
        }
        }
      // onSubmit={(values, { setSubmitting }) => {
      //   const returnPromise = new Promise((resolve, reject) => {
      //     let temp = {
      //       ...values,
      //       accountHolderId: authDetails?.accountHolderId,
      //       agentId: authDetails?.agentId
      //     };
      //     localStorage.setItem("DualCertData", JSON.stringify(temp));
      //     // Call the second payload submission function
      //     handleSecondPayloadSubmit(values)
      //       .then((data) => {
      //         // Handle success
      //         console.log("Second payload submitted successfully:", data);
      //         // Call handlePayloadSubmit function
      //         return handlePayloadSubmit(values);
      //       })
      //       .then((data) => {
      //         // Handle success of handlePayloadSubmit
      //         console.log("First payload submitted successfully:", data);
      //         resolve(data); // Resolve the main promise
      //       })
      //       .catch((error) => {
      //         // Handle errors
      //         console.error("Error:", error);
      //         reject(error); // Reject the main promise
      //       });
      //   });
      //   return returnPromise;
      // }}


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
          isValid,
          submitForm
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row w-100">
              <div className="col-4">
                <div style={{ padding: "20px 0px" }}>
                 {onBoardingFormValues.businessTypeId === 1 ?( <BreadCrumbComponent breadCrumbCode={1220} formName={12} />):<BreadCrumbComponent breadCrumbCode={1220} formName={13} />
                 }

                </div>
              </div>
              <div className="col-8 mt-3" >
                <div style={{ padding: "10px 0px" }}>
                  <Paper elevation={6} style={{ padding: "17px", }}>


                    <div style={{ backgroundColor: "#ffff", }}>
                      {values.usTin && clickCount === 1 ? (<div style={{ backgroundColor: "#e8e1e1", padding: "10px" }}>
                        <Typography>
                          TIN
                          <span className="mx-1">
                            <img src={Infoicon} style={{
                              color: "#ffc107", height: "22px",
                              width: "20px",
                              boxShadow: "inherit",



                              cursor: "pointer",
                              marginBottom: "3px"

                            }} />


                          </span>
                          You have selected an entity type that would normally expect to supply an EIN

                        </Typography>



                      </div>) : ""}

                      {values.usTin == "" && clickCount === 1 ? (<div style={{ backgroundColor: "#e8e1e1", padding: "10px" }}>
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
                        Taxpayer Identification Number SelfCert

                      </Typography>

                      <div style={{ marginLeft: "4px", display: "flex", marginTop: "25px" }} className="row">
                        <div className="col-md-4 col-6">
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


                              <Link href="#" underline="none" style={{ marginTop: "10px", fontSize: "16px" }} onClick={() => { setToolInfo("") }}>--Show Less--</Link>
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
                                //   touched.usTinTypeId &&
                                //     errors.usTinTypeId
                                // )}
                                name="usTinTypeId"
                                value={values.usTinTypeId}
                                style={{
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "39px",
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
                                //   touched.usTinTypeId &&
                                //     errors.usTinTypeId
                                // )}
                                name="usTinTypeId"
                                value={values.usTinTypeId}
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
                            {errors.usTinTypeId &&
                              touched.usTinTypeId ? (
                              <div>
                                <p className="error">
                                  {errors.usTinTypeId.toString()}
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </div>

                        <div className="col-md-4 col-6">

                          <Typography>U.S. TIN</Typography>
                          <Input
                            name="usTin"
                            value={values?.usTin}
                            id="usTin"
                            disabled={values.usTinTypeId == 0 || values.usTinTypeId == 1 || values.usTinTypeId == 7 || values.usTinTypeId == 8}
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
                          <p className="error">{errors.usTin?.toString()}</p>
                        </div>

                      </div>
                      <div style={{ marginLeft: "18px", marginTop: "20px" }} >
                        <Typography>
                          Does the submission represent an entity that has multiple tax jurisdictions? <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <>{console.log(typeof values.entityWithMultipleTaxJurisdictions, typeof GetDualCertData.entityWithMultipleTaxJurisdictions, "67")}</>
                        <FormControl className="col-12 radio">
                          <RadioGroup
                            row

                            name="entityWithMultipleTaxJurisdictions"
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            value={values?.entityWithMultipleTaxJurisdictions}
                            onBlur={handleBlur}

                            onChange={(e) => {
                              handleRadioChange(e, 1)
                              handleChange(e)
                            }}
                          >
                            <FormControlLabel
                              value="Yes"

                              control={<Radio />}
                              label="Yes"
                              name="entityWithMultipleTaxJurisdictions"

                            />
                            <FormControlLabel
                              className="label"
                              value="No"
                              control={<Radio />}
                              label="No"
                              name="entityWithMultipleTaxJurisdictions"

                            />


                          </RadioGroup>
                          {errors.entityWithMultipleTaxJurisdictions &&
                            touched.entityWithMultipleTaxJurisdictions ? (
                            <div>
                              <p className="error">
                                {errors.entityWithMultipleTaxJurisdictions}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                          {renderMultipleTimes()}

                        </FormControl>
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
              <SaveAndExit Callback={() => {
                submitForm().then(() => {
                  const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                  const urlValue = window.location.pathname.substring(1);
                  dispatch(PostDualCert(
                    {
                      ...prevStepData,
                      ...values,
                      stepName: `/${urlValue}`
                    }
                    , () => { },
                    () => { })
                  );
                  history(
                    GlobalValues.basePageRoute
                  );
                })
              }} formTypeId={FormTypeId.W9} />
              <Button variant="contained" onClick={() => {
                dispatch(GetW9DCPdf(authDetails?.accountHolderId))
              }} style={{ color: "white", marginLeft: "15px" }}>
                View Form
              </Button>
              <Button

                //    onClick={(e)=>{
                //   handleSecondPayloadSubmit(e)
                //    handlePayloadSubmit(e)
                //    history("/Certification_W9_DC")
                //  }}
                disabled={!isValid || !TinTax}
                type="submit"
                variant="contained"
                style={{ color: "white", marginLeft: "15px" }}
              >
                Continue
              </Button>
            </div>

          </Form>
        )}
      </Formik>
    </section>)
}
