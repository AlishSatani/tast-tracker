import { ReactSelect, SelectProps } from "@components/reactSelect";
import React from "react";
import FormFieldLayout, { FormFieldProps } from "./FormFieldLayout";

interface Props extends FormFieldProps, SelectProps {}

export const formatValue = (
  value: any,
  options: any,
  isMulti: boolean = false
) => {
  if (isMulti) {
    return (value || [])?.map((id: string) =>
      options?.find((d: any) => d?.value === id)
    );
  } else {
    return options?.find((d: any) => d?.value === value);
  }
};

const ReactSelectFormField: React.FC<Props> = ({ name, label, ...props }) => {
  return (
    <FormFieldLayout name={name} label={label}>
      {({ field, form }: FormFieldProps) => {
        const value = formatValue(field?.value, props?.options, props?.isMulti);
        return (
          <ReactSelect
            {...props}
            value={value}
            onChange={(value: any) => {
              form?.setFieldValue(field.name, value);
              if (props?.onChange) props?.onChange();
            }}
            onBlur={() => form.setFieldTouched(field.name)}
          />
        );
      }}
    </FormFieldLayout>
  );
};

export default ReactSelectFormField;
