import { useState } from 'react';
import FormField from '../../components/forms/FormField';
import Button from '../../components/ui/Button';

function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login enviado:', form);
  };

  return (
    <section className="page container">
      <h1>Login</h1>

      <form className="form" onSubmit={handleSubmit}>
        <FormField
          label="Correo electrónico"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Ingresa tu correo"
        />

        <FormField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Ingresa tu contraseña"
        />

        <Button type="submit">Iniciar sesión</Button>
      </form>
    </section>
  );
}

export default LoginPage;