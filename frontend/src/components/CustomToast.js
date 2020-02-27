import React from 'react';

export const CustomToast = ({ appearance, children }) => {
  return (
    <div style={{ background: appearance === 'error' ? 'red' : 'green' }}>
      {children}
    </div>
  );
};

export default CustomToast;
