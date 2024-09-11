// src/theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212', 
            paper: '#1e1e1e', 
        },
        text: {
            primary: '#e0e0e0', 
            secondary: '#b0b0b0', 
        },
        primary: {
            main: '#1E90FF', 
        },
        secondary: {
            main: '#03dac6', 
        },
        divider: '#333', 
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff', 
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '4px', 
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: '#444', 
                },
            },
        },
    },
});