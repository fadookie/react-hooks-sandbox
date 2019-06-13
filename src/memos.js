import React, {
  useState,
  useMemo,
  useCallback,
} from 'react';
import _ from 'lodash';

const expensiveComputation = (foo, bar) => {
  const expensive = foo + bar;
  console.log(`expensiveComputation(${foo}, ${bar}) = `, expensive);
  return expensive;
};

export const Momento = () => {
  const [foo, setFoo] = useState(1);
  const [bar, setBar] = useState(-1000);
  const [baz, setBaz] = useState(2000);
  const expensive = useMemo(() => expensiveComputation(foo, bar), [foo, bar]);
  return (
    <>
      <p>
        {`Memo Foo:${foo} Bar: ${bar} Baz:${baz} ExpensiveComputation(Foo, Bar):${expensive}`}
      </p>
      <button onClick={() => setFoo(foo + 1)}>Foo+</button>
      <button onClick={() => setFoo(foo - 1)}>Foo-</button>
      <br/>
      <button onClick={() => setBar(bar + 1)}>Bar+</button>
      <button onClick={() => setBar(bar - 1)}>Bar-</button>
      <br/>
      <button onClick={() => setBaz(baz + 1)}>Baz+</button>
      <button onClick={() => setBaz(baz - 1)}>Baz-</button>
    </>
  );
};

const NeedyChild = (props) => {
  const { expensiveCB } = props;
  const specialSnowflake = parseInt(_.uniqueId(), 10);
  const expensiveValue = expensiveCB(specialSnowflake);
  return <p>{`Needy Child Rendered ExpensiveCallback(${specialSnowflake}) = ${expensiveValue}`}</p>;
};

// This is needed as otherwise the component will re-render even if props haven't changed
const NeedyChildMemo = React.memo(NeedyChild); 

let prevExpensiveCB;

export const CallMeMaybe = () => {
  const [foo, setFoo] = useState(1);
  const [baz, setBaz] = useState(2000);
  const expensiveCB = useCallback(_.curry(expensiveComputation)(foo), [foo]);
  const cbChanged = prevExpensiveCB !== expensiveCB;
  prevExpensiveCB = expensiveCB;
  return (
    <>
      <p>
        {`Foo:${foo} Baz:${baz} ExpensiveCallback(Foo) changed? ${cbChanged}`}
      </p>
      <NeedyChildMemo expensiveCB={expensiveCB} />
      <button onClick={() => setFoo(foo + 1)}>Foo+</button>
      <button onClick={() => setFoo(foo - 1)}>Foo-</button>
      <br/>
      <button onClick={() => setBaz(baz + 1)}>Baz+</button>
      <button onClick={() => setBaz(baz - 1)}>Baz-</button>
    </>
  );
};
