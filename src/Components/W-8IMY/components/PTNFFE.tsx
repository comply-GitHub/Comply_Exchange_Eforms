
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const PTNFFE = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
            <div>
            <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                Part XXIV  <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Publicly Traded NFFE or NFFE Affiliate of a Publicly Traded Corporation</span>

            </Typography>
            <Typography>
               <strong>Check the box on line 37a or 37b, whichever applies.</strong>

            </Typography>
            </div>
        <div className="d-flex mt-3">
        <Typography className="mt-2" style={{ marginTop: "5px" }}>
            37a
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 37a
                            </Typography>
                            
                            <a onClick={() => setToolInfo("37a")}>
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
            </span> 
            {toolInfo === "37a" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Select check box 37a for all publicly traded NFFEs.
All publicly traded NFFEs must check box 37a to certify that you are not a financial institution and provide the name of a securities exchange on which the stock of the NFFE is publicly traded.
                        </Typography>

                        <a
                        href="#"
                        style={{ marginTop: "10px", fontSize: "16px" }}
                        onClick={() => {
                        setToolInfo("");
                        }}
                        >
                        --Show Less--
                        </a>
                    </Paper>
                </div>
                ) : (
                ""
                )}
        </Typography>
        <Typography>
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("ismemberofthesameExpandedaffiliatedGroup", false)
                        props.setFieldValue("nameoftheEntityRegularyTraded", "")
                        props.setFieldValue("nameoftheSecuritiesMarket", "")
                    },200)
                }}
                value={props.values.isnotaFinancialInstitution}
                checked={props.values.isnotaFinancialInstitution}
                name="isnotaFinancialInstitution"
                size="medium"
                style={{ fontSize: "2rem" }}
            />
        </Typography>
    
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            I certify that
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The entity identified in Part I is a foreign corporation that is not a financial institution; <strong>and</strong>
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The stock of such corporation is regularly traded on one or more established securities markets, including *
            <TextField 
                style={{
                  backgroundColor: "#fff",
                  fontStyle: "italic",
                }}
                onChange={props.handleChange}
                value={props.values.oneormoreEstablishedSecurities}
                name="oneormoreEstablishedSecurities"
                placeholder=''
                />
        </Typography>
        </Paper>

        <div className="d-flex mt-3">
        <Typography className="mt-2" style={{ marginTop: "5px" }}>
            37b
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 37b
                            </Typography>
                            
                            <a onClick={() => setToolInfo("37b")}>
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
            </span> 
            {toolInfo === "37b" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Select check box 37b if you are a member of the same expanded affiliated group.
If you are an NFFE that is a member of the same expanded affiliated group (as described in Regulations section 1.1471-5(i)) as a publicly traded U.S. or foreign entity, you must check box 37b to certify that you are an NFFE affiliate of a publicly traded corporation, provide the name of the publicly traded entity, and identify the securities market on which the stock of the publicly traded entity is traded. See Regulations section 1.1472-1(c)(1)(i) to determine if an entity is publicly traded.

                        </Typography>

                        <a
                        href="#"
                        style={{ marginTop: "10px", fontSize: "16px" }}
                        onClick={() => {
                        setToolInfo("");
                        }}
                        >
                        --Show Less--
                        </a>
                    </Paper>
                </div>
                ) : (
                ""
                )}
        </Typography>
        <Typography>
        <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("isnotaFinancialInstitution", false)
                        props.setFieldValue("oneormoreEstablishedSecurities", "")
                    },200)
                }}
                value={props.values.ismemberofthesameExpandedaffiliatedGroup}
                checked={props.values.ismemberofthesameExpandedaffiliatedGroup}
                name="ismemberofthesameExpandedaffiliatedGroup"
                size="medium"
                style={{ fontSize: "2rem" }}
            />
        </Typography>
    
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            I certify that
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The entity identified in Part I is a foreign corporation that is not a financial institution;
            </Typography>
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The entity identified in Part I is a member of the same expanded affiliated group as an entity the stock of which is regularly traded on an established securities market;
            </Typography>


            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The name of the entity, the stock of which is regularly traded on an established securities market, is *
            <TextField 
                style={{
                  backgroundColor: "#fff",
                  fontStyle: "italic",
                }}
                onChange={props.handleChange}
                value={props.values.nameoftheEntityRegularyTraded}
                name="nameoftheEntityRegularyTraded"
                placeholder=''
                />
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            <strong>and</strong>
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The name of the securities market on which the stock is regularly traded is *
            <TextField 
                style={{
                  backgroundColor: "#fff",
                  fontStyle: "italic",
                }}
                onChange={props.handleChange}
                value={props.values.nameoftheSecuritiesMarket}
                name="nameoftheSecuritiesMarket"
                placeholder=''
                />
            </Typography>
        </Paper>

        

        
    </div>
  )
}
export default PTNFFE;
