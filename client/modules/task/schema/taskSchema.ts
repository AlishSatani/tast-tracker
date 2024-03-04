import * as Yup from "yup";

export const taskSchema = Yup.object()
  .shape({
    id: Yup.string().nullable().default(null).ensure(),
    name: Yup.string().required().label("Name").ensure().min(2),
    description: Yup.string().label("Description").nullable().default(null).ensure(),
    userId: Yup.string().required().label("User").ensure(),
  })
  .required();
