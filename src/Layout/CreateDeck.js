import React from "react";
import {useHistory} from 'react-router-dom';

export function CreateDeck() {
    // Button SVG
    const plus = <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
    <path stroke="white" strokeWidth="1.7px" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>

    const history = useHistory();
    const handleClick = () => {
        console.log("click")
        history.push('/decks/new')
    }

    return <button type="button" onClick={handleClick} className="btn btn-secondary text-center d-flex align-items-center justify-content-between">{plus} <div>Create Deck</div></button>
}
