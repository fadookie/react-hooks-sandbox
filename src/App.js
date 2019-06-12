import React, {
  useState,
  useEffect,
} from 'react';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';

const setClampedCount = (newCount, setCount) => {
  setCount(_.clamp(newCount, 1, 100));
};

const displayFizzBuzz = (count) => {
  if (count % 15 === 0) return 'FizzBuzz';
  if (count % 3 === 0) return 'Fizz';
  if (count % 5 === 0) return 'Buzz';
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

const EffectfulComponent = (props) => {
  const {
    cleanupCallback,
    effectDeps: rawEffectDeps,
   } = props;
  const [foo, setFoo] = useState(1);
  const [bar, setBar] = useState(-1000);

  const effectDeps = Array.isArray(rawEffectDeps)
    ? rawEffectDeps.map(x => (x === 'foo' ? foo : bar))
    : rawEffectDeps;
    
  useEffect(() => {
    console.log(`UseEffect called with foo:${foo} bar:${bar}`);
    return cleanupCallback;
  }, effectDeps);

  return (
    <>
      <p>
        {`Use effect Foo: ${foo} Bar: ${bar}`}
      </p>
      <button onClick={() => setFoo(foo + 1)}>Foo+</button>
      <button onClick={() => setFoo(foo - 1)}>Foo-</button>
      <br/>
      <button onClick={() => setBar(bar + 1)}>Bar+</button>
      <button onClick={() => setBar(bar - 1)}>Bar-</button>
    </>
  );
};

/**
 * Must use a HOF when setting a function into state, otherwise it will be called by setXXX
 */
const defaultCleanupCallback = () => (() => {
  console.log('Firing cleanup callback.');
});

const EffectTest = () => {
  const setDummyState = useState(0)[1];
  const [cleanupCallback, setCleanupCallback] = useState(undefined);
  const [effectDeps, setEffectDeps] = useState(null);
  // The EffectfulComponent must be completely replaced when `useEffect` changes as dynamic changes are not permitted
  return (
    <>
      <EffectfulComponent
        key={_.uniqueId()}
        effectDeps={effectDeps}
        cleanupCallback={cleanupCallback}
      />
      {`Cleanup callback (${!!cleanupCallback}):`}
      <button onClick={() => setCleanupCallback(cleanupCallback ? undefined : defaultCleanupCallback)}>Toggle</button>
      Effect dependencies:
      <button onClick={() => setEffectDeps(null)}>None</button>
      <button onClick={() => setEffectDeps([])}>[] (Mount/unmount)</button>
      <button onClick={() => setEffectDeps(['foo'])}>[Foo]</button>
      <button onClick={() => setEffectDeps(['bar'])}>[Bar]</button>
      <button onClick={() => setEffectDeps(['foo', 'bar'])}>[Foo, Bar]</button>
      <br/>
      <button onClick={() => setDummyState(prev => prev + 1)}>Force Re-Render</button>
    </>
  );
};

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
