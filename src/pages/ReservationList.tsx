import React, { useState, useEffect } from 'react';
import { List, Card, Button, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Reservation {
  id: string;
  eventId: string;
  eventTitle: string;
  date: string;
}

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/api/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        message.error('Failed to load reservations');
      }
    };
    fetchReservations();
  }, []);

  const handleCancelReservation = async (id: string) => {
    try {
      await axios.delete(`/api/reservations/${id}`);
      setReservations(reservations.filter(reservation => reservation.id !== id));
      message.success('Reservation cancelled successfully');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      message.error('Failed to cancel reservation');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isAdmin ? 'All Reservations' : 'My Reservations'}
      </h2>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={reservations}
        renderItem={(reservation) => (
          <List.Item>
            <Card title={reservation.eventTitle}>
              <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>
              <Button 
                type="primary" 
                danger 
                onClick={() => handleCancelReservation(reservation.id)}
              >
                Cancel Reservation
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReservationList;