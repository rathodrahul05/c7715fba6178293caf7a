import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

function ParkingCharge(props: any) {
  const { openModal, handleCloseModal, carInfo, makePayment } = props;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>Parking Charge</div>
         <p id="deregister-time-spent"> Total Time:{carInfo?.totalTime}</p>
          <br />
         <p id="deregister-charge">
         ParkingCharge:{carInfo?.parkingCharge}
             </p> 
          <br />
          <Button id="deregister-payment-button" onClick={() => {makePayment();handleCloseModal()}}>Payment Taken</Button>
          <Button id="deregister-back-button" onClick={() => handleCloseModal()}>Close</Button>
        </Box>
      </Modal>
    </>
  );
}

export default ParkingCharge;
