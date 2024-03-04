import React from "react";
import { Button as TWButton } from "@material-tailwind/react/";
import type { ButtonProps as TWButtonProps } from "@material-tailwind/react";
import Loader from "@components/Loader";

export interface ButtonProps extends Omit<TWButtonProps, "ref"> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, className, ...props }) => {
  return (
    <TWButton {...props} className={`relative ${className}`}>
      <span className={loading ? "invisible" : "visible w-full"}>
        {props?.children}
      </span>
      <Loader
        className={`${
          loading ? "visible" : "invisible"
        } absolute bottom-1/2 right-1/2 translate-y-2/4 translate-x-2/4`}
      />
    </TWButton>
  );
};

export default Button;
