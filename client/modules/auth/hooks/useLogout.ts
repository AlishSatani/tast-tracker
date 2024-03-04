import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useLogoutMutation } from "@graphql";
import AuthToken from "@lib/AuthToken";

export const useLogout = (callback?: Function) => {
  const router = useRouter();
  const client = useApolloClient();

  const [logoutMutation, { loading, error }] = useLogoutMutation({
    onCompleted() {
      toast.success("You have logged out.");
      if (callback) {
        callback();
      }

      AuthToken.remove("accessToken");
      AuthToken.remove("refreshToken");

      client.resetStore();
      router.push("/login");
    },
  });

  const logout = async () => {
    logoutMutation();
  };

  return {
    loading,
    error,
    logout,
  };
};
