import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Avatar, Card, CardContent, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const user = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({});
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills: [],
    university: '',
    degree: '',
    certificates: [],
    workExperience: [],
    yearOfGrad: ''
  });

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
    setUpdateFormData({ ...updateFormData, skills: value });
  };

  const handleCertificatesChange = (e, index) => {
    const { value } = e.target;
    const updatedCertificates = [...updateFormData.certificates];
    updatedCertificates[index] = value;
    setUpdateFormData({ ...updateFormData, certificates: updatedCertificates });
  };

  const handleAddCertificate = () => {
    setUpdateFormData({ ...updateFormData, certificates: [...updateFormData.certificates, ''] });
  };

  const handleRemoveCertificate = (index) => {
    const updatedCertificates = [...updateFormData.certificates];
    updatedCertificates.splice(index, 1);
    setUpdateFormData({ ...updateFormData, certificates: updatedCertificates });
  };

  const handleWorkExperienceChange = (e, index, key) => {
    const { value } = e.target;
    const updatedWorkExperience = [...updateFormData.workExperience];
    updatedWorkExperience[index][key] = value;
    setUpdateFormData({ ...updateFormData, workExperience: updatedWorkExperience });
  };

  const handleAddWorkExperience = () => {
    setUpdateFormData({
      ...updateFormData,
      workExperience: [...updateFormData.workExperience, { name: '', startdate: '', enddate: '' }]
    });
  };

  const handleRemoveWorkExperience = (index) => {
    const updatedWorkExperience = [...updateFormData.workExperience];
    updatedWorkExperience.splice(index, 1);
    setUpdateFormData({ ...updateFormData, workExperience: updatedWorkExperience });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: user, // Assuming email is retrieved from Redux store
        skills: updateFormData.skills,
        certificates: updateFormData.certificates,
        workExperience: updateFormData.workExperience
      };
      await axios.post(`https://caffiniated-backend.onrender.com/profile/updateProfile`, payload);
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
                value={updateFormData.skills}
                onChange={handleSkillsChange}
              >
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="React">React</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
              </Select>
            </FormControl>

            {/* Input fields for certificates */}
            {updateFormData.certificates.map((certificate, index) => (
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
            {updateFormData.workExperience.map((experience, index) => (
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
                  value={experience.startdate}
                  onChange={(e) => handleWorkExperienceChange(e, index, 'startdate')}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="date"
                  label="End Date"
                  value={experience.enddate}
                  onChange={(e) => handleWorkExperienceChange(e, index, 'enddate')}
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
  );
};

export default ViewProfile;