import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientCard from './ClientCard';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';

const initialClients = {
  1: [
    { id: 1, company: 'Acme Corp', name: 'John Smith', gst: '123456789', mobile: '9876543210', address: '123 Main St, Anytown', profileLink: 'https://example.com/acme-corp' },
    { id: 4, company: 'Delta Corp', name: 'Mike Brown', gst: '445566778', mobile: '5555555555', address: '789 Pine St, Newtown', profileLink: 'https://example.com/delta-corp' },
    { id: 5, company: 'Echo Ltd', name: 'Sarah Wilson', gst: '998877665', mobile: '4444444444', address: '321 Oak St, Oldtown', profileLink: 'https://example.com/echo-ltd' },
  ],
  2: [
    { id: 2, company: 'Beta LLC', name: 'Jane Doe', gst: '987654321', mobile: '8765432109', address: '456 Elm St, Othertown', profileLink: 'https://example.com/beta-llc' },
  ],
  3: [
    { id: 3, company: 'Gamma Inc', name: 'Alice Johnson', gst: '112233445', mobile: '7654321098', address: '789 Oak St, Anothertown', profileLink: 'https://example.com/gamma-inc' },
  ],
};

const Dashboard = () => {
  const { currentAdmin, logout } = useContext(AuthContext);
  const [clients, setClients] = useState(initialClients[currentAdmin?.id] || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 3;
  const navigate = useNavigate();

  if (!currentAdmin) {
    navigate('/login');
    return null;
  }

  const filteredClients = clients.filter(
    (client) =>
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.gst.includes(searchTerm) ||
      client.mobile.includes(searchTerm)
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <button className="nav-button">DocManagement</button>
        <button className="nav-button active">Dashboard</button>
        <button className="nav-button create" onClick={() => navigate('/create')}>
          Create
        </button>
        {currentAdmin.role === 'Super Admin' && (
          <button className="nav-button" onClick={() => navigate('/admin-management')}>
            Admin Management
          </button>
        )}
        <button className="nav-button logout" onClick={logout}>
          Logout
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          className="nav-button"
          onClick={() => navigate('/client-profile/1')}
        >
          View My Profile (Client)
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search clients by name, company, GST No., mobile"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>
      <h2>Client List (Admin: {currentAdmin.name})</h2>
      <div className="client-list">
        {currentClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;