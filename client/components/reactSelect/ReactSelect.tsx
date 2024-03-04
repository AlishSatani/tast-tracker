import { isArray, isUndefined, map } from "lodash";
import React from "react";
import Select, { type Props } from "react-select";
import { customStyles } from "./selectStyles";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<Props, "onChange"> {
  onChange?: Function;
}

export const handleSelectChange = (
  values: SelectOption[] | SelectOption,
  isMulti: boolean = false
) => {
  if (isUndefined(values) || !values) {
    return values;
  }

  if (isMulti && isArray(values)) {
    return map(values, "value");
  }
  const { value: singleValue } = values as SelectOption;
  return singleValue;
};

const ReactSelect: React.FC<SelectProps> = ({ onChange, ...props }) => {
  return (
    <Select
      styles={customStyles}
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      onChange={(value: any) =>
        onChange && onChange(handleSelectChange(value, props?.isMulti))
      }
      menuPosition="fixed"
      {...props}
    />
  );
};

export default ReactSelect;
