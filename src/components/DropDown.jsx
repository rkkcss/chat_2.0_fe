import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const DropDown = ({ children, dropDownElements }) => {
  const dropDownRef = useRef();
  const [openDropDown, setOpenDropDown] = useState(false);

  useEffect(() => {
    let clickHandler = (event) => {
      if (!dropDownRef.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    };
    document.addEventListener("mousedown", clickHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [dropDownRef]);

  return (
    <div
      ref={dropDownRef}
      className="relative"
      onClick={() => setOpenDropDown(!openDropDown)}
    >
      <div>{children}</div>
      {openDropDown && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {dropDownElements.map((element) => {
              return (
                <>
                  <a
                    key={element.id}
                    href="#"
                    className="text-gray-700 
                  flex items-center gap-2 
                  px-4 py-2 
                  text-sm hover:bg-emerald-300"
                    role="menuitem"
                    tabIndex="-1"
                    onClick={element.onClick}
                  >
                    {element.icon}
                    {element.label}
                  </a>
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

DropDown.propTypes = {
  children: PropTypes.element.isRequired,
  dropDownElements: PropTypes.array.isRequired,
};
