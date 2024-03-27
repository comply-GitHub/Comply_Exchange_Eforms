import React, { useEffect } from "react";
import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Info from "@mui/icons-material/Info";
import { Tooltip, Paper, Link, AccordionSummary, AccordionDetails, Accordion } from "@mui/material";
import BreadCrumbComponent from "../reusables/breadCrumb";
import Form from "../reusables/Formguide";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { postFormSelection } from "../../Redux/Actions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { ExpandMore } from "@mui/icons-material";


export default function Chapter4(props: any) {

// useEffect(() =>{
// document.title=""
// },[])

  const history = useNavigate();
  const handleChangeAccodion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [expandedState, setExpandedState] = React.useState<string | false>(
    "groupPanel"
  );

  const handleChangeAccodionState =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedState(newExpanded ? panel : false);
    };
  const [expanded, setExpanded] = React.useState<string | false>("");

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
            {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
            <a
              href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-"
              target="popup"
              onClick={() =>
                window.open(
                  "https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-",
                  "name",
                  "width=600,height=400"
                )
              }
            >
              Help Video
            </a>
          </div>
        </div>
      </div>
      <div className="row w-100 h-100">
        <div className="col-4">

          <BreadCrumbComponent breadCrumbCode={1210} formName={3} />
        </div>

        <div className="col-8 mt-3">
          <div style={{ padding: "10px", width: "100%" }}>

            <div style={{ backgroundColor: "#fff", padding: "5px" }}>
              <Typography
                className="my-2 mx-2"
                style={{ fontSize: "17px", color: "black", fontWeight: "bold" }}
              >
                Chapter 4 Status Guide
              </Typography>


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
                    Chapter 4 Classification Guide - Introduction
                  </Typography>
                  <Typography
                    align="left"
                    style={{
                      marginTop: "20px",
                      fontSize: "12px",
                    }}
                  >
                    There are 31 different Chapter 4 statuses to choose from and this guide is designed help you select the most appropriate one for the entity this submission represents.
                  </Typography>

                  <Typography
                    align="left"
                    style={{
                      marginTop: "10px",
                      fontSize: "12px",
                    }}
                  >
                    You move through the guide by selecting a heading from the left-hand side and then clicking 'Confirm'. Subsequent pages will provide further options and explanations until you eventually identify the most appropriate status. Depending on the status selected you may be provided with further, more detailed guidance or taken to the next stage.
                  </Typography>
                  <Typography
                    align="left"
                    style={{
                      marginTop: "10px",
                      fontSize: "12px",
                    }}
                  >
                    Please note: although this guide is provided to assist your selection, it is not intended to provide tax advice.
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
                    Government{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="center"
                    style={{ fontWeight: "bold" }}
                  >
                    Chapter 4 Classification - Foreign Government
                  </Typography>
                  <Typography align="left" style={{ marginTop: "3rem" }}>

                    For chapter 4 purposes, a foreign government includes only the integral parts or controlled entities of a foreign sovereign as defined in Temporary Regulations section 1.892-2T. Similar definitions apply for chapter 3 purposes under Regulations section 1.1471-6(b).
                  </Typography>

                  <Typography align="left" style={{ marginTop: "3rem" }}>

                    An integral part of a foreign sovereign, in general, is any person, body of persons, organization, agency, bureau, fund, instrumentality, or other body, however designated, that constitutes a governing authority of a foreign country. The net earnings of the governing authority must be credited to its own account or to other accounts of the foreign sovereign, with no portion benefiting any private person.
                  </Typography>

                  <Typography align="left" style={{ marginTop: "3rem" }}>

                    A controlled entity of a foreign sovereign is an entity that is separate in form from the foreign sovereign or otherwise constitutes a separate juridical entity only if:

                  </Typography>

                  <Typography
                    align="left"
                    style={{ marginTop: "1rem" }}
                  >
                    <li>
                      It is wholly owned and controlled by the foreign sovereign directly or indirectly through one or more controlled entities.
                    </li>
                    <br />
                    <li>
                      It is organized under the laws of the foreign sovereign by which it is owned.
                    </li>
                    <br />
                    <li>
                      Its net earnings are credited to its own account or to other accounts of the foreign sovereign, with no portion of its income benefiting any private person.
                    </li>
                    <br />
                    <li>
                      Its assets vest in the foreign sovereign upon dissolution.
                    </li>
                  </Typography>
                  <Typography align="left" style={{ marginTop: "10px" }}>
                    A controlled entity of a foreign sovereign also includes a pension trust defined in Temporary Regulations section 1.892-2T(c) and may include a foreign central bank of issue to the extent that it is wholly owned by a foreign sovereign.
                  </Typography>
                  <Typography align="left" style={{ marginTop: "10px" }}>
                    A foreign government must provide Form W-8EXP to establish eligibility for exemption from withholding for payments exempt from tax under section 892 or for purposes of establishing its status as an exempt beneficial owner.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedState === "panel3"}
                onChange={handleChangeAccodionState("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography
                    style={{ fontSize: "18px", color: "blue" }}
                  >
                    Non Government{" "}
                  </Typography>
                </AccordionSummary>
                <Typography
                  align="center"
                  style={{ fontWeight: "bold" }}
                >
                  Chapter 4 Classification - Non Government

                </Typography>
                <AccordionDetails>

                  <Typography align="left">
                    You have selected a Chapter 3 status of Government, or have come to this page because you have answered no to previous selections having initially selected that the entity is a financial institution. If these selections are incorrect please close this tool and go back and make another selection. If you select continue below you will be guided through a selection of options for non-financial organizations.

                  </Typography>


                </AccordionDetails>
              </Accordion>




              <Typography align="center">
                <Button
                  onClick={() => {
                    // history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE");
                    history(-1);
                  }}
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Close
                </Button>
                <Button

                  variant="contained"
                  disabled
                  style={{
                    color: "grey",

                    marginTop: "10px",
                    marginBottom: "20px",
                    marginLeft: "10px"

                  }}
                >
                  Confirm
                </Button>
              </Typography>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
