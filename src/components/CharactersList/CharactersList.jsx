import React from "react";
import css from "./CharactersList.module.css";

const CharactersList = ({ characters }) => {
  return (
    <ul className={css.list}>
      {characters.map((character) => (
        <li className={css.item} key={character.id}>
          <div>
            <img
              src={`/images/characters/${character.id}.jpg`}
              alt={character.name}
            />
            <p className={css.description}>{character.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default CharactersList;
