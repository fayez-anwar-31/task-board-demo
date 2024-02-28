import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const MenuOptions = (props: {
  taskId: string;
  buttons: {
    label: string;
    onClick: (id: string) => void;
  }[];
}) => {
  const { taskId, buttons } = props;

  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const items: MenuProps['items'] = [
    {
      key: 'menu',
      children: buttons.map((b, index) => ({
        key: index,
        label: b.label,
        onClick: b.onClick.bind(this, taskId),
      })),
    },
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="vertical"
      items={items}
    />
  );
};
export default MenuOptions;
