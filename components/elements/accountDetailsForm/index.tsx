import {
  Button,
  Grid,
  MenuItem,
  TextField,
  useStepContext,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useForceUpdate } from "@react-spring/shared";
import { useFormik } from "formik";
import { updateProfile } from "../../../lib";

const initialData = {
  name: "",
  phone: "",
  email: "",
};
const AccountDetailsForm: React.FC = () => {
  const { user, fetchUser, accessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
    },
    enableReinitialize: true,
    onSubmit: async (e: any) => {
    //   setLoading(true);
    //   try {
    //     const response = await updateProfile(e, user?.id);
    //     if(response){
    //         fetchUser(user?.id, accessToken?.access_token as string);
    //     }
    //   } catch (e) {
    //   } finally {
    //     setLoading(false);
    //   }
    },
  });
  return (
    <Grid
      container
      columnGap={4}
      rowGap={4}
      marginTop={3}
      justifyContent={"space-between"}
    >
      <Grid item sm={6}>
        <TextField
          label={"Full Name"}
          required
          fullWidth={true}
          name="name"
          variant="outlined"
          size="medium"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && (formik.errors.name as any)}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          label={"Phone Number"}
          fullWidth={true}
          required
          variant="outlined"
          size="medium"
          name={"phone"}
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={Boolean(formik.touched.phone && formik.errors.phone)}
          helperText={formik.touched.phone && (formik.errors.phone as any)}
          InputLabelProps={{shrink: true}}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          label={"Email"}
          fullWidth={true}
          disabled={true}
          required
          variant="outlined"
          size="medium"
          name={"phone"}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && (formik.errors.email as any)}
          InputLabelProps={{shrink: true}}
        />
      </Grid>
      <Grid item sm={6} justifyContent={"end"} container>
        <Button
          variant="contained"
          disabled={loading}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Update User
        </Button>
      </Grid>
    </Grid>
  );
};
export { AccountDetailsForm };
