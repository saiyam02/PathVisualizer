export function DFS(grid,startCellofGrid,endCellofGrid){
    var stack = [];
    const visitedCells = [];
    visitedCells.push(startCellofGrid);
    stack.push(startCellofGrid);
    startCellofGrid.isVisited = true;
    while(!!stack.length){
        const currentCell = stack.pop();
        visitedCells.push(currentCell);
        currentCell.isVisited = true;
        if( currentCell === endCellofGrid ) return {visitedCells:visitedCells, success:true};
        let neighbours = findNeighbours(grid,currentCell);
        for( const cell of neighbours ){
            cell.previousCell = currentCell;
            stack.push(cell);

        }
    }
    return {visitedCells:visitedCells, success:false};
}

function findNeighbours(grid,cell){
    const neighbors = [];
    const {col, row} = cell;
    if (row > 0) neighbors.unshift(grid[row - 1][col]);
    if (col < grid[0].length - 1) neighbors.unshift(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.unshift(grid[row + 1][col]);
    if (col > 0) neighbors.unshift(grid[row][col - 1]);
    return neighbors.filter(neighbor => (!neighbor.isVisited && !neighbor.isWall ));
}