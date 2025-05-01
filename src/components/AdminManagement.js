import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DocumentFolder from './DocumentFolder';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../styles/AdminManagement.css';

// Mock client data (same as in Dashboard.js)
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

// Mock document data (same as in ClientProfile.js)
const mockDocuments = {
  1: [
    { folder: 'GST Documents', name: 'GST_2023.pdf', url: 'https://example.com/files/gst_2023.pdf', type: 'pdf' },
    { folder: 'GST Documents', name: 'GST_2022.xlsx', url: 'https://example.com/files/gst_2022.xlsx', type: 'excel' },
    { folder: 'Contracts', name: 'Contract_A.pdf', url: 'https://example.com/files/contract_a.pdf', type: 'pdf' },
    { folder: 'Invoices', name: 'Invoice_001.jpg', url: 'https://example.com/files/invoice_001.jpg', type: 'image' },
    { folder: 'Reports', name: 'Report_Q1.png', url: 'https://example.com/files/report_q1.png', type: 'image' },
    { folder: 'Legal', name: 'Legal_Doc.pdf', url: 'https://example.com/files/legal_doc.pdf', type: 'pdf' },
  ],
  2: [
    { folder: 'GST Documents', name: 'GST_Beta_2023.pdf', url: 'https://example.com/files/gst_beta_2023.pdf', type: 'pdf' },
    { folder: 'Contracts', name: 'Contract_B.pdf', url: 'https://example.com/files/contract_b.pdf', type: 'pdf' },
  ],
  3: [
    { folder: 'Invoices', name: 'Invoice_Gamma_001.pdf', url: 'https://example.com/files/invoice_gamma_001.pdf', type: 'pdf' },
    { folder: 'Reports', name: 'Report_Gamma_Q1.pdf', url: 'https://example.com/files/report_gamma_q1.pdf', type: 'pdf' },
  ],
};

const AdminManagement = () => {
  const { admins, currentAdmin, addAdmin, updateAdminRole, toggleAdminRestriction } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newAdminMobile, setNewAdminMobile] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedAdminId, setExpandedAdminId] = useState(null); // Track which admin's clients are expanded
  const adminsPerPage = 5;

  if (!currentAdmin || currentAdmin.role !== 'Super Admin') {
    navigate('/');
    return null;
  }

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (newAdminMobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (admins.some((admin) => admin.mobile === newAdminMobile)) {
      alert('An admin with this mobile number already exists.');
      return;
    }
    addAdmin(newAdminMobile, newAdminName, newAdminRole);
    setNewAdminMobile('');
    setNewAdminName('');
    setNewAdminRole('Admin');
    setCurrentPage(1);
  };

  const handleRoleChange = (adminId, newRole) => {
    updateAdminRole(adminId, newRole);
  };

  const handleToggleRestriction = (adminId) => {
    toggleAdminRestriction(adminId);
  };

  const toggleClientList = (adminId) => {
    setExpandedAdminId(expandedAdminId === adminId ? null : adminId);
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.mobile.includes(searchTerm)
  );

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="admin-management">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
        <h1>Admin Management</h1>
      </div>

      <div className="add-admin-section">
        <h2>Add New Admin</h2>
        <form className="add-admin-form" onSubmit={handleAddAdmin}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={newAdminName}
              onChange={(e) => setNewAdminName(e.target.value)}
              placeholder="Enter admin name"
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              value={newAdminMobile}
              onChange={(e) => setNewAdminMobile(e.target.value)}
              placeholder="Enter mobile number"
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              value={newAdminRole}
              onChange={(e) => setNewAdminRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Admin
          </button>
        </form>
      </div>

      <div className="admin-list-section">
        <h2>Admin List</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search admins by name or mobile number"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        {filteredAdmins.length > 0 ? (
          <>
            <div className="admin-list">
              {currentAdmins.map((admin) => {
                const adminClients = initialClients[admin.id] || [];
                const groupedDocuments = adminClients.reduce((acc, client) => {
                  const clientDocs = mockDocuments[client.id] || [];
                  clientDocs.forEach((doc) => {
                    if (!acc[client.id]) acc[client.id] = {};
                    if (!acc[client.id][doc.folder]) acc[client.id][doc.folder] = [];
                    acc[client.id][doc.folder].push(doc);
                  });
                  return acc;
                }, {});
                const allFolders = ['GST Documents', 'Contracts', 'Invoices', 'Reports', 'Legal'];

                return (
                  <div key={admin.id} className="admin-item">
                    <div className="admin-info">
                      <p><strong>Name:</strong> {admin.name}</p>
                      <p><strong>Mobile:</strong> {admin.mobile}</p>
                    </div>
                    <div className="admin-role">
                      <label>Role:</label>
                      <select
                        value={admin.role}
                        onChange={(e) => handleRoleChange(admin.id, e.target.value)}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                      </select>
                    </div>
                    <div className="admin-restriction">
                      <button
                        onClick={() => handleToggleRestriction(admin.id)}
                        className={admin.restricted ? 'unrestrict-button' : 'restrict-button'}
                      >
                        {admin.restricted ? 'Unrestrict' : 'Restrict'}
                      </button>
                    </div>
                    <div className="admin-clients-toggle">
                      <button
                        onClick={() => toggleClientList(admin.id)}
                        className="toggle-clients-button"
                      >
                        {expandedAdminId === admin.id ? 'Hide Clients' : 'View Clients'}
                      </button>
                    </div>
                    {expandedAdminId === admin.id && (
                      <div className="admin-clients-section">
                        <h3>Clients for {admin.name}</h3>
                        {adminClients.length > 0 ? (
                          adminClients.map((client) => (
                            <div key={client.id} className="client-item">
                              <h4>{client.company} - {client.name}</h4>
                              <p><strong>GST No.:</strong> {client.gst}</p>
                              <p><strong>Mobile:</strong> {client.mobile}</p>
                              <p><strong>Address:</strong> {client.address}</p>
                              <div className="client-documents">
                                <h5>Documents</h5>
                                {allFolders.map((folder) => (
                                  <DocumentFolder
                                    key={`${client.id}-${folder}`}
                                    folderName={folder}
                                    documents={groupedDocuments[client.id]?.[folder] || []}
                                  />
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No clients assigned to this admin.</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="pagination">
              <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No admins found.</p>
        )}
      </div>
      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-left">
            <p>Email: <a href="mailto:documate.doc@gmail.com">documate.doc@gmail.com</a></p>
            <p>Phone: +91 7004284358</p>
          </div>
          <div className="footer-center">
            <p>
              <a href="/terms-and-conditions">Terms and Conditions</a> |{' '}
              <a href="/privacy-policy">Privacy Policy</a>
            </p>
          </div>
          <div className="footer-right">
            <a href="https://www.facebook.com/documateHQ/" target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="social-icon" />
            </a>
            <a href="https://x.com/Documate_" target="_blank" rel="noopener noreferrer">
              <XIcon className="social-icon" />
            </a>
            <a href="https://www.instagram.com/documatehq/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="social-icon" />
            </a>
            <a href="https://www.linkedin.com/company/documate-hq" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon className="social-icon" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminManagement;