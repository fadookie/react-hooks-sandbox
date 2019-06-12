import React, {
  useState,
  useEffect,
} from 'react';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';
import { FizzBuzz } from './state';
import { EffectTest } from './effects';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('EffectTest');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => setActiveComponent('FizzBuzz')}>FizzBuzz</button>
        <button onClick={() => setActiveComponent('EffectTest')}>EffectTest</button>
        <button onClick={() => setActiveComponent('Other')}>Other</button>
        {(() => {
          switch (activeComponent) {
            case 'FizzBuzz':
              return <FizzBuzz />;
            case 'EffectTest':
              return <EffectTest />;
            default:
              return `Unknown component ${activeComponent}`;
          }
        })()}
      </header>
    </div>
  );
};

export default App;
