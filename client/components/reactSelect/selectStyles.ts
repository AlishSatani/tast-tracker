export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    background: "#F1F3FC",
    borderRadius: "8px",
    border: "1px solid rgba(20, 62, 224, 0.5)",
    width: "100%",
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
};

export const authStyles = {
  control: (provided: any, state: any) => ({
    background: "#F1F3FC",
    borderRadius: "10px",
    border: state.isFocused ? "1px solid #163EE1" : "1px solid #9EA6AF",
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: "3px",
    paddingBottom: "3px",
  }),

  input: (provided: any) => ({
    ...provided,
    caretColor: "#163EE1",
    fontSize: "18px",
    fontFamily: "Rubik",
    color: "rgba(0, 0, 0, 0.36)",
    fontWeight: 400,
    textTransform: "capitalize",
  }),

  option: (provided: any) => ({
    ...provided,
    borderBottomWidth: "1px",
    borderColor: "rgba(0, 0, 0, 0.15)",
    color: "rgba(0, 0, 0, 0.36)",
    fontSize: "16px",
    fontWeight: 400,
    fontFamily: "Rubik",
    padding: "8px",
    backgroundColor: "rgba(217, 217, 217, 0.05)",
    ":hover": {
      backgroundColor: "transparent",
      color: "#163EE1",
    },
    ":last-child": {
      borderBottom: "none",
    },
  }),

  menuList: (provided: any) => ({
    ...provided,
    textAlign: "left",
    padding: "8px 8px 8px 8px",
    textTransform: "capitalize",
  }),

  menu: (provided: any) => ({
    ...provided,
    borderRadius: "10px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
  }),

  placeholder: (provided: any) => ({
    ...provided,
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "18px",
    fontWeight: 400,
    fontFamily: "Rubik",
    color: "rgba(0, 0, 0, 0.36)",
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    textAlign: "left",
  }),

  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),

  dropdownIndicator: () => ({
    color: "transparent",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

export const connectionsStyles = {
  control: (provided: any) => ({
    ...provided,
    background: "#F1F3FC",
    borderRadius: "10px",
    border: "none",
    width: "100%",
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#000000",
    background: "transparent",
    fontSize: "14px",
  }),
  multiValueRemove: () => ({
    color: "#000000",
    background: "transparent",
    ":hover": {
      color: "#000000",
      background: "transparent",
    },
  }),
};

export const postMultiStyles = {
  control: () => ({
    background: "#F1F3FC",
    borderRadius: "10px",
    border: "none",
    display: "flex",
    padding: "4px 10px",
  }),
  dropdownIndicator: () => ({
    color: "blue",
    paddingRight: "8px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  multiValue: (provided: any) => ({
    ...provided,
    color: "#163EE1",
    background: "transparent",
    border: "1px solid #163EE1",
    borderRadius: "30px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#163EE1",
    background: "transparent",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#163EE1",
    background: "transparent",
    ":hover": {
      color: "#163EE1",
      background: "transparent",
    },
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
};

export const postSingleStyles = {
  control: () => ({
    background: "#F1F3FC",
    borderRadius: "10px",
    border: "none",
    display: "flex",
    padding: "8px 10px",
  }),
  dropdownIndicator: () => ({
    color: "blue",
    paddingRight: "8px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
};

export const inviteHostMultiStyles = {
  control: () => ({
    background: "#F1F3FC",
    borderRadius: "10px",
    border: "none",
    display: "flex",
    padding: "4px 10px",
  }),
  clearIndicator: () => ({
    margin: "8px",
  }),
  dropdownIndicator: () => ({
    color: "#7B7B7B",
    padding: "8px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  multiValue: (provided: any) => ({
    ...provided,
    color: "#7B7B7B",
    background: "#FFFFFF",
    borderRadius: "5px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#7B7B7B",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "7B7B7B",
    background: "transparent",
    ":hover": {
      color: "7B7B7B",
      background: "transparent",
    },
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
};

export const searchStyles = {
  control: (provided: any) => ({
    ...provided,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    borderRadius: "8px",
    width: "100%",
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
    marginTop: "3px",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

export const teamStyles = {
  control: () => ({
    background: "#F1F3FC",
    borderRadius: "10px",
    border: "none",
    display: "flex",
    padding: "2px",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }),
  clearIndicator: () => ({
    margin: "8px",
  }),
  dropdownIndicator: () => ({
    color: "#7B7B7B",
    padding: "8px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  multiValue: (provided: any) => ({
    ...provided,
    color: "#7B7B7B",
    background: "#FFFFFF",
    borderRadius: "5px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#7B7B7B",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "7B7B7B",
    background: "transparent",
    ":hover": {
      color: "7B7B7B",
      background: "transparent",
    },
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
};
