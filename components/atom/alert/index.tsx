import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  CircularProgress,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";

interface IProps {
  handleClose: () => void;
  message: string;
  handleConfirm: () => void;
  open: boolean;
  loading: boolean;
  body?: any;
  confirmRequired?: boolean;
}
const AlertDialog: React.FC<IProps> = ({
  handleClose,
  handleConfirm,
  message,
  open,
  loading,
  body,
  confirmRequired,
}) => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const onChangeCheckbox = (e: any) => {
    setChecked(e.target.checked);
  };
  const onChangeValue = () => {
    setChecked(!checked);
  };

  let bodyData = body
  if(body === "<p><br></p>"){
    bodyData = ""
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>
            {message}
          </Typography>
        </DialogTitle>
        {bodyData ? (
          <DialogContent style={{ border: "1px solid #ccc" }}>
            <div
              style={{ padding: "5px", margin: "1px" }}
              id="alert-dialog-description"
              dangerouslySetInnerHTML={{ __html: body || "" }}
            />
          </DialogContent>
        ) : null}
        <DialogActions>
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
          >
            {confirmRequired && (
              <DialogContent>
                <div
                  id="alert-dialog-description"
                  style={{ cursor: "default" }}
                  onClick={() => onChangeValue()}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChangeCheckbox}
                  />{" "}
                  I agree to the terms and conditions
                </div>
              </DialogContent>
            )}
            <Button onClick={handleClose}>Cancel</Button>
            {loading ? (
              <Button
                onClick={() => {}}
                autoFocus
                variant={"contained"}
                style={{ height: "30px", width: "80px" }}
              >
                <CircularProgress
                  size={24}
                  sx={{
                    color: "white",
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
                disabled={!checked && confirmRequired}
                onClick={handleConfirm}
                autoFocus
                size="small"
                variant={"contained"}
              >
                Confirm
              </Button>
            )}
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export { AlertDialog };
