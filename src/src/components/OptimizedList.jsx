import React from 'react';

export const OptimizedList = React.memo(({ items, onRemove }) => {
  console.log('🔄 Render: OptimizedList');

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item} <button onClick={() => onRemove(index)}>❌</button>
        </li>
      ))}
    </ul>
  );
});
