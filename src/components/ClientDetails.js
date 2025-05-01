import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ClientDetails.css';

const mockClientData = {
  1: {
    subscriptionEndDate: '2025-03-27',
    subscriptionStatus: 'active',
  },
};

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [client, setClient] = useState(mockClientData[id]);
  const [showCreateFolderForm, setShowCreateFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const [editFolderName, setEditFolderName] = useState('');
  const [showDeleteWarning, setShowDeleteWarning] = useState(null);
  const [folderSearchTerms, setFolderSearchTerms] = useState({});
  const [showRenewPopup, setShowRenewPopup] = useState(false); // State for renew subscription popup
  const [showPermanentDeleteWarning, setShowPermanentDeleteWarning] = useState(null); // State for permanent delete warning

  const [folders, setFolders] = useState([
    { name: 'GST Documents', icon: '📁', files: [], createdAt: new Date() },
    { name: 'Contracts', icon: '📁', files: [], createdAt: new Date() },
    { name: 'Invoices', icon: '📁', files: [], createdAt: new Date() },
    { name: 'Reports', icon: '📁', files: [], createdAt: new Date() },
    { name: 'Legal', icon: '📁', files: [], createdAt: new Date() },
    { name: 'Recycle Bin', icon: '🗑️', files: [], createdAt: new Date() },
  ]);

  const [currentPages, setCurrentPages] = useState({});
  const itemsPerPage = 3;

  useEffect(() => {
    const initialPages = {};
    folders.forEach((folder) => {
      initialPages[folder.name] = 1;
    });
    setCurrentPages(initialPages);
  }, []);

  const filteredFolders = folders.filter(
    (folder) =>
      folder.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      folder.name !== 'Recycle Bin'
  );

  const handleCreateFolder = (e) => {
    e.preventDefault();
    const folderExists = folders.some(
      (folder) => folder.name.toLowerCase() === newFolderName.toLowerCase()
    );

    if (folderExists) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setFolders([...folders, { name: newFolderName, icon: '📁', files: [], createdAt: new Date() }]);
      setNewFolderName('');
      setShowCreateFolderForm(false);
    }
  };

  const handleDeleteFolder = (folderName) => {
    const folderToDelete = folders.find((folder) => folder.name === folderName);
    const recycleBin = folders.find((folder) => folder.name === 'Recycle Bin');
    recycleBin.files = [...recycleBin.files, ...folderToDelete.files, { name: folderName, type: 'folder', files: folderToDelete.files, createdAt: new Date() }];
    setFolders(folders.filter((folder) => folder.name !== folderName));
    setShowDeleteWarning(null);
  };

  const handleEditFolder = (folder) => {
    setEditingFolder(folder);
    setEditFolderName(folder.name);
  };

  const handleUpdateFolderName = (e) => {
    e.preventDefault();
    const folderExists = folders.some(
      (folder) =>
        folder.name.toLowerCase() === editFolderName.toLowerCase() &&
        folder.name !== editingFolder.name
    );

    if (folderExists) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setFolders(
        folders.map((folder) =>
          folder.name === editingFolder.name
            ? { ...folder, name: editFolderName }
            : folder
        )
      );
      setEditingFolder(null);
      setEditFolderName('');
    }
  };

  const handleFileUpload = (folderName, event) => {
    const files = Array.from(event.target.files).map((file) => ({
      name: file.name,
      createdAt: new Date(),
    }));
    setFolders(
      folders.map((folder) =>
        folder.name === folderName
          ? { ...folder, files: [...folder.files, ...files] }
          : folder
      )
    );
  };

  const handleDeleteFile = (folderName, fileName) => {
    const folder = folders.find((f) => f.name === folderName);
    const fileToDelete = folder.files.find((file) => file.name === fileName);
    const recycleBin = folders.find((f) => f.name === 'Recycle Bin');
    recycleBin.files.push({ ...fileToDelete, originalFolder: folderName, type: 'file' });
    setFolders(
      folders.map((f) =>
        f.name === folderName
          ? {
              ...f,
              files: f.files.filter((file) => file.name !== fileName),
            }
          : f.name === 'Recycle Bin'
          ? recycleBin
          : f
      )
    );
  };

  const handleRenewSubscription = () => {
    setShowRenewPopup(true); // Show the confirmation popup
  };

  const confirmRenewSubscription = () => {
    const currentDate = new Date();
    const newEndDate = new Date(currentDate);
    newEndDate.setDate(currentDate.getDate() + 365);
    const formattedEndDate = newEndDate.toISOString().split('T')[0];

    setClient({
      ...client,
      subscriptionEndDate: formattedEndDate,
      subscriptionStatus: 'active',
    });

    mockClientData[id] = {
      ...mockClientData[id],
      subscriptionEndDate: formattedEndDate,
      subscriptionStatus: 'active',
    };

    setShowRenewPopup(false); // Close the popup
  };

  const handleChangeStatus = () => {
    if (client.subscriptionStatus === 'active') {
      setClient({
        ...client,
        subscriptionStatus: 'expired',
      });
      mockClientData[id].subscriptionStatus = 'expired';
    } else {
      handleRenewSubscription(); // Show the popup for renewal
    }
  };

  const handleFolderSearch = (folderName, term) => {
    setFolderSearchTerms({
      ...folderSearchTerms,
      [folderName]: term,
    });
  };

  const handlePageChange = (folderName, page) => {
    setCurrentPages({
      ...currentPages,
      [folderName]: page,
    });
  };

  // Restore file or folder from Recycle Bin
  const handleRestore = (item) => {
    const recycleBin = folders.find((f) => f.name === 'Recycle Bin');
    if (item.type === 'file') {
      const folderName = item.originalFolder;
      const folder = folders.find((f) => f.name === folderName);
      if (folder) {
        folder.files.push({ name: item.name, createdAt: item.createdAt });
      } else {
        // If the original folder no longer exists, create it
        setFolders([
          ...folders,
          { name: folderName, icon: '📁', files: [{ name: item.name, createdAt: item.createdAt }], createdAt: new Date() },
        ]);
      }
    } else if (item.type === 'folder') {
      setFolders([
        ...folders,
        { name: item.name, icon: '📁', files: item.files, createdAt: item.createdAt },
      ]);
    }
    setFolders(
      folders.map((f) =>
        f.name === 'Recycle Bin'
          ? { ...f, files: f.files.filter((file) => file !== item) }
          : f
      )
    );
  };

  // Permanently delete file or folder from Recycle Bin
  const handlePermanentDelete = (item) => {
    setFolders(
      folders.map((f) =>
        f.name === 'Recycle Bin'
          ? { ...f, files: f.files.filter((file) => file !== item) }
          : f
      )
    );
    setShowPermanentDeleteWarning(null);
  };

  return (
    <div className="client-details">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <input
          type="text"
          placeholder="Search documents"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
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

      <div className="subscription-section">
        <h3>Subscription Status</h3>
        <p>End Date: {client.subscriptionEndDate}</p>
        <p>Status: {client.subscriptionStatus}</p>
        <button onClick={handleChangeStatus} className="renew-button">
          {client.subscriptionStatus === 'active' ? 'Mark as Expired' : 'Renew Subscription'}
        </button>
      </div>

      {/* Renew Subscription Confirmation Popup */}
      {showRenewPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Has the client completed the payment for renewal?</p>
            <div className="popup-actions">
              <button onClick={confirmRenewSubscription} className="confirm-button">
                Yes
              </button>
              <button onClick={() => setShowRenewPopup(false)} className="cancel-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="create-folder-section">
        <button
          className="create-folder-button"
          onClick={() => setShowCreateFolderForm(!showCreateFolderForm)}
        >
          {showCreateFolderForm ? 'Cancel' : 'Create New Folder'}
        </button>

        {showCreateFolderForm && (
          <form className="create-folder-form" onSubmit={handleCreateFolder}>
            <div className="form-group">
              <label>Folder Name:</label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Create Folder
            </button>
          </form>
        )}
      </div>

      {showAlert && (
        <div className="duplicate-alert">
          Folder name already exists, give a different name. 🚫
        </div>
      )}

      <div className="folder-list">
        {filteredFolders.length > 0 ? (
          filteredFolders.map((folder) => {
            const searchTermForFolder = folderSearchTerms[folder.name] || '';
            const filteredFiles = folder.files
              .filter((file) =>
                file.name.toLowerCase().includes(searchTermForFolder.toLowerCase())
              )
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            const currentPage = currentPages[folder.name] || 1;
            const totalItems = filteredFiles.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const paginatedFiles = filteredFiles.slice(startIndex, startIndex + itemsPerPage);

            return (
              <div key={folder.name} className="folder">
                {editingFolder && editingFolder.name === folder.name ? (
                  <form
                    className="edit-folder-form"
                    onSubmit={handleUpdateFolderName}
                  >
                    <input
                      type="text"
                      value={editFolderName}
                      onChange={(e) => setEditFolderName(e.target.value)}
                      placeholder="Enter new folder name"
                      required
                    />
                    <button type="submit" className="save-button">
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setEditingFolder(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="folder-header">
                      <span>
                        {folder.icon} {folder.name}
                      </span>
                      <div className="folder-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEditFolder(folder)}
                          title="Edit Folder Name"
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => setShowDeleteWarning(folder.name)}
                          title="Delete Folder"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder={`Search in ${folder.name}`}
                      value={searchTermForFolder}
                      onChange={(e) => handleFolderSearch(folder.name, e.target.value)}
                      className="folder-search-bar"
                    />
                    <div className="file-list">
                      {paginatedFiles.length > 0 ? (
                        paginatedFiles.map((file, index) => (
                          <div key={file.name} className="file-item">
                            <span>
                              {file.name}{' '}
                              {index === 0 && startIndex === 0 && (
                                <span className="new-label">New</span>
                              )}
                            </span>
                            <button
                              className="delete-file-button"
                              onClick={() => handleDeleteFile(folder.name, file.name)}
                            >
                              🗑️
                            </button>
                          </div>
                        ))
                      ) : (
                        <p>No files found.</p>
                      )}
                    </div>
                    {totalItems > itemsPerPage && (
                      <div className="pagination">
                        <button
                          onClick={() =>
                            handlePageChange(folder.name, currentPage - 1)
                          }
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                        <span>
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() =>
                            handlePageChange(folder.name, currentPage + 1)
                          }
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(folder.name, e)}
                      style={{ display: 'none' }}
                      id={`upload-${folder.name}`}
                    />
                    <label htmlFor={`upload-${folder.name}`} className="upload-button">
                      Upload
                    </label>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <p>No folders found.</p>
        )}
      </div>

      {/* Recycle Bin Section */}
      <div className="recycle-bin-section">
        <h3>Recycle Bin</h3>
        {folders.find((f) => f.name === 'Recycle Bin').files.length > 0 ? (
          <div className="recycle-bin-list">
            {folders
              .find((f) => f.name === 'Recycle Bin')
              .files.map((item, index) => (
                <div key={index} className="recycle-bin-item">
                  <span>
                    {item.type === 'folder' ? '📁' : '📄'} {item.name} ({item.type})
                  </span>
                  <div className="recycle-bin-actions">
                    <button
                      className="restore-button"
                      onClick={() => handleRestore(item)}
                    >
                      Restore
                    </button>
                    <button
                      className="delete-permanently-button"
                      onClick={() => setShowPermanentDeleteWarning(item)}
                    >
                      Delete Permanently
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No items in Recycle Bin.</p>
        )}
      </div>

      {/* Delete Folder Warning */}
      {showDeleteWarning && (
        <div className="delete-warning">
          <p>
            All files in this folder will go to the Recycle Bin. Are you sure to delete this folder?
          </p>
          <button
            onClick={() => handleDeleteFolder(showDeleteWarning)}
            className="confirm-button"
          >
            Yes
          </button>
          <button
            onClick={() => setShowDeleteWarning(null)}
            className="cancel-button"
          >
            No
        </button>
        </div>
      )}

      {/* Permanent Delete Warning */}
      {showPermanentDeleteWarning && (
        <div className="delete-warning">
          <p>
            These deleted {showPermanentDeleteWarning.type}s can't be restored if deleted permanently. Are you sure to delete permanently?
          </p>
          <button
            onClick={() => handlePermanentDelete(showPermanentDeleteWarning)}
            className="confirm-button"
          >
            Yes
          </button>
          <button
            onClick={() => setShowPermanentDeleteWarning(null)}
            className="cancel-button"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;