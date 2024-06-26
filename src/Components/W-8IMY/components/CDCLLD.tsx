
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const CDCLLD = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XV <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Certified Deemed-Compliant Limited Life Debt Investment Entity</span>
        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                28
                <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 28
                            </Typography>
                            
                            <a onClick={() => setToolInfo("28")}>
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
            {toolInfo === "28" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Select check box if you are a limited life debt investment entity
All limited life debt investment entities must check box 28to certify that you satisfy the requirements for this certified deemed-compliant classification.
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
                onChange={props.handleChange}
                value={props.values.istrustindentureorsimilaragreement}
                checked={props.values.istrustindentureorsimilaragreement}
                name="istrustindentureorsimilaragreement"
                size="medium"
                style={{ fontSize: "2rem" }} />
            </Typography>
            <Typography className="mt-2">
                I certify that :
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            <>
                the entity FFI identified in Part I 
            </>
            
            
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Was in existence as of January 17, 2013;
             </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Issued all classes of its debt or equity interests to investors on or before January 17, 2013, pursuant to a trust indenture or similar agreement; and

            </Typography>
        <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
                Is certified deemed-compliant because it satisfies the requirements to be treated as a limited life debt investment entity (such as the restrictions with respect to its assets and other requirements under Regulations section 1.1471-5(f)(2)(iv)).
            </Typography>



        </Paper>
            
        </div>
    </div>
  )
}
export default CDCLLD;
