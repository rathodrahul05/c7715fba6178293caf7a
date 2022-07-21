import { Button, TableContainer, TextField } from "@mui/material";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCarREgistration from "./AddCarREgistration";
import ParkingCharge from "./ParkingCharge";
import moment from "moment";
import { start } from "repl";
import { toast } from "react-toastify";
import axios from "axios";

function ParkingSpace() {
  const [spaceNo, setSpaceNo] = useState(0);
  const [slots, setSlots] = useState<any>([]);
  const [parkedCars, setParkedCars] = useState<any>([]);
  const [slotNo, setSlotNo] = useState("");

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [carNo, setCarNo] = useState("");
  const [parkingTime, setParkingTime] = useState("");

  const [carInfo, setCarInfo] = useState<any>(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const drawParkingSpace = () => {
    let temp = [];
    for (let index = 1; index <= spaceNo; index++) {
      temp.push({
        slotNo: Math.floor(Math.random() * 200),
        isAvailable: 1,
      });
    }
    setSlots(temp);
  };

  const calculateCharge = (t: any) => {
    if (t === 2) {
      return 10;
    } else if (t < 2) {
      return (t * 10) / 2;
    } else {
      let temp = t - 2;
      let min = temp * 60;
      let minCharge = 0.1667 * min;
      let totalCharge = 10 + minCharge;
      return totalCharge;
    }
  };
  const handleNewCar = () => {
    let totalTimeTaken;
    const startTime = moment(parkingTime, "HH:mm:ss a");
    const endTime = moment(moment(Date.now()).format("LT"), "HH:mm:ss a");
    const duration: any = moment.duration(endTime.diff(startTime));
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) % 60;

    totalTimeTaken = hours + minutes / 60;

    let temp = slots.filter((slot: any) => {
      return slot.isAvailable === 1;
    });
    if (temp.length > 0) {
      toast.success("Parking Alloted", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      let temp1 = temp.find((slot: any) => {
        return slot;
      });

      setParkedCars([
        ...parkedCars,
        {
          slotNo: temp1.slotNo,
          carNo,
          parkingTime,
          totalTime: totalTimeTaken,
          parkingCharge: calculateCharge(totalTimeTaken),
        },
      ]);
      setSlots(
        slots.map((slot: any) => {
          if (slot.slotNo == temp1.slotNo) {
            return { ...slot, isAvailable: 0 };
          } else {
            return slot;
          }
        })
      );
    } else {
      toast.error("Parking Full", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const calculateTime = (slotNo: any) => {
    let a = parkedCars.find((car: any) => car.slotNo == slotNo);
    const startTime = moment(a?.parkingTime, "HH:mm:ss a");
    const endTime = moment(moment(Date.now()).format("LT"), "HH:mm:ss a");
    const duration: any = moment.duration(endTime.diff(startTime));
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) % 60;

    setCarInfo({
      ...a,
      totalTime: hours + minutes / 60,
      parkingCharge: calculateCharge(hours + minutes / 60),
    });
  };

  const makePayment = async () => {
    const postData = {
      "car-registration": carInfo?.carNo,
      charge: carInfo?.parkingCharge,
    };

    let response = await axios.post(`https://httpstat.us/200`, postData);
    setSlots(
      slots.map((slot: any) => {
        if (slot.slotNo == slotNo) {
          return { ...slot, isAvailable: 1 };
        } else {
          return slot;
        }
      })
    );
  };
  return (
    <div>
      <h1>Parking Lot</h1>
      <TextField
        id="parking-create-text-input"
        value={spaceNo}
        onChange={(e: any) => setSpaceNo(e.target.value)}
      />
      <Button id="parking-create-submit-button" onClick={drawParkingSpace}>
        Submit
      </Button>
      {slots.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">S.No</TableCell>
                  <TableCell align="center">Slot No</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slots.map((row: any, index: any) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell
                      align="center"
                      id={
                        row.isAvailable == 1
                          ? `parking-drawing-space-${row.slotNo}`
                          : `parking-drawing-registered-${row.slotNo}`
                      }
                    >
                      <Button
                        onClick={() => {
                          setOpenModal(true);
                          setSlotNo(row.slotNo);
                          calculateTime(row.slotNo);
                        }}
                        color={row.isAvailable ? "success" : "error"}
                      >
                        {row.slotNo}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add New Car
          </Button>
        </>
      )}
      <AddCarREgistration
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        carNo={carNo}
        setCarNo={setCarNo}
        parkingTime={parkingTime}
        setParkingTime={setParkingTime}
        handleNewCar={handleNewCar}
      />
      <ParkingCharge
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        carInfo={carInfo}
        makePayment={makePayment}
      />
    </div>
  );
}

export default ParkingSpace;
