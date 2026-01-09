import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { diamondsAPI } from '../../utils/api';
import { removeToken } from '../../utils/auth';
import DiamondForm from './DiamondForm';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [diamonds, setDiamonds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDiamond, setEditingDiamond] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiamonds();
  }, []);

  const fetchDiamonds = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await diamondsAPI.getAll({ limit: 100 });
      setDiamonds(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching diamonds');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this diamond?')) {
      return;
    }

    try {
      await diamondsAPI.delete(id);
      setSuccess('Diamond deleted successfully');
      fetchDiamonds();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting diamond');
    }
  };

  const handleEdit = (diamond) => {
    setEditingDiamond(diamond);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingDiamond(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingDiamond(null);
  };

  const handleFormSuccess = () => {
    setSuccess(editingDiamond ? 'Diamond updated successfully' : 'Diamond added successfully');
    setShowForm(false);
    setEditingDiamond(null);
    fetchDiamonds();
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>💎 Admin Dashboard</h1>
          <p>Manage diamond listings</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleAddNew}>
            + Add New Diamond
          </button>
          <button className="btn btn-secondary" onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
        </div>
      </div>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error">{error}</div>}

      {showForm && (
        <DiamondForm
          diamond={editingDiamond}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      <div className="admin-table-section">
        <h2>Diamond Listings ({diamonds.length})</h2>
        {loading ? (
          <div className="loading">Loading diamonds...</div>
        ) : diamonds.length === 0 ? (
          <div className="loading">No diamonds found. Add your first diamond!</div>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Shape</th>
                  <th>Carat</th>
                  <th>Clarity</th>
                  <th>Color</th>
                  <th>Cut</th>
                  <th>Polish</th>
                  <th>Symmetry</th>
                  <th>Fluorescence</th>
                  <th>Certificate</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {diamonds.map(diamond => (
                  <tr key={diamond._id}>
                    <td>{diamond.shape}</td>
                    <td>{diamond.carat}</td>
                    <td>{diamond.clarity}</td>
                    <td>{diamond.color}</td>
                    <td>{diamond.cut}</td>
                    <td>{diamond.polish}</td>
                    <td>{diamond.symmetry}</td>
                    <td>{diamond.fluorescence}</td>
                    <td>{diamond.certificate}</td>
                    <td>${diamond.price.toLocaleString()}</td>
                    <td>{diamond.location}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleEdit(diamond)}
                        style={{ marginRight: '5px', padding: '5px 10px', fontSize: '12px' }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(diamond._id)}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

