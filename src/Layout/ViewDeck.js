import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import { CreateButton } from "./CreateButton";
import DeleteButton from "./DeleteButton";
import ViewDeckCards from "./ViewDeckCards";

export default function ViewDeck() {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  async function loadCards(signal) {
    const deck = await readDeck(deckId, signal);
    setDeck(deck);
    setCards(
      deck?.cards?.map((card) => (
        <ViewDeckCards
          key={card.id}
          front={card.front}
          back={card.back}
          deckId={deckId}
          cardId={card.id}
          handleDeleteCard={handleDeleteCard}
        />
      ))
    );
  }

  useEffect(() => {
    const abortController = new AbortController();
    loadCards(abortController.signal);

    return () => abortController.abort();
  }, [deckId]);

  const handleDelete = (id) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      const abortController = new AbortController();
      deleteDeck(id, abortController.signal).then((resp) => history.push("/"));
    }
  };

  const handleDeleteCard = (id) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      const abortController = new AbortController();
      deleteCard(id, abortController.signal).then((resp) => {
        loadCards(abortController.signal);
      });
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <div className="d-flex align-items-center justify-content-between">
        <div
          className="d-flex align-items-center justify-content-start"
          style={{ gap: "3px" }}
        >
          <CreateButton
            text="Edit"
            path={`/decks/${deckId}/edit`}
            icon={"edit"}
          />
          <CreateButton
            color="btn-primary"
            text="Study"
            path={`/decks/${deckId}/study`}
            icon={"journal"}
          />
          <CreateButton
            color="btn-primary"
            text="Add Cards"
            path={`/decks/${deckId}/cards/new`}
            icon={"plus"}
          />
        </div>
        <DeleteButton handleDelete={handleDelete} deckId={deckId} />
      </div>
      <h1 className="mt-3 mb-1">Cards</h1>
      {cards}
    </>
  );
}
