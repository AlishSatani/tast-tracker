import React from "react";

import { Button } from "@components/button";
import {
  AsyncSelectFormField,
  FormFieldLayout,
  FormLayout,
  FormTextArea,
} from "@components/forms";
import { LayoutChildProps } from "@components/layout";
import { useTaskForm } from "./hooks/useTaskForm";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
  entityId?: string;
  currentUser: LayoutChildProps["currentUser"];
}

const TaskForm: React.FC<Props> = ({
  onComplete,
  entityId,
  onCancel,
  currentUser,
}) => {
  const {
    validationSchema,
    initialValues,
    handleSubmit,
    loading,
    loadOptions,
    defaultUserOptionValue,
  } = useTaskForm(onComplete, currentUser, entityId);

  console.log("defaultUserOptionValue", defaultUserOptionValue);

  return (
    <FormLayout
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(props) => (
        <form
          onSubmit={props.handleSubmit}
          className="flex flex-col gap-2 w-full"
        >
          <FormFieldLayout name="name" label="Name" />
          <AsyncSelectFormField
            id="taskUser"
            name="userId"
            label="User"
            placeholder="assign user"
            className="!border-none"
            loadOptions={loadOptions}
            defaultValue={defaultUserOptionValue}
          />
          <FormTextArea
            name="description"
            label="Description"
            className="!bg-blue-600/10"
          />
          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              type="button"
              variant="outlined"
              disabled={props.isSubmitting || loading}
              onClick={onCancel}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={props.isSubmitting || loading}
              disabled={props.isSubmitting || loading}
              size="sm"
              className="border border-theme"
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </FormLayout>
  );
};

export default TaskForm;
