import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { fetchCameras } from "./store";
import { useDispatch } from "react-redux";
import { BorderLeftRounded } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 8,
};

export default function BasicModal({ rowSelectionModel,getData , setCamerasData,camerasData}) {
  const [open, setOpen] = React.useState(false);
  const dispatch=useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const payload = {
    id: parseInt(rowSelectionModel.id),
    status: rowSelectionModel.status=="Active"?"Inactive":"Active",
  };
  console.log(payload)
  const updateRowStatus = async () => {
    await fetch(
      "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy ",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((resp) => resp.json())
      .then((json) => console.log(json));
      dispatch(fetchCameras());
      setOpen(false);
  };
  const deleteRow=()=>{
    setCamerasData(camerasData.filter((param)=>param.id!==payload.id))
    setOpen(false);
  }
  return (
    <div>
      <Button variant="contained" sx={{ marginLeft: 4 }} onClick={handleOpen}>
        Edit
      </Button>
      <Modal
      
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ display:"flex",justifyContent:"space-around" }}>
            <Button onClick={updateRowStatus} variant="contained">
              Update Status
            </Button>
            <Button onClick={deleteRow} variant="contained">
              Delete
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
