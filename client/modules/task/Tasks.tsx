import { Button, ConfirmDeleteButton } from "@components/button";
import { SearchInput } from "@components/input";
import { LayoutChildProps } from "@components/layout";
import { Modal } from "@components/modal";
import { SimplePagination } from "@components/pagination";
import { Table } from "@components/table";
import { TaskStatus } from "@graphql";
import { useModalForm } from "@lib/hooks";
import { IconButton, Typography } from "@material-tailwind/react";
import TaskForm from "@modules/task/TaskForm";
import { useDeleteTask } from "@modules/task/hooks/useDeleteTask";
import { useTasks } from "@modules/task/hooks/useTasks";
import React from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Column } from "react-table";

const getTaskStatus = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Completed:
      return "Completed";
    case TaskStatus.InProgress:
      return "In Progress";
    case TaskStatus.Todo:
      return "To Do";
    default:
      return "Unknown";
  }
};

const Tasks: React.FC<LayoutChildProps> = ({ currentUser }) => {
  const {
    tasks,
    refetch,
    loading,
    goNext,
    goPrev,
    pageInfo,
    handleSearch,
    keyword,
  } = useTasks();

  const { onCreateEdit, open, onClose, ...formProps } = useModalForm(refetch);

  const { deleteTask } = useDeleteTask(refetch);

  const adminOptions: Column<any>[] = [
    {
      Header: "actions",
      Cell: ({ row }) => (
        <div>
          <IconButton
            variant="text"
            onClick={() => onCreateEdit(row.original.id)}
            size="sm"
          >
            <FaEdit />
          </IconButton>
          <ConfirmDeleteButton
            onDelete={() => deleteTask(row.original.id)}
            size="sm"
          />
        </div>
      ),
    },
  ];

  const columns: Column<any>[] = [
    {
      Header: "Name",
      accessor: "name",
      id: "name",
    },
    {
      Header: "Description",
      accessor: "description",
      id: "description",
    },
    {
      Header: "Status",
      accessor: (task) => getTaskStatus(task.status),
      id: "status",
    },
    ...(currentUser?.isAdmin ? adminOptions : []),
  ];

  return (
    <div className="container py-7 w-full">
      <Typography
        variant="h4"
        className="flex items-center justify-between shadow-sm pb-4"
      >
        Tasks
        {currentUser?.isAdmin && (
          <Button size="sm" onClick={() => onCreateEdit()}>
            <div className="!flex !items-center gap-1">
              <FaPlus />
              Create
            </div>
          </Button>
        )}
      </Typography>
      <div className="grid grid-cols-5 my-4">
        <SearchInput
          value={keyword}
          className="col-span-1"
          onChange={handleSearch}
          onClear={() => handleSearch(undefined)}
        />
      </div>
      <Table data={tasks} columns={columns} loading={loading} />
      <SimplePagination pageInfo={pageInfo} goNext={goNext} goPrev={goPrev} />
      <Modal
        open={open}
        onClose={onClose}
        title={`${formProps.entityId ? "Edit" : "Create"} Task`}
        size="xs"
      >
        <TaskForm {...formProps} currentUser={currentUser} />
      </Modal>
    </div>
  );
};

export default Tasks;
