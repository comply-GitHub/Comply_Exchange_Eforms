
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const RD = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XVII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Restricted Distributor</span>
        </Typography>
        
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                30a
            </Typography>
            <Typography>
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    // setTimeout(() => {
                    //     props.setFieldValue("hasbeenboundbyTerminatedAgreement", false)
                    // },200)
                }}
                value={props.values.isrequiredtoperformAML}
                checked={props.values.isrequiredtoperformAML}
                name="isrequiredtoperformAML"
                size="medium"
                style={{ fontSize: "2rem" }}
            />
            </Typography>
            <Typography className="mt-2">
            (All restricted distributors check here) I certify that the entity identified in Part I:
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Operates as a distributor with respect to debt or equity interests of the restricted fund with respect to which this form is furnished;             </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Provides investment services to at least 30 customers unrelated to each other and less than half of its customers are related to each other;

            </Typography>
        <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is required to perform AML due diligence procedures under the anti-money laundering laws of its country of organization (which is a FATF-compliant jurisdiction);
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Operates solely in its country of incorporation or organization, has no fixed place of business outside of that country, and has the same country of incorporation or organization as all members of its affiliated group, if any;
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Does not solicit customers outside its country of incorporation or organization;
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Has no more than $175 million in total assets under management and no more than $7 million in gross revenue on its income statement for the most recent accounting year;
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is not a member of an expanded affiliated group that has more than $500 million in total assets under management or more than $20 million in gross revenue for its most recent accounting year on a combined or consolidated income statement; and
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Does not distribute any debt or securities of the restricted fund to specified U.S. persons, passive NFFEs with one or more substantial U.S. owners, or nonparticipating FFIs.
            </Typography>
        </Paper>

        <Typography className="mt-2" style={{ marginTop: "10px" }}>
        <strong>Check the box on line 30b or 30c, whichever applies.</strong>
        </Typography>
        <Typography className="mt-2" style={{ marginTop: "10px" }}>
        I further certify that with respect to all sales of debt or equity interests in the restricted fund with respect to which this form is furnished that are made after December 31, 2011, the entity identified in Part I:

        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                30b
            </Typography>
            <Typography>
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("isprohibitiononthesaleofDebt", false)
                    },200)
                }}
                value={props.values.hasbeenboundbyTerminatedAgreement}
                checked={props.values.hasbeenboundbyTerminatedAgreement}
                name="hasbeenboundbyTerminatedAgreement"
                size="medium"
                style={{ fontSize: "2rem" }}
            />
            </Typography>
            <Typography className="mt-2">
            Has been bound by a distribution agreement that
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            contained a general prohibition on the sale of debt or securities to U.S. entities and U.S. resident individuals and is currently bound by a distribution agreement that contains a prohibition of the sale of debt or securities to any specified U.S. person, passive NFFE with one or more substantial U.S. owners, or nonparticipating FFI.
             </Typography>

        </Paper>
        
            <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                30c
            </Typography>
            <Typography>
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("hasbeenboundbyTerminatedAgreement", false)
                    },200)
                }}
                value={props.values.isprohibitiononthesaleofDebt}
                checked={props.values.isprohibitiononthesaleofDebt}
                name="isprohibitiononthesaleofDebt"
                size="medium"
                style={{ fontSize: "2rem" }}
            />
            </Typography>
            <Typography className="mt-2">
                Is currently bound by
            </Typography>
             </div>
            <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            a distribution agreement that contains a prohibition on the sale of debt or securities to any specified U.S. person, passive NFFE with one or more substantial U.S. owners, or nonparticipating FFI and, for all sales made prior to the time that such a restriction was included in its distribution agreement, has reviewed all accounts related to such sales in accordance with the procedures identified in Regulations section 1.1471-4(c) applicable to preexisting accounts and has redeemed or retired any securities which were sold to specified U.S. persons, passive NFFEs with one or more substantial U.S. owners, or nonparticipating FFIs, or will transfer the securities to a distributor that is a participating FFI, reporting Model 1 FFI, or reporting Model 2 FFI.
             </Typography>
        </Paper>
            
        </div>
    </div>
  )
}
export default RD;
