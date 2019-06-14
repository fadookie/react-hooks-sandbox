import React, {
  useReducer,
  useEffect,
} from 'react';
import _ from 'lodash';

const STORAGE_KEY = 'reredux';

const initialState = {
  count: 1,
  output: '1',
};


const calcFizzBuzz = (count) => {
  if (count % 15 === 0) return 'FizzBuzz';
  if (count % 3 === 0) return 'Fizz';
  if (count % 5 === 0) return 'Buzz';
  return `${count}`;
};

const fizzReducer = (state, action) => {
  switch (action.type) {
    case 'increment': {
      const count = state.count + 1;
      const output = calcFizzBuzz(count);
      return { count, output };
    } case 'decrement': {
      const count = state.count - 1;
      const output = calcFizzBuzz(count);
      return { count, output };
    } default:
      throw new Error();
  }
};

const loadState = () => {
  const state = window.localStorage.getItem(STORAGE_KEY);
  if (state) return JSON.parse(state);
  return initialState;
};

const useRedux = (reducer, initialArg, init) => {
  const redux = useReducer(reducer, initialArg, init);
  const [state] = redux;
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);
  return redux;
};

const ReRedux = () => {
  const [state, dispatch] = useRedux(fizzReducer, undefined, loadState);
  return (
    <>
      <p>{state.output}</p>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
};

export default ReRedux;
