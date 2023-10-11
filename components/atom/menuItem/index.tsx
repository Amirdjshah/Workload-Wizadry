import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { PRIMARY_COLOR } from "@config/cssVariables";
import { useRouter } from "next/router";
import Link from "next/link";

interface IMenuItemProps {
  open: boolean;
  text: string;
  href: string;
  selected: boolean;
  Icon: React.ReactElement;
}
const MenuItem: React.FC<IMenuItemProps> = ({
  open,
  text,
  Icon,
  href,
  selected,
}) => {
  const router = useRouter();
  const { handleLogout } = useContext(AuthContext);
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      onClick={(e) => {
        if (href.includes("/login")) {
          e.preventDefault();
          handleLogout();
          return;
        }
        router.push(href);
      }}
    >
      <ListItem key={text} sx={{ display: "block" }}>
        <ListItemButton
          selected={selected}
          sx={{
            minHeight: 38,
            color: PRIMARY_COLOR,
            borderRadius: "6px",
            justifyContent: open ? "initial" : "center",
            px: 1.4,
            "& svg": {
              color: PRIMARY_COLOR,
            },
            "&.Mui-selected": {
              backgroundColor: "#004f71",
              color: "white",
            },
            "&.Mui-selected svg": {
              backgroundColor: "#004f71",
              color: "white",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#004f71",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : "auto",
              justifyContent: "center",
            }}
          >
            {React.cloneElement(Icon, { sx: { color: "white" } })}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export { MenuItem };
