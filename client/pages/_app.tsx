import { ApolloClient, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-tailwind/react";
import moment from "moment-timezone";
import { AppProps } from "next/app";

import { theme } from "@components/themes";
import { withApollo } from "@lib/apollo";

import "@styles/style.css";
import { ContentProvider } from "@lib/providers";

moment.tz.setDefault("Asia/Singapore");

const App = ({
  Component,
  pageProps,
  apollo,
}: AppProps & { apollo: ApolloClient<any> }) => {
  return (
    <ContentProvider>
      <ApolloProvider client={apollo}>
        <ThemeProvider value={theme as any}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </ContentProvider>
  );
};

export default withApollo(App);
