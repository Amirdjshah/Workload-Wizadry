import React, { useContext } from "react";
import styles from "./style.module.scss";
import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import { stringAvatar, stringToColor } from "../../utils";
import TelephoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import moment from "moment";

const UserProfileDetail: React.FC = () => {
  const { user, isLoading, company } = useContext(AuthContext);
  const props: any = stringAvatar(user?.display_name || "My Account");
  props.sx = {
    ...props.sx,
    height: "6rem",
    width: "6rem",
    fontSize: "2rem",
    fontWeight: "600",
  };

  if (isLoading) return <div />;
  return (
    <div
      className={styles.userProfileDetail}
      style={{
        background: `linear-gradient(45deg, ${stringToColor(
          user?.display_name || "AccountState"
        )}0, transparent)`,
      }}
    >
      <Grid container justifyContent={"center"}>
        <Grid item textAlign={"center"} marginTop={"1rem"}>
          <Avatar {...props} style={{ textTransform: "uppercase" }} />
        </Grid>
        <Grid item xs={12} marginTop={2}>
          <Typography fontWeight={600} fontSize={18} textAlign={"center"}>
            {user?.display_name}
          </Typography>
          <Typography fontSize={16} textAlign={"center"} color={"gray"}>
            {company?.display_name || ""}
          </Typography>
        </Grid>
        <Grid item xs={12} marginTop={2}>
          <Divider style={{ margin: "1rem 0" }}>Personal Information</Divider>
          <Grid container columnGap={1} justifyContent={"center"}>
            <TelephoneIcon />
            <Typography fontSize={14}>{user?.phone || "-"}</Typography>
          </Grid>
          <Grid container columnGap={1} justifyContent={"center"} marginTop={2}>
            <EmailIcon />
            <Typography fontSize={14}>{user?.email}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} marginTop={4}>
        <Divider style={{ margin: "1rem 0" }}>Account State</Divider>
        <Grid container columnGap={1} justifyContent={"center"}>
          <Typography fontSize={14} style={{ textTransform: "capitalize" }}>
            Status: {user?.state}
          </Typography>
        </Grid>
        <Grid container columnGap={1} justifyContent={"center"} marginTop={2}>
          <Typography fontSize={14}>
            Last Activity:{" "}
            {moment(user?.login_date).isValid()
              ? moment(user?.login_date).format("DD-MM-YYYY HH:mm")
              : "-"}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export { UserProfileDetail };
