import React, { useContext, useState } from "react";
import { Button, Checkbox, Logo, TextField } from "../../atom";
import {
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useFormik } from "formik";
import { INITIAL_VALUE, validationSchema } from "./helper";
import { AuthContext } from "../../context/authContext";
import { login } from "../../../lib";
import { enqueueSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { formatErrorMessage } from "../../utils/formatError";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const onSubmitLogin = async (value: typeof INITIAL_VALUE) => {
    setLoading(true);
    try {
      const res = await login(value.email, value.password);
      enqueueSnackbar({
        message: "Successfully logged in",
        autoHideDuration: 2000,
        variant: "success",
      });
      window?.localStorage?.setItem("token", res?.data?.token);
      window?.localStorage?.setItem("role_code", res?.data?.role_code);
      if (res?.data?.role_code === "SA") {
        router.push("/users");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      let message = formatErrorMessage(err?.response?.data);
      enqueueSnackbar({
        message,
        autoHideDuration: 2000,
        variant: "error",
        className: "error-snackbar",
      });
    } finally {
      setLoading(false);
    }
  };

  const { setAccessToken } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const formik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema,
    onSubmit: onSubmitLogin,
  });

  return (
    <Grid item xs={10} lg={8} height="fit-content" justifyContent={"center"}>
      <Grid
        container
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Grid item>
          <Typography
            style={{ fontSize: "24px" }}
            marginBottom={7}
            textAlign={"center"}
          >
            Welcome
          </Typography>
        </Grid>
      </Grid>
      <Stack spacing={4}>
        <TextField
          label="UC Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && (formik.errors.email as any)}
        />
        <TextField
          label="Password"
          name="password"
          type={!showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
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
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={
            formik.touched.password && (formik.errors.password as any)
          }
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent={"flex-end"}
        alignItems={"center"}
        marginBottom={1}
        marginTop={1}
      >
        <Link href={"/forget-password"}>
          <Typography fontSize={14} fontWeight={"normal"}>
            Forget password ?
          </Typography>
        </Link>
      </Stack>
      <Grid
        container
        flexDirection={"row"}
        justifyContent={"flex-start"}
        gap={2}
      >
        <Grid item>
          {isLoading ? (
            <Button
              onClick={() => {}}
              autoFocus
              variant={"contained"}
              style={{ height: "40px", width: "90px" }}
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
              disabled={isLoading}
              onClick={() => onSubmitLogin(formik.values)}
              size="large"
              type="submit"
              isLoading={true}
            >
              <span>Sign in</span>
            </Button>
          )}
        </Grid>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item>
          <Link href={"/signup"}>
            <Button
              color="primary"
              variant="outlined"
              size="large"
              type="submit"
              isLoading={true}
            >
              <span>Create Account</span>
            </Button>
          </Link>
        </Grid>
        {/* <Divider light style={{ marginBlock: "3rem" }} /> */}
      </Grid>
      {/* <Divider light style={{ marginBlock: "3rem" }} />
        <Link href={"/signup"} target="_blank">
         Signup Here
        </Link> */}
    </Grid>
  );
};

export { LoginForm };
