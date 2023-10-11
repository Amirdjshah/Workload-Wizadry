import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import {
  Download,
} from "@mui/icons-material";
import React from "react";

interface IProps {
  res: any;
  loading: any;
  handleInvoiceDownload: any;
  attachments: any;
  InvoiceConfig: any;
  handleFileDownload: any;
}

const DocumentsComponent: React.FC<IProps> = ({
  res,
  loading,
//   handleInvoiceDownload,
  attachments,
  handleFileDownload,
}) => {
  return (
    <>
      {attachments?.data?.map((item: any) => {
        return (
          <Grid
            container
            justifyContent={"space-between"}
            padding={"0.40rem 0rem"}
          >
            <Typography style={{marginTop: "3px"}} fontWeight={400}>{item.name}</Typography>
            {loading?.attachment ? (
              <Button variant="text" onClick={() => {}}>
                <CircularProgress
                  size={18}
                  sx={{
                    color: "black",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              </Button>
            ) : (
              <Button
                startIcon={<Download />}
                variant="text"
                onClick={() => handleFileDownload(item?.name, item?.raw, item?.mimetype)}
              />
            )}
          </Grid>
        );
      })}
      {/* {(res?.data.invoice_count || 0) > 0 &&
        res?.data?.invoice_ids
          ?.filter((item: any) => item?.state === "posted")
          .map((item: any) => {
            return (
              <Grid
                container
                justifyContent={"space-between"}
                padding={"0.25rem 0rem"}
              >
                <Typography fontWeight={400}>{item.name}</Typography>
                {loading?.invoice ? (
                  <Button
                    disabled={loading?.invoice}
                    variant="text"
                    onClick={() => {}}
                  >
                    <CircularProgress
                      size={18}
                      sx={{
                        color: "black",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  </Button>
                ) : (
                  <Button
                    startIcon={<Download />}
                    disabled={loading?.invoice}
                    variant="text"
                    onClick={() => handleInvoiceDownload(item.id, item?.name)}
                  />
                )}
              </Grid>
            );
          })} */}
    </>
  );
};

export { DocumentsComponent };
