
import { LayoutChildProps } from "@components/layout";
import { SelectOption } from "@components/reactSelect";
import {
  Lite_UserFragment,
  useUserOptionsQuery
} from "@graphql";

const getUserOptions: (user: Lite_UserFragment) => SelectOption = (
  user
) => {
  return {
    value: user?.id,
    label: user?.name || "",
  };
};

export const useUserOptions = (currentUser: LayoutChildProps["currentUser"]) => {
  const userId = currentUser?.id;

  const { data, refetch, loading } = useUserOptionsQuery({
    variables: {
      first: 10,
      userId,
    },
    skip: !userId,
  });

  const searchUsers = async (term: string) => {
    const { data } = await refetch({
      term,
    });
    return (data?.users?.nodes || []).map(getUserOptions);
  };

  const loadOptions = async (inputValue: string) => {
    const users = await searchUsers(inputValue);
    return users;
  };

  return {
    userOptions: (data?.users?.nodes || []).map(getUserOptions),
    loadOptions,
    loading,
    refetch,
  };
};
