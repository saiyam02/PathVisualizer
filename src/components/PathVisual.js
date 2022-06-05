import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Grid from './Grid';
import {Dijkstra,getCellsofShortestPath} from './algorithms/Dijkstra';
import {BFS} from './algorithms/BFS';
import {DFS} from './algorithms/DFS';
import Alert from './Alert';
import { randomMaze } from './algorithms/mazeGenerators/RandomMaze';
import { recursiveMaze } from './algorithms/mazeGenerators/RecursiveMaze';

export default function PathVisual(props) {

  const[grid,setGrid]=useState([]);
  const [mousePressed,setMousePressed]=useState('');
  const [totRows,setTotRows]=useState(20);
  const [totCols,setTotCols]=useState(30);
  const [startCell, setStartCell]=useState({row:4, col:4 });
  const [endCell, setEndCell]=useState({row:26, col: 16});
  const [visualizeClicked,setVisualizeClicked]=useState(false);
  const [visualizing,setVisualizing]=useState(false);
  const [alertText,setAlert]=useState({text: "",type: ""});
  
  useEffect( ()=>{
    const width = window.innerWidth;
    const height = window.innerHeight;
    const totRows = Math.max(Math.floor(height/40),10)+3;
    const totCols = Math.floor(width/30);
    const startCell = {
        row: Math.floor(totRows/2),
        col: Math.floor(totCols/2)
    };
    const endCell = {
        row: totRows-5,
        col: totCols-5
    }
    const grid = getInitialGrid(totRows,totCols);
    grid[startCell.row][startCell.col].isStartCell = true;
    grid[totRows-5][totCols-5].isEndCell = true;
    setGrid(grid);
    setTotRows(totRows);
    setTotCols(totCols)
    setStartCell(startCell);
    setEndCell(endCell);
  }
  ,[props])
  
// const showAlert = (alertText,type) =>{
//   setAlert(<div className={`alert alert-${type}`} style={{width: "40%"}} role="alert">
//   <strong>{alertText}</strong> </div>)
// }

  const handleMouseDown=(row,col)=>
      {
        if(visualizeClicked) 
        {
          if(visualizing)
          setAlert({text:"Please wait, still finding path...",type:"warning"});
          else 
          setAlert({text:"Clear Board First !!",type:"primary"});
          return;
        }
        if(row===startCell.row && col===startCell.col)
         {
           setMousePressed('start');
           return
         }
        if (row===endCell.row && col===endCell.col)
        {
            setMousePressed('end');
            return
        }
        const newGrid=getWalledGrid(grid,row,col);
        setGrid(newGrid);
        setMousePressed('wall');
      }

      const handleMouseEnter=(row,col)=>
      {
        if(visualizeClicked) return;
        if(mousePressed==='')
          return
        if(mousePressed==='wall')
        {
          if( grid[row][col].isStartCell || grid[row][col].isEndCell) return
          const newGrid=getWalledGrid(grid,row,col);
          setGrid(newGrid);
        }  
        else if(mousePressed==='start')
        {
          if(grid[row][col].isEndCell || grid[row][col].isWall) return
          grid[startCell.row][startCell.col].isStartCell=false;
          const newGrid=getNewStartGrid(grid,row,col);
          const startcell={
            row: row,
            col: col
          }
          setStartCell(startcell);
          setGrid(newGrid);
        }
        else if(mousePressed==='end')
        {
          if(grid[row][col].isStartCell || grid[row][col].isWall) return
          const newGrid=getNewEndGrid(grid,row,col);
          newGrid[endCell.row][endCell.col].isEndCell=false;
          const endcell={
            row: row,
            col: col
          }
          setEndCell(endcell);
          setGrid(newGrid);
        }
      }    

  const handleMouseUp=(row,col)=>
      {
        if(visualizeClicked) 
        {
          return;
        }
        switch(mousePressed)
        {
          case 'wall':
            {
              const newGrid=getWalledGrid(grid,row,col);
              setGrid(newGrid);
            }
            break;
          case 'start':
            {
              const newGrid=oneStart(grid,row,col);
              setGrid(newGrid);
              console.log(startCell);
            }
            break;
          case 'end':
            {
              const newGrid=oneEnd(grid,row,col);
              setGrid(newGrid);
              console.log(endCell);
            }
            break;
          default:
            setMousePressed('');  
        }
        setMousePressed('');     
      }
  
  const getWalledGrid = (grid,row,col)=>{ 
      const newGrid = grid.slice();
      const cell = newGrid[row][col];
      const newCell = {
          ...cell,
          isWall: !cell.isWall
      };
      newGrid[row][col] = newCell;
      return newGrid;
  }

  const getNewStartGrid = (grid,row,col)=>{ 
    const newGrid = grid.slice();
    const cell = newGrid[row][col];
    
    const newCell = {
        ...cell,
        isStartCell: true
    };
    newGrid[row][col] = newCell;
    return newGrid;
};

const getNewEndGrid = (grid,row,col)=>{ 
  const newGrid = grid.slice();
  const cell = newGrid[row][col];
  
  const newCell = {
      ...cell,
      isEndCell: true
  };
  newGrid[row][col] = newCell;
  return newGrid;
};

const oneStart=(grid,row,col)=>{
  const newGrid = grid.slice();
  for(let i = 0;i < totRows ; i++){
      for( let j = 0;j < totCols; j++){
          const cell = newGrid[i][j];
          const newCell = {
            ...cell,
            isStartCell: false
          };
          newGrid[i][j]=newCell;
        }
  }
  newGrid[row][col].isStartCell=true;
  return newGrid;
}

const oneEnd=(grid,row,col)=>{
  const newGrid = grid.slice();
  for(let i = 0;i < totRows ; i++){
      for( let j = 0;j < totCols; j++){
          const cell = newGrid[i][j];
          const newCell = {
            ...cell,
            isEndCell: false
          };
          newGrid[i][j]=newCell;
        }
  }
  newGrid[row][col].isEndCell=true;
  return newGrid;
}

const removeWalls = ()=>{
  const newGrid = grid.slice();
  for(let i = 0;i < totRows ; i++){
      for( let j = 0;j < totCols; j++){
          const cell = newGrid[i][j];
          const newCell = {
                ...cell,
                isWall: false,
                distance:Infinity,
                visitedCell: false,
                isVisited:false,
                ispathCell:false,
                previousCell:null
          }
          if(!(cell.isStartCell || cell.isEndCell))
          document.getElementById(`cell-${i}-${j}`).className="cell";
          newGrid[i][j]=newCell;
        }
  }

  setGrid(newGrid);
}

const clearAll = ()=>{
  const newGrid = grid.slice();
  for(let i = 0;i < totRows ; i++){
      for( let j = 0;j < totCols; j++){
          const cell = newGrid[i][j];
          const newCell = {
                ...cell,
                isWall: false,
                distance:Infinity,
                visitedCell:false,
                isVisited:false,
                ispathCell:false,
                previousCell:null
          }
          if(!(cell.isStartCell || cell.isEndCell))
          document.getElementById(`cell-${i}-${j}`).className="cell";
          newGrid[i][j]=newCell;
        }
        setVisualizeClicked(false);
  }
  setAlert({text:"",type:""})
  setGrid(newGrid);
}

const notClearWall = ()=>{
  const newGrid = grid.slice();
  for(let i = 0;i < totRows ; i++){
      for( let j = 0;j < totCols; j++){
          const cell = newGrid[i][j];
          const newCell = {
                ...cell,
                distance:Infinity,
                visitedCell: false,
                isVisited:false,
                ispathCell:false,
                previousCell:null
          }
          newGrid[i][j]=newCell;
        }
        setVisualizeClicked(false);
  }
  setGrid(newGrid);
}


const visualize = (Algo,speed)=>{
  setAlert({text:"",type:""})
  console.log(speed);
  let result; // store visitedcells and successVal returned by algo
  let visitedCells;
  let cellsOfShortestPath;
  const startCellofGrid = grid[startCell.row][startCell.col];
  const endCellofGrid = grid[endCell.row][endCell.col];
  switch(Algo)
  {
    case 'Dijkstra':
      result = Dijkstra(grid,startCellofGrid,endCellofGrid);
      break;
    case 'BFS' :
      result=BFS(grid,startCellofGrid,endCellofGrid);
      break;
    case 'DFS' :
      result=DFS(grid,startCellofGrid,endCellofGrid);
      if(!result.success){
        setAlert({text:"No Path Possible,Rearrange Obstacles",type:"danger"});
        setVisualizing(false);
        return;
      }
      break;  
    default: return  
  }
  visitedCells=result.visitedCells;
  let success =result.success;
  cellsOfShortestPath = getCellsofShortestPath(endCellofGrid);
  visualizeAlgo(visitedCells,cellsOfShortestPath,speed,success);
}

const visualizeAlgo = async  (visitedCells,cellsOfShortestPath,speed,success) =>{
  for (let i = 0; i <= visitedCells.length; i++) {
    if (i === visitedCells.length) {
      if(!success) 
            { 
             setAlert({text:"No Path Found ", type:"danger"});
             setVisualizing(false);
            }
            document.getElementById(`cell-${endCell.row}-${endCell.col}`).className ='cell end-cell fas fa-map-marker-alt';
            const time=5000/speed;
            await rest(time);
            await animateShortestPath(cellsOfShortestPath,speed);
            setVisualizing(false);
            return;  
    }
        const cell = visitedCells[i];
        if(cell.row===startCell.row && cell.col===startCell.col)
        document.getElementById(`cell-${cell.row}-${cell.col}`).className ='cell start-cell fas fa-male';
        else if(cell.row===endCell.row && cell.col===endCell.col)
          document.getElementById(`cell-${cell.row}-${cell.col}`).className ='cell end-cell fas fa-map-marker-alt';
        else if(cell.visitedCell){
          document.getElementById(`cell-${cell.row}-${cell.col}`).className = 'cell again-visited-cell'
        }
        else{
         cell.visitedCell=true;
         document.getElementById(`cell-${cell.row}-${cell.col}`).className ='cell visited-cell';
        }
        const time=500/speed;
        await rest(time);
}
}       

const animateShortestPath = async (cellsOfShortestPath,speed)=>{
  const Grid = grid;
  const newGrid = Grid.slice();
  for (let i = 1; i < cellsOfShortestPath.length; i++) {
          const cell = cellsOfShortestPath[i];
          const newCell = {...newGrid[cell.row][cell.col],ispathCell:true};
          newGrid[cell.row][cell.col] = newCell;
          if( i === cellsOfShortestPath.length-1 ){
              setGrid(newGrid);
              return;
          }
          document.getElementById(`cell-${cell.row}-${cell.col}`).className ='cell shortest-path-cell';
          const time = 2500/speed;
          await rest(time);
  }
}

const animateMaze = async (mazeCells)=>{
  for(let i=0;i<mazeCells.length;i++){
    let row=mazeCells[i].row;
    let col=mazeCells[i].col;
    if((row===startCell.row && col===startCell.col) || (row===endCell.row && col===endCell.col) ) {}  
    else {
      grid[row][col].isWall=true;
      document.getElementById(`cell-${row}-${col}`).className="cell wall-cell";
    }
    await rest(15);
  }
  setVisualizing(false);
  grid[startCell.row][startCell.col+1].isWall=false;
  grid[endCell.row][endCell.col-1].isWall=false;
  document.getElementById(`cell-${startCell.row}-${startCell.col+1}`).className="cell";
  document.getElementById(`cell-${endCell.row}-${endCell.col-1}`).className="cell";
  // let noMazeCells=document.getElementsByClassName("cell");
  // for(let i=0;i<noMazeCells.length;i++) {
  //   noMazeCells[i].style.borderStyle="none";
  // }
}

const rest = (time) =>{
  return new Promise(resolve => setTimeout(resolve, time));
}


const handleVisualize = (Algo,speed)=>{
    console.log(speed);
    setVisualizeClicked(true);
    setVisualizing(true);
    visualize(Algo,speed);// start from here making vizualize function
}

const handleMaze = (maze)=>{
  clearAll();
  let mazeCells=[];
  switch(maze){
    case "randomMaze":
      mazeCells=randomMaze(totRows,totCols);
    break;
    case "recursiveMaze":
      console.log("maze called");
      mazeCells=recursiveMaze(totRows,totCols);
    break;
    case "Maze 3":
    console.log("maze 3");
    break;    
    default : return;
  }
  setVisualizing(true);
  animateMaze(mazeCells);
}
  return (
    <div>
        <NavBar key={`${visualizing}-${visualizeClicked}`}
                visualizing={visualizing}
                visualizeClicked={visualizeClicked}
                onVisualize={(algo,speed)=>handleVisualize(algo,speed)}
                onMazeCreate={maze=>handleMaze(maze)}
                onRemoveWalls={removeWalls}
                onClearAll={clearAll}
                notClearWall={notClearWall}
        />
        <div className="d-flex justify-content-end" style={{height: "70px"}}>
          <Alert key={alertText.text} alertText={alertText.text} type={alertText.type}/>
        </div>
        <Grid 
            key={grid}
            grid={grid}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
          />
    </div>
  )
}

const getInitialGrid = (totRow,totCol) => {
  const grid = [];
  for (let row = 0; row < totRow; row++) {
      const currentRow = [];
      for (let col = 0; col < totCol; col++) {
          currentRow.push(createCell(row,col));
      }
      grid.push(currentRow);
  }
  return grid;
}

const createCell = (row,col)=>{
  return {
      row,
      col,
      isWall: false,
      isStartCell:false,
      isEndCell:false,
      distance:Infinity,
      visitedCell: false,
      isVisited:false,
      ispathCell:false,
      previousCell:null
  };
}

