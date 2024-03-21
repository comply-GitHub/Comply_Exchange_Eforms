import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import DialogContentText from '@mui/material/DialogContentText';
import React from 'react';

import {  Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Form = (props:any) => {
  const { open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
const history=useNavigate()
  return (
    <Fragment>
    
           <section className="inner_content" style={{ backgroundColor: '#0c3d69', marginBottom: '10px' }}>



<div className="container-fluid">


    <div className="col-lg-12 mt-20" style={{ padding: "18px"}}>
    <Paper elevation={6} style={{ padding: '17px' ,marginTop:"20px",}}>
           
                <Typography
                  align="left"
                  style={{ fontSize: '23px', color: '#04506e',fontWeight:"bold" }}
                >
                  Forms Selection Guide
                </Typography>
              
              

                <Paper elevation={3} style={{ padding: '17px',backgroundColor:'#d4d9d4' }}>
              <Typography
                align="center"
                className="mt-3"
                style={{ fontSize: '25px',fontWeight:"bold" }}
              >
                Introduction
              </Typography>
             

              <Typography
                align="left"
                className="mt-3"
                style={{ fontSize: '16px', color: '#383a3b' }}
              >
               You have selected that this submission is being made on behalf of an entity that is not considered a United States person incorporated or established under the laws of the United States for tax purposes. We now need to determine the reason for the submission, for example:
              </Typography>
              <Typography
                align="left"
                className="mt-3"
                style={{ fontSize: '16px', color: '#383a3b' }}
              >
               Do you wish to apply for reduced rates of withholding that may apply if the country of your permanent establishment has an applicable tax treaty in place with the United States?
              </Typography>
              <Typography
                align="left"
                className="mt-3"
                style={{ fontSize: '16px', color: '#383a3b' }}
              >
             Are you applying for an exemption from U.S. tax obligations? Or is the
              </Typography>
              <Typography
                align="left"
                className="mt-3"
                style={{ fontSize: '16px', color: '#383a3b' }}
              >
              
              Income derived effectively connected with the conduct of trade or business within the U.S.?
 
              </Typography>
              <Typography
                align="left"
                className="mt-3"
                style={{ fontSize: '16px', color: '#383a3b' }}
              >
              Select "Confirm" and you will be taken to the first of a series of questions. Depending on your response you may be asked further questions or taken to the next stage in the process.
 
              </Typography>
              <Typography
                align="left"
                className="mt-3"
                style={{ fontSize: '16px', color: '#383a3b' }}
              >
               We are not allowed nor aim to provide tax advice through this process. This tool is provided to take you through a process and help you determine which form is most appropriate for you to submit.
              </Typography>
              <Typography
                align="center"
                className="my-4"
                style={{ fontSize: '16px', color: 'black',fontWeight:"550" }}
              >
              Should you need specific help or guidance you should consult your tax advisers.
              </Typography>
             
</Paper>
              <Typography align="center" style={{ marginTop: '3rem' }}>
                <Button
                  style={{ fontSize: '14px' }}
                  size="small"
                  type="submit"
                  onClick={()=>{
                    history("/Guide")
                  }}
                  variant="contained"
                >
                  Confirm
                </Button>
              </Typography>
              <Typography
          align="center"
          style={{
            color: "#adadac",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          Do you want to go back?
        </Typography>
        <Typography align="center">
        <Button onClick={()=>{
          history("/Certificates")
        }}  variant="contained" size="small" style={{ color: "white", backgroundColor: "black", marginTop: "10px" ,marginBottom:'20px'}}>
         Back
        </Button>
        </Typography>
       
            </Paper>
            </div>
            </div>

</section>
         
    </Fragment>
  );
};

export default Form;
