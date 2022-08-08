import React, { useEffect, useState } from "react";
import Deck from "./Deck";
import { listDecks, deleteDeck } from "../utils/api/index";

export default function Decks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks);

    return () => abortController.abort();
  }, []);

  const handleDelete = (id) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      console.log("Delete deck from decks");
      const abortController = new AbortController();

      deleteDeck(id, abortController.signal).then(console.log);
      setDecks((currentDecks) => currentDecks.filter((deck) => deck.id !== id));
    }
  };

  const deckList = decks.map((deck) => (
    <Deck key={deck.id} deck={deck} handleDelete={handleDelete} />
  ));

  return <div className="my-2">{deckList}</div>;
}
