function filterCells(cells){
    let finalCells = []
        for (let i =1 ; i<cells.length; i++)
        if (cells[i][1]>=0 && cells[i][1]<8){
            if (cells[i][0]>=0 && cells[i][0]<8)
            {
                finalCells.push(cells[i])
            }
        } 
return finalCells
}


function move_straight_cells(x, y){
    var right_path = []
    var left_path = []
    var up_path = []
    var down_path = []
    var paths = []
    for (let i=1 ; i<8 ; i++)
    {
    right_path.push([x,i+y])
    left_path.push([x, y-i]) 
    up_path.push([x-i, y]) 
    down_path.push([x+i, y]) 
   }
    paths = [filterCells(right_path), filterCells(left_path), filterCells(up_path), filterCells(down_path)]
    return paths
}



function move_diagonaly_cells(x, y){
    var right_path = []
    var left_path = []
    var up_path = []
    var down_path = []
    var paths = []
    for (let i=1 ; i<8 ; i++)
    {
    right_path.push([x-i, i+y])
    left_path.push([x+i, i+y]) 
    up_path.push([x+i, y-i]) 
    down_path.push([x-i, y-i]) 
   }
    paths = [filterCells(right_path), filterCells(left_path), filterCells(up_path), filterCells(down_path)]
    return paths
}

function move_knight_cells(x, y){
    var cells = [[[x+2, y+1]], [[x+2, y-1]], [[x-2, y+1]], [[x-2, y-1]],
             [[x+1, y+2]], [[x+1, y-2]], [[x-1, y+2]], [[x-1, y-2]]]
    var finalCells = filterCells(cells)
   return finalCells
    }

// def move_king_cells(x, y):
//     cells = [[x-1, y], [x-1, y+1], [x, y+1], [x+1, y+1],
//              [x+1, y], [x+1, y-1], [x, y-1], [x-1, y-1]]
//     cells = [cell for cell in cells if (
//         cell[0] >= 0 and cell[0] < 8) and (cell[1] >= 0 and cell[1] < 8)]

//     # print(cells)
//     return cells



// function available_squares(board, x, y , piece, pieceColor) {
//     console.log(board)
//     var availableSquares = []
//     if (piece === "knight")
//     {
//        availableSquares = move_knight_cells(x,y)

//     }
//     else if (piece === "bishop")
//     {  
//         availableSquares = move_diagonaly_cells(x,y)

        
//     }
//     else if (piece === "rook")
//     {
//         availableSquares = move_straight_cells(x,y)

//     }
//     else if (piece === "queen")
//     {
//         availableSquares = move_diagonaly_cells(x,y)
//         // availableSquares.push()
//         availableSquares = availableSquares.concat(move_straight_cells(x,y))
    
//     }
//     // else if (piece === "king")
//     // {

        
//     // }
//     // else if ( piece === "pawn")
//     // {

//     // }
//     console.log("wut")
//     var availableMoves = []
//     // availableSquares.forEach((path) => { 
//     //     path.forEach((square) => {
//     //         let id = 8*square[1] + square[0] 
//     //         if (board[id].piece){
//     //             availableMoves.push(square)
//     //         }    
//     //         else break
//  /* for each path */      
//     for ( let i=0 ; i<availableSquares.length ; i++){
//         /*for each square */
//         for ( let j = 0 ; j<availableSquares.length; j++){

//                 let id = 8*availableSquares[i][j][1] + availableSquares[i][j][0] 
//                 if (board[id].piece === ""){
//                     console.log("push")
//                     availableMoves.push(availableSquares[i][j])
//                 }    
//                 else{
//                     console.log([board[id].piece])
//                     console.log("break")
//                     break 
//                 }
//         }

//     }


            
//     //     })
//     // });



// return availableMoves
// }



// export default available_squares








var  move_types = {move_knight_cells:move_knight_cells,
                            move_straight_cells:move_straight_cells,
                        move_diagonaly_cells:move_diagonaly_cells}


export default move_types