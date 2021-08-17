import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./redux/counter/counterSlice";

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <>
            <button
                area-label="Inc"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
            <p>{count}</p>
            <button
                area-label="Dec"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
        </>
    )
}

export default Counter;