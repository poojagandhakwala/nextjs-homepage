import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // light: "#64b5f6",
      main: "#1976d2", 
    //   dark: "#0d47a1",
      contrastText: "#fff",
    },
    secondary: {
      // light: "#f0ecec",
      main: "#f0ecec",
      // dark: "#ba000d",
      contrastText: "#1976d2",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
