import { useState } from 'react';

export const useUserForm = () => {

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ✅ Validación flexible: force = true valida todo
  const validate = (force = false) => {
    const newErrors = {};

    if ((force || touched.email) && !form.email.includes('@')) {
      newErrors.email = 'Correo inválido';
    }

    if ((force || touched.password) && form.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    if (
      (force || touched.confirmPassword) &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = 'No coinciden';
    }

    if ((force || touched.terms) && !form.terms) {
      newErrors.terms = 'Debes aceptar los términos';
    }

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
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Marca todos como "tocados"
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    if (validate(true)) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        alert('✅ Registro exitoso');
      }, 1500);
    }
  };

  return {
    form,
    errors,
    loading,
    submitted,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
