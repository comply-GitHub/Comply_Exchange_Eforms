
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const CDCNLB = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XII <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Certified Deemed-Compliant Nonregistering Local Bank</span>
        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                25
            </Typography>
            <Typography>
            <Checkbox 
                onChange={props.handleChange}
                value={props.values.isPart1greaterthan5perintrest}
                checked={props.values.isPart1greaterthan5perintrest}
                name="isPart1greaterthan5perintrest"
                size="medium"
                style={{ fontSize: "2rem" }} />
            </Typography>
            <Typography className="mt-2">
                I certify that the entity FFI identified in Part I 
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Operates and is licensed solely as a bank or credit union (or similar cooperative credit organization operated without profit) in its country of incorporation or organization;

             </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Engages primarily in the business of receiving deposits from and making loans to, with respect to a bank, retail customers unrelated to such bank and, with respect to a credit union or similar cooperative credit organization, members, provided that no member has a greater than 5% interest in such credit union or cooperative credit organization;

            </Typography>
        <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Does not solicit account holders outside its country of organization;
            </Typography>
        
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Has no fixed place of business outside such country (for this purpose, a fixed place of business does not include a location that is not advertised to the public and from which the FFI performs solely administrative support functions);
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Has no more than $175 million in assets on its balance sheet and, if it is a member of an expanded affiliated group, the group has no more than $500 million in total assets on its consolidated or combined balance sheets; and
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Does not have any member of its expanded affiliated group that is a FFI, other than a FFI that is incorporated or organized in the same country as the FFI identified in Part I and that meets the requirements set forth in this Part XII.
            </Typography>



        </Paper>
            
        </div>
    </div>
  )
}
export default CDCNLB;
