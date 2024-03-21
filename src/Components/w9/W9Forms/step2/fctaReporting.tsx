import React from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { fctaSchema } from "../../../../schemas";
import { W9_state } from "../../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

export default function FCTA_Reporting(props: any) {
  const dispatch = useDispatch();
  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
    report,
    handleReportChange
  } = props;
  const initialValue = {
    isExemptionFATCAReportings: "",
  };
  return (  

    
    <Paper className="col-12">
       <Formik
       validateOnChange={false}
       validateOnBlur={false}
          initialValues={initialValue}
          enableReinitialize
          validationSchema={fctaSchema} // Uncomment after testing ,this is validation Schema
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
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
            dispatch(
              W9_state(values, () => {
                console.log( "Done");
              })
            );
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
              <>{console.log(values,"errors,values",errors)}</>
  <div style={{ margin: "10px" }}>
    <Typography
      align="left"
      style={{ margin: "10px", fontSize: "20px" }}
    >
      Exemption from FATCA reporting
      <span style={{ color: "red" }}>*</span>
      <Info style={{ color: "#ffc107", fontSize: "13px" }} />{" "}
    </Typography>
    <Typography
      align="left"
      style={{ fontSize: "12px", marginTop: "10px" }}
    >
      Will payments be made into an account held outside of the United
      States by a foreign institution?
    </Typography>

    <div style={{ marginTop: "20px", justifyContent: "center" }}>
      <RadioGroup
        id="isExemptionFATCAReportings"
        aria-labelledby="demo-row-radio-buttons-group-label"
       row
        value={values.isExemptionFATCAReportings}
        onChange={handleChange}
      >
        <FormControlLabel
        control={<Radio/>}
          value={true}
          name="isExemptionFATCAReportings"
          label="Yes"
        />
        <FormControlLabel
        control={<Radio/>}
          value={false}
          name="isExemptionFATCAReportings"
          label="No"
        />
           {errors.isExemptionFATCAReportings && touched.isExemptionFATCAReportings ? (
                <div>
                  <Typography color="error">
                    {errors.isExemptionFATCAReportings}
                  </Typography>
                </div>
              ) : (
                ""
              )}
      </RadioGroup>
    </div>
    {report ? (
      <>
        <Typography
          align="left"
          style={{ fontSize: "12px", marginTop: "10px" }}
        >
          Please select from the list provided to apply for exemption
          from FATCA Reporting or select confirm if no exemption
          applies<span style={{ color: "red" }}>*</span>
          <Info style={{ color: "#ffc107", fontSize: "13px" }} />
        </Typography>
        <FormControl className="w-100">
          <select
          className="col-md-6 col-12"
            style={{
              padding: " 0 10px",
              color: "#7e7e7e",
              fontStyle: "italic",
              height: "30px",
            }}
            name="interestDividendPaymentId"
            id="Income"
            defaultValue={data.interestDividendPaymentId}
            // onChange={handleChange}
          >
            <option value={0}>---select---</option>
            <option value={1}>Individual</option>
            <option value={2}>Individual/sole Propritor</option>
            <option value={3}>Limited Liability Company</option>
          </select>
        </FormControl>
      </>
    ) : null}
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
      onClick={() => {
        setselectedContinue({
          step1: false,
          step2: false,
          step3: false,
          step4: true,
          step5: false,
          step6: false,
          step7: false,
          step8: false,
        });
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
    type="submit"
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

)}