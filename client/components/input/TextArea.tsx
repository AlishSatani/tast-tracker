import React from "react";
import { Textarea as TWTextarea } from "@material-tailwind/react";
import type { TextareaProps as TWTextareaProps } from "@material-tailwind/react";

export interface TextareaProps extends Omit<TWTextareaProps, "ref"> {}

const Textarea: React.FC<TextareaProps> = (props) => <TWTextarea {...props} />;

export default Textarea;
