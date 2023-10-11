import React, { useEffect, useState } from "react";
import { Button, Logo } from "../../atom";
import {
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ErrorIcon from "@mui/icons-material/Error";

import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatError";
import { verifyToken } from "../../../lib";

const VerifyPage: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(true);
  const [error, hasError] = useState(false);

  const router = useRouter();

  const checkAccessToken = async (id: string) => {
    try {
      const response = await verifyToken(id);
    } catch (err: any) {
      hasError(true);
      enqueueSnackbar({
        message: formatErrorMessage(err?.response?.data),
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      checkAccessToken(id as any);
    }
  }, [router]);

  return (
    <>
      {!loading && (
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
              {error ? (
                <ErrorIcon
                  color="error"
                  fontSize={"large"}
                  style={{ height: "100px", width: "100px" }}
                />
              ) : (
                <TaskAltIcon
                  color="primary"
                  fontSize={"large"}
                  style={{ height: "100px", width: "100px" }}
                />
              )}
            </Grid>
            <Grid item>
              <Typography
                style={{ fontSize: "24px" }}
                marginBottom={2}
                textAlign={"center"}
                color={error ? "error" : "primary"}
              >
                {error ? "Invalid" : "Account Verification Successful"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {error
                  ? "Validation token is invalid, Please check your email and try again!"
                  : "Please login to your account to continue using our services!"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
            marginTop={2}
          >
            <Grid item>
              <Button
                size="large"
                variant="outlined"
                onClick={(e) => router.push("/login")}
              >
                Go to Login page
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {loading && !error && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}
        >
          <Grid
            item
            fontFamily={"sans-serif"}
            fontWeight={"bold"}
            alignItems={"center"}
            fontSize={17}
          >
            <Skeleton height={"5rem"} width={"200px"} />
          </Grid>
          <Grid
            item
            fontFamily={"sans-serif"}
            fontWeight={"bold"}
            alignItems={"center"}
            fontSize={17}
          >
            <Skeleton height={"5rem"} width={"400px"} />
          </Grid>
          <Grid
            item
            fontFamily={"sans-serif"}
            fontWeight={"bold"}
            alignItems={"center"}
            fontSize={17}
          >
            <Skeleton height={"5rem"} width={"200px"} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export { VerifyPage };
