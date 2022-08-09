import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";

export default function ViewDeck() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCards() {
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
    }
    loadCards();

    return () => abortController.abort();
  }, [deckId]);
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {/* <li className="breadcrumb-item">
        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
      </li> */}
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
    </>
  );
}
