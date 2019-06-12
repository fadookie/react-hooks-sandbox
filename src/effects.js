import React, {
  useState,
  useEffect,
} from 'react';
import _ from 'lodash';

export const EffectfulComponent = (props) => {
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

export const EffectTest = () => {
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