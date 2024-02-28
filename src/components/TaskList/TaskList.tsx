import React, { useRef } from 'react';
import { getAllButtons } from './buttons';
import TaskItem from '../TaskItem/TaskItem';
import { TaskStatus } from '../../enum';
import { TaskItemType, TaskButtons } from '../../types';
import './TaskList.css';
import { Tooltip } from 'antd';
import { SvgDelete } from '../util/svg';

const TaskList = (props: {
  elemStatus: TaskStatus;
  tasks: TaskItemType[];
  funcsWrapper: {
    taskDeleteHandler: (id: string) => void;
    taskEditOptionHandler: (id: string) => void;
    clearTasks: (status: TaskStatus) => void;
    setStatusHandler: (id: string, newStatus: TaskStatus) => void;
    handleOnDropDelete: (e: React.DragEvent<HTMLDivElement>) => void;
  };
}) => {
  const { elemStatus, tasks } = props;

  const {
    taskDeleteHandler,
    taskEditOptionHandler,
    clearTasks,
    setStatusHandler,
    handleOnDropDelete,
  } = props.funcsWrapper;

  const ref = useRef<any>(null);

  const [
    moveToPending,
    moveToActive,
    moveToCompleted,
    editButton,
    deleteButton,
  ] = getAllButtons(setStatusHandler, taskEditOptionHandler, taskDeleteHandler);

  const pendingButtons: TaskButtons[] = [
    moveToActive,
    moveToCompleted,
    editButton,
    deleteButton,
  ];
  const activeButtons: TaskButtons[] = [
    moveToPending,
    moveToCompleted,
    editButton,
    deleteButton,
  ];
  const completedButtons: TaskButtons[] = [
    moveToPending,
    moveToActive,
    editButton,
    deleteButton,
  ];

  const buttons: Record<TaskStatus, TaskButtons[]> = {
    [TaskStatus.Pending]: pendingButtons,
    [TaskStatus.Active]: activeButtons,
    [TaskStatus.Completed]: completedButtons,
  };

  const clearTasksHandler = () => {
    clearTasks(elemStatus);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    setStatusHandler(taskId, elemStatus);
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <span>{elemStatus}</span>
        <Tooltip title={`Delete all ${elemStatus.toLowerCase()} tasks`}>
          <div
            onDrop={handleOnDropDelete}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
              e.preventDefault();
            }}
            onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
              e.preventDefault();
            }}
          >
            <button onClick={clearTasksHandler}>
              <SvgDelete
                height="24px"
                width="38px"
                className="delete-all-svg-primary"
              />
            </button>
          </div>
        </Tooltip>
      </div>

      <div
        className="task-list-content"
        onDrop={handleOnDrop}
        ref={ref}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
        }}
      >
        {tasks.length === 0 && (
          <div className="no-task-items">
            <p>You have no {elemStatus.toLowerCase()} tasks</p>
          </div>
        )}

        {tasks.length !== 0 && (
          <ul className="tasks-ul">
            {tasks.map((elem) => (
              <li key={elem.id}>
                <TaskItem
                  taskTitle={elem.title}
                  taskId={elem.id}
                  taskTagColor={elem.tagColor}
                  buttons={buttons[elemStatus]}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
