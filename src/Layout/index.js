import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { CreateButton } from "./CreateButton";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "./Decks";
import CreateDeck from "./CreateDeck";
import ViewDeck from "./ViewDeck";
import Study from "./Study";
import AddCards from "./AddCards";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import CardForm from "./CardForm";
import { listDecks, deleteDeck } from "../utils/api/index";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks);
    return () => abortController.abort();
  }, []);

  const handleDelete = (id) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      const abortController = new AbortController();
      deleteDeck(id, abortController.signal);
      setDecks((currentDecks) => currentDecks.filter((deck) => deck.id !== id));
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={"/"}>
            <CreateButton
              text="Create Deck"
              path={"/decks/new"}
              icon={"plus"}
            />
            <Decks decks={decks} handleDelete={handleDelete} />
          </Route>
          <Route path={"/decks/new"}>
            <CreateDeck />
          </Route>
          <Route exact path={"/decks/:deckId/study"}>
            <Study />
          </Route>
          <Route exact path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>
          <Route exact path={"/decks/:deckId/cards/new"}>
            <AddCards />
          </Route>
          <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
          </Route>
          <Route path={"/decks/:deckId"}>
            <ViewDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
