// ErrorCard.jsx
import React from 'react';
import './ErrorCard.css';

function ErrorCard({ message }) {
  return (
    <div className="card">
      <span className="icon">⚠️</span>
      <div className="text">
        <span className="title">Something went wrong</span>
        <span className="message">{message}</span>
      </div>
    </div>
  );
}

export default ErrorCard;