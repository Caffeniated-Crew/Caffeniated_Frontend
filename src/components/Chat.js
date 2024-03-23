import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import AppAppBar from './home_components/AppAppBar';

const ChatWindow = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sender = queryParams.get('sender');
  const receiver = queryParams.get('receiver');

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://caffiniated-backend.onrender.com/chats/messages/${sender}/${receiver}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [sender, receiver]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://caffiniated-backend.onrender.com/chats/messages', {
        sender,
        receiver,
        message: newMessage,
      });

      console.log('Message sent successfully:', response.data);
      setMessages([...messages, `${sender}$${newMessage}`]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
    <AppAppBar />

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Chat with {receiver}
      </Typography>

      <Paper sx={{ width: '100%', maxWidth: 600, height: 400, p: 2, overflowY: 'auto', mb: 2 }}>
        {messages.map((message, index) => {
          const [user, text] = message.split('$');
          const isCurrentUser = user === sender;

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: isCurrentUser ? 'primary.main' : 'grey.500',
                  color: 'white',
                  p: 1,
                  borderRadius: 1,
                }}
              >
                {text}
              </Box>
            </Box>
          );
        })}
      </Paper>
      <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%', maxWidth: 600 }}>
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          variant="outlined"
          fullWidth
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </Box>
    </>
  );
};

export default ChatWindow;