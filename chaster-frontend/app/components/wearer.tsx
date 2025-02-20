import React from "react";

interface WearerProps {
  name: string;
  avatarUrl: string;
}

export default function Wearer({ name, avatarUrl }: WearerProps) {
  return (
    <div className="kh-container row vertical-center">
      <span className="kh-label cell h2">Lockee</span>
      <div className="kh-cell cell">
        <img src={avatarUrl} alt="Avatar" className="avatar-img" />
        <div className="kh-name">{name}</div>
      </div>
    </div>
  );
}