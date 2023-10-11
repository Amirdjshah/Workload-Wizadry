import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps as MuiAppBarProps, alpha, styled } from "@mui/material";
import { DRAWER_WIDTH as drawerWidth } from "@config/sideNavMenuConfig";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["width", "margin", "padding"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  paddingLeft: "65px",
  "@media (max-width: 600px)": {
    paddingLeft: 0,
  },
  ...(open && {
    marginLeft: drawerWidth,
    paddingLeft: "0",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin", "padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 16,
  backgroundColor: alpha(theme.palette.grey[600], 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[400], 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
