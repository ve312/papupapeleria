function FAQPage() {
  const faqs = [
    {
      id: 1,
      question: '¿Hacen domicilios?',
      answer: 'Sí, contamos con servicio de domicilio en zonas seleccionadas.',
    },
    {
      id: 2,
      question: '¿Qué métodos de pago reciben?',
      answer: 'Aceptamos efectivo, transferencias y pagos digitales.',
    },
  ];

  return (
    <section className="page container">
      <h1>Preguntas frecuentes</h1>

      <div className="grid">
        {faqs.map((faq) => (
          <article className="card" key={faq.id}>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FAQPage;