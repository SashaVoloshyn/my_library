import React from 'react';
import { Routes, Route } from 'react-router-dom';


import { BlurModeProvider, ColorModeProvider } from './hoc';
import {HomePage} from "./pages";
import {Layout} from "./components";

function App() {
  return (
      <ColorModeProvider>
          <BlurModeProvider>
              <Routes>
                  <Route path='/' element={<Layout />}>
                      <Route index element={<HomePage />} />
                  </Route>
              </Routes>
          </BlurModeProvider>
      </ColorModeProvider>
  );
}

export default App;
