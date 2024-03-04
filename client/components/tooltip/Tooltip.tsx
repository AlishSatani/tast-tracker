import React from "react";
import {
  Tooltip as TWTooltip,
  type TooltipProps as Props,
} from "@material-tailwind/react";

export interface TooltipProps extends Omit<Props, "ref"> {
  isPointer?: boolean;
  pointerDirection?: "up" | "down" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  className,
  pointerDirection = "down",
  isPointer = true,
  ...props
}) => {
  let pointer =
    "after:content-[''] relative after:absolute after:h-0 after:w-0";
  const verticalPointer = `${pointer} after:border-l-4 after:border-r-4 after:left-1/2 after:-ml-1 after:border-r-transparent after:border-l-transparent`;
  const horizontalPointer = `${pointer} after:border-t-4 after:border-b-4 after:top-1/2 after:-mt-1 after:border-t-transparent after:border-b-transparent`;
  switch (pointerDirection) {
    case "down":
      pointer = `${verticalPointer} after:top-full after:border-t-[8px] after:border-b-0 after:border-t-grey-300`;
      break;

    case "up":
      pointer = `${verticalPointer} after:bottom-full after:border-b-[8px] after:border-t-0 after:border-b-grey-300`;
      break;

    case "left":
      pointer = `${horizontalPointer} after:right-full after:border-r-[8px] after:border-l-0 after:border-r-grey-300`;
      break;

    case "right":
      pointer = `${horizontalPointer} after:left-full after:border-l-[8px] after:border-r-0 after:border-l-grey-300`;
      break;
  }
  return (
    <TWTooltip
      offset={{
        mainAxis: 8,
      }}
      {...props}
      className={`${isPointer && pointer} ${className}`}
    />
  );
};

export default Tooltip;
