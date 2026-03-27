import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CounterApp = () => {

    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch({ type: 'counter/decrement' })}>Trừ</button>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'counter/increment' })}>Cộng</button>
    </div>
  )
}

export default CounterApp