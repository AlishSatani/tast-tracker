import { Layout_UserFragment, useCreateTaskMutation, useUpdateTaskMutation } from "@graphql";
import { omit } from "lodash";
import { toast } from "react-toastify";
import { taskSchema } from "../schema";
import { useTask } from "./useTask";
import { useUserOptions } from "./useUserOptions";
import { LayoutChildProps } from "@components/layout";

export const useTaskForm = (callback: (data?: any) => void, currentUser: LayoutChildProps["currentUser"], id?: string) => {
  const { task } = useTask(id);

  const [createTask, { loading: createLoading, error: createErrors }] =
    useCreateTaskMutation({
      onCompleted() {
        toast.success("Task created successfully.");
        callback();
      },
      onError(error) {
        toast.error(error.message);
      },
    });

  const [updateTask, { loading: updateLoading, error: updateErrors }] =
    useUpdateTaskMutation({
      onCompleted() {
        toast.success("Task updated successfully.");
        callback();
      },
      onError(error) {
        toast.error(error.message);
      },
    });

  const {
    loadOptions,
    loading: UserOptionsLoading,
  } = useUserOptions(currentUser);

  const initialValues = taskSchema.cast(
    task,
    {
      stripUnknown: true,
      assert: false,
    }
  );

  const handleSubmit = async (input: any) => {
    const sanitizedInput = taskSchema.cast(input, {
      assert: false,
      stripUnknown: true,
    });

    if (sanitizedInput?.id) {
      return updateTask({
        variables: {
          id: sanitizedInput?.id,
          task: omit(sanitizedInput, "id"),
        },
      });
    } else {
      return createTask({
        variables: {
          task: sanitizedInput,
        },
      });
    }
  };

  return {
    initialValues: initialValues,
    validationSchema: taskSchema,
    handleSubmit,
    loading: createLoading || updateLoading,
    error: createErrors || updateErrors,
    loadOptions,
    UserOptionsLoading,
    defaultUserOptionValue: {
      value: task?.userId,
      label: task?.user?.name,
    }
  };
};
