import { useState } from 'react';
import Button from '../../components/ui/Button';

function CreateFaqPage() {
  const [form, setForm] = useState({
    pregunta: '',
    respuesta: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('FAQ creada:', form);
  };

  return (
    <section className="page container">
      <h1>Crear pregunta frecuente</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pregunta">Pregunta</label>
          <input
            id="pregunta"
            name="pregunta"
            value={form.pregunta}
            onChange={handleChange}
            className="input"
            placeholder="Escribe la pregunta"
          />
        </div>

        <div className="form-group">
          <label htmlFor="respuesta">Respuesta</label>
          <textarea
            id="respuesta"
            name="respuesta"
            value={form.respuesta}
            onChange={handleChange}
            className="textarea"
            rows={5}
            placeholder="Escribe la respuesta"
          />
        </div>

        <Button type="submit">Guardar pregunta frecuente</Button>
      </form>
    </section>
  );
}

export default CreateFaqPage;