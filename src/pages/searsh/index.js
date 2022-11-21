import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Searsh() {
  const { searsh } = useParams();
  const [searshReq, setSearshReq] = useState("");
  useEffect(() => {
   setSearshReq(searsh);
  }, [searsh]);
 
  return (
    <div>
      <h1>Searsh</h1>
      <h2>{searshReq}</h2>
    </div>
  );
}
