import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppAppBar from './home_components/AppAppBar';

const Mentor = () => {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      const response = await axios.get('https://caffiniated-backend.onrender.com/mentor/all');
      setMentors(response.data.users);
    };

    fetchMentors();
  }, []);

  const handleCardClick = (mentor) => {
    navigate(`/profiles/${mentor.email}`, { state: mentor });
  };

  return (
    <>
    <AppAppBar />

    <React.Fragment>
      <Container maxWidth="lg" sx={{ padding: '100px' }} >
        <Grid container spacing={3}>
          {mentors.map((mentor) => (
            <Grid item xs={12} sm={6} md={4} key={mentor._id}>
              <Card onClick={() => handleCardClick(mentor)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://source.unsplash.com/random/${mentor._id}`}
                  alt={mentor.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {mentor.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Skills: {mentor.skills.join(', ')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Email: {mentor.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    University: {mentor.university}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Degree: {mentor.degree}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
    </>
  );
};

export default Mentor;