import { useState } from 'react';
import FormField from '../../components/forms/FormField';
import Button from '../../components/ui/Button';

function CreateCategoryPage() {
  const [form, setForm] = useState({
    nombre: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Categoría creada:', form);
  };

  return (
    <section className="page container">
      <h1>Crear categoría</h1>

      <form className="form" onSubmit={handleSubmit}>
        <FormField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre de la categoría"
        />

        <Button type="submit">Guardar categoría</Button>
      </form>
    </section>
  );
}

export default CreateCategoryPage;