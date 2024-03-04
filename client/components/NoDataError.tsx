import React from "react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

const NoDataError: React.FC<Props> = ({
  message = "No Record Found.",
  className,
  ...props
}) => {
  return (
    <div
      className={`h-full w-full text-center flex flex-col justify-center items-center ${className}`}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="mx-auto w-32"
        src="/static/images/icons/no-data-error.png"
        alt="no data"
      />
      <span className="text-small text-gray-500 capitalize">{message}</span>
    </div>
  );
};

export default NoDataError;
