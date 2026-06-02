import { ButtonProps } from "./actionButton.types";
import { buttonColor } from "./actionButton.constants";

const ActionButton: React.FC<ButtonProps> = ({
  onClick,
  type,
  color = "default",
  children,
  className,
  disabled = false,
  id
}) => {
  const btnColor = buttonColor[color];
  return (
    <button
      type={type}
      onClick={onClick}
      id={id}
      className={`${btnColor} ${
        color !== "gold" &&
        "bg-(--ion-background-inputs) shadow-[0px_0px_7px_#000]"
      } ${className} whitespace-nowrap text-[12px] md:[14px]`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ActionButton;
