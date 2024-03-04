import React from "react";

import Error from "@components/Error";
import { AuthRestrict, Layout } from "@components/layout";

const Custom500: React.FC = () => {
  return (
    <Layout
      className="bg-grey-50"
      title="Page Not found"
      forbidWhen={AuthRestrict.NEVER}
      logoStyle="dark"
      isErrorPage
    >
      <Error
        errorCode="500"
        message="Internal Server Error"
        message2="Something went wrong!"
      />
    </Layout>
  );
};

export default Custom500;
