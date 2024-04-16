
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const ENGE = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XXI <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Excepted Nonfinancial Group Entity</span>
        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                34
            </Typography>
            <Typography>
                <Checkbox 
                onChange={props.handleChange}
                value={props.values.isPart1Companyholdingentities}
                checked={props.values.isPart1Companyholdingentities}
                name="isPart1Companyholdingentities"
                size="medium"
                style={{ fontSize: "2rem" }}
                />
            </Typography>
            <Typography className="mt-2">
                I certify that the entity  identified in Part I
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is a holding company, treasury center, or captive finance company and substantially all of the entity's activities are functions described in <a>Regulations section 1.1471-5(e)(5)(i)(C) through (E);</a>
             </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is a member of a nonfinancial group described in <a>Regulations section 1.1471-5(e)(5)(i)(B) ;</a>

            </Typography>
        <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is not a depository or custodial institution (other than for members of the entity's expanded affiliated group); and
            </Typography>
        
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Does not function (or hold itself out) as an investment fund, such as a private equity fund, venture capital fund, leveraged buyout fund, or any investment vehicle with an investment strategy to acquire or fund companies and then hold interests in those companies as capital assets for investment purposes.
            </Typography>
        </Paper>
            
            
        </div>
    </div>
  )
}
export default ENGE;
