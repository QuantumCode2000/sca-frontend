import "./Modal.styles.css";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <div
      className={`main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated ${
        isOpen ? "fadeIn" : "fadeOut"
      }`}
      style={{
        background: "rgba(0,0,0,.7)",
        display: isOpen ? "flex" : "none",
      }}
    >
      <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-4xl mx-auto rounded z-50 overflow-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{title}</p>
            <div className="modal-close cursor-pointer z-50" onClick={onClose}>
              <IoMdCloseCircleOutline />
            </div>
          </div>
          <div className="my-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
