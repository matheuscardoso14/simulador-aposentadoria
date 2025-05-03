import { ReactNode } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps {
  children: string | ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function Button({ children, onClick, type = "button", disabled = false }: ButtonProps) {
  return (
    <button className={styles.button} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;