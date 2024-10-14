import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import ReservationList from './pages/ReservationList';
import { AuthProvider } from './context/AuthContext';

const { Content, Footer } = Layout;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout className="min-h-screen">
          <Navbar />
          <Content className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/reservations" element={<ReservationList />} />
            </Routes>
          </Content>
          <Footer className="text-center">
            Event Reservation App ©{new Date().getFullYear()} Created by Your Company
          </Footer>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;