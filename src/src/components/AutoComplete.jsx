import { useAutocomplete } from '../hooks/useAutocomplete';
import './AutoComplete.css';

export const AutoComplete = () => {

  const { allResults, currentResults, loading, page, query, resultsPerPage, setPage, setQuery, totalPages } = useAutocomplete();

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


