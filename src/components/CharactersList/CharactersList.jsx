import React from "react";
import css from "./CharactersList.module.css";
import { Link, useLocation } from "react-router-dom";

const CharactersList = ({ characters }) => {
  if (characters.length === 0) {
    return <div>No characters available</div>; // Убедитесь, что текст совпадает
  }
  return (
    <ul className={css.list}>
      {characters.map((character) => (
        <li className={css.item} key={character.id}>
          <Link
            to={`/characters/${character.id}`}
            state={{ name: character.name }}
          >
            <div>
              <img
                src={`/images/characters/${character.id}.jpg`}
                alt={character.name}
              />
              <p className={css.description}>{character.name}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
