import React, { useState, useEffect } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Tooltip,
  RadioGroup,
  Link,
  Radio,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import checksolid from "../../../assets/img/check-solid.png";
import { secondStepSchema } from "../../../schemas";
import { W9_state, postW9Form, GetHelpVideoDetails, getW9Form } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import View_Insructions from "../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import { GetW9Pdf } from "../../../Redux/Actions/PfdActions";
export default function Backup_witholding(props: any) {
  const { authDetails } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate()
  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;
  const urlValue = location.pathname.substring(1);
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");

  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (value: string, setValues:any) => {
    console.log(value,"selectedValuevalue")
    if (selectedValue === value) {
      setSelectedValue("");
    } else {
      setSelectedValue(value);
      // setValues("excemptionGuide", value);
    }
  };
  const [canvaBx, setCanvaBx] = useState(false);
  var getReducerData = useSelector(
    (state: any) => state?.GetByW9FormReducer?.GetByW9FormData
  );

  const initialValue = {
    isExemptionfromBackup: getReducerData?.isExemptionfromBackup ?? 2,
    excemptionGuide:getReducerData?.excemptionGuide ?? "",
  };
  const isRadioSelected = selectedValue !== "";
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [toolInfo, setToolInfo] = useState("");

  useEffect(() => {
    document.title = "Comply Exchange";
  }, [])

  useEffect(() => {
    dispatch(GetHelpVideoDetails());
    dispatch(
      getW9Form(authDetails?.accountHolderId, (data: any) => {
      })
    );

  }, [authDetails])

  const viewPdf = () => {
    history("w9_pdf");
  }
  return (
    <>
      <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        <View_Insructions canvaBx={canvaBx} handleCanvaClose={handleCanvaClose} />
        {canvaBx === true ? (<div className="offcanvas-backdrop fade show" onClick={() => { handleCanvaClose() }}></div>) : null}

        <div className="overlay-div">
          <div className="overlay-div-group">
            <div className="viewInstructions" onClick={() => { handleCanvaOpen(); }}>View Instructions</div>
            <div className="viewform" onClick={() => {
              dispatch(GetW9Pdf(authDetails?.accountHolderId))
            }} >View Form</div>
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
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValue}
          enableReinitialize
          validationSchema={secondStepSchema} 
          onSubmit={(values, { setSubmitting }) => {
           
            setSubmitting(true);
            console.log(selectedValue,"selectedValue")
            const addSelectedValue={...PrevStepData}
         
            const new_obj = { ...addSelectedValue, stepName: `/${urlValue}` };
            const result = { ...new_obj, ...values , excemptionGuide: "true" };
           
            const submitPromise = new Promise((resolve, reject) => {
              dispatch(
                postW9Form(result, () => {
                  localStorage.setItem("PrevStepData", JSON.stringify(result))
                  history("/US_Purposes/Back/Exemption")
                  resolve("success");
                  setSubmitting(false);
                }, (error: any) => { reject(error) })
              );
            });
            return submitPromise;
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
            submitForm,
            setValues
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row w-100">
                <div className="col-4">
                  <div style={{ padding: "20px 0px", height: "100%" }}>
                    <BreadCrumbComponent breadCrumbCode={1219} formName={1} />

                  </div>
                </div>
                <div className="col-8 mt-3" style={{ padding: "10px 0px" }}>
                  <Paper elevation={6} style={{ padding: "17px", }}>
                    <div style={{ padding: "5px", backgroundColor: "#ffff", }}>
                      <Typography
                        align="left"
                        style={{
                          color: "black",
                          fontSize: "27px",
                          fontWeight: "550",
                        }}
                      >
                        Exemption from Backup Withholding for U.S. Business &
                        Organizations <span style={{ color: "red" }}>*</span>
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  Exemptions - Backup Withholding
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
                            <Typography>What is backup withholding?</Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              Persons making certain payments to you must under
                              certain conditions withhold and pay to the IRS a
                              percentage of such payments. This is called 'Backup
                              Withholding.' Payments that may be subject to backup
                              withholding include interest, tax-exempt interest,
                              dividends, broker and barter exchange transactions,
                              rents, royalties, non employee pay, payments made in
                              settlement of payment card and third party network
                              transactions, and certain payments from fishing boat
                              operators. Real estate transactions are not subject to
                              backup withholding.
                            </Typography>
                            <Typography style={{ marginTop: "20px" }}>
                              You will not be subject to backup withholding on
                              payments you receive if you give the requester your
                              correct TIN, make the proper certifications, and report
                              all your taxable interest and dividends on your tax
                              return.
                            </Typography>
                            <Typography style={{ marginTop: "20px" }}>
                              Ref: EH160
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
                        </div>
                      ) : (
                        ""
                      )}
                      <Typography
                        align="left"
                        style={{ fontSize: "17px", marginTop: "10px" }}
                      >
                        Generally, individuals (including sole proprietors) are not
                        exempt from backup withholding.
                      </Typography>
                      <Typography
                        align="left"
                        style={{
                          fontSize: "19px",
                          fontWeight: "550",
                          marginTop: "20px",
                        }}
                      >
                        Is the business or organization you are making this submission
                        for exempt from backup withholding?{" "}
                        <span style={{ color: "red" }}>*</span>
                        <span>
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  Backup withholding details
                                </Typography>
                                <a onClick={() => setToolInfo("backup")}>
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
                                fontSize: "16px",
                                cursor: "pointer",
                                verticalAlign: "super",
                              }}
                            />
                          </Tooltip>
                        </span>
                      </Typography>
                      {toolInfo === "backup" ? (
                        <div>
                          <Paper
                            style={{
                              backgroundColor: "#dedcb1",
                              padding: "15px",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography style={{ fontWeight: "bold" }}>
                              --What is backup withholding?--
                            </Typography>
                            <Typography>
                              When it applies, backup withholding requires a payer to
                              withhold tax from payments not otherwise subject to
                              withholding. You may be subject to backup withholding if
                              you fail to provide a correct taxpayer identification
                              number (TIN) when required or if you fail to report
                              interest, dividend, or patronage dividend income.
                              Payments generally are not subject to any backup
                              withholding imposed by the IRS, but backup withholding
                              may be mandatory in certain circumstances.
                            </Typography>
                            <Typography
                              style={{ marginTop: "20px", fontWeight: "bold" }}
                            >
                              --When does the IRS require backup withholding?--
                            </Typography>
                            <Typography>
                              The IRS requires us to implement backup withholding at a
                              flat 24% rate in the following cases:
                            </Typography>
                            <Typography>
                              - If a customer doesn't provide their TIN in the
                              required manner
                            </Typography>
                            <Typography>
                              - If the IRS notifies us that a provided TIN is
                              incorrect
                            </Typography>

                            <Typography>
                              - If the IRS notifies us to start withholding on
                              interest or dividends because the Customer has
                              underreported interest or dividends on their income tax
                              returns (only after the IRS has mailed the Customer 4
                              notices)
                            </Typography>
                            <Typography>
                              - If an Customer fails to certify that they are not
                              subject to backup withholding for underreporting of
                              interest and dividends
                            </Typography>

                            <Typography
                              style={{ marginTop: "30px", fontWeight: "bold" }}
                            >
                              --Who is exempt from backup withholding?--
                            </Typography>
                            <Typography>
                              Certain payees and payments are exempt from backup
                              withholding. They can include tax-exempt organizations,
                              government agencies, corporations (for certain
                              payments), and other listed entities. You can learn more
                              about exemption codes in the instructions for 'Line 4'
                              contained in the IRS's{" "}
                              <Link> PDF version of Form W-9</Link>
                            </Typography>
                            <Typography
                              style={{ marginTop: "30px", fontWeight: "bold" }}
                            >
                              IRS Form Guidance:
                            </Typography>
                            <Typography style={{ marginTop: "30px" }}>
                              What is backup withholding?
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              Persons making certain payments to you must under
                              certain conditions withhold and pay to the IRS 24% of
                              such payments. This is called 'backup withholding.'
                              Payments that may be subject to backup withholding
                              include interest, tax-exempt interest, dividends, broker
                              and barter exchange transactions, rents, royalties,
                              nonemployee pay, payments made in settlement of payment
                              card and third party network transactions, and certain
                              payments from fishing boat operators. Real estate
                              transactions are not subject to backup withholding.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              You will not be subject to backup withholding on
                              payments you receive if you give the requester your
                              correct TIN, make the proper certifications, and report
                              all your taxable interest and dividends on your tax
                              return.
                            </Typography>

                            <Typography style={{ marginTop: "10px" }}>
                              Payments you receive will be subject to backup
                              withholding if:
                            </Typography>
                            <Typography>
                              - You do not furnish your TIN to the requester,
                            </Typography>
                            <Typography>
                              - You do not certify your TIN when required (see the
                              instructions for Part II for details),
                            </Typography>
                            <Typography>
                              - The IRS tells the requester that you furnished an
                              incorrect TIN,
                            </Typography>

                            <Typography>
                              - The IRS tells you that you are subject to backup
                              withholding because you did not report all your interest
                              and dividends on your tax return (for reportable
                              interest and dividends only), or
                            </Typography>
                            <Typography>
                              - You do not certify to the requester that you are not
                              subject to backup withholding under 4 above (for
                              reportable interest and dividend accounts opened after
                              1983 only).
                            </Typography>
                            <Typography style={{ marginTop: "30px" }}>
                              See Exempt payee code, later, and the separate
                              instructions for the Requester of Form W-9 for more
                              information.
                            </Typography>
                            <Typography></Typography>

                            <Typography style={{ marginTop: "20px" }}>
                              Ref: EH160
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
                        </div>
                      ) : (
                        ""
                      )}

                      <div style={{ marginTop: "20px", justifyContent: "center" }}>
                        <FormControl
                          error={Boolean(
                            touched.isExemptionfromBackup &&
                            errors.isExemptionfromBackup
                          )}
                        >
                          <RadioGroup
                            id="isExemptionfromBackup"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            value={values.isExemptionfromBackup}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              control={<Radio />}
                              value={1}
                              name="isExemptionfromBackup"
                              label="Yes"
                            />
                            <FormControlLabel
                              control={<Radio />}
                              value={2}
                              name="isExemptionfromBackup"
                              label="No"
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="Don't know"
                              value={3}
                              name="isExemptionfromBackup"
                            />
                          </RadioGroup>
                          {errors.isExemptionfromBackup && touched.isExemptionfromBackup ? (
                            <div>
                              <Typography color="error">

                                {typeof errors.isExemptionfromBackup === "string" ? errors.isExemptionfromBackup : ""}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                        </FormControl>
                      </div>

                      {values.isExemptionfromBackup == 1 || values.isExemptionfromBackup == 3 ? (<form className="mt-3">
                        {
                          <Typography
                            align="left"
                            style={{ fontSize: '23px', color: '#04506e', fontWeight: "550" }}
                          >
                            Exemption from Backup Withholding Guide
                          </Typography>
                        }





                        <div>
                          <Accordion >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                            >
                              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: "bold" }}>
                                Overview
                              </Typography>

                            </AccordionSummary>
                            <AccordionDetails >
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                Businesses that pay certain kinds of income must file an information return Form 1099 with the IRS. Payments generally are not subject to any withholding imposed by the IRS. However, "backup" withholding is required in certain situations and can apply to most kinds of payments that are reported on Form 1099.
                                These payment types include:

                                <Typography style={{ fontSize: "12px", marginTop: "10px" }}> 1.Interest payments</Typography>
                                <Typography style={{ fontSize: "12px", marginTop: "10px" }}> 2.Dividends</Typography>
                                <Typography style={{ fontSize: "12px", marginTop: "10px" }}>3.Patronage dividends, but only if at least half of the payment is in money</Typography>
                                <Typography style={{ fontSize: "12px", marginTop: "10px" }}>4.Rents, profits, or other gains</Typography>
                                <Typography style={{ fontSize: "12px", marginTop: "10px" }}>5.Commissions, fees, or other payments for work you do as an independent contractor</Typography>
                                <Typography style={{ fontSize: "12px", marginTop: "10px" }}>6.Payments by brokers</Typography>
                                <Typography style={{ fontSize: "12px", marginTop: "10px" }}> 7.Royalty payments, and</Typography>
                                <Typography style={{ fontSize: "12px", marginTop: "10px" }}>8.Certain other payments <span style={{ fontSize: "14px", color: "blue" }}> (For a full breakdown see IRS Publication 505)</span></Typography>
                              </Typography >
                              <Typography style={{ fontWeight: '550', fontSize: "12px" }}>Select the payment type you may receive and you will be shown a list codes that may apply, on selection you will be able to move forward through the process.</Typography>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2bh-content"
                              id="panel2bh-header"
                            >
                              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: "bold" }}>Interest and Dividend Payments</Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "1"}
                                    onChange={() => handleRadioChange("1",setValues)} />
                                </span>
                                1.  An organization exempt from tax under section 501(a), any IRA, or a custodial account under section 403(b)(7) if the account satisfies the requirements of section 401(f)(2)
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "2"}
                                    onChange={() => handleRadioChange("2",setValues)} />
                                </span>
                                2.  The United States or any of its agencies or instrumentalities
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "3"}
                                    onChange={() => handleRadioChange("3",setValues)} />
                                </span>
                                3.  A state, the District of Columbia, a possession of the United States, or any of their political subdivisions or instrumentalities
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "4"}
                                    onChange={() => handleRadioChange("4",setValues)} />
                                </span>
                                4. A foreign government or any of its political subdivisions, agencies, or instrumentalities
                              </Typography>
                              {/* <Typography    style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
        5.   A dealer in securities or commodities required to register in the United States, the District of Columbia, or a possession of the United States
          </Typography> */}
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "6"}
                                    onChange={() => handleRadioChange("6",setValues)} />
                                </span>
                                6.    A dealer in securities or commodities required to register in the United States, the District of Columbia, or a possession of the United States
                              </Typography>
                              {/* <Typography     style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
        7.    An entity registered at all times during the tax year under the Investment Company Act of 1940
          </Typography> */}
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "8"}
                                    onChange={() => handleRadioChange("8",setValues)} />
                                </span>
                                8.    A real estate investment trust
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }} >
                                <span>
                                  <Checkbox checked={selectedValue === "9"}
                                    onChange={() => handleRadioChange("9",setValues)} />
                                </span>
                                9.    An entity registered at all times during the tax year under the Investment Company Act of 1940
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }} >
                                <span>
                                  <Checkbox checked={selectedValue === "10"}
                                    onChange={() => handleRadioChange("10",setValues)} />
                                </span>
                                10.   A common trust fund operated by a bank under section 584(a)
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }} >
                                <span>
                                  <Checkbox checked={selectedValue === "11"}
                                    onChange={() => handleRadioChange("11",setValues)} />
                                </span>
                                11.   	A financial institution
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }} >
                                <span>
                                  <Checkbox checked={selectedValue === "12"}
                                    onChange={() => handleRadioChange("12",setValues)} />
                                </span>
                                12.    A middleman known in the investment community as a nominee or custodian
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }} >
                                <span>
                                  <Checkbox checked={selectedValue === "13"}
                                    onChange={() => handleRadioChange("13",setValues)} />
                                </span>
                                13.    A trust exempt from tax under section 664 or described in section 4947
                              </Typography>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel3bh-content"
                              id="panel3bh-header"
                            >
                              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: "bold" }}>
                                Broker Transaction
                              </Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }} >
                                <span>
                                  <Checkbox checked={selectedValue === "14"}
                                    onChange={() => handleRadioChange("14",setValues)} />
                                </span>
                                1.  An organization exempt from tax under section 501(a), any IRA, or a custodial account under section 403(b)(7) if the account satisfies the requirements of section 401(f)(2)
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "15"}
                                    onChange={() => handleRadioChange("15",setValues)} />
                                </span>
                                2.  The United States or any of its agencies or instrumentalities
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }} >
                                <span>
                                  <Checkbox checked={selectedValue === "16"}
                                    onChange={() => handleRadioChange("16",setValues)} />
                                </span>
                                3.  A state, the District of Columbia, a possession of the United States, or any of their political subdivisions or instrumentalities
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "17"}
                                    onChange={() => handleRadioChange("17",setValues)} />
                                </span>
                                4.  A foreign government or any of its political subdivisions, agencies, or instrumentalities
                              </Typography>

                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "18"}
                                    onChange={() => handleRadioChange("18",setValues)} />
                                </span>
                                6.  	A dealer in securities or commodities required to register in the United States, the District of Columbia, or a possession of the United States
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "19"}
                                    onChange={() => handleRadioChange("19",setValues)} />
                                </span>
                                7. A futures commission merchant registered with the Commodity Futures Trading Commission
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "20"}
                                    onChange={() => handleRadioChange("20",setValues)} />
                                </span>
                                8.  A real estate investment trust
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "21"}
                                    onChange={() => handleRadioChange("21",setValues)} />
                                </span>
                                9.  An entity registered at all times during the tax year under the Investment Company Act of 1940
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "22"}
                                    onChange={() => handleRadioChange("22",setValues)} />
                                </span>
                                10.  A common trust fund operated by a bank under section 584(a)
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "23"}
                                    onChange={() => handleRadioChange("23",setValues)} />
                                </span>
                                11.  A financial institution
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                            >
                              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: "bold" }}>
                                Barter Exchange transactions and patronage dividends
                              </Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>Exemption Codes – Select from the list below only when it applies</Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "24"}
                                    onChange={() => handleRadioChange("24",setValues)} />
                                </span>
                                1.	An organization exempt from tax under section 501(a), any IRA, or a custodial account under section 403(b)(7) if the account satisfies the requirements of section 401(f)(2)
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "25"}
                                    onChange={() => handleRadioChange("25",setValues)} />
                                </span>
                                2.	The United States or any of its agencies or instrumentalities
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "26"}
                                    onChange={() => handleRadioChange("26",setValues)} />
                                </span>
                                3.	A state, the District of Columbia, a possession of the United States, or any of their political subdivisions or instrumentalities
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "27"}
                                    onChange={() => handleRadioChange("27",setValues)} />
                                </span>
                                4.	A foreign government or any of its political subdivisions, agencies, or instrumentalities
                              </Typography>


                            </AccordionDetails>
                          </Accordion>

                          <Accordion >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                            >
                              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: "bold" }}>
                                Payments over $600 required to be reported and direct sales over $5000
                              </Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>Exemption Codes – Select from the list below only when it applies</Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "28"}
                                    onChange={() => handleRadioChange("28",setValues)} />
                                </span>
                                1.	An organization exempt from tax under section 501(a), any IRA, or a custodial account under section 403(b)(7) if the account satisfies the requirements of section 401(f)(2)
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "29"}
                                    onChange={() => handleRadioChange("29",setValues)} />
                                </span>
                                2.	The United States or any of its agencies or instrumentalities
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "30"}
                                    onChange={() => handleRadioChange("30",setValues)} />
                                </span>
                                3.	A state, the District of Columbia, a possession of the United States, or any of their political subdivisions or instrumentalities
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "31"}
                                    onChange={() => handleRadioChange("31",setValues)} />
                                </span>
                                4.	A foreign government or any of its political subdivisions, agencies, or instrumentalities
                              </Typography>


                            </AccordionDetails>
                          </Accordion>

                          <Accordion >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                            >
                              <Typography sx={{ width: '43%', flexShrink: 0, fontWeight: "bold" }}>
                                Payments made in settlement of payment card or third party network transactions
                              </Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>Exemption Codes – Select from the list below only when it applies</Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "310"}
                                    onChange={() => handleRadioChange("310",setValues)} />
                                </span>
                                1.	An organization exempt from tax under section 501(a), any IRA, or a custodial account under section 403(b)(7) if the account satisfies the requirements of section 401(f)(2)
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "32"}
                                    onChange={() => handleRadioChange("32",setValues)} />
                                </span>
                                2.	The United States or any of its agencies or instrumentalities
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "33"}
                                    onChange={() => handleRadioChange("33",setValues)} />
                                </span>
                                3.	A state, the District of Columbia, a possession of the United States, or any of their political subdivisions or instrumentalities
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                                <span>
                                  <Checkbox checked={selectedValue === "34"}
                                    onChange={() => handleRadioChange("34",setValues)} />
                                </span>
                                4.	A foreign government or any of its political subdivisions, agencies, or instrumentalities
                              </Typography>


                            </AccordionDetails>
                          </Accordion>


                          <Accordion >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel4bh-content"
                              id="panel4bh-header"
                            >
                              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: "bold" }}>Don't Know</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>

                                If you are not able to make a selection from the income types and exemption codes provided please click "Confirm" to continue through the process.
                              </Typography>
                              <Typography style={{ fontSize: "12px", marginTop: "10px" }}>

                                Continuing without making a selection will mean we may not be able to apply an exemption and may need to contact you for further information or apply backup withholding.

                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>




                      </form>) : ""}


                      <Paper style={{ backgroundColor: "#adadac", marginTop: "20px" }} className="my-4">
                        <Typography
                          style={{
                            padding: "12px",
                            justifyContent: "center",
                            fontSize: "15px",
                            verticalAlign: "middle",
                          }}
                        >
                          If you are not sure please refer to the help available or
                          select "Don't Know" where you will be guided through a
                          series of questions to help you determine based on you
                          expected income type.
                        </Typography>
                      </Paper>
                    </div>
                  </Paper>
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
                <Button
                  variant="contained"
                  style={{ color: "white", marginLeft: "10px" }}
                  onClick={() => {
                    dispatch(GetW9Pdf(authDetails?.accountHolderId))
                  }}
                >
                  View Form
                </Button>
                {/* {values.isExemptionfromBackup == 2 ? (<Button
                  disabled={isSubmitting}
                  //type="submit"
                  variant="contained"
                  style={{ color: "white", marginLeft: "15px" }}
                  onClick={() => {
                    submitForm().then(() => {
                      history("/US_Purposes/Back/Exemption")
                    }).catch((errors) => {
                      console.log(errors);
                    })
                  }}
                >
                  Continue
                </Button>) : ( */}
                
                
                <Button
                
                  disabled={isSubmitting}
                  variant="contained"
                  style={{ color: "white", marginLeft: "15px" }}
                  onClick={() => {
                    submitForm().then(() => {
                      history("/US_Purposes/Back/Exemption")
                    }).catch((errors) => {
                      console.log(errors);
                    })
                  }}
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
                    history("/W9/purposes")
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
      </section>


    </>
  );
}
