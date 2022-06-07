export function recursiveMaze(rows,cols){
   let mazeCells=[];
   for(let i=0;i<cols;i++) //topmost cells
   {
        mazeCells.push({
            row: 0,
            col: i,
        });
   }
   for(let i=0;i<rows;i++) //rightmost cells  
   {
        mazeCells.push({
            row: i,
            col: cols-1,
        });
   }
   for(let i=cols-1;i>=0;i--)//bottom cells
   {
        mazeCells.push({
            row: rows-1,
            col: i,
        });
   }
   for(let i=rows-1;i>=0;i--)//leftmost cells
   {
        mazeCells.push({
            row: i,
            col: 0,
        });
   }
   getMazeCells(mazeCells,1,rows-2,1,cols-2);
   return mazeCells;
}

function getMazeCells(mazeCells,startRow,endRow,startCol,endCol){
    if( ((endRow-startRow) <=1) && ((endCol - startCol) <=1) ){
        return ;
    }
    if( (endCol - startCol) > (endRow - startRow) ){
        recursiveMazeVertical(mazeCells,startRow,endRow,startCol,endCol);
    }
    else{
        recursiveMazeHorizontal(mazeCells,startRow,endRow,startCol,endCol);
    }
}

function recursiveMazeVertical(mazeCells,startRow,endRow,startCol,endCol){
    let mid = Math.floor((endCol+startCol)/2);
    let random = Math.floor(Math.random() * (endRow-startRow+1)) + startRow;
    let start = startRow;
    if(!(mazeCells.some(el=>el.row===startRow-1 && el.col===mid))){
        random = start;
        start++;
    }
    let end = endRow;
    if( !(mazeCells.some(el=>el.row===endRow+1 && el.col===mid))){
        random = end;
        end--;
    }
    for(let i = start;i<=end;i++){
        if( i!==random ){
            mazeCells.push({
                row:i,
                col:mid
            });
        }
    }
    getMazeCells(mazeCells,startRow,endRow,startCol,mid-1);
    getMazeCells(mazeCells,startRow,endRow,mid+1,endCol);
}


function recursiveMazeHorizontal(mazeCells,startRow,endRow,startCol,endCol){
    let mid = Math.floor((endRow+startRow)/2);
    let random = Math.floor(Math.random() * (endCol-startCol+1)) + startCol;
    let start = startCol;
    if( !(mazeCells.some(el=>el.row===mid && el.col===startCol-1)) ){
        random = start;
        start++;
    }
    let end = endCol;
    if( !(mazeCells.some(el=>el.row===mid && el.col===endCol+1)) ){
        random = end;
        end--;
    }
    for(let i = start;i<=end;i++){
        if( i!==random ){
            mazeCells.push({
                row:mid,
                col:i
            });
        }
    }
    getMazeCells(mazeCells,startRow,mid-1,startCol,endCol);
    getMazeCells(mazeCells,mid+1,endRow,startCol,endCol);

}

