import React from "react";

import { ApolloError, QueryResult } from "@apollo/client";
import Head from "next/head";

import Loader from "@components/Loader";
import Header from "@components/layout/Header";
import Redirect from "@components/layout/Redirect";
import {
  Layout_QueryFragment,
  Layout_UserFragment,
  useLayoutQuery,
} from "@graphql";
import { lang } from "constants/lang";
import { Slide, ToastContainer, ToastOptions } from "react-toastify";

export interface LayoutChildProps {
  error?: ApolloError | Error;
  loading?: boolean;
  currentUser?: Layout_UserFragment | null;
}

export enum AuthRestrict {
  NEVER = 0,
  LOGGED_OUT = 1 << 0,
  LOGGED_IN = 1 << 1,
  NOT_VERIFIED = 1 << 2,
  NOT_ADMIN = 1 << 3,
  NOT_ACTIVE = 1 << 4,
}

export interface LayoutProps {
  query?: Pick<
    QueryResult<Layout_QueryFragment>,
    "data" | "loading" | "error" | "networkStatus" | "client" | "refetch"
  >;
  title?: string;
  children:
    | React.ReactNode
    | ((props: LayoutChildProps) => React.ReactNode)
    | Function;
  forbidWhen?: AuthRestrict;
  className?: string;
  hideFooter?: boolean;
  isGuestHeader?: boolean;
  logoStyle?: "dark" | "light";
  isErrorPage?: boolean;
}
//TODO: below function will be used to sync user's updated data after fixing ws proxy

export function Layout({
  forbidWhen = AuthRestrict.LOGGED_OUT,
  children,
  title,
  className,
  logoStyle,
  isGuestHeader = false,
}: LayoutProps) {
  const { data, loading, error } = useLayoutQuery();

  const currentUser = data?.currentUser;

  const forbidsLoggedOut = forbidWhen & AuthRestrict.LOGGED_OUT;

  const notLogged = !currentUser && forbidsLoggedOut;

  const toastOptions: ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    transition: Slide,
    rtl: false,
    closeButton: false,
  };

  const renderChildren = (props: LayoutChildProps) => {
    const inner = typeof children === "function" ? children(props) : children;

    if (!loading && notLogged) {
      return <Redirect path={notLogged ? "/login" : "/"} />;
    }

    return inner;
  };

  return (
    <main
      className={`flex min-h-screen flex-col justify-items-stretch ${className}`}
    >
      <Head>
        <title>
          {title ? `${title} — ${lang.projectName}` : lang.projectName}
        </title>

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1, minimum-scale=1,scalesPageToFit={false}"
        />
      </Head>
      <Header
        currentUser={currentUser}
        isGuestHeader={isGuestHeader || !currentUser}
        logoStyle={logoStyle}
      />
      <ToastContainer
        className="toast-notification !mb-5"
        toastClassName="!m-0 !py-0"
        bodyClassName="!py-0"
        {...toastOptions}
      />
      <article className="grow flex">
        {loading ? (
          <Loader className="flex grow items-center justify-center" />
        ) : (
          renderChildren({
            error,
            loading,
            currentUser: currentUser,
          })
        )}
      </article>
    </main>
  );
}
