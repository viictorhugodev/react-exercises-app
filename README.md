# 🧠 React Senior Interview Exercises

Este proyecto contiene una serie de ejercicios prácticos diseñados para demostrar habilidades clave de un **Frontend Developer Senior** especializado en **React**.

Incluye desafíos reales que simulan situaciones comunes en entrevistas técnicas **live coding**.

---

## 🚀 Tecnologías utilizadas

- React 18 + Vite
- CSS puro (sin frameworks)
- React Testing Library + Vitest
- Context API + useReducer
- Hooks modernos: `useState`, `useEffect`, `useReducer`, `useContext`
- Fetch API

---

## 📂 Estructura de ejercicios

### 1️⃣ Autocompletado con debounce
**Ruta:** `/exercise1`

- Input con debounce (500ms)
- Fetch a API de usuarios
- Filtrado en tiempo real
- Paginación manual
- UX amigable y visual limpio

### 2️⃣ To-Do List (con `useState`)
**Ruta:** `/exercise2`

- Crear, completar, editar y eliminar tareas
- Edición en línea
- Estado local simple con `useState`

### 3️⃣ Consumo de API + Paginación
**Ruta:** `/exercise3`

- Llamada a API de posts (`jsonplaceholder`)
- Render de tarjetas (cards) responsivas
- Paginación controlada
- Mensajes de error y loading

### 4️⃣ To-Do List con `useReducer`
**Ruta:** `/exercise4`

- Reemplazo de `useState` por `useReducer`
- Acciones centralizadas (`ADD`, `TOGGLE`, `EDIT`, `DELETE`)
- Patrón escalable y testable

### 5️⃣ Estado global con Context + Reducer
**Ruta:** `/exercise5`

- Uso de `Context API` + `useReducer` para compartir tareas globales
- Separación lógica (provider) y presentación (lista)
- Escalable para dashboards o layouts complejos

### 6️⃣ Formulario avanzado con validación
**Ruta:** `/exercise6`

- Validación en tiempo real con `onBlur`
- Validaciones personalizadas (email, contraseñas, checkbox)
- Simulación de envío con loading (`setTimeout`)
- Mensajes de error y éxito dinámicos

---

## ✅ Qué se demuestra

| Habilidad                      | Cubierta |
|-------------------------------|----------|
| Hooks básicos (`useState`, `useEffect`) | ✅ |
| Estado avanzado (`useReducer`)         | ✅ |
| Manejo de contexto global              | ✅ |
| Consumo de API y paginación            | ✅ |
| Validación de formularios              | ✅ |
| UX/feedback visual                     | ✅ |
| Arquitectura de componentes            | ✅ |
| Testing de formularios                 | ✅ |

---

## 📦 Cómo correr el proyecto

```bash
npm install
npm run dev
