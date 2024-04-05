
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const TFI = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div className="d-flex partParentDiv">
            <h5 className="sub_title_inner"><span className="partSpan">Part V</span>  Territory Financial Institution</h5>
        </div>

        <Typography color="inherit">
            18 a
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                value={props.values.TFI18A}
                name='TFI18A'
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
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
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
                    <label>I further certify that the entity identified in Part I is using this form as evidence of its agreement with the withholding agent to be treated as a U.S. person for purposes of chapters 3 and 4 with respect to any reportable amounts and withholdable payments associated with this withholding certificate.</label>
                </Typography>
            </Typography>

            c 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
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
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
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
                                                I certify that the entity identified in Part I agrees to be treated as a U.S. person under Regulations section  1.1446(f)-4(a)(2)(i)(B)
                                                
                                                with respect to amounts realized on sales of interests in publicly traded partnerships.
                                            </label>
                </Typography>
            </Typography>

            e 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
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
                                                I certify that the entity identified in Part I agrees to be treated as a U.S. person (as described in Regulations section  1.1441-1(b)(2)(iv)(A))
                                                
                                                and as a nominee under Regulations section  1.1446-4(b)(3)
                                                
                                                with respect to distributions by publicly traded partnerships, <strong>or</strong>
                                            </label>
            </Typography>
            </Typography>

            f 
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
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
                <label>Is not acting as a nominee for distributions from publicly traded partnerships and is providing withholding statements for the distributions.
                <strong>Note:</strong> If this form is provided for an amount realized, see the instructions for Part V before providing a withholding statement for an amount realized when the entity does not check the box on line 18d.
                </label>
                </Typography>
            </Typography>


            
    </div>
  )
}
export default TFI;
