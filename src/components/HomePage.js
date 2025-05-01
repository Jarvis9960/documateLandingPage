import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PeopleIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SecurityIcon from '@mui/icons-material/Security';
import FolderIcon from '@mui/icons-material/Folder';
import PublicIcon from '@mui/icons-material/Public';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import heroImage from '../assets/images/hero-image.png';
import Logo from '../assets/images/documate-logo.png';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  console.log('HomePage component is rendering');

  return (
    <div className="homepage">
      {/* Helmet for Meta Tags and Structured Data */}
      <Helmet>
        <title>Documate - Manage Clients' Documents Securely</title>
        <meta
          name="description"
          content="Documate lets you securely manage and share client documents with ease."
        />
        <meta
          name="keywords"
          content="client document management, secure document sharing, Documate, document storage, file sharing"
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Documate - Manage Clients' Documents Securely" />
        <meta
          property="og:description"
          content="Documate lets you securely manage and share client documents with ease."
        />
        <meta property="og:image" content="%PUBLIC_URL%/hero-image.png" />
        <meta property="og:url" content="https://thedocumate.in" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Documate - Secure Client Document Management" />
        <meta
          name="twitter:description"
          content="Documate lets you securely manage and share client documents with ease."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/hero-image.png" />
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Documate",
              "url": "https://thedocumate.in",
              "logo": "%PUBLIC_URL%/documate-logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-7004284358",
                "contactType": "customer service",
                "email": "documate.doc@gmail.com"
              },
              "sameAs": [
                "https://www.facebook.com/documateHQ/",
                "https://x.com/Documate_",
                "https://www.instagram.com/documatehq/",
                "https://www.linkedin.com/company/documate-hq"
              ]
            }
          `}
        </script>
      </Helmet>

      {/* Header */}
      <header className="homepage-header">
        <div className="logo">
          <img src={Logo} alt="Documate Logo" className="logo-image" />
        </div>
        <button
          className="view-documents-button"
          onClick={() => navigate('/client-profile-login')}
        >
          View Your Documents
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Manage Your Clients’ Documents Securely with Documate</h1>
          <p>
            Documate lets you add unlimited clients, manage their documents in separate folders, and share profiles securely via links for easy access, downloads, and secure document storage—saving you time while keeping everything secure.
          </p>
          <button
            className="view-documents-button"
            onClick={() => navigate('/client-profile-login')}
          >
            View Your Documents
          </button>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-item">
              <PeopleIcon className="stat-icon" />
              <h4>100k+</h4>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <StorageIcon className="stat-icon" />
              <h4>5TB+</h4>
              <p>Files Stored</p>
            </div>
            <div className="stat-item">
              <UploadFileIcon className="stat-icon" />
              <h4>3M+</h4>
              <p>Uploaded Files</p>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={heroImage}
            alt="Secure Client Document Management with Documate"
            loading="lazy"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h3>Why Use Documate</h3>
        <div className="features">
          <div className="feature-item">
            <SecurityIcon className="feature-icon" />
            <h4>Top-Tier Security</h4>
            <p>
              Share client profiles securely—links are protected with mobile OTP authentication.
            </p>
          </div>
          <div className="feature-item">
            <FolderIcon className="feature-icon" />
            <h4>Effortless Organization</h4>
            <p>
              Manage each client’s documents in separate, organized folders with ease.
            </p>
          </div>
          <div className="feature-item">
            <PublicIcon className="feature-icon" />
            <h4>Share & Access Anywhere</h4>
            <p>
              Share profile links with clients to let them view or download documents anytime, anywhere.
            </p>
          </div>
          <div className="feature-item">
            <AccessTimeIcon className="feature-icon" />
            <h4>Time-Saving Features</h4>
            <p>
              Streamline your workflow with fast uploads and secure sharing in just a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h3>How It Works for Admins</h3>
        <p>
          Managing documents for your clients is simple and secure with Documate. Get Started in just 3 steps:
        </p>
        <div className="steps">
          <div className="step-item">
            <div className="step-number">1</div>
            <h4>Create Client Profiles</h4>
            <p>
              Start by creating a profile for each client to keep their documents organized and separate.
            </p>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <h4>Upload Documents</h4>
            <p>
              Upload each client’s documents into relevant folders within their profile for easy management.
            </p>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <h4>Share Securely</h4>
            <p>
              Share the client’s profile link, protected by mobile OTP authentication, so they can view or download their documents securely.
            </p>
          </div>
        </div>
        <button
          className="get-started-button"
          onClick={() => navigate('/client-profile-login')}
          style={{ marginTop: '20px' }}
        >
          Get Started to add your clients
        </button>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <h3>Pricing</h3>
        <div className="pricing-plans">
          <div className="pricing-card">
            <h4>Monthly Billing</h4>
            <p className="price">₹199 <span>/ month / client</span></p>
            <p>Unlimited Storage, Priority Support</p>
            <button
              className="get-started-button"
              onClick={() => navigate('/client-profile-login')}
            >
              Get Started
            </button>
          </div>
          <div className="pricing-card">
            <h4>Annual Billing</h4>
            <p className="price">₹1999 <span>/ year / client</span></p>
            <p>Unlimited Storage, Save about 20%, Priority Support</p>
            <button
              className="get-started-button"
              onClick={() => navigate('/client-profile-login')}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

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

export default HomePage;