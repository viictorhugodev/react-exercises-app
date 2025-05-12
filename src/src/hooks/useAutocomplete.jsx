import { useState, useEffect } from 'react';

export const useAutocomplete = () => {

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


  return {
    query,
    setQuery,
    allResults,
    currentResults,
    loading,
    page,
    setPage,
    resultsPerPage,
    totalPages
  }
}
