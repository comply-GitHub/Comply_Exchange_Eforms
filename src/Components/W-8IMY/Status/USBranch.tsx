
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const USBranch = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part VI <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Certain U.S. Branches</span>
        </Typography>
        

        <Typography color="inherit">
            19 a
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            19a
                            </Typography>
                            
                            <a onClick={() => setToolInfo("19")}>
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
            {toolInfo === "19" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Check box 19a to certify that you are a U.S. branch receiving payments of income that are reportable amounts or withholdable payments not effectively connected with the conduct of a trade or business in the United States, payments of PTP distributions, or payments of amounts realized.
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
                value={props.values.isPart1PublictradedPartnership}
                checked={props.values.isPart1PublictradedPartnership}
                name="isPart1PublictradedPartnership"
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
                    <label>I certify that the entity identified in Part I is a U.S. branch receiving reportable amounts or withholdable payments that are not income effectively connected with the conduct of a trade or business in the United States, distributions from publicly traded partnerships, or amounts realized on sales of interests in publicly traded partnerships.</label>
                </Typography>
            </Typography>
            </Typography>

            <Typography style={{
                fontSize: "14px",
                color: "black",
                marginTop: "10px",
                textAlign:"justify" 
                }}>
            Check box 19b or 19c, whichever applies.
            </Typography>
            b 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            19b
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
                        Check box 19b to certify that you are a U.S. branch of a foreign bank or insurance company described in this certification that has agreed with the withholding agent to be treated as a U.S. person under Regulations section 1.1441-1(b)(2)(iv) with respect to such payments associated with this Form W-8IMY. In such case, you will be responsible for chapter 3 withholding and reporting and chapter 4 withholding and reporting for any such payments you make to persons for whom you are receiving a withholdable payment (including any of your branches treated as NPFFIs). In addition, you will be treated as a U.S. payor for chapter 61 purposes by checking the box on line 19b (including for backup withholding under section 3406). You must provide your EIN on line 8. You do not need to provide a chapter 4 status on line 5 or a GIIN on line 9.
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
                value={props.values.isPart119bRegulationSec11411b}
                checked={props.values.isPart119bRegulationSec11411b}
                name="isPart119bRegulationSec11411b"
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
                    <label>I certify that the entity identified in Part I is a U.S. branch of a foreign bank or insurance company described in
                    <a id="ctl00_ContentPlaceHolder1_ctl27_HyperLink1" href="javascript:OpenMore(&quot;1808e194-e06c-478c-b4f5-bd9ae08690b6&quot;);">Regulations section  1.1441-1(b)(2)(iv)(A)</a>&nbsp;
                                                that is using this form as evidence of its agreement with the withholding agent to be treated as a U.S. person with respect to any reportable amounts or withholdable payments associated with this withholding certificate.
                                            </label>
                </Typography>
            </Typography>

            c
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            19c
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
                        Check box 19c to certify that you are a U.S. branch that does not have an agreement with the withholding agent to be treated as U.S. person under Regulations section 1.1441-1(b)(2)(iv). You must certify that you are transmitting withholding certificates or other documentation for persons for whom you are receiving the payment of a reportable amount or withholdable payment. You must also certify that you have provided or will provide a withholding statement (as required) with the information required on an NQI withholding statement. Also, check box 19c to certify that, when you are receiving a withholdable payment associated with this form, you are applying the rules described in Regulations section 1.1471-4(d)(2)(iii)(C). You must also provide your EIN on line 8 but do not need to include a chapter 4 status in Part I, line 5, or a GIIN on line 9. If you are unable to make this certification, you cannot fill out this part but instead must check the box on line 5 indicating you are a nonparticipating FFI.
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
                value={props.values.isPart119cRegulationSec11414d}
                checked={props.values.isPart119cRegulationSec11414d}
                name="isPart119cRegulationSec11414d"
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
                        <ul>

                            <li >
                                <label>Is using this form to transmit withholding certificates and/or other documentation for the persons for whom the branch receives a payment</label></li>
                            <li>
                                <label>Has provided or will provide a withholding statement, as required;<b>and </b></label></li>
                            <li>
                                <label>In the case of a withholdable payment, is applying the rules described in </label>
                                <a id="ctl00_ContentPlaceHolder1_ctl27_HyperLink3" href="javascript:OpenMore(&quot;ed0d8e7c-e9ff-4760-b608-aadbfff41ea6&quot;);">Regulations section  1.1471-4(d)(2)(iii)(C)</a></li>
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
            Check the boxes on lines 19d, and 19e or 19f, as applicable.
            </Typography>

            d 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            19d
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
                        If this form is being provided for purposes of the entity’s holding of an interest in a PTP, check the box on 19d to certify that you are a U.S. branch described in Regulations section 1.1446(f)-4(a)(2)(i)(B) that is acting as a U.S. person with respect to an amount realized from the sale of a PTP interest. You may provide a withholding statement when you do not act as a U.S. person for an amount realized under the same conditions that apply to an NQI receiving an amount realized. You must provide your EIN on line 8 but do not need to provide a chapter 4 status on line 5 or a GIIN on line 9.
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
                value={props.values.isPart119dRegulationSec11414a}
                checked={props.values.isPart119dRegulationSec11414a}
                name="isPart119dRegulationSec11414a"
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
                    <ul>
                                        <li>
                                            <label>
                                                I certify that the entity identified in Part I is a U.S. branch (as described in
                                                <a id="ctl00_ContentPlaceHolder1_ctl27_HyperLink2" href="javascript:OpenMore(&quot;29a36eac-647f-4d74-8467-28759d9dd2ab&quot;);">Regulations section  1.1446(f)-4(a)(2)(i)(B))</a>&nbsp;
                            that is acting as a U.S. person with respect to amounts realized on the sales of interests in publicly traded partnerships,</label>

                                        </li>
                                    </ul>
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
                            19e
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
                        Check box 19e to certify that you are a U.S. branch described in Regulations section 1.1441-1(b)(2)(iv) that is acting as a nominee with respect to distributions by PTPs under Regulations section 1.1446-4(b)(3). You must provide your EIN on line 8 but do not need to provide a chapter 4 status on line 5 or a GIIN on line 9.
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
                value={props.values.isPart119eRegulationSec11411b}
                checked={props.values.isPart119eRegulationSec11411b}
                name="isPart119eRegulationSec11411b"
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
                <ul>
                                        <li>
                                            
                                            <label>
                                                I certify that the entity identified in Part I is a U.S. branch (as described in Regulations section  1.1441-1(b)(2)(iv)(A))

                                                
                                                
                                                that is treated as a U.S. person and as a nominee with respect to distributions by publicly traded partnerships under Regulations section  1.1446-4(b)(3)&nbsp;,or
                                            </label>
                                            
                                           
                                        </li>
                                    </ul>
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
                            19f
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
                        If you are a U.S. branch receiving PTP distributions associated with the form and are not acting as a nominee for the distributions under Regulations section 1.1446-4(b)(3), you should check box 19f. You should provide a withholding statement to allocate the amounts subject to withholding on a distribution and provide the appropriate account holder documentation, taking into account the limitation on an NQI providing this documentation for amount realized (to the extent applicable).
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
                value={props.values.partVINomineeforDistribution}
                checked={props.values.partVINomineeforDistribution}
                name="partVINomineeforDistribution"
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
                <ul>
                                        <li>
                                            <label>
                                                Is not acting as a nominee for distributions from publicly traded partnerships and is providing withholding statements for the distributions.
                                                <strong>Note:</strong> If this form is provided for an amount realized, see the instructions for Part VI before providing a withholding statement for an amount realized when the U.S. branch does not check the box on line 19d.
                                            </label>
                                        </li>
                                    </ul>
                </label>
                </Typography>
            </Typography>


            
    </div>
  )
}
export default USBranch;
