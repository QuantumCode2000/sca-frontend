import Button from "../Button/Button";
import "./ButtonIcon.styles.css";

const ButtonIcon = ({ icon, onClick, textTooltip }) => {
  return (
    <div className="button-icon_style flex items-center justify-start gap-4">
      <div className="group relative inline-block whitespace-nowrap">
        <Button text={icon} textStyle={""} onClick={onClick} />
        <span
          role="tooltip"
          className="tooltip pointer-events-none absolute z-50 inline-flex items-center justify-center rounded-md px-3 py-2 font-semibold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-gray-700 text-white min-h-7 text-sm left-1/2 -translate-x-1/2 after:absolute after:block after:size-0 after:border-8 after:border-transparent after:border-t-gray-700 after:-bottom-[0.95rem] after:left-1/2 after:-translate-x-1/2 top-[-2.5rem]"
        >
          {textTooltip}
        </span>
      </div>
    </div>
  );
};

export default ButtonIcon;
