import { useState } from 'react';
import FormField from '../../components/forms/FormField';
import ToggleField from '../../components/forms/ToggleField';
import Button from '../../components/ui/Button';

function CreateOfferPage() {
  const [form, setForm] = useState({
    nombre: '',
    descuento: '',
    activa: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Oferta creada:', form);
  };

  return (
    <section className="page container">
      <h1>Crear oferta</h1>

      <form className="form" onSubmit={handleSubmit}>
        <FormField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre de la oferta"
        />

        <FormField
          label="Descuento (%)"
          name="descuento"
          type="number"
          value={form.descuento}
          onChange={handleChange}
          placeholder="Ejemplo: 20"
        />

        <ToggleField
          label="Activa"
          name="activa"
          checked={form.activa}
          onChange={handleChange}
        />

        <Button type="submit">Guardar oferta</Button>
      </form>
    </section>
  );
}

export default CreateOfferPage;