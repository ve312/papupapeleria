function ImageField({ label, name, value, onChange, placeholder = '' }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="textarea"
        rows={4}
      />
      <small>Escribe una URL por línea para varias imágenes.</small>
    </div>
  );
}

export default ImageField;