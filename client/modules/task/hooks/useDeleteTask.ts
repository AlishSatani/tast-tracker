import { useDeleteTaskMutation } from "@graphql";
import { toast } from "react-toastify";

export const useDeleteTask = (onCompleted?: (data?: any) => void) => {
  const [deleteTaskMutation, { loading, error }] = useDeleteTaskMutation({
    onCompleted() {
      toast.success("Channel deleted successfully.");
      onCompleted && onCompleted();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const deleteTask = (id: string) => {
    return deleteTaskMutation({
      variables: {
        id,
      },
    });
  };
  return {
    deleteTask,
    loading,
    error,
  };
};
