import * as Yup from "yup";

import { confirmPasswordSchema, passwordSchema } from "@lib/schema";

export const registrationSchema = Yup.object({
  name: Yup.string()
    .ensure()
    .required()
    .label("First Name")
    .min(2, "Name cannot be less than 2 characters.")
    .max(40, "Name cannot exceed 24 characters.")
    .default("")
    .trim(),
  email: Yup.string()
    .email("Enter a valid email.")
    .ensure()
    .required()
    .label("Email")
    .default("")
    .trim(),
  password: passwordSchema.required(),
  confirmPassword: confirmPasswordSchema.required(),
}).required();
