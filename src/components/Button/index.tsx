import { memo, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: string | ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
}

function Button({ children, onClick, type = "button", disabled = false, id }: ButtonProps) {
  return (
    <button className={styles.button} id={id} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default memo(Button);