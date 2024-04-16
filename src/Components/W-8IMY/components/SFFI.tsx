
import React, { useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export {};
const SFFI = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");

  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part X <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Sponsored FFI</span>
        </Typography>
        
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                23a
            </Typography>
            <Typography>
            <TextField 
                style={{
                  backgroundColor: "#fff",
                  fontStyle: "italic",
                }}
                onChange={props.handleChange}
                value={props.values.nameofSponsoringEntity}
                name="nameofSponsoringEntity"
                placeholder=''
                />
            </Typography>
            
        </div>
        

        <Typography className="mt-2" style={{ marginTop: "10px" }}>
        <strong>Check the box on line 23b or 23c, whichever applies.</strong>
        </Typography>
        
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                23b
            </Typography>
            <Typography>
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("IswhollyownedDirectlyIndirectlybytheUS", false)
                    },200)
                }}
                value={props.values.hasagreedwiththeNonparticipatingFFI}
                checked={props.values.hasagreedwiththeNonparticipatingFFI}
                name="hasagreedwiththeNonparticipatingFFI"
                size="medium"
                style={{ fontSize: "2rem" }}
            />
            </Typography>
            <Typography className="mt-2">
            I certify that the entity indentified in Part I:
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
                Is an investment entity;
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
                Is not a QI, WP (except to the extent permitted in the withholding foreign partnership agreement), or WT; and
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
                Has agreed with the entity identified above (that is not a nonparticipating FFI) to act as the sponsoring entity for this entity.
            </Typography>
            

        </Paper>
        
            <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                23c
            </Typography>
            <Typography>
            <Checkbox 
                onChange={(e) => {
                    props.handleChange(e);
                    setTimeout(() => {
                        props.setFieldValue("hasagreedwiththeNonparticipatingFFI", false)
                    },200)
                }}
                value={props.values.IswhollyownedDirectlyIndirectlybytheUS}
                checked={props.values.IswhollyownedDirectlyIndirectlybytheUS}
                name="IswhollyownedDirectlyIndirectlybytheUS"
                size="medium"
                style={{ fontSize: "2rem" }}
            />
            </Typography>
            <Typography className="mt-2">
            I certify that the entity indentified in Part I:
            </Typography>
             </div>
            <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is a controlled foreign corporation as defined in  section 957(a)
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is not a QI, WP, or WT;
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is wholly owned, directly or indirectly, by the U.S. financial institution identified above that agrees to act as the sponsoring entity for this entity; and
            </Typography>
            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Shares a common electronic account system with the sponsoring entity (identified above) that enables the sponsoring entity to identify all account holders and payees of the entity and to access all account and customer information maintained by the entity including, but not limited to, customer identification information, customer documentation, account balance, and all payments made to account holders or payees.
            </Typography>
                
            </Paper>
            
        </div>
    </div>
  )
}
export default SFFI;
