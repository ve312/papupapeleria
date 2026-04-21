import { useState } from 'react';
import FormField from '../../components/forms/FormField';
import ImageField from '../../components/forms/ImageField';
import Button from '../../components/ui/Button';

function CreateProductPage() {
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    idcategoria: '',
    descripcion: '',
    stock: '',
    imagenes: '',
    oferta: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      imagenes: form.imagenes
        .split('\n')
        .map((img) => img.trim())
        .filter(Boolean),
      oferta: form.oferta || null,
    };

    console.log('Producto creado:', payload);
  };

  return (
    <section className="page container">
      <h1>Crear producto</h1>

      <form className="form" onSubmit={handleSubmit}>
        <FormField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre del producto"
        />

        <FormField
          label="Precio"
          name="precio"
          type="number"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio del producto"
        />

        <FormField
          label="ID Categoría"
          name="idcategoria"
          value={form.idcategoria}
          onChange={handleChange}
          placeholder="ID de la categoría"
        />

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            className="textarea"
            rows={4}
            placeholder="Descripción del producto"
          />
        </div>

        <FormField
          label="Stock"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Cantidad disponible"
        />

        <ImageField
          label="Imágenes"
          name="imagenes"
          value={form.imagenes}
          onChange={handleChange}
          placeholder="https://imagen1.com&#10;https://imagen2.com"
        />

        <FormField
          label="Oferta (opcional)"
          name="oferta"
          value={form.oferta}
          onChange={handleChange}
          placeholder="ID o nombre de la oferta"
        />

        <Button type="submit">Guardar producto</Button>
      </form>
    </section>
  );
}

export default CreateProductPage;