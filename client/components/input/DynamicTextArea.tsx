import { HTMLAttributes, useEffect, useState } from "react";

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  maxRows: number;
  minRows: number;
  value: string;
  readOnly?: boolean;
}

const DynamicTextArea: React.FC<TextAreaProps> = ({
  maxRows,
  minRows,
  value,
  readOnly,
  ...props
}) => {
  const [rows, setRows] = useState(minRows);

  useEffect(() => {
    const values = value.split("\n");

    if (minRows <= values.length && values.length <= maxRows) {
      setRows(values.length);
    }
  }, [value]);

  return <textarea rows={rows} value={value} readOnly={readOnly} {...props} />;
};

export default DynamicTextArea;
