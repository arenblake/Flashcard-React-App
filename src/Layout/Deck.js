import React from "react";
import { useHistory } from "react-router-dom";
import DeleteButton from "./DeleteButton";

export function Deck({ deck, handleDelete }) {
  const history = useHistory();
  const handleView = () => {
    history.push(`/decks/${deck.id}`);
  };

  const handleStudy = () => {
    history.push(`/decks/${deck.id}/study`);
  };

  return (
    <>
      <div className="card w-50 my-2">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{deck.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {deck.cards.length} cards
            </h6>
          </div>
          <p className="card-text">{deck.description}</p>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-start">
              <button
                type="button"
                onClick={handleView}
                className="btn btn-secondary d-flex align-items-center justify-content-between mr-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-eye-fill pr-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
                <div>View</div>
              </button>
              <button
                type="button"
                onClick={handleStudy}
                className="btn btn-primary d-flex align-items-center justify-content-between"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-journal-bookmark-fill mr-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"
                  />
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                </svg>
                <div>Study</div>
              </button>
            </div>
            <DeleteButton handleDelete={handleDelete} deckId={deck.id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Deck;
