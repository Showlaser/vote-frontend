import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import routerPaths from "services/shared/router-paths";
import Vote from "pages/vote";

function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routerPaths.Root} element={Vote()} />
      </Routes>
    </BrowserRouter>
  );
}

export default routes;
