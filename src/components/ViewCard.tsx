import { Card } from "./types";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  card: Card;
}

export const ViewCard = ({ card }: Props) => {
  const imgId = uuidv4();

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const blob = new Blob([card.image]);
    const url = URL.createObjectURL(blob);
    const img = document.getElementById(imgId);
    // @ts-ignore
    img.src = url;
    // So the Blob can be Garbage Collected
    // @ts-ignore
    img.onload = (e) => URL.revokeObjectURL(url);
    setHidden(false);
  }, [card.image, imgId]);

  return (
    <div className="card" key={card.name}>
      <img hidden={hidden} id={imgId} alt="sadf" />
    </div>
  );
};
