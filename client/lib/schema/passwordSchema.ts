import { passwordRegex } from "constants/regex";
import { ref, string } from "yup";

export const passwordSchema = string()
  .ensure()
  .matches(
    passwordRegex,
    "Password should contain at least one upper case, one small case, one number and minimum 10 characters."
  )
  .label("Password")
  .min(10, "Password should be of minimum 10 characters length.");

export const confirmPasswordSchema = string()
  .ensure()
  .label("Confirm Password")
  .oneOf([ref("password")], "Password and Confirm Password does not match.");
