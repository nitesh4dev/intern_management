import { createTheme } from "@material-ui/core/styles";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#FA2609",
    },
  },
  typography: {
    fontFamily: "'Poppins',sans-serif",
    h1: {
      fontSize: "28px",
      color: "#333333",
      fontWeight: "600",
    },
    h2: {
      fontSize: "24px",
      fontWeight: "500",
    },
    h3: {
      fontSize: "20px",
      fontWeight: "500",
    },
    h4: {
      fontSize: "22px",
      fontWeight: "600",
    },
    subtitle1: {
      fontSize: "20px",
      fontWeight: "400",
    },
    subtitle2: {
      fontSize: "17px",
      fontWeight: "400",
    },
    body1: {
      fontSize: "15px",
    },
    body2: {
      fontSize: "12px",
    },
    button: {
      textTransform: "none",
    },
  },
});
