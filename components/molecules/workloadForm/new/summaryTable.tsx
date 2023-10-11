import {
  Box,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Button } from "../../../atom";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { TableComponent } from "./tableComponent";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const SummaryTable: React.FC<any> = ({ tableData, formData }) => {
  const [open, setOpen] = useState(false);
  return (
    <Grid container>
      <Grid container justifyContent={"flex-end"}>
        <Grid item style={{ alignItems: "flex-end" }}>
          <Typography style={{ fontSize: "16px", alignSelf: "right" }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<RemoveRedEyeOutlined />}
              onClick={() => setOpen(true)}
            >
              Expand table
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Grid container>
          <Box sx={{ ...style, width: "95%" }}>
            
            <Typography style={{fontSize: "18px", marginBottom: "10px"}}>
                Workload Calculation
            </Typography>
            <TableComponent tableData={tableData} formData={formData} modal={true} />
          </Box>
        </Grid>
      </Modal>
      <Grid container>
        <TableComponent tableData={tableData} formData={formData} modal={false} />
      </Grid>
    </Grid>
  );
};

export { SummaryTable };
