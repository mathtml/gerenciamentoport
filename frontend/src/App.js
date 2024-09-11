import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  TablePagination,
  Switch,
  Tooltip
} from "@mui/material";
import axios from "axios";
import CreateEmployeeModal from "./modalCreateEmployeers/index.tsx";
import EditEmployeeModal from "./modalEditEmployeers/index.tsx"; // Importar o novo modal
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./buttonTranslate/buttonTranslate.tsx";
import { format, parseISO } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { lightTheme, darkTheme } from "./theme/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./i18n";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ParentComponent = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Leitura do localStorage
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [exportRange, setExportRange] = useState(1);
  const { t, i18n } = useTranslation();

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleClickOpenEdit = employee => {
    setSelectedEmployee(employee);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedEmployee(null);
  };

  const handleEmployeeCreated = async () => {
    await fetchEmployees();
  };

  const handleEmployeeUpdated = async () => {
    await fetchEmployees();
    handleCloseEdit();
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/employees/show"
      );
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch employees");
      setLoading(false);
      toast.error(t("Failed to fetch employees"));
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    // Salvar no localStorage
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const formatDate = dateString => {
    const date = parseISO(dateString);
    return i18n.language === "en"
      ? format(date, "MM/dd/yyyy", { locale: enUS })
      : format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleThemeChange = event => {
    setIsDarkMode(event.target.checked);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/employees/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
      toast.success(t("Employee deleted successfully"));
    } catch (err) {
      console.error("Error deleting employee:", err);
      toast.error(t("Failed to delete employee"));
    }
  };

  const handleExport = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(
      startIndex + rowsPerPage * exportRange,
      employees.length
    );
    const dataToExport = employees.slice(startIndex, endIndex);

    const ws = XLSX.utils.json_to_sheet(
      dataToExport.map(employee => ({
        Name: employee.name,
        CPF: employee.cpf,
        Email: employee.email,
        "Date of Birth": formatDate(employee.dateborn),
        Location: employee.location,
        Position: employee.cargo
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "employees.xlsx"
    );
  };

  const paginatedEmployees = employees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container>
        <ToastContainer />
        <Typography variant="h4" gutterBottom>
          {t("Employee Management")}
        </Typography>
        <Stack direction="row" spacing={2} mb={2} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpenCreate}
          >
            {t("Create Employee")}
          </Button>
          <LanguageSelector />
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>{t("Dark Mode")}</Typography>
            <Switch
              checked={isDarkMode}
              onChange={handleThemeChange}
              color="primary"
            />
          </Stack>
          <Button
            variant="contained"
            onClick={handleExport}
            style={{
              backgroundColor: "#20B2AA", // Azul esverdeado
              color: "#FFFFFF" // Texto branco
            }}
          >
            {t("Export to Excel")}
          </Button>
        </Stack>
        <CreateEmployeeModal
          open={openCreate}
          handleClose={handleCloseCreate}
          onEmployeeCreated={handleEmployeeCreated}
        />
        {selectedEmployee && (
          <EditEmployeeModal
            open={openEdit}
            handleClose={handleCloseEdit}
            employeeData={selectedEmployee}
            onEmployeeUpdated={handleEmployeeUpdated}
          />
        )}
        {loading ? (
          <Typography>{t("Loading...")}</Typography>
        ) : error ? (
          <Typography color="error">{t(error)}</Typography>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>{t("Name")}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{t("CPF")}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{t("E-mail")}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{t("Date of Birth")}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{t("Location")}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{t("Position")}</strong>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <strong>{t("Actions")}</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        {t("Loading...")}
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        {t(error)}
                      </TableCell>
                    </TableRow>
                  ) : paginatedEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        {t("No employee records found")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedEmployees.map(employee => (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.cpf}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{formatDate(employee.dateborn)}</TableCell>
                        <TableCell>{employee.location}</TableCell>
                        <TableCell>{employee.cargo}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "8px"
                            }}
                          >
                            <Tooltip title={t("Edit")}>
                              <IconButton
                                onClick={() => handleClickOpenEdit(employee)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t("Delete")}>
                              <IconButton
                                onClick={() => handleDelete(employee.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={employees.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ParentComponent;
