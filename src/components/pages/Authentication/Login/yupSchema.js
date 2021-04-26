import * as yup from "yup";

export const schema = yup.object().shape({
  phone: yup
    .string()
    .required("Please enter phone")
    .matches(/^[0-9].{9,10}$/, "Please enter a valid phone")
    .trim(),
  password: yup
    .string()
    .required("Please enter password"),
  // .matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,40})/, "Please enter a valid slug"),
});
