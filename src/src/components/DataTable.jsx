import { useEffect, useState } from 'react';
import './DataTable.css';

const ITEMS_PER_PAGE = 5;

export const DataTable = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await res.json();
      setData(json);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reinicia la paginación al aplicar filtro
  };

  return (
    <div className="table-wrapper">
      <h2>📋 Usuarios</h2>

      <input
        type="text"
        placeholder="Filtrar por nombre..."
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />

      {loading ? (
        <p className="status">Cargando...</p>
      ) : (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-results">No hay resultados</td>
                </tr>
              ) : (
                currentItems.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address.city}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              ◀ Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Siguiente ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

