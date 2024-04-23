
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const CDCSCHIV = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XIV <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Certified Deemed-Compliant Sponsored, Closely Held Investment Vehicle</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    27a
                                    <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 27a
                            </Typography>
                            
                            <a onClick={() => setToolInfo("27")}>
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
            {toolInfo === "27" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Select 27a to enter the name of the sponsoring entity that has agreed to fulfill your chapter 4 due diligence, reporting, and withholding obligations on your behalf.
On line 27a , enter the name of the sponsoring entity that has agreed to fulfill your chapter 4 due diligence, reporting, and withholding obligations on your behalf. You must also enter the GIIN of your sponsoring entity on line 9.
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

                                  
                                  <Typography className="mt-2">
                                    Name of sponsoring entity:
                                    <span className="mx-2">
                                      <FormControl>
                                        <TextField

                                          style={{
                                            backgroundColor: "#fff",


                                            fontStyle: "italic",

                                          }}
                                          
                                          onChange={props.handleChange}
                                          value={props.values.sponsoringEntity}
                                          name="sponsoringEntity"
                                        />
                                        
                                      </FormControl>
                                    </span>
                                  </Typography>
                                  </Typography>
                                </div>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    27b
                                    <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 27b
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
                        Select check box 27b if you are a sponsored, closely held investment vehicle
All sponsored, closely held investment vehicles must check box 27b to certify that you satisfy the requirements for certified deemed-compliant classification as a sponsored entity.
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
                                  
                                  <Typography>
                                    <Checkbox 
                                      onChange={props.handleChange}
                                      value={props.values.isPart1FFIinvestmententity}
                                      checked={props.values.isPart1FFIinvestmententity}
                                      name="isPart1FFIinvestmententity"
                                      size="medium"
                                      style={{ fontSize: "2rem" }} />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that the FFI identified in Part 1 :

                                  </Typography>
                                  </Typography>
                                </div>
                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    <>
                                    Is an FFI solely because it is an investment entity described in <a>Regulations section  1.1471-5(e)(4)</a>
                                     </>
                                  </Typography>

                                  <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                    <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    Is not a QI, WP, or WT;

                                    </Typography>

                                    <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                    <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    Will have all of its due diligence, withholding, and reporting responsibilities (determined as if the FFI were a participating FFI) fulfilled by the sponsoring entity identified in line 27a; and

                                    </Typography>
                                <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
                                    <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    20 or fewer individuals own all of the debt and equity interests in the entity (disregarding debt interests owned by U.S. financial institutions, participating FFIs, registered deemed-compliant FFIs, and certified deemed-compliant FFIs and equity interests owned by an entity that owns 100% of the equity interests in the FFI identified in Part I and is itself a sponsored FFI).
                                    </Typography>
                                  </Paper>
            
        </div>
    </div>
  )
}
export default CDCSCHIV;
