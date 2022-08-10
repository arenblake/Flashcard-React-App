import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index";

export default function EditDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deck, setDeck] = useState([]);
  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
      setName(deck.name);
      setDescription(deck.description);
    }
    loadDeck();
  }, []);

  async function editDeck(deck) {
    const abortController = new AbortController();
    return await updateDeck(deck, abortController.signal);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const deckObj = { name, description, id: deck.id };
    editDeck(deckObj).then(({ id }) => history.push(`/decks/${id}`));
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
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
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
              value={name}
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
              value={description}
              onChange={handleDescriptionChange}
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
