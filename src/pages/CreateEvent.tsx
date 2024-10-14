import React from 'react';
import { Form, Input, DatePicker, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const onFinish = async (values: any) => {
    if (!isAdmin) {
      message.error('You do not have permission to create events');
      return;
    }
    try {
      await axios.post('/api/events', {
        ...values,
        date: values.date.toISOString(),
      });
      message.success('Event created successfully');
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      message.error('Failed to create event');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="title"
          label="Event Title"
          rules={[{ required: true, message: 'Please input the event title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the event description!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="date"
          label="Event Date"
          rules={[{ required: true, message: 'Please select the event date!' }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Create Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEvent;