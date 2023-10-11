import { createTheme } from "@mui/material/styles";
import { PRIMARY_COLOR } from "./cssVariables";

export const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    error: {
      main: "#e35205",
    },
    warning: {
      main: "#fdd26e",
    },
    secondary: {
      main: "#e0edee",
    },
    info: {
        main: "#008eaa"
    }
  },
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "gray",
          "&$completed": {
            color: "red",
          },
          "&$active": {
            color: "green",
          },
        },
        active: {},
        completed: {},
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: 14,
        },
        paragraph: {
          fontFamily: "sans-serif",
          fontWeight: 400,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          fontSize: 14,
          textTransform: "none",
          borderRadius: "6px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "white",
        },
        paperAnchorDockedLeft: {
          color: "white",
        },
        paperAnchorLeft: {
          backgroundColor:
            "linear-gradient(180deg, #E0EDEE 0%, rgba(224, 237, 238, 0.00) 100%)",
          color: PRIMARY_COLOR,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
});
