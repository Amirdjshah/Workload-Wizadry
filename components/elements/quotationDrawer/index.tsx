import { StickyNote2Outlined, ArrowLeftOutlined } from "@mui/icons-material";
import { Button, Drawer, Grid, Typography } from "@mui/material";
import React from "react";

interface IQuotationDrawer {
  onClose: () => void;
  open: boolean;
  attributeConfig: any;
  note: string | undefined;
  remarks: string | null | undefined;
}

const QuotationDrawer: React.FC<IQuotationDrawer> = ({
  onClose,
  open,
  attributeConfig,
  note,
  remarks,
}) => {
  return (
    <Drawer anchor={"right"} open={open} onClose={onClose}>
      <Grid
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
        paddingY={2}
        width={"500px"}
        marginLeft={2}
        marginRight={2}
      >
        <Grid marginBottom={2}>
          <Button onClick={onClose} variant="outlined" startIcon={<ArrowLeftOutlined />}>Go Back</Button>
        </Grid>
        <Grid
          item
          marginBottom={4}
          textAlign={"end"}
          border={"1px solid #dfdfdf"}
          flexGrow={1}
          width="500px"
          minHeight={"200px"}
        >
          <Grid
            {...attributeConfig}
            maxWidth={"initial"}
            marginBottom={1}
            marginTop={0}
            paddingLeft={2}
            paddingRight={1}
            padding={1.5}
            borderBottom={"1px solid lightgray"}
            flexGrow={1}
            justifyContent={"start"}
            gap={1}
          >
            <StickyNote2Outlined />
            <Typography fontSize={16} fontWeight={500}>
              Remarks
            </Typography>
          </Grid>
          {remarks ? (
            <div
              dangerouslySetInnerHTML={{ __html: remarks || "" }}
              className="quotes-note"
            />
          ) : (
            <div className="quotes-note">No Data Found!!</div>
          )}
        </Grid>
      </Grid>
    </Drawer>
  );
};

export { QuotationDrawer };
