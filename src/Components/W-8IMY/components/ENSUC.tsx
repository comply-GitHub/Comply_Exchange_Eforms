
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';

export {};
const ENSUC = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XXII <span style={{ fontWeight: "bold", marginLeft: "10px" }}> Excepted Nonfinancial Start-Up Company</span>
        </Typography>
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                35
            </Typography>
            <Typography>
            <Checkbox 
                onChange={props.handleChange}
                value={props.values.isPart1NonfinancialIdentified}
                checked={props.values.isPart1NonfinancialIdentified}
                name="isPart1NonfinancialIdentified"
                size="medium"
                style={{ fontSize: "2rem" }}
                 />
            </Typography>
            <Typography className="mt-2">
                I certify that the entity  identified in Part I 
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Was formed on (or in the case of a new line of business, the date of board resolution approving the new line of business)
            <DatePicker
                    
                               className="dateclass"
                                onBlur={props.handleBlur}
                                name="dateofBoardresolution"
                                onChange={(date:any) => { 
                                  setTimeout(() => { 
                                    const inputDate = new Date(date);

                                  const year = inputDate.getFullYear();
                                  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
                                  const day = String(inputDate.getDate()).padStart(2, '0');

                                  const formattedDate = `${year}-${month}-${day}`;
                                    
                                    props.setFieldValue("dateofBoardresolution", formattedDate); }, 200)
                                }
                              }
                                
                                //maxDate={moment().toDate()}
                                value={props.values.dateofBoardresolution}
                                clearIcon={null}
                                format="yyyy-MM-dd"
                                dayPlaceholder="dd"
                                monthPlaceholder="mm"
                                yearPlaceholder="yy"
                              />
            (date must be less than 24 months prior to date of payment);
             </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is not yet operating a business and has no prior operating history or is investing capital in assets with the intent to operate a new line of business other than that of a financial institution or passive NFFE; and

            </Typography>
        <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Does not function (or hold itself out) as an investment fund, such as a private equity fund, venture capital fund, leveraged buyout fund, or any investment vehicle whose purpose is to acquire or fund companies and then hold interests in those companies as capital assets for investment purposes.
            </Typography>
        
            
        </Paper>
            
            
        </div>
    </div>
  )
}
export default ENSUC;
