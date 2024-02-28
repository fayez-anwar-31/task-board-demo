import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskItemType } from './types';

import { TaskStatus, InputStatus, TagColor } from './enum';

const taskArrFuncs = (
  tasksArr: TaskItemType[],
  setTasksArr: React.Dispatch<React.SetStateAction<TaskItemType[]>>,
  setInputStatus: React.Dispatch<React.SetStateAction<InputStatus>>,
  setEditTaskId: React.Dispatch<React.SetStateAction<string>>,
  ref: React.MutableRefObject<any>
) => {
  const taskAddHandler = (newTaskText: string, taskTagColor: TagColor) => {
    const newTask: TaskItemType = {
      id: uuidv4(),
      title: newTaskText,
      tagColor: taskTagColor,
      timestamp: Date.now(),
      status: TaskStatus.Pending,
    };
    setTasksArr([...tasksArr, newTask]);
  };

  const taskEditHandler = (
    id: string,
    newTaskText: string,
    newTagColor: TagColor
  ) => {
    //to execute the edit
    if (id === '' || newTaskText === '') {
      setInputStatus(InputStatus.Add);
      return;
    }
    setTasksArr((prevTasksArr: TaskItemType[]) => {
      return prevTasksArr.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: newTaskText,
            tagColor: newTagColor,
            timestamp: Date.now(),
          };
        }
        return task;
      });
    });
    setInputStatus(InputStatus.Add);
  };

  const taskEditOptionHandler = (id: string) => {
    //to initiate the edit
    setInputStatus(InputStatus.Edit);
    setEditTaskId(id);
    const taskToEdit = tasksArr.find((task) => task.id === id);
    if (ref.current) {
      ref.current.setFieldValue('newText', taskToEdit?.title);
      ref.current.setFieldValue('newTagColor', taskToEdit?.tagColor);
    }
  };

  const taskDeleteHandler = (id: string) => {
    setTasksArr((prevTasksArr: TaskItemType[]) => {
      return prevTasksArr.filter((task) => task.id !== id);
    });
  };

  const setStatusHandler = (id: string, newStatus: TaskStatus) => {
    setTasksArr((prevTasksArr: TaskItemType[]) => {
      return prevTasksArr.map((task) => {
        if (task.id === id) {
          return { ...task, status: newStatus, timestamp: Date.now() };
        }
        return task;
      });
    });
  };
  return {
    taskAddHandler,
    taskEditHandler,
    taskEditOptionHandler,
    taskDeleteHandler,
    setStatusHandler,
  };
};

export default taskArrFuncs;
