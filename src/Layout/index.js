import React from "react";
import { Route, Switch } from "react-router-dom";
import { CreateDeck } from "./CreateDeck";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "./Decks";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
        <Route exact path={'/'} >
          <CreateDeck />
          <Decks />
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
