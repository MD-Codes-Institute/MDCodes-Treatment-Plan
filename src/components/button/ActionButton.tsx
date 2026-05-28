import { ButtonProps } from "./actionButton.types";
import { buttonColor } from "./actionButton.constants";

const ActionButton: React.FC<ButtonProps> = ({
  onClick,
  type,
  color = "default",
  children,
  className,
  disabled = false,
}) => {
  const btnColor = buttonColor[color];
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${btnColor} ${
        color !== "gold" &&
        "bg-(--ion-background-inputs) border border-white shadow-[0px_0px_7px_#000]"
      } ${className} whitespace-nowrap text-[12px] md:[14px]`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ActionButton;
