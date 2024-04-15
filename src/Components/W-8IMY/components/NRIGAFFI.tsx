
import React, { useEffect, useState } from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { Checkbox, Divider, FormControl, FormControlLabel, Paper, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from '../../../Redux/Actions';

export {};
const NRIGAFFI = (props:any) => {
    const [toolInfo, setToolInfo] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getAllCountries())  
    },[])
    const getCountriesReducer = useSelector((state:any) => state.getCountriesReducer);
  return (
    <div style={{ padding: "10px", width: "100%" }}>
        <div>
        <Typography style={{ border: "2px solid black", color: "white", backgroundColor: "black" }}>
            Part XIX <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Nonreporting IGA FFI</span>
        </Typography>
        
        <div className="d-flex mt-3">
            <Typography className="mt-2" style={{ marginTop: "10px" }}>
                32
            </Typography>
            <Typography>
                <Checkbox 
                onChange={props.handleChange}
                value={props.values.iscertifythatNonreportingIGAFFI}
                checked={props.values.iscertifythatNonreportingIGAFFI}
                name="iscertifythatNonreportingIGAFFI"
                size="medium"
                style={{ fontSize: "2rem" }}
                />
            </Typography>
            <Typography className="mt-2">
                I certify that the entity identified in Part I:
            </Typography>
        </div>
        <Paper style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Meets the requirements to be considered a nonreporting financial institution pursuant to an IGA between the United States and
            <select
            name="iGAbetweentheUnitedStatesAnd"
            style={{
              border: " 1px solid #d9d9d9 ",
              padding: " 0 10px",
              //color: "#121112",
              fontStyle: "italic",
              height: "50px",
              width: "100%",
            }}
            value={props.values.iGAbetweentheUnitedStatesAnd}
            onBlur={props.handleBlur}
            onChange={props.handleChange}>
                <option value="">--select country--</option>
                {getCountriesReducer.allCountriesData?.map((ele:any) => (
                    <option key={ele?.id} value={ele?.id}>{ele?.name}</option>
                ))}
            </select>
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The applicable IGA is a *
            <select
            name="applicableIGA"
            style={{
              border: " 1px solid #d9d9d9 ",
              padding: " 0 10px",
              //color: "#121112",
              fontStyle: "italic",
              height: "50px",
              width: "100%",
            }}
            value={props.values.applicableIGA}
            onBlur={props.handleBlur}
            onChange={props.handleChange}>
                <option value={1}>---select---</option>
                <option value={257}>Model 1 IGA</option>
                <option value={258}>Model 2 IGA</option>
            </select> and
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Is treated as a *
            <select
            name="istreatedAs"
            style={{
              border: " 1px solid #d9d9d9 ",
              padding: " 0 10px",
              //color: "#121112",
              fontStyle: "italic",
              height: "50px",
              width: "100%",
            }}
            value={props.values.istreatedAs}
            onBlur={props.handleBlur}
            onChange={(e) => {
              props.handleChange(e);
              setTimeout(() =>{
                if(props.values.istreatedAs == 24){
                  props.setFieldValue("istreatedAsOthers","")
                }
              },200)
            }}>
                <option value="">--select--</option>
                <option value={257}>Deemed Compliant FFI</option>
                <option value={258}>Exempt Beneficial Owner</option>
                <option value={25}>Exempt Product</option>
                <option value={24}>Other</option>
            </select>
            { props.values.istreatedAs == 24 && (<>
              <TextField 
                style={{
                  backgroundColor: "#fff",
                  fontStyle: "italic",
                }}
                onChange={props.handleChange}
                value={props.values.istreatedAsOthers}
                name="istreatedAsOthers"
                placeholder='--Enter the specific entity type--'
                />
              {/* <input type='text' placeholder='to be show if other selected from above'/> */}
            </>)}
            
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            under the provisions of the applicable IGA or Treasury regulations (if applicable, see instructions);
            
            </Typography>

            <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            Are you a trustee or a sponsored entity? *
            <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="sponsoredEntityTrustee"
                            onChange={(e) => {
                              props.handleChange(e);
                              setTimeout(() => {
                                props.setFieldValue("nameoftheTrustee","");
                                props.setFieldValue("thetrusteeIs","");
                              },200)
                            }}
                            value={props.values.sponsoredEntityTrustee}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label="Trustee"
                              name="sponsoredEntityTrustee"
                              
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio />}
                              label="Sponsor"
                              name="sponsoredEntityTrustee"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio />}
                              label="Neither"
                              name="sponsoredEntityTrustee"
                            />
                          </RadioGroup>
                        </FormControl>
            </Typography>
            {/* hide and show based on radio selected */}
            {(props.values.sponsoredEntityTrustee ==1 || props.values.sponsoredEntityTrustee ==2) && (<>
              <Divider style={{ backgroundColor: "black", marginBottom: "10px" }}  />
                <Typography className="my-2" style={{ fontSize: "14px" }}>
                provide the name of the trustee or sponsor * 
                <TextField 
                style={{
                  backgroundColor: "#fff",
                  fontStyle: "italic",
                }}
                onChange={props.handleChange}
                value={props.values.nameoftheTrustee}
                name="nameoftheTrustee"
                />
                </Typography>
            </>) }
              
            { props.values.sponsoredEntityTrustee ==1 && ( <>
              <Divider style={{ backgroundColor: "black", marginBottom: "10px" }} />
            <Typography className="my-2" style={{ fontSize: "14px" }}>
            The trustee is
            <select
            name="thetrusteeIs"
            style={{
              border: " 1px solid #d9d9d9 ",
              padding: " 0 10px",
              //color: "#121112",
              fontStyle: "italic",
              height: "50px",
              width: "100%",
            }}
            value={props.values.thetrusteeIs}
            onBlur={props.handleBlur}
            onChange={props.handleChange}>
                <option value="">--select--</option>
                <option value={257}>Foriegn</option>
                <option value={258}>United States</option>
            </select>
            </Typography>
            </>)}
            
        </Paper>

        
            
            
        </div>
    </div>
  )
}
export default NRIGAFFI;
