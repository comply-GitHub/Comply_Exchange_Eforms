
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const ETNFFE = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XXV <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Excepted Territory NFFE</span>
        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                38
            </Typography>
            <Typography>
                <Checkbox 
                 onChange={props.handleChange}
                 value={props.values.isPart1bonafideresidentspossession}
                 checked={props.values.isPart1bonafideresidentspossession}
                 name="isPart1bonafideresidentspossession"
                 size="medium"
                 style={{ fontSize: "2rem" }}
                 />
            </Typography>
            <Typography className="mt-2">
                I certify that :
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The entity identified in Part I is an entity that is organized in a possession of the United States;
             </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            All of the owners of the entity identified in Part I are bona fide residents of the possession in which the NFFE is organized or incorporated;and

            </Typography>
        <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Does not function (or hold itself out) as an investment fund, such as a private equity fund, venture capital fund, leveraged buyout fund, or any investment vehicle whose purpose is to acquire or fund companies and then hold interests in those companies as capital assets for investment purposes.
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The entity identified in Part I:
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography>
                i.Does not accept deposits in the ordinary course of a banking or similar business,
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography>
                ii.Does not hold, as a substantial portion of its business, financial assets for the account of others, and

            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography>
                iii.Is not an insurance company (or the holding company of an insurance company) that issues or is obligated to make payments with respect to a financial account.

            </Typography>
            </Typography>
        
            
        </Paper>
            
            
        </div>
    </div>
  )
}
export default ETNFFE;
