import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Paper,
  Link,
  Tooltip,
  RadioGroup,
  Radio,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./index.scss";
import Infoicon from "../../../assets/img/info.png";
import { Info } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import IncomeType from "./IncomeType";
import checksolid from "../../../../../assets/img/check-solid.png";
import GlobalValues, { FormTypeId } from "../../../../../Utils/constVals";
import { useDispatch, useSelector } from "react-redux";
import { rateSchema,specilaRateIncomeTypeSchema } from "../../../../../schemas/w8Ben";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import SaveAndExit from "../../../../Reusable/SaveAndExit/Index";
import {GetSpecialRateAndCondition,GetCountryArticleByID, getAllCountriesIncomeCode,postW8BENForm,GetHelpVideoDetails,UpsertSpecialRateAndCondition } from "../../../../../Redux/Actions";
import useAuth from "../../../../../customHooks/useAuth";
import { useLocation } from "react-router-dom";
export default function Factors() {
  const history = useNavigate();
  const { authDetails } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const [numPapers, setNumPapers] = useState(1);
  const addIncomeTypePaper = () => {
    setNumPapers(numPapers + 1);
  };
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const deleteIncomeTypePaper = () => {
    setNumPapers(numPapers - 1);
  };
  const [clickCount, setClickCount] = useState(0);
  const [toolInfo, setToolInfo] = useState("");
  const [incomeTypesValid, setIncomeTypeValid] = useState(true);
  const [status, setStatus] = useState("");
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };
  const urlValue = location.pathname.substring(1);
 const agentDefaultDetails = JSON.parse(
    localStorage.getItem("agentDefaultDetails") || "{}"
  );

const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
const W8BENEData = useSelector((state: any) => state.W8BEN);
const CountryArticle = useSelector((state: any) => state.CountryArticle.CountryArticleData);
const ResidenceCountryId = PrevStepData.ownerResidentId !== "" || PrevStepData.ownerResidentId !== undefined ? PrevStepData.ownerResidentId : "0";
const SpecialRateAndConditionIncomeTypes = useSelector((state: any) => state.SpecialRateAndConditionIncomeTypes);
 
  useEffect(()=>{
    dispatch(getAllCountriesIncomeCode());
    dispatch(GetHelpVideoDetails());

  },[])

  useEffect(() => {
    dispatch(GetSpecialRateAndCondition(authDetails?.accountHolderId, (res: any[]) => {
      console.log(res, "existing data");
      let temp = res.map((ele: any) => {
        return {
          agentId: authDetails.agentId,
          accountHolderDetailsId: authDetails?.accountHolderId,
          formTypeId: FormTypeId.BEN,
          formEntryId: ele.formEntryId,
          articleBeneficalOwner: JSON.stringify(ele?.articleBeneficalOwner),
          paragraphArticleClaimed: ele?.paragraphArticleClaimed,
          subParagraphArticle: ele?.subParagraphArticle,
          withHoldingClaim: JSON.stringify(ele?.withHoldingClaim),
          incomeExpectedId: JSON.stringify(ele?.incomeExpectedId),
        }
      })
      setIncomeTypeData(temp);
    }))
  }, [authDetails])

  useEffect(() => {
    // Id 3 to be changed with ResidenceCountryId when correct data is filled
    dispatch(GetCountryArticleByID(ResidenceCountryId, (data: any) => {
      //console.log(data,"GetCountryArticleByID")
    }))
  }, [ResidenceCountryId])

  useEffect(() => {
    console.log(CountryArticle, "GetCountryArticleByID")
  }, [CountryArticle])
