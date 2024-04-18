
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const WFP = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part VII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Withholding Foreign Partnership (WP) or Withholding Foreign Trust (WT)</span>
        </Typography>
        

        <Typography color="inherit">
            20
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 20
                            </Typography>
                            
                            <a onClick={() => setToolInfo("20")}>
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
            {toolInfo === "20" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Check box 20 if you are a WP or a WT and you are receiving the payment on behalf of your partners, beneficiaries, or owners. If you are acting as a WP or WT, you must assume primary withholding and reporting responsibility under chapter 3 and chapter 4 for all payments that are made to you for your partners, beneficiaries, or owners. Therefore, you are not required to provide information to the withholding agent regarding each partner’s, beneficiary’s, or owner’s distributive share of the payment and the information for the withholding agent to report under section 1472 (if otherwise required). You are not, however, permitted to assume primary withholding and reporting responsibility for payments subject to withholding under section 1445, 1446(a), 1446(f), or any other amount subject to withholding on a PTP distribution. If you are also receiving payments from the same withholding agent for persons other than your partners, beneficiaries, or owners, you must provide a separate Form W-8IMY for those payments. If you are receiving a withholdable payment, you must provide your chapter 4 status on line 5 and provide your GIIN (if applicable).
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
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                value={props.values.isPart1WPorWTagreement}
                checked={props.values.isPart1WPorWTagreement}
                name="isPart1WPorWTagreement"
                onChange={props.handleChange}
                size="medium"
                style={{ fontSize: "2rem" }}
                />
                <Typography
                style={{
                fontSize: "14px",
                color: "black",
                marginTop: "10px",
                background:"lightGrey",
                textAlign:"justify" 
                }}
                >
                    <div>
                                    <ul>
                                        <li>
                                            <label>I certify that the entity identified in Part I is a withholding foreign partnership or a withholding foreign trust that is compliant with the terms of its WP or WT agreement</label>
                                        </li>
                                    </ul>
                                </div>
                </Typography>
            </Typography>
            </Typography>
           
    </div>
  )
}
export default WFP;
