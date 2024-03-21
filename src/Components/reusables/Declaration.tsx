import { Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography, Paper, Checkbox } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { W8_state } from "../../Redux/Actions";
import { declarationsSchema } from "../../schemas/w8Ben";
const Declaration = (props: any) => {
  const { open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const history = useNavigate();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        style={{ maxWidth: "none" }}
      >
        <DialogContent>
          <Formik
          
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{
              isAgreeWithDeclaration: true,
              isConsentReceipentstatement: true,
              isNotConsentReceipentstatement: true,
            }}
            enableReinitialize
            validationSchema={declarationsSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values, "vallllll");
              dispatch(
                W8_state(values, () => {
                  history(
                    "/W-8BEN/Declaration/US_Tin/Certification_Substitute"
                  );
                })
              );
              history("/W-8BEN/Declaration/US_Tin/Certification_Substitute");
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
                <>{console.log(errors, values)}</>
                <DialogContentText>
                  <form>
                    {
                      <Typography
                        align="left"
                        style={{ fontSize: "23px", color: "#04506e" }}
                      >
                        Electronic Signature Confirmation
                      </Typography>
                    }
                    <Divider style={{ background: "black" }} />

                    <div>
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            Electronic Submission Declaration
                          </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                          <Paper
                            elevation={3}
                            style={{
                              padding: "17px",
                              backgroundColor: "#d4d9d4",
                              height: "230px",
                              overflow: "auto",
                            }}
                          >
                            <Typography
                              align="left"
                              style={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "18px",
                                width: "100%",
                              }}
                            >
                              Electronic Submission Declaration
                            </Typography>

                            <Typography
                              align="left"
                              style={{ fontSize: "12px", marginTop: "13px" }}
                            >
                              <span
                                style={{
                                  color: "black",
                                  fontWeight: "bold",
                                  fontSize: "12px",
                                }}
                              >
                                Under Penalties or Perjury
                              </span>{" "}
                              you hereby declare that, pursuant to the
                              Electronic Signature in Global and National
                              Commerce Act - the E-Sign Act - Title 15 U.S.C.
                              §7001, you are declaring that you have examined
                              the information you are about to electronically
                              submit and that to the best of your knowledge and
                              belief it is true, correct and complete.
                            </Typography>

                            <Typography
                              align="left"
                              style={{ fontSize: "12px", marginTop: "13px" }}
                            >
                              Furthermore you acknowledge that you understand
                              your rights and obligations under Title 28 U.S.C.
                              §1746 governing unsworn declarations made under
                              the Penalties of Perjury.
                            </Typography>
                            <Typography
                              align="left"
                              style={{ fontSize: "12px", marginTop: "13px" }}
                            >
                              Additionally, you are certifying that you have
                              read and agreed the certification statement
                              presented through the submission process,
                              confirming that:
                            </Typography>
                            <Typography
                              align="left"
                              style={{ fontSize: "12px", marginTop: "13px" }}
                            >
                              1. You are the beneficial owner (or an authorized
                              to sign for the beneficial owner) of all the
                              income to which the form relates,
                            </Typography>
                            <Typography
                              align="left"
                              style={{ fontSize: "12px", marginTop: "13px" }}
                            >
                              2. The beneficial owner is not a U.S person.
                            </Typography>
                            <Typography
                              align="left"
                              style={{ fontSize: "12px", marginTop: "13px" }}
                            >
                              3. You are a U.S. person submitting a Form type
                              W-9
                            </Typography>

                            <Typography
                              align="left"
                              style={{
                                fontSize: "14px",
                                marginTop: "13px",
                                fontWeight: "bold",
                              }}
                            >
                              To Confirm:
                            </Typography>
                            <Typography
                              align="left"
                              style={{ fontSize: "12px" }}
                            >
                              1. You have entered your name in the box provided
                            </Typography>
                            <Typography
                              align="left"
                              style={{ fontSize: "12px" }}
                            >
                              2. Checked the{" "}
                              <span
                                style={{
                                  color: "black",
                                  fontWeight: "bold",
                                  fontSize: "12px",
                                }}
                              >
                                "I agree with the above declaration"
                              </span>{" "}
                              and
                            </Typography>
                            <Typography
                              align="left"
                              style={{ fontSize: "12px" }}
                            >
                              3. By submitting the form here will have provided
                              a legally binding self certified electronic
                              signature.
                            </Typography>

                            <Typography
                              align="left"
                              style={{ fontSize: "14px", marginTop: "13px" }}
                            >
                              On submission your details will be transmitted to
                              your withholding agent previously selected, who
                              may wish to contact you for further confirmation.
                              No data is stored within the Comply Exchange
                              Service on transfer and it is again recommended
                              that you save a copy locally for your own records.
                            </Typography>
                          </Paper>
                          <div style={{ display: "flex", marginTop: "10px" }}>
                            <Checkbox
                              value={values.isAgreeWithDeclaration}
                              checked={values.isAgreeWithDeclaration}
                              onChange={handleChange}
                              size="medium"
                              name="isAgreeWithDeclaration"
                            />
                            <Typography style={{ marginTop: "9px" }}>
                              I agree with the above Declarations
                            </Typography>
                            {errors.isAgreeWithDeclaration &&
                            touched.isAgreeWithDeclaration ? (
                              <div>
                                <Typography color="error">
                                  {errors.isAgreeWithDeclaration}
                                </Typography>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={values.isAgreeWithDeclaration == true}
                        onChange={handleChange("panel2")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                        >
                          <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            Electronic Recipient Statement
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Paper
                            elevation={3}
                            style={{
                              padding: "17px",
                              backgroundColor: "#d4d9d4",
                            }}
                          >
                            <Divider
                              style={{ marginTop: "10px", color: "black" }}
                            />
                            <Typography
                              style={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "13px",
                                marginTop: "10px",
                              }}
                            >
                              We may be required to provide you with a Form
                              1042-S or 1099 depending on your U.S. status. In
                              order to receive this statement electronically, by
                              email or accessible through our onboarding portal
                              you must provide your consent by checking the box
                              below. If you do not provide consent a paper copy
                              will be provided. Furthermore: The statement will
                              be provided in PDF format. This consent will
                              remain in place until you withdraw your consent.
                              You may withdraw this consent at any time by
                              writing to our support centre requesting that a
                              paper copy is provided to you. If you require a
                              paper copy after giving consent you may request a
                              copy by writing to our support centre requesting
                              that a paper copy is provided to you. We reserve
                              the right to change our delivery processes and
                              should circumstances change we will contact you by
                              written notice after which time statements will be
                              provided by paper, until a further consent is
                              given by you.
                            </Typography>
                            <Divider style={{ marginBottom: "10px" }} />
                          </Paper>
                          <div style={{ display: "flex", marginTop: "10px" }}>
                            <Checkbox
                              value={values.isConsentReceipentstatement}
                              checked={values.isConsentReceipentstatement}
                              onChange={handleChange}
                              size="medium"
                              name="isConsentReceipentstatement"
                            />
                            <Typography style={{ marginTop: "9px" }}>
                              I give consent to receiving a recipent statement
                              electronically
                            </Typography>
                            {errors.isConsentReceipentstatement &&
                            touched.isConsentReceipentstatement ? (
                              <div>
                                <Typography color="error">
                                  {errors.isConsentReceipentstatement}
                                </Typography>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div style={{ display: "flex", marginTop: "10px" }}>
                            <Checkbox
                              value={values.isNotConsentReceipentstatement}
                              checked={values.isNotConsentReceipentstatement}
                              onChange={handleChange}
                              size="medium"
                              name="isNotConsentReceipentstatement"
                            />
                            <Typography style={{ marginTop: "9px" }}>
                              {" "}
                              I do not give consent to receiving a recipent
                              statement electronically
                            </Typography>
                            {errors.isNotConsentReceipentstatement &&
                            touched.isNotConsentReceipentstatement ? (
                              <div>
                                <Typography color="error">
                                  {errors.isNotConsentReceipentstatement}
                                </Typography>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    <Typography align="center" style={{ marginTop: "20px" }}>
                      <Button
                        style={{ fontSize: "12px" }}
                        size="small"
                        type="submit"
                        onClick={() => history("/Complete")}
                        variant="contained"
                      >
                        Submit
                      </Button>
                    </Typography>
                  </form>
                </DialogContentText>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Declaration;
