import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import Paper from '@mui/material/Paper';


import DialogContentText from '@mui/material/DialogContentText';
import React from 'react';

import {  Button, Typography } from '@mui/material';

const Formw9 = (props:any) => {
  const { open,handleClose } = props;
//   const handleClose = () => {
//     setOpen(false);
//   };
  
  

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
                  Exemption from backup withholding.
                </Typography>
              }
              

          <Paper elevation={3} style={{ padding: '17px',backgroundColor:'#d4d9d4' }}>
             

              <Typography
                align="left"
                className="mt-3"
                style={{ fontSize: '12px', color: '#383a3b' }}
              >
               Exemption from backup withholding
Persons making certain payments to you must under certain conditions withhold and pay to the IRS 24% of such payments. This is called “backup withholding.” Payments that may be subject to backup withholding include interest, tax-exempt interest, dividends, broker and barter exchange transactions, rents, royalties, nonemployee pay, payments made in settlement of payment card and third party network transactions, and certain payments from fishing boat operators. Real estate transactions are not subject to backup withholding.
You will not be subject to backup withholding on payments you receive if you give the requester your correct TIN, make the proper certifications, and report all your taxable interest and dividends on your tax return.
If you are exempt from backup withholding, you will be prompted to provide your exempt payee code. If you do not know your exempt payee code, please refer to the W-9 instructions
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
                  OK
                </Button>
              </Typography>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Formw9;
