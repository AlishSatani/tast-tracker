import React, { InputHTMLAttributes } from "react";
import { NavLink } from "@components/navLink";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  theme?: string;
}

const Logo: React.FC<Props> = ({ theme }) => {
  const src =
    theme === "dark"
      ? "/static/images/logo/logo-dark.svg"
      : "/static/images/logo/logo-light.svg";

  return (
    <NavLink href="/" className="logo">
      <img alt="Logo" src={src} />
    </NavLink>
  );
};

export default Logo;
