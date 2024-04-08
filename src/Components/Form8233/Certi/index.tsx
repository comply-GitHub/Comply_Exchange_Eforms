import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider";
import { Typography, Button, Paper, Checkbox,Tooltip,Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { certificateSchema } from "../../../schemas/8233";
import { CREATE_8233,GetHelpVideoDetails, post8233_EForm } from "../../../Redux/Actions";
import { useDispatch,useSelector } from "react-redux";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";

export default function Certifications(props: any) {
  const { authDetails } = useAuth();

  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    document.title = "Comply Exchange"
    dispatch(GetHelpVideoDetails());
  },[]);

  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const [toolInfo, setToolInfo] = useState("");
  const onBoardingFormValuesPrevStepData = JSON.parse(localStorage.getItem("PrevStepData") ?? "null");


  const initialValue = {
    i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome: onBoardingFormValuesPrevStepData?.i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome ? onBoardingFormValuesPrevStepData?.i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome:false,
    i_Certify_BeneficialOwnerIsNotUSPerson:  onBoardingFormValuesPrevStepData?.i_Certify_BeneficialOwnerIsNotUSPerson ? onBoardingFormValuesPrevStepData?.i_Certify_BeneficialOwnerIsNotUSPerson:false,
    i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B:  onBoardingFormValuesPrevStepData?.i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B ? onBoardingFormValuesPrevStepData?.i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B:false,
    i_Certify_FurthermoreIAuthorise:  onBoardingFormValuesPrevStepData?.i_Certify_FurthermoreIAuthorise ? onBoardingFormValuesPrevStepData?.i_Certify_FurthermoreIAuthorise:false,
    i_Certify_ConfirmYouHaveReviewedTheElectronicForm:  onBoardingFormValuesPrevStepData?.i_Certify_ConfirmYouHaveReviewedTheElectronicForm ? onBoardingFormValuesPrevStepData?.i_Certify_ConfirmYouHaveReviewedTheElectronicForm:false,
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
    
    
     <div className="row w-100 h-100">
    <div className="col-4">
      <div style={{ padding: "20px 0px",height:"100%" }}>
      <BreadCrumbComponent breadCrumbCode={1500} formName={2}/>
  </div>
  </div>
  <div className="col-8 mt-3">
      <div style={{ padding: "13px" }}>
        <Paper style={{ padding: "10px" }}>
          <Formik
           validateOnChange={false}
           validateOnBlur={false}
            initialValues={initialValue}
            enableReinitialize
            validationSchema={certificateSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              const temp = {
                ...values,
                agentId: authDetails?.agentId,
                accountHolderBasicDetailId: authDetails?.accountHolderId,
                stepName: null,
              };
    
              const returnPromise = new Promise((resolve, reject) => {
                dispatch(
                  post8233_EForm(temp,
                    (responseData: any) => {
                      localStorage.setItem("PrevStepData", JSON.stringify(temp));
                      resolve(responseData);
                      history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission");
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
              //     history(
              //       "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission"
              //     );
              //   })
              // );
              // history(
              //   "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission"
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
              isSubmitting,
              submitForm
            }) => (
              <Form onSubmit={handleSubmit}>
                <Typography
                  align="left"
                  style={{
                    margin: "10px",
                    fontSize: "27px",
                    fontWeight: "550",
                    marginLeft: "10px",
                  }}
                >
                  Certification   <span style={{ color: "red" }}>*</span>
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
                        style={{ marginTop: "10px", fontSize: "16px" , color: "blue" }}
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
                <Paper
                  style={{
                    marginLeft: "10px",
                    padding: "10px",
                    border: "2px solid black",
                    fontSize: "19px",
                  }}
                  className="my-3"
                >
                  <span
                    style={{ backgroundColor: "darkgrey", padding: "10px" }}
                  >
                    Part III
                  </span>{" "}
                  Certification
                </Paper>

                <Typography
                  style={{
                    margin: "10px",
                    fontSize: "20px",

                    marginLeft: "10px",
                  }}
                >
                  <span style={{ fontWeight: "550" }}>I certify that:</span>
                </Typography>
                <Typography
                  style={{
                    margin: "10px",
                   fontSize: "14px",
                    color: "grey",
                    marginLeft: "10px",
                    textAlign:"justify" 
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
                        className="mx-2"
                        name="i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome"
                        value={values.i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome}
                        checked={values.i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome}
                        onChange={handleChange}
                        size="medium"
                        style={{ fontSize: "2rem" }}
                      />
                     
                      <Typography
                        style={{
                         fontSize: "14px",
                          color: "black",
                          marginTop: "10px",
                          textAlign:"justify" 
                        }}
                      >
                        1. I am the beneficial owner (or am authorized to sign
                        for the beneficial owner) of all the income to which
                        this form relates.

                        {errors?.i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome && typeof errors?.i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome === 'string' && (
                                <p className="error">{errors?.i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome}</p>
                              )}


                        {/* <p className="error">
                          {
                            errors.i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome
                          }
                        </p> */}
                      </Typography>
                    </Typography>
                    <Divider
                      style={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        backgroundColor: "black",
                      }}
                    />
                    <Typography style={{ display: "flex" }}>
                      <Checkbox
                        className="mx-2"
                        name="i_Certify_BeneficialOwnerIsNotUSPerson"
                        value={values.i_Certify_BeneficialOwnerIsNotUSPerson}
                        checked={values.i_Certify_BeneficialOwnerIsNotUSPerson}
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
                        2.The beneficial owner is not a U.S. person.
                        {errors?.i_Certify_BeneficialOwnerIsNotUSPerson && typeof errors?.i_Certify_BeneficialOwnerIsNotUSPerson === 'string' && (
                                <p className="error">{errors?.i_Certify_BeneficialOwnerIsNotUSPerson}</p>
                              )}
                        {/* <p className="error">
                          {errors.i_Certify_BeneficialOwnerIsNotUSPerson}
                        </p> */}
                      </Typography>
                    </Typography>
                    <Divider
                      style={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        backgroundColor: "black",
                      }}
                    />
                    <Typography style={{ display: "flex" }}>
                      <Checkbox
                        className="mx-2"
                        name="i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B"
                        value={values.i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B}
                        checked={values.i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B}
                        onChange={handleChange}
                        size="medium"
                        style={{ fontSize: "2rem" }}
                      />
                      <Typography
                        style={{
                         fontSize: "14px",
                          color: "black",
                          marginTop: "7px",
                          textAlign:"justify" 
                        }}
                      >
                        3.The beneficial owner is a resident of the treaty
                        country listed on line 12a and/or 13b above within the
                        meaning of the income tax treaty between the United
                        States and that country, or was a resident of the treaty
                        country listed on line 12a and/or 13b above at the time
                        of, or immediately prior to, entry into the United
                        States, as required by the treaty.
                        {errors?.i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B && typeof errors?.i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B === 'string' && (
                                <p className="error">{errors?.i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B}</p>
                              )}
                        {/* <p className="error">
                          {
                            errors.i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B
                          }
                        </p> */}
                      </Typography>
                    </Typography>
                    <Divider
                      style={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        backgroundColor: "black",
                      }}
                    />
                    <Typography style={{ display: "flex" }}>
                      <Checkbox
                        className="mx-2"
                        name="i_Certify_FurthermoreIAuthorise"
                        value={values.i_Certify_FurthermoreIAuthorise}
                        checked={values.i_Certify_FurthermoreIAuthorise}
                        onChange={handleChange}
                        size="medium"
                        style={{ fontSize: "2rem" }}
                      />
                      <Typography
                        style={{
                         fontSize: "14px",
                          color: "black",
                          marginTop: "7px",
                          textAlign:"justify" 
                        }}
                      >
                        4. Furthermore, I authorize this form to be provided to
                        any withholding agent that has control, receipt, or
                        custody of the income of which I am the beneficial owner
                        or any withholding agent that can disburse or make
                        payments of the income of which I am the beneficial
                        owner.
                        {errors?.i_Certify_FurthermoreIAuthorise && typeof errors?.i_Certify_FurthermoreIAuthorise === 'string' && (
                                <p className="error">{errors?.i_Certify_FurthermoreIAuthorise}</p>
                              )}
                        {/* <p className="error">
                          {errors.i_Certify_FurthermoreIAuthorise}
                        </p> */}
                      </Typography>
                    </Typography>
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
                        className="mx-2"
                        name="i_Certify_ConfirmYouHaveReviewedTheElectronicForm"
                        value={values.i_Certify_ConfirmYouHaveReviewedTheElectronicForm}
                        checked={values.i_Certify_ConfirmYouHaveReviewedTheElectronicForm}
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
                        <span
                          style={{
                            color: "blue",
                            fontSize: "14px",
                            marginLeft: "5px",
                          }}
                        >
                          (view Electronic Form)
                        </span>
                        {errors?.i_Certify_ConfirmYouHaveReviewedTheElectronicForm && typeof errors?.i_Certify_ConfirmYouHaveReviewedTheElectronicForm === 'string' && (
                                <p className="error">{errors?.i_Certify_ConfirmYouHaveReviewedTheElectronicForm}</p>
                              )}
                        {/* <p className="error">
                          {
                            errors.i_Certify_ConfirmYouHaveReviewedTheElectronicForm
                          }
                        </p> */}
                      </Typography>
                    </Typography>
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
                          dispatch(post8233_EForm(
                            {
                              ...prevStepData,
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
                    View form
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
                    history("/Form8233/TaxPayer_Identification/Owner/Documentaion")
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
