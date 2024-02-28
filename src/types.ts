import { TagColor, TaskStatus } from './enum';

export interface TaskItemType {
  id: string;
  title: string;
  timestamp: number;
  tagColor: TagColor;
  status: TaskStatus;
}

export interface TaskButtons {
  label: string;
  onClick: (id: string) => void;
}
