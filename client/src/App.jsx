import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateUnit from "./components/CreateAndEditUnit/CreateUnit";
import EditUnit from "./components/CreateAndEditUnit/EditUnit";
import Units from "./components/RenderUnits/Units";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="/list" element={<Units />} />
        <Route path="/create" element={<CreateUnit />} />
        <Route path="/edit" element={<EditUnit />} />
        <Route
          path="*"
          element={<div style={{ textAlign: "center" }}>Not found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
