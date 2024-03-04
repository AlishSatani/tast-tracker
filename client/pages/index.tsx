import { Layout } from "@components/layout";
import { Tasks } from "@modules/task";
import React from "react";

const IndexPage: React.FC = () => {
  return (
    <Layout>{({ currentUser }) => <Tasks currentUser={currentUser} />}</Layout>
  );
};

export default IndexPage;
