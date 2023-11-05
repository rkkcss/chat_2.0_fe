import PropTypes from "prop-types";

const spaceTypes = {
  sm: "py-2",
  md: "py-4",
  lg: "py-6",
};

export const Divider = ({ text, space }) => {
  const spaceClass = spaceTypes[space];
  return (
    <div className={`relative flex ${spaceClass} items-center`}>
      <div className="flex-grow border-t border-gray-400"></div>
      {text && <span className="flex-shrink mx-4 text-gray-400">{text}</span>}
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
};

Divider.propTypes = {
  text: PropTypes.string,
  space: PropTypes.oneOf(["sm", "md", "lg"]),
};
