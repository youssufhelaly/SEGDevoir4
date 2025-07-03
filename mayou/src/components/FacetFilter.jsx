import React from 'react';
export default function FacetFilter({ filters, onChange, options }) {
  return (
    <aside className="facet-filter">
      {Object.entries(options).map(([key, values]) => (
        <div key={key} style={{ marginBottom: '1rem' }}>
          <h3>{key}</h3>
          {values.map(val => (
            <label key={val}>
              <input
                type="checkbox"
                checked={filters[key]?.includes(val)}
                onChange={() => onChange(key, val)}
              /> {val}
            </label>
          ))}
        </div>
      ))}
      <button onClick={() => onChange('reset')} className="btn-primary">Réinitialiser</button>
    </aside>
  );
}