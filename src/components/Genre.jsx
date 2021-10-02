import React from 'react';

const Genre = ({ id, name, checked, onChange }) => {
  return (
    <div className="genreItem" data-testid={`genreItem-${id}`}>
      <label className="genreLabel" data-testid={`genreLabel-${id}`}>
        <input key={Math.random()} type="checkbox" name={name} value={id} onChange={(genreChecked) => onChange(id, genreChecked.value)}  defaultChecked={checked} data-testid={`genreCheckbox-${id}`}></input>
        {name}
      </label>
    </div>
  );
};

export default Genre;