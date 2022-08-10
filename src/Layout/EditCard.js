import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api/index";

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
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Front
            </label>

            <textarea
              className="form-control"
              id="front"
              rows="2"
              value={front}
              onChange={handleFrontChange}
            ></textarea>
          </div>
          <div className="form-group row">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="col-sm-2 col-form-label"
            >
              Back
            </label>

            <textarea
              className="form-control"
              id="back"
              rows="2"
              value={back}
              onChange={handleBackChange}
            ></textarea>
          </div>
          <a href={`/decks/${deck.id}`} className="btn btn-secondary mr-1">
            {" "}
            Cancel{" "}
          </a>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
