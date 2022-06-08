import React, { useEffect, useState } from 'react'
import NavBar from './NavBar';
import Legend from './Legend';
import Grid from './Grid';
import Stats from './Stats';
import Info from './Info';
import {Dijkstra,getCellsofShortestPath} from './algorithms/Dijkstra';
import {BFS} from './algorithms/BFS';
import {DFS} from './algorithms/DFS';
import { GreedyBFS} from './algorithms/GreedyBFS';
import Alert from './Alert';
import { randomMaze } from './algorithms/mazeGenerators/RandomMaze';
import { recursiveMaze } from './algorithms/mazeGenerators/RecursiveMaze';
import { AStar } from './algorithms/AStar';

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
  const [visitedCount,setVisitedCount]=useState(0);
  const [pathCount,setPathCount]=useState(0);
  
  useEffect( ()=>{
    const width = window.innerWidth;
    const height = window.innerHeight;
    const totRows = Math.max(Math.floor(height/45),10);
    const totCols = Math.floor(width/35);
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

  const handleMouseDown=(row,col)=>
      {
          if(visualizing)
          {setAlert({text:"Please wait, still finding path...",type:"warning"});
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
        if(visualizing) return;
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
        if(visualizing) 
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
            }
            break;
          case 'end':
            {
              const newGrid=oneEnd(grid,row,col);
              setGrid(newGrid);
            }
            break;
          default:
            setMousePressed('');  
        }
        setMousePressed('');     
      }
  
const onClickCell=(row,col)=>{
      if(visualizing)
        {setAlert({text:"Please wait, still finding path...",type:"warning"});
          return;
        }
  if(grid[row][col].isStartCell || grid[row][col].isEndCell) return;
  const newGrid=getWalledGrid(grid,row,col);
  setGrid(newGrid);
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
                previousCell:null
          }
          if(!(cell.isStartCell || cell.isEndCell || cell.isVisited || cell.ispathCell))
          document.getElementById(`cell-${i}-${j}`).className="cell";
          newGrid[i][j]=newCell;
        }
  }

  setGrid(newGrid);
}

const clearAll = ()=>{
  setVisitedCount(0);
  setPathCount(0);
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
          else if(cell.isStartCell)
          document.getElementById(`cell-${i}-${j}`).className="cell start-cell fas fa-male";
          else if(cell.isEndCell)
          document.getElementById(`cell-${i}-${j}`).className="cell end-cell fas fa-map-marker-alt";
          newGrid[i][j]=newCell;
        }
        setVisualizeClicked(false);
  }
  setAlert({text:"",type:""})
  setGrid(newGrid);
}

const notClearWall = ()=>{
  setVisitedCount(0);
  setPathCount(0);
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
          if(cell.isStartCell)
          document.getElementById(`cell-${i}-${j}`).className="cell start-cell fas fa-male";
          else if(cell.isEndCell)
          document.getElementById(`cell-${i}-${j}`).className="cell end-cell fas fa-map-marker-alt"
          newGrid[i][j]=newCell;
        }
        setVisualizeClicked(false);
  }
  setGrid(newGrid);
}


