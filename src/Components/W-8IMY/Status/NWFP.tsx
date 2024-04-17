
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const NWFP = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part VIII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Nonwithholding Foreign Partnership, Simple Trust, or Grantor Trust</span>
        </Typography>
        
        <Typography>
        Check all that apply:
        </Typography>
        <Typography color="inherit">
            21 a
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 21a
                            </Typography>
                            
                            <a onClick={() => setToolInfo("21")}>
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
            {toolInfo === "21" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Check box 21a if you are a foreign partnership or a foreign simple or grantor trust that is not a WP or WT, and is providing this form for payments that are not effectively connected, or are not treated as effectively connected, with the conduct of a trade or business in the United States.
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
                value={props.values.isPart1nonwithholdingpartnership}
                checked={props.values.isPart1nonwithholdingpartnership}
                name="isPart1nonwithholdingpartnership"
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
                                            <label>I certify that the entity identified in Part I:</label>
                                            <label>Is a nonwithholding foreign partnership, a nonwithholding foreign simple trust, or a nonwithholding foreign grantor trust and is providing this form for payments that are not effectively connected, or are not treated as effectively connected, with the conduct of a trade or business in the United States; <strong>and</strong></label>
                                            <label>Is using this form to transmit withholding certificates and/or other documentation and has provided or will provide a withholding statement, as required for purposes of chapters 3 and 4, that is subject to the certifications made on this form.</label>
                                        </li>
                                    </ul>
                                </div>
                </Typography>
            </Typography>
            </Typography>

            
            b 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 21b
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
                        Check box 21b if you are a foreign partnership or foreign grantor trust providing this form for purposes of section 1446(a). If you are a foreign partnership (other than a WP) or grantor trust receiving payments of both the amounts described on line 21a and for purposes of section 1446(a), you should check both boxes. By checking either box, you are certifying to the applicable statements on the form.
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
                value={props.values.isPart1partnerinlowertierpartnership}
                checked={props.values.isPart1partnerinlowertierpartnership}
                name="isPart1partnerinlowertierpartnership"
                onChange={props.handleChange}
                disabled={props.values.chapter3StatusId == 28 ? true : false}
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
                    <div >
                                    <ul>
                                        <li>
                                            <label>I certify that the entity identified in Part I </label>
                                            <label>Is a foreign partnership that is a partner in a lower-tier partnership and is providing this Form W-8IMY for purposes of section 1446.</label>
                                        </li>
                                    </ul>
                                </div>
                </Typography>
            </Typography>

            c 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 21c
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
                        Check box 21c if you are a foreign partnership that is a transferor of an interest in a partnership receiving an amount realized from the transfer. If you check box 21c and are providing a withholding statement for a modified amount realized on the transfer, also check box 21d.

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
                value={props.values.isPart1forerignpartnershipsec1446f}
                checked={props.values.isPart1forerignpartnershipsec1446f}
                name="isPart1forerignpartnershipsec1446f"
                onChange={props.handleChange}
                disabled={(props.values.chapter3StatusId == 28 || props.values.chapter3StatusId == 29) ? true : false}
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
                                            <label>I certify that the entity identified in Part I is a foreign partnership receiving an amount realized on the transfer of an interest in a partnership for purposes of section 1446(f).</label>
                                        </li>
                                    </ul>
                                </div>
                </Typography>
            </Typography>

        

            d 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 21d
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
                        If you check box 21c and are providing a withholding statement for a modified amount realized on the transfer, also check box 21d. The withholding statement for a modified amount realized must show the allocation of the gain from the transfer to each of the partners for which a lower rate of withholding is being requested, and you must provide withholding certificates for each of the partners to avoid the requirement that the transferee (or your broker for a transfer of a PTP interest) treat a partner as a presumed foreign partner.

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
                value={props.values.isPart1partnershipformodifiedamount}
                checked={props.values.isPart1partnershipformodifiedamount}
                name="isPart1partnershipformodifiedamount"
                onChange={props.handleChange}
                disabled={(props.values.isPart1forerignpartnershipsec1446f === true && (props.values.chapter3StatusId!=28)) ? false : true}
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
                <div >
                                    <ul>
                                        <li>
                                            
                                            <label>I certify that the entity identified in Part I is a foreign partnership providing a withholding statement for a modified amount realized from the transfer (check, when applicable, only if box 21c is checked).</label>
                                        </li>
                                    </ul>
                                </div>
                </Typography>
            </Typography>

            e 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 21e
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
                        Check box 21e if you are a foreign grantor trust providing the form on behalf of each grantor or owner of the trust under Regulations section 1.1446(f)-1(c)(2)(vii) that is transmitting withholding certificates and providing a withholding statement to allocate an amount realized to each grantor or other owner in the trust for purposes of section 1446(f).

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
                value={props.values.isPart1foreigngrantortrustSec11446f}
                checked={props.values.isPart1foreigngrantortrustSec11446f}
                name="isPart1foreigngrantortrustSec11446f"
                onChange={props.handleChange}
                disabled={(props.values.chapter3StatusId==27 || props.values.chapter3StatusId==28) ? true:false}
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
                                            <label>
                                                I certify that the entity identified in Part I is a foreign grantor trust providing the form on behalf of each grantor or other owner of the trust under
                                                <a id="ctl00_ContentPlaceHolder1_ctl27_HyperLink1" href="javascript:OpenMore(&quot;ecb03039-57f7-405b-b6db-2d8cdcbbc953&quot;);">Regulations section  1.1446(f)-1(c)(2)(vii)</a>&nbsp;
                                                that is transmitting withholding certificates and providing a withholding statement to allocate the amount realized to each grantor or other owner.
                                            </label>
                                        </li>
                                    </ul>
                                </div>
            </Typography>
            </Typography>

            f 
            <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 21f
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
                        To the extent that the entity identified in Part 1 of this form is providing an alternative withholding statement described in Regulations section 1.1441-1(e)(3)(iv)(C)(3), you may check the box on this line to make the representation included on this line instead of making the representation on each alternative withholding statement.

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
                value={props.values.isPart1knowledgeundersection1441and1471}
                checked={props.values.isPart1knowledgeundersection1441and1471}
                name="isPart1knowledgeundersection1441and1471"
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
                                            
                                            <label>
                                                To the extent the entity identified in Part I of this form is providing an alternative withholding statement described in
                                                <a id="ctl00_ContentPlaceHolder1_ctl27_HyperLink2" href="javascript:OpenMore(&quot;e0799db6-9300-4a42-9e55-5b9e9b3c6270&quot;);">Regulations section  1.1441-1(e)(3)(iv)(C)(3)</a>&nbsp;
                                                for any payments associated with the form, the entity represents that the information on all of the withholding   certificates associated with the withholding statement may be relied on based on the standards of knowledge under section 1441 or section 1471 applicable to the entity.
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                </Typography>
            </Typography>


            
    </div>
  )
}
export default NWFP;
