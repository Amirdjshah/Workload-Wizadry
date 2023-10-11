import React, { useContext, useState } from "react";
import { Button, Checkbox, Logo, TextField } from "../../atom";
import {
  Autocomplete,
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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import Link from "next/link";
import { useFormik } from "formik";
import { INITIAL_VALUE, validationSchema } from "./helper";
import { AuthContext } from "../../context/authContext";
import { login, signup } from "../../../lib";
import { enqueueSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { formatErrorMessage } from "../../utils/formatError";
import { useFaculties, useRoles } from "../../../lib/hooks/roles";

const SignupForm: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { roles, rolesLoading } = useRoles();
  const { faculties, facultyLoading } = useFaculties();

  const router = useRouter();

  const [loading, isLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmitSignup = async (values: typeof INITIAL_VALUE) => {
    isLoading(true);
    try {
      const response = await signup(values);
      if (response) {
        setIsSuccess(true);
      }
    } catch (err: any) {
      enqueueSnackbar({
        message: formatErrorMessage(err?.response?.data),
        variant: "error",
      });
    } finally {
      isLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema,
    onSubmit: async (value: typeof INITIAL_VALUE) => {
      const signup = await onSubmitSignup(value);
    },
  });

  return (
    <>
      {!isSuccess && (
        <Grid
          item
          xs={10}
          lg={8}
          height="fit-content"
          justifyContent={"center"}
        >
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            {matches && (
              <Grid xs={0} sm={12} style={{ marginBottom: "20px" }}>
                <Logo height={"30"} />
              </Grid>
            )}
            <Grid item>
              <Typography
                style={{ fontSize: "24px" }}
                marginBottom={7}
                textAlign={"center"}
              >
                Register Your Account
              </Typography>
            </Grid>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <Grid
                container
                justifyContent={"space-between"}
                flexDirection={"row"}
              >
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.touched.firstName && formik.errors.firstName
                    )}
                    helperText={
                      formik.touched.firstName &&
                      (formik.errors.firstName as any)
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.touched.lastName && formik.errors.lastName
                    )}
                    helperText={
                      formik.touched.lastName && (formik.errors.lastName as any)
                    }
                  />
                </Grid>
              </Grid>
              <TextField
                label="UC Email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={
                  formik.touched.email && (formik.errors.email as any)
                }
              />
              <TextField
                label="Password"
                name="password"
                type={!showPassword ? "text" : "password"}
                value={formik.values.password}
                onBlur={formik.handleBlur}
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
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={
                  formik.touched.password && (formik.errors.password as any)
                }
              />
              <Autocomplete
                options={faculties || []}
                loading={facultyLoading}
                getOptionLabel={(option: any) => {
                  return option?.name || option;
                }}
                value={faculties?.[0]?.name}
                onChange={(_, k) => {
                  const e: any = {
                    target: {
                      name: "faculty_id",
                      value: k?.id,
                    },
                  };
                  formik.setFieldTouched("faculty_id");
                  formik.handleChange(e);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Faculty *"
                    variant="outlined"
                    error={Boolean(
                      formik.touched.faculty_id && formik.errors.faculty_id
                    )}
                    helperText={
                      (formik.touched.faculty_id && formik.errors.faculty_id) as any
                    }
                  />
                )}
              />
              <Autocomplete
                options={roles || []}
                loading={rolesLoading}
                getOptionLabel={(option: any) => {
                  return option?.roleName || option;
                }}
                value={roles?.[0]?.roleName}
                onChange={(_, k) => {
                  const e: any = {
                    target: {
                      name: "role_id",
                      value: k?.id,
                    },
                  };
                  formik.setFieldTouched("role_id");
                  formik.handleChange(e);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Role *"
                    variant="outlined"
                    error={Boolean(
                      formik.touched.role_id && formik.errors.role_id
                    )}
                    helperText={
                      (formik.touched.role_id && formik.errors.role_id) as any
                    }
                  />
                )}
              />
            </Stack>
            <Grid
              container
              flexDirection={"row"}
              justifyContent={"flex-start"}
              gap={2}
              style={{ marginTop: "10px" }}
            >
              <Grid item>
                {loading ? (
                  <Button
                    size="large"
                    type="button"
                    isLoading={true}
                    style={{
                      width: "180px",
                      height: "40px",
                    }}
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
                  <Button size="large" type="submit" isLoading={true}>
                    <span>Create Your Account</span>
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Divider orientation="vertical" />
              </Grid>
              <Grid item>
                <Link href={"/login"}>
                  <Button
                    color="primary"
                    variant="outlined"
                    size="large"
                    type="submit"
                    isLoading={true}
                  >
                    <span>Login</span>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      )}

      {isSuccess && (
        <Grid
          item
          xs={10}
          lg={8}
          height="fit-content"
          justifyContent={"center"}
        >
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            {matches && (
              <Grid xs={0} sm={12} style={{ marginBottom: "20px" }}>
                <Logo height={"30"} />
              </Grid>
            )}
            <Grid item>
              <Typography
                style={{ fontSize: "24px" }}
                marginBottom={2}
                textAlign={"center"}
              >
                Account Verification
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <Grid item>
              <img src="/activation.jpg" height="200" width={200} />
            </Grid>
            <Grid item alignItems={"center"} alignSelf={"center"}>
              <Typography alignSelf={"center"} style={{ fontSize: "20px" }}>
                Check email to activate your account
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                If you don't receive this email, please check your spam folder.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="large"
                startIcon={<KeyboardBackspaceIcon />}
                variant="outlined"
                onClick={(e) => router.push("/login")}
              >
                Go to Login page
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export { SignupForm };
