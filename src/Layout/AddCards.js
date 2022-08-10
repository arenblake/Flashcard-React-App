import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

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
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cardObj = { front, back };
    addCard(cardObj);
    event.target[0].value = "";
    event.target[1].value = "";
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
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="front" className="col-sm-2 col-form-label">
              Front
            </label>

            <textarea
              id="front"
              rows="2"
              placeholder="Front side of card"
              onChange={handleFrontChange}
              className="form-control"
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
              placeholder="Back side of card"
              onChange={handleBackChange}
            ></textarea>
          </div>
          <a href={`/decks/${deckId}`} className="btn btn-secondary mr-1">
            {" "}
            Done{" "}
          </a>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
