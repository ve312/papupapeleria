import { useState } from 'react';
import FormField from '../../components/forms/FormField';
import Button from '../../components/ui/Button';

function RegisterPage() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
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
    console.log('Registro enviado:', form);
  };

  return (
    <section className="page container">
      <h1>Registro de usuario</h1>

      <form className="form" onSubmit={handleSubmit}>
        <FormField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ingresa tu nombre"
        />

        <FormField
          label="Correo"
          name="correo"
          type="email"
          value={form.correo}
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

        <Button type="submit">Registrarse</Button>
      </form>
    </section>
  );
}

export default RegisterPage;