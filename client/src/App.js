import React from 'react'
import Board from './components/Board'

const fib = (n, memo={0: 0, 1: 1}) => {
  if (!(n in memo)) {
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  }
  return memo[n];
}

const App = () => {
  return (
    <div>
      <Board numbers={Array(10).fill().map((_, i) => fib(i))}/>
    </div>
  )
}

export default App