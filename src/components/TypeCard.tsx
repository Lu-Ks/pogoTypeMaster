import React from "react";
import { PokemonType } from "../types";
import { TYPE_COLORS, TYPE_IMAGES } from "../gameData";
import "./TypeCard.css";

interface TypeCardProps {
  type: PokemonType;
  label?: string;
  isAttacking?: boolean;
  animated?: boolean;
}

const TypeCard: React.FC<TypeCardProps> = ({
  type,
  label,
  isAttacking = false,
  animated = true,
}) => {
  const backgroundColor = TYPE_COLORS[type];

  return (
    <div
      className={`type-card ${isAttacking ? "attacking" : "defending"} ${
        animated ? "animated" : ""
      }`}
      style={{
        backgroundColor,
        boxShadow: `0 8px 32px ${backgroundColor}66`,
      }}
    >
      {label && <div className="type-label">{label}</div>}
      <div className="type-icon">
        <img src={TYPE_IMAGES[type]} alt={type} />
      </div>
      <div className="type-name">{type.toUpperCase()}</div>
    </div>
  );
};

export default TypeCard;
