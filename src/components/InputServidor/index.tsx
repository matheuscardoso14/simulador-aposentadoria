import styles from "./InputServidor.module.scss";

export interface InputServidorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

function InputServidor({ label, value, onChange, placeholder, type }: InputServidorProps) {
  return (
    <div className={styles["input-container"]}>
      {label && <label>{label}</label>}
      <input value={value} onChange={() => onChange} type={type} placeholder={placeholder} />
    </div>
  )
}

export default InputServidor;