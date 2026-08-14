function Button({ text, type = "button", className = "" }) {
  return (
    <button
      type={type}
      className={`primary-btn ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;