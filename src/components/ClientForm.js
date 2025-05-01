import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ClientForm.css';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    gst: '',
    mobile: '',
    address: '',
    profileLink: '',
  });
  const [errors, setErrors] = useState({
    mobile: '',
    gst: '',
  });

  useEffect(() => {
    if (id) {
      const client = {
        company: 'Acme Corp',
        name: 'John Smith',
        gst: '123456789',
        mobile: '9876543210',
        address: '123 Main St, Anytown',
        profileLink: '',
      };
      setFormData(client);
    }
  }, [id]);

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'company' || name === 'name') {
      // Capitalize first letter of each word for company and name
      setFormData({ ...formData, [name]: capitalizeWords(value) });
    } else if (name === 'mobile') {
      // Allow only numeric values and limit to 10 digits
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, mobile: numericValue });
        if (numericValue.length !== 10) {
          setErrors({ ...errors, mobile: 'Mobile number must be exactly 10 digits.' });
        } else {
          setErrors({ ...errors, mobile: '' });
        }
      }
    } else if (name === 'gst') {
      // Convert to uppercase and allow only alphanumeric characters
      const alphanumericValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      setFormData({ ...formData, gst: alphanumericValue });
      if (!/^[A-Z0-9]+$/.test(alphanumericValue) && alphanumericValue.length > 0) {
        setErrors({ ...errors, gst: 'GST number must be alphanumeric.' });
      } else {
        setErrors({ ...errors, gst: '' });
      }
    } else if (name === 'address') {
      // Capitalize first letter of each word, allow numbers, commas, and hashtags
      const formattedAddress = capitalizeWords(value.replace(/[^a-zA-Z0-9, #]/g, ''));
      setFormData({ ...formData, address: formattedAddress });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.mobile.length !== 10) {
      setErrors({ ...errors, mobile: 'Mobile number must be exactly 10 digits.' });
      return;
    }
    console.log('Form submitted:', formData);
    navigate('/');
  };

  return (
    <div className="client-form">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
      </div>
      <h2>{id ? 'Edit Client' : 'Create Client Form'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name of the company</label>
        <input
          type="text"
          name="company"
          placeholderme
          placeholder="Enter company name"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <label>Client Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter client name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div className="form-row">
          <div>
            <label>GST No.</label>
            <input
              type="text"
              name="gst"
              placeholder="Enter GST number"
              value={formData.gst}
              onChange={handleChange}
              required
            />
            {errors.gst && <p className="error-message">{errors.gst}</p>}
          </div>
          <div>
            <label>Mobile No.</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            {errors.mobile && <p className="error-message">{errors.mobile}</p>}
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Profile Link</label>
            <input
              type="text"
              name="profileLink"
              placeholder="Profile link will be auto Generated"
              value={formData.profileLink}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
      <div className="notification">Great! Keep going, done!</div>
    </div>
  );
};

export default ClientForm;