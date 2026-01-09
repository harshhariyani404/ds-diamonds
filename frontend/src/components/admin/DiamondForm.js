import React, { useState, useEffect } from 'react';
import { diamondsAPI } from '../../utils/api';
import './DiamondForm.css';

const DiamondForm = ({ diamond, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    shape: 'ROUND',
    carat: '',
    clarity: 'VS1',
    color: 'G',
    cut: 'EXCELLENT',
    polish: 'EXCELLENT',
    symmetry: 'EXCELLENT',
    fluorescence: 'NONE',
    certificate: 'GIA',
    price: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (diamond) {
      setFormData({
        shape: diamond.shape || 'ROUND',
        carat: diamond.carat || '',
        clarity: diamond.clarity || 'VS1',
        color: diamond.color || 'G',
        cut: diamond.cut || 'EXCELLENT',
        polish: diamond.polish || 'EXCELLENT',
        symmetry: diamond.symmetry || 'EXCELLENT',
        fluorescence: diamond.fluorescence || 'NONE',
        certificate: diamond.certificate || 'GIA',
        price: diamond.price || '',
        location: diamond.location || '',
      });
    }
  }, [diamond]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        ...formData,
        carat: parseFloat(formData.carat),
        price: parseFloat(formData.price),
      };

      if (diamond) {
        await diamondsAPI.update(diamond._id, data);
      } else {
        await diamondsAPI.create(data);
      }

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving diamond');
    } finally {
      setLoading(false);
    }
  };

  const shapes = ['ROUND', 'PRINCESS', 'CUSHION', 'EMERALD', 'OVAL', 'PEAR', 'MARQUISE', 'RADIANT', 'HEART', 'ASSCHER'];
  const clarities = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'];
  const colors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const grades = ['EXCELLENT', 'VERY GOOD', 'GOOD', 'FAIR', 'POOR'];
  const fluorescences = ['NONE', 'FAINT', 'MEDIUM', 'STRONG', 'VERY STRONG'];
  const certificates = ['GIA', 'IGI', 'HRD', 'AGS', 'EGL', 'OTHER'];

  return (
    <div className="form-overlay">
      <div className="diamond-form">
        <div className="form-header">
          <h2>{diamond ? 'Edit Diamond' : 'Add New Diamond'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Shape *</label>
              <select name="shape" value={formData.shape} onChange={handleChange} required>
                {shapes.map(shape => (
                  <option key={shape} value={shape}>{shape}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Carat *</label>
              <input
                type="number"
                name="carat"
                value={formData.carat}
                onChange={handleChange}
                required
                step="0.01"
                min="0.01"
                placeholder="e.g., 1.5"
              />
            </div>

            <div className="form-group">
              <label>Clarity *</label>
              <select name="clarity" value={formData.clarity} onChange={handleChange} required>
                {clarities.map(clarity => (
                  <option key={clarity} value={clarity}>{clarity}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Color *</label>
              <select name="color" value={formData.color} onChange={handleChange} required>
                {colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Cut *</label>
              <select name="cut" value={formData.cut} onChange={handleChange} required>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Polish *</label>
              <select name="polish" value={formData.polish} onChange={handleChange} required>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Symmetry *</label>
              <select name="symmetry" value={formData.symmetry} onChange={handleChange} required>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Fluorescence *</label>
              <select name="fluorescence" value={formData.fluorescence} onChange={handleChange} required>
                {fluorescences.map(fluorescence => (
                  <option key={fluorescence} value={fluorescence}>{fluorescence}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Certificate *</label>
              <select name="certificate" value={formData.certificate} onChange={handleChange} required>
                {certificates.map(certificate => (
                  <option key={certificate} value={certificate}>{certificate}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="e.g., 5000"
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., HK, NY, LA"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : diamond ? 'Update Diamond' : 'Add Diamond'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiamondForm;

