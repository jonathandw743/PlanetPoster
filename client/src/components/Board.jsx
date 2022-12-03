import React from 'react'
import Card from './Card'

const Board = ({numbers}) => {
  return (
    <div>
      {numbers.map(number => (<Card number={number}/>))}
    </div>
  )
}

export default Board