
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const WFP = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div className="d-flex partParentDiv">
            <h5 className="sub_title_inner"><span className="partSpan">Part VII</span> Withholding Foreign Partnership (WP) or Withholding Foreign Trust (WT)</h5>
        </div>

        <Typography color="inherit">
            20
            <Typography style={{ display: "flex" }}>
                <Checkbox
                className="mx-2"
                value={props.values.isPart1WPorWTagreement}
                checked={props.values.isPart1WPorWTagreement}
                name="isPart1WPorWTagreement"
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
                                            <label>I certify that the entity identified in Part I is a withholding foreign partnership or a withholding foreign trust that is compliant with the terms of its WP or WT agreement</label>
                                        </li>
                                    </ul>
                                </div>
                </Typography>
            </Typography>
            </Typography>
           
    </div>
  )
}
export default WFP;
