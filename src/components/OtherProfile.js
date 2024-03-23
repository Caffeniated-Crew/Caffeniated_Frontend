import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Card, CardContent, Chip, Button } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';
import AppAppBar from './home_components/AppAppBar';

const ViewProfile = () => {
  const { email } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [connectionSent, setConnectionSent] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://caffiniated-backend.onrender.com/profile/getUser/${email}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [email]);

  const sendConnectionRequest = async () => {
    try {
      await axios.post('https://caffiniated-backend.onrender.com/profile/sendConnection', {
        senderEmail: user, // Assuming this is the current user's email
        receiverEmail: email // Email of the person being viewed
      });
      setConnectionSent(true);
    } catch (error) {
      console.error('Error sending connection request:', error);
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
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Avatar alt={data.name} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100, margin: 'auto' }} />
              <Typography variant="h5" component="div" align="center" gutterBottom>
                {data.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {data.email}
              </Typography>
              <Box mt={2}>
                {connectionSent ? (
                  <Chip icon={<CheckCircleIcon />} label="Connection Request Sent" color="primary" />
                ) : (
                  <Button variant="contained" onClick={sendConnectionRequest}>Send Connection Request</Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="Skills" secondary={data.skills.join(', ')} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="University" secondary={data.university} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText
                primary="Certificates"
                secondary={data.certificate.map((link, index) => (
                  <span key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      Link {index + 1}
                    </a>
                    <br />
                  </span>
                ))}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Degree" secondary={data.degree} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText
                primary="Work Experience"
                secondary={data.work.map((work, index) => {
                  const [name, start, end] = work.split('.');
                  return (
                    <Box key={index} sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '4px', p: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1">{name}</Typography>
                      <Box>
                        <Typography variant="body2">{start} - {end}</Typography>
                      </Box>
                    </Box>
                  );
                })}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Year of Graduation" secondary={data.yearOfGrad} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default ViewProfile;
