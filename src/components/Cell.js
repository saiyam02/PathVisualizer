import React, { useState } from 'react'
import './styles/cell.css'


export default function Cell(props) {
  
  // eslint-disable-next-line
  const[row,setRow]=useState(props.cell.row);
  // eslint-disable-next-line
  const[col,setCol]=useState(props.cell.col);

  const addClassName= ()=>{  
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
      className={`cell ${addClassName()}`}
      onMouseDown={() => props.onMouseDown(row,col)}
      onMouseEnter={() => props.onMouseEnter(row,col)}
      onMouseUp={() => props.onMouseUp(row,col)}
      onClick={()=>props.onClickCell(row,col)}>
    </div>
  )
}
