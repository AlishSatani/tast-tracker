import { NextPage } from "next";

import Error from "@components/Error";
import { AuthRestrict, Layout } from "@components/layout";

const ErrorPage: NextPage = () => {
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

export default ErrorPage;
