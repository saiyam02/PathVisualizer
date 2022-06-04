import React, { useState } from 'react'
import './cell.css'


export default function Cell(props) {

  const[row,setRow]=useState(props.cell.row);
  const[col,setCol]=useState(props.cell.col);

  const addClass= ()=>{  
    if(props.cell.isWall)
        return "wall-cell ";
    if( props.cell.isStartCell)
        return "start-cell fas fa-male";
    if(props.cell.isEndCell)
        return "end-cell fas fa-map-marker-alt";
    if(props.cell.ispathCell)
        return 'shortest-path-cell ';
    if(props.cell.visitedCell)
        return "visited-cell";
  }

  return (
    <div
      id = {`cell-${row}-${col}`}
      className={`cell ${addClass()}`}
      onMouseDown={() => props.onMouseDown(row,col)}
      onMouseEnter={() => props.onMouseEnter(row,col)}
      onMouseUp={() => props.onMouseUp(row,col)}>
    </div>
  )
}
