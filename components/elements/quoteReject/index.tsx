import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Popper,
  TextField,
  Typography,
  useStepContext,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Checkbox } from "../../atom";
// import { rejectQuotation } from "../../../lib";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/authContext";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

interface IProps {
  open: boolean;
  ref?: HTMLElement | null;
  onClose: () => void;
  data: any;
  id?: string;
}
const QuoteRejectPopper = React.forwardRef(
  ({ open, id, onClose, data }: IProps, ref: any) => {
    const currentRef = useRef<any>(null);
    const [error, setError] = useState(false);
    const [touched, setTouched] = useState(false);
    const router = useRouter();
    const [value, setValue] = useState("");
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    const { user, company, accessToken } = useContext(AuthContext);

    const handleSubmit = () => {
      let isValid = !error && touched;
      if (isValid && router.query.id) {
        const payload: any = {
          user_id: user?.id,
          order_id: router.query.id?.toString() || "",
          datetime: moment().format("YYYY-MM-DD"),
          approval_date: moment().format("DD MMMM YYYY"),
          approver_name: user?.name,
          company_name: company?.name,
          date: moment(data?.create_date).format("DD MMMM YYYY"),
          request_id: data?.display_name,
          requester_email: user?.email,
          requester_name: data?.partner_id?.name,
          note: value,
        };
        setLoading(true);
        // rejectQuotation(payload, accessToken?.access_token)
        //   .then(() => {
        //     queryClient.invalidateQueries({ queryKey: ["fetch-single-order"] });

        //     enqueueSnackbar({
        //       message: "Quotation Rejected",
        //       variant: "success",
        //       className: "success-snackbar",
        //     });
        //     onClose();
        //   })
        //   .catch(() => {
        //     enqueueSnackbar({
        //       message: "Error have occurred",
        //       variant: "error",
        //         className: "error-snackbar",
        //     });
        //   })
        //   .finally(() => {
        //     setLoading(false);
        //   });
      }
    };

    useEffect(() => {
      if (open) {
        const handleClickOutside = (event: any) => {
          if (event.target === ref) {
            return;
          }
          if (
            currentRef?.current &&
            (!currentRef.current?.contains(event?.target) ||
              ref?.current?.contains(event?.target))
          ) {
            onClose();
          }
        };
        window.addEventListener("click", handleClickOutside);
        return () => {
          window.removeEventListener("click", handleClickOutside);
        };
      }
    }, [open]);

    useEffect(() => {
      touched && value.length <= 0 ? setError(true) : setError(false);
    }, [value]);
    const handleChange = (e: any) => {
      setValue(e.target.value);
      setTouched(true);
    };

    return (
      <Popper
        placement="bottom"
        disablePortal={false}
        ref={currentRef}
        anchorEl={ref}
        id={id}
        modifiers={[]}
        open={open}
      >
        <Paper>
          <Grid
            container
            gap={2}
            padding={4}
            flexDirection={"column"}
            minWidth={"25rem"}
          >
            <Grid item xs={12} container flexDirection={"column"}>
              <Typography style={{marginBottom: "3px"}}>Write a reason for rejection</Typography>
              <TextField
                value={value}
                onChange={handleChange}
                error={error}
                helperText={error && "Input is required"}
              />
            </Grid>
            <Grid item xs={12} container gap={2}>
              {loading ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleSubmit}
                  style={{
                    height: "36px",
                    width: "130px",
                  }}
                >
                  <CircularProgress size={16} style={{ color: "white" }} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleSubmit}
                >
                  Confirm Reject
                </Button>
              )}
              <Button variant="text" color="primary" onClick={onClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Popper>
    );
  }
);

export { QuoteRejectPopper };
