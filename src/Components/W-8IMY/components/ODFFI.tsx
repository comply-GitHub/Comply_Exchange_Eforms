
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const ODFFI = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XI <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Owner-Documented FFI</span>
        </Typography>
        <Typography>
           <strong>Note.</strong>This status only applies if the U.S. financial institution, participating FFI, reporting Model 1 FFI, or reporting Model 2 FFI to which this form is given has agreed that it will treat the FFI as an owner-documented FFI. The owner-documented FFI must make the certifications below.
        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                24a
            </Typography>
            <Typography>
                <Checkbox
                onChange={props.handleChange}
                value={props.values.isnotaffiliatedwithanentity}
                checked={props.values.isnotaffiliatedwithanentity}
                name="isnotaffiliatedwithanentity"
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
                Does not act as an intermediary;
             </Typography>


             <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Does not accept deposits in the ordinary course of a banking or similar business;
             </Typography>

             <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Does not hold, as a substantial portion of its business, financial assets for the account of others;
             </Typography>

             <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is not an insurance company (or the holding company of an insurance company) that issues or is obligated to make payments with respect to a financial account;
             </Typography>

             <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is not affiliated with an entity (other than an FFI that is also treated as an owner-documented FFI) that accepts deposits in the ordinary course of a banking or similar business, holds, as a substantial portion of its business, financial assets for the account of others, or is an insurance company (or the holding company of an insurance company) that issues or is obligated to make payments with respect to a financial account; and
             </Typography>

             <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Does not maintain a financial account for any nonparticipating FFI.
             </Typography>

            
        </Paper>

        <Typography>
           <strong>Check the box on line 24b or 24c, whichever applies.</strong>
        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                24b
            </Typography>
            <Typography>
            <Checkbox
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("isProvidedAuditorsLetter", false)
                    },200)
                }}
                value={props.values.isProvidedFFIownerReportingstatement}
                checked={props.values.isProvidedFFIownerReportingstatement}
                name="isProvidedFFIownerReportingstatement"
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
            Has provided, or will provide, an FFI owner reporting statement (including any applicable owner documentation) that contains:
             </Typography>


             <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The name, address, TIN (if any), chapter 4 status, and type of documentation provided (if required) of every individual and specified U.S. person that owns a direct or indirect equity interest in the owner-documented FFI (looking through all entities other than specified U.S. persons);
             </Typography>

             <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The name, address, TIN (if any), chapter 4 status, and type of documentation provided (if required) of every individual and specified U.S. person that owns a debt interest in the owner-documented FFI (including any indirect debt interest, which includes debt interests in any entity that directly or indirectly owns the payee or any direct or indirect equity interest in a debt holder of the payee) that constitutes a financial account in excess of $50,000 (disregarding all such debt interests owned by participating FFIs, registered deemed-compliant FFIs, certified deemed compliant FFIs, excepted NFFEs, exempt beneficial owners, or U.S. persons other than specified U.S. persons); and
             </Typography>

             <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Any additional information the withholding agent requests in order to fulfill its obligations with respect to the entity.
             </Typography>            
        </Paper>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                24c
            </Typography>
            <Typography>
                <Checkbox 
                    onChange={(e) => {
                        props.handleChange(e);
                        setTimeout(() => {
                            props.setFieldValue("isProvidedFFIownerReportingstatement", false)
                        },200)
                    }}
                    value={props.values.isProvidedAuditorsLetter}
                    checked={props.values.isProvidedAuditorsLetter}
                    name="isProvidedAuditorsLetter"
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
            Has provided, or will provide, an auditor's letter, signed no more than four years prior to the date of payment, from an independent accounting firm or legal representative with a location in the United States stating that the firm or representative has reviewed the FFI's documentation with respect to all of its owners and debt holders identified in Regulations section 1.1471-3(d)(6)(iv)(A)(2) and that the FFI meets all the requirements to be an owner-documented FFI. The FFI identified in Part I has also provided, or will provide, an FFI owner reporting statement and Form W-9, with applicable waivers, as described in Regulations section 1.1471-3(d)(6)(iv).
             </Typography>


                      
        </Paper>
            
            
        </div>
    </div>
  )
}
export default ODFFI;
