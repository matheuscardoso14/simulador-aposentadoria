import styles from "./SelectServidor.module.scss";

interface SelectServidorProps {
  label?: string;
  placeholder?: string;
  options: Array<{ value: string, label: string }>;
  value: string;
}

function SelectServidor({ label, placeholder, options, value }: SelectServidorProps) {
  return (
    <div className={styles["select-container"]}>
      {label && <label>{label}</label>}
      <select value={value}>
        {placeholder && <option disabled>{placeholder}</option>}
        {options.map((option: { value: string, label: string }) => <option key={value}>{option.label}</option>)}
      </select>
    </div>
  )
}

export default SelectServidor;