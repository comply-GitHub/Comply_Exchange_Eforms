import React,{useState} from "react";
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
import checksolid from "../../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { firstStepBusinessSchema, firstStepSchema ,tinSchema} from "../../../../schemas";

export default function Tin(props: any) {
  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;

  const arr = [
    {
      id: 1,
      name: "SSN/TIN",
    },
    {
      id: 2,
      name: "Applied For",
    },
  ];
  const initialValue = {
    tiN_USTINId:0
  };
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [toolInfo, setToolInfo] = useState("");
  return( 
  
    <section
    className="inner_content"
    style={{ backgroundColor: "#0c3d69", marginBottom: "10px" ,height:"100%"}}
  >
      <Formik
      validateOnChange={false}
      validateOnBlur={false}
          initialValues={initialValue}
          enableReinitialize
          validationSchema={
            selectedTaxClassification == 0
              ? tinSchema
              : selectedTaxClassification == 1
              ? firstStepSchema
              : firstStepBusinessSchema
          } // Uncomment after testing ,this is validation Schema
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            console.log(values, ":STEP1 VALUES");
            setselectedContinue({
              step1: false,
              step2: true,
              step3: false,
              step4: false,
              step5: false,
              step6: false,
              step7: false,
              step8: false,
            });
            // dispatch(
            //   W9_state(values, () => {
            //     console.log(W9Data, "Done");
            //   })
            // );
            // uploadNews(dispatch, values, navigate);
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row w-100 h-100">
              <div className="col-4"  >
          <div className="bg-none" style={{ padding: "10px 0px",height:"100%", }}>
        <Paper style={{ padding: "0px 0px 0px 0px", height:"100%" ,backgroundColor:"#ffffff33"}} >
        
             
                <div className="stepper" >
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChangestatus("panel1")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                          className="accordian-header"
                        >
                          <Typography
                          className="text-uppercase d-flex active"
                            sx={{
                              width: "100%",
                              flexShrink: 0,
                              fontSize: "20px",
                            }}
                          >
                            Step I<img className="steper-check-icon-solid my-auto mx-2"  src={checksolid}/>
                          </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                          <Paper
                            elevation={3}
                            style={{
                              padding: "20px",
                              backgroundColor: "#f0f0f0",
                              overflow: "auto",
                            }}
                          >
                            <ul>
                              <li className="active"> <label className="my-auto">Name and Address </label></li>
                              <li className="active">Account Information(Optional)</li>
                              <li  className="active">Tax Identification Number</li>
                              <li  className="active">Contact Details</li>
                              <li  className="active">Form Selection</li>
                            </ul>
                          </Paper>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChangestatus("panel2")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                          className="accordian-header"
                        >
                                     <Typography
                          className="text-uppercase d-flex"
                            sx={{
                              width: "100%",
                              flexShrink: 0,
                              fontSize: "20px",
                            }}
                          >
                            Step II<img className="steper-check-icon-solid my-auto mx-2"  src={checksolid}/>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Paper
                            elevation={3}
                            style={{
                              padding: "20px",
                              backgroundColor: "#f0f0f0",
                              overflow: "auto",
                            }}
                          >
                           <ul>
                              <li className="active"> <label className="my-auto">Federal Tax</label></li>
                              <li className="active">Exemption from Backup Withholding</li>
                              <li >Exemption from FATCA reporting</li>
                              <li>Tax Identification Number</li>
                             
                            </ul>
                        </Paper>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChangestatus("panel3")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                          className="accordian-header"
                        >
                                     <Typography
                          className="text-uppercase d-flex"
                            sx={{
                              width: "100%",
                              flexShrink: 0,
                              fontSize: "20px",
                            }}
                          >
                            Step III<img className="steper-check-icon-solid my-auto mx-2"  src={checksolid}/>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Paper
                            elevation={3}
                            style={{
                              padding: "20px",
                              backgroundColor: "#f0f0f0",
                              overflow: "auto",
                            }}
                          >
                            <ul>
                              <li > <label className="my-auto">Penalties of Perjury Certification</label></li>
                              <li >Electronic Signature</li>
                              <li>Electronic Signature Confirmation</li>
                              <li>U.S. Tax Certification Complete</li>
                              
                            </ul>
                        </Paper>
                        </AccordionDetails>
                      </Accordion>
                    </div>
          
          
        </Paper>
      </div>
          </div>
          <div className="col-8" style={{backgroundColor:"#ffff" }}> 
  <>
  <Typography
    align="left"
    style={{ margin: "10px", fontSize: "24px" ,fontWeight:"550"}}
  >
    Taxpayer Identification Number{" "}
   
  </Typography>

  <div style={{ margin: "10px", display: "flex", marginTop: "25px",justifyContent:"space-between"}} className="row">
    <div className="col-md-6 col-12">
      <Typography>
        U.S. TIN Type<span style={{ color: "red" }}>*</span>
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
                                fontSize: '16px',
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
                          <Select
                            onChange={
                              handleChange
                            }
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.tiN_USTINId &&
                                errors.tiN_USTINId
                            )}
                            name="tiN_USTINId"
                            value={values.tiN_USTINId}
                            style={{
                              padding: " 0 10px",
                              color: "#7e7e7e",
                              fontStyle: "italic",
                              height: "45px",
                              width: "100%",
                            }}
                          >
                            <MenuItem value={0}>--Select--</MenuItem>
                            {arr.map((i, ind) => {
                              return <MenuItem value={i.id}>{i.name}</MenuItem>;
                            })}
                          </Select>
                          {errors.tiN_USTINId &&
                          touched.tiN_USTINId ? (
                            <div>
                              <Typography color="error">
                                {errors.tiN_USTINId}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                        </FormControl>
    </div>

    <div className="col-md-6  col-12">
      <Typography>U.S. TIN</Typography>
      <Input
      className="input-w9-cstm"
      fullWidth
        required
        style={{
          width: "100%",
          border: " 1px solid #d9d9d9 ",
          height: " 45px",
          lineHeight: "36px ",
          background: "#fff ",
          fontSize: "13px",
          color: " #000 ",
          fontStyle: "normal",
          borderRadius: "1px",
          padding: " 0 10px ",
        }}
      />
    </div>
  </div>
  </>
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
    <Button variant="contained" style={{ color: "white",marginLeft:"15px" }}>
     View Form
    </Button>
    <Button
      onClick={() => {
        setselectedContinue({
          step1: false,
              step2: false,
              step3: false,
              step4: false,
              step5: true,
              step6: false,
              step7: false,
              step8: false,
        });
        // setOpen(true);
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
      setselectedContinue({
        step1: false,
        step2: true,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        step7: false,
        step8: false,
      });
      // setOpen(true);
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
</section>)}
