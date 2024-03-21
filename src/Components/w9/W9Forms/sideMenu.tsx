import React from "react";
import { FormControl, Typography, Button, Input, Paper,Accordion ,AccordionSummary,AccordionDetails} from '@mui/material';
import {ExpandMore,Info} from '@mui/icons-material';

export default function Sidebar(props:any){
return(
    <div className="col-4 col-md-3">
    <Paper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Step 1</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Name and Address
          </Typography>
        </AccordionDetails>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Account Information(Optional)
          </Typography>
        </AccordionDetails>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Tax Identification Number
          </Typography>
        </AccordionDetails>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Contact Details
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Step 2</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Federal Tax
          </Typography>
        </AccordionDetails>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Exemption from Backup Withholding
          </Typography>
        </AccordionDetails>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Exemption from FATCA reporting
          </Typography>
        </AccordionDetails>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Tax Identification Number
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Step 3</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Supporting Documentation
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Step 4</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Penalties of Perjury Certification
          </Typography>
        </AccordionDetails>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Exemption from Backup Withholding
          </Typography>
        </AccordionDetails>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            Electronic Signature
          </Typography>
        </AccordionDetails>
        <AccordionDetails style={{ backgroundColor: '#e3e4e6' }}>
          <Typography align="left" style={{ fontSize: '12px' }}>
            U.S. Tax Certification Complete
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Paper>
  </div>
)
}