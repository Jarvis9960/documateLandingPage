import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/TermsAndConditions.css';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-and-conditions">
      <header className="terms-header">
        <div className="header-content">
          <ArrowBackIcon className="back-icon" onClick={() => navigate('/')} />
          <h1>Terms and Conditions</h1>
        </div>
      </header>

      <main className="terms-content">
        <p><strong>Last Updated:</strong> April 14, 2025</p>

        <h2>Introduction</h2>
        <p>
          Welcome to Documate, a service provided by Nayan Enterprises ("we," "us," or "our"). By using our website (thedocumate.in) and services, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with these terms, please do not use our services.
        </p>

        <h2>Use of Services</h2>
        <p>
          You agree to use Documate only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account and password and for all activities that occur under your account.
        </p>

        <h2>Subscription and Payment</h2>
        <p>
          Documate offers subscription plans as outlined on our website. Payments are non-refundable, and you are responsible for paying all applicable taxes. We reserve the right to change our pricing at any time, with notice provided to you.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on Documate, including text, graphics, and software, is the property of Nayan Enterprises and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Nayan Enterprises will not be liable for any indirect, incidental, or consequential damages arising from your use of our services, including loss of data or profits. Our total liability to you will not exceed the amount you paid for the service.
        </p>

        <h2>Termination</h2>
        <p>
          We may terminate or suspend your account at our discretion, with or without notice, for any violation of these Terms. Upon termination, your right to use the service will cease immediately.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms are governed by the laws of India, and any disputes will be resolved in the courts of Supaul, Bihar, India.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please contact us at:
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

      <footer className="terms-footer">
        <p>© 2025 Nayan Enterprises. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;