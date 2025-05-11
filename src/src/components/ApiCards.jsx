import { useEffect, useState } from 'react';
import './ApiCards.css';

const POSTS_PER_PAGE = 4;

export const ApiCards = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
      })
      .then((data) => {
        setAllPosts(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

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

