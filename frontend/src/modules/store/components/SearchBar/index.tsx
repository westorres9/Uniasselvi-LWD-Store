import "./styles.css";
import { useState } from "react";
type Props = {
  onSearch: Function;
};
export default function SearchBar({ onSearch }: Props) {
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
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={onSubmit}>
        <button
          onClick={handleResetClick}
          className="clear-search-btn btn btn-outline-dark"
        >
          Limpar
        </button>
        <input
          value={text}
          onChange={handleChange}
          name="text"
          className="search-bar-input base-input form-control"
          type="text"
          placeholder="O que você procura?"
        />
        <button className="search-bar-btn btn btn-dark">Buscar</button>
      </form>
    </div>
  );
}
