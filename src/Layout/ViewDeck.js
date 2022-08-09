import React from "react";
import { useParams } from "react-router-dom";

export default function ViewDeck() {
  const { deckId } = useParams();
  return <h1>View Deck {deckId}</h1>;
}
