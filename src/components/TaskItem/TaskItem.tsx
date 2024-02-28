import React from 'react';
import { TagColor } from '../../enum';
import './TaskItem.css';
import MenuOptions from './MenuOptions';

const TaskItem = (props: {
  taskTitle: string;
  taskTagColor: TagColor;
  taskId: string;
  buttons: {
    label: string;
    onClick: (id: string) => void;
  }[];
}) => {
  const { taskTitle, taskTagColor, taskId, buttons } = props;

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('taskId', id);
  };

  return (
    <div
      className="task-item-card"
      draggable
      onDragStart={(e) => {
        handleOnDrag(e, taskId);
      }}
    >
      <div className="text">{taskTitle}</div>
      <div className="card-options">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path fill={taskTagColor} d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
        </svg>
        <MenuOptions buttons={buttons} taskId={taskId} />
      </div>
    </div>
  );
};

export default TaskItem;
