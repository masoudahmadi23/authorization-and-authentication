function FormInput({ name, label, value, type, onChange }) {
  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        type={type}
        name={name}
        id={name}
        onChange={onChange}
      />
    </div>
  );
}

export default FormInput;
