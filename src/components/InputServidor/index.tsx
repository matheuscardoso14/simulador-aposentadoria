import { memo } from "react";
import styles from "./InputServidor.module.scss";

export interface InputServidorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

function InputServidor({ label, value, onChange, placeholder, type, required }: InputServidorProps) {

  return (
    <div className={styles["input-container"]}>
      {label && <label>{label}</label>}
      <input value={value} onChange={(event) => onChange(event.target.value)} type={type} placeholder={placeholder} required={required} />
    </div>
  );
}

export default memo(InputServidor);