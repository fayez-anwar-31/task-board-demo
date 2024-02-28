import React from 'react';
import { TagColor } from '../../enum';

export const SvgDelete = (props: {
  height: string;
  width: string;
  className: string;
}) => {
  const { height, width, className } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
    </svg>
  );
};

export const SvgTagColor = (props: {
  height: string;
  width: string;
  color: TagColor;
  className: string;
}) => {
  const { height, width, className, color } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path fill={color} d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
    </svg>
  );
};
