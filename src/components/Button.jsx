import PropTypes from "prop-types";

const buttonVariants = {
  primary: "bg-emerald-300 text-gray-900 hover:bg-emerald-400",
  secondary: "bg-white",
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
      className={`${buttonClass} text-lg font-medium rounded-xl border px-4 py-1.5 border-emerald-400`}
      type={buttonType}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  onClick: PropTypes.func,
};
