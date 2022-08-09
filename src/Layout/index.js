import React from "react";
import { Route, Switch } from "react-router-dom";
import { CreateButton } from "./CreateButton";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "./Decks";
import NewDeck from "./NewDeck";
import ViewDeck from "./ViewDeck";
import Study from "./Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path={"/"}>
            <CreateButton text="Create Deck" path={"/decks/new"} />
            <Decks />
          </Route>
          <Route path={"/decks/new"}>
            <NewDeck />
          </Route>
          <Route exact path={"/decks/:deckId/study"}>
            <Study />
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
