export function Dijkstra(grid,startCellofGrid,endCellofGrid) {
    const visitedCells=[]; //all visited cells
    startCellofGrid.distance=0; // all cells except startCell will initially have infinite distance
    const unvisitedCells=getAllCells(grid); //An Array of all individual cell (without wall cells)
    while(unvisitedCells.length)  
    {
        sortCellsByDistance(unvisitedCells);//sorting in ascending order
        const nearestCell = unvisitedCells.shift(); //removing first cell from sorted array of cells 
        if(nearestCell.distance===Infinity) return {visitedCells:visitedCells,success:false}; 
        nearestCell.isVisited = true; 
        visitedCells.push(nearestCell);
        if(nearestCell===endCellofGrid) return {visitedCells:visitedCells,success:true};
        updateNeighbours(nearestCell,grid);
    }
}


function getAllCells(grid) {
    const cells = [];
    for (const row of grid) {
      for (const cell of row) {
        cells.push(cell);
      }
    }
    return cells.filter(cell=>!cell.isWall);
  }

  function sortCellsByDistance(unvisitedCells) {
    unvisitedCells.sort((cell1, cell2) => cell1.distance - cell2.distance);
  }

function updateNeighbours(nearestCell, grid) {
    const unvisitedNeighbours = getUnvisitedNeighbours(nearestCell, grid);
    for (const neighbour of unvisitedNeighbours) {
      if(!neighbour.isWall){
      neighbour.distance = nearestCell.distance + 1;
      neighbour.previousCell = nearestCell;
      }
    }
  }

function getUnvisitedNeighbours(cell,grid){
    const neighbours = [];
    const row = cell.row;
    const col = cell.col;
    if (row > 0)
        neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1) 
        neighbours.push(grid[row + 1][col]);
    if (col > 0) 
        neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) 
        neighbours.push(grid[row][col + 1]);
    return neighbours.filter(neighbour => !neighbour.isVisited);
}

export function getCellsofShortestPath(endCellofGrid) {
    const cellsOfShortestPath = [];
    let currentCell = endCellofGrid;
    while (currentCell !== null) {
      cellsOfShortestPath.unshift(currentCell);
      currentCell = currentCell.previousCell;
    }
    return cellsOfShortestPath;
  }
  