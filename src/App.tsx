import React, { useState, useRef, useMemo } from 'react';
import TaskList from './components/TaskList/TaskList';
import AddUpdateTask from './components/AddUpdateTask/AddUpdateTask';
import { TaskStatus, InputStatus } from './enum';

import './App.css';
import { Tooltip, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { SvgDelete } from './components/util/svg';
import tasksArrFuncs from './taskArrFuncs';
import { TaskItemType } from './types';

const { confirm } = Modal;

function App() {
  const [tasksArr, setTasksArr] = useState<TaskItemType[]>([]);
  const [inputStatus, setInputStatus] = useState<InputStatus>(InputStatus.Add);
  const [editTaskId, setEditTaskId] = useState<string>('');

  const ref = useRef<any>();

  const {
    taskAddHandler,
    taskEditHandler,
    taskEditOptionHandler,
    taskDeleteHandler,
    setStatusHandler,
  } = tasksArrFuncs(tasksArr, setTasksArr, setInputStatus, setEditTaskId, ref);

  //useMemo can only be used in a component body
  const pendingTasks = useMemo(() => {
    return tasksArr
      .filter((task) => task.status === TaskStatus.Pending)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [tasksArr]);
  const activeTasks = useMemo(() => {
    return tasksArr
      .filter((task) => task.status === TaskStatus.Active)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [tasksArr]);
  const completedTasks = useMemo(() => {
    return tasksArr
      .filter((task) => task.status === TaskStatus.Completed)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [tasksArr]);

  //couldn't move this to taskArrFuncs as it has a confirm modal
  const clearTasks = (status: TaskStatus | 'all') => {
    confirm({
      title: `Do you want to delete all ${
        status === 'all' ? '' : status
      } tasks?`,
      icon: <ExclamationCircleFilled />,
      content: `This action can't be undone.`,
      className: 'confirm-modal',
      onOk() {
        if (status === 'all') {
          setTasksArr([]);
          return;
        }
        setTasksArr((prevTasksArr: TaskItemType[]) => {
          return prevTasksArr.filter((task) => task.status !== status);
        });
      },
      onCancel() {},
    });
  };

  const handleOnDropDelete = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    taskDeleteHandler(taskId);
  };

  const funcsWrapper = {
    taskDeleteHandler,
    taskEditOptionHandler,
    clearTasks,
    setStatusHandler,
    handleOnDropDelete,
  };

  return (
    <div className="App">
      <div className="heading">
        <h1>Task Board</h1>
        <Tooltip title={`Delete all tasks`}>
          <div
            onDrop={handleOnDropDelete}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
              e.preventDefault();
            }}
          >
            <button
              onClick={() => {
                clearTasks('all');
              }}
            >
              <SvgDelete
                height="24px"
                width="24px"
                className="delete-all-svg-secondary"
              />
            </button>
          </div>
        </Tooltip>
      </div>
      <div className="inputBar">
        <AddUpdateTask
          status={inputStatus}
          taskId={editTaskId}
          taskAddHandler={taskAddHandler}
          taskEditHandler={taskEditHandler}
          ref={ref}
        />
      </div>
      {tasksArr.length === 0 && (
        <div className="no-tasks">
          You haven't added any tasks yet, get started with one...
        </div>
      )}
      {tasksArr.length !== 0 && (
        <div className="task-lists">
          <div className="pending-list">
            <TaskList
              elemStatus={TaskStatus.Pending}
              tasks={pendingTasks}
              funcsWrapper={funcsWrapper}
            />
          </div>
          <div className="active-list">
            <TaskList
              elemStatus={TaskStatus.Active}
              tasks={activeTasks}
              funcsWrapper={funcsWrapper}
            />
          </div>
          <div className="completed-list">
            <TaskList
              elemStatus={TaskStatus.Completed}
              tasks={completedTasks}
              funcsWrapper={funcsWrapper}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
