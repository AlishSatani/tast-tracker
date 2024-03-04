import { uniqBy } from "lodash";
import React, { useState } from "react";
import AsyncSelect, { AsyncProps } from "react-select/async";
import { handleSelectChange } from "./ReactSelect";
import { customStyles } from "./selectStyles";

export interface AsyncSelectProps
  extends Omit<AsyncProps<unknown, boolean, any>, "onChange"> {
  onChange?: Function;
}
export const formatValue = (
  value: any,
  isMulti: boolean = false,
  options: any
) => {
  if (isMulti) {
    return options?.filter((d: any) => (value || []).includes(d?.value));
  } else {
    return options?.find((d: any) => (!d?.options && d?.value) === value);
  }
};
const AsyncReactSelect: React.FC<AsyncSelectProps> = ({
  onChange,
  styles,
  ...props
}) => {
  const propOptions = props?.options?.filter((d) => !!d);
  const [options, setOptions] = useState(propOptions || []);

  const value = formatValue(
    props?.value,
    props?.isMulti,
    options?.length ? options : propOptions
  );

  return (
    <AsyncSelect
      cacheOptions
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      onChange={(value: any) => {
        setOptions(
          uniqBy(
            props?.isMulti ? [...options, ...value] : [...options, value],
            "value"
          )
        );

        onChange &&
          onChange(handleSelectChange(value, props.isMulti), value?.label);
      }}
      {...props}
      styles={styles ? styles : customStyles}
      value={value}
      menuPosition="fixed"
    />
  );
};

export default AsyncReactSelect;
