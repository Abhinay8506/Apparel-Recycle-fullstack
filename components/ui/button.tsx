import React from 'react';

const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}>
      {children}
    </button>
  );
};

export default Button;
