function ToggleField({ label, name, checked, onChange }) {
  return (
    <div className="form-group checkbox-group">
      <label htmlFor={name}>
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
}

export default ToggleField;