import { useState } from 'react';
import Button from '../../components/ui/Button';
import FormField from '../../components/forms/FormField';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Iniciar sesión</h1>
        <p className="text-gray-500 text-center mb-8">Ingresa a tu cuenta</p>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <Button type="submit" className="w-full py-3 rounded-xl">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;