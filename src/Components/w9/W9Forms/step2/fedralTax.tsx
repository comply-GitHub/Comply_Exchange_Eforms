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
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import {
  firstStepSchema,
  firstStepBusinessSchema,
  firstSchema,
} from "../../../../schemas";
import checksolid from "../../../../assets/img/check-solid.png";
import "./index.scss";
import { W9_state } from "../../../../Redux/Actions";
export default function Fedral_tax(props: any) {
  const dispatch = useDispatch();
  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
  } = props;
  const [toolInfo, setToolInfo] = useState("");
  const [onboardingValues,SetOnboardingValues]=useState({firstName:""});  
  
  const initialValue = {
    firstName: onboardingValues?.firstName ? onboardingValues.firstName :"" ,
    lastName: "",
    businessName: "",
    federalTaxClassificationId: 0,
  };
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const arr = [
    {
      id: 1,
      name: "Individual",
    },
    {
      id: 3,
      name: "Individual/Sole Proprietor",
    },
    {
      id: 4,
      name: "Limited Liability Company (Single-member)",
    },
  ];

  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    SetOnboardingValues(JSON.parse(localStorage.getItem("agentDetails") || '{}'))
  },[])

  const handleChangeAccodion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [expandedState, setExpandedState] = React.useState<string | false>(
    "panel1"
  );

  const handleChangeAccodionState =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedState(newExpanded ? panel : false);
    };
  const W9Data = useSelector((state: any) => state.w9Data);
  return (
    <>
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
              ? firstSchema
              : selectedTaxClassification == 1
              ? firstStepSchema
              : firstStepBusinessSchema
          } // Uncomment after testing ,this is validation Schema
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            dispatch(
              W9_state(values, () => {
                console.log(W9Data, "Done");
              })
            );
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
          <div className="col-4" >
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
                            Step I234<img className="steper-check-icon-solid my-auto mx-2"  src={checksolid}/>
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
                              <li > <label className="my-auto">Federal Tax</label></li>
                              <li >Exemption from Backup Withholding</li>
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
          <div className="col-8">   
              <div style={{ width: "100%" ,backgroundColor:"#fff"}}>
                <div>
                  <Typography align="left" style={{ margin: "10px" }}>
                    <div
                      className="row"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        className="col-md-6 col-12"
                        align="left"
                        style={{
                          color: "black",
                          fontSize: "20px",
                          fontWeight: "550",
                        }}
                      >
                        Select your status for U.S. tax purposes
                      </Typography>
                      {/* <Typography align="right" className="col-md-6 col-12">
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "#ffc107",
                            fontWeight: "550",
                            justifyContent: "flex-end",
                          }}
                        >
                          Federal Tax Classification Guide
                        </Button>
                      </Typography> */}
                    </div>
                    <div className="row">
                      <div
                        className="col-12 col-md-12 mt-3"
                        style={{ marginTop: "20px" }}
                      >
                        <Typography
                          align="left"
                          className="d-flex w-100 "
                          style={{ fontSize: "16px" }}
                        >
                          Federal Tax Classification
                          <span style={{ color: "red" }}>*</span>
                          <span>
                            <Tooltip
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                              title={
                                <>
                                  <Typography color="inherit">
                                    Classification selection
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
                              <Typography>
                                Select from the most appropriate entity type
                                from the drop down list provided. This should be
                                the entity type for U.S. federal tax purposes.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                  Corporations:
                                </span>{" "}
                                Enter your business name as shown on required
                                U.S. federal tax documents on the 'Business
                                Name' line. This name should match the name
                                shown on the charter or other legal document
                                creating the entity. You may enter any business,
                                trade, or DBA name on the 'Business
                                name/disregarded entity name' line.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                  Partnership, C Corporation, or S Corporation:
                                </span>{" "}
                                Enter the entity's name on the 'Name' line and
                                any business, trade, or 'doing business as (DBA)
                                name' on the 'Business name/disregarded entity
                                name' line.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                  Partnership:
                                </span>{" "}
                                A partnership is a relationship between two or
                                more entities or persons who join to carry on a
                                trade or business, with each partner
                                contributing money, property, labour, or skill,
                                and each expecting to share in the profits and
                                losses. Every partnership that engages in a
                                trade or business or has income from sources in
                                the United States must file an annual
                                information return, Form 1065, U.S. Partnership
                                Return of Income, or Form 1065-B, U.S. Return of
                                Income for Electing Large Partnerships, with the
                                Internal Revenue Service, showing the
                                partnership's taxable income or loss for the
                                year. A partnership must file this return even
                                if its principal place of business is outside
                                the United States and even if all of its members
                                are non-resident aliens.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                  Foreign Partnership:
                                </span>{" "}
                                Partnerships not created or organized in the
                                United States, or under the law of the United
                                States or of any state, are foreign
                                partnerships. In general, if a foreign
                                partnership has gross income from trade or
                                business within the United States or has gross
                                income derived from sources within the United
                                States, it must file a partnership return.
                              </Typography>

                              <Typography style={{ marginTop: "10px" }}>
                                {" "}
                                <span style={{ fontWeight: "bold" }}>
                                  Limited Liability Company (LLC) - Disregarded
                                  Entity:
                                </span>
                                For U.S. federal tax purposes, an entity that is
                                disregarded as an entity separate from its owner
                                is treated as a 'disregarded entity'. See
                                Regulation section 301.7701-2(c)(2)(iii). Enter
                                the owner's name on the 'Name' line. The name of
                                the entity entered on the 'Name' line should
                                never be a disregarded entity. The name on the
                                'Name' line must be the name shown on the income
                                tax return on which the income should be
                                reported. For example, if a foreign LLC that is
                                treated as a disregarded entity for U.S. federal
                                tax purposes has a single owner that is a U.S.
                                person, the U.S. owner's name is required to be
                                provided on the 'Name' line. If the direct owner
                                of the entity is also a disregarded entity,
                                enter the first owner that is not disregarded
                                for federal tax purposes. Enter the disregarded
                                entity's name on the 'Business name/disregarded
                                entity name' line. If the owner of the
                                disregarded entity is a foreign person (non
                                U.S.), the owner must complete an appropriate
                                Form W-8 instead of a Form W-9. This is the case
                                even if the foreign person has a U.S. TIN.
                                Please go back and make the appropriate
                                selection. Note: Select the appropriate setting
                                for the U.S. federal tax classification of the
                                person whose name is entered on the 'Business
                                Name' line (Individual/sole proprietor,
                                Partnership, C Corporation, S Corporation,
                                Trust/estate).
                              </Typography>

                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                  Limited Liability Company (LLC) - Corporation:
                                </span>{" "}
                                If the person identified on the 'Business Name'
                                line is an LLC, select the 'Limited liability
                                company' with the appropriate code for the U.S.
                                federal tax classification. If you are an LLC
                                that has filed a Form 8832 or a Form 2553 to be
                                taxed as a corporation, enter 'C' for C
                                corporation or 'S' for S corporation, as
                                appropriate. If you are an LLC that is
                                disregarded as an entity separate from its owner
                                under Regulation section 301.7701-3 (except for
                                employment and excise tax), do not select the
                                LLC unless the owner of the LLC (required to be
                                identified on the 'Name' line) is another LLC
                                that is not disregarded for U.S. federal tax
                                purposes. If the LLC is disregarded as an entity
                                separate from its owner, follow the process as
                                shown.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "bold", }}>
                                  Limited Liability Company (LLC) - Partnership
                                  :
                                </span>{" "}
                                A limited liability partnership (LLP) is formed
                                under a State limited liability partnership law.
                                Limited liability partnerships file Form 1065,
                                U.S. Partnership Return of Income. They were
                                identified by their response to a question on
                                Form 1065, Schedule B, Other Information.
                                Organizationally, LLP’s are available in some
                                states, only for professional partnerships, such
                                as law firms or accounting firms. A partner in
                                an LLP receives liability protection from the
                                actions of other partners, but is liable for the
                                partnership debts as well as for the
                                consequences of his or her own actions.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                  Trust/ Estate :
                                </span>{" "}
                                An Estate or Trust is a type of tax entity.
                                Estates are entities that report income after an
                                individual person has died. If the person, for
                                example, earns interest, dividends or capital
                                gains after his or her death, then that income
                                is consider income for his or her estate, and
                                the income must be reported on Form 1041, U.S.
                                Income Tax Return for estates and Trusts. The
                                estate tax is a tax on assets, whereas the
                                estate income tax is a tax on income.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                A trust is created by an individual person to
                                protect or to preserve the person's assets, and
                                to distribute income to beneficiaries.
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

                        <FormControl className="w-100">
                          <Select
                            onChange={(e) => {
                              handleChange(e);
                              handleTaxClassificationChange(e);
                            }}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.federalTaxClassificationId &&
                                errors.federalTaxClassificationId
                            )}
                            name="federalTaxClassificationId"
                            value={values.federalTaxClassificationId}
                            style={{
                              padding: " 0 10px",
                              color: "#7e7e7e",
                              fontStyle: "italic",
                              height: "45px",
                              width: "70%",
                            }}
                          >
                            <MenuItem value={0}>--Select--</MenuItem>
                            {arr.map((i, ind) => {
                              return <MenuItem value={i.id}>{i.name}</MenuItem>;
                            })}
                          </Select>
                          {errors.federalTaxClassificationId &&
                          touched.federalTaxClassificationId ? (
                            <div>
                              <Typography color="error">
                                {errors.federalTaxClassificationId}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                        </FormControl>
                      </div>
                    </div>
                    {selectedTaxClassification != 0 ? (
                      <div
                        style={{ marginTop: "20px", display: "flex" }}
                        className="col-10"
                      >
                        <div className="col-5" >
                          <Typography
                            align="left"
                            className="d-flex w-60 "
                            style={{ fontSize: "16px" }}
                          >
                            First Name
                            <span style={{ color: "red" }}>*</span>
                            <span>
                            <Tooltip
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                              title={
                                <>
                                  <Typography color="inherit">
                                  Name details
                                  </Typography>
                                  <a onClick={() => setToolInfo("name")}>
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
                                  fontSize: "12px",
                                  cursor: "pointer",
                                  verticalAlign: "super",
                                }}
                              />
                            </Tooltip>
                          </span>
                         
                       
                          </Typography>
                          {toolInfo === "name" ? (
                          <div>
                            <Paper
                              style={{
                                backgroundColor: "#dedcb1",
                                padding: "15px",
                                marginBottom: "10px",
                              }}
                            >
                              <Typography>
                              Please enter the first and last name of the person who is required or has been requested to submit an information return.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                Specific instructions for U.S. individuals and sole proprietors: U.S. individuals:
                                </span>{" "}
                                
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                              If you are an  <span style={{ fontWeight: "bold" }}>
                              individual
                                </span>{" "}, you must enter the name shown on your income tax return. However, if you have changed your last name, for instance, due to marriage without informing the Social Security Administration of the name change, enter your first name, the last name shown on your social security card, and your new last name. In certain situations we may need to contact you for further verification.
                               
                               
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                Joint names:
                                </span>{" "}
                                If the account is in joint names, both parties will need to submit separate submissions.
                              </Typography>
                              <Typography style={{ marginTop: "10px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                Sole proprietor:
                                </span>{" "}
                                Enter your individual name as shown on your income tax return on the 'Name' line. You may enter your business, trade, or 'doing business as (DBA)' name on the 'Business name' line.
 
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

                        

                          <FormControl className="w-100">
                            <TextField
                              autoComplete="firstName"
                              type="text"
                              placeholder="First Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={touched.firstName && errors.firstName}
                              error={Boolean(
                                touched.firstName && errors.firstName
                              )}
                              name="firstName"
                              className="inputClass"
                              value={onboardingValues?.firstName ? onboardingValues?.firstName :values.firstName}
                             
                            />
                          </FormControl>
                        </div>
                        <div className="col-5" style={{marginLeft:"10px"}}>
                          <Typography
                            align="left"
                            className="d-flex w-60 "
                            style={{ fontSize: "16px" }}
                          >
                            Last Name
                            
                          </Typography>

                          <FormControl className="w-100">
                            <TextField 
                              autoComplete="lastName"
                              type="text"
                              placeholder="Last Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={touched.lastName && errors.lastName}
                              error={Boolean(
                                touched.lastName && errors.lastName
                              )}
                              name="lastName"
                              value={values.lastName}
                              className="inputClass"
                            />
                          </FormControl>
                        </div>
                        
                      </div>
                    ) : null}

                    {selectedTaxClassification > 1 ? (
                      <>
                        <div className="row">
                          <div className="col-12">
                            <Typography
                              align="left"
                              className="d-flex w-60 "
                              style={{
                                fontSize: "13px",
                                marginTop: "15px",
                              }}
                            >
                              Business Name or disregarded entity name if
                              different
                            </Typography>

                            <FormControl className="w-50">
                              <TextField
                                name="businessName"
                                fullWidth
                                value={values.businessName}
                                onChange={handleChange}
                                autoComplete="businessName"
                                type="text"
                                placeholder="Business Name"
                                onBlur={handleBlur}
                                helperText={
                                  touched.businessName && errors.businessName
                                }
                                error={Boolean(
                                  touched.businessName && errors.businessName
                                )}
                                // style={{
                                //   width: "200%",
                                // //   border: " 1px solid #d9d9d9 ",
                                //   height: " 36px",
                                //   lineHeight: "36px ",
                                //   background: "#fff ",
                                //   fontSize: "13px",
                                //   color: " #000 ",
                                //   fontStyle: "normal",
                                //   borderRadius: "1px",
                                //   padding: " 0 10px ",
                                // }}
                                className="inputClassFull"
                              />
                            </FormControl>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </Typography>
                </div>

                <div style={{ padding: "10px", width: "90%" ,paddingRight:"0px"}}>
                  <Accordion
                    expanded={expanded === "groupPanel"}
                    onChange={handleChangeAccodion("groupPanel")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel-content"
                      id="panel-header"
                    >
                      <Typography style={{ fontSize: "18px", color: "blue" }}>
                        Federal Tax Classification Guide
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Accordion
                        expanded={expandedState === "panel1"}
                        onChange={handleChangeAccodionState("panel1")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                        >
                          <Typography
                            style={{ fontSize: "18px", color: "blue" }}
                          >
                            Introduction
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            align="center"
                            style={{ fontWeight: "bold" }}
                          >
                            Classification Guide - Introduction
                          </Typography>
                          <Typography
                            align="left"
                            style={{ marginTop: "20px", }}
                          >
                            This guide is provided to help you determine the
                            classification of the entity the submission
                            represents.
                          </Typography>

                          <Typography
                            align="left"
                            style={{ marginTop: "10px",  }}
                          >
                            In the menu below you will see several different
                            classification types. Please select each in turn
                            reading the definition provided. When you are
                            satisfied the description matches the entity type
                            select “confirm”.
                          </Typography>
                          <Typography
                            align="left"
                            style={{ marginTop: "10px", }}
                          >
                            Depending on the type selected you may either be
                            provided with further selections, more detailed
                            guidance or the pop up will close and you will be
                            taken to the next stage in the submission process.
                          </Typography>
                          <Typography
                            align="left"
                            style={{ marginTop: "10px",}}
                          >
                            Please note that although this guide is provided to
                            assist your selection, it is not intended nor aims
                            to provide tax advice.
                          </Typography>
                          <Typography
                            align="left"
                            style={{ marginTop: "30px", fontWeight: "bold" }}
                          >
                            Should you need specific help or guidance you should
                            consult your tax advisers.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expandedState === "panel2"}
                        onChange={handleChangeAccodionState("panel2")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel2d-content"
                          id="panel2d-header"
                        >
                          <Typography
                            style={{ fontSize: "18px", color: "blue" }}
                          >
                            Individual{" "}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography align="left">
                            Chapter 3 Classification - Individual
                          </Typography>
                          <Typography
                            align="left"
                            style={{ marginTop: "10px" }}
                          >
                            An individual is a single person who is not
                            connected to an Business or Organization and would
                            be declaring only personal income.
                          </Typography>

                          <Typography
                            align="center"
                            style={{ marginTop: "30px" }}
                          >
                            <Button variant="contained">Confirm</Button>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expandedState === "panel3"}
                        onChange={handleChangeAccodionState("panel3")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography
                            style={{ fontSize: "18px", color: "blue" }}
                          >
                            Individual/Sole Proprietor
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            align="center"
                            style={{ fontWeight: "bold" }}
                          >
                            Individual/Sole Proprietor
                          </Typography>
                          <Typography
                            align="left"
                            style={{ marginTop: "10px" }}
                          >
                            A sole proprietorship, also known as the sole trader
                            or simply a proprietorship, is a type of business
                            entity that is owned and run by one individual or
                            one legal person (e.g. corporation, LLC) and in
                            which there is no legal distinction between the
                            owner and the business. The owner is in direct
                            control of all elements and is legally accountable
                            for the finances of such business and this may
                            include debts, loans, loss etc.
                          </Typography>
                          <Typography
                            align="center"
                            style={{ marginTop: "30px" }}
                          >
                            <Button variant="contained">Confirm</Button>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion
                        expanded={expandedState === "panel4"}
                        onChange={handleChangeAccodionState("panel4")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography
                            style={{ fontSize: "18px", color: "blue" }}
                          >
                            Limited Liability Company(Single-Member)
                           </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography align="left">
                            An LLC is an entity created by state statute.
                            Depending on elections made by the LLC and the
                            number of members, the IRS will treat an LLC either
                            as a corporation, partnership, or as part of the
                            owner?s tax return (a disregarded entity?).
                            Specifically, a domestic LLC with at least two
                            members is classified as a partnership for federal
                            income tax purposes unless it files Form 8832 and
                            affirmatively elects to be treated as a corporation.
                            And an LLC with only one member is treated as an
                            entity disregarded as separate from its owner for
                            income tax purposes (but as a separate entity for
                            purposes of employment tax and certain excise
                            taxes), unless it files Form 8832 and affirmatively
                            elects to be treated as a corporation.
                          </Typography>
                          <Typography
                            align="left"
                            style={{ marginTop: "10px" }}
                          >
                            Owner of Single-Member LLC
                          </Typography>
                          <Typography
                            align="left"
                            style={{ marginTop: "10px" }}
                          >
                            If a single-member LLC does not elect to be treated
                            as a corporation, the LLC is a ?disregarded entity,?
                            and the LLC?s activities should be reflected on its
                            owner?s federal tax return. If the owner is an
                            individual, the activities of the LLC will generally
                            be reflected on: Form 1040 Schedule C, Profit or
                            Loss from Business (Sole Proprietorship) (PDF) Form
                            1040 Schedule E, Supplemental Income or Loss (PDF)
                            Form 1040 Schedule F, Profit or Loss from Farming
                            (PDF)
                          </Typography>
                          <Typography
                            align="left"
                            style={{ marginTop: "10px" }}
                          >
                            An individual owner of a single-member LLC that
                            operates a trade or business is subject to the tax
                            on net earnings from self employment in the same
                            manner as a sole proprietorship.
                          </Typography>
                          <Typography
                            align="left"
                            style={{ marginTop: "10px" }}
                          >
                            If the single-member LLC is owned by a corporation
                            or partnership, the LLC should be reflected on its
                            owner?s federal tax return as a division of the
                            corporation or partnership.
                          </Typography>
                          <Typography
                            align="center"
                            style={{ marginTop: "30px" }}
                          >
                            <Button variant="contained">Confirm</Button>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expandedState === "panel5"}
                        onChange={handleChangeAccodionState("panel5")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography
                            style={{ fontSize: "18px", color: "blue" }}
                          >
                            Don't Know?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            align="center"
                            style={{ fontWeight: "bold" }}
                          >
                            Don't Know?
                          </Typography>
                          <Typography style={{ marginTop: "10px" }}>
                            Please pick a category from the left hand menu. We
                            cannot offer tax advice so if you need assistance,
                            please Exit the process and consult your tax
                            adviser.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </AccordionDetails>
                  </Accordion>
                </div>

                {/* <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccodion('panel1')}>
        <AccordionSummary expandIcon={<ExpandMore />}  aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccodion('panel2')}>
        <AccordionSummary expandIcon={<ExpandMore />}  aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Collapsible Group Item #2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChangeAccodion('panel3')}>
        <AccordionSummary expandIcon={<ExpandMore />}  aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div> */}

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
                    disabled={isSubmitting}
                    variant="contained"
                    style={{ color: "white", marginLeft: "15px" }}
                  >
                    View Form
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
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
                        step1: true,
                        step2: false,
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
              </div>
              </div>
              </div>
            </Form>
          )}
        </Formik>
        </section>
    </>
  );
}
