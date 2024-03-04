import React from "react";

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  src?: string | null;
  alt?: string | null;
}

const Image: React.FC<Props> = ({ src, alt, ...props }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || "/static/images/logo/android-chrome-512x512.png"}
      alt={alt || "img-default"}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = "/static/images/logo/android-chrome-512x512.png";
      }}
      {...props}
    />
  );
};

export default Image;
