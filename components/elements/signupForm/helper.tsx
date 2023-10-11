import * as yup from "yup";

export const INITIAL_VALUE = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  role_id: "",
  faculty_id: "",
};

export const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  role_id: yup.string().required("Role is required"),
  faculty_id: yup.string().required("Role is required"),
});
