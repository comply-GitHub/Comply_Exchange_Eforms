import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import InfoIcon from "@mui/icons-material/Info";


const QDD = ({handleChange, values, setFieldValue}) => {
    console.log("QDD form",values);
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div className="d-flex partParentDiv">
            <h5 className="sub_title_inner"><span className="partSpan">Part III</span> Qualified Intermediary</h5>
        </div>

        <Typography
            align="left"
            style={{
            margin: "10px",
            fontSize: "20px",
            fontWeight: "550",
            marginLeft: "10px",
            }}
        >
        14 
            <span>
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
            </span> 

            {toolInfo === "14" ? (
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
                        href="#"
                        underline="none"
                        style={{ marginTop: "10px", fontSize: "16px" }}
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
                )}
        </Typography>

        <Typography style={{ display: "flex" }}>
                    {/* <input type='checkbox' name="QDD14" checked={values.QDD14} value={values.QDD14}  onChange={handleChange}/> */}
            <Checkbox
            className="mx-2"
            onChange={handleChange}
            value={values.isPart1Integral}
            checked={values.isPart1Integral}
            name="isPart1Integral"
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
                <label>I certify that the entity identified in Part I (or branch, if relevant):</label>

                <label>Is a qualified intermediary with respect to the account(s) identified on line 10 or in a withholding statement associated with this form (as required) that is either:</label>
                <ul>
                            
                                
                <li>
                    <label>(i) not acting for its own account;</label>
                </li>
                <li>
                    <label>(ii) a qualified derivatives dealer; and/or</label>
                </li>
                <li>
                    <label>(iii) a qualified intermediary assuming primary withholding responsibility for payments of substitute interest, as permitted by the QI Agreement.</label>
                </li>
                <li>
                    <label>Has provided or will provide a withholding statement, as required, for purposes of chapters 3 and 4 that is subject to the certifications made on this form.</label>
                </li>

                </ul>
                <label>To the extent it acts as a disclosing QI for purposes of section 1446(a) or (f) for payments associated with this form, the QI is to provide the required payee documentation to associate with an amount realized or an amount subject to withholding on a PTP distribution.</label>

            </Typography>
        </Typography>

        <Typography style={{ fontSize:"12px" , fontWeight:"bold" , marginTop: "10px",}}>
        Qualified Intermediaries When Not Acting As Qualified Derivatives Dealers (check all that apply)
        </Typography>
        <Typography color="inherit">
            15 a
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                value={values.isPart1FFI}
                name='isPart1FFI'
                onChange={handleChange}
                checked={values.isPart1FFI}
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
                    <label>I certify that the entity identified in Part I of this form assumes primary withholding responsibility for purposes of chapters 3 and 4 for each account identified on a withholding statement attached to this form (or, if no withholding statement is attached to this form, for all accounts)</label>
                </Typography>
            </Typography>

            b 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                value={values.isPart1chap3and4}
                name='isPart1chap3and4'
                onChange={(e) => {
                    handleChange(e);
                    console.log(e.target.value)
                    setTimeout(() => { setFieldValue("isPart1regusection16049C", false); }, 200)
                    setTimeout(() => { setFieldValue("isPart1andbackupwithholdingresp", false); }, 200)
                    setTimeout(() => { setFieldValue("isPart1AllocatePorofchap4", false); }, 200)
                }}
                checked={values.isPart1chap3and4}
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
                <label>I certify that the entity identified in Part I of this form assumes primary withholding and reporting responsibility for each payment of an amount realized from the sale of an interest in a publicly traded partnership under section 1446(f) associated with each account identified on a withholding statement attached to this form for receiving such amounts (or, if no withholding statement is attached to this form, for all accounts).</label>
            </Typography>
            </Typography>

            c 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                value={values.isPart1Section1446f}
                name='isPart1Section1446f'
                onChange={handleChange}
                checked={values.isPart1Section1446f}
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
                    I certify that the entity identified in Part I of this form assumes primary withholding as a nominee under Regulations section  1.1446-4(b)(3) for each distribution by a publicly traded partnership associated with each account identified on a withholding statement attached to this form for receiving such distributions (or, if no withholding statement is attached to this form, for all accounts).
                    </label>
                </Typography>
            </Typography>

            d 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                value={values.isPart1Section14464b}
                name='isPart1Section14464b'
                onChange={(e) => {
                    handleChange(e);
                    console.log(e.target.value)
                    setTimeout(() => { setFieldValue("isPart1regusection16049C", false); }, 200)//15G
                    setTimeout(() => { setFieldValue("isPart1andbackupwithholdingresp", false); }, 200)//15H
                    setTimeout(() => { setFieldValue("isPart1AllocatePorofchap4", false); }, 200)//15I
                }}
                checked={values.isPart1Section14464b}
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
                    I certify that the entity identified in Part I of this form is a QI acting as a qualified securities lender assuming primary withholding and reporting responsibilities with respect to payments that are U.S. source substitute dividends received from the withholding agent associated with each account identified on a withholding statement attached to this form (or, if no withholding statement is attached to this form, for all accounts).
                    </label>
                </Typography>
            </Typography>

            e 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                value={values.isPart1QIacting}
                name='isPart1QIacting'
                onChange={handleChange}
                checked={values.isPart1QIacting}
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
                    I certify that the entity identified in Part I of this form assumes primary withholding responsibility for purposes of chapters 3 and 4 and primary Form 1099 reporting and backup withholding responsibility for all payments of U.S. source interest and substitute interest associated with this form, as permitted by the QI Agreement.
                    </label>
                </Typography>
            </Typography>


            f
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                value={values.isPart1ofchap3and41099repo}
                name='isPart1ofchap3and41099repo'
                onChange={(e) => {
                    handleChange(e);
                    console.log(e.target.value)
                    setTimeout(() => { setFieldValue("isPart1regusection16049C", false); }, 200)//15G
                    setTimeout(() => { setFieldValue("isPart1andbackupwithholdingresp", false); }, 200)//15H
                    setTimeout(() => { setFieldValue("isPart1AllocatePorofchap4", false); }, 200)//15I
                }}
                checked={values.isPart1ofchap3and41099repo}
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

                    I certify that the entity identified in Part I of this form assumes primary Form 1099 reporting and backup withholding responsibility or reporting responsibility as a participating FFI or registered deemed-compliant FFI with respect to accounts that it maintains that are held by specified U.S. persons as permitted under <a id="ctl00_ContentPlaceHolder1_ctl27_chkLine15fi">Regulations section  1.6049-4(c)(4)(i)</a>
                    or <a id="ctl00_ContentPlaceHolder1_ctl27_chkLine15fii">(c)(4)(ii)</a>

                    in lieu of Form 1099 reporting for each account identified on a withholding statement attached to this form (or, if no withholding statement is attached to this form, for all accounts).
                                    
                    </label>
                </Typography>
            </Typography>

            g
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                name="isPart1regusection16049C"
                value={values.isPart1regusection16049C}
                checked={values.isPart1regusection16049C}
                onChange={(e) => {
                    handleChange(e);
                    console.log(e.target.value)
                    setTimeout(() => { setFieldValue("isPart1chap3and4", false); }, 200) //isPart1chap3and4
                    setTimeout(() => { setFieldValue("isPart1Section14464b", false); }, 200) //isPart1Section14464b
                    setTimeout(() => { setFieldValue("isPart1ofchap3and41099repo", false); }, 200) //isPart1ofchap3and41099repo
                    setTimeout(() => { setFieldValue("isPart1andbackupwithholdingresp", false); }, 200) //isPart1andbackupwithholdingresp
                    setTimeout(() => { setFieldValue("isPart1AllocatePorofchap4", false); }, 200) //isPart1AllocatePorofchap4
                }}
                
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
                    I certify that the entity identified in Part I of this form does not assume primary Form 1099 reporting and backup withholding responsibility for each account identified on a withholding statement attached to this form (or, if no withholding statement is attached to this form, for all accounts)                
                    </label>
                </Typography>
            </Typography>

            h
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                name="isPart1andbackupwithholdingresp"
                value={values.isPart1andbackupwithholdingresp}
                onChange={handleChange}
                checked={values.isPart1andbackupwithholdingresp && values.isPart1regusection16049C}
                disabled={values.isPart1regusection16049C ? false:true}
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
                        (Complete only to the extent the entity identified in Part I of this form does not assume primary Form 1099 reporting and backup withholding responsibility.) If the entity identified in Part I of this form has allocated or will allocate a portion of a payment to a chapter 4 withholding rate pool of U.S. payees on a withholding statement associated with this form, I certify that the entity meets the requirements of
                        <a id="ctl00_ContentPlaceHolder1_ctl27_HyperLink1" >Regulations section  1.6049-4(c)(4)(iii)</a>&nbsp;
                        with respect to any account holder of an account it maintains that is included in such a withholding rate pool.
                    </label>
                </Typography>
            </Typography>

            i
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                name="isPart1AllocatePorofchap4"
                value={values.isPart1AllocatePorofchap4}
                onChange={handleChange}
                disabled={values.isPart1regusection16049C ? false:true}
                checked={values.isPart1AllocatePorofchap4 && values.isPart1regusection16049C}
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
                        (Complete only to the extent the entity identified in Part I of this form does not assume primary Form 1099 reporting and backup withholding responsibility.) If the entity identified in Part I of this form has allocated or will allocate a portion of a payment to a chapter 4 withholding rate pool of U.S. payees on a withholding statement associated with this form, to the extent the U.S. payees are account holders of an intermediary or flow-through entity receiving a payment from the entity, I certify that the entity has obtained, or will obtain, documentation sufficient to establish each such intermediary or flow-through entity status as a participating FFI, registered deemed-compliant FFI, or FFI that is a QI.
                    </label>
                </Typography>
            </Typography>
        </Typography>


        <Typography style={{ fontSize:"12px" , fontWeight:"bold" , marginTop: "10px",}}>
            Qualified Derivatives Dealers
        </Typography>

        <Typography color="inherit">
            16 a
            <Typography style={{ display: "flex" }}>
            <Checkbox
            className="mx-2"
            onChange={(e) => {
                handleChange(e);
                console.log(e.target.value)
                setTimeout(() => { setFieldValue("corporation", false); }, 200) //QDD16BCorp
                setTimeout(() => { setFieldValue("partnership", false); }, 200) //QDD16BPart
                setTimeout(() => { setFieldValue("disregardedEntity", false); }, 200) //QDD16BDisregard
            }}
            name="isPart1QDDidentified"
            value={values.isPart1QDDidentified}
            checked={values.isPart1QDDidentified}
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
            I certify that each QDD identified in Part I of this form or on a withholding statement associated with this form meets the requirements to act as a QDD (including approval by the IRS to so act) and assumes primary withholding and reporting responsibilities under chapters 3, 4, and 61 and section 3406 with respect to any payments it makes with respect to potential section 871(m) transactions.
            </label>
            </Typography>
            </Typography>
            b <label>
            Entity classification of QDD:</label>
            <Typography style={{ display: "flex" }}>
            <Checkbox
            className="mx-2"
            onChange={handleChange}
            disabled={values.isPart1QDDidentified ? false:true}
            name="corporation"
            value={values.corporation}
            checked={values.corporation && values.isPart1QDDidentified}
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
                corporation

                </Typography>

            <Checkbox
            className="mx-2"
            onChange={handleChange}
            disabled={values.isPart1QDDidentified ? false:true}
            name="partnership"
            value={values.partnership}
            checked={values.partnership && values.isPart1QDDidentified}
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
                partnership

                </Typography>


            <Checkbox
            className="mx-2"
            onChange={handleChange}
            disabled={values.isPart1QDDidentified ? false:true}
            name="disregardedEntity"
            value={values.disregardedEntity}
            checked={values.disregardedEntity && values.isPart1QDDidentified}
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
                Disregarded Entity

                </Typography>
            </Typography>
        </Typography>

    </div>
  )
}
export default QDD;
