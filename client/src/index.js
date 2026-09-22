import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// CSS Imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Component Imports (Capitalized as React components)
import Login from "./Components/Login/login";
import Dashboard from "./Components/Dashboard/dashboard";
import Member from "./Components/Member/member";
import Candidate from "./Components/Candidate/candidate";
import SuccessPage from "./Components/MailTemplate/success";
import ErrorPage from "./Components/MailTemplate/error";
import NoMatch from "./Components/MailTemplate/nomatch";

// Store & Layout Imports
import store from "./Store/store/store";
import RouteApp from "./App";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* Nested Protected App Routes */}
          <Route path="/app" element={<RouteApp />}>
            <Route index element={<Dashboard />} />
            <Route path="member" element={<Member />} />
            <Route path="candidate" element={<Candidate />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();