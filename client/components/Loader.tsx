import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  color,
  ...props
}) => {
  return (
    <div className="flex justify-center items-center" {...props}>
      <BiLoaderAlt
        className="animate-spin"
        size={24}
        color={color ? color : "gray"}
      />
    </div>
  );
};

export default Loader;
