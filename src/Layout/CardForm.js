import React from "react";

export default function CardForm({
  handleSubmit,
  handleFrontChange,
  handleBackChange,
  front = "",
  back = "",
  deck,
  cardId,
}) {
  return (
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
            placeholder="Front side of card"
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
            placeholder="Back side of card"
            value={back}
            onChange={handleBackChange}
          ></textarea>
        </div>
        <a href={`/decks/${deck.id}`} className="btn btn-secondary mr-1">
          {" "}
          {cardId ? "Cancel" : "Done"}{" "}
        </a>
        <button type="submit" className="btn btn-primary">
          {cardId ? "Submit" : "Save"}
        </button>
      </form>
    </div>
  );
}
