import React from "react";

interface KeyholderProps {
  name: string;
  avatarUrl: string;
}

export default function Keyholder({ name, avatarUrl }: KeyholderProps) {
  return (
    <div className="kh-container row vertical-center">
      <span className="kh-label cell h2">Keyholder</span>
      <div className="kh-cell cell">
        <img src={avatarUrl} alt="Avatar" className="avatar-img" />
        <div className="kh-name">{name}</div>
      </div>
    </div>
  );
}