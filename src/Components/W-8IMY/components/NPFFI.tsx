
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
                <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 22
                            </Typography>
                            
                            <a onClick={() => setToolInfo("22")}>
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
            {toolInfo === "22" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Select check box 22 to certify that you are transmitting withholding certificates or other documentation for exempt beneficial owners for chapter 4 purposes on whose behalf you are receiving a payment that is a withholdable payment
Check box 22 to certify that you are transmitting withholding certificates or other documentation for exempt beneficial owners for chapter 4 purposes on whose behalf you are receiving a payment that is a withholdable payment. See Regulations section 1.1471-6. You must also certify that you have provided or will provide a withholding statement (as required) allocating a portion of the payment to the exempt beneficial owners as required under Regulations section 1.1471-3(d)(8)(ii). The withholding statement must include the name, address, TIN (if any), entity type, and chapter 4 status of each exempt beneficial owner on behalf of which the nonparticipating FFI is receiving the payment, the amount of the payment allocable to each exempt beneficial owner, a valid withholding certificate or other documentation sufficient to establish the chapter 4 status of each exempt beneficial owner under the requirements of chapter 4, and any other information the withholding agent reasonably requests in order to fulfil its obligations under chapter 4. Additionally, the withholding statement must provide all information required for purposes of chapter 3 with respect to each exempt beneficial owner if the payment is subject to withholding under chapter 3. The withholding statement must allocate the remainder of the payment that is not allocated to an exempt beneficial owner to the nonparticipating FFI receiving the payment.
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
