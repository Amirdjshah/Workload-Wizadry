import { Button, TextField } from "../../atom";
import {
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  useForkRef,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { forgetPassword, resetPassword } from "../../../lib";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { formatErrorMessage } from "../../utils/formatError";

const validationSchema = yup.object({
  password: yup.string().required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const ResetPasswordForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const router = useRouter();

  const resetUserPassword = async (values: any) => {
    setLoading(true);
    try {
      const response = await resetPassword(values?.password, router?.query?.id);
      enqueueSnackbar({
        message: `Password Reset Successfully`,
        variant: "success",
        className: "success-snackbar",
      });
      router.push("/login");
    } catch (err: any) {
      enqueueSnackbar({
        message: formatErrorMessage(err?.response?.data),
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (v) => {
      if (!router.query.id) return;
      await resetUserPassword(v);
    },
  });

  return (
    <Grid item xs={10} lg={8} height="fit-content">
      <Typography
        variant="h1"
        style={{ fontSize: "18px" }}
        marginBottom={1}
        textAlign={"center"}
      >
        Reset your password
      </Typography>
      <Typography variant="subtitle1" marginBottom={4} textAlign={"center"}>
        Please provide your new password.
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Password"
          value={formik.values.password}
          name="password"
          error={Boolean(formik.errors.password && formik.touched.password)}
          helperText={formik.touched.password && formik.errors.password}
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          value={formik.values.confirm_password}
          name="confirm_password"
          type={showConfirmationPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setShowConfirmationPassword(!showConfirmationPassword)
                  }
                  edge="end"
                >
                  {showConfirmationPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(
            formik.errors.confirm_password && formik.touched.confirm_password
          )}
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {loading ? (
          <Button
            fullWidth
            size="large"
            type="submit"
            isLoading={loading}
            onClick={() => {}}
            style={{ height: "40px" }}
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
            fullWidth
            size="large"
            type="submit"
            isLoading={loading}
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            Reset Password
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
    </Grid>
  );
};

export { ResetPasswordForm };
