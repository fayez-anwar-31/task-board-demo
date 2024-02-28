import { TaskStatus } from '../../enum';

export const getAllButtons = (
  setStatusHandler: (id: string, newStatus: TaskStatus) => void,
  taskEditOptionHandler: (id: string) => void,
  taskDeleteHandler: (id: string) => void
) => {
  const moveToPending = {
    label: 'Move to Pending',
    onClick: (id: string) => setStatusHandler(id, TaskStatus.Pending),
  };
  const moveToActive = {
    label: 'Move to Active',
    onClick: (id: string) => setStatusHandler(id, TaskStatus.Active),
  };
  const moveToCompleted = {
    label: 'Move to Completed',
    onClick: (id: string) => setStatusHandler(id, TaskStatus.Completed),
  };
  const editButton = {
    label: 'Edit',
    onClick: (id: string) => taskEditOptionHandler(id),
  };
  const deleteButton = {
    label: 'Delete',
    onClick: (id: string) => taskDeleteHandler(id),
  };

  return [
    moveToPending,
    moveToActive,
    moveToCompleted,
    editButton,
    deleteButton,
  ];
};
