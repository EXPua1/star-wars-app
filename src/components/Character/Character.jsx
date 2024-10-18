import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import css from "./Character.module.css";

const CharacterGraph = ({ character, films, ships }) => {
  if (!character) {
    return <p>Loading character data...</p>;
  }

  const filmData = films || [];
  const starships = ships || [];

  // Динамическое позиционирование узлов
  const calculateNodePositions = (filmData, starships) => {
    const nodes = [];
    const isSmallScreen = window.innerWidth < 480;
    const spacing = isSmallScreen ? 120 : 200;

    nodes.push({
      id: "1",
      data: { label: `Name: ${character.name}` },
      position: { x: 250, y: 0 }, // main node
      draggable: true,
      style: {
        background: "#ffee58",
        color: "black",
        border: "1px solid #333",
        borderRadius: "15px",
      }, // color node
    });

    filmData.forEach((film, index) => {
      nodes.push({
        id: `film-${index}`,
        data: { label: `Film: ${film.title}` },
        position: {
          x: 250 - (spacing * (filmData.length - 1)) / 2 + index * spacing,
          y: 100,
        },
        draggable: true,
        style: {
          background: "#007bff",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: "15px",
        }, // color film
      });
    });

    starships.forEach((ship, index) => {
      nodes.push({
        id: `ship-${index}`,
        data: { label: `Ship: ${ship.name}` },
        position: {
          x: 250 - (spacing * (starships.length - 1)) / 2 + index * spacing,
          y: 200,
        },
        draggable: true,
        style: {
          background: "#e53935",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: "15px",
        }, // color ship
      });
    });

    return nodes;
  };

  const nodes = calculateNodePositions(filmData, starships);

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
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow
        className={css.flow}
        nodes={nodes}
        edges={edges}
        draggable={false}
        defaultViewport={{ x: 200, y: 100, zoom: 0.8 }}
      >
        <Background variant="none" />
        <Controls
          showZoom={false}
          showFitView={false}
          showMinimap={false}
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
};

export default CharacterGraph;
