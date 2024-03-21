import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import Paper from '@mui/material/Paper';


import DialogContentText from '@mui/material/DialogContentText';
import React from 'react';

import {  Button, Typography } from '@mui/material';

const Form = (props:any) => {
  const { open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog open={open} keepMounted onClose={handleClose} >
        <DialogContent>
          <DialogContentText>
            <form>
              {
                <Typography
                  align="center"
                  style={{ fontSize: '23px', color: '#04506e' }}
                >
                  Forms Selection Guide
                </Typography>
              }
              

          <Paper elevation={3} style={{ padding: '17px',backgroundColor:'#d4d9d4' }}>
              <Typography
                align="center"
                className="mt-3"
                style={{ fontSize: '16px' }}
              >
                Introduction
              </Typography>
             

              <Typography
                align="left"
                className="mt-3"
                style={{ fontSize: '12px', color: '#383a3b' }}
              >
               You have selected that this submission is being made on behalf of an entity that is not considered a United States person incorporated or established under the laws of the United States for tax purposes. We now need to determine the reason for the submission, for example:
              </Typography>
              <Typography
                align="left"
                className="mt-2"
                style={{ fontSize: '12px', color: '#383a3b' }}
              >
               Do you wish to apply for reduced rates of withholding that may apply if the country of your permanent establishment has an applicable tax treaty in place with the United States?
              </Typography>
              <Typography
                align="left"
                className="mt-2"
                style={{ fontSize: '12px', color: '#383a3b' }}
              >
              Income derived effectively connected with the conduct of trade or business within the U.S.
              </Typography>
              <Typography
                align="left"
                className="mt-2"
                style={{ fontSize: '12px', color: '#383a3b' }}
              >
              
Select "Next" and you will be taken to the first of a series of questions. Depending on your response you may be asked further questions or taken to the next stage in the process.
              </Typography>
              <Typography
                align="left"
                className="mt-2"
                style={{ fontSize: '12px', color: '#383a3b' }}
              >
               Do you wish to apply for reduced rates of withholding that may apply if the country of your permanent establishment has an applicable tax treaty in place with the United States?
              </Typography>
              <Typography
                align="left"
                className="mt-2"
                style={{ fontSize: '12px', color: '#383a3b' }}
              >
               We are not allowed nor aim to provide tax advice through this process. This tool is provided to take you through a process and help you determine which form is most appropriate for you to submit.
              </Typography>
              <Typography
                align="center"
                className="mt-2"
                style={{ fontSize: '13px', color: 'black',fontWeight:"550" }}
              >
              Should you need specific help or guidance you should consult your tax advisers.
              </Typography>
             
</Paper>
              <Typography align="center" style={{ marginTop: '20px' }}>
                <Button
                  style={{ fontSize: '16px' }}
                  size="small"
                  type="submit"
                  onClick={handleClose}
                  variant="contained"
                >
                  Confirm
                </Button>
              </Typography>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Form;
