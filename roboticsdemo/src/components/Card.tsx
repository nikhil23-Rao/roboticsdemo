import MemberType from "@/types/MemberType";
import React from "react";

interface IProps {
  member: MemberType;
  onClick: () => void;
  text: string;
  backgroundColor: string;
}

const Card = ({ member, onClick, text, backgroundColor }: IProps) => {
  return (
    <div className="card" style={{ marginRight: 40, marginLeft: 40 }}>
      <img src={member.imageUrl} alt="" className="card__image" />
      <p className="card__name">
        {member.username} ({member.grade})
      </p>
      <div
        className="grid-container"
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          bottom: 10,
          position: "relative",
        }}
      >
        {member.role}
      </div>
      <div
        className="grid-container"
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {member.team}
      </div>
      <button
        className="btn draw-border"
        style={{ backgroundColor }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Card;
