import { Avatar, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { stringAvatar } from "../../utils";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import PendingIcon from "@mui/icons-material/PendingActionsOutlined";
import moment from "moment";
import { MessageModal } from "../messageModal";

interface Props {
  name: string;
  approved?: string;
  note?: string;
  approvedDate: string;
}
const UserNameCard: React.FC<Props> = ({
  name,
  approved,
  note,
  approvedDate,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Grid
      container
      flexDirection={"row"}
      flexWrap={"nowrap"}
      alignItems={"center"}
    >
      <MessageModal
        open={open}
        onClose={() => setOpen(false)}
        title={"Reject Reason"}
        children={<div>{note}</div>}
      />
      <Grid item width={"fit-content"}>
        <Avatar
          style={{ width: 56, height: 56 }}
          {...stringAvatar(name || "-")}
        />
      </Grid>
      <Grid item container flexGrow={1} marginLeft={2} flexDirection={"column"}>
        <Typography width={"fit-content"} fontSize={18}>
          {name}
        </Typography>
        <Typography width={"fit-content"} fontSize={14} color="gray">
          {approved == "Approved" &&
            `Approved on: ${moment(approvedDate).format("DD-MM-YYYY")}`}
          {approved == "Rejected" &&
            `Rejected on: ${moment(approvedDate).format("DD-MM-YYYY")}`}
          {approved == "Pending" &&
            `Pending`}
        </Typography>
        {approved == "Rejected" && (
          <Grid item justifyContent={"start"} display="flex" paddingTop={1}>
            <Button variant="text" onClick={() => setOpen(true)} size="small">
              View Reason
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item container xs={2}>
        {approved == "Approved" && (
          <CheckCircleRoundedIcon fontSize={"large"} color="primary" />
        )}
        {approved == "Rejected" && (
          <UnpublishedIcon fontSize={"large"} color="error" />
        )}
        {approved == "Pending" && (
          <PendingIcon fontSize={"large"} color="info" />
        )}
      </Grid>
    </Grid>
  );
};
export { UserNameCard };
