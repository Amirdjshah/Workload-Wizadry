import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Autocomplete, Button, Grid, Typography } from "@mui/material";
import { TextField } from "../../atom";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAllCountry,
  fetchBilling,
  fetchSates,
  fetchShipping,
  postBilling,
  postShipping,
} from "../../../lib/accounts";
import { ConstructionOutlined } from "@mui/icons-material";
import * as yup from "yup";
import { enqueueSnackbar } from "notistack";

const initialData = {
  country: "",
  city: "",
  state: "",
  address1: "",
  address2: "",
};

const validationSchema = yup.object().shape({
  country: yup.number().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  address1: yup.string().required(),
  address2: yup.string(),
});
const AddressPage: React.FC = () => {
  const { user, company } = useContext(AuthContext);
  const { mutate: shippingSubmit, isLoading: sLoading } = useMutation({
    mutationFn: postShipping,
    onSuccess: () => {
      enqueueSnackbar({
        message: "Address Updated Successfully",
        autoHideDuration: 2000,
        className: "success-snackbar",
        variant: "success",
      });
    },
  });
  const { mutate: billingSubmit, isLoading: bLoading } = useMutation({
    mutationFn: postBilling,
    onSuccess: (data) => {
      enqueueSnackbar({
        message: "Product Added to Favorite",
        autoHideDuration: 2000,
        className: "toast",
        variant: "success",
      });
    },
  });
  // Formik init
  const bFormik = useFormik({
    initialValues: initialData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (e: any) => {
      billingSubmit({ userId: user?.id, body: e });
    },
  });
  const sFormik = useFormik({
    initialValues: initialData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (e: any) => {
      shippingSubmit({ userId: user?.id, body: e });
    },
  });

  useQuery({
    queryKey: ["fetchBilling"],
    queryFn: () => fetchBilling(user?.id),
    onSuccess: (res: any) => {
      const data = res?.data?.data;
      const payload = {
        country: data?.country_id?.id,
        city: data?.city,
        state: data?.state_id?.id,
        address1: data?.street,
        address2: data?.street2,
      };
      bFormik.setValues(payload);
    },
  });

  useQuery({
    queryKey: ["fetchShipping"],
    queryFn: () => fetchShipping(user?.id),
    onSuccess: (res: any) => {
      const data = res?.data?.data;
      const payload = {
        country: data?.country_id?.id,
        city: data?.city,
        state: data?.state_id?.id,
        address1: data?.street,
        address2: data?.street2,
      };
      sFormik.setValues(payload);
    },
  });
  const { data: countryList } = useQuery({
    queryKey: ["Fetch all country list"],
    queryFn: fetchAllCountry,
    select: (res) =>
      res.data.results.map((item) => ({ value: item.id, label: item.name })),
  });

  const { data: stateList } = useQuery({
    queryKey: ["Fetch all states"],
    queryFn: fetchSates,
    select: (res) => {
      return res.data.results.map((item) => ({
        value: item.id,
        label: item.name,
        country_id: item.country_id,
      }));
    },
  });
  const handleCopy = () => {
    sFormik.setValues(bFormik.values);
  };

  return (
    <Grid container width={"max-content"} maxWidth={"100%"}>
      <Grid xs={5} lg={3.5} xl={5} item>
        <Grid container>
          <Typography fontSize={17} marginTop={3}>
            Billing Address
          </Typography>
          <Grid container columnGap={4} rowGap={4} marginTop={3} xs={11.5}>
            <Grid item sm={12}>
              <Autocomplete
                options={countryList || []}
                getOptionLabel={(option) => option.label}
                value={
                  countryList?.find(
                    (item) => item.value == parseInt(bFormik.values.country)
                  ) || { label: "", value: 0 }
                }
                onChange={(_, k) => {
                  const e: any = {
                    target: {
                      name: "country",
                      value: k?.value,
                    },
                  };
                  bFormik.setFieldTouched("country");
                  bFormik.handleChange(e);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    variant="outlined"
                    error={Boolean(
                      bFormik.touched.country && bFormik.errors.country
                    )}
                    helperText={
                      (bFormik.touched.country && bFormik.errors.country) as any
                    }
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"City"}
                fullWidth={true}
                name="city"
                value={bFormik.values.city}
                onChange={bFormik.handleChange}
                onBlur={bFormik.handleBlur}
                error={Boolean(bFormik.touched.city && bFormik.errors.city)}
                helperText={
                  (bFormik.touched.city && bFormik.errors.city) as any
                }
                required
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item sm={12}>
              <Autocomplete
                options={
                  bFormik.values.state
                    ? (stateList || [])?.filter(
                        (item) =>
                          item.country_id === parseInt(bFormik.values.country)
                      ) || { label: "", value: 0 }
                    : []
                }
                getOptionLabel={(option) => option.label}
                value={
                  stateList?.find(
                    (item) => item.value == parseInt(bFormik.values.state)
                  ) || { label: "", value: 0, country_id: 0 }
                }
                onChange={(_, k) => {
                  const e: any = {
                    target: {
                      name: "state",
                      value: k?.value,
                    },
                  };
                  bFormik.setFieldTouched("state");
                  bFormik.handleChange(e);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name=""
                    error={Boolean(
                      bFormik.touched.state && bFormik.errors.state
                    )}
                    helperText={
                      (bFormik.touched.state && bFormik.errors.state) as any
                    }
                    label="State"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"Address Line 1"}
                fullWidth={true}
                name="address1"
                value={bFormik.values.address1}
                onBlur={bFormik.handleBlur}
                onChange={bFormik.handleChange}
                error={Boolean(
                  bFormik.touched.address1 && bFormik.errors.address1
                )}
                helperText={
                  (bFormik.touched.address1 && bFormik.errors.address1) as any
                }
                required
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"Address Line 2"}
                fullWidth={true}
                name="address2"
                value={bFormik.values.address2}
                onBlur={bFormik.handleBlur}
                onChange={bFormik.handleChange}
                error={Boolean(
                  bFormik.touched.address2 && bFormik.errors.address2
                )}
                helperText={
                  (bFormik.touched.address2 && bFormik.errors.address2) as any
                }
                variant="outlined"
                size="medium"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* SHIPPING ADDRESS */}
      {/* <Divider style={{ marginBlock: "1rem" }} /> */}
      <Grid xs={5} lg={3.5} xl={5} item position={"relative"}>
        <Grid container flexDirection={"column"}>
          <Grid container justifyContent={"space-between"} item>
            <Typography fontSize={17} marginTop={3}>
              Shipping Address
            </Typography>
            <Button
              startIcon={<CopyAllIcon />}
              style={{ marginTop: "1rem" }}
              onClick={handleCopy}
            >
              Copy from Billing Address
            </Button>
          </Grid>
          <Grid
            container
            columnGap={4}
            rowGap={4}
            marginTop={3}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Grid item sm={12}>
              <Autocomplete
                options={countryList || []}
                getOptionLabel={(option) => option.label}
                value={
                  countryList?.find(
                    (item) => item.value == parseInt(sFormik.values.country)
                  ) || { label: "", value: 0 }
                }
                onChange={(_, k) => {
                  const e: any = {
                    target: {
                      name: "country",
                      value: k?.value,
                    },
                  };
                  sFormik.setFieldTouched("country");
                  sFormik.handleChange(e);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    variant="outlined"
                    error={Boolean(
                      sFormik.touched.country && sFormik.errors.country
                    )}
                    helperText={
                      (sFormik.touched.country && sFormik.errors.country) as any
                    }
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"City"}
                fullWidth={true}
                name="city"
                value={sFormik.values.city}
                onChange={sFormik.handleChange}
                onBlur={sFormik.handleBlur}
                error={Boolean(sFormik.touched.city && sFormik.errors.city)}
                helperText={
                  (sFormik.touched.city && sFormik.errors.city) as any
                }
                required
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item sm={12}>
              <Autocomplete
                options={
                  sFormik.values.state
                    ? (stateList || [])?.filter(
                        (item) =>
                          item.country_id === parseInt(sFormik.values.country)
                      ) || { label: "", value: 0 }
                    : []
                }
                getOptionLabel={(option) => option.label}
                value={
                  stateList?.find(
                    (item) => item.value == parseInt(sFormik.values.state)
                  ) || { label: "", value: 0, country_id: 0 }
                }
                onChange={(_, k) => {
                  const e: any = {
                    target: {
                      name: "state",
                      value: k?.value,
                    },
                  };
                  sFormik.setFieldTouched("state");
                  sFormik.handleChange(e);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name=""
                    label="State"
                    variant="outlined"
                    error={Boolean(
                      sFormik.touched.state && sFormik.errors.state
                    )}
                    helperText={
                      (sFormik.touched.state && sFormik.errors.state) as any
                    }
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"Address Line 1"}
                fullWidth={true}
                required
                name="address1"
                onBlur={sFormik.handleBlur}
                onChange={sFormik.handleChange}
                value={sFormik.values.address1}
                error={Boolean(
                  sFormik.touched.address1 && sFormik.errors.address1
                )}
                helperText={
                  (sFormik.touched.address1 && sFormik.errors.address1) as any
                }
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label={"Address Line 2"}
                fullWidth={true}
                name="address2"
                value={sFormik.values.address2}
                onBlur={sFormik.handleBlur}
                onChange={sFormik.handleChange}
                error={Boolean(
                  sFormik.touched.address2 && sFormik.errors.address2
                )}
                helperText={
                  (sFormik.touched.address2 && sFormik.errors.address2) as any
                }
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Button
              disabled={sLoading || bLoading}
              variant="contained"
              onClick={() => {
                sFormik.handleSubmit();
                bFormik.handleSubmit();
              }}
              style={{ position: "absolute", bottom: "-5rem", right: "1px" }}
            >
              Update Address
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export { AddressPage };
