
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const NWFP = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div className="d-flex partParentDiv">
            <h5 className="sub_title_inner"><span className="partSpan">Part VIII</span>  Nonwithholding Foreign Partnership, Simple Trust, or Grantor Trust</h5>
        </div>
        <Typography>
        Check all that apply:
        </Typography>
        <Typography color="inherit">
            21 a
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
