import { buttonColor } from "./actionButton.constants";

export interface ButtonProps {
  onClick?: () => void;
  form?: string;
  type: "button" | "reset" | "submit";
  color?: keyof typeof buttonColor;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  id?: string;
}
