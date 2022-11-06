import { Card, CardWithImage } from "./types";
import React, { useEffect, useState } from "react";
import {
  isInitial,
  isPending,
  isSuccess,
  initial,
  pending,
  RemoteData,
  success,
} from "@devexperts/remote-data-ts";
import { wizardsPath } from "./utils";
import { ClipLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";

interface Props {
  card: Card;
  selectCard: (card: CardWithImage) => void;
}

export const ViewCardSearchResult = ({ card, selectCard }: Props) => {
  const imgId = uuidv4();

  const [image, setImage] = useState<RemoteData<Error, ArrayBuffer>>(initial);

  useEffect(() => {
    if (isInitial(image)) {
      setImage(pending);
      fetch(wizardsPath(card.imageUrl))
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => setImage(success(arrayBuffer)));
    }

    if (isSuccess(image)) {
      const blob = new Blob([image.value]);
      const url = URL.createObjectURL(blob);
      const img = document.getElementById(imgId);
      // @ts-ignore
      img.src = url;
      // So the Blob can be Garbage Collected
      // @ts-ignore
      img.onload = (e) => URL.revokeObjectURL(url);
    }
  }, [image, card.imageUrl, imgId]);

  return (
    <div>
      <div className="card" key={card.name}>
        {isPending(image) && <ClipLoader />}
        <img hidden={!isSuccess(image)} id={imgId} alt="sadf" />
      </div>
      {isSuccess(image) && (
        <button
          onClick={() =>
            selectCard({ id: imgId, name: card.name, image: image.value })
          }
        >
          Add {card.name}
        </button>
      )}
    </div>
  );
};
