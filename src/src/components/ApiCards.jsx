import { useEffect, useState } from 'react';
import './ApiCards.css';
import { useApiCards } from '../hooks/useApiCards';

export const ApiCards = () => {

  const { allPosts, currentPage, currentPosts, error, loading, nextPage, prevPage, totalPages } = useApiCards()

  if (loading) return <p className="status">Cargando posts...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="cards-wrapper">
      <div className="pagination-info">
        Página {currentPage} de {totalPages} | Total: {allPosts.length} posts
      </div>

      <div className="cards-container">
        {currentPosts.map((post) => (
          <div key={post.id} className="card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          ◀ Anterior
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Siguiente ▶
        </button>
      </div>
    </div>
  );
};

