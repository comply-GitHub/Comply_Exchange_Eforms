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
  Checkbox,
  IconButton
} from "@mui/material";
import "./index.scss";
import Infoicon from "../../../../assets/img/info.png";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Delete, ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { TinSchema_DualCert, TinSchema_W9_DC } from "../../../../schemas";
import { useNavigate } from "react-router-dom";
import { getTinTypes, PostDualCertDetails, GetHelpVideoDetails, getW9Form, getAllCountries, getDualCertW9, PostDualCert } from "../../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import View_Insructions from "../../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import useAuth from "../../../../customHooks/useAuth";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import Text from "./tesx";
import { GetBENEDCPdf } from "../../../../Redux/Actions/PfdActions";

export default function TaxPayer(props: any) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { authDetails } = useAuth();
  const [clickCount, setClickCount] = useState(0);
  const [continueId, setcontinueId] = useState(0);

  const obValues = JSON.parse(
    localStorage.getItem("agentDetails") ?? "null"
  );

  

  const [yesCount, setYesCount] = useState(0)

  const handleRadioChange = (event: any, index: number) => {
    console.log(event.target.value, "99")
    let Temp: any = values;
    Temp[event.target.name] = event.target.value
    setValues(Temp)

    
    if (event.target.name === 'additionalTaxJurisdictions' || event.target.name === "entityWithMultipleTaxJurisdictions") {
      if (event.target.value === 'Yes') {
        setPayload([...payload, { ...defuaultPayload }]);
      } else if (event.target.value === 'No' && index >= 1) {
        let temp = [...payload];
        temp?.splice(index, 1)
        setPayload([...temp]); // Reset or handle as needed when "No" is clicked
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
    formTypeId: FormTypeId?.BENE,
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
  const W8BENEData = useSelector((state: any) => state.W8BENE);
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
    dispatch(getDualCertW9(authDetails?.accountHolderId, FormTypeId?.BENE))
  }, [authDetails]);



  useEffect(() => {
    if (GetDualCertData?.length > 0) {
      const dataFromApi = GetDualCertData;
      setPayload(dataFromApi?.map((ele: any, index: number) => {
        return {
          id: 0,
          agentId: authDetails?.agentId,
          accountHolderDetailsId: authDetails?.accountHolderId,
          formTypeId: FormTypeId.BENE,
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
    usTinTypeId: obValues?.usTinTypeId
      ? obValues?.usTinTypeId : getReducerData?.usTinTypeId || 0,
    usTin: obValues?.usTin || "",
    formEntryId: "",
    id: "",
    foreignTINCountry: obValues.foreignTINCountryId == null || obValues.foreignTINCountryId == ""
      || obValues.foreignTINCountryId == "0" ? obValues.permanentResidentialCountryId : obValues.foreignTINCountryId,
    foreignTIN:  W8BENEData.foreignTIN ? W8BENEData.foreignTIN : "",
    isFTINLegally: W8BENEData.isFTINLegally ? W8BENEData.isFTINLegally : false,
    isNotAvailable: W8BENEData.isNotAvailable ? (W8BENEData.isNotAvailable == true && W8BENEData.alternativeTINFormat == false ? "Yes" : "") : false,

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
          formTypeId: FormTypeId.BENE,
          formEntryId: FormTypeId.BENE,
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
          formTypeID: FormTypeId.BENE,
          entityWithMultipleTaxJurisdictions: TaxJurisdictions,
          usTinTypeId: obValues?.taxpayerIdTypeID
            ? obValues?.taxpayerIdTypeID : getReducerData?.taxpayerIdTypeID,
          usTin: obValues?.usTin || values.usTin,
          foreignTINCountry: obValues.foreignTINCountryId == null || obValues.foreignTINCountryId == ""
      || obValues.foreignTINCountryId == "0" ? obValues.permanentResidentialCountryId : obValues.foreignTINCountryId,
    foreignTIN: obValues.foreignTIN || values.foreignTIN,
    isFTINLegally: W8BENEData.isFTINLegally ? W8BENEData.isFTINLegally : false,
    isNotAvailable: W8BENEData.isNotAvailable ? (W8BENEData.isNotAvailable == true && W8BENEData.alternativeTINFormat == false ? "Yes" : "") : false,
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
  //         formTypeId: FormTypeId.BENE,
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
                      dispatch(GetBENEDCPdf(authDetails?.accountHolderId))
                    }}>View Form</div>
          <div className="helpvideo">
            {GethelpData && GethelpData[8].id === 10 ? (
              <a
                href={GethelpData[8].fieldValue}
                   target="_self"
                onClick={() =>
                (
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
            
              history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE/Participation_BenE/Submit_BenE/Certification_DC");
              
              setSubmitting(false);
            } else {
              console.log("Yess", values.entityWithMultipleTaxJurisdictions)
              handleSecondPayloadSubmit(values)
                .then(() => {
                  handlePayloadSubmit(values)
                    .then(() => {
                      history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE/Participation_BenE/Submit_BenE/Certification_DC");
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
                  <BreadCrumbComponent breadCrumbCode={1249} formName={1} />

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
                            {obValues?.isUSIndividual == true ? (

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
                      <div
                        style={{
                          margin: "10px",
                          display: "flex",
                          marginTop: "15px",
                        }}
                        className="row"
                      >
                        <div className="col-md-4 col-6">
                          <Typography style={{ fontSize: "14px" }}>
                            Foreign TIN Country
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <select
                            disabled
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
                        
                            name="foreignTINCountry"
                            id="Income"
                            onBlur={handleBlur}
                            value={values.foreignTINCountry}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          >
                            <option value={0}>---select---</option>
                            <option value={257}>United Kingdom</option>
                            {getCountriesReducer.allCountriesData
                              ?.filter(
                                (x: any) =>
                                  x.name?.toLowerCase() !== "united states"
                              )
                              ?.map((ele: any) => (
                                <option key={ele?.id} value={ele?.id}>
                                  {ele?.name}
                                </option>
                              ))}
                          </select>
                          {/* <p className="error">{errors.foreignTINCountry}</p> */}

                          <div style={{ marginTop: "2px" }}>
                            <Checkbox
                              value={values.isFTINLegally}
                              checked={values.isFTINLegally}
                              onChange={(e) => {
                                handleChange(e);
                                {
                                  setTimeout(() => {
                                    setFieldValue(
                                      "isNotAvailable",
                                      ""
                                    );
                                  }, 100)

                                }
                                setTimeout(() => {
                                  setFieldValue("foreignTIN", "");
                                }, 200)

                              }}
                              size="medium"
                              name="isFTINLegally"
                            />
                            <span style={{ fontSize: "15px" }}>
                              Check if FTIN not legally required
                              {errors.isFTINLegally &&
                                touched.isFTINLegally ? (
                                <div>
                                  {/* <Typography color="error">
                                    {errors.isFTINLegally}
                                  </Typography> */}
                                </div>
                              ) : (
                                ""
                              )}
                              <span>
                                <Tooltip
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                  }}
                                  title={
                                    <>
                                      <Typography color="inherit">
                                        FTIN not legally required
                                      </Typography>
                                      <a onClick={() => setToolInfo("require")}>
                                        <Typography
                                          style={{
                                            cursor: "pointer",
                                            textDecorationLine: "underline",
                                          }}
                                          align="center"
                                        >
                                          View More...
                                        </Typography>
                                      </a>
                                    </>
                                  }
                                >
                                  <Info
                                    style={{
                                      color: "#ffc107",
                                      fontSize: "12px",
                                      cursor: "pointer",
                                      verticalAlign: "super",
                                    }}
                                  />
                                </Tooltip>
                              </span>
                            </span>
                          </div>

                          {toolInfo === "require" ? (
                            <Paper
                              style={{
                                backgroundColor: "#dedcb1",
                                padding: "15px",
                                marginBottom: "10px",
                              }}
                            >
                              <Typography>
                                You may check the box on this line 6b (for Form
                                W-8BEN), line 9c (for Form W-8BEN-E) or line 8b
                                (For Form W-8ECI) if you are an account holder
                                as described for purposes of line 6a (for Form
                                W-8BEN), line 9b (for Form W-8BEN-E) or line 8a
                                (for Form W-8ECI) and you are not legally
                                required to obtain an FTIN from your
                                jurisdiction of residence (including if the
                                jurisdiction does not issue TINs). By checking
                                this box, you will be treated as having provided
                                an explanation for not providing an FTIN on line
                                6a (W-8BEN), line 9b (W-8BEN-E), or line line 8a
                                (W-8ECI). If you wish to provide a further (or
                                other) explanation why you are not required to
                                provide an FTIN, which appears on line 6a, 9b or
                                8a (W-8BEN, W-8BEN-E or W-8ECI respectively),
                                you will be able to enter this as part of the
                                eForms process.
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
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-md-4 col-6">
                          <Typography style={{ fontSize: "14px" }}>
                            Foreign TIN{" "}
                            {values.foreignTINCountry == 257 ? (
                              <span>
                                {" "}
                                <Tooltip
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                  }}
                                  title={
                                    <>
                                      <a
                                        onClick={() =>
                                          setToolInfo("ForeignTin")
                                        }
                                      ></a>
                                    </>
                                  }
                                >
                                  <Info
                                    onClick={() => setToolInfo("ForeignTin")}
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
                                </Tooltip>
                              </span>
                            ) : (
                              ""
                            )}
                          </Typography>

                          {values.isNotAvailable === "No" ? (
                            <Input
                              fullWidth
                              type="text"
                              disabled={
                                values.isFTINLegally ||
                                values.foreignTINCountry == "1"
                              }
                              name="foreignTIN"
                              value={values.foreignTIN}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              inputProps={{ maxLength: 10 }}
                              placeholder="ENTER FOREIGN TIN"
                              error={Boolean(
                                touched.foreignTIN && errors.foreignTIN
                              )}
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#7e7e7e",
                                fontStyle: "italic",
                                height: "40px",
                               
                              }}
                            />
                          ) : (
                            <Input
                              fullWidth
                              type="text"
                              disabled={
                                values.isFTINLegally ||
                                values.foreignTINCountry == "1" ||
                                values.isNotAvailable === "Yes"
                              }
                              placeholder="ENTER FOREIGN TIN"
                              name="foreignTIN"
                              value={values.foreignTIN}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.foreignTIN && errors.foreignTIN
                              )}
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#7e7e7e",
                                fontStyle: "italic",
                                height: "40px",
                            
                              }}
                            />
                          )}
                          {values.isFTINLegally ? "" : " "}

                          <div>
                            <FormControl className="col-12 radio">
                              <RadioGroup
                                row
                                name="isNotAvailable"
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                value={values.isNotAvailable}
                                onChange={(e) => {
                                  handleChange(e);
                                  setTimeout(() => {
                                    setFieldValue("foreignTIN", "");
                                  }, 100);
                                }}
                              >
                                <FormControlLabel
                                  value="Yes"
                                  disabled={values.isFTINLegally}
                                  control={<Radio />}
                                  label="Not Available"
                                  name="isNotAvailable"
                                />
                                <FormControlLabel
                                  className="label"
                                  value="No"
                                  control={<Radio />}
                                  label="Alternative Tin Format"
                                  disabled={values.isFTINLegally}
                                  name="isNotAvailable"
                                />

                                {values.isNotAvailable === "Yes" ||
                                  values.isNotAvailable === "No" ? (
                                  <IconButton>
                                    <Delete
                                      onClick={() => {
                                        handleChange(
                                          "isNotAvailable"
                                        )("");
                                      }}
                                      style={{
                                        color: "red",
                                        fontSize: "20px",
                                        marginTop: "11px",
                                      }}
                                    />
                                  </IconButton>

                                ) : (
                                  ""
                                )}
                              </RadioGroup>

                              {errors.isNotAvailable &&
                                touched.isNotAvailable ? (
                                <div>
                                  <Typography color="error">
                                    {errors.isNotAvailable}
                                  </Typography>
                                </div>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div style={{ marginLeft: "18px", marginTop: "20px" }} >
                        <Typography>
                          Does the entityWithMultipleTaxJurisdictions represent an entity that has multiple tax jurisdictions?
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
                      AccountHolderDetailsId:authDetails.accountHolderId,
                      AgentId: authDetails?.agentId,
                      formTypeId: FormTypeId.BENE,
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
              }} formTypeId={FormTypeId.BENE} />
              <Button variant="contained" onClick={() => {
                      dispatch(GetBENEDCPdf(authDetails?.accountHolderId))
                    }} style={{ color: "white", marginLeft: "15px" }}>
                View Form
              </Button>
              <Button

                //    onClick={(e)=>{
                //   handleSecondPayloadSubmit(e)
                //    handlePayloadSubmit(e)
                //    history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE/Participation_BenE/Submit_BenE/Certification_DC");
                //  }}
                type="submit"
               
                disabled={!isValid || !TinTax}
               
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
