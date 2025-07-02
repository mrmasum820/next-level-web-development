import { decrement, increment } from "./redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  const { count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Counter App using Redux</h1>
      <button onClick={() => dispatch(increment(1))}>Increment</button>
      <button onClick={() => dispatch(increment(5))}>Increment by 5</button>
      <div>{count}</div>
      <button onClick={() => dispatch(decrement(1))}>Decrement</button>
      <button onClick={() => dispatch(decrement(5))}>Decrement by 5</button>
    </div>
  );
}

export default App;
