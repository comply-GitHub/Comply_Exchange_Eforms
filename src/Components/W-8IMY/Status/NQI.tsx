
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const NQI = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div className="d-flex partParentDiv">
            <h5 className="sub_title_inner"><span className="partSpan">Part IV</span>  Nonqualified Intermediary</h5>
        </div>

        <Typography
            align="left"
            style={{
            margin: "10px",
            fontSize: "10px",
            fontWeight: "550",
            marginLeft: "10px",
            }}
        >
        Check all that apply:
            {/* <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            <Typography color="inherit">
                            Line 14
                            </Typography>
                            <a onClick={() => setToolInfo("14")}>
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
                            <Typography color="inherit">
                            Line 14
                            </Typography>
                            </a>
                            <a onClick={() => setToolInfo("14")}>
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
            </span>  */}

            {/* {toolInfo === "14" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                            Select check box if you are a Qualified Intermediary
                            Check box 14 if you are a qualified intermediary (QI) (whether or not you assume primary withholding responsibility) for the payments for which you are providing this form. A QI that is an FFI receiving a withholdable payment must be a participating FFI, registered deemed-compliant FFI, exempt beneficial owner that is a central bank of issue that meets the requirements of and agrees to be treated as a participating FFI (including a reporting Model 2 FFI) or a registered deemed-compliant FFI (including a reporting Model 1 FFI) with respect to any account that it maintains and that is held in connection with a commercial financial activity described in Regulations section 1.1471-6(h) and for which it receives a withholdable payment, or FFI treated as a deemed-compliant FFI under an applicable IGA that is subject to due diligence and reporting requirements similar to those applicable to a registered deemed-compliant FFI. By checking the box, you are certifying to all of the statements contained on line 14.
                        </Typography>

                        <Link
                        to=""
                        onClick={() => {
                        setToolInfo("");
                        }}
                        >
                        --Show Less--
                        </Link>
                    </Paper>
                </div>
                ) : (
                ""
                )} */}
        </Typography>

        <Typography style={{ fontSize:"12px" , fontWeight:"bold" , marginTop: "10px",}}>
        Qualified Intermediaries When Not Acting As Qualified Derivatives Dealers (check all that apply)
        </Typography>
        <Typography color="inherit">
            17 a
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                value={props.values.isPart1QIeachamount}
                checked={props.values.isPart1QIeachamount}
                name='isPart1QIeachamount'
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
                    <label>
                    (All nonqualified intermediaries and QIs that are not acting in their capacity as such check here) I certify that the entity identified in Part I of this form is not acting as a qualified intermediary with respect to each account(s) for which this form is provided and is not acting for its own account. 
                    </label>
                </Typography>
            </Typography>

            b 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                onChange={props.handleChange}
                value={props.values.isPart1transmitwithholdingCer}
                checked={props.values.isPart1transmitwithholdingCer}
                name='isPart1transmitwithholdingCer'
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
                <label>I certify that the entity identified in Part I </label>
                <label>of this form is using this form to transmit withholding certificates and/or other documentation and has provided, or will provide, a withholding statement, as required.</label>
            </Typography>
            </Typography>

            c 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                onChange={props.handleChange}
                value={props.values.isPart1meetsReguSection160494C}
                checked={props.values.isPart1meetsReguSection160494C}
                name='isPart1meetsReguSection160494C'
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
                    <label>I certify that the entity identified in Part I of this form meets the requirements of</label>
                    <a>Regulations section  1.6049-4(c)(4)(iii)</a>
                    <label>with respect to any account holder of an account it maintains that is included in a withholding rate pool of U.S. payees provided on a withholding statement associated with this form.</label>
                </Typography>
            </Typography>

            d 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                onChange={props.handleChange}
                name="isPart1OtherthanQI"
                value={props.values.isPart1OtherthanQI}
                checked={props.values.isPart1OtherthanQI}
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
                    <label>I certify that the entity identified in Part I of this form Is acting as a qualified securities lender with respect to payments associated with this form that are U.S. source substitute dividends received from the withholding agent.</label>
                </Typography>
            </Typography>

            e 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                onChange={props.handleChange}
                name="isPart1Section1441and1471"
                value={props.values.isPart1Section1441and1471}
                checked={props.values.isPart1Section1441and1471}
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
                    <label>To the extent that the entity identified in Part I of this form is providing an alternative withholding statement described in</label>
                   <label><a>Regulations section  1.1441-1(e)(3)(iv)(C)(3)</a></label> 
                    <label>for any payments associated with the form, the entity represents that the information on all of the withholding statements associated with this withholding certificate have been (or will be) verified for inconsistency with any other account information the entity has for the beneficial owners for determining the rate of withholding with respect to each payee (applying the standards of knowledge under section 1441 or section 1471, as applicable).</label>
                </Typography>
            </Typography>


            
        </Typography>
    </div>
  )
}
export default NQI;
