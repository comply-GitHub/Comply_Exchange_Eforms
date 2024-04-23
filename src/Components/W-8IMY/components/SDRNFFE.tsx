
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const SDRNFFE = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
                                  Part XXVIII <span style={{ fontWeight: "bold", marginLeft: "10px" }}>  Sponsored Direct Reporting NFFE</span>

                                </Typography>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    41
                                    <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 41
                            </Typography>
                            
                            <a onClick={() => setToolInfo("41")}>
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
            {toolInfo === "41" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        All sponsored direct reporting NFFEs must certify that you are not a financial institution and provide the name of your sponsoring entity.
All sponsored direct reporting NFFEs must certify that you are not a financial institution and provide the name of your sponsoring entity. Provide your GIIN or, prior to January 1, 2016, the GIIN of your sponsor on line 9.
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
                                  <Typography className="mt-2" style={{ marginTop: "5px" }}>
                                    Name of sponsoring entity *:
                                    <span className="mx-2">
                                      <FormControl>
                                      <TextField 
                                        style={{
                                          backgroundColor: "#fff",
                                          fontStyle: "italic",
                                        }}
                                        onChange={props.handleChange}
                                        value={props.values.nameofDirectSponsoringEntity}
                                        name="nameofDirectSponsoringEntity"
                                        placeholder=''
                                      />
                                        
                                      </FormControl>
                                    </span>
                                  </Typography>
                                </div>
                                <div className="d-flex mt-3">
                                  <Typography className="mt-2" style={{ marginTop: "10px" }}>
                                    42
                                  </Typography>
                                  <Typography>
                                    <Checkbox 
                                      onChange={(e) => {
                                          props.handleChange(e);
                                          
                                      }}
                                      value={props.values.isadirectReportingNFFE}
                                      checked={props.values.isadirectReportingNFFE}
                                      name="isadirectReportingNFFE"
                                      size="medium"
                                      style={{ fontSize: "2rem" }}
                                    />
                                  </Typography>
                                  <Typography className="mt-2">
                                    I certify that:

                                  </Typography>
                                </div>
                                <Paper className="my-2" style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

                                  <Typography className="my-2" style={{ fontSize: "14px" }}>
                                    <>
                                    is a direct reporting NFFE that is sponsored by the entity identified in line 41.

                                    </>
                                  </Typography>
                                  </Paper>
            
        </div>
    </div>
  )
}
export default SDRNFFE;
