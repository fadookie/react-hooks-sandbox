import React, {
  useState,
} from 'react';
import logo from './logo.svg';
import './App.css';
import { FizzBuzz } from './state';
import { EffectTest } from './effects';
import { Momento, CallMeMaybe } from './memos';
import ReFizzBuzz from './ReFizzBuzz';
import ReRedux from './redux';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('ReRedux');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => setActiveComponent('FizzBuzz')}>FizzBuzz (useState)</button>
        <button onClick={() => setActiveComponent('EffectTest')}>EffectTest (useEffect)</button>
        <button onClick={() => setActiveComponent('Momento')}>Momento (useMemo)</button>
        <button onClick={() => setActiveComponent('CallMeMaybe')}>CallMeMaybe (useCallback)</button>
        <button onClick={() => setActiveComponent('ReFizzBuzz')}>ReFizzBuzz (useReducer)</button>
        <button onClick={() => setActiveComponent('ReRedux')}>ReRedux (useReducer)</button>
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
            case 'ReFizzBuzz':
              return <ReFizzBuzz />;
            case 'ReRedux':
              return <ReRedux />;
            default:
              return `Unknown component ${activeComponent}`;
          }
        })()}
      </header>
    </div>
  );
};

export default App;
