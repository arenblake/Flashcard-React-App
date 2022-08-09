import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

export default function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const history = useHistory();

  async function saveDeck(deck) {
    const abortController = new AbortController();
    return await createDeck(deck, abortController.signal);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const deckObj = { name, description };
    saveDeck(deckObj).then(({ id }) => history.push(`/decks/${id}`));
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Deck Name"
              onChange={handleNameChange}
              className="form-control"
            />
          </div>
          <div className="form-group row">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="col-sm-2 col-form-label"
            >
              Description
            </label>

            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Brief description of the deck"
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <a href="/" className="btn btn-secondary mr-1">
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
