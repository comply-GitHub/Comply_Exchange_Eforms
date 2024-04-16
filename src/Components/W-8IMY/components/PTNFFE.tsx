
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