const visualize = (Algo,speed)=>{
  setAlert({text:"",type:""})
  let result;
  let visitedCells;
  let cellsOfShortestPath;
  let count;
  const startCellofGrid = grid[startCell.row][startCell.col];
  const endCellofGrid = grid[endCell.row][endCell.col];
  switch(Algo)
  {
    case 'Dijkstra':
      result = Dijkstra(grid,startCellofGrid,endCellofGrid);
      count=-1;
      break;
    case 'BFS' :
      result=BFS(grid,startCellofGrid,endCellofGrid);
      count=-2;
      break;
    case 'Greedy':
      result=GreedyBFS(grid,startCellofGrid,endCellofGrid);
      count=(result.success?0:-1);
      break;
    case 'AStar':
      result=AStar(grid,startCellofGrid,endCellofGrid);
      count=-1;
      break;
    case 'DFS' :
      result=DFS(grid,startCellofGrid,endCellofGrid);
      count=-2;
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
  visualizeAlgo(visitedCells,cellsOfShortestPath,speed,success,count);
}

const visualizeAlgo = async  (visitedCells,cellsOfShortestPath,speed,success,count) =>{
  for (let i = 0; i <= visitedCells.length; i++) {
    count=count+1;
    setVisitedCount(count);
    if (i === visitedCells.length) {
      if(!success) 
            { 
             setAlert({text:"No Path Found ", type:"danger"});
             setVisualizing(false);
            }
            document.getElementById(`cell-${endCell.row}-${endCell.col}`).className ='cell end-cell fas fa-map-marker-alt again-visited-cell';
            const time=5000/speed;
            await rest(time);
            await animateShortestPath(cellsOfShortestPath,speed);
            setVisualizing(false);
            if(success)setAlert({text:"",type:""});
            return;  
    }
        const cell = visitedCells[i];
        if(cell.row===startCell.row && cell.col===startCell.col)
        document.getElementById(`cell-${cell.row}-${cell.col}`).className ='cell start-cell fas fa-male visited-cell';
        else if(cell.row===endCell.row && cell.col===endCell.col)
          document.getElementById(`cell-${cell.row}-${cell.col}`).className ='cell end-cell fas fa-map-marker-alt visited-cell';
        else if(cell.visitedCell){
          document.getElementById(`cell-${cell.row}-${cell.col}`).className = 'cell again-visited-cell'
        }
        else{
         cell.visitedCell=true;
         document.getElementById(`cell-${cell.row}-${cell.col}`).className ='cell visited-cell';
        }
        const time=1000/speed;
        await rest(time);
}
}       

const animateShortestPath = async (cellsOfShortestPath,speed)=>{
  const Grid = grid;
  const newGrid = Grid.slice();
  let count=0;
  for (let i = 1; i < cellsOfShortestPath.length; i++) {
          count+=1;
          setPathCount(count);
          const cell = cellsOfShortestPath[i];
          const newCell = {...newGrid[cell.row][cell.col],ispathCell:true};
          newGrid[cell.row][cell.col] = newCell;
          if( i === cellsOfShortestPath.length-1 ){
              document.getElementById(`cell-${endCell.row}-${endCell.col}`).className ='cell end-cell fas fa-map-marker-alt shortest-path-cell ';
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
  setAlert({text:"",type:""});
  grid[startCell.row][startCell.col+1].isWall=false;
  grid[endCell.row][endCell.col-1].isWall=false;
  document.getElementById(`cell-${startCell.row}-${startCell.col+1}`).className="cell";
  document.getElementById(`cell-${endCell.row}-${endCell.col-1}`).className="cell";
}

const rest = (time) =>{
  return new Promise(resolve => setTimeout(resolve, time));
}


const handleVisualize = (Algo,speed)=>{
    setVisualizeClicked(true);
    setVisualizing(true);
    visualize(Algo,speed);
}

const handleMaze = (maze)=>{
  clearAll();
  let mazeCells=[];
  switch(maze){
    case "randomMaze":
      mazeCells=randomMaze(totRows,totCols);
    break;
    case "recursiveMaze":
      mazeCells=recursiveMaze(totRows,totCols);
    break;
    case "Maze 3":
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
        <div className="d-flex justify-content-end" style={{height: "1vw"}}>
          <Alert key={alertText.text} alertText={alertText.text} type={alertText.type}/>
        </div>
        <div className= "container" style={{marginBottom: "10px"}}>
            <Legend/>
        </div>
        <Grid
            key={grid}
            grid={grid}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            onClickCell={onClickCell}
          />
          <div className="d-flex">
          <Stats 
            key={visitedCount}
            visitedCount={visitedCount}
            pathCount={pathCount}/>
          <Info/>
          </div>
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




