import { Language } from "@/common_modules/types";
import styles from './select.module.css'

type Props = {
  value: string;
  languages: Language[];
  onChange: (lang: string) => void;
};

const Select = ({ value, languages, onChange }: Props) => {

  return (
    <select
      className={styles.select}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {languages.map((item) => (
        <option
          key={item.id}
          value={item.abbreviation}
        >
          {item.abbreviation}
        </option>
      ))}
    </select>
  );
};

export { Select };