import React from "react";
import Deck from "./Deck";

export default function Decks({ decks, handleDelete }) {
  const deckList = decks.map((deck) => (
    <Deck key={deck.id} deck={deck} handleDelete={handleDelete} />
  ));

  return <div className="my-2">{deckList}</div>;
}
