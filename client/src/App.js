import React from 'react';
import { Outlet } from "react-router-dom";
import Layout from './Components/Layout';
import "./App.css";

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
