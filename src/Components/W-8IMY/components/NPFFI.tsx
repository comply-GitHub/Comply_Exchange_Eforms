
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const NPFFI = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part IX <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Nonparticipating FFI with Exempt Beneficial Owners</span>
        </Typography>
        
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                22
            </Typography>
            <Typography>
                <Checkbox onChange={props.handleChange}
                value={props.values.isusingportionofthepaymentallocated}
                checked={props.values.isusingportionofthepaymentallocated}
                name="isusingportionofthepaymentallocated"
                size="medium"
                style={{ fontSize: "2rem" }} />
            </Typography>
            <Typography className="mt-2">
                I certify that the entity identified in Part I:
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is using this form to transmit withholding certificates and/or other documentation and has provided or will provide a withholding statement that indicates the portion of the payment allocated to one or more exempt beneficial owners.
             </Typography>

            
        </Paper>

        
            
            
        </div>
    </div>
  )
}
export default NPFFI;
