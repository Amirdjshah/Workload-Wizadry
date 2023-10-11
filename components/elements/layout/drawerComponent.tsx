"use client";

import {
  Divider,
  Hidden,
  IconButton,
  List,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DrawerHeader } from "./styled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./style.module.scss";
import { Logo, MenuItem, MenuLogo } from "../../atom";
import {
  DRAWER_WIDTH,
  MOBILE_EXTRA_NAV_MENU_ITEM,
  NAV_MENU_ITEM,
} from "@config/sideNavMenuConfig";
import { useRouter } from "next/router";
import { PRIMARY_COLOR } from "@config/cssVariables";
import { useEffect, useState } from "react";

interface IDrawerChildrenProps {
  handleDrawerClose: () => void;
  open: boolean;
}
const DrawerChildren: React.FC<IDrawerChildrenProps> = ({
  handleDrawerClose,
  open,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const theme = useTheme();
  const router = useRouter();
  const isMobileView = useMediaQuery("(max-width: 600px)");

  let role_id: any = null;
  if (typeof window !== "undefined") {
    role_id = window?.localStorage?.getItem("role_code");
  }

  return (
    <div style={{ width: DRAWER_WIDTH }}>
      <DrawerHeader style={{ minHeight: "98px", justifyContent: "start" }}>
        <>
          {open ? (
            <MenuLogo onClick={() => router.push("/")} />
          ) : (
            <img
              src="/menuimagesmall.jpeg"
              alt="logo"
              style={{ width: "45px", marginLeft: "0.35rem" }}
              onClick={() => router.push("/")}
            />
          )}
          {open && (
            <IconButton
              onClick={handleDrawerClose}
              className={styles.drawerNavButton}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ color: PRIMARY_COLOR }} />
              ) : (
                <ChevronLeftIcon style={{ color: PRIMARY_COLOR }} />
              )}
            </IconButton>
          )}
        </>
      </DrawerHeader>
      <Divider />
      {isClient ? (
        <List>
          {NAV_MENU_ITEM.map(({ name, icon, route, role }) => {
            if (role?.includes(role_id as any)) {
              return (
                <MenuItem
                  open={open}
                  text={name}
                  selected={
                    router.pathname === "/" && name === "Home"
                      ? true
                      : router.pathname
                          .split("/")
                          .slice(1)
                          .includes(route.replace("/", ""))
                  }
                  Icon={icon}
                  key={name}
                  href={route}
                />
              );
            }
            return null;
          })}
        </List>
      ) : (
        <List>
          <Skeleton variant="rectangular" width={100} height={100} />
        </List>
      )}
      <Divider />
    </div>
  );
};

export { DrawerChildren };
