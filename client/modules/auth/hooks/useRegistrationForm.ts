import { useApolloClient } from "@apollo/client";
import { omit } from "lodash";
import { toast } from "react-toastify";

import { useRegisterMutation } from "@graphql";
import { resetWebsocketConnection } from "@lib/apollo";
import AuthToken from "@lib/AuthToken";

import { useRouter } from "next/router";
import { registrationSchema } from "../schema";

export const useRegistrationForm = () => {
  const client = useApolloClient();
  const router = useRouter();

  const [registerMutation, { loading, error }] = useRegisterMutation({
    async onCompleted(registeredUser) {
      resetWebsocketConnection();

      AuthToken.set("accessToken", registeredUser?.register?.accessToken as string);
      AuthToken.set("refreshToken", registeredUser?.register?.refreshToken as string);

      toast.success("Registered successfully.");

      await client.resetStore();

      router.push("/");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleSubmit = (input: any) => {
    const sanitizedInput = registrationSchema.cast(input, {
      assert: false,
      stripUnknown: true,
    });

    return registerMutation({
      variables: {
        //@ts-expect-error
        input: omit(sanitizedInput, [
          "confirmPassword",
          "isTermsAccepted",
        ]),
      },
    }).catch(console.error);
  };

  return {
    initialValues: registrationSchema.cast({
      assert: false,
      stripUnknown: false,
    }),
    validationSchema: registrationSchema,
    loading,
    error,
    handleSubmit,
  };
};
