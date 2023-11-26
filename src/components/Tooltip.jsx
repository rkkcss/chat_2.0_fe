import PropTypes from "prop-types";

const textSizeClassTypes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const textPositionTypes = {
  bottom: "-translate-x-1/2 -translate-y-[-10%] left-[50%] top-[100%]",
  top: "-translate-x-1/2 -translate-y-[10%] left-[50%] bottom-[100%]",
  right: "left-[100%] ml-2 -translate-y-[-0%]",
  left: "right-[100%] mr-2",
};

export const Tooltip = ({
  children,
  tooltipMessage,
  textSize,
  textPosition,
}) => {
  const textSizeClass = textSizeClassTypes[textSize];
  const textPositionClass = textPositionTypes[textPosition];

  return (
    <div className="group relative inline-block my-auto">
      {children}
      <span
        className={`invisible
          group-hover:visible 
          group-hover:z-50
          transition 
          absolute 
          ${textPositionClass}
          max-w-[250px]
          p-1.5 dark:bg-zinc-800/80 bg-slate-200 text-slate-700 rounded-lg font-semibold
          w-max 
          whitespace-normal
          ${textSizeClass}`}
      >
        {tooltipMessage}
      </span>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  tooltipMessage: PropTypes.string.isRequired,
  textSize: PropTypes.oneOf(["sm", "md", "lg"]),
  textPosition: PropTypes.oneOf(["bottom", "left", "right", "left"]).isRequired,
};
