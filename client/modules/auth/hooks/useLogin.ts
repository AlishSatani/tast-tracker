import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useLoginMutation } from "@graphql";
import { resetWebsocketConnection } from "@lib/apollo";
import AuthToken from "@lib/AuthToken";

import { loginSchema } from "../schema";

export const useLogin = () => {
  const client = useApolloClient();
  const router = useRouter();
  const [loginMutation, { loading, error }] = useLoginMutation({
    onCompleted(loggedUser) {
      resetWebsocketConnection();
      client.resetStore();

      AuthToken.set("accessToken", loggedUser?.login?.accessToken as string);
      AuthToken.set("refreshToken", loggedUser?.login?.refreshToken as string);

      toast.success("Login successful.");

      router.push("/");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleSubmit = (input: any) => {
    const sanitizeInput = loginSchema.cast(input, {
      assert: false,
      stripUnknown: true,
    });
    return loginMutation({
      variables: {
        input: sanitizeInput,
      },
    }).catch(console.error);
  };

  return {
    initialValues: loginSchema.cast({}, { assert: false, stripUnknown: false }),
    validationSchema: loginSchema,
    loading,
    error,
    handleSubmit,
  };
};
