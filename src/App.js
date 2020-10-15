import React from "react";
import "./styles.scss";
import { Route, Switch } from "react-router-dom";
import MLSearchBar from "./components/ml-search-bar/ml-searchbar";
import MLHomePage from "./components/pages/ml-home-page/ml-home-page";
import MLListPage from "./components/pages/ml-list-page/ml-list-page";
import MLDetailPage from "./components/pages/ml-page-detail/ml-detail-page";
import MLNotFoundPage from "./components/pages/ml-not-found/ml-not-found-page";

export default function App() {
  return (
    <div className=" main-container">
      <MLSearchBar></MLSearchBar>
      <Switch>
        <Route exact path="/" component={MLHomePage} />
        <Route exact path="/items" component={MLListPage} />
        <Route path="/items/:id" component={MLDetailPage} />
        <Route component={MLNotFoundPage} />
      </Switch>
    </div>
  );
}