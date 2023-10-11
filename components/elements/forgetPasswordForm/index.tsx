import { Button, TextField } from "../../atom";
import {
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
  useForkRef,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { forgetPassword } from "../../../lib";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Keyboard } from "@mui/icons-material";
import { formatErrorMessage } from "../../utils/formatError";

const validationSchema = yup.object({
  email: yup.string().email().required("Please enter your Email"),
});
const ForgetPasswordForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (v) => {
      handleForgetPassword(v.email);
    },
  });

  const handleForgetPassword = async (email: string) => {
    setLoading(true);
    try {
      const response = await forgetPassword(email);
      enqueueSnackbar({
        message: `Email has been sent to ${email}`,
        variant: "success",
        className: "success-snackbar",
      });
    } catch (err: any) {
      enqueueSnackbar({
        message: formatErrorMessage(err?.response?.data),
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Grid item xs={10} lg={8} height="fit-content">
      <Typography variant="h1" marginBottom={1} textAlign={"center"}>
        Forgotten your Password?
      </Typography>
      <Typography
        marginBottom={6}
        textAlign={"center"}
        color="gray"
        fontWeight={500}
      ></Typography>
      <Stack spacing={6}>
        <TextField
          label="Enter your Email address"
          value={formik.values.email}
          name="email"
          error={Boolean(formik.errors.email && formik.touched.email)}
          helperText={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
        />
        <Stack spacing={3}>
          {loading ? (
            <Button
              onClick={() => {}}
              autoFocus
              variant={"contained"}
              style={{ height: "50px", width: "100%" }}
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
              size="large"
              type="submit"
              isLoading={loading}
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              Send Reset Link
            </Button>
          )}
          <Button
            size="large"
            startIcon={<KeyboardBackspaceIcon />}
            variant="outlined"
            onClick={(e) => router.push("/login")}
          >
            Go Back to Home page
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export { ForgetPasswordForm };
