export function randomMaze(rows,cols){
    let mazeCells=[];
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let random = Math.floor(Math.random()*4);
            if( random === 2 ){
                mazeCells.push({
                    row: i,
                    col: j
                });
            }
        }
    }
    return mazeCells;
}