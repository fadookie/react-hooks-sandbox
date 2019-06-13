import React, {
  useState,
} from 'react';
import logo from './logo.svg';
import './App.css';
import { FizzBuzz } from './state';
import { EffectTest } from './effects';
import { Momento, CallMeMaybe } from './memos';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('CallMeMaybe');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => setActiveComponent('FizzBuzz')}>FizzBuzz (useState)</button>
        <button onClick={() => setActiveComponent('EffectTest')}>EffectTest (useEffect)</button>
        <button onClick={() => setActiveComponent('Momento')}>Momento (useMemo)</button>
        <button onClick={() => setActiveComponent('CallMeMaybe')}>CallMeMaybe (useCallback)</button>
        <button onClick={() => setActiveComponent('Other')}>Other</button>
        {(() => {
          switch (activeComponent) {
            case 'FizzBuzz':
              return <FizzBuzz />;
            case 'EffectTest':
              return <EffectTest />;
            case 'Momento':
              return <Momento />;
            case 'CallMeMaybe':
              return <CallMeMaybe />;
            default:
              return `Unknown component ${activeComponent}`;
          }
        })()}
      </header>
    </div>
  );
};

export default App;
