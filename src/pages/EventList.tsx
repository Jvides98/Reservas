import React, { useState, useEffect } from 'react';
import { List, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={events}
        renderItem={(event) => (
          <List.Item>
            <Card title={event.title}>
              <p>{event.description}</p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <Link to={`/events/${event.id}`}>
                <Button type="primary">View Details</Button>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default EventList;