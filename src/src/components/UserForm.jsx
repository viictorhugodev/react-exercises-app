import { useState } from 'react';
import './UserForm.css';

const UserForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (touched.email && !form.email.includes('@')) newErrors.email = 'Correo inválido';
    if (touched.password && form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (touched.confirmPassword && form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'No coinciden';
    if (touched.terms && !form.terms) newErrors.terms = 'Debes aceptar los términos';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    validate();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      terms: true
    });

    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        alert('✅ Registro exitoso');
      }, 1500); // simula backend
    }
  };

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
            <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} onBlur={handleBlur} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group checkbox">
            <label htmlFor="terms">
              <input
                type="checkbox"
                name="terms"
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
