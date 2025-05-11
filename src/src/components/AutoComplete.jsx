import { useState, useEffect } from 'react';
import './AutoComplete.css';

export const AutoComplete = () => {
  const [query, setQuery] = useState('');
  const [allResults, setAllResults] = useState([]);
  const [page, setPage] = useState(1);
  const [resultsPerPage] = useState(3);
  const [loading, setLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    if (query.trim() === '') {
      setAllResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetchResults(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchResults = async (text) => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
      const data = await response.json();
      const filtered = data.filter(user =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setAllResults(filtered);
      setPage(1); // Reinicia página al buscar
    } catch (err) {
      console.error('Error fetching data:', err);
      setAllResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Paginación
  const indexOfLast = page * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentResults = allResults.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allResults.length / resultsPerPage);

  return (
    <div className="autocomplete-container">
      <h2>🔍 Buscador de usuarios</h2>
      <input
        className="autocomplete-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nombre..."
      />
      {loading && <p>Cargando...</p>}

      <ul className="autocomplete-list">
        {currentResults.map((user) => (
          <li key={user.id}>
            <span className="icon">👤</span> {user.name}
          </li>
        ))}
        {!loading && query && allResults.length === 0 && <li>No hay resultados</li>}
      </ul>

      {allResults.length > resultsPerPage && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            ◀ Anterior
          </button>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Siguiente ▶
          </button>
        </div>
      )}
    </div>
  );
};


