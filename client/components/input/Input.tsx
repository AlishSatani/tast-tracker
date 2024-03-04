import React from "react";
import { Input as TWInput } from "@material-tailwind/react";
import type { InputProps as TWInputProps } from "@material-tailwind/react";

export interface InputProps extends Omit<TWInputProps, "ref"> {}

const Input: React.FC<InputProps> = (props) => <TWInput {...props} />;

export default Input;
