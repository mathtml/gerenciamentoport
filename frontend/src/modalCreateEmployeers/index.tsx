import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from "@mui/material";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const CreateEmployeeModal = ({ open, handleClose, onEmployeeCreated }) => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [dateborn, setDateborn] = useState("");
  const [location, setLocation] = useState("");
  const [cargo, setCargo] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees/create",
        {
          name,
          cpf,
          email,
          dateborn,
          location,
          cargo
        }
      );

      if (response.status === 201) {
        console.log("Employee created successfully");
        toast.success(t("Employee created successfully!"));
        setSuccess(true);
        setError(null);
        setName("");
        setCpf("");
        setEmail("");
        setDateborn("");
        setLocation("");
        setCargo("");

        if (onEmployeeCreated) {
          await onEmployeeCreated();
        }

        handleClose();
      }
    } catch (err) {
      console.error("Error creating employee:", err);
      toast.error(t("Failed to create employee"));
      setSuccess(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("Create Employee")}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <br />
          <Stack spacing={2}>
            <TextField
              fullWidth
              label={t("Name")}
              variant="outlined"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={t("CPF")}
              variant="outlined"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={t("E-mail")}
              type="email"
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={t("Date of Birth")}
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={dateborn}
              onChange={e => setDateborn(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={t("Location")}
              variant="outlined"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={t("Position")}
              variant="outlined"
              value={cargo}
              onChange={e => setCargo(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              {t("Create Employee")}
            </Button>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "red",
            color: "white"
          }}
        >
          {t("Close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEmployeeModal;
