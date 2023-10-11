import React, { useContext, useRef, useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Hidden,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AttachmentIcons from "@mui/icons-material/AttachmentOutlined";
import { AppBar, Search, SearchIconWrapper } from "./styled";
import SearchIcon from "@mui/icons-material/Search";
import { PRIMARY_COLOR } from "@config/cssVariables";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { SearchBox } from "react-instantsearch-dom";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/authContext";
import { imageToBase64, stringAvatar } from "../../utils";
// import { createNewPart } from "../../../services/new_part";
import { enqueueSnackbar } from "notistack";
import { useUser } from "../../../lib/hooks/user";
interface IHeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const Header: React.FC<IHeaderProps> = ({ open, handleDrawerOpen }) => {
  const router = useRouter();
  const { myData, loading } = useUser();

  const myAccount = () => {
    router.push("/my-account");
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        style={{
          background: "rgba(255, 255, 255)",
          borderBottom: "1px solid #e7f6fd",
          height: "80px",
          color: PRIMARY_COLOR,
        }}
      >
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 0,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Grid
          container
          justifyContent="flex-end"
          alignContent={"center"}
          alignItems={"center"}
        >
          <Grid item md={"auto"} sm={"auto"}>
            {loading && <CircularProgress />}
            {!loading && (
              <>
                <Button
                  variant="text"
                  startIcon={
                    <Avatar
                      sizes="small"
                      {...stringAvatar(
                        `${myData?.user?.firstName} ${myData?.user?.lastName}` ||
                          "My Account"
                      )}
                    />
                  }
                >
                  <Grid container flexDirection={"column"} justifyContent={"flex-start"}>
                    <Grid item>
                      {`${myData?.user?.firstName} ${myData?.user?.lastName}`}
                    </Grid>
                    <Grid item>
                      <i style={{float: 'left'}}>{myData?.user?.role?.roleName}</i>
                    </Grid>
                  </Grid>
                </Button>
                <br />
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
