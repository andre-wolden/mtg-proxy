import {Card} from "./types";
import React, {useEffect} from "react";
import {isInitial, isPending, isSuccess, pending, success} from "@devexperts/remote-data-ts";
import {wizardsPath} from "./utils";
import {ClipLoader} from "react-spinners";

interface Props {
  card: Card;
  index: number;
  updateCard: (card: Card) => void;
}

export const ViewCard = ({card, index, updateCard}: Props) => {

  const imgId = `${card.name}-${index}`

  useEffect(() => {
    if (isInitial(card.image)){
      updateCard(({...card, image: pending}))
      fetch(wizardsPath(card.imageUrl))
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => updateCard(({...card, image: success(arrayBuffer)})))
    }

    if (isSuccess(card.image)){
      const blob = new Blob( [ card.image.value ] );
      const url = URL.createObjectURL( blob );
      const img = document.getElementById( imgId );
      // @ts-ignore
      img.src = url;
      // So the Blob can be Garbage Collected
      // @ts-ignore
      img.onload = e => URL.revokeObjectURL( url );
    }
  })

  return (
    <div>
      <div className="card" key={card.name}>

        {
          isPending(card.image) && (
            <ClipLoader />
          )
        }
        <img hidden={!isSuccess(card.image)} id={imgId} alt="sadf" />
      </div>
      <button
        onClick={() => console.log("select card")}
      >
        Add {card.name}
      </button>
    </div>
  );
}