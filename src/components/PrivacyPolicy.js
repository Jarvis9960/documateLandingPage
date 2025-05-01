import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="privacy-policy">
      <header className="policy-header">
        <div className="header-content">
          <ArrowBackIcon className="back-icon" onClick={() => navigate('/')} />
          <h1>Privacy Policy</h1>
        </div>
      </header>

      <main className="policy-content">
        <p><strong>Last Updated:</strong> April 14, 2025</p>

        <h2>Introduction</h2>
        <p>
          Welcome to Documate, a service provided by Nayan Enterprises ("we," "us," or "our"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website (thedocumate.in) and services.
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, and other information you provide when registering or contacting us.</li>
          <li><strong>Documents:</strong> Files you upload to our platform for storage and management.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our website, such as IP address, browser type, and pages visited.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve our services, including document storage and management.</li>
          <li>Communicate with you, including responding to inquiries and sending updates.</li>
          <li>Ensure the security of our platform and protect against fraud.</li>
        </ul>

        <h2>Sharing Your Information</h2>
        <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
        <ul>
          <li>Service providers who assist us in operating our platform (e.g., cloud storage providers).</li>
          <li>Legal authorities, if required by law or to protect our rights.</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data, including encryption and secure access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal information.</li>
          <li>Opt out of marketing communications.</li>
          <li>Contact us with any concerns about your data.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p>
          <strong>Nayan Enterprises</strong><br />
          Owners: Pranabh Choudhary & Anish Priye<br />
          Address: Supaul, Bihar, India<br />
          Email: <a href="mailto:documate.doc@gmail.com">documate.doc@gmail.com</a><br />
          Phone: +91 7004284358<br />
          GST No.: 10BZIPP5804M1Z8
        </p>
      </main>

      <footer className="policy-footer">
        <p>© 2025 Nayan Enterprises. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;