import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React from 'react'

function AddCarREgistration(props:any) {
    const {open,setOpen,handleClose,carNo,setCarNo,parkingTime,setParkingTime,handleNewCar}=props
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <div>Add New Car</div>
      Car No:<TextField id='parking-drawing-registration-input' value={carNo} onChange={(e:any)=>setCarNo(e.target.value)}/>
      Parking Time:<TextField type='time' value={parkingTime} onChange={(e:any)=>setParkingTime(e.target.value)} />
      <Button id='parking-drawing-add-car-button' onClick={()=>{handleNewCar();handleClose()}}>Allocate Space</Button>
    </Box>
  </Modal>
  )
}

export default AddCarREgistration