import React from "react";
import { Input } from "@components/input";
import { BsSearch } from "react-icons/bs";
import { InputProps } from "@material-tailwind/react";
import { Button } from "@components/button";

interface Props extends InputProps {
  onClear: () => void;
}

const SearchInput: React.FC<Props> = (props) => {
  return (
    <div className={`relative flex w-full max-w-[24rem] ${props.className}`}>
      <Input
        type="search"
        label="Search..."
        icon={!props?.value && <BsSearch />}
        {...props}
        value={props?.value ? props?.value : ""}
      />
      {props?.value && (
        <Button className="close-btn" onClick={() => props.onClear()}>
          X
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
