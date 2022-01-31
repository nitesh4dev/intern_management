import * as React from "react";

import { makeStyles, Typography, Box, Button, Modal } from "@material-ui/core";
import { DataContext } from "../Context/DataContext";

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

export default function ModalComponent({ series, dock, offload }) {
  const { open, handleClose, handleOpen } = React.useContext(DataContext);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {dock} {series} Details
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <ul>
            <li>Offloading Time: {offload} mins</li>
            <li> Idle Time: 30mins</li>
            <li> Truck-In Time: 11:00 AM</li>
            <li> Truck-Out Time: 01:15 PM</li>
          </ul>
        </Box>
      </Modal>
    </div>
  );
}
