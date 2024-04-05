
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const USBranch = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div className="d-flex partParentDiv">
            <h5 className="sub_title_inner"><span className="partSpan">Part VI</span>  Certain U.S. Branches</h5>
        </div>

        <Typography color="inherit">
            19 a
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
                    <label>I certify that the entity identified in Part I is a U.S. branch of a foreign bank or insurance company described in
                    <a id="ctl00_ContentPlaceHolder1_ctl27_HyperLink1" href="javascript:OpenMore(&quot;1808e194-e06c-478c-b4f5-bd9ae08690b6&quot;);">Regulations section  1.1441-1(b)(2)(iv)(A)</a>&nbsp;
                                                that is using this form as evidence of its agreement with the withholding agent to be treated as a U.S. person with respect to any reportable amounts or withholdable payments associated with this withholding certificate.
                                            </label>
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
