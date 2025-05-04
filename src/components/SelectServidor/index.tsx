import { capitalizeFirstLetter } from "../../utils";
import styles from "./SelectServidor.module.scss";

interface SelectServidorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: string[];
}

function SelectServidor({ label, value, onChange, placeholder, options }: SelectServidorProps) {
  return (
    <div className={styles["select-container"]}>
      {label && <label>{label}</label>}
      <select value={value !== "" ? value : placeholder} onChange={(event) => onChange(event.target.value)}>
        {placeholder && <option disabled>{placeholder}</option>}
        {options.map((option: string) => <option key={option}>{capitalizeFirstLetter(option)}</option>)}
      </select>
    </div>
  );
}

export default SelectServidor;