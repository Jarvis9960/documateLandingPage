import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DocumentFolder from './DocumentFolder';
import EmailIcon from '@mui/icons-material/Email';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../styles/ClientProfile.css';

const mockClientData = {
  1: {
    id: 1,
    company: 'Acme Corp',
    name: 'John Smith',
    gst: '123456789',
    address: '123 Main St, Anytown',
    mobile: '9876543210',
    profileLink: 'https://example.com/acme-corp',
    createdAt: '2024-03-27',
    subscriptionEndDate: '2025-03-27',
    subscriptionStatus: 'active',
    createdBy: 'Super Admin 1',
    adminMobile: '1234567890',
  },
};

const mockDocuments = {
  1: [
    { folder: 'GST Documents', name: 'GST_2023.pdf', url: 'https://example.com/files/gst_2023.pdf', type: 'pdf' },
    { folder: 'GST Documents', name: 'GST_2022.xlsx', url: 'https://example.com/files/gst_2022.xlsx', type: 'excel' },
    { folder: 'Contracts', name: 'Contract_A.pdf', url: 'https://example.com/files/contract_a.pdf', type: 'pdf' },
    { folder: 'Invoices', name: 'Invoice_001.jpg', url: 'https://example.com/files/invoice_001.jpg', type: 'image' },
    { folder: 'Reports', name: 'Report_Q1.png', url: 'https://example.com/files/report_q1.png', type: 'image' },
    { folder: 'Legal', name: 'Legal_Doc.pdf', url: 'https://example.com/files/legal_doc.pdf', type: 'pdf' },
  ],
};

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubscriptionExpired, setIsSubscriptionExpired] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [mobileInput, setMobileInput] = useState(''); // Mobile number input
  const [otpInput, setOtpInput] = useState(''); // OTP input
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
  const [errorMessage, setErrorMessage] = useState(''); // Error message for authentication

  useEffect(() => {
    const clientData = mockClientData[id];
    if (clientData) {
      setClient(clientData);
      const currentDate = new Date();
      const subscriptionEndDate = new Date(clientData.subscriptionEndDate);
      if (currentDate > subscriptionEndDate) {
        setIsSubscriptionExpired(true);
      }
    }

    const clientDocs = mockDocuments[id] || [];
    setDocuments(clientDocs);
  }, [id]);

  const handleSendOtp = () => {
    if (mobileInput !== client?.mobile) {
      setErrorMessage('Mobile number does not match the client record.');
      return;
    }
    if (mobileInput.length !== 10 || !/^\d+$/.test(mobileInput)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpSent(true);
    setErrorMessage('');
    // Simulate sending OTP (in a real app, you'd send an OTP via SMS API)
    console.log('OTP sent to', mobileInput, 'OTP: 123456');
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification (in a real app, you'd verify the OTP with the server)
    const correctOtp = '123456'; // Simulated OTP
    if (otpInput === correctOtp) {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    if (!acc[doc.folder]) {
      acc[doc.folder] = [];
    }
    acc[doc.folder].push(doc);
    return acc;
  }, {});

  const allFolders = ['GST Documents', 'Contracts', 'Invoices', 'Reports', 'Legal'];

  if (!client) {
    return <div>Loading...</div>;
  }

  // If the client is not authenticated, show the authentication modal
  if (!isAuthenticated) {
    return (
      <div className="auth-modal">
        <div className="auth-modal-content">
          <h2>Authenticate to Access Profile</h2>
          <p>Please verify your identity to access your profile and documents.</p>
          {!otpSent ? (
            <div className="auth-form">
              <label>Mobile Number</label>
              <input
                type="text"
                value={mobileInput}
                onChange={(e) => setMobileInput(e.target.value)}
                placeholder="Enter your mobile number"
                maxLength="10"
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button onClick={handleSendOtp} className="send-otp-button">
                Send OTP
              </button>
            </div>
          ) : (
            <div className="auth-form">
              <label>Enter OTP</label>
              <input
                type="text"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="Enter the OTP"
                maxLength="6"
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button onClick={handleVerifyOtp} className="verify-otp-button">
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // If authenticated, show the client profile
  return (
    <div className="client-profile">
      <header className="client-header">
        <div className="logo">
          <h1>DocuMate</h1>
        </div>
        <div className="subscriber-badge">
          <span>Subscriber</span>
          <span>Ends on: {client.subscriptionEndDate}</span>
        </div>
      </header>

      <div className="main-content">
        <div className="header">
          <h1>
            {client.name} - {client.company}
          </h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search documents"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="profile-section">
          <h2>Profile Details</h2>
          <p><strong>Company:</strong> {client.company}</p>
          <p><strong>Name:</strong> {client.name}</p>
          <p><strong>GST No.:</strong> {client.gst}</p>
          <p><strong>Mobile No.:</strong> {client.mobile}</p>
          <p><strong>Address:</strong> {client.address}</p>
          <p><strong>Created By:</strong> {client.createdBy}</p>
          <p><strong>Admin Mobile:</strong> {client.adminMobile}</p>
          <p>
            <strong>Profile Link:</strong>{' '}
            <a href={client.profileLink} target="_blank" rel="noopener noreferrer">
              {client.profileLink}
            </a>
          </p>
        </div>

        {!isSubscriptionExpired ? (
          <div className="documents-section">
            <h2>Documents</h2>
            <div className="folder-list">
              {allFolders.map((folder) => (
                <DocumentFolder
                  key={folder}
                  folderName={folder}
                  documents={groupedDocuments[folder] || []}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="subscription-expired-message">
            Your subscription has expired. Please renew to access documents.
          </p>
        )}
      </div>

      {isSubscriptionExpired && (
        <div className="subscription-popup">
          <h3>Subscription Expired</h3>
          <p>
            Your subscription ended on {client.subscriptionEndDate}. Please contact the admin at {client.adminMobile} to renew your subscription.
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-left">
            <p>
              <EmailIcon className="contact-icon" />
              <a href="mailto:documate.doc@gmail.com">documate.doc@gmail.com</a>
            </p>
            <p>
              <SupportAgentIcon className="contact-icon" />
              <span>+91 7004284358</span>
            </p>
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

export default ClientProfile;