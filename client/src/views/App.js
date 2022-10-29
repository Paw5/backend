/* eslint-disable global-require */
// Required imports
import React from 'react';
import { registerRootComponent } from 'expo';
import NavBar from '../components/NavBar';

export default function App() {
  return (
    <NavBar />
  );
}

registerRootComponent(App);
