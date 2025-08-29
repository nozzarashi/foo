import { useState } from 'react';

export function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Нажми на меня
      </button>
      <span>{count}</span>
    </div>
  );
}
