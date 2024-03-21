import React, { useEffect } from "react";
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
  Divider
} from "@mui/material";
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { firstStepSchema } from "../../../schemas";

export default function VerifyDocs(props: any) {

 
  

  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    selectedContinue,
    data,
    handleChange,
    setselectedContinue,
    initialValue
  } = props;
  return(   <Paper className="col-md-9 col-8">
  <Typography
    align="left"
    style={{ margin: "10px", fontSize: "20px", fontWeight: "550" }}
  >
    Attach Supporting Documentation{" "}
    <span style={{ color: "red" }}>*</span>
    <Info
      style={{
        color: "#ffc107",
        fontSize: "13px",
        verticalAlign: "super",
      }}
    />{" "}
  </Typography>
  <div className="mx-md-3 my-md-3 m-1">
    <div
    className="row"
      style={{
        margin: "10px",
        display: "flex",
        marginTop: "20px",
        justifyContent: "space-between",
      }}
    >
      <div className="col-md-6 col-12">
        <Typography>Birth Certificate (Copy)</Typography>
        <Typography style={{ fontSize: "13px", color: "grey" }}>
          A government issued document that registers the birth of the
          holder
        </Typography>
      </div>

      <div className="col-md-6 col-12" style={{ textAlign: "end" }}>
        <Input type="file" />
      </div>
    </div>
    <Divider />
    <div
    className="row"
      style={{
        margin: "10px",
        display: "flex",
        marginTop: "20px",
        justifyContent: "space-between",
      }}
    >
      <div className="col-md-6 col-12">
        <Typography>Certificate of Incorporation</Typography>
        <Typography style={{ fontSize: "13px", color: "grey" }}>
          Certificate of Incorporation
        </Typography>
      </div>

      <div className="col-md-6 col-12" style={{ textAlign: "end" }}>
        <Input type="file" />
      </div>
    </div>
    <Divider />
    <div
    className="row"
      style={{
        margin: "10px",
        display: "flex",
        marginTop: "20px",
        justifyContent: "space-between",
      }}
    >
      <div className="col-md-6 col-12">
        <Typography>Driving License</Typography>
        <Typography style={{ fontSize: "13px", color: "grey" }}>
          Driving License
        </Typography>
      </div>

      <div className="col-md-6 col-12" style={{ textAlign: "end" }}>
        <Input type="file" />
      </div>
    </div>
    <Divider />
    <div
    className="row"
      style={{
        margin: "10px",
        display: "flex",
        marginTop: "20px",
        justifyContent: "space-between",
      }}
    >
      <div className="col-md-6 col-12">
        <Typography>Passport</Typography>
        <Typography style={{ fontSize: "13px", color: "grey" }}>
          Passport
        </Typography>
      </div>

      <div className="col-md-6 col-12" style={{ textAlign: "end" }}>
        <Input type="file" />
      </div>
    </div>
    <Divider />
    <div
    className="row"
      style={{
        margin: "10px",
        display: "flex",
        marginTop: "20px",
        justifyContent: "space-between",
      }}
    >
      <div className="col-md-6 col-12">
        <Typography>Power of Attorney statement</Typography>
        <Typography style={{ fontSize: "13px", color: "grey" }}>
          Power of Attorney statement
        </Typography>
      </div>

      <div className="col-md-6 col-12" style={{ textAlign: "end" }}>
        <Input type="file" />
      </div>
    </div>
    <Divider />
    <div
    className="row"
      style={{
        margin: "10px",
        display: "flex",
        marginTop: "20px",
        justifyContent: "space-between",
      }}
    >
      <div className="col-md-6 col-12" >
        <Typography>Proof of Residency</Typography>
        <Typography style={{ fontSize: "13px", color: "grey" }}>
          Proof of Residency
        </Typography>
      </div>

      <div className="col-md-6 col-12" style={{ textAlign: "end" }}>
        <Input type="file" />
      </div>
    </div>
    <Divider />
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
      onClick={() => {
        setselectedContinue({
          step1: false,
          step2: false,
          step3: false,
          step4: false,
          step5: false,
          step6: true,
          step7: false,
          step8: false,
        });
        console.log("click",selectedContinue)
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
</Paper>)}