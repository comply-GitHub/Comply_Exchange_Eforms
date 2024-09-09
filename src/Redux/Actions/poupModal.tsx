import * as React from 'react';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Index(props:any) {
    const {data, setPopupState} = props;
    console.log("popupModal data:", data)
  const handleClose = () => {
    setPopupState({
        data:"",
        status:false,
    })
  };

  return (
    <React.Fragment>
      
      <Modal
        open={data?.status}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <>
        <Box sx={{ ...style, width: "99%" , height:'96%'}}>
        <iframe width='100%' height='96%' src={`${data?.data}`}></iframe>
        <Typography  style={{justifyContent:"center",display:"flex",marginTop:"6px"}}>
        <Button  variant="contained" onClick={handleClose}>Back</Button>
        </Typography>
        </Box>
       
        </>
      </Modal>
    </React.Fragment>
  );
}