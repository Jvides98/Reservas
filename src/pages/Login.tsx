import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const response = await axios.post('/api/auth/login', values);
      login(response.data.token);
      message.success('Login successful');
      navigate('/');
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;