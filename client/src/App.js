import React from "react";
import {  Route } from "react-router-dom";
import Layout from './Components/Layout';
import "./App.css";

export default function App({ component: Component }) {
  return (
    <Route
      render={(routeProps) => (
        <Layout>
          <Component {...routeProps} />
        </Layout>
    )}
  />
  );
}
