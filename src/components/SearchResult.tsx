import React from 'react';
import {fold, RemoteData} from "@devexperts/remote-data-ts";


interface Props {
  searchResult: RemoteData<Error, any>
}

export const SearchResult = ({searchResult}: Props) => {

  const showResult = (result: any) => {
    return result.cards.map((card: any) => {
      return <div key={card.name}><img src={card.imageUrl}/></div>
    })
  }


  return fold(
    () => (<div>Not asked</div>),
    () => (<div>Loading</div>),
    (e) => (<div>Error: {JSON.stringify(e)}</div>),
    showResult
  )(searchResult)
}