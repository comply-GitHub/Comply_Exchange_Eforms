import React, {useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Paper,
  RadioGroup,
  Radio,
  Link,
  FormControlLabel,
  Tooltip,
  Divider,
  Checkbox
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import Infoicon from "../../../../../assets/img/info.png";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { claimSchemaaa } from "../../../../../schemas/w8Ben";
import { W8_state } from "../../../../../Redux/Actions";
import { useSelector , useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import checksolid from "../../../../../assets/img/check-solid.png";
import check from "../../../../../assets/img/check.png";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import { useLocation } from "react-router-dom";
import {GetAgentCountriesImportantForEform,postW8BENForm,GetHelpVideoDetails} from "../../../../../Redux/Actions"
export default function FCTA_Reporting(props: any) {
  const history = useNavigate();
  const location = useLocation();
  const [report, setReport] = useState<string>("");
  const handleReportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReport((event.target as HTMLInputElement).value);
  };
  const [toolInfo, setToolInfo] = useState("");
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [clickCount, setClickCount] = useState(0);

  const urlValue = location.pathname.substring(1);
 const agentDefaultDetails = JSON.parse(
    localStorage.getItem("agentDefaultDetails") || "{}"
  );
const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
useEffect(() => {
   
  dispatch(GetHelpVideoDetails());

}, []);
const GethelpData = useSelector(
  (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    useEffect(()=>{
      dispatch(GetAgentCountriesImportantForEform())
      },[])
    const GetAgentCountriesImportantForEformData = useSelector(
      (state:any)=>state.GetAgentCountriesImportantForEformReducer.GetAgentCountriesImportantForEformData
    )
    const viewPdf=()=>{
      history("/w8Ben_pdf", { replace: true });
    }
  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" ,height:"100%"}}
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
        
        <div className="row w-100 h-100">
          <div className="col-4">
          <div style={{ padding: "20px 0px",height:"100%" }}>
            <BreadCrumbComponent breadCrumbCode={1253} formName={2}/>
          
      </div>
          </div>
          <div className="col-8 mt-3">

      <div style={{ padding: "12px" }}>
        <Paper style={{ padding: "16px" }}>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{
              isSubmissionClaimTreaty: false,             
              permanentResidentialCountryId: "",
            }}
            enableReinitialize
            validationSchema={claimSchemaaa}
            onSubmit={(values, { setSubmitting }) => {
              if (clickCount === 0) {
      
                setClickCount(clickCount+1);
              } else{
                setSubmitting(true);
                const new_obj = { ...PrevStepData, stepName: `/${urlValue}` }
                const result = { ...new_obj, ...values };
                dispatch(
                  postW8BENForm(result, () => {
                    localStorage.setItem("PrevStepData",JSON.stringify(result))
                     history("/W-8BEN/Declaration/US_Tin/Rates")
                  })
                );
              }
            
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
            }) => (
              <Form onSubmit={handleSubmit}>
                   {values.isSubmissionClaimTreaty && clickCount === 1 ? (<div  style={{backgroundColor: "#e8e1e1" , padding:"10px"}}>
                  <Typography>
                  Treaty107
                  <span className="mx-1">
                  <img src={Infoicon} style={{color: "#ffc107",height:"22px",
                  width:"20px",
                  boxShadow:"inherit",
                 

                         
                          cursor: "pointer",
                          marginBottom:"3px"
                         
                        }}/>
                    
              The country selected does not match the resident country selected earlier in the process. Your agent may contact you for further information.

 
                  </span>
   
                  
                  </Typography>
                  <Typography>
                  Treaty120
                  <span className="mx-1">
                  <img src={Infoicon} style={{color: "#ffc107",height:"22px",
                  width:"20px",
                  boxShadow:"inherit",
                 

                         
                          cursor: "pointer",
                          marginBottom:"3px"
                         
                        }}/>
                    
The treaty country chosen does not match the country selected earlier as the primary residence address country. Please review the selections for accuracy. Generally the primary residence address country will be the same country applicable for treaty claim purposes. The withholding agent may need to request further information depending on answers given elsewhere and attachments supplied.
 
                  </span>
   
                  
                  </Typography>
                
                
                 
                </div>):""}
                {!values.isSubmissionClaimTreaty && clickCount === 1 ? (
                
                <div  style={{backgroundColor: "#e8e1e1" , padding:"10px"}}>
                  <Typography>
                  Treaty119
                  <span className="mx-1">
                  <img src={Infoicon} style={{color: "#ffc107",height:"22px",
                  width:"20px",
                  boxShadow:"inherit",
                 

                         
                          cursor: "pointer",
                          marginBottom:"3px"
                         
                        }}/>
                    
 You have made a selection that indicates you do not wish to claim treaty benefits that may be available. If this is correct please continue to the next stage. Your agent may contact you for further information.
 
                  </span>
   
                  
                  </Typography>
                
                
                 
                </div>):""}

                <>{console.log(errors, values, "valeeeeeeeeeee")}</>
                <div>
                  <div style={{ margin: "10px" }}>
                    <Typography
                      align="left"
                      style={{
                        marginTop: "10px",
                        fontSize: "27px",
                        fontWeight: "550",
                      }}
                    >
                      Treaty Claim Statement
                      <span>
                        <Tooltip
                          style={{ backgroundColor: "black", color: "white" }}
                          title={
                            <>
                              <Typography color="inherit">
                                Treaty claim information
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
                          <Info
                            style={{
                              color: "#ffc107",
                              fontSize: "19px",
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
                            An entity that is claiming a reduced rate of, or
                            exemption from, withholding under an income tax
                            treaty must state they wish to make a treaty claim.
                          </Typography>

                          <Typography style={{ marginTop: "10px" }}>
                            IRS Form Guidance
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            An entity that is claiming a reduced rate of, or
                            exemption from, withholding under an income tax
                            treaty must check the box to certify that it:
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            Derives the item of income for which the treaty
                            benefit is claimed, and meets the limitation on
                            benefits provisions contained in the treaty, if any.
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            An item of income may be derived by either the
                            entity receiving the item of income or by the
                            interest holders in the entity or, in certain
                            circumstances, both. An item of income paid to an
                            entity is considered to be derived by the entity
                            only if the entity is not fiscally transparent under
                            the laws of the entity’s jurisdiction with respect
                            to the item of income. An item of income paid to an
                            entity shall be considered to be derived by the
                            interest holder in the entity only if:
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            - The interest holder is not fiscally transparent in
                            its jurisdiction with respect to the item of income,
                            and
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            - The entity is considered to be fiscally
                            transparent under the laws of the interest holder’s
                            jurisdiction with respect to the item of income.
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            An item of income paid directly to a type of entity
                            specifically identified in a treaty as a resident of
                            a treaty jurisdiction is treated as derived by a
                            resident of that treaty jurisdiction. To determine
                            whether an entity meets the limitation on benefits
                            provisions of a treaty, you must consult the
                            specific provisions or articles under the treaty.
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            Ref: EH156
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
                      align="left"
                      style={{ fontSize: "22px", marginTop: "16px" }}
                    >
                      Is this submission being made to claim treaty benefits?
                    </Typography>

                    <div
                      style={{ marginTop: "10px", justifyContent: "center" }}
                    >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        value={values.isSubmissionClaimTreaty}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                          name="isSubmissionClaimTreaty"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                          name="isSubmissionClaimTreaty"
                        />
                      </RadioGroup>
                      {errors.isSubmissionClaimTreaty &&
                      touched.isSubmissionClaimTreaty ? (
                        <div>
                          <Typography color="error">
                            {errors.isSubmissionClaimTreaty}
                          </Typography>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {values.isSubmissionClaimTreaty ? (
                      <>
                        <Typography
                          align="left"
                          style={{ fontSize: "22px", marginTop: "20px" }}
                        >
                          I certify the beneficial owner is a resident of:{" "}
                          <span style={{ color: "red" }}>*</span>
                          <span>
                        <Tooltip
                          style={{ backgroundColor: "black", color: "white" }}
                          title={
                            <>
                              <Typography color="inherit">
                              Treaty Claim Q2
                              </Typography>
                              <a onClick={() => setToolInfo("claim")}>
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
                              fontSize: "19px",
                              cursor: "pointer",
                              verticalAlign: "super",
                            }}
                          />
                        </Tooltip>
                      </span>
                        </Typography>

                        {toolInfo === "claim" ? (
                      <div>
                        <Paper
                          style={{
                            backgroundColor: "#dedcb1",
                            padding: "15px",
                            marginBottom: "10px",
                          }}
                        >
                          <Typography>
                          Select the country where you claim the Treaty
                          </Typography>

                          <Typography style={{ marginTop: "10px",fontWeight:"bold" }}>
                          IRS Form Guidance: 
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                          Select the country where you claim the individual, business or organization is a resident for income tax treaty purposes.
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                          Ref: EH032 
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
                        <div className="row px-2">
                            <div className="col-12" style={{padding:"0px"}}>
                              <FormControl className="w-100">
                                <div className="row">
                                  <div    className="col-md-6 col-12 d-flex" >
                                  <select
                            style={{
                              padding: " 0 10px",
                              color: "#7e7e7e",
                              fontStyle: "italic",
                              height: "36px",
                            }}
                            name="permanentResidentialCountryId"
                            id="permanentResidentialCountryId"
                            defaultValue={1}
                            onChange={handleChange}
                            // onBlur={handleBlur}
                            value={values.permanentResidentialCountryId}
                          >
                            <option value={0}>---select---</option>
                            <option value={45}>-canada-</option>
                            <option value={257}>United Kingdom</option>
                            <option value={258}>United States</option>
                            <option value="">-----</option>
                            {GetAgentCountriesImportantForEformData?.map(
                              (ele: any) => (
                                <option key={ele?.id} value={ele?.id}>
                                  {ele?.name}
                                </option>
                              )
                            )}
                          </select>

                                  </div>
                                </div>
                                
                                <p className="error">{errors.permanentResidentialCountryId}</p>
                              </FormControl>
                            </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              


                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "80px",
                  }}
                >
                  <Button variant="contained" style={{ color: "white" }}>
                    SAVE & EXIT
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
                  onClick={()=>{
                    history("/W-8BEN/Declaration/US_Tin")
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
