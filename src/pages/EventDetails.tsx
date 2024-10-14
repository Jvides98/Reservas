import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        message.error('Failed to load event details');
      }
    };
    fetchEvent();
  }, [id]);

  const handleReserve = async () => {
    if (!isAuthenticated) {
      message.warning('Please login to make a reservation');
      navigate('/login');
      return;
    }
    try {
      await axios.post('/api/reservations', { eventId: id });
      message.success('Reservation made successfully');
    } catch (error) {
      console.error('Error making reservation:', error);
      message.error('Failed to make reservation');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/events/${id}`);
      message.success('Event deleted successfully');
      navigate('/events');
    } catch (error) {
      console.error('Error deleting event:', error);
      message.error('Failed to delete event');
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <Card title={event.title} className="max-w-2xl mx-auto">
      <p className="mb-4">{event.description}</p>
      <p className="mb-4">Date: {new Date(event.date).toLocaleDateString()}</p>
      {isAuthenticated && !isAdmin && (
        <Button type="primary" onClick={handleReserve}>
          Make Reservation
        </Button>
      )}
      {isAdmin && (
        <Button type="primary" danger onClick={handleDelete}>
          Delete Event
        </Button>
      )}
    </Card>
  );
};

export default EventDetails;