export function GreedyBFS(grid,startCellofGrid,endCellofGrid){
    let sortedHeuristic=[];
    let visitedCells=[];
    sortedHeuristic.push(startCellofGrid);
    while (sortedHeuristic.length){
        let currentCell = sortedHeuristic.shift();
        visitedCells.push(currentCell);
        currentCell.isVisited=true;
        updateSortedHeuristic(grid,currentCell,endCellofGrid,sortedHeuristic,visitedCells); 
        if(sortedHeuristic.length===0){
        return {visitedCells: visitedCells, success: false};// will find neighbour, add to sorted heuristic nd sort
        }
        if(sortedHeuristic[0].distance===0)
        {
            return {visitedCells: visitedCells,success: true};
        }  
    }
}

function updateSortedHeuristic(grid,currentCell,endCellofGrid,sortedHeuristic,visitedCells){
    let unvisitedNeighbours = getNeighbours(grid,currentCell);
    for (const neighbour of unvisitedNeighbours) {
        if(sortedHeuristic.some(el=> el.row===neighbour.row && el.col ===neighbour.col )) continue;
        if(visitedCells.some(el=> el.row===neighbour.row && el.col ===neighbour.col )) continue;
        let x = Math.abs(neighbour.row-endCellofGrid.row);
        let y = Math.abs(neighbour.col-endCellofGrid.col);
        neighbour.previousCell=currentCell;
        neighbour.distance =  x+y;
        sortedHeuristic.push(neighbour);
      }
      sortCellsByDistance(sortedHeuristic);
}

function getNeighbours(grid,cell){
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
    return neighbours.filter(neighbour => (!neighbour.isVisited && !neighbour.isWall ));
}

function sortCellsByDistance(sortedHeuristic){
    sortedHeuristic.sort((cell1, cell2) => cell1.distance - cell2.distance);
  }