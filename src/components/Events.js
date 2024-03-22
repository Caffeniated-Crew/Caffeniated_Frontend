import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button, ButtonGroup } from '@mui/material';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const payload = category ? { category } : {};
      const response = await axios.post('https://caffiniated-backend.onrender.com/events/filter', payload);
      setEvents(response.data.events);
    };

    fetchEvents();
  }, [category]);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
      <ButtonGroup 
        variant="contained" 
        aria-label="outlined primary button group" 
        style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            boxShadow: 'none', 
            '& > *': { 
            margin: '0 8px', 
            },
            marginTop: '100px',
            marginBottom: '50px'
        }}
        >
        <Button onClick={() => handleCategoryChange('')}>All</Button>
        <Button onClick={() => handleCategoryChange('C')}>C</Button>
        <Button onClick={() => handleCategoryChange('B')}>B</Button>
        <Button onClick={() => handleCategoryChange('A')}>A</Button>
        </ButtonGroup>

        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://source.unsplash.com/random/${event._id}`}
                  alt={event.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {event.desc}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Location: {event.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Time: {event.time}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default EventsPage;