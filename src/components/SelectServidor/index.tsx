import styles from "./SelectServidor.module.scss";

interface SelectServidorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: Array<{ value: string, label: string }>;
}

function SelectServidor({ label, value, onChange, placeholder, options }: SelectServidorProps) {
  return (
    <div className={styles["select-container"]}>
      {label && <label>{label}</label>}
      <select value={value !== "" ? value : placeholder} onChange={(event) => onChange(event.target.value)}>
        {placeholder && <option disabled>{placeholder}</option>}
        {options.map((option: { value: string, label: string }) => <option key={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
}

export default SelectServidor;