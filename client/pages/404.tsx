import React from "react";

import Error from "@components/Error";
import { AuthRestrict, Layout } from "@components/layout";

const Custom404: React.FC = () => {
  return (
    <Layout
      className="bg-grey-50"
      title="Page Not found"
      forbidWhen={AuthRestrict.NEVER}
      logoStyle="dark"
      isErrorPage
    >
      <Error />
    </Layout>
  );
};

export default Custom404;
