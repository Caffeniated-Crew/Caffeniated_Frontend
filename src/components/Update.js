import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Avatar, Card, CardContent, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppAppBar from './home_components/AppAppBar';

const ViewProfile = () => {
  const user = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({});
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);

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

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    setSkills(value);
  };

  const handleCertificatesChange = (e, index) => {
    const { value } = e.target;
    const updatedCertificates = [...certificates];
    updatedCertificates[index] = value;
    setCertificates(updatedCertificates);
  };

  const handleAddCertificate = () => {
    setCertificates([...certificates, '']);
  };

  const handleRemoveCertificate = (index) => {
    const updatedCertificates = [...certificates];
    updatedCertificates.splice(index, 1);
    setCertificates(updatedCertificates);
  };

  const handleWorkExperienceChange = (e, index, key) => {
    const { value } = e.target;
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index][key] = value;
    setWorkExperience(updatedWorkExperience);
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([...workExperience, { name: '', start: '', end: '' }]);
  };

  const handleRemoveWorkExperience = (index) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience.splice(index, 1);
    setWorkExperience(updatedWorkExperience);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = JSON.stringify({
        email: user,
        skills,
        certificate: certificates,
        work: workExperience.map(exp => `${exp.name}.${exp.start}.${exp.end}`)
      });

      await axios.post(`https://caffiniated-backend.onrender.com/profile/updateProfile`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profileData.data) {
    return <div>Loading...</div>;
  }

  const { data } = profileData;

  return (
    <>
    <AppAppBar />
    <Box sx={{ p: 4, paddingTop: '100px' }}> {/* Add padding top to create space for the AppAppBar */}
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="skills-label">Skills</InputLabel>
              <Select
                labelId="skills-label"
                id="skills"
                multiple
                value={skills}
                onChange={handleSkillsChange}
              >
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="React">React</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
              </Select>
            </FormControl>

            {/* Input fields for certificates */}
            {certificates.map((certificate, index) => (
              <div key={index}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Certificate Link"
                  value={certificate}
                  onChange={(e) => handleCertificatesChange(e, index)}
                />
                <Button variant="contained" color="secondary" onClick={() => handleRemoveCertificate(index)}>Remove Certificate</Button>
              </div>
            ))}
            <Button variant="contained" onClick={handleAddCertificate}>Add Certificate</Button>

            {/* Input fields for work experience */}
            {workExperience.map((experience, index) => (
              <div key={index}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Internship Name"
                  value={experience.name}
                  onChange={(e) => handleWorkExperienceChange(e, index, 'name')}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="date"
                  label="Start Date"
                  value={experience.start}
                  onChange={(e) => handleWorkExperienceChange(e, index, 'start')}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="date"
                  label="End Date"
                  value={experience.end}
                  onChange={(e) => handleWorkExperienceChange(e, index, 'end')}
                />
                <Button variant="contained" color="secondary" onClick={() => handleRemoveWorkExperience(index)}>Remove Experience</Button>
              </div>
            ))}
            <Button variant="contained" onClick={handleAddWorkExperience}>Add Work Experience</Button>

            <MenuItem component={Link} to="/viewprofile">Update Profile</MenuItem>
          </form>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default ViewProfile;