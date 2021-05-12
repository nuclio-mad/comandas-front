import React from 'react';
import './App.css';

import { Button, MyDummyParagraph } from './Button'

const App = () => {
  const [count, setCount] = React.useState(0);

  const updateState = (delta) => {
    setCount(count + delta);
  }

  return (
    <div className="App">
      <p>Counter: <span>{count}</span></p>

      <MyDummyParagraph></MyDummyParagraph>

      <Button value={1} clickHandler={updateState}></Button>
      <Button value={-1} clickHandler={updateState}></Button>
      <Button value={-1899} clickHandler={updateState}></Button>
    </div>
  );
}

export default App;