const GetAllIncomeCodesReducer = useSelector(
    
    (state: any) => state.GetAllIncomeCodesReducer
  );
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  console.log("GetAllIncomeCodesReducer" , GetAllIncomeCodesReducer)
  const initialValue = {
    ...PrevStepData,
    ...W8BENEData,
    isSubmissionSpecialRates: PrevStepData.isSubmissionSpecialRates === true ? "yes" : "no",
    articleExplanation: PrevStepData?.articleExplanation !== "" && PrevStepData?.articleExplanation !== undefined ? PrevStepData?.articleExplanation : "",
  };

  const individualIncomeType = {
    agentId: authDetails?.agentId,
    accountHolderDetailsId: authDetails?.accountHolderId,
    formTypeId: 3,
    formEntryId: 0,
    articleBeneficalOwner: "0",
    paragraphArticleClaimed: "0",
    subParagraphArticle: "",
    withHoldingClaim: "0",
    incomeExpectedId: "0",
  };
  
  const [incomeTypeData, setIncomeTypeData] = useState(SpecialRateAndConditionIncomeTypes?.length > 0 ? [...SpecialRateAndConditionIncomeTypes] : [{ ...individualIncomeType }]);

  const DeleteIncomeType = (index: number) => {
    let temp = [...incomeTypeData]
    console.log(index, "deleting box", temp?.splice(index, 1))
    setIncomeTypeData([...temp]);
  }

  useEffect(() => {
    console.log(incomeTypeData, "income type data")
    let isLengthMore = false;
    for (let i = 0; i < incomeTypeData.length; i++) {
      specilaRateIncomeTypeSchema("yes").validate(incomeTypeData[i])
        .then((error) => {

        }).catch((error) => {
          setIncomeTypeValid(false);
          console.log(error);
        })
    }
  }, [incomeTypeData])

  const AddIncomeType = () => {
    setIncomeTypeData((prev) => {
      return [...prev, { ...individualIncomeType }];
    })
  }

  const UpdateIncomeType = (payload: any, index: number) => {
    setIncomeTypeData((prev) => {
      let temp = [...prev];
      temp[index] = payload;
      return temp;
    });
    setIncomeTypeValid(true);
  }

  const SubmitIncomeTypes = () => {
    let returnPromise = new Promise((resolve, reject) => {
      let temp = incomeTypeData.map((ele: any, index: number) => {
        let payload =
        {
          id: 0,
          accountHolderDetailsId: authDetails?.accountHolderId,
          agentId: authDetails?.agentId,
          formTypeId: 3,
          formEntryId: index + 1,
          articleBeneficalOwner: Number.parseInt(ele.articleBeneficalOwner),
          paragraphArticleClaimed: Number.parseInt(ele.paragraphArticleClaimed),
          subParagraphArticle: ele.subParagraphArticle,
          withHoldingClaim: Number.parseInt(ele.withHoldingClaim),
          incomeExpectedId: Number.parseInt(ele.incomeExpectedId)
        }
        return payload;
      })
        ;
      dispatch(UpsertSpecialRateAndCondition(temp, (data: any) => resolve(data), (err: any) => { reject(err) }))
    })
    return returnPromise;
  }

  const viewPdf=()=>{
    history("/w8Ben_pdf");
    // history("/w8Ben_pdf", { replace: true });
  }
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
                {GethelpData && GethelpData[4].id === 6 ? (
  <a
    href={GethelpData[4].fieldValue}
    target="popup"
    onClick={() =>
      window.open(
        GethelpData[4].fieldValue,
        'name',
        `width=${GethelpData[4].width},height=${GethelpData[4].height},top=${GethelpData[4].top},left=${GethelpData[4].left}`
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
          <BreadCrumbComponent breadCrumbCode={1256} formName={2}/>
      </div>
      </div>
      <div className="col-8 mt-3">

      <div style={{ padding: "12px" }}>
        <Paper style={{ padding: "18px" }}>
          <Formik
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={true}
            initialValues={initialValue}
            enableReinitialize
            validationSchema={rateSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              let temp = {
                ...PrevStepData,
                agentId: authDetails?.agentId,
                accountHolderBasicDetailId: authDetails?.accountHolderId,
                isSubmissionSpecialRates: values.isSubmissionSpecialRates === "yes" ? true : false,
                articleExplanation: values.articleExplanation,
                stepName: null
              }
              const returnPromise = new Promise((resolve, reject) => {
                SubmitIncomeTypes().then((data: any) => {
                  dispatch(postW8BENForm(temp, (retData: any) => {
                    localStorage.setItem("PrevStepData", JSON.stringify(temp));
                    resolve(retData);
                  },
                    (err: any) => {
                      reject(err);
                    }
                  ))
                }).catch((err: any) => {
                  reject(err);
                })
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
               setFieldValue,
               submitForm,
               isValid
            }) => (
              <Form onSubmit={handleSubmit}>
                <>{console.log(errors, values, "valeeeeeeeeeee")}</>


                {values.isSubmissionSpecialRates === "Yes"  && clickCount === 1 ?( <div className ="my-4 mx-3" style={{backgroundColor: "#e8e1e1" , padding:"10px" }}>
                <div style={{fontWeight:"550"}}>SRC101<br />Special Conditions</div><div>&nbsp;</div><p>You have answered YES to the Special Conditions question. You would normally only select YES if you are claiming treaty benefits that require you meet conditions NOT covered in the representation you made above.</p><div>&nbsp;</div><p>However, the Special Conditions section should always be completed by non-U.S. students and non-U.S. researchers claiming treaty benefits.</p><div>&nbsp;</div><p>Additional examples of persons who should select YES and complete the Special Conditions requirements include:</p><ul><li>Exempt organizations claiming treaty benefits under the exempt organization articles of the treaties with Canada, Mexico, Germany and the Netherlands.</li><li>Non-U.S. corporations that are claiming a preferential rate applicable to dividends based on ownership of a specific percentage of stock.</li><li>Persons claiming treaty benefits on ROYALTIES if the treaty contains different withholding rates for different types of royalties.<br /></li></ul><div>&nbsp;</div><p>The Special Conditions question is generally not applicable to claiming treaty benefits under an interest or dividends (other than dividends subject to preferential rate based on ownership) article of a treaty.</p><ul></ul>
                  
                 
                </div>):""}
                <div style={{ margin: "10px" }}>
                  <Typography
                    align="left"
                    style={{ marginTop: "10px", fontSize: "27px" ,fontWeight:"550"}}
                  >
                    Special Rates and Conditions
                    <span>
                      <Tooltip
                        style={{ backgroundColor: "black", color: "white" }}
                        title={
                          <>
                            <Typography color="inherit">
                              Special Rates & Conditions
                            </Typography>
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
                            fontSize: "16px",
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
                          You should only select 'Yes' and proceed through the
                          Special Rates and Conditions flow if you are claiming
                          specific treaty benefits that require you to meet
                          conditions you haven't already declared in your
                          submission. For example, for royalty income, you must
                          complete this line if your country's treaty specifies
                          different withholding rates for different kinds of
                          royalties. See the IRS's Tax Treaty Table (February
                          2019 version available in English here) for more about
                          the Treaty Rates that different countries have
                          negotiated with the US.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          The following are additional examples of persons who
                          should complete this section.
                        </Typography>
                        <Typography style={{ marginTop: "20px" }}>
                          - Exempt organizations claiming treaty benefits under
                          the exempt organization articles of the treaties with
                          Canada, Mexico, Germany, and the Netherlands.
                        </Typography>

                        <Typography style={{ marginTop: "20px" }}>
                          - Foreign corporations that are claiming a
                          preferential rate applicable to dividends based on
                          ownership of a specific percentage of stock.
                        </Typography>
                        <Typography style={{ marginTop: "20px" }}>
                          - Persons claiming treaty benefits on royalties if the
                          treaty contains different withholding rates for
                          different types of royalties.
                        </Typography>
                        <Typography style={{ marginTop: "20px" }}>
                          - Effect of Tax Treaties
                        </Typography>
                        <Typography style={{ marginTop: "20px" }}>
                          This line is generally not applicable to claiming
                          treaty benefits under an interest or dividends (other
                          than dividends subject to a preferential rate based on
                          ownership) article of a treaty.
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
                    <div style={{ marginTop: "15px" }}>
                        <Typography style={{ fontSize: "22px" }}>
                          Is the submission being made to claim treaty benefits on
                          items not covered by the representations made above and
                          where special withholding rates and conditions may apply?
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="isSubmissionSpecialRates"
                            onChange={handleChange}
                            value={values.isSubmissionSpecialRates}
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                              name="isSubmissionSpecialRates"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                              name="isSubmissionSpecialRates"
                            />
                          </RadioGroup>
                          <p className="error">{typeof (errors.isSubmissionSpecialRates) === "string" && touched.isSubmissionSpecialRates ? errors.isSubmissionSpecialRates : ""}</p>
                        </FormControl>
                      </div>

                      {values.isSubmissionSpecialRates == "yes" ? (
                        <>
                          <Typography style={{ fontSize: "20px" }}>
                            Please select the Article, Paragraph, rate of
                            withholding and income types claimed below:{" "}
                            <span>
                              <Tooltip
                                style={{ backgroundColor: "black", color: "white" }}
                                title={
                                  <>
                                    <Typography color="inherit">
                                      Special Rates & Conditions Info
                                    </Typography>
                                    <a onClick={() => setToolInfo("type")}>
                                      <Typography
                                        style={{
                                          cursor: "pointer",
                                          textDecorationLine: "underline",
                                          fontSize: "18px",
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
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    verticalAlign: "super",
                                  }}
                                />
                              </Tooltip>
                            </span>
                            {toolInfo === "type" ? (
                              <div>
                                <Paper
                                  style={{
                                    backgroundColor: "#dedcb1",
                                    padding: "15px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <Typography>
                                    You should only select 'Yes' and proceed through
                                    the Special Rates and Conditions flow if you are
                                    claiming specific treaty benefits that require
                                    you to meet conditions you haven't already
                                    declared in your submission. For example, for
                                    royalty income, you must complete this line if
                                    your country's treaty specifies different
                                    withholding rates for different kinds of
                                    royalties. See the IRS's Tax Treaty Table
                                    (February 2019 version available in English
                                    here) for more about the Treaty Rates that
                                    different countries have negotiated with the US.
                                  </Typography>
                                  <Typography style={{ marginTop: "10px" }}>
                                    The following are additional examples of persons
                                    who should complete this section.
                                  </Typography>
                                  <Typography style={{ marginTop: "20px" }}>
                                    - Exempt organizations claiming treaty benefits
                                    under the exempt organization articles of the
                                    treaties with Canada, Mexico, Germany, and the
                                    Netherlands.
                                  </Typography>

                                  <Typography style={{ marginTop: "20px" }}>
                                    - Foreign corporations that are claiming a
                                    preferential rate applicable to dividends based
                                    on ownership of a specific percentage of stock.
                                  </Typography>
                                  <Typography style={{ marginTop: "20px" }}>
                                    - Persons claiming treaty benefits on royalties
                                    if the treaty contains different withholding
                                    rates for different types of royalties.
                                  </Typography>
                                  <Typography style={{ marginTop: "20px" }}>
                                    - Effect of Tax Treaties
                                  </Typography>
                                  <Typography style={{ marginTop: "20px" }}>
                                    This line is generally not applicable to
                                    claiming treaty benefits under an interest or
                                    dividends (other than dividends subject to a
                                    preferential rate based on ownership) article of
                                    a treaty.
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
                          </Typography>
                          {incomeTypeData.map((_, index) => (
                            <IncomeType index={index} DeleteIncomeType={DeleteIncomeType} length={incomeTypeData.length} data={incomeTypeData[index]} UpdateIncomeType={UpdateIncomeType} CountryArticle={CountryArticle} />
                          ))}

                          <div style={{ marginTop: "20px" }}>
                            <Button
                              onClick={AddIncomeType}
                              variant="contained"
                              size="large"
                              style={{ backgroundColor: "black", color: "white" }}
                            >
                              Add Income Type
                            </Button>
                          </div>
                          <div>
                            <Typography
                              align="left"
                              style={{ fontSize: "22px", marginTop: "10px" }}
                            >
                              Please provide a brief explanation why the beneficial
                              owner meets the terms of the treaty article or
                              articles identified above:
                              <span style={{ color: "red", fontSize: "30px" }}>
                                *
                              </span>
                              <span></span>
                            </Typography>
                            <FormControl className="w-100">
                              <TextField
                                className="col-md-10 col-12"
                                name="articleExplanation"
                                value={values.articleExplanation}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <p className="error">{typeof (errors.articleExplanation) === "string" && touched.articleExplanation ? errors.articleExplanation : ""}</p>
                            </FormControl>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "80px",
                  }}
                >
                    <SaveAndExit Callback={() => {
                        submitForm().then((data) => {
                          const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                          const urlValue = window.location.pathname.substring(1);
                          dispatch(postW8BENForm(
                            {
                              ...prevStepData,
                              stepName: `/${urlValue}`
                            }
                            , () => {
                              history(
                                GlobalValues.basePageRoute
                              );
                            }))

                        }).catch((err) => {
                          console.log(err);
                        })
                      }} formTypeId={FormTypeId.BEN} />
                  <Button
                    variant="contained"
                    style={{ color: "white", marginLeft: "15px" }}
                    onClick={viewPdf}
                  >
                    View form
                  </Button>
                  {values.isSubmissionSpecialRates == "yes" ? (<Button
                        //type="submit"
                        disabled={(!incomeTypesValid || !isValid) && values.isSubmissionSpecialRates !== "no"}
                        variant="contained"
                        style={{ color: "white", marginLeft: "15px" }}
                        onClick={() =>
                          submitForm().then((data) => {
                            history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE")
                          }).catch((err) => {
                            console.log(err);
                          })
                        }
                      >
                        Continue
                      </Button>) : <>
                        <Button
                          disabled={(!incomeTypesValid || !isValid) && values.isSubmissionSpecialRates !== "no"}
                          onClick={() =>
                            submitForm().then((data) => {
                              history("/W-8BEN/Declaration/US_Tin/Certificates")
                            }).catch((err) => {
                              console.log(err);
                            })
                          }
                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                        >
                          Continue


                        </Button>
                      </>}
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
                  onClick={()=>{
                    history('/W-8BEN/Declaration/US_Tin/Claim')
                  }}
                    variant="contained"
                    size="large"
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
