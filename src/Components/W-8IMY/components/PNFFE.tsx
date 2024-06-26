
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const PNFEE = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
            <div>
            <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                Part XXVII  <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Passive NFFE </span>

            </Typography>
            </div>
        <div className="d-flex mt-3">
        <Typography className="mt-2" style={{ marginTop: "5px" }}>
            40
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 40
                            </Typography>
                            
                            <a onClick={() => setToolInfo("40")}>
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
            {toolInfo === "40" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Select check box 40 for all passive NFFEs
All passive NFFEs must check box 40 to certify that you are not a financial institution (other than an investment entity organized in a possession of the United States). You must also certify that you have provided a withholding statement associated with Form W-8IMY to the extent you are required to provide a withholding statement.
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
        
        
        </div>
        <Checkbox 
                onChange={props.handleChange}
                value={props.values.isPart1Nationalprincipalcontract}
                checked={props.values.isPart1Nationalprincipalcontract}
                name="isPart1Nationalprincipalcontract"
                size="medium"
                style={{ fontSize: "2rem" }} />
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
            
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            I certify that the entity identified in Part I
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is a foreign entity that is not a financial institution (this category includes an entity organized in a possession of the United States that engages (or holds itself out as being engaged) primarily in the business of investing, reinvesting, or trading in securities, partnership interests, commodities, notional principal contracts, insurance or annuity contracts, or any interest in such security, partnership interest, commodity, notional principal contract, insurance contract or annuity contract); 
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is using this form to transmit withholding certificates and/or other documentation and has provided or will provide a withholding statement, as required
        </Typography>



        </Paper>

        

        
    </div>
  )
}
export default PNFEE;
