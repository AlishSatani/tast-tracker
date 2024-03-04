import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogProps,
  IconButton,
} from "@material-tailwind/react";
import { RiCloseFill } from "react-icons/ri";

interface Props extends Omit<DialogProps, "handler" | "ref"> {
  title?: string;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({
  children,
  title,
  size,
  open,
  onClose,
  ...props
}) => {
  return (
    <Dialog
      open={open}
      size={size||"sm"}
      dismiss={{
        enabled: false,
      }}
      handler={onClose}
      {...props}
    >
      <DialogHeader className="truncate justify-between !p-2 md:!px-4 !text-xl md:!text-2xl">
        {title}
        <IconButton variant="text" size="sm" onClick={onClose}>
          <RiCloseFill className="w-6 h-6" />
        </IconButton>
      </DialogHeader>
      <DialogBody divider>{children}</DialogBody>
    </Dialog>
  );
};

export default Modal;
