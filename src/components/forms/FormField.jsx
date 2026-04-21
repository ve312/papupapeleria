function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
}) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 font-semibold text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
      />
    </div>
  );
}

export default FormField;