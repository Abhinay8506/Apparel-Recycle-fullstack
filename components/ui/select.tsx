import React from 'react';

const Select: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }> = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
