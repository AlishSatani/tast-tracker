import {
  AsyncReactSelect,
  type AsyncSelectProps,
} from "@components/reactSelect";
import FormFieldLayout, { FormFieldProps } from "./FormFieldLayout";
import React from "react";
interface Props extends FormFieldProps, AsyncSelectProps {}

const AsyncSelectFormField: React.FC<Props> = ({ name, label, ...props }) => {
  return (
    <FormFieldLayout name={name} label={label}>
      {({ field, form }: FormFieldProps) => {
        return (
          <AsyncReactSelect
            {...props}
            defaultOptions
            value={field?.value}
            onChange={(value: any) => form.setFieldValue(field.name, value)}
            onBlur={() => form.setFieldTouched(field.name)}
          />
        );
      }}
    </FormFieldLayout>
  );
};

export default AsyncSelectFormField;
