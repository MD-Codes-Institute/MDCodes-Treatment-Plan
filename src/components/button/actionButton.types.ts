import { buttonColor } from "./actionButton.constants";

export interface ButtonProps {
  onClick: () => void;
  type: "button" | "reset" | "submit";
  color?: keyof typeof buttonColor;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}
