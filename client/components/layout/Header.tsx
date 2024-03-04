import React from "react";

import { useRouter } from "next/router";

import { NavLink } from "@components/navLink";
import { LayoutChildProps } from "./Layout";
import { ProfileMenu } from "./navigation";

const Header: React.FC<
  Partial<LayoutChildProps> & {
    isGuestHeader?: boolean;
    logoStyle?: "dark" | "light";
  }
> = ({ currentUser, isGuestHeader, logoStyle }) => {
  const router = useRouter();

  const headerClass = isGuestHeader
    ? "items-center my-4"
    : "bg-neutral-50 drop-shadow-lg";
  const logoMode = logoStyle || (isGuestHeader ? "light" : "dark");
  return (
    <header className={headerClass}>
      <div className="header-main">
        <div>Task Tracker</div>
        {!currentUser && isGuestHeader && (
          <div className="flex shrink-0 items-center">
            {router.asPath === "/signup" ? (
              <NavLink href="/login" className="header-btn">
                Log In
              </NavLink>
            ) : (
              <NavLink href="/signup" className="header-btn">
                Sign Up
              </NavLink>
            )}
          </div>
        )}
        {!isGuestHeader && !!currentUser && (
          <div className="grow flex gap-1 sm:gap-6 items-center justify-end max-w-sm">
            <div className="shrink-0 grow-0">
              <ProfileMenu currentUser={currentUser} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
