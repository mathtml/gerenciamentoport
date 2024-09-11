import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import { t } from "i18next";
import { toast } from "react-toastify";

const EditEmployeeModal = ({ open, handleClose, employeeData, onEmployeeUpdated }) => {
  const [formData, setFormData] = useState(employeeData);

  useEffect(() => {
    setFormData(employeeData);
  }, [employeeData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async e => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      await axios.put(
        `http://localhost:5000/api/employees/edit/${formData.id}`,
        formData
      );
      toast.success(t("Employee edited successfully!"));
      handleClose(); // Fechar o modal
      if (onEmployeeUpdated) onEmployeeUpdated(); // Chama a função onEmployeeUpdated, se fornecida
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Error updating employee. Please try again."); // Mostra uma mensagem de erro
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("Edit Employee")}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <br />
          <Stack spacing={2}>
            <TextField
              fullWidth
              label={t("Name")}
              variant="outlined"
              value={formData.name || ""}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label={t("CPF")}
              variant="outlined"
              value={formData.cpf || ""}
              onChange={e => setFormData({ ...formData, cpf: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label={t("E-mail")}
              type="email"
              variant="outlined"
              value={formData.email || ""}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              label={t("Date of Birth")}
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={formData.dateborn || ""}
              onChange={e =>
                setFormData({ ...formData, dateborn: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              label={t("Location")}
              variant="outlined"
              value={formData.location || ""}
              onChange={e =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              label={t("Position")}
              variant="outlined"
              value={formData.cargo || ""}
              onChange={e =>
                setFormData({ ...formData, cargo: e.target.value })
              }
              required
            />
            <Button type="submit" variant="contained" color="primary">
              {t("Update Employee")}
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
          {t("Cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeModal;
