import PropTypes from "prop-types";

const inputTypes = {
  text: "disabled:bg-blue-gray-50 disable:border-none disabled:text-gray-700/40 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-emerald-300 focus:shadow-outline",
  number:
    "mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline",
  file: "file",
};

export const Input = ({
  type,
  placeholder,
  ref,
  value,
  onChange,
  name,
  label,
  readOnly,
  disabled,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        ref={ref}
        type={type}
        name={name}
        className={inputTypes[type]}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
      />
    </>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(["text", "number", "file"]),
  placeholder: PropTypes.string,
  ref: PropTypes.element,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
};
