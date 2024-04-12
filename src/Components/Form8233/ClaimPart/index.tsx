import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Input,
  Paper,
  Tooltip,
  Link,
  Checkbox,
} from "@mui/material";
import { amountSchema } from "../../../schemas/8233";
import {GetHelpVideoDetails, CREATE_8233,getAllCountries,GetIncomeTypes, post8233_EForm, GetCountryArticleByID } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import Infoicon from "../../../assets/img/info.png";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";
export default function Tin(props: any) {

  const { authDetails } = useAuth();

  const obValues = JSON.parse(localStorage.getItem("agentDetails") || '{}')
  const onBoardingFormValuesPrevStepData = JSON.parse(localStorage.getItem("PrevStepData") ?? "null");

  const initialValue = {
    taxTreaty_DescriptionOfPersonalServiceYouProvide: onBoardingFormValuesPrevStepData?.taxTreaty_DescriptionOfPersonalServiceYouProvide ? onBoardingFormValuesPrevStepData?.taxTreaty_DescriptionOfPersonalServiceYouProvide : "",
    taxTreaty_TotalCompensationYouExpectForThisCalenderYear: onBoardingFormValuesPrevStepData?.taxTreaty_TotalCompensationYouExpectForThisCalenderYear ? onBoardingFormValuesPrevStepData?.taxTreaty_TotalCompensationYouExpectForThisCalenderYear : "",
    taxTreaty_TreatyId: onBoardingFormValuesPrevStepData?.taxTreaty_TreatyId ? onBoardingFormValuesPrevStepData?.taxTreaty_TreatyId : "",
    taxTreaty_TreatyArticleId: onBoardingFormValuesPrevStepData?.taxTreaty_TreatyArticleId ? onBoardingFormValuesPrevStepData?.taxTreaty_TreatyArticleId : "",
    taxTreaty_TotalCompensationListedon11bExemptFromTax: onBoardingFormValuesPrevStepData?.taxTreaty_TotalCompensationListedon11bExemptFromTax ? onBoardingFormValuesPrevStepData?.taxTreaty_TotalCompensationListedon11bExemptFromTax : "",
    taxTreaty_CheckAll: onBoardingFormValuesPrevStepData?.taxTreaty_CheckAll ? onBoardingFormValuesPrevStepData?.taxTreaty_CheckAll : false,
    taxTreaty_CountryOfResidenceId: onBoardingFormValuesPrevStepData?.taxTreaty_CountryOfResidenceId ? onBoardingFormValuesPrevStepData?.taxTreaty_CountryOfResidenceId : 0,
    taxTreaty_NoncompensatoryScholarshiporFellowshipIncome: onBoardingFormValuesPrevStepData?.taxTreaty_NoncompensatoryScholarshiporFellowshipIncome ? onBoardingFormValuesPrevStepData?.taxTreaty_NoncompensatoryScholarshiporFellowshipIncome : "",
    taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID: onBoardingFormValuesPrevStepData?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID ? onBoardingFormValuesPrevStepData?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID : "",
    taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID:onBoardingFormValuesPrevStepData?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID ? onBoardingFormValuesPrevStepData?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID : "",
    totalIncomeListedIncomeonLine13ATaxExemptAmount: onBoardingFormValuesPrevStepData?.totalIncomeListedIncomeonLine13ATaxExemptAmount ? onBoardingFormValuesPrevStepData?.totalIncomeListedIncomeonLine13ATaxExemptAmount : "",
    sufficientFactToJustfyExemptionForClaim12A_13: onBoardingFormValuesPrevStepData?.sufficientFactToJustfyExemptionForClaim12A_13 ? onBoardingFormValuesPrevStepData?.sufficientFactToJustfyExemptionForClaim12A_13 : "",
  };
  const dispatch = useDispatch();
  const history = useNavigate();

  
  useEffect(()=>{
    document.title = "Steps | Forms | Form 8233 Sep 2018 | Part I"
    dispatch(GetHelpVideoDetails());
    dispatch(GetIncomeTypes())
    },[])
    const GethelpData = useSelector(
      (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
    );
    const [clickCount, setClickCount] = useState(0);
  const [tax, setTax] = useState<string>("");
  const GetIncomeTypesData = useSelector(
    (state:any)=>state.CountryArticle.CountryArticleData
  )
  const handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTax(event.target.value);
  };
  useEffect(()=>{
    dispatch(getAllCountries())  
  },[])

  const [treatyId, setTreatyId] = useState(initialValue.taxTreaty_TreatyId);
  const [treatyIdOnWhichBasicExemption, setTreatyIdOnWhichBasicExemption] = useState(initialValue.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID)

  useEffect(() => {
    dispatch(GetCountryArticleByID(treatyId, (data: any) => {
      // console.log("Article get:",data);
    }))
  }, [treatyId])

  useEffect(() => {
    dispatch(GetCountryArticleByID(treatyIdOnWhichBasicExemption, (data: any) => {
      // console.log("Article get:",data);
    }))
  }, [treatyIdOnWhichBasicExemption])

  const getCountriesReducer = useSelector((state:any) => state.getCountriesReducer);
  const [toolInfo, setToolInfo] = useState("");
  console.log(getCountriesReducer)
  return (
    <>
      <Formik
      validateOnChange={false}
      validateOnBlur={true}
      validateOnMount={false}
        initialValues={initialValue}
        enableReinitialize
        validationSchema={amountSchema}
        onSubmit={(values, { setSubmitting }) => {
          // if (clickCount === 0) {
        
          //   setClickCount(clickCount+1);
          // }else{
          
          setSubmitting(true);
          const temp = {
            agentId: authDetails.agentId,
            accountHolderBasicDetailId: authDetails.accountHolderId,
            ...onBoardingFormValuesPrevStepData,
            ...values,
            stepName: null
          };
          // const temp = {
          //   ...values,
          //   agentId: authDetails?.agentId,
          //   accountHolderBasicDetailId: authDetails?.accountHolderId,
          //   stepName: null,
          // };
          console.log("temo data",temp);
          const returnPromise = new Promise((resolve, reject) => {
            dispatch(
              post8233_EForm(temp,
                (responseData: any) => {
                  localStorage.setItem("PrevStepData", JSON.stringify(temp));
                  resolve(responseData);
                  history("/Form8233/TaxPayer_Identification/Owner/Documentaion");
                },
                (err: any) => {
                  reject(err);
                }
              )
            );
          })
          return returnPromise
          // dispatch(
          //   CREATE_8233(values, () => {
          //     history("/Form8233/TaxPayer_Identification/Owner/Documentaion");
          //   })
          // );
          // history("/Form8233/TaxPayer_Identification/Owner/Documentaion");
        // }
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
          setFieldValue,
          submitForm
        }) => (
          <Form onSubmit={handleSubmit}>
            <>{console.log(values,errors, "errorsssss")}</>
            <section
              className="inner_content"
              style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
            >

<div className="overlay-div">
            <div className="overlay-div-group">
                <div className="viewInstructions">View Instructions</div>
                <div className="viewform">View Form</div>
                <div className="helpvideo"> 
                
                {GethelpData && GethelpData[9].id === 12 ? (
  <a
    href={GethelpData[9].fieldValue}
    target="popup"
    onClick={() =>
      window.open(
        GethelpData[9].fieldValue,
        'name',
        `width=${GethelpData[9].width},height=${GethelpData[9].height},top=${GethelpData[9].top},left=${GethelpData[9].left}`
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
          <div style={{ padding: "20px 0px",height:"100%" }}>
          <BreadCrumbComponent breadCrumbCode={1359} formName={FormTypeId.F8233}/>
      </div>
      </div>
      <div className="col-8 mt-3">
              <div style={{ padding: "13px" }}>
                <Paper style={{ padding: "10px" }}>

                {values.taxTreaty_CountryOfResidenceId !== obValues?.permanentResidentialCountryId && clickCount === 1 ? (
  <div style={{ backgroundColor: "#e8e1e1", padding: "10px" }}>
    <Typography>
    8233101
      <span >
      <img src={Infoicon} style={{color: "#ffc107",height:"22px",
                  width:"20px",
                  boxShadow:"inherit",
                 

                         
                          cursor: "pointer",
                          marginBottom:"3px"
                         
                        }}/>
        <div>The permanent address country entered at question 4 does not match the permanent address country claimed for treaty purposes entered at question 12c.</div><div>&nbsp;</div><div>Please review the help provided should you need further assistance. There may be special circumstances where this may be appropriate and your agent may need to contact you for further information.</div>
      </span>
    </Typography>
  </div>):""}

                  {values.taxTreaty_DescriptionOfPersonalServiceYouProvide === "" && values.taxTreaty_TotalCompensationYouExpectForThisCalenderYear ==="" && values.taxTreaty_TreatyId === 0 && values.taxTreaty_TreatyArticleId === 0 && values.taxTreaty_TotalCompensationListedon11bExemptFromTax === "" && values.taxTreaty_CountryOfResidenceId === 0 && clickCount === 1 ?
                    (
                      <div  style={{backgroundColor: "#e8e1e1" , padding:"10px"}}>
                      <Typography>
                      8233100
                      <span className="mx-1">
                      <img src={Infoicon} style={{color: "#ffc107",height:"22px",
                      width:"20px",
                      boxShadow:"inherit",
                     
    
                             
                              cursor: "pointer",
                              marginBottom:"3px"
                             
                            }}/>
                        
                        
                    
                      </span>
       
                      
                      </Typography>
                      <div>You have not provided all the detail required in question 11 and 12 that may entitle you to claim tax treaty benefits.  You should not submit Form 8233 if you cannot provide information about the personal services provided or identify the compensation amount tax treaty benefits may apply to. Please review and amend the information or if applicable continue to submit a Form W-8BEN, a Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding.</div>
                     
    
      
                    </div>
                    ):""
                  }



                  {values.taxTreaty_TreatyId !== values.taxTreaty_CountryOfResidenceId && clickCount === 1 ?(
                    <div  style={{backgroundColor: "#e8e1e1" , padding:"10px"}}>
                  <Typography>
                  8233100
                  <span className="mx-1">
                  <img src={Infoicon} style={{color: "#ffc107",height:"22px",
                  width:"20px",
                  boxShadow:"inherit",
                 

                         
                          cursor: "pointer",
                          marginBottom:"3px"
                         
                        }}/>
                    
                    
                
                  </span>
   
                  
                  </Typography>
                  <div>The Tax Treat selected in question 12a does not match the country of permanent residence, selected at question 12c.</div><div>&nbsp;</div><div>Please review the help provided should you need further assistance. There may be special circumstances where this may be appropriate and your agent may need to contact you for further information.</div>
                 

  
                </div>
                  ):""}




                  <Typography
                    align="left"
                    style={{
                     
                      fontSize: "27px",
                      fontWeight: "550",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        padding: "7px",
                        margin:"5px"
                      }}
                    >
                      Part II
                    </span>
                    Claim for Tax Treaty Withholding Exemption and/or Personal
                    Exemption Amount
                  </Typography>

                  <Typography className="mt-4" style={{ fontSize: "15px"}}>
                    <span style={{ fontWeight: "550" }}>11</span> Compensation
                    for independent (and certain dependent) personal services:
                  </Typography>

                  <div className="col-12">
                    <div className="col-12 my-1">
                      <Typography style={{ fontSize: "15px" }}>
                        <span style={{ fontWeight: "550" }}>a</span> Description
                        of personal services you are providing
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit"></Typography>
                                <a onClick={() => setToolInfo("basic")}>
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
                                fontSize: "13px",
                                cursor: "pointer",
                                verticalAlign: "super",
                              }}
                            />
                          </Tooltip>
                        </span>
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
                              <span style={{ fontWeight: "550" }}>
                                {" "}
                                Line 11a.
                              </span>{" "}
                              For compensation for independent personal
                              services, examples of acceptable descriptions to
                              enter on this line include: 'Consulting contract
                              to design software' or 'give three lectures at XYZ
                              University.' For compensation for dependent
                              personal services, examples of acceptable
                              descriptions to enter on this line include:
                            </Typography>

                            <ul>
                              <li>
                                A nonresident alien student may enter 'part-time
                                library assistant,' 'part-time restaurant
                                worker,' or 'teaching one chemistry course per
                                semester to undergraduate students.'
                              </li>
                              <li>
                                A nonresident alien professor or teacher may
                                enter 'teaching at ABC University.'
                              </li>
                              <li>
                                A nonresident alien researcher may enter
                                'research at ABC University's school for liquid
                                crystal research.'
                              </li>
                              <li>
                                A nonresident alien business/vocational trainee
                                may enter 'neurosurgical residency at ABC
                                Hospital' or 'one-year internship in hydraulic
                                engineering at XYZ corporation.'
                              </li>
                            </ul>

                            <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "13px" , color: "#0000C7"}}
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
                      <textarea 
                      name="taxTreaty_DescriptionOfPersonalServiceYouProvide"
                      value={
                        values.taxTreaty_DescriptionOfPersonalServiceYouProvide
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#121112",
                          fontStyle: "italic",
                          //height: "8rem",
                          width: "100%",
                        }}/>
                      {/* <Input
                      multiline
                        name="taxTreaty_DescriptionOfPersonalServiceYouProvide"
                        value={
                          values.taxTreaty_DescriptionOfPersonalServiceYouProvide
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(
                          touched.taxTreaty_DescriptionOfPersonalServiceYouProvide &&
                            errors.taxTreaty_DescriptionOfPersonalServiceYouProvide
                        )}
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#121112",
                          fontStyle: "italic",
                          //height: "3rem",
                          width: "100%",
                          wordWrap:"break-word"
                        }}
                        type="text"
                      /> */}
                      {errors?.taxTreaty_DescriptionOfPersonalServiceYouProvide && typeof errors?.taxTreaty_DescriptionOfPersonalServiceYouProvide === 'string' && (
                                <p className="error">{errors?.taxTreaty_DescriptionOfPersonalServiceYouProvide}</p>
                              )}
                      
                    </div>
                    <div className="col-6 my-3">
                      <Typography style={{ fontSize: "15px" }}>
                        <span style={{ fontWeight: "550" }}>b</span>
                        Total compensation you expect to be paid for these
                        services in this calendar or tax year{" "}
                        <span style={{ color: "red" }}>*</span>
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  TT-032 Total amount of compensation for
                                  personal services
                                </Typography>
                                <a onClick={() => setToolInfo("issue")}>
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
                            <Info
                              style={{
                                color: "#ffc107",
                                fontSize: "13px",
                                cursor: "pointer",
                                verticalAlign: "super",
                              }}
                            />
                          </Tooltip>
                        </span>
                      </Typography>
                      {toolInfo === "issue" ? (
                        <div>
                          <Paper
                            style={{
                              backgroundColor: "#dedcb1",
                              padding: "15px",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography>
                              <span style={{ fontWeight: "550" }}>
                                Line 11b.
                              </span>{" "}
                              Enter the total amount of compensation for
                              personal services you will receive from this
                              withholding agent during the tax year. Enter an
                              estimated amount if you do not know the exact
                              amount.
                            </Typography>

                            <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "13px", color: "#0000C7" }}
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
                      <Input
                        placeholder="$"
                        value={
                          values.taxTreaty_TotalCompensationYouExpectForThisCalenderYear
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(
                          touched.taxTreaty_TotalCompensationYouExpectForThisCalenderYear &&
                            errors.taxTreaty_TotalCompensationYouExpectForThisCalenderYear
                        )}
                        name="taxTreaty_TotalCompensationYouExpectForThisCalenderYear"
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#121112",
                          fontStyle: "italic",
                          height: "50px",
                          width: "100%",
                        }}
                      />
                      {errors?.taxTreaty_TotalCompensationYouExpectForThisCalenderYear && typeof errors?.taxTreaty_TotalCompensationYouExpectForThisCalenderYear === 'string' && (
                                <p className="error">{errors?.taxTreaty_TotalCompensationYouExpectForThisCalenderYear}</p>
                              )}
                      {/* <p className="error">
                        {errors.taxTreaty_TotalCompensationYouExpectForThisCalenderYear}
                      </p> */}
                    </div>

                    <Typography style={{ fontSize: "15px" }}>
                      <span className="mx-1" style={{ fontWeight: "550" }}>
                        12
                      </span>
                      If compensation is exempt from withholding based on a tax
                      treaty benefit, provide:
                      <Typography style={{ fontSize: "15px" }}>
                        Tax treaty and treaty article on which you are basing
                        exemption from withholding
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  TT-033 Treaty and article claimed
                                </Typography>
                                <a onClick={() => setToolInfo("num")}>
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
                            <Info
                              style={{
                                color: "#ffc107",
                                fontSize: "13px",
                                cursor: "pointer",
                                verticalAlign: "super",
                              }}
                            />
                          </Tooltip>
                        </span>
                      </Typography>
                    </Typography>
                    {toolInfo === "num" ? (
                      <div>
                        <Paper
                          style={{
                            backgroundColor: "#dedcb1",
                            padding: "15px",
                            marginBottom: "10px",
                          }}
                        >
                          <Typography>
                            <span style={{ fontWeight: "550" }}>Line 12a.</span>{" "}
                            Enter the specific treaty and article on which you
                            are basing your claim for exemption from withholding
                            For example, “U.S./Germany tax treaty, Article
                            20(4)” or “U.S./Belgium tax treaty, Article 7
                            (business profits)”
                          </Typography>

                          <Link
                            href="#"
                            underline="none"
                            style={{ marginTop: "10px", fontSize: "13px", color: "#0000C7" }}
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
                    <div className="row d-flex col-12">
                      <div className="col-6 my-3">
                        <Typography style={{ fontSize: "15px" }}>
                          <span className="mx-1" style={{ fontWeight: "550" }}>
                            a
                          </span>
                          Treaty:
                        </Typography>

                        <select
                          name="taxTreaty_TreatyId"
                          value={values.taxTreaty_TreatyId}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setTreatyId(e.target.value); // Set state here
                          }}
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#121112",
                            fontStyle: "italic",
                            height: "50px",
                            width: "100%",
                          }}
                        >
                          <option value="">---select---</option>
                              <option value={257}>United Kingdom</option>
                              <option value={258}>United States</option>
                              <option value="">---</option>
                              {getCountriesReducer.allCountriesData?.map((ele:any) => (
                              <option key={ele?.id} value={ele?.id}>{ele?.name}</option>
                                  ))}
                         
                        </select>
                        {errors?.taxTreaty_TreatyId && typeof errors?.taxTreaty_TreatyId === 'string' && (
                                <p className="error">{errors?.taxTreaty_TreatyId}</p>
                              )}
                        {/* <p className="error">{errors.taxTreaty_TreatyId}</p> */}
                      </div>
                      <div className="col-6 my-3">
                        <Typography style={{ fontSize: "15px" }}>
                          <span className="mx-1" style={{ fontWeight: "550" }}>
                            b
                          </span>
                          Article:
                        </Typography>

                        <select
                          value={values.taxTreaty_TreatyArticleId}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="taxTreaty_TreatyArticleId"
                          disabled={values.taxTreaty_TreatyId ? false:true}
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#7e7e7e",
                            fontStyle: "italic",
                            height: "50px",
                            width: "100%",
                          }}
                        >
                           <option value={0}>--Please Select the income types--</option>
                            {GetIncomeTypesData?.map(
                              (ele: any,index:any) => (
                                <option key={ele?.id} value={ele?.id}>
                                  {index+1} - {ele?.description}
                                </option>
                                   )
                                   )}
                        </select>
                        {errors?.taxTreaty_TreatyArticleId && typeof errors?.taxTreaty_TreatyArticleId === 'string' && (
                                <p className="error">{errors?.taxTreaty_TreatyArticleId}</p>
                              )}
                        {/* <p className="error">
                          {errors.taxTreaty_TreatyArticleId}
                        </p> */}
                      </div>
                    </div>

                    <div className="d-flex col-12">
                      <div className="col-6 my-3">
                        <Typography style={{ fontSize: "15px" }}>
                          <span style={{ fontWeight: "550" }}> c</span> Total
                          compensation listed on line 11b above that is exempt
                          from tax under this treaty
                          <span style={{ color: "red" }}>*</span>
                          <span>
                            <Tooltip
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                              title={
                                <>
                                  <Typography color="inherit"></Typography>
                                  <a onClick={() => setToolInfo("receive")}>
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
                                  fontSize: "13px",
                                  cursor: "pointer",
                                  verticalAlign: "super",
                                }}
                              />
                            </Tooltip>
                          </span>
                        </Typography>
                        {toolInfo === "receive" ? (
                          <div>
                            <Paper
                              style={{
                                backgroundColor: "#dedcb1",
                                padding: "15px",
                                marginBottom: "10px",
                              }}
                            >
                              <Typography>
                                <span style={{ fontWeight: "550" }}>
                                  Line 12c.
                                </span>
                                If all income received for the services
                                performed to which this Form 8233 applies is
                                exempt, check the box. If only part of the
                                income is exempt, enter the exact dollar amount
                                that is exempt from withholding.
                              </Typography>

                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "550" }}>
                                  Exception.
                                </span>
                                If you are claiming a tax treaty benefit that is
                                determined by reference to more than one date of
                                arrival, enter the earlier date of arrival. For
                                example, you are currently claiming treaty
                                benefits (as a teacher or a researcher) under
                                article 15 of the tax treaty between the United
                                States and Norway. You previously claimed treaty
                                benefits (as a student) under article 16(1) of
                                that treaty. Under article 16(4) of that treaty,
                                the combination of exemptions under articles 15
                                and 16(1) may not extend beyond 5 tax years from
                                the date you entered the United States. If
                                article 16(4) of that treaty applies, enter on
                                line 8 the date you entered the United States as
                                a student.
                              </Typography>

                              <Link
                                href="#"
                                underline="none"
                                style={{ marginTop: "10px", fontSize: "13px" , color: "#0000C7"}}
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

                        <Input
                          name="taxTreaty_TotalCompensationListedon11bExemptFromTax"
                          value={
                            values.taxTreaty_TotalCompensationListedon11bExemptFromTax
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(
                            touched.taxTreaty_TotalCompensationListedon11bExemptFromTax &&
                              errors.taxTreaty_TotalCompensationListedon11bExemptFromTax
                          )}
                          disabled={values.taxTreaty_CheckAll}
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#121112",
                            fontStyle: "italic",
                            height: "50px",
                            width: "100%",
                          }}
                        />
                        {errors?.taxTreaty_TotalCompensationListedon11bExemptFromTax && typeof errors?.taxTreaty_TotalCompensationListedon11bExemptFromTax === 'string' && (
                                <p className="error">{errors?.taxTreaty_TotalCompensationListedon11bExemptFromTax}</p>
                              )}
                        {/* <p className="error">
                          {
                            errors.taxTreaty_TotalCompensationListedon11bExemptFromTax
                          }
                        </p> */}
                      </div>
                      <div className="col-5 my-3 d-flex" >
                      <Checkbox
                              value={values.taxTreaty_CheckAll}
                              checked={values.taxTreaty_CheckAll}
                             // onChange={handleChange}

                              onChange={(e) => {
                                handleChange(e); //condition
                               setTimeout(() => { setFieldValue("taxTreaty_TotalCompensationListedon11bExemptFromTax","")})
                                
                              }}
                              size="medium"
                              name="taxTreaty_CheckAll" 
                              className="mt-4"

                          />
                        <Typography
                          style={{ marginTop: "3.7rem", fontSize: "15px" }}
                        >
                          Check for All
                        </Typography>
                      </div>
           
                    </div>

                    <div className="col-6 my-3">
                      <Typography style={{ fontSize: "15px" }}>
                        <span style={{ fontWeight: "550" }}> d</span> Country of
                        residence
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  TT-051 Date of entry into the United States
                                </Typography>
                                <a onClick={() => setToolInfo("residence")}>
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
                                fontSize: "13px",
                                cursor: "pointer",
                                verticalAlign: "super",
                              }}
                            />
                          </Tooltip>
                        </span>
                      </Typography>
                      <Typography style={{ fontSize: "15px" }}>
                        Country:
                      </Typography>
                      {toolInfo === "residence" ? (
                        <div>
                          <Paper
                            style={{
                              backgroundColor: "#dedcb1",
                              padding: "15px",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography>
                              <span style={{ fontWeight: "550" }}>
                                Line 12d.
                              </span>
                              Generally, you may claim a withholding exemption
                              based on a U.S. tax treaty with the country in
                              which you claim permanent (or indefinite)
                              residence. This is the foreign country in which
                              you live most of the time. It is not necessarily
                              the country of your citizenship.
                            </Typography>

                            <Typography style={{ marginTop: "10px" }}>
                              For example, you are a citizen of Pakistan but
                              maintain your home in England. You cannot claim a
                              withholding exemption based on the U.S./Pakistan
                              tax treaty. Any withholding exemption you claim
                              must be based on the U.S./United Kingdom tax
                              treaty.
                            </Typography>

                            <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "13px" , color: "#0000C7"}}
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
                      {/* <Input
                        name="taxTreaty_CountryOfResidenceId"
                        value={values.taxTreaty_CountryOfResidenceId}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(
                          touched.taxTreaty_CountryOfResidenceId &&
                            errors.taxTreaty_CountryOfResidenceId
                        )}
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#7e7e7e",
                          fontStyle: "italic",
                          height: "50px",
                          width: "100%",
                        }}
                      /> */}
                       <select
                          name="taxTreaty_CountryOfResidenceId"
                          value={values.taxTreaty_CountryOfResidenceId}
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
                        >
                          <option value="">---select---</option>
                              <option value={257}>United Kingdom</option>
                              <option value={258}>United States</option>
                              <option value="">---</option>
                              {getCountriesReducer.allCountriesData?.map((ele:any) => (
                              <option key={ele?.id} value={ele?.id}>{ele?.name}</option>
                                  ))}
                        </select>
                        {errors?.taxTreaty_CountryOfResidenceId && typeof errors?.taxTreaty_CountryOfResidenceId === 'string' && (
                                <p className="error">{errors?.taxTreaty_CountryOfResidenceId}</p>
                              )}
                      {/* <p className="error">
                        {errors.taxTreaty_CountryOfResidenceId}
                      </p> */}
                    </div>
                    <Typography style={{ fontSize: "15px" }}>
                      <span style={{ fontWeight: "550" }}>Note:</span> Do not
                      complete lines 13a through 13c unless you also received
                      compensation for personal services
                      <span style={{ fontWeight: "550" }}>
                        &nbsp; from the same withholding agent
                      </span>
                    </Typography>

                    <div className="col-6 my-3">
                      <Typography style={{ fontSize: "15px" }}>
                        <span style={{ fontWeight: "550" }}>13</span>
                        Noncompensatory scholarship or fellowship income:
                      </Typography>

                      <Typography style={{ fontSize: "15px" }}>
                        <span style={{ fontWeight: "550" }}> a</span> Amount
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  TT-036 Non compensatory scholarship or
                                  fellowship income
                                </Typography>
                                <a onClick={() => setToolInfo("united")}>
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
                                fontSize: "13px",
                                cursor: "pointer",
                                verticalAlign: "super",
                              }}
                            />
                          </Tooltip>
                        </span>
                      </Typography>
                      {toolInfo === "united" ? (
                        <div>
                          <Paper
                            style={{
                              backgroundColor: "#dedcb1",
                              padding: "15px",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography>
                              <span style={{ fontWeight: "550" }}>
                                Line 13a.
                              </span>
                              Enter non compensatory scholarship or fellowship
                              income.
                            </Typography>

                            <Typography style={{ marginTop: "10px" }}>
                              <span style={{ fontWeight: "550" }}>Note:</span>
                              Do not complete lines 13a through 13c unless you
                              also received compensation for personal services
                              &nbsp; from the same withholding agent.
                            </Typography>

                            <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "13px", color: "#0000C7" }}
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
                      <Input
                        value={
                          values.taxTreaty_NoncompensatoryScholarshiporFellowshipIncome
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(
                          touched.taxTreaty_NoncompensatoryScholarshiporFellowshipIncome &&
                            errors.taxTreaty_NoncompensatoryScholarshiporFellowshipIncome
                        )}
                        name="taxTreaty_NoncompensatoryScholarshiporFellowshipIncome"
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#121112",
                          fontStyle: "italic",
                          height: "50px",
                          width: "100%",
                        }}
                      />
                      {errors?.taxTreaty_NoncompensatoryScholarshiporFellowshipIncome && typeof errors?.taxTreaty_NoncompensatoryScholarshiporFellowshipIncome === 'string' && (
                                <p className="error">{errors?.taxTreaty_NoncompensatoryScholarshiporFellowshipIncome}</p>
                              )}
                      {/* <p className="error">
                        {
                          errors.taxTreaty_NoncompensatoryScholarshiporFellowshipIncome
                        }
                      </p> */}
                    </div>

                    <Typography style={{ fontSize: "15px" }}>
                      Tax treaty &nbsp;
                      <span style={{ fontWeight: "550" }}>
                        and treaty article &nbsp;
                      </span>
                      on which you are basing exemption from withholding
                      <span>
                        <Tooltip
                          style={{ backgroundColor: "black", color: "white" }}
                          title={
                            <>
                              <Typography color="inherit">
                                TT-037 Specific treaty and article claimed
                              </Typography>
                              <a onClick={() => setToolInfo("status")}>
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
                              fontSize: "13px",
                              cursor: "pointer",
                              verticalAlign: "super",
                            }}
                          />
                        </Tooltip>
                      </span>
                    </Typography>
                    {toolInfo === "status" ? (
                      <div>
                        <Paper
                          style={{
                            backgroundColor: "#dedcb1",
                            padding: "15px",
                            marginBottom: "10px",
                          }}
                        >
                          <Typography>
                            <span style={{ fontWeight: "550" }}>Line 13b.</span>
                            Enter the specific treaty and article on which you
                            are basing your claim for exemption from withholding
                            For example, “U.S./Germany tax treaty, Article
                            20(3)”.
                          </Typography>

                          <Link
                            href="#"
                            underline="none"
                            style={{ marginTop: "10px", fontSize: "13px" , color: "#0000C7"}}
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

                    <div className="row col-12 mt-2">
                      <div className="col-6 ">
                        <Typography style={{ fontSize: "15px" }}>
                          <span style={{ fontWeight: "550" }}>b </span>Treaty:
                        </Typography>

                        <select
                          name="taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID"
                          value={
                            values.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID
                          }
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setTreatyIdOnWhichBasicExemption(e.target.value); // Set state here
                          }}
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#121112",
                            fontStyle: "italic",
                            height: "50px",
                            width: "100%",
                          }}
                        >
                         <option value="">---select---</option>
                              <option value={257}>United Kingdom</option>
                              <option value={258}>United States</option>
                              <option value="">---</option>
                              {getCountriesReducer.allCountriesData?.map((ele:any) => (
                              <option key={ele?.id} value={ele?.id}>{ele?.name}</option>
                                  ))}
                        </select>
                        {errors?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID && typeof errors?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID === 'string' && (
                                <p className="error">{errors?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID}</p>
                              )}
                        {/* <p className="error">
                          {
                            errors.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID
                          }
                        </p> */}
                      </div>

                      <div className="col-6 ">
                        <Typography style={{ fontSize: "15px" }}>
                          <span style={{ fontWeight: "550" }}>c </span> Article:
                        </Typography>

                        <select
                          value={values.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID"
                          disabled={values.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID ? false:true}
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#7e7e7e",
                            fontStyle: "italic",
                            height: "50px",
                            width: "100%",
                          }}
                        >
                           <option value={0}>--Please Select the income types--</option>
                            {GetIncomeTypesData?.map(
                              (ele: any,index:any) => (
                                <option key={ele?.id} value={ele?.id}>
                                  {index+1} - {ele?.description}
                                </option>
                                   )
                                   )}
                        </select>
                        {errors?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID && typeof errors?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID === 'string' && (
                                <p className="error">{errors?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID}</p>
                              )}

                        {/* <Input
                          value={
                            values.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(
                            touched.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID &&
                              errors.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID
                          )}
                          name="taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID"
                          fullWidth
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#121112",
                            fontStyle: "italic",
                            height: "50px",
                            width: "100%",
                          }}
                        />
                        {errors?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID && typeof errors?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID === 'string' && (
                                <p className="error">{errors?.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID}</p>
                              )} */}
                        {/* <p className="error">
                          {
                            errors.taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID
                          }
                        </p> */}
                      </div>
                    </div>

                    <div className="col-6 my-3">
                      <Typography style={{ fontSize: "15px" }}>
                        <span className="mx-1" style={{ fontWeight: "550" }}>
                          d
                        </span>
                        Total income listed on line 13a above that is exempt
                        from tax under this treaty
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  TT-038 Income listed in 13a
                                </Typography>
                                <a onClick={() => setToolInfo("issue")}>
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
                                fontSize: "13px",
                                cursor: "pointer",
                                verticalAlign: "super",
                              }}
                            />
                          </Tooltip>
                        </span>
                      </Typography>
                      {toolInfo === "issue" ? (
                        <div>
                          <Paper
                            style={{
                              backgroundColor: "#dedcb1",
                              padding: "15px",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography>
                              <span style={{ fontWeight: "550" }}>
                                Line 13c..
                              </span>
                              Enter income listed in 13a that is exempt from tax
                              under this treaty.
                            </Typography>

                            <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "13px" , color: "#0000C7"}}
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
                      <Input
                        value={
                          values.totalIncomeListedIncomeonLine13ATaxExemptAmount
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(
                          touched.totalIncomeListedIncomeonLine13ATaxExemptAmount &&
                            errors.totalIncomeListedIncomeonLine13ATaxExemptAmount
                        )}
                        name="totalIncomeListedIncomeonLine13ATaxExemptAmount"
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#121112",
                          fontStyle: "italic",
                          height: "50px",
                          width: "100%",
                        }}
                      />
                      {errors?.totalIncomeListedIncomeonLine13ATaxExemptAmount && typeof errors?.totalIncomeListedIncomeonLine13ATaxExemptAmount === 'string' && (
                                <p className="error">{errors?.totalIncomeListedIncomeonLine13ATaxExemptAmount}</p>
                              )}
                      {/* <p className="error">
                        {errors.totalIncomeListedIncomeonLine13ATaxExemptAmount}
                      </p> */}
                    </div>

                    <div className="col-12 my-3">
                      <Typography style={{ fontSize: "15px" }}>
                        <span className="mx-1" style={{ fontWeight: "550" }}>
                          14
                        </span>
                        Sufficient facts to justify the exemption from
                        withholding claimed on line 12 and/or line 13 (see
                        instructions)
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  TT-039 Explain your withholding claim
                                </Typography>
                                <a onClick={() => setToolInfo("explain")}>
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
                                fontSize: "13px",
                                cursor: "pointer",
                                verticalAlign: "super",
                              }}
                            />
                          </Tooltip>
                        </span>
                      </Typography>
                      {toolInfo === "explain" ? (
                        <div>
                          <Paper
                            style={{
                              backgroundColor: "#dedcb1",
                              padding: "15px",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography>
                              <span style={{ fontWeight: "550" }}>
                                Line 14..
                              </span>
                              Provide sufficient facts to justify the exemption
                              from withholding claimed on line 12 and/or line
                              13. Be sure you provide enough details to allow
                              the IRS to determine the tax treaty benefit you
                              are claiming.
                            </Typography>

                            <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "13px" , color: "#0000C7"}}
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
                      <textarea 
                      value={
                        values.sufficientFactToJustfyExemptionForClaim12A_13
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // error={Boolean(
                      //   touched.sufficientFactToJustfyExemptionForClaim12A_13 &&
                      //     errors.sufficientFactToJustfyExemptionForClaim12A_13
                      // )}
                      name="sufficientFactToJustfyExemptionForClaim12A_13"
                      style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#121112",
                          fontStyle: "italic",
                          //height: "8rem",
                          width: "100%",
                        }}/>

                      {/* <Input
                      multiline
                        value={
                          values.sufficientFactToJustfyExemptionForClaim12A_13
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(
                          touched.sufficientFactToJustfyExemptionForClaim12A_13 &&
                            errors.sufficientFactToJustfyExemptionForClaim12A_13
                        )}
                        name="sufficientFactToJustfyExemptionForClaim12A_13"
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#121112",
                          fontStyle: "italic",
                          //height: "8rem",
                          width: "100%",
                        }}
                      /> */}
                      {errors?.sufficientFactToJustfyExemptionForClaim12A_13 && typeof errors?.sufficientFactToJustfyExemptionForClaim12A_13 === 'string' && (
                                <p className="error">{errors?.sufficientFactToJustfyExemptionForClaim12A_13}</p>
                              )}
                      {/* <p className="error">
                        {errors.sufficientFactToJustfyExemptionForClaim12A_13}
                      </p> */}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "5rem",
                    }}
                  >
                    <SaveAndExit Callback={() => {
                        submitForm().then(() => {
                          const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                          const urlValue = window.location.pathname.substring(1);
                          // const temp = {
                          //   ...values,
                          //   ...prevStepData,
                          //   agentId: authDetails?.agentId,
                          //   accountHolderBasicDetailId: authDetails?.accountHolderId,
                          //   stepName: `/${urlValue}`
                          // };
                          dispatch(post8233_EForm(
                            {
                              ...values,
                              ...prevStepData,
                              agentId: authDetails?.agentId,
                              accountHolderBasicDetailId: authDetails?.accountHolderId,
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
                    >
                      View Form
                    </Button>
                    <Button
                      type="submit"
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
                    onClick={()=>{
                      history('/Form8233/TaxPayer_Identification/Owner')
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
          </Form>
        )}
      </Formik>
    </>
  );
}
