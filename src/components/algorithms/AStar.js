export function AStar(grid,startCellofGrid,endCellofGrid){
    const sortedFvalue=[]; // Will conatin cells in sorted F value (g value + h Value)
    const visitedCells=[];
    startCellofGrid.distance=0;
    let currentCell = startCellofGrid; // storing f value as distance
    sortedFvalue.push(startCellofGrid);
    while(sortedFvalue.length){
        currentCell = sortedFvalue.shift();
        visitedCells.push(currentCell);
        currentCell.isVisited=true;
        upadateSoretdFvalue(grid,currentCell,startCellofGrid,endCellofGrid,sortedFvalue); //add new neigbours of current cell and sort them by Fvalue
        if(sortedFvalue.length===0){
            return {visitedCells: visitedCells, success: false};
        }
       if(currentCell.row===endCellofGrid.row && currentCell.col===endCellofGrid.col) 
       {
            return {visitedCells: visitedCells, success: true};
        }
    } 
}

function upadateSoretdFvalue(grid,currentCell,startCellofGrid,endCellofGrid,sortedFvalue){
    let unvisitedNeighbours = getNeighbours(grid,currentCell);
    let neighbours = [];
    for (const neighbour of unvisitedNeighbours) {
        if(sortedFvalue.some(el=> el.row===neighbour.row && el.col ===neighbour.col )) {
            continue;
        }
        let gx = Math.abs(neighbour.row-startCellofGrid.row);
        let gy = Math.abs(neighbour.col-startCellofGrid.col);
        let hx = Math.abs(neighbour.row-endCellofGrid.row);
        let hy = Math.abs(neighbour.col-endCellofGrid.col);
        neighbour.previousCell=currentCell;
        neighbour.distance =  gx+gy+hx+hy+hx*.01; // scaling up h by .01 so that as get closer to target h decreases and so the f
        neighbour.h=hx+hy;  // f_value = g_value + h_value
        neighbours.push(neighbour);
        sortedFvalue.push(neighbour);
      }
      sortCellsByDistance(sortedFvalue);
}

function getNeighbours(grid,cell){
    const neighbours = [];
    const row = cell.row;
    const col = cell.col;
    if (row > 0)
        neighbours.push(grid[row - 1][col]);
        if (col < grid[0].length - 1) 
        neighbours.push(grid[row][col + 1]);    
    if (row < grid.length - 1) 
        neighbours.push(grid[row + 1][col]);
    if (col > 0) 
        neighbours.push(grid[row][col - 1]);
    return neighbours.filter(neighbour => ( !neighbour.isVisited && !neighbour.isWall ));
}

// sorts by fvalue and if two same fvalue then selects the one with less h value (closer to endcell)
function sortCellsByDistance(array){
    array.sort((cell1, cell2) =>{
        return cell1.distance-cell2.distance;
    });
  }