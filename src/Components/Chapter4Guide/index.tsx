import React, { useEffect } from "react";
import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Info from "@mui/icons-material/Info";
import { Tooltip, Paper, Link, AccordionSummary, AccordionDetails,Accordion } from "@mui/material";
import BreadCrumbComponent from "../reusables/breadCrumb";
import Form from "../reusables/Formguide";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { postFormSelection } from "../../Redux/Actions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { ExpandMore } from "@mui/icons-material";


export default function Chapter4(props: any) {

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
      <div style={{ padding: "10px", width: "100%"}}>
     
                            <div style={{ backgroundColor:"#fff" , padding:"5px" }}>
                            <Typography
                            className="my-2 mx-2"
                                style={{ fontSize: "17px", color: "black" , fontWeight:"bold"}}
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
                                    Financial Entity{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography
                                    align="center"
                                    style={{ fontWeight: "bold" }}
                                  >
                                   Chapter 4 Classification - Financial Entity Overview
                                  </Typography>
                                  <Typography align="left">
                                  The term Financial Entity means an institution that is either a:
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                    1. Depository institution
                                    <br/>
                                    2. Custodial institution
                                    <br/>
                                    3. Investment entity, or
                                    <br/>
                                    4. potentially an Insurance company.
                                  </Typography>
                                  <Typography align="left"  style={{ marginTop: "10px" }}>
                                  If the entity this submission represents is defined as a Foreign Financial Entity (FFI), select Confirm where you will move on to the next stage in the selection process. You will then be provided with a further list of possible financial entity statuses for Chapter 4 purposes.                                
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
                                    Not a Financial Entity{" "}
                                  </Typography>
                                </AccordionSummary>
                                <Typography
                                    align="center"
                                    style={{ fontWeight: "bold" }}
                                  >
                               Chapter 4 Classification - Not a Financial Entity                                  
                              </Typography>
                                <AccordionDetails>
                                  
                                  <Typography align="left">
                                  The term Not a Financial Entity is an entity that is excluded from the definition of Financial Entity. It is:

                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ marginTop: "10px" }}
                                  >
                                   1. Not a Depository institution
                                   <br/>
                                  2. Not a Custodial institution
                                  <br/>
                                  3. Not an Investment entity
                                  <br/>
                                  4. Not an Insurance company
                                  </Typography>
                                  <Typography align="left" style={{ marginTop: "10px" }}>
                                  If the entity the submission represents is defined as a Non-Financial Foreign Entity, an NFFE, select Confirm where you will be moved on to the next stage in the selection process. You will then be provided with a further list of possible non-financial entity statuses for Chapter 4 purposes.
                                  </Typography>
                                 
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel4"}
                                onChange={handleChangeAccodionState("panel4")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Account that is not a financial account{" "}
                                  </Typography>
                                  
                                </AccordionSummary>
                                <AccordionDetails>
                                  
                                  <Typography align="left">
                                  Chapter 4 Classification - Account that is not a financial account
                                  </Typography>
                                                                 </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel5"}
                                onChange={handleChangeAccodionState("panel5")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    United States Person{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography
                                    align="center"
                                    style={{ fontWeight: "bold" }}
                                  >
                               Chapter 4 Classification - United States Person
                               
                              </Typography>
                              
                                  <Typography align="left" style={{ marginTop: "10px" }}>
                                  “United States person” means any United States citizen or alien admitted for permanent residence in the United States, and any corporation, partnership, or other organization organized under the laws of the United States.
                                  </Typography>
                    
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                expanded={expandedState === "panel6"}
                                onChange={handleChangeAccodionState("panel6")}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel2d-content"
                                  id="panel2d-header"
                                >
                                  <Typography
                                    style={{ fontSize: "18px", color: "blue" }}
                                  >
                                    Don't Know?{" "}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography
                                    align="center"
                                    style={{ fontWeight: "bold" }}
                                  >
                              Don't Know?                                
                              </Typography>
                                  <Typography align="left">
                                  Please pick a category from the left hand menu. We cannot offer tax advice so if you need assistance, please Exit the process and consult your tax adviser.
                                  </Typography>
                                
                                </AccordionDetails>
                                </Accordion>
                             
                          
                            <Typography align="center">
                          <Button
                            onClick={() => {
                              history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE");
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
                              marginLeft:"10px"
                            
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
