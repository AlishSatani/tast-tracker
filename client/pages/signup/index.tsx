import React from "react";
import { AuthRestrict, Layout } from "@components/layout";
import { SignUp, AuthContainer } from "@modules/auth";

const Page = () => {
  return (
    <Layout forbidWhen={AuthRestrict.LOGGED_IN} className="auth-layout">
      <AuthContainer>
        <SignUp />
      </AuthContainer>
    </Layout>
  );
};

export default Page;
