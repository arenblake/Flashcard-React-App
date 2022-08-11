import React from "react";
import { CreateButton } from "./CreateButton";
import DeleteButton from "./DeleteButton";

export default function ViewDeckCards({
  front,
  back,
  deckId,
  cardId,
  handleDeleteCard,
}) {
  return (
    <div className="card w-50 mb-2">
      <div className="card-body">
        <div className="d-flex">
          <p className="card-text">{front}</p>
          <p className="card-text">{back}</p>
        </div>
        <div className="d-flex justify-content-end">
          <div className="mr-2">
            <CreateButton
              text="Edit"
              path={`/decks/${deckId}/cards/${cardId}/edit`}
            />
          </div>
          <DeleteButton handleDelete={handleDeleteCard} deckId={cardId} />
        </div>
      </div>
    </div>
  );
}
