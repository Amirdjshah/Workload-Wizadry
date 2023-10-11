import React, { useEffect, useState } from "react";
import { IOrder, IOrderLine } from "../../../interfaces/dataInterface";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import { updateOrder, updateRfqQty } from "../../../lib";
import { enqueueSnackbar } from "notistack";

interface IProps {
  data: IOrder;
  mode: "vessel" | "reference";
}
const VesselAndReferenceInput: React.FC<IProps> = ({ data, mode }) => {
  const [name, setName] = useState<any>(
    mode === "vessel" ? "vessel" : "client_order_ref"
  );
  const [label, setLabel] = useState(
    mode === "vessel" ? "Vessel" : "Customer Reference"
  );
  const [value, setValue] = useState(
    mode === "vessel" ? data?.vessel ?? "" : data?.client_order_ref ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | boolean>(false);
  const [editMode, setEditMode] = useState(false);
  const validateInput = (input: string) => {
    return false;
  };

  useEffect(() => {
    const res = validateInput(value);
    setError(res);
  }, [value]);

  const handleSubmit = () => {
    if (!data) return;
    setLoading(true);
    const res = validateInput(value);
    const payload = {
      [name]: value,
    };
    // if (!res) {
    //   updateOrder(data?.id?.toString(), payload)
    //     .then(() => {
    //       setEditMode(false);
    //       enqueueSnackbar({
    //         message: `Information Updated Successfully`,
    //         variant: "success",
    //         className: "success-snackbar",
    //       });
    //     })
    //     .catch((err) => {
    //       enqueueSnackbar({
    //         message: `Error while update Quantity of ${data.name || ""}`,
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
    <Grid flexDirection={"column"}>
      {!editMode && (
        <Grid container justifyContent={"flex-start"} alignItems={"flex-start"}>
          <Grid item>
            <b>{label}:</b> <Typography>{value ? value : 'No Data'}</Typography>
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
                label={label}
                variant="standard"
                style={{ minWidth: "fit-content" }}
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
export { VesselAndReferenceInput };
