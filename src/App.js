import React, { useState } from 'react';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';

const setClampedCount = (newCount, setCount) => {
  setCount(_.clamp(newCount, 1, 100));
};

const displayFizzBuzz = (count) => {
  if (count % 15 === 0) {
    return 'FizzBuzz';
  } else if (count % 3 === 0) {
    return 'Fizz';
  } else if (count % 5 === 0) {
    return 'Buzz';
  }
  return count;
};

const FizzBuzz = () => {
  const [count, setCount] = useState(1);
  return (
    <>
      <p>{displayFizzBuzz(count)}</p>
      <button onClick={() => setClampedCount(count + 1, setCount)}>+</button>
      <button onClick={() => setClampedCount(count - 1, setCount)}>-</button>
    </>
  );
};

const App = () => {
  const [activeComponent, setActiveComponent] = useState('FizzBuzz');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => setActiveComponent('FizzBuzz')}>FizzBuzz</button>
        <button onClick={() => setActiveComponent('Other')}>Other</button>
        {(() => {
          switch (activeComponent) {
            case 'FizzBuzz':
              return <FizzBuzz />;
            default:
              return `Unknown component ${activeComponent}`;
          }
        })()}
      </header>
    </div>
  );
};

export default App;
