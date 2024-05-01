import "./styles.css";
import { useState } from "react";
type Props = {
  onSearch: Function;
};
export default function AdminSearchBar({ onSearch }: Props) {
  const [text, setText] = useState("");

  function handleChange(event: any) {
    setText(event.target.value);
  }
  function onSubmit(event: any) {
    event.preventDefault();
    onSearch(text);
  }

  function handleResetClick(event: any) {
    setText("");
    event.preventDefault();
    onSearch(text);
  }

  return (
    <div className="admin-search-bar-container">
      <form className="admin-search-bar-form" onSubmit={onSubmit}>
        <button
          onClick={handleResetClick}
          className="admin-clear-search-btn btn btn-navy"
        >
          Limpar
        </button>
        <input
          value={text}
          onChange={handleChange}
          name="text"
          className="admin-search-bar-input base-input form-control"
          type="text"
          placeholder="O que você procura?"
        />
        <button className="admin-search-bar-btn btn btn-navy">Buscar</button>
      </form>
    </div>
  );
}
