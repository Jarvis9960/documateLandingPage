import React, { useState } from 'react';
import '../styles/RecycleBin.css';

const RecycleBin = ({ folders, setFolders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const recycleBin = folders.find((folder) => folder.name === 'Recycle Bin');
  const files = recycleBin ? recycleBin.files : [];

  const totalPages = Math.ceil(files.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFiles = files.slice(startIndex, startIndex + itemsPerPage);

  const handleRestore = (file) => {
    const originalFolder = folders.find((f) => f.name === file.originalFolder);
    if (originalFolder) {
      originalFolder.files.push({ name: file.name, createdAt: file.createdAt });
      recycleBin.files = recycleBin.files.filter((f) => f.name !== file.name);
      setFolders([...folders]);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="recycle-bin">
      <h3>Recycle Bin</h3>
      {files.length > 0 ? (
        <>
          <div className="file-list">
            {paginatedFiles.map((file) => (
              <div key={file.name} className="file-item">
                <span>{file.name} (From: {file.originalFolder})</span>
                <button
                  onClick={() => handleRestore(file)}
                  className="restore-button"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
          {files.length > itemsPerPage && (
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
          )}
        </>
      ) : (
        <p>Recycle Bin is empty.</p>
      )}
    </div>
  );
};

export default RecycleBin;