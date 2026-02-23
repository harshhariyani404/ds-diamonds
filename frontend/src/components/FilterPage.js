import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { diamondsAPI } from '../utils/api';
import './FilterPage.css';

const FilterPage = () => {
  const [filters, setFilters] = useState({
    shape: '',
    clarity: '',
    color: '',
    cut: '',
    polish: '',
    symmetry: '',
    fluorescence: '',
    certificate: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    carat: '',
  });

  const [diamonds, setDiamonds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const shapes = ['ROUND', 'PRINCESS', 'CUSHION', 'EMERALD', 'OVAL', 'PEAR', 'MARQUISE', 'RADIANT', 'HEART', 'ASSCHER'];
  const clarities = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'];
  const colors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const cuts = ['EXCELLENT', 'VERY GOOD', 'GOOD', 'FAIR', 'POOR'];
  const fluorescences = ['NONE', 'FAINT', 'MEDIUM', 'STRONG', 'VERY STRONG'];
  const certificates = ['GIA', 'IGI', 'HRD', 'AGS', 'EGL', 'OTHER'];

  // ✅ FIXED: memoized function
  const fetchDiamonds = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const params = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params[key] = filters[key];
        }
      });

      const response = await diamondsAPI.getAll(params);
      setDiamonds(response.data.data || []);
      setTotal(response.data.total || 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching diamonds');
      setDiamonds([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // ✅ FIXED: correct dependency
  useEffect(() => {
    fetchDiamonds();
  }, [fetchDiamonds]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    fetchDiamonds();
  };

  const handleReset = () => {
    setFilters({
      shape: '',
      clarity: '',
      color: '',
      cut: '',
      polish: '',
      symmetry: '',
      fluorescence: '',
      certificate: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      carat: '',
    });
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <div className="header-content">
          <div>

            <a href="https://dsbrothers.group/" className='Heading'>
            <h1>💎 D.S. Brothers</h1>
            </a>
            <p>Search and filter diamonds by various attributes</p>
          </div>
          <Link to="/admin/login" className="admin-login-btn">
            🔐 Admin Login
          </Link>
        </div>
      </div>

      <div className="filter-section">
        <h3>Shape</h3>
        <div className="filter-chips">
          {shapes.map(shape => (
            <button
              key={shape}
              className={`filter-chip ${filters.shape === shape ? 'active' : ''}`}
              onClick={() => handleFilterChange('shape', filters.shape === shape ? '' : shape)}
            >
              {shape}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Clarity</h3>
        <div className="filter-chips">
          {clarities.map(clarity => (
            <button
              key={clarity}
              className={`filter-chip ${filters.clarity === clarity ? 'active' : ''}`}
              onClick={() => handleFilterChange('clarity', filters.clarity === clarity ? '' : clarity)}
            >
              {clarity}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Color</h3>
        <div className="filter-chips">
          {colors.map(color => (
            <button
              key={color}
              className={`filter-chip ${filters.color === color ? 'active' : ''}`}
              onClick={() => handleFilterChange('color', filters.color === color ? '' : color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="form-row">
          <div>
            <h3>Cut</h3>
            <select
              className="filter-select"
              value={filters.cut}
              onChange={(e) => handleFilterChange('cut', e.target.value)}
            >
              <option value="">All Cuts</option>
              {cuts.map(cut => (
                <option key={cut} value={cut}>{cut}</option>
              ))}
            </select>
          </div>

          <div>
            <h3>Polish</h3>
            <select
              className="filter-select"
              value={filters.polish}
              onChange={(e) => handleFilterChange('polish', e.target.value)}
            >
              <option value="">All Polish</option>
              {cuts.map(polish => (
                <option key={polish} value={polish}>{polish}</option>
              ))}
            </select>
          </div>

          <div>
            <h3>Symmetry</h3>
            <select
              className="filter-select"
              value={filters.symmetry}
              onChange={(e) => handleFilterChange('symmetry', e.target.value)}
            >
              <option value="">All Symmetry</option>
              {cuts.map(symmetry => (
                <option key={symmetry} value={symmetry}>{symmetry}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <div className="form-row">
          <div>
            <h3>Fluorescence</h3>
            <select
              className="filter-select"
              value={filters.fluorescence}
              onChange={(e) => handleFilterChange('fluorescence', e.target.value)}
            >
              <option value="">All Fluorescence</option>
              {fluorescences.map(fluorescence => (
                <option key={fluorescence} value={fluorescence}>{fluorescence}</option>
              ))}
            </select>
          </div>

          <div>
            <h3>Certificate</h3>
            <select
              className="filter-select"
              value={filters.certificate}
              onChange={(e) => handleFilterChange('certificate', e.target.value)}
            >
              <option value="">All Certificates</option>
              {certificates.map(certificate => (
                <option key={certificate} value={certificate}>{certificate}</option>
              ))}
            </select>
          </div>

          <div>
            <h3>Carat</h3>
            <input
              type="number"
              className="filter-select"
              placeholder="Enter carat"
              value={filters.carat}
              onChange={(e) => handleFilterChange('carat', e.target.value)}
              step="0.01"
              min="0.01"
            />
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="range-inputs">
          <input
            type="number"
            className="range-input"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          />
          <span>to</span>
          <input
            type="number"
            className="range-input"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Location</h3>
        <input
          type="text"
          className="filter-select"
          placeholder="Enter location (e.g., HK, NY, LA)"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />
      </div>

      <div className="filter-actions">
        <button className="btn btn-primary" onClick={handleSearch}>
          🔍 Search
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          🔄 Reset Filters
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="results-section">
        <div className="results-header">
          <h2>Results</h2>
          <div className="results-count">Found: {total} diamonds</div>
        </div>

        {loading ? (
          <div className="loading">Loading diamonds...</div>
        ) : diamonds.length === 0 ? (
          <div className="loading">No diamonds found.</div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="diamonds-table">
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
                </tr>
              </thead>
              <tbody>
                {diamonds.map((diamond) => (
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

export default FilterPage;

