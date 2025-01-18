import React from 'react';
import './SortFilter.css';

interface SortFilterProps {
  setSortBy: (sortBy: string) => void;
  setFilterBy: (filterBy: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ setSortBy, setFilterBy }) => {
  return (
    <div className="sort-filter-container" style={{ marginBottom: '20px' }}>

      <button className="filter-button" style={{ backgroundColor: '#2196F3', color: 'white' }} onClick={() => setSortBy('taskTitle')}>

        ▼ Sort by Task Title
      </button>
      <button className="filter-button" style={{ backgroundColor: '#2196F3', color: 'white' }} onClick={() => setFilterBy('all')}>

        ▼ Show All
      </button>
      <button className="filter-button" style={{ backgroundColor: '#2196F3', color: 'white' }} onClick={() => setFilterBy('completed')}>

        ▼ Show Completed
      </button>
      <button className="filter-button" style={{ backgroundColor: '#2196F3', color: 'white' }} onClick={() => setFilterBy('pending')}>

        ▼ Show Pending
      </button>
    </div>
  );
};

export default SortFilter;
