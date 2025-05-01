import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ClientCard.css';

const ClientCard = ({ client }) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const profileLink = client.profileLink || 'https://example.com/default-profile';
    navigator.clipboard.writeText(profileLink).then(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    });
  };

  return (
    <div
      className="client-card"
      onClick={() => navigate(`/client/${client.id}`)}
    >
      <h3>{client.company}</h3>
      <p>{client.name}</p>
      <p>GST No.: {client.gst}</p>
      <p>Mobile: {client.mobile}</p>
      <p>{client.address}</p>
      <div className="profile-link-container">
        <a
          href="#"
          onClick={handleCopyLink}
          className="profile-link"
        >
          Profile Link
        </a>
        <button
          onClick={handleCopyLink}
          className="copy-button"
        >
          📋
        </button>
      </div>
      <button
        className="edit-button"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/edit/${client.id}`);
        }}
      >
        ✏️
      </button>

      {showAlert && (
        <div className="copy-alert">
          Link copied to clipboard! 📋
        </div>
      )}
    </div>
  );
};

export default ClientCard;