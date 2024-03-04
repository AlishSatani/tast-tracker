import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React from "react";

import { useLogout } from "@modules/auth/hooks";
import { BiLogOut } from "react-icons/bi";
import { LayoutChildProps } from "../Layout";

const ProfileMenu: React.FC<LayoutChildProps> = ({ currentUser }) => {
  const { logout } = useLogout();

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <div className="focus-visible:outline-none cursor-pointer">
          {currentUser?.name}
        </div>
      </MenuHandler>
      <MenuList>
        <MenuItem className="hover:text-theme ">
          <label
            className="drop-menu cursor-pointer text-sm font-thin"
            onClick={logout}
          >
            <BiLogOut />
            Log Out
          </label>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
