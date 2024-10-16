import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const CharacterGraph = ({ character, films, ships }) => {
  if (!character) {
    return <p>Loading character data...</p>;
  }

  const filmData = films || []; // Предполагается, что films — это массив
  const starships = ships || []; // Используем переданный параметр ships

  // Динамическое позиционирование узлов
  const nodes = [
    {
      id: "1",
      data: { label: `Имя: ${character.name}` },
      position: { x: 250, y: 0 },
      draggable: true, // Добавлено свойство draggable
    },
    ...filmData.map((film, index) => ({
      id: `film-${index}`,
      data: { label: `Фильм: ${film.title}` },
      position: { x: 100 + index * 150, y: 100 }, // Изменено расстояние для лучшего размещения
      draggable: true,
    })),
    ...starships.map((ship, index) => ({
      id: `ship-${index}`,
      data: { label: `Корабль: ${ship.name}` },
      position: { x: 100 + index * 150, y: 200 }, // Изменено расстояние для лучшего размещения
      draggable: true,
    })),
  ];

  const edges = [
    ...filmData.map((_, index) => ({
      id: `e1-film-${index}`,
      source: "1",
      target: `film-${index}`,
      type: "smoothstep",
    })),
    ...starships.map((_, index) => ({
      id: `e1-ship-${index}`,
      source: "1",
      target: `ship-${index}`,
      type: "smoothstep",
    })),
  ];

  return (
    <div style={{ height: 500 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CharacterGraph;
