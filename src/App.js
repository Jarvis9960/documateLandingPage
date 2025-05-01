import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage';
import ClientProfile from './components/ClientProfile';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClientForm from './components/ClientForm';
import ClientDetails from './components/ClientDetails';
import AdminManagement from './components/AdminManagement';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';

const App = () => {
  console.log('App component is rendering');

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/client-profile-login" element={<Login />} />
          <Route path="/client/:clientname" element={<ClientProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<ClientForm />} />
          <Route path="/edit/:id" element={<ClientForm />} />
          <Route path="/client-details/:id" element={<ClientDetails />} />
          <Route path="/admin-management" element={<AdminManagement />} /> */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;