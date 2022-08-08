import React, { useEffect, useState } from "react";
import Deck from "./Deck";
import { listDecks } from "../utils/api/index";

export default function Decks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks);

    return () => abortController.abort();
  }, []);

  const deckList = decks.map((deck) => (
    <Deck key={deck.id} deck={deck} setDecks={setDecks} />
  ));

  return <div className="my-2">{deckList}</div>;
}
