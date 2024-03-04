import { TextArea } from "@components/input";
import { FieldAttributes } from "formik";
import React from "react";
import FormFieldLayout, { FormFieldProps } from "./FormFieldLayout";

interface Props extends Partial<FieldAttributes<any>> {
  label?: string;
  rows?: number;
  renderError?: boolean;
}

const FormTextArea: React.FC<Props> = ({ name, label, rows, ...props }) => {
  return (
    <FormFieldLayout name={name} {...props}>
      {({ field }: FormFieldProps) => (
        <TextArea {...props} label={label} rows={rows} {...field} />
      )}
    </FormFieldLayout>
  );
};
export default FormTextArea;
