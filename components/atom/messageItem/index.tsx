import React from "react";
import { IMessage } from "../../../interfaces/dataInterface";
import { Avatar, Button, Grid } from "@mui/material";
// @ts-ignore
import { FileIcon, defaultStyles } from "react-file-icon";
import styles from "./index.module.scss";
import { getFileExtension, saveBase64AsPDF, stringAvatar } from "../../utils";
import { DownloadOutlined } from "@mui/icons-material";
import { LIGHT_PRIMARY_COLOR, PRIMARY_COLOR } from "@config/cssVariables";

interface IProps {
  message: IMessage;
}

const MessageItem: React.FC<IProps> = ({ message }) => {
  const handleFileDownload = async (name: string, raw: string) => {
    saveBase64AsPDF(raw, name);
  };
  return (
    <Grid container className={styles.container}>
      <Avatar
        style={{ textTransform: "capitalize" }}
        {...stringAvatar(message?.create_uid?.name)}
      >
        {message.create_uid.name.slice(0, 1)}
      </Avatar>
      <Grid>
        <div
          dangerouslySetInnerHTML={{ __html: message?.body || "" }}
          className={styles.body}
        ></div>
        {message?.attachment_ids?.length ? (
          <Grid paddingLeft={"1rem"} marginTop={"0.5rem"}>
            {message?.attachment_ids?.map((item) => (
              <Grid
                container
                flexDirection={"row"}
                alignItems={"center"}
                style={{
                  fontSize: "14px",
                  // background: "#e0edee",
                  border: `1px solid ${LIGHT_PRIMARY_COLOR} `,
                  padding: "0.5rem",
                  borderRadius: "5px",
                  height: "fit-content",
                }}
              >
                <Grid
                  item
                  style={{ height: "fit-content", width: "2rem" }}
                  display={"flex"}
                  alignItems={"center"}
                  marginRight={"0.5rem"}
                >
                  <FileIcon
                    extension={getFileExtension(item.display_name)}
                    {...defaultStyles[getFileExtension(item.display_name)]}
                  />
                </Grid>
                <Grid container flexDirection={"column"} width={"fit-content"}>
                  <Grid item>{item.display_name}</Grid>
                  <Grid
                    item
                    style={{ textTransform: "uppercase", fontWeight: "bold" }}
                  >
                    {getFileExtension(item.display_name)}
                  </Grid>
                </Grid>
                <Grid item display={"flex"} alignContent={"center"}>
                  <Button
                    endIcon={<DownloadOutlined />}
                    onClick={() =>
                      handleFileDownload(item.display_name, item.raw)
                    }
                    style={{
                      minWidth: "fit-content",
                      marginLeft: "1rem",
                    }}
                    sx={{
                      "MuiButton-iconSizeMedium": {
                        marginLeft: "none !important",
                      },
                    }}
                  ></Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export { MessageItem };
