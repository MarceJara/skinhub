import { createTheme } from "@mui/material/styles";

const latoFont = {
  fontFamily: "Lato, sans-serif",
  fontWeight: 600,
};

// Create a theme instance.
const theme = createTheme({
  mixins: {
    bookCover: {
      width: 85,
      height: 125,
      borderRadius: 2,
      transition: ".3s",
      backgroundSize: "cover",
      boxShadow: "0px 3px 3.4px rgba(0, 0, 0, 0.25)",
    },
  },
  palette: {
    primary: {
      main: "#387B96",
    },
    text: {
      primary: "#324B55",
    },
    btn: {
      main: "#27AAE1",
      contrastText: "#fff",
    },
  },
  components: {
    MuiSnackbarContent: {
      styleOverrides: {
        message: {
          ...latoFont,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          ...latoFont,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.lato": {
            ...latoFont,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          ...latoFont,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          ...latoFont,
        },
      },
    },
  },
  typography: {
    h3: {
      "@media (max-width: 600px)": {
        fontSize: "1.5rem",
      },
    },
    fontFamily: "Playfair Display, serif",
    button: {
      ...latoFont,
      textTransform: "inherit",
    },
  },
});

export default theme;
