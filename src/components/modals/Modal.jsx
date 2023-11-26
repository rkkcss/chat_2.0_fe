import { CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Divider } from "../Divider";

const modalSize = {
  md: "md:max-w-3xl",
  lg: "md:max-w-5xl",
};

export const Modal = ({ children, isOpen, closeModal, title, size }) => {
  const modalSizeClass = modalSize[size];

  return (
    <>
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                className={`transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl ${modalSizeClass}`}
              >
                <div className="bg-white px-4 pb-4 pt-2 sm:p-6 sm:pt-3 sm:pb-4">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-700">
                      {title}
                    </span>
                    <CloseOutlined
                      className="text-gray-700 rounded-full p-0.5 hover:bg-gray-100 cursor-pointer"
                      onClick={closeModal}
                      style={{ fontSize: "20px" }}
                    />
                  </div>
                  <Divider space={"md"} />
                  {/* Modal body */}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  size: PropTypes.oneOf(["md", "lg"]),
};
