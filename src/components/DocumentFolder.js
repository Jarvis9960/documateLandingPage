import React, { useState } from 'react';
import DocumentPreviewModal from './DocumentPreviewModal';
import '../styles/DocumentFolder.css';

const DocumentFolder = ({ folderName, documents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handlePreview = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const handleDownload = (document) => {
    const link = document.createElement('a');
    link.href = document.url;
    link.download = document.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="document-folder">
      <div className="folder-header">
        <h3>{folderName}</h3>
      </div>
      {documents.length > 0 ? (
        <div className="document-list">
          {documents.map((doc, index) => (
            <div key={doc.name} className="document-item">
              <span>
                {doc.name}{' '}
                {index === 0 && <span className="new-label">New</span>}
              </span>
              <div className="document-actions">
                <button onClick={() => handlePreview(doc)} className="preview-button">
                  Preview
                </button>
                <button onClick={() => handleDownload(doc)} className="download-button">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No documents available.</p>
      )}

      {isModalOpen && selectedDocument && (
        <DocumentPreviewModal
          document={selectedDocument}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DocumentFolder;