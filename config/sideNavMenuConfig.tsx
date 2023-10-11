import HomeOutlined from "@mui/icons-material/HomeOutlined";
import UserOutlined from "@mui/icons-material/VerifiedUserOutlined";
import FilterFramesOutlinedIcon from "@mui/icons-material/FilterFramesOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import FavoriteOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import Inquiry from "@mui/icons-material/InsertDriveFileOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import ProfileIcon from "@mui/icons-material/Person2Outlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { SettingsOutlined, WorkHistoryOutlined } from "@mui/icons-material";

interface INavMenuItem {
  name: string;
  route: string;
  onClick?: () => void;
  icon: React.ReactElement;
  role: string[];
}
export const NAV_MENU_ITEM: INavMenuItem[] = [
  {
    name: "Users",
    route: "/users",
    icon: <UserOutlined />,
    role: ["SA"],
  },
  {
    name: "Dashboard",
    route: "/",
    icon: <HomeOutlined />,
    role: ["AD", "CL", "FL"],
  },
  {
    name: "Workload",
    route: "/workload",
    icon: <WorkHistoryOutlined />,
    role: ["AD","CL"],
  },
  {
    name: "Logout",
    route: "/login",
    icon: <LogoutIcon />,
    role: ["AD", "CL", "FL", "SA"],
  },
];

export const MOBILE_EXTRA_NAV_MENU_ITEM: INavMenuItem[] = [];

export const DRAWER_WIDTH = 230;
