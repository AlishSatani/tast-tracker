import React from "react";
import { AuthRestrict, Layout } from "@components/layout";
import { Login, AuthContainer } from "@modules/auth";

const Page: React.FC = () => {
  return (
    <Layout
      forbidWhen={AuthRestrict.LOGGED_IN}
      className="auth-layout"
      title="Login"
    >
      <AuthContainer>
        <Login />
      </AuthContainer>
    </Layout>
  );
};

export default Page;
