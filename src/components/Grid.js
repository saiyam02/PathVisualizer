import React from 'react'
import Cell from './Cell';
import './styles/cell.css'

export default function Grid(props) {

  return (
     <div className="container">
                {props.grid.map((row, rowid) => {
                    return (
                        <div key={rowid} className="flex-container">
                            {row.map((cell, cellid) => {
                                return (
                                    <Cell
                                        key={cellid}
                                        cell={cell}
                                        onMouseDown = {props.onMouseDown}
                                        onMouseEnter = {props.onMouseEnter}
                                        onMouseUp = {props.onMouseUp}
                                        onClickCell = {props.onClickCell}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
     </div>
  )
}
