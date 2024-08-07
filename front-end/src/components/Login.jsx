
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password });
      setLoading(false);
      const { success, role, message, token } = response.data;
      if (success) {
        // Store token in local storage
        localStorage.setItem('token', token);
        // Call onLogin function from props
        onLogin();
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'employee') {
          navigate('/employee-dashboard');
        } else {
          setError('Invalid role');
        }
      } else {
        setError(message);
      }
    } catch (error) {
      setLoading(false);
      setError('Error logging in');
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA5wMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQIDBAUH/8QAIRABAQEBAQACAgMBAQAAAAAAAAECERIhMUFhAxNRMiL/xAAYAQEBAQEBAAAAAAAAAAAAAAACAQADBP/EABgRAQEBAQEAAAAAAAAAAAAAAAABEQIS/9oADAMBAAIRAxEAPwD46AHuebQAcVBFQpFSMNXFRMXDgUZaJnFQhq8w7CzeK9QnNPVZ0L/6+hnFVqv7ha+l5nwW4uBrm0I0s+S4OOkqYOlRKyn1OvpQ4zMqIvyJlC0lQ5k/JDqKXGvk/P6ZvTLgbzAbE9vM4OKPjzvTqZDkORXGTSkVIJFENokXIUi8lIFo4ci+DnDkDU0pFee07ORsY/4v+o3zJWP8fxW0shwOhPstQ5flfOlgMLlNy6PJeWxfTm8/oTDp8KziJ5W9sJ/Gf9bpmB5LyHty/wBY/rdUwPCeW9uXwcw6LgeW8t7YzB+GvBxsT0z8/o1k2NrxuHJFDjy49xcM5DkXE0pFSKkORcG0pF5h5nwZQLTKnD4SFAAzKzFD+P7a+S5c+qnMaQuNMZdIHVLhWNZk/H6pY5+mWcrmGkxxXlfKXpEycyuZXMrOQ9MvAuW3E2LiemNiONtRFgWHKz4mtuM9fY4cqCOkhPM4XFcPjz49mlMqmVSLkXBtRw5OK4fCwdKCw+BmLKkqz9NBo4flUiuFiaWJytpPhGcujGfg+Y5dVn5+WuMnMrxHSRzvSsYaz+NOW2b8Okjj1WdwXhrRwsH0iZLjTg42JrPhWL5wrExdZWIsbWIsGw5WSNT5a2JsCx0lYWBpcgMPXlGUVI4PWrKufBZ+D6QUjsAZhD4IqRsSo8rxlUyuZXBvRRXBxUhhaeI2x/iMxrDkc+qryqTgyuZdMcbSzGk6cyvhyBang4uT4HCDU8CgrM6VjThWJi6zsRqNKmwbDlZVFa6jK/YV0lTYBaAN5BnYHme0+nExUZDkVMnjP+r4UgWpmV5hyHIWDach2HIrhY52okVJ8KkVIuJaMRpIUiocc7VZ+22GUaZp8ufTWK/CM1TrHKqhCGokSi4qlU1VRUUqirqKFOJ0w3flttjr7cunXlnaZaMHWPOB8Dg9Olw4cOM1qstIjLTMOOdOQ+GCA4vKIvJQKuSK5ChkFpw4JFSENOLkTGkpQKcXxOWkdI50GAYgjKoyKm1VRUOCoqqjTnSjPdZVe0VzrtImgqANy8idSDpuOPQjnDh2HIzacaZZxcKDWkP8olVCCxpIrMLH00ycc7T4fDOG56JFSF05rpQarhwujpC06vNY5vwuUpRsadHU9HS0cV0rSJNbCqRai0LTkO1lqjWmetBa6c8lqptKl+XO11goARXLMtJgSRYY62o88Li7SbEiODn7WONjamNMlIqRZEtaYXKjMX+HSOVX6T6Il1MX1Wajp9JLGkqmcpXS6ONpeL9fDmmqua6ujeW0vVMZVel0cXaXpn0em1sPVZap60ztC10kK1PRU0NdJAVAQiACKzFoAnShwBlH5XAGg01QAoNNf4IEFMAKwACoOkAzGvFAaJVwyBAVoARWekUAacK1NAEoAAylTARX/9k=)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Card sx={{ maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Log in'}
            </Button>
            {error && <Typography color="error" mt={2}>{error}</Typography>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
