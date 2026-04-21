import { useState } from 'react';
import Button from '../../components/ui/Button';
import FormField from '../../components/forms/FormField';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Crear cuenta</h1>
        <p className="text-gray-500 text-center mb-8">Regístrate en Papupapeleria</p>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <Button type="submit" className="w-full py-3 rounded-xl">
            Registrarse
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;