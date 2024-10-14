import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <Calendar className="w-24 h-24 mx-auto mb-4 text-blue-500" />
      <Title level={1}>Welcome to Event Reservation App</Title>
      <Paragraph className="text-lg mb-8">
        Discover and book amazing events or create your own!
      </Paragraph>
      <Link to="/events">
        <Button type="primary" size="large">
          Explore Events
        </Button>
      </Link>
    </div>
  );
};

export default Home;