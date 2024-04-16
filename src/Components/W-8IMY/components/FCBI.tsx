
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const FCBI = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XVIII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Foreign Central Bank of Issue</span>
        </Typography>
        
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                31
            </Typography>
            <Typography>
                <Checkbox 
                onChange={props.handleChange}
                value={props.values.istreatedaspurposeofchapter4}
                checked={props.values.istreatedaspurposeofchapter4}
                name="istreatedaspurposeofchapter4"
                size="medium"
                style={{ fontSize: "2rem" }}
                />
            </Typography>
            <Typography className="mt-2">
                I certify that the entity identified in Part I:
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is treated as the beneficial owner of the payment solely for purposes of chapter 4 under Regulations section 1.1471-6(d)(4)
             </Typography>

            
        </Paper>

        
            
            
        </div>
    </div>
  )
}
export default FCBI;
