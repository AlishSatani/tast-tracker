import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavLinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
  activeClass?: string;
  notExact?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  className,
  activeClass = "text-theme",
  notExact,
  ...props
}) => {
  const router = useRouter();
  const isActive =
    router?.asPath === href || (notExact && router.asPath.includes(href));
  return (
    <Link href={href} passHref>
      <a
        className={`${className || ""} ${isActive ? activeClass : ""} `}
        {...props}
      /> 
    </Link>
  );
};

export default NavLink;
