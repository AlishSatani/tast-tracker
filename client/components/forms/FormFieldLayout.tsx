import { Field, FieldAttributes, FieldProps, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { Input } from "@components/input";
import ErrorMessage from "./ErrorMessage";

export interface FormFieldProps extends Partial<FieldAttributes<any>> {
  classes?: {
    field?: string;
    error?: string;
    grid?: string;
  };
}

const FormFieldLayout: React.FC<FormFieldProps> = ({
  name,
  type = "text",
  label,
  renderError,
  children,
  classes,
  ...props
}) => {
  const { isSubmitting, setFieldTouched } = useFormikContext();

  useEffect(() => {
    if (isSubmitting) {
      setFieldTouched(name, true);
    }
  }, [isSubmitting]);
  const ErrorComponent = renderError || ErrorMessage;

  return (
    <Field name={name}>
      {({ field, meta, ...formProps }: FieldProps<any>) => (
        <div>
          {!!children && typeof children === "function" ? (
            children({
              name,
              type,
              label,
              field,
              meta,
              classes,
              ...formProps,
              ...props,
            })
          ) : (
            <div className="bg-form-input">
              <Input
                {...props}
                id={name}
                type={type}
                label={label}
                className={classes?.field}
                {...field}
              />
            </div>
          )}
          <ErrorComponent meta={meta} className={classes?.error} />
        </div>
      )}
    </Field>
  );
};

export default FormFieldLayout;
