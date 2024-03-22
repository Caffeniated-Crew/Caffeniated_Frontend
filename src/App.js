import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ViewProfile from './components/ViewProfile';
import Events from './components/Events';
import Mentors from './components/Mentor';
import OtherProfile from './components/OtherProfile';
import ConnectionPage from './components/ConnectionsPage';

function App() {
  return (
    // <AuthProvider>
      <Router>
        <div>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/viewprofile" element={<ViewProfile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/profiles/:email" element={<OtherProfile />} />
          <Route path="/connections" element={<ConnectionPage />} />
          </Routes>
        </div>
      </Router>
    // </AuthProvider>

  );
}

export default App;
