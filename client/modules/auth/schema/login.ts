import { object, string } from "yup";

export const loginSchema = object({
  email:
    string()
      .email("Enter a valid email.")
      .ensure()
      .required()
      .label("Email")
      .default("")
      .trim(),
  password: string().ensure().required().label("Password"),
}).required();
