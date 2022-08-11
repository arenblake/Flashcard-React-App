import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

export default function AddCards() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState([]);
  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const { deckId } = useParams();

  async function addCard(card) {
    const abortController = new AbortController();
    return await createCard(deckId, card, abortController.signal);
  }

  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
    }
    loadDeck();
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const cardObj = { front, back };
    addCard(cardObj);
    setFront("");
    setBack("");
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <CardForm
        handleSubmit={handleSubmit}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        front={front}
        back={back}
        deck={deck}
      />
    </>
  );
}
