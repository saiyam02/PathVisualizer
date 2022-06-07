export function BFS(grid,startCellofGrid,endCellofGrid){
    var q = [];
    const visitedCells = [];
    visitedCells.push(startCellofGrid);
    q.push(startCellofGrid);
    startCellofGrid.isVisited = true;
    while(!!q.length){
        const currentCell = q.shift();
        visitedCells.push(currentCell);
        if( currentCell === endCellofGrid ) return {visitedCells:visitedCells, success:true};
        const neighbours = findNeighbours(grid,currentCell);
        for( const cell of neighbours ){
            cell.isVisited = true;
            cell.previousCell = currentCell;
            q.push(cell);

        }
    }
    return {visitedCells:visitedCells, success:false};
}

function findNeighbours(grid,cell){
    const neighbors = [];
    const {col, row} = cell;
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => (!neighbor.isVisited && !neighbor.isWall ));
}