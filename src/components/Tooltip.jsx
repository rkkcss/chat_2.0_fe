import PropTypes from "prop-types";

export const Tooltip = ({ children, tooltipMessage }) => {
  return (
    <>
      <div className="group relative block">
        {children}
        <span
          className="invisible 
          group-hover:visible 
          group-hover:z-50
          opacity-0 
          group-hover:opacity-100 
          transition 
          absolute 
          my-auto 
          ml-2  
          whitespace-nowrap
          p-1.5 dark:bg-zinc-800/80 bg-slate-300/50 text-gray-700 rounded-lg font-semibold"
        >
          {tooltipMessage}
        </span>
      </div>
    </>
  );
};

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  tooltipMessage: PropTypes.string.isRequired,
};
