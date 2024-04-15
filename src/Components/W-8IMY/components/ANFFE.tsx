
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const ANFEE = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
            <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                Part XXVI <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Active NFFE </span>
            </Typography>
            <div className="d-flex mt-3">
                <Typography className="mt-2" style={{ marginTop: "10px" }}>
                39
                </Typography>
                <Typography>
                <Checkbox 
                onChange={props.handleChange}
                value={props.values.lessthan50perentitygrossincome}
                checked={props.values.lessthan50perentitygrossincome}
                name="lessthan50perentitygrossincome"
                size="medium"
                style={{ fontSize: "2rem" }} />
                </Typography>
                <Typography className="mt-2">
                I certify that :
                </Typography>
            </div>
            <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                <Typography className="my-2" style={{ fontSize: "14px" }}>
                The entity identified in Part I is a foreign entity that is not a financial institution;
                </Typography>

                <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                <Typography className="my-2" style={{ fontSize: "14px" }}>
                Less than 50% of such entity's gross income for the preceding calendar year is passive income; <span style={{ fontWeight: "bold" }}>
                    and</span>
                </Typography>
                <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                <Typography className="my-2" style={{ fontSize: "14px" }}>
                Less than 50% of the assets held by such entity are assets that produce or are held for the production of passive income (calculated as a weighted average of the percentage of passive assets measured quarterly) (see instructions for the definition of passive income)
                </Typography>
            </Paper>
        </div>
    </div>
  )
}
export default ANFEE;
