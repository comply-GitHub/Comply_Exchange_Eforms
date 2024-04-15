
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const CDCFFI = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XIII <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Certified Deemed-Compliant FFI With Only Low-Value Accounts</span>
        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                26
            </Typography>
            <Typography>
            <Checkbox 
                onChange={props.handleChange}
                value={props.values.isnotengagedprimarilyintheBusinessofInvesting}
                checked={props.values.isnotengagedprimarilyintheBusinessofInvesting}
                name="isnotengagedprimarilyintheBusinessofInvesting"
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
                Is not engaged primarily in the business of investing, reinvesting, or trading in securities, partnership interests, commodities, notional principal contracts, insurance or annuity contracts, or any interest (including a futures or forward contract or option) in such security, partnership interest, commodity, notional principal contract, insurance contract or annuity contract

            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            No financial account maintained by the FFI or any member of its expanded affiliated group, if any, has a balance or value in excess of $50,000 (as determined after applying applicable account aggregation rules); and

        </Typography>
        <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Neither the FFI nor the FFI's entire expanded affiliated group, if any, has more than $50 million in assets on its consolidated or combined balance sheet as of the end of its most recent accounting year.
        </Typography>



        </Paper>
            
        </div>
    </div>
  )
}
export default CDCFFI;
