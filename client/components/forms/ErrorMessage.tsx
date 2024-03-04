import React from "react";

import { FieldProps } from "formik";

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    FieldProps<any> {}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ meta, ...props }) =>
  meta?.touched && meta?.error ? (
    <div
      {...props}
      className={`!text-left text-red-500 text-xs m-1 ${props.className}`}
    >
      {meta?.error}
    </div>
  ) : (
    <></>
  );

export default ErrorMessage;
