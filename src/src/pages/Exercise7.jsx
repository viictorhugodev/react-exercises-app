import { useState, useCallback, useMemo } from 'react';
import { OptimizedList } from '../components/OptimizedList';

const Exercise7 = () => {
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState(['Manzana', 'Banana']);

  // ✅ useCallback: mantiene la referencia estable
  const handleRemove = useCallback((indexToRemove) => {
    setItems((prev) => prev.filter((_, i) => i !== indexToRemove));
  }, []);

  const handleAdd = useCallback(() => {
    const newItem = `Fruta ${Math.floor(Math.random() * 1000)}`;
    setItems((prev) => [...prev, newItem]);
  }, []);

  // 🧮 useMemo: simula un cálculo costoso
  const expensiveCalculation = useMemo(() => {
    console.log('🧠 Ejecutando cálculo costoso...');
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) {
      sum += i;
    }
    return sum;
  }, [items.length]); // solo cambia si cambia el tamaño de la lista

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>⚙️ Ejercicio 7: Optimización de render</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setCounter((c) => c + 1)}>Contador: {counter}</button>
        <p>Cálculo pesado (memoizado): {expensiveCalculation}</p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleAdd}>➕ Agregar fruta</button>
      </div>

      <OptimizedList items={items} onRemove={handleRemove} />
    </div>
  );
};

export default Exercise7;
