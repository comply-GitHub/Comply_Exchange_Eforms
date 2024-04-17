
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const ERP = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XX <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Exempt Retirement Plans</span>
        </Typography>
        <Typography>
        <strong>Check the box on line 33a, b, c, d, e, or f, whichever applies.</strong>

        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                33a
                <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 33a
                            </Typography>
                            
                            <a onClick={() => setToolInfo("33")}>
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
            {toolInfo === "33" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Select only if all exempt retirement plans
All exempt retirement plans must check the appropriate box to certify that you satisfy the requirements for this classification.
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
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => { 
                    props.setFieldValue("isrighttomorethan5PeroftheFFI", false); 
                    props.setFieldValue("issponsoredbyoneormoreemployers", false); 
                    props.setFieldValue("isformedpursuansection401a", false); 
                    props.setFieldValue("isestablishedbenefitoneormoreRetFunds", false); 
                    props.setFieldValue("isestablishedCentralbankofissue", false); 
                
                }, 200)
                    
                }}
                value={props.values.isPart1Benefitsonincome}
                checked={props.values.isPart1Benefitsonincome}
                name="isPart1Benefitsonincome"
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
            Is established in a country with which the United States has an income tax treaty in force;
             </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is operated principally to administer or provide pension or retirement benefits; and

            </Typography>
        <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is entitled to treaty benefits on income that the fund derives from U.S. sources (or would be entitled to benefits if it derived any such income) as a resident of the other country which satisfies any applicable limitation on benefits requirement.
            </Typography>
        </Paper>

        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                b
            </Typography>
            <Typography>
            <Checkbox 
                
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => { 
                        props.setFieldValue("isPart1Benefitsonincome", false);
                        //props.setFieldValue("isrighttomorethan5PeroftheFFI", false); 
                        props.setFieldValue("issponsoredbyoneormoreemployers", false); 
                        props.setFieldValue("isformedpursuansection401a", false); 
                        props.setFieldValue("isestablishedbenefitoneormoreRetFunds", false); 
                        props.setFieldValue("isestablishedCentralbankofissue", false); 
                    }, 200)
                }}
                value={props.values.isrighttomorethan5PeroftheFFI}
                checked={props.values.isrighttomorethan5PeroftheFFI}
                name="isrighttomorethan5PeroftheFFI"
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
            Is organized for the provision of retirement, disability, or death benefits (or any combination thereof) to beneficiaries that are former employees of one or more employers in consideration for services rendered;
             </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            No single beneficiary has a right to more than 5% of the FFI's assets;

            </Typography>
        <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is subject to government regulation and provides annual information reporting about its beneficiaries to the relevant tax authorities in the country in which the fund is established or operated; and
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is generally exempt from tax on investment income under the laws of the country in which it is established or operates due to its status as a retirement or pension plan;
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Receives at least 50% of its total contributions from sponsoring employers (disregarding transfers of assets from other plans described in this part, retirement and pension accounts described in an applicable Model 1 or Model 2 IGA, other retirement funds described in an applicable Model 1 or Model 2 IGA, or accounts described in Regulations section 1.1471-5(b)(2)(i)(A) );
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Either does not permit or penalizes distributions or withdrawals made before the occurrence of specified events related to retirement, disability, or death (except rollover distributions to accounts described in Regulations section 1.1471-5(b)(2)(i)(A) (referring to retirement and pension accounts), to retirement and pension accounts described in an applicable Model 1 or Model 2 IGA, or to other retirement funds described in this part or in an applicable Model 1 or Model 2 IGA); or
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Limits contributions by employees to the fund by reference to earned income of the employee or may not exceed $50,000 annually.
            </Typography>
        
    </Paper>
            <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                c
            </Typography>
            <Typography>
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => { 
                        props.setFieldValue("isPart1Benefitsonincome", false);
                        props.setFieldValue("isrighttomorethan5PeroftheFFI", false); 
                        //props.setFieldValue("issponsoredbyoneormoreemployers", false); 
                        props.setFieldValue("isformedpursuansection401a", false); 
                        props.setFieldValue("isestablishedbenefitoneormoreRetFunds", false); 
                        props.setFieldValue("isestablishedCentralbankofissue", false); 
                    }, 200)
                }}
                value={props.values.issponsoredbyoneormoreemployers}
                checked={props.values.issponsoredbyoneormoreemployers}
                name="issponsoredbyoneormoreemployers"
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
            Is organized for the provision of retirement, disability, or death benefits (or any combination thereof) to beneficiaries that are former employees of one or more employers in consideration for services rendered;
             </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Has fewer than 50 participants;

            </Typography>
                <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is sponsored by one or more employers, each of which is not an investment entity or passive NFFE.
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Employee and employer contributions to the fund (disregarding transfers of assets from other plans described in this part, retirement and pension accounts described in an applicable Model 1 or Model 2 IGA, or accounts described in Regulations section 1.1471-5(b)(2)(i)(A) are limited by reference to earned income and compensation of the employee, respectively;
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Participants that are not residents of the country in which the fund is established or operated are not entitled to more than 20% of the fund's assets; and
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is subject to government regulation and provides annual information reporting about its beneficiaries to the relevant tax authorities in the country in which the fund is established or operates.
            </Typography>
    </Paper>
            <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
               d
            </Typography>
            <Typography>
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => { 
                        props.setFieldValue("isPart1Benefitsonincome", false);
                        props.setFieldValue("isrighttomorethan5PeroftheFFI", false); 
                        props.setFieldValue("issponsoredbyoneormoreemployers", false); 
                        //props.setFieldValue("isformedpursuansection401a", false); 
                        props.setFieldValue("isestablishedbenefitoneormoreRetFunds", false); 
                        props.setFieldValue("isestablishedCentralbankofissue", false); 
                    }, 200)
                }}
                value={props.values.isformedpursuansection401a}
                checked={props.values.isformedpursuansection401a}
                name="isformedpursuansection401a"
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
            Is formed pursuant to a pension plan that would meet the requirements of section 401(a), other than the requirement that the plan be funded by a trust created or organized in the United States.
             </Typography>
        </Paper>

        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
               e
            </Typography>
            <Typography>
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => { 
                        props.setFieldValue("isPart1Benefitsonincome", false);
                        props.setFieldValue("isrighttomorethan5PeroftheFFI", false); 
                        props.setFieldValue("issponsoredbyoneormoreemployers", false); 
                        props.setFieldValue("isformedpursuansection401a", false); 
                        //props.setFieldValue("isestablishedbenefitoneormoreRetFunds", false); 
                        props.setFieldValue("isestablishedCentralbankofissue", false); 
                    }, 200)
                }}
                value={props.values.isestablishedbenefitoneormoreRetFunds}
                checked={props.values.isestablishedbenefitoneormoreRetFunds}
                name="isestablishedbenefitoneormoreRetFunds"
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
            is established exclusively to earn income for the benefit of one or more retirement funds described in this part or in an applicable Model 1 or Model 2 IGA, accounts described in Regulations section 1.1471-5(b)(2)(i)(A) (referring to retirement and pension accounts), or retirement and pension accounts described in an applicable Model 1 or Model 2 IGA.
             </Typography>
        </Paper>

        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
               f
            </Typography>
            <Typography>
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => { 
                        props.setFieldValue("isPart1Benefitsonincome", false);
                        props.setFieldValue("isrighttomorethan5PeroftheFFI", false); 
                        props.setFieldValue("issponsoredbyoneormoreemployers", false); 
                        props.setFieldValue("isformedpursuansection401a", false); 
                        props.setFieldValue("isestablishedbenefitoneormoreRetFunds", false); 
                        //props.setFieldValue("isestablishedCentralbankofissue", false); 
                    }, 200)
                }}
                value={props.values.isestablishedCentralbankofissue}
                checked={props.values.isestablishedCentralbankofissue}
                name="isestablishedCentralbankofissue"
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
            Is established and sponsored by a foreign government, international organization, central bank of issue, or government of a U.S. possession (each as defined in Regulations section 1.1471-6 or an exempt beneficial owner described in an applicable Model 1 or Model 2 IGA to provide retirement, disability, or death benefits to beneficiaries or participants that are current or former employees of the sponsor (or persons designated by such employees); or
             </Typography>

             <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is established and sponsored by a foreign government, international organization, central bank of issue, or government of a U.S. possession (each as defined in Regulations section 1.1471-6 or an exempt beneficial owner described in an applicable Model 1 or Model 2 IGA to provide retirement, disability, or death benefits to beneficiaries or participants that are not current or former employees of such sponsor, but are in consideration of personal services performed for the sponsor.
             </Typography>
        </Paper>
            
            
        </div>
    </div>
  )
}
export default ERP;
