import React, {
  useReducer,
} from 'react';
import _ from 'lodash';

const fizzInitialState = {
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

const ReFizzBuzz = () => {
  const [state, dispatch] = useReducer(fizzReducer, fizzInitialState);
  return (
    <>
      <p>{state.output}</p>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
};

export default ReFizzBuzz;
