import React, { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "dark";
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
            main: "#00bcd4",
            light: "#62efff",
            dark: "#008ba3",
            contrastText: "#fff",
          },
          secondary: {
            main: "#ff4081",
            light: "#ff79b0",
            dark: "#c60055",
            contrastText: "#fff",
          },
          background: {
            default: mode === "light" ? "#f5f7fa" : "#181c24",
            paper: mode === "light" ? "#fff" : "rgba(24,28,36,0.85)",
            glass:
              mode === "light" ? "rgba(255,255,255,0.7)" : "rgba(36,40,48,0.7)",
          },
        },
        shape: {
          borderRadius: 16,
        },
        typography: {
          fontFamily: [
            "Inter",
            "Roboto",
            '"Segoe UI"',
            "Arial",
            "sans-serif",
          ].join(","),
          h1: {
            fontSize: "2.7rem",
            fontWeight: 800,
            letterSpacing: "-1px",
          },
          h2: {
            fontSize: "2.1rem",
            fontWeight: 700,
            letterSpacing: "-0.5px",
          },
          h3: {
            fontSize: "1.7rem",
            fontWeight: 600,
          },
          h4: {
            fontSize: "1.3rem",
            fontWeight: 600,
          },
          h5: {
            fontSize: "1.1rem",
            fontWeight: 500,
          },
          h6: {
            fontSize: "1rem",
            fontWeight: 500,
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                background:
                  mode === "light"
                    ? "rgba(255,255,255,0.8)"
                    : "backdrop-filter: blur(12px); background: rgba(24,28,36,0.85)",
                boxShadow:
                  mode === "light"
                    ? "0 4px 24px 0 rgba(0,0,0,0.06)"
                    : "0 8px 32px 0 rgba(0,0,0,0.25)",
                borderRadius: 20,
                border:
                  mode === "light" ? "1px solid #e0e3e7" : "1px solid #23272f",
                backdropFilter: "blur(12px)",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                background:
                  mode === "light"
                    ? "rgba(255,255,255,0.9)"
                    : "backdrop-filter: blur(16px); background: rgba(36,40,48,0.85)",
                boxShadow:
                  mode === "light"
                    ? "0 4px 24px 0 rgba(0,0,0,0.08)"
                    : "0 8px 32px 0 rgba(0,0,0,0.32)",
                borderRadius: 24,
                border:
                  mode === "light" ? "1px solid #e0e3e7" : "1px solid #23272f",
                backdropFilter: "blur(16px)",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                padding: "10px 24px",
                boxShadow: "0 2px 8px 0 rgba(0,188,212,0.08)",
                transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
                color: mode === "light" ? "#181c24" : "#fff",
                "&:hover": {
                  boxShadow: "0 4px 16px 0 rgba(0,188,212,0.16)",
                  background: mode === "light" ? "#e0f7fa" : "#23272f",
                },
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                background: mode === "light" ? "#f5f7fa" : "#23272f",
                padding: "6px 12px",
                color: mode === "light" ? "#181c24" : "#fff",
              },
              input: {
                fontSize: "1rem",
                fontWeight: 500,
                color: mode === "light" ? "#181c24" : "#fff",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                background: mode === "light" ? "#f5f7fa" : "#23272f",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00bcd4",
                },
              },
              notchedOutline: {
                borderColor: mode === "light" ? "#e0e3e7" : "#23272f",
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "0.95rem",
                background: mode === "light" ? "#e0f7fa" : "#23272f",
                color: mode === "light" ? "#008ba3" : "#00bcd4",
              },
            },
          },
          MuiTabs: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                minHeight: 48,
              },
              indicator: {
                height: 4,
                borderRadius: 4,
                backgroundColor: "#00bcd4",
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                minHeight: 48,
                fontWeight: 600,
                fontSize: "1rem",
                "&.Mui-selected": {
                  color: "#00bcd4",
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                boxShadow:
                  mode === "light"
                    ? "0 2px 8px rgba(0,0,0,0.06)"
                    : "0 2px 8px rgba(0,0,0,0.24)",
                background:
                  mode === "light"
                    ? "rgba(255,255,255,0.98)"
                    : "rgba(24,28,36,0.98)",
                backdropFilter: "blur(8px)",
                borderBottom:
                  mode === "light" ? "1px solid #e0e3e7" : "1px solid #23272f",
              },
            },
          },
          MuiToolbar: {
            styleOverrides: {
              root: {
                color: mode === "light" ? "#181c24" : "#fff",
                minHeight: 64,
                fontWeight: 600,
              },
            },
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
