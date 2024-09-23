import React from 'react';

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const Input = ({ value, onChange, label }: InputProps) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
