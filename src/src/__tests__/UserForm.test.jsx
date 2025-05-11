import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../components/UserForm';

describe('UserForm', () => {
  test('renderiza el formulario correctamente', () => {
    render(<UserForm />);
    expect(screen.getByText(/registro de usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
  });

  test('muestra errores si los campos están vacíos y se intenta enviar', async () => {
    render(<UserForm />);
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
    await waitFor(() => {
      expect(screen.getByText(/correo inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/mínimo 6 caracteres/i)).toBeInTheDocument();
      expect(screen.getByText(/no coinciden/i)).toBeInTheDocument();
      expect(screen.getByText(/debes aceptar los términos/i)).toBeInTheDocument();
    });
  });

  test('envía correctamente si los datos son válidos', async () => {
    render(<UserForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/^contraseña:/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/confirmar/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('checkbox'));

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    await waitFor(() =>
      expect(screen.getByText(/registro exitoso/i)).toBeInTheDocument()
    );
  });
});
