import React, { useState } from "react";

import {
  IconButton,
  IconButtonProps,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";

import Button from "./Button";
interface Props extends Partial<Omit<IconButtonProps, "ref">> {
  onDelete: Function;
  message?: string | JSX.Element;
  children?: React.ReactNode;
  onClose?: Function;
}
const ConfirmDeleteButton: React.FC<Props> = ({
  onDelete,
  message,
  children,
  onClose,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const placement =
    typeof window !== "undefined" && window.innerWidth < 640
      ? "bottom-end"
      : "right";

  return (
    <Popover open={open} handler={setOpen} placement={placement}>
      <PopoverHandler>
        {children || (
          <IconButton variant="text" size="sm" className="p-1" {...props}>
            <FaTrash />
          </IconButton>
        )}
      </PopoverHandler>
      <PopoverContent className="popover z-[9999] max-w-sm">
        <div className="flex truncate items-center justify-between">
          <span className="text-base !text-grey-700 !font-medium">Confirm</span>
          <IconButton
            variant="text"
            size="sm"
            onClick={() => {
              setOpen(false);
              onClose && onClose();
            }}
            className="focus-visible:outline-none"
          >
            <RiCloseFill className="text-lg" />
          </IconButton>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-base font-normal shrink-0">
            {!!message ? message : "Are you sure you want to delete?"}
          </span>
          <Button
            size="sm"
            variant="filled"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="capitalize w-fit self-end !font-normal"
          >
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ConfirmDeleteButton;
