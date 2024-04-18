
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const TFI = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part V <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Territory Financial Institution</span>
        </Typography>
        {/* <div className="d-flex partParentDiv">
            <h5 className="sub_title_inner"><span className="partSpan">Part V</span>  Territory Financial Institution</h5>
        </div> */}

        <Typography color="inherit">
            18 a
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 18a
                            </Typography>
                            
                            <a onClick={() => setToolInfo("18")}>
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
            {toolInfo === "18" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                            Check box 18a to certify that you are a financial institution (other than an investment entity that is not also a depository institution, custodial institution, or specified insurance company) incorporated or organized under the laws of a territory of the United States.
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
                value={props.values.isPart1lawsofterritoryofUS}
                checked={props.values.isPart1lawsofterritoryofUS}
                name="isPart1lawsofterritoryofUS"
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
                    <label>I certify that the entity identified in Part I is a financial institution (other than an investment entity that is not also a depository institution, custodial institution, or specified insurance company) that is incorporated or organized under the laws of a territory of the United States.</label>
                </Typography>
            </Typography>
            </Typography>

            <Typography style={{
                fontSize: "14px",
                color: "black",
                marginTop: "10px",
                textAlign:"justify" 
                }}>
            Check the box on line 18b or 18c, whichever applies.
            </Typography>
            b 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 18b
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
                        Check box 18b to certify that you have agreed to be treated as a U.S. person for purposes of both chapter 3 and chapter 4 with respect to payments of reportable amounts and withholdable payments associated with this Form W-8IMY. In this case, you will be responsible for chapter 3 withholding and reporting, backup withholding under section 3406, and chapter 4 withholding and reporting for any payments you make to persons for whom you are receiving a reportable amount or withholdable payment. If you check the box on line 18b, you must provide an EIN on line 8.
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
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("isPart1withholdablepayment", false)
                    },200)
                }}
                value={props.values.isPart1EvidenceofChap3and4}
                checked={props.values.isPart1EvidenceofChap3and4}
                name="isPart1EvidenceofChap3and4"
                size="medium"
                style={{ fontSize: "2rem" }}
            />
                {/* <Checkbox
                className="mx-2"
                onChange={props.handleChange}
                value={props.values.isPart1EvidenceofChap3and4}
                checked={props.values.isPart1EvidenceofChap3and4}
                name="isPart1EvidenceofChap3and4"
                size="medium"
                style={{ fontSize: "2rem" }}
                /> */}
                <Typography
                style={{
                fontSize: "14px",
                color: "black",
                marginTop: "10px",
                background:"lightGrey",
                textAlign:"justify" 
                }}
                >
                    <label>I further certify that the entity identified in Part I is using this form as evidence of its agreement with the withholding agent to be treated as a U.S. person for purposes of chapters 3 and 4 with respect to any reportable amounts and withholdable payments associated with this withholding certificate.</label>
                </Typography>
            </Typography>

            c 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 18c
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
                        Check box 18c to certify that you are a territory financial institution that has not agreed to be treated as a U.S. person for reportable amounts and withholdable payments associated with this form. You must certify that you are transmitting withholding certificated or other documentation for persons for whom you are receiving a payment (as required for chapter 3, chapter 61, and section 3496 purposes, and, in the case of a withholdable payment, for chapter 4 withholding and reporting purposes). You must also certify that you have provided or will provide a withholding statement (as required) with the information required on an NQI withholding statement.
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
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("isPart1EvidenceofChap3and4", false)
                    },200)
                }}
                value={props.values.isPart1withholdablepayment}
                checked={props.values.isPart1withholdablepayment}
                name="isPart1withholdablepayment"
                size="medium"
                style={{ fontSize: "2rem" }}
            />
                {/* <Checkbox
                className="mx-2"
                onChange={props.handleChange}
                value={props.values.isPart1withholdablepayment}
                checked={props.values.isPart1withholdablepayment}
                name="isPart1withholdablepayment"
                size="medium"
                style={{ fontSize: "2rem" }}
                /> */}
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
                        <ul>
                                <li>
                                    Is using this form to transmit withholding certificates and/or other documentation for the persons for whom it receives a payment;Has provided or will provide a withholding statement, as required. <strong>and</strong>
                                </li>
                                <li>
                                    Has provided or will provide a withholding statement, as required.
                                </li>
                        </ul>
                    </label>
                </Typography>
            </Typography>

            <Typography style={{
                fontSize: "14px",
                color: "black",
                marginTop: "10px",
                textAlign:"justify" 
                }}>
            Check the boxes on lines 18d, and 18e or 18f, as applicable.
            </Typography>

            d 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 18d
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
                        If this form is being provided for purposes of the entity’s holding of an interest in a PTP, check box 18d to certify that you have agreed to be treated as a U.S. person under Regulations section 1.1446(f)-4(a)(2)(i)(B) with respect to an amount realized from a sale of a PTP interest. You may provide a withholding statement when you do not act as a U.S. person for an amount realized under the same conditions that apply to an NQI receiving an amount realized. If you check 18d, you must provide an EIN on line 8.
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
                value={props.values.isPart1regulationSec11446f4aiB}
                checked={props.values.isPart1regulationSec11446f4aiB}
                name="isPart1regulationSec11446f4aiB"
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
                                                I certify that the entity identified in Part I agrees to be treated as a U.S. person under Regulations section  1.1446(f)-4(a)(2)(i)(B)
                                                
                                                with respect to amounts realized on sales of interests in publicly traded partnerships.
                                            </label>
                </Typography>
            </Typography>

            e 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 18e
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
                        Check box 18e to certify that you have agreed to be treated as a U.S. person (as described in Regulations section 1.1441-1(b)(2)(iv)) and as a nominee under Regulations section 1.1446-4(b)(3) with respect to distributions made by PTPs. If you check 18e, you must provide an EIN on line 8.
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
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("partVNomineeforDistribution", false)
                    },200)
                }}
                value={props.values.isPart1regulationSec11446f41vA}
                checked={props.values.isPart1regulationSec11446f41vA}
                disabled={props.values.isPart1regulationSec11446f4aiB ? false : true}
                name="isPart1regulationSec11446f41vA"
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
                                                I certify that the entity identified in Part I agrees to be treated as a U.S. person (as described in Regulations section  1.1441-1(b)(2)(iv)(A))
                                                
                                                and as a nominee under Regulations section  1.1446-4(b)(3)
                                                
                                                with respect to distributions by publicly traded partnerships, <strong>or</strong>
                                            </label>
            </Typography>
            </Typography>

            f
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 18f
                            </Typography>
                            
                            <a onClick={() => setToolInfo("f")}>
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
            {toolInfo === "f" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        If you receive PTP distributions for which you do not act as a nominee under Regulations section 1.1446-4(b)(3), check box 18f. You should provide a withholding statement to allocate the amounts subject to withholding on a distribution and provide the appropriate account holder documentation, taking into account the limitation on an NQI providing this documentation for amount realized (to the extent applicable).
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
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("isPart1regulationSec11446f41vA", false)
                    },200)
                }}
                value={props.values.partVNomineeforDistribution}
                checked={props.values.partVNomineeforDistribution}
                name="partVNomineeforDistribution"
                disabled={props.values.isPart1regulationSec11446f4aiB ? false:true}
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
                <label>Is not acting as a nominee for distributions from publicly traded partnerships and is providing withholding statements for the distributions.
                <strong>Note:</strong> If this form is provided for an amount realized, see the instructions for Part V before providing a withholding statement for an amount realized when the entity does not check the box on line 18d.
                </label>
                </Typography>
            </Typography>


            
    </div>
  )
}
export default TFI;
