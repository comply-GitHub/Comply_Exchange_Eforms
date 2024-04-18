
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export {};
const ENELB = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XXIII <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Excepted Nonfinancial Entity in Liquidation or Bankruptcy</span>
        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                36
                <span>
                <Tooltip
                    style={{ backgroundColor: "black", color: "white" }}
                    title={
                        <>
                            
                            <Typography color="inherit">
                            Line 36
                            </Typography>
                            
                            <a onClick={() => setToolInfo("36")}>
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
            {toolInfo === "36" ? (
                <div>
                    <Paper
                    style={{
                    backgroundColor: "#dedcb1",
                    padding: "15px",
                    marginBottom: "10px",
                    }}
                    >
                        <Typography>
                        Select check box 36 for all excepted nonfinancial group entities in liquidation or bankruptcy
All excepted nonfinancial group entities in liquidation or bankruptcy must check box 36 to certify that you satisfy the requirements for this classification. You must also provide the date that you filed a plan of liquidation, plan of reorganization, or bankruptcy petition.
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
                value={props.values.isPart1entityidentified}
                checked={props.values.isPart1entityidentified}
                name="isPart1entityidentified"
                size="medium"
                style={{ fontSize: "2rem" }}
                 />
            </Typography>
            <Typography className="mt-2">
                I certify that the entity FFI identified in Part I 
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Filed a plan of liquidation, filed a plan or reorganization, or filed for bankruptcy on the following date:
            
            <DatePicker
                    
                               className="dateclass"
                                onBlur={props.handleBlur}
                                name="planofLuquidation"
                                onChange={(date:any) => { 
                                  setTimeout(() => { 
                                    const inputDate = new Date(date);

                                  const year = inputDate.getFullYear();
                                  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
                                  const day = String(inputDate.getDate()).padStart(2, '0');

                                  const formattedDate = `${year}-${month}-${day}`;
                                    
                                    props.setFieldValue("planofLuquidation", formattedDate); }, 200)
                                }
                              }
                                
                                //maxDate={moment().toDate()}
                                value={props.values.planofLuquidation}
                                clearIcon={null}
                                format="yyyy-MM-dd"
                                dayPlaceholder="dd"
                                monthPlaceholder="mm"
                                yearPlaceholder="yy"
                              />
             </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Has not been engaged during the past 5 years in business as a financial institution or acted as a passive NFFE;

            </Typography>
        <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is either liquidating or emerging from a reorganization or bankruptcy with the intent to continue or recommence operations as a nonfinancial entity; and
            </Typography>
        
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Has provided, or will provide, documentary evidence such as a bankruptcy filing or other public documentation that supports its claim if it remains in bankruptcy or liquidation for more than 3 years.
            </Typography>
        </Paper>
            
            
        </div>
    </div>
  )
}
export default ENELB;
