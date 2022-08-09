import React from "react";

export default function Card({
  deck,
  card,
  cardId,
  side,
  handleFlip,
  handleNext,
}) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          Card {cardId + 1} of {deck.cards.length ? deck.cards.length : null}
        </h5>
        <p className="card-text">{side ? card.front : card.back}</p>
        <button onClick={handleFlip} className="btn btn-secondary mr-2">
          Flip
        </button>
        {!side ? (
          <button onClick={handleNext} className="btn btn-primary">
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}
