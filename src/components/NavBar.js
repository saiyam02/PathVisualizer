import React, { useState } from 'react'
import './cell.css';

export default function NavBar(props) {

  const [algo,setAlgo]=useState('');
  const [maze,setMaze]=useState('recursiveMaze');
  

  const handleClick =()=>{
    const speed=document.getElementById("customRange1").value;
    console.log(speed);
    if(props.visualizeClicked)
    {  
      props.notClearWall();
      props.onVisualize(algo,speed);
    }
    else
    props.onVisualize(algo,speed);
  }

 

  return (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">Path Finding Visualizer</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Select Algorithm
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownMenuLink">
                      <li className="dropdown-item " onClick={()=>setAlgo("Dijkstra")} >Dijkstra</li>
                      <li className="dropdown-item" onClick={()=>setAlgo("BFS")}      > BFS </li>
                      <li className="dropdown-item" onClick={()=>setAlgo("DFS")}      > DFS </li>
                    </ul>
                  </li>
                  <button className='btn-success fw-bold mx-3' disabled={algo==='' || props.visualizing} onClick={handleClick} >{algo?`Start Visualizing ${algo}`:"Select an algorithm to Start"}</button>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle mx-3" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Select Maze Algorithm
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownMenuLink">
                      <li className="dropdown-item" onClick={()=>setMaze("recursiveMaze")}>Recursive Division Maze </li>
                      <li className="dropdown-item" onClick={()=>setMaze("randomMaze")}>Random Maze</li>
                    </ul>
                  </li>
                  <button className='btn-primary' disabled={props.visualizing} onClick={()=>props.onMazeCreate(maze)}>Add Maze</button>
                </ul>
                <div class="d-flex flex-column">
                <label htmlFor="customRange1" className="form-label text-white mx-3" >Control Speed</label>
                <input type="range" className="form-range mx-3" id="customRange1" min="3" max="100" disabled={algo===''|| props.visualizing} style={{width: "100px"}}></input>
                </div>
                <div className="d-flex">
                <div className="conatiner mx-2"> <button className="btn btn-outline-danger" style={{fontSize: "14px"}} disabled={props.visualizing} onClick={()=>props.onRemoveWalls()} > Remove Walls </button> </div>
                <div className="conatiner mx-2"> <button className="btn btn-outline-danger" style={{fontSize: "14px"}} disabled={props.visualizing} onClick={()=>props.onClearAll()} > Clear Board</button> </div>
                </div>
              </div>
            </div>
          </nav>
        </>
    )
}
