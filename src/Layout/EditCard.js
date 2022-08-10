import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

export default function EditCard() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState([]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const history = useHistory();
  const { deckId, cardId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
    }
    async function loadCard() {
      const abortController = new AbortController();
      const card = await readCard(cardId, abortController.signal);
      setCard(card);
      setFront(card.front);
      setBack(card.back);
    }
    loadDeck();
    loadCard();
  }, []);

  async function editDeck(card) {
    const abortController = new AbortController();
    return await updateCard(card, abortController.signal);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const cardObj = { front, back, id: card.id, deckId: Number(deckId) };
    console.log(cardObj);
    editDeck(cardObj).then((resp) => history.push(`/decks/${deckId}`));
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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm
        handleSubmit={handleSubmit}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        front={front}
        back={back}
        deck={deck}
        cardId={cardId}
      />
    </>
  );
}
