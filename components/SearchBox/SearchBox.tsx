import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    300
  );

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={updateSearchQuery}
    />
  );
}