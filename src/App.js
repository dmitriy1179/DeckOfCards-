import React from 'react';
import './App.css';
import Form from "./Form"
import DeckOfCards from "./DeckOfCards"

function App() {
  const onSubmit = (values) => {
    console.log("form values", values);
  };
  return (
    <div className="App">
      <Form onSubmit={onSubmit} />
      <DeckOfCards />
    </div>
  );
}

export default App;
