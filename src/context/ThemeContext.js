import React, { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
            light: "#42a5f5",
            dark: "#1565c0",
          },
          secondary: {
            main: "#e91e63",
            light: "#f48fb1",
            dark: "#c2185b",
          },
          success: {
            main: "#2e7d32",
            light: "#4caf50",
            dark: "#1b5e20",
          },
          warning: {
            main: "#ed6c02",
            light: "#ff9800",
            dark: "#e65100",
          },
          error: {
            main: "#d32f2f",
            light: "#ef5350",
            dark: "#c62828",
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                padding: "8px 16px",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                overflow: "hidden",
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow:
                  mode === "light"
                    ? "0 2px 4px rgba(0,0,0,0.08)"
                    : "0 2px 4px rgba(0,0,0,0.2)",
              },
            },
          },
        },
        shape: {
          borderRadius: 8,
        },
        typography: {
          fontFamily: ["Roboto", '"Helvetica"', "Arial", "sans-serif"].join(
            ","
          ),
          h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
            lineHeight: 1.2,
          },
          h2: {
            fontSize: "2rem",
            fontWeight: 600,
            lineHeight: 1.2,
          },
          h3: {
            fontSize: "1.75rem",
            fontWeight: 600,
            lineHeight: 1.2,
          },
          h4: {
            fontSize: "1.5rem",
            fontWeight: 600,
            lineHeight: 1.2,
          },
          h5: {
            fontSize: "1.25rem",
            fontWeight: 500,
            lineHeight: 1.3,
          },
          h6: {
            fontSize: "1.125rem",
            fontWeight: 500,
            lineHeight: 1.3,
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ theme, mode, colorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
