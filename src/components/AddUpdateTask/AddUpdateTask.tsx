import React, { forwardRef, useEffect, useRef, Ref } from 'react';
import { Button, Input, Space, Form, Select } from 'antd';
import { InputStatus, TagColor } from '../../enum';
import './AddUpdateTask.css';
import { SvgTagColor } from '../util/svg';

type FieldType = {
  newText: string;
  newTagColor: TagColor;
};

const { Option } = Select;

//iterate over enum values??
const allTagColors: TagColor[] = [
  TagColor.Default,
  TagColor.Red,
  TagColor.Orange,
  TagColor.Yellow,
  TagColor.Green,
  TagColor.Blue,
  TagColor.Violet,
  TagColor.Grey,
];

const AddUpdateTask = forwardRef(function AddUpdateTask(
  props: {
    status: InputStatus;
    taskId?: string;
    taskAddHandler: (newTaskText: string, newTagColor: TagColor) => void;
    taskEditHandler: (
      id: string,
      newTaskText: string,
      newTagColor: TagColor
    ) => void;
  },
  ref: Ref<any>
) {
  const { status, taskId, taskAddHandler, taskEditHandler } = props;
  const [form] = Form.useForm();
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (status === InputStatus.Edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [status]);

  const formSubmitHandler = (values: FieldType) => {
    if (InputStatus.Add === status) {
      const newText = values.newText.trim();
      if (!newText || newText === '') {
        return;
      }
      taskAddHandler(newText, values.newTagColor);
    } else {
      const newText = values.newText;
      taskEditHandler(taskId || '', newText, values.newTagColor);
    }
    form.resetFields();
  };

  return (
    <Form
      name="taskAddForm"
      labelCol={{ span: 8 }}
      style={{ maxWidth: 600 }}
      onFinish={formSubmitHandler}
      autoComplete="off"
      form={form}
      ref={ref}
    >
      <Space direction="vertical" size="middle">
        <Space.Compact style={{ width: '100%', marginTop: '20px' }}>
          <Form.Item<FieldType> name="newText">
            <Input
              placeholder={
                status === InputStatus.Add ? 'Add a task...' : 'Update task...'
              }
              ref={inputRef}
            />
          </Form.Item>
          <Form.Item<FieldType> name="newTagColor">
            <Select
              placeholder="Tag"
              // defaultValue={TagColor.Default}
              style={{ width: '72px' }}
              className="select-input"
            >
              {allTagColors.map((color) => (
                <Option key={color} value={color}>
                  <SvgTagColor
                    width="19px"
                    height="19px"
                    className="input-tag-color"
                    color={color}
                  />
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              // style={{ backgroundColor: '#ff7b54', color: '#ffffff' }}
              htmlType="submit"
              type="primary"
              className="add-update-button"
            >
              {status === InputStatus.Add ? 'Add' : 'Update'}
            </Button>
          </Form.Item>
        </Space.Compact>
      </Space>
    </Form>
  );
});

export default AddUpdateTask;
