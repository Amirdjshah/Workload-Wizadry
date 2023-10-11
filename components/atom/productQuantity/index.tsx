import React, { useEffect, useState } from "react";
import { IOrderLine } from "../../../interfaces/dataInterface";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import { updateRfqQty } from "../../../lib";
import { enqueueSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  data: IOrderLine;
}
const ProductQuantity: React.FC<IProps> = ({ data }) => {
  const [value, setValue] = useState(data?.product_uom_qty.toString() || "0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | boolean>(false);
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const validateInput = (input: string) => {
    const parsedInput = parseFloat(input);

    if (!input) return "Input required";
    if (isNaN(parsedInput)) {
      return "Input is not a valid number.";
    }

    if (parsedInput < 0) {
      return "Input must not be less than 0.";
    }
    return false; // No error
  };

  useEffect(() => {
    const res = validateInput(value);
    setError(res);
  }, [value]);

  const handleSubmit = () => {
    if (!data) return;
    setLoading(true);
    const res = validateInput(value);
    // if (!res) {
    //   updateRfqQty(data?.id, value)
    //     .then(() => {
    //       setEditMode(false);
    //       queryClient.invalidateQueries({ queryKey: ["fetch-single-order"] });
    //       enqueueSnackbar({
    //         message: `Quantity updated successfully`,
    //         variant: "success",
    //         className: "success-snackbar",
    //       });
    //     })
    //     .catch((err) => {
    //       enqueueSnackbar({
    //         message: `Error while update Quantity of ${data?.name}`,
    //         variant: "error",
    //         className: "error-snackbar",
    //       });
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // }
  };
  return (
    <Grid>
      {!editMode && (
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item>
            <Typography>{value}</Typography>
          </Grid>
          <Grid item>
            <Button
              startIcon={<BorderColorIcon color="info" />}
              color="info"
              onClick={() => setEditMode(!editMode)}
              style={{ minWidth: "none", marginLeft: "0.5rem" }}
            />
          </Grid>
        </Grid>
      )}
      {editMode && (
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid container justifyContent={"center"} flexDirection={"column"}>
            <Grid item>
              <TextField
                id="standard-basic"
                label="Qty"
                variant="standard"
                style={{ minWidth: "5rem" }}
                value={value}
                onChange={(e) => setValue(e.target?.value)}
                error={Boolean(error)}
                helperText={Boolean(error) && error}
              />
            </Grid>
            <Grid item style={{ marginTop: "10px" }}>
              <Button
                color="info"
                disabled={loading}
                variant="contained"
                onClick={() => handleSubmit()}
                style={{ minWidth: "none", marginLeft: "0.5rem" }}
              >
                Save
              </Button>
              <Button
                color="error"
                variant="text"
                onClick={() => {
                  setValue(data?.product_uom_qty?.toString());
                  setEditMode(false);
                }}
                style={{ minWidth: "none", marginLeft: "0.5rem" }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
export { ProductQuantity };
