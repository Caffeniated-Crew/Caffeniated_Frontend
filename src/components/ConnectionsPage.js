import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import AppAppBar from './home_components/AppAppBar';

const ConnectionsPage = () => {
  const user = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://caffiniated-backend.onrender.com/profile/getUser/${user}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [user]);

  const handleAcceptConnection = async (senderEmail, index) => {
    try {
      const payload = {
        senderEmail,
        receiverEmail: user,
      };
      const response = await axios.post('https://caffiniated-backend.onrender.com/profile/acceptConnection', payload);
      console.log(response.data);
      // Update the UI to remove the pending connection and add to accepted connections
      setProfileData(prevData => ({
        ...prevData,
        data: {
          ...prevData.data,
          pendingConnection: prevData.data.pendingConnection.filter((_, i) => i !== index),
          madeConnection: [...prevData.data.madeConnection, senderEmail]
        }
      }));
    } catch (error) {
      console.error('Error accepting connection:', error);
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const { data } = profileData;

  return (
    <>
    <AppAppBar />

    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Accepted Connections
          </Typography>
          <List>
            {data.madeConnection.map((email, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={email} />
                  <MenuItem component={Link} to={`/chat?sender=${user}&receiver=${email}`}>
                    Chat
                    </MenuItem>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Pending Connections
          </Typography>
          <List>
            {data.pendingConnection.map((email, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={email} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAcceptConnection(email, index)}
                  >
                    Accept
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default ConnectionsPage;
