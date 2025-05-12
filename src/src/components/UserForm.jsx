import { useUserForm } from '../hooks/useUserForm';
import './UserForm.css';

const UserForm = () => {

  const { errors, form, handleBlur, handleChange, handleSubmit, loading, submitted } = useUserForm()

  return (
    <div className="form-container">
      <h2>🧾 Registro de Usuario</h2>

      {loading && <p className="status">⏳ Enviando...</p>}

      {submitted ? (
        <p className="success">✅ Registro exitoso</p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-group checkbox">
            <label htmlFor="terms">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={form.terms}
                onChange={handleChange}
                onBlur={handleBlur}
              />{' '}
              Acepto los términos y condiciones
            </label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>

          <button type="submit">Registrarse</button>
        </form>
      )}
    </div>
  );
};

export default UserForm;
