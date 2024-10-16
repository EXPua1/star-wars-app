import React from "react";
import css from "./CharactersList.module.css";

const CharactersList = ({ characters }) => {
  return (
    <ul className={css.list}>
      {characters.map((character) => (
        <li className={css.item} key={character.id}>
          <div>
            <img
              src={`/public/images/characters/${character.id}.jpg`}
              alt={character.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x400";
              }} // Плейсхолдер
            />
            <p className={css.description}>{character.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default CharactersList;
