import * as yup from "yup";

export const INITIAL_VALUE = {
  email: "",
  password: "",
};

export const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
