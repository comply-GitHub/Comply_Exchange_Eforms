
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const NQI = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part IV <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Nonqualified Intermediary</span>
        </Typography>
        

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
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            17a
                            </Typography>
                            
                            <a onClick={() => setToolInfo("17")}>
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
            {toolInfo === "17" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Select Check box 17a If you are providing form W-8IMY as a nonqualified Intermediary (NQI)
If you are providing Form W-8IMY as a nonqualified intermediary (NQI), you must check box 17a. By checking this box, you are certifying to all of the statements on line 17a. If you are required to provide a chapter 4 status on line 5 (see specific instructions for line 5) and are acting as an intermediary for a withholdable payment, you must provide your chapter 4 status on line 5 or as otherwise permitted in these instructions to avoid withholding at the chapter 4 rate of 30% being applied to any withholdable payment you receive from the withholding agent regardless of whether you check box 17b (except for documentation provided with respect to exempt beneficial owners). See the specific instructions for Part IX.                        </Typography>

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
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            17b
                            </Typography>
                            
                            <a onClick={() => setToolInfo("b")}>
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
            {toolInfo === "b" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Check box 17b if you are using this form to transmit withholding certificates or other documentation along with a withholding statement that satisfies the requirements of chapters 3 and 4 (including for purposes of section 1446(a) and including if you are providing pooled information for purposes of chapter 61 under the alternative procedure for U.S. non-exempt recipients, or chapter 4 withholding rate pools (as applicable) for a withholdable payment).
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
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            17c
                            </Typography>
                            
                            <a onClick={() => setToolInfo("c")}>
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
            {toolInfo === "c" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                            Check box 17c to certify that you are permitted under Regulations section 1.6049-4(c)(4) to provide a chapter 4 withholding rate pool of U.S. payees to which a payment is allocated on a withholding statement associated with the Form W-8IMY. This checkbox does not apply to a PTP distribution. You may check this box with respect to U.S. source substitute dividends you receive as a QSL regardless of whether you act as an intermediary or principal for those amounts.
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
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            17d
                            </Typography>
                            
                            <a onClick={() => setToolInfo("d")}>
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
            {toolInfo === "d" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Check box 17d to certify that you are acting as a QSL with respect to the accounts identified on this line or in a withholding statement associated with this form with respect to a payment that is a U.S. source substitute divided. You may check this box with respect to U.S. source substitute dividends you receive as a QSL regardless of whether you act as an intermediary or principal for those amounts. If you are acting on behalf of another NQI or on behalf of a foreign partnership or foreign trust that is not a withholding foreign partnership or a withholding foreign trust, you must attach to your Form W-8IMY the Form W-8IMY of the other NQI, foreign partnership, or foreign trust together with the withholding certificates and other documentation attached to that Form W-8IMY that are required for both chapter 3 and chapter 4 purposes.
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
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            17e
                            </Typography>
                            
                            <a onClick={() => setToolInfo("e")}>
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
            {toolInfo === "e" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        As part of providing any alternative withholding statements that are associated with your Form W-8IMY, you may make the representation indicated on line 17e. If you check the box line 17e, you are not required to represent on each alternative withholding statement that the information on the withholding certificates provided with the alternative withholding statement is not inconsistent with any other account information you have for the beneficial owners for determining the appropriate rate of withholding.
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
