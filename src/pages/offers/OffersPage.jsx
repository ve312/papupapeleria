function OffersPage() {
  const offers = [
    { id: 1, name: 'Oferta escolar', discount: 20, active: true },
    { id: 2, name: 'Oferta de temporada', discount: 10, active: false },
  ];

  return (
    <section className="page container">
      <h1>Ofertas</h1>

      <div className="grid">
        {offers.map((offer) => (
          <article className="card" key={offer.id}>
            <h2>{offer.name}</h2>
            <p>Descuento: {offer.discount}%</p>
            <p>Estado: {offer.active ? 'Activa' : 'Inactiva'}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OffersPage;