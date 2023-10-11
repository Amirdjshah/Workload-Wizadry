import { Button, Divider, Drawer, Grid, Typography } from "@mui/material";
import React from "react";
import { NewItemPartItem } from "../newItemPartItem";

const style: any = {
  width: 1000,
  maxHeight: "80vh",
  minHeight: 300,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  background: "white",
  left: "23%",
  boxShadow: 24,
  padding: "1rem 2rem",
};

interface IProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

const handleFileDownload = async (name: string, raw: string) => {
  // let value = getFileExtensionFromHex(raw);
  // saveBase64AsPDF(raw, name);
};

const config = {
  fontFamily: "sans-serif",
  fontWeight: "bold",
  fontSize: 14,
};
export const NewPartModal: React.FC<IProps> = ({ open, onClose, data }) => {
  return (
    <>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={onClose}
        style={{ background: "white" }}
      >
        <div style={style}>
          <Grid
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              background: "white",
              width: "100%",
            }}
            paddingY={2}
          >
            <Typography
              variant="h1"
              style={{ fontSize: "1.5rem", fontWeight: "500" }}
            >
              New Part Details
            </Typography>
            <Typography variant="body1">
              {data.items?.length === 0
                ? "Your didn't request any product!"
                : `Total Requested Product Count: ${data.items?.length}`}
            </Typography>
          </Grid>
          <Grid container>
            {data?.request_by && (
              <Grid item container marginTop={1}>
                <Grid item marginRight={"1rem"} minWidth={"15rem"}>
                  <Typography>Request By: </Typography>
                </Grid>
                <Grid item>
                  <Typography fontWeight={"400"}>{data?.request_by}</Typography>
                </Grid>
              </Grid>
            )}
            {data?.request_on && (
              <Grid item container marginTop={1}>
                <Grid item marginRight={"1rem"} minWidth={"15rem"}>
                  <Typography>Requested On: </Typography>
                </Grid>
                <Grid item>
                  <Typography fontWeight={"400"}>{data?.request_on}</Typography>
                </Grid>
              </Grid>
            )}
            {data?.need_by && (
              <Grid item container marginTop={1}>
                <Grid item marginRight={"1rem"} minWidth={"15rem"}>
                  <Typography>Required Date: </Typography>
                </Grid>
                <Grid item>
                  <Typography fontWeight={"400"}>{data?.need_by}</Typography>
                </Grid>
              </Grid>
            )}
            {data?.ofter_order && (
              <Grid item container>
                <Grid
                  item
                  marginRight={"1rem"}
                  minWidth={"15rem"}
                  marginTop={1}
                >
                  <Typography>Often Purchase: </Typography>
                </Grid>
                <Grid item>
                  <Typography fontWeight={"400"}>
                    {data?.often_order}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {data?.status && (
              <Grid item container marginTop={1}>
                <Grid item marginRight={"1rem"} minWidth={"15rem"}>
                  <Typography>Status: </Typography>
                </Grid>
                <Grid item>
                  <Typography fontWeight={"400"}>{data?.status}</Typography>
                </Grid>
              </Grid>
            )}
            {data?.comment && (
              <Grid
                item
                container
                flexWrap={"nowrap"}
                marginTop={1}
                marginBottom={1}
              >
                <Grid item marginRight={"1rem"} minWidth={"15rem"}>
                  <Typography>Comment: </Typography>
                </Grid>
                <Grid item>
                  <Typography fontWeight={"400"}>{data?.comment}</Typography>
                </Grid>
              </Grid>
            )}
            {/* {data?.file && (
              <Grid
                container
                alignContent={"center"}
                marginTop={"1rem"}
                marginBottom={"1rem"}
              >
                <Grid item marginRight={"1rem"} minWidth={"15rem"}>
                  <Typography>File: </Typography>
                </Grid>
                <Grid
                  item
                  style={{ height: "fit-content", width: "2rem" }}
                  display={"flex"}
                  alignItems={"center"}
                  marginRight={"0.5rem"}
                >
                  <FileIcon extension={"pdf"} {...defaultStyles["pdf"]} />
                </Grid>
                <Grid
                  container
                  flexDirection={"column"}
                  width={"fit-content"}
                  justifyContent={"center"}
                >
                  <Grid item>{"Attachment"}</Grid>
                </Grid>

                <Grid item display={"flex"} alignContent={"center"}>
                  <Button
                    endIcon={<DownloadOutlined />}
                    onClick={() =>
                      handleFileDownload("Download File", data?.file)
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
            )} */}
          </Grid>
          <Divider style={{ marginTop: "1rem" }} />
          <Grid container marginBottom={2} marginTop={4}>
            <Grid item width={50}>
              <Typography {...config}>S.N.</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography {...config}>Product Name</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography {...config}>Description</Typography>
            </Grid>
            <Grid item marginX={1} width={150}>
              <Typography {...config}>IMPA Code OR P/N</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography {...config}>Manufacturer</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography {...config}>Unit(s)</Typography>
            </Grid>
          </Grid>
          {data?.items?.map((item: any, i: number) => {
            return <NewItemPartItem data={item} index={i + 1} />;
          })}
          {!data.items?.length && (
            <Grid
              container
              alignContent={"center"}
              justifyContent={"center"}
              flexGrow={1}
            >
              <Grid item>
                <Typography color="GrayText">Data is Empty!</Typography>
              </Grid>
            </Grid>
          )}
        </div>
        <Grid
          container
          style={{ justifyContent: "end" }}
          paddingRight={5}
          paddingTop={2}
        >
          <Grid item xs={12} marginBottom={3}>
            <Divider />
          </Grid>
          <Grid item xs={12} marginBottom={3} style={{ textAlign: "end" }}>
            <Button
              variant="text"
              onClick={() => onClose()}
              style={{ marginRight: "1.5rem" }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};
