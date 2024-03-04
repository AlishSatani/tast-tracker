import React from "react";

const AuthContainer: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div className="w-full items-center 2xl:flex">
      <div className="container lg:flex justify-center pb-8 grow">
        <div className="auth-right-container">{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;
