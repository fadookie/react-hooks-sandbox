import React, {
  useState,
} from 'react';
import _ from 'lodash';

const setClampedCount = (newCount, setCount) => {
  setCount(_.clamp(newCount, 1, 100));
};

const displayFizzBuzz = (count) => {
  if (count % 15 === 0) return 'FizzBuzz';
  if (count % 3 === 0) return 'Fizz';
  if (count % 5 === 0) return 'Buzz';
  return count;
};

export const FizzBuzz = () => {
  const [count, setCount] = useState(1);
  return (
    <>
      <p>{displayFizzBuzz(count)}</p>
      <button onClick={() => setClampedCount(count + 1, setCount)}>+</button>
      <button onClick={() => setClampedCount(count - 1, setCount)}>-</button>
    </>
  );
};