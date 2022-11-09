import React from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { uid } = useParams();
  return (
    <div>
      <h1>UserProfile {uid}</h1>
    </div>
  );
}
