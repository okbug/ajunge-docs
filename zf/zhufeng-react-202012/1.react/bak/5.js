import { useState } from "react";

let arr = [];

function App() {
    return <div>

        {
            arr.map(i => <Other prop={i} />)
        }
    </div>
}

function Other(props) {
    let [count, setCount] = useState(0)
    return <>
    <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
}