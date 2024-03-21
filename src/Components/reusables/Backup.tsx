import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
// import { useState } from 'react';

import DialogContent from '@mui/material/DialogContent';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DialogContentText from '@mui/material/DialogContentText';
import React from 'react';

import {  Button, Typography } from '@mui/material';



const Backup =( props:any) => {
  const { open, handleClose } = props;
//   const handleClose = () => {
//     setOpen(false);
//   };
  
  

  return (
    <Fragment>
      <Dialog open={open} keepMounted onClose={handleClose}  style={{ maxWidth: '1015px', margin: '0 auto' }} >
        <DialogContent>
       
          <DialogContentText>
            <form>
              {
                <Typography
                  align="center"
                  style={{ fontSize: '23px', color: '#04506e',fontWeight:"550" }}
                >
                  Exemption from Backup Withholding Guide
                </Typography>
              }
              

         
             

          <div>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Overview
          </Typography>
         
        </AccordionSummary>
        <AccordionDetails >
          <Typography    style={{fontSize:"12px",marginTop:"10px"}}>
Businesses that pay certain kinds of income must file an information return Form 1099 with the IRS. Payments generally are not subject to any withholding imposed by the IRS. However, "backup" withholding is required in certain situations and can apply to most kinds of payments that are reported on Form 1099.
These payment types include:
  
<Typography   style={{fontSize:"12px",marginTop:"10px"}}> 1.Interest payments</Typography>
<Typography   style={{fontSize:"12px",marginTop:"10px"}}> 2.Dividends</Typography>
 <Typography   style={{fontSize:"12px",marginTop:"10px"}}>3.Patronage dividends, but only if at least half of the payment is in money</Typography>
 <Typography    style={{fontSize:"12px",marginTop:"10px"}}>4.Rents, profits, or other gains</Typography>
<Typography   style={{fontSize:"12px",marginTop:"10px"}}>5.Commissions, fees, or other payments for work you do as an independent contractor</Typography>
 <Typography   style={{fontSize:"12px",marginTop:"10px"}}>6.Payments by brokers</Typography>
<Typography    style={{fontSize:"12px",marginTop:"10px"}}> 7.Royalty payments, and</Typography>
<Typography   style={{fontSize:"12px",marginTop:"10px"}}>8.Certain other payments <span style={{fontSize:"14px",color:"blue"}}> (For a full breakdown see IRS Publication 505)</span></Typography>
</Typography >
<Typography style={{fontWeight:'550',fontSize:"12px"}}>Select the payment type you may receive and you will be shown a list codes that may apply, on selection you will be able to move forward through the process.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Interest and Dividend Payments</Typography>
         
        </AccordionSummary>
        <AccordionDetails>
          <Typography    style={{fontSize:"12px",marginTop:"10px"}}>
            <span>
                <Checkbox />
            </span>
          An organization exempt from tax under section 501(a), any IRA, or a custodial account under section 403(b)(7) if the account satisfies the requirements of section 401(f)(2)
          </Typography>
          <Typography   style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
          The United States or any of its agencies or instrumentalities
          </Typography>
          <Typography     style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
          A state, the District of Columbia, a possession of the United States, or any of their political subdivisions or instrumentalities
          </Typography>
          <Typography    style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
          A foreign government or any of its political subdivisions, agencies, or instrumentalities
          </Typography>
          <Typography    style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
            A dealer in securities or commodities required to register in the United States, the District of Columbia, or a possession of the United States
          </Typography>
          <Typography     style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
            A real estate investment trust
          </Typography>
          <Typography     style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
            An entity registered at all times during the tax year under the Investment Company Act of 1940
          </Typography>
          <Typography     style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
            A common trust fund operated by a bank under section 584(a)
          </Typography>
          <Typography  style={{fontSize:"12px",marginTop:"10px"}} >
          <span>
                <Checkbox />
            </span>
            A financial institution
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Broker Transaction
          </Typography>
         
        </AccordionSummary>
        <AccordionDetails>
        <Typography style={{fontSize:"12px",marginTop:"10px"}} >
          <span>
                <Checkbox />
            </span>
            An organization exempt from tax under section 501(a), any IRA, or a custodial account under section 403(b)(7) if the account satisfies the requirements of section 401(f)(2)
          </Typography>
          <Typography  style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
            The United States or any of its agencies or instrumentalities
          </Typography>
          <Typography style={{fontSize:"12px",marginTop:"10px"}} >
          <span>
                <Checkbox />
            </span>
            A state, the District of Columbia, a possession of the United States, or any of their political subdivisions or instrumentalities
          </Typography>
          <Typography  style={{fontSize:"12px",marginTop:"10px"}}>
          <span>
                <Checkbox />
            </span>
            A foreign government or any of its political subdivisions, agencies, or instrumentalities
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Don't Know</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography     style={{fontSize:"12px",marginTop:"10px"}}>
           	
If you are not able to make a selection from the income types and exemption codes provided please click "Confirm" to continue through the process.
          </Typography>
          <Typography     style={{fontSize:"12px",marginTop:"10px"}}>
           	
          Continuing without making a selection will mean we may not be able to apply an exemption and may need to contact you for further information or apply backup withholding.

          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
             
             

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

export default Backup;
