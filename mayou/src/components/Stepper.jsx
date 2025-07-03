import React from 'react';
export default function Stepper({ steps, current }) {
  return (
    <div className="stepper">
      {steps.map((_, idx) => (
        <React.Fragment key={idx}>
          <div className={`stepper-step ${idx <= current ? (idx < current ? 'completed' : 'active') : ''}`}>
            {idx < current ? '✓' : idx + 1}
          </div>
          {idx < steps.length - 1 && <div className="stepper-line" />}
        </React.Fragment>
      ))}
    </div>
  );
}
