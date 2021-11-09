import React, { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import RegistrationForm from "../form/RegistrationForm";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgba(17,18,18,0.9)",
  color: "#fff",
  boxShadow: 24,
  p: 4,
};

const ModalWindow: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async () => {
    await sleep(300);
    window.alert("Create user");
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Registration
          </Typography>
          <RegistrationForm onSubmit={onSubmit} />
        </Box>
      </Modal>
    </>
  );
};

export default ModalWindow;
