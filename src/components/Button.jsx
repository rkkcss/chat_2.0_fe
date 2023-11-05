import PropTypes from "prop-types";

const buttonVariants = {
  primary:
    "bg-emerald-300 text-gray-900 hover:bg-emerald-400 border-emerald-400",
  secondary: "bg-white border-emerald-400",
  danger: "bg-red-600 border-red-500 text-slate-50",
};

const buttonTypes = {
  submit: "submit",
  button: "button",
};

export const Button = ({ text, variant, type, onClick }) => {
  const buttonClass = buttonVariants[variant];
  const buttonType = buttonTypes[type];

  return (
    <button
      className={`${buttonClass} text-sm font-medium rounded-md border px-5 py-1.5`}
      type={buttonType}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]).isRequired,
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  onClick: PropTypes.func,
};
