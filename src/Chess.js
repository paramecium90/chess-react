import { useEffect, useState } from "react"
import "./Chess.css"




var selectedSquare = {
    id:"",
    x:"",
    y:"",
    piece: "",
    pieceColor:"",
    selected: false,
    moveTurn: 0
}

var available_moves = []
var gameTurn = 0
var currentPlayer  = "white"


var tests = 0


function changePlayer(){
    if (currentPlayer === "white"){
        currentPlayer= "black"
    }
    else{
        currentPlayer = "white"
    }
}

var squares = []


//////////// main

export default function Chess()
{



var [derp,setDerp ] = useState(0)
var [startMenu,setStartMenu]= useState(false)
var [useSquares,setUseSquares] = useState(squares)
var [moveList,setMoveList] = useState([])
var [winner,setWinner] =useState({winner: "",reason:""})



function isCheckmate(){
    selectedSquare.pieceColor = currentPlayer
    for(let i=0 ; i<64 ; i++){
        if (squares[i].pieceColor===currentPlayer){
            console.log(squares[i])
            selectedSquare.y = Math.floor(i/8)
            selectedSquare.x = i%8


            let available_moves = available_squares(squares[i].x,squares[i].y,squares[i].piece,1 )
            console.log(available_moves)
            for (let j=0 ; j<available_moves.length ; j++){

                if (!kingsProtection(squares,squares[i].x,squares[i].y,available_moves[j][0],available_moves[j][1])){
                    console.log(squares[i].piece)
                    console.log(available_moves[j])
                    console.log("break")
                            squares[i].selected = false  
                    return false
                }

            }

        }
        squares[i].selected = false 
    }
    return true
}






function promoteHandler(e) {
    

    let promoteId = promoteMenu[1]
    changePlayer()
    setPiece(squares,promoteId,e.target.id, currentPlayer)
    setPromoteMenu([false,promoteId])
    changePlayer()}







var [promoteMenu,setPromoteMenu] = useState([false,0])    
const promotePieces = ["rook","knight","bishop","queen"] 







function canCastle(targetX,targetY){
    if (targetY === 7  && currentPlayer === "white"){

        // if king check if you can castle else nothing
        if (selectedSquare.piece === "king"){


            if (targetX == 1 || targetX == 2 || targetX == 0){

                if (squares[59].piece === "" && squares[ 58 ].piece === '' && squares[ 57 ].piece === '' && squares[56].lastMoveTurn  == 0 && squares[60].lastMoveTurn  === 0 ){

                    setPiece(squares,59,"rook","white")    
                    setPiece(squares,58,"king","white")    
                    resetSquare(squares,56)
                    resetSquare(squares,60)
                    return true


                }
            }
            else if (targetX == 6 || targetX== 7){
                
                if (squares[ 62 ].piece === '' && squares[ 61 ].piece === '' && squares[63].lastMoveTurn  == 0 && squares[60].lastMoveTurn  === 0 ){

                    setPiece(squares,61,"rook","white")    
                    setPiece(squares,62,"king","white")    
                    resetSquare(squares,60)
                    resetSquare(squares,63)
                    return true

                }
            }
            
        }
    }
    else if (targetY === 0  && currentPlayer === "black"){

            if (selectedSquare.piece === "king"){


            if (targetX == 1 || targetX == 2 || targetX == 0){

                if (squares[3].piece === "" && squares[2].piece === '' && squares[ 1].piece === '' && squares[0].lastMoveTurn  == 0 && squares[4].lastMoveTurn  === 0 ){
    
                    setPiece(squares,3,"rook","black")    
                    setPiece(squares,2,"king","black")    
                    resetSquare(squares,4)
                    resetSquare(squares,0)
                    return true

                }
            }
            else if (targetX == 6 || targetX== 7){
                
                if (squares[ 5 ].piece === '' && squares[6 ].piece === '' && squares[7].lastMoveTurn  == 0 && squares[4].lastMoveTurn  === 0 ){

                    setPiece(squares,5,"rook","black")    
                    setPiece(squares,6,"king","black")    
                    resetSquare(squares,7)
                    resetSquare(squares,4)
                    return true
                }
            }
            
        }
    }
    return false
}








function kingsProtection(board,currentX,currentY,nextX,nextY)
{   
    var tempBoard =  [...board]

  
    let nextId = nextX + 8*nextY
    let currentId =currentX + 8*currentY

    var tempPiece = board[nextId].piece
    var tempPieceColor = board[nextId].pieceColor



    tempBoard = setPiece(tempBoard,nextId,tempBoard[currentId].piece,tempBoard[currentId].pieceColor)
 
    tempBoard  =resetSquare(tempBoard,currentId)



    changePlayer()
    selectedSquare.pieceColor = currentPlayer
    var islegal = isCheck(tempBoard,currentPlayer)
    changePlayer()
    selectedSquare.pieceColor = currentPlayer


    tempBoard = setPiece(tempBoard,currentId,tempBoard[nextId].piece,tempBoard[nextId].pieceColor)

    // tempBoard  =resetSquare(tempBoard,nextId)

    board[nextId].piece  = tempPiece
    board[nextId].pieceColor  = tempPieceColor

    tempBoard[currentId].selected =  true

    return islegal
}









function test(){
    for (let i=0 ; i <64 ; i++)
{   
    let x = i%8
    let y = Math.floor(i/8)
    let square = {  id : i,
                    x : x,
                    y : y,
                    color : [(x+y)%2===1 ? "black": "white"],
                    piece : "",
                    pieceColor : "",
                    selected: false,
      }
    squares.push(square)
}

// return moveList
}


if (tests == 0){
    test()
    tests++
}









function startMenuToggle() {
    setStartMenu(!startMenu)
    startGame()
} 


function isCheck(board, player){
    var isCheck = false
    var attackedCells = []
    var enemyKingCords = []
    board.forEach(cell => {

        if (cell.pieceColor === player){
            
            if (cell.piece === 'pawn')
            {
                if(player === "black"){
                    attackedCells.push([cell.x+1,cell.y+1])
                    attackedCells.push([cell.x-1,cell.y+1])
                }
                else {
                    attackedCells.push([cell.x+1,cell.y-1])
                    attackedCells.push([cell.x-1,cell.y-1])
                }
            }
            else {
                /*mporei na iparxei bug gt ta moves cells ta blepei sto original*/
                attackedCells = attackedCells.concat(available_squares(cell.x,cell.y,cell.piece,cell.pieceColor))
            }    
        }
        else if ( cell.piece === "king")
        {
   
            enemyKingCords = [cell.x,cell.y]
   
        }

    })


  
        
        attackedCells.forEach((square) => {

            if (square[0] == enemyKingCords[0] && square[1] == enemyKingCords[1] ){
                isCheck = true
            }
        })

    // gia kathe tetragwno to board ama einai sto swsto xroma psakse ola ta attacks ama einai pawn new attacks ama einai o king kane save thn thesh tou


    // elenkse ama einai o king mesa sta id me ta epithomena tetragwna
return isCheck


}

/* selects a square - updates selected square */
function selectSquare (id,x,y,piece,pieceColor,lastMoveTurn){
            selectedSquare.id = id
            selectedSquare.x = x
            selectedSquare.y = y
            selectedSquare.piece =  piece
            selectedSquare.pieceColor = pieceColor
            selectedSquare.selected  =  true
            selectedSquare.moveTurn = lastMoveTurn
        


   squares[id].selected = true


    return( {

    })
}



/*reset a squaret */
function resetSquare (board,id){
        board[id].piece = '' 
        board[id].selected = false   
        board[id].pieceColor =  ''
return board


}




/*place a square*/
function setPiece (board,id,piece,pieceColor){ 
    board[id].piece = piece   
    board[id].pieceColor =  pieceColor
    board[id].lastMoveTurn = gameTurn
return board
}





function startGame(){
                          for (let i=0; i<64 ;i ++){
                            resetSquare(squares,i)
                            // squares[i].moveTurn=0
                        }
                        setMoveList([])
    setPiece(squares,0,"rook","black")    
    setPiece(squares,1,"knight","black")
    setPiece(squares,2,"bishop","black")
    setPiece(squares,3,"queen","black")
    setPiece(squares,4,"king","black")
    setPiece(squares,5,"bishop","black")
    setPiece(squares,6,"knight","black")
    setPiece(squares,7,"rook","black")
    for (let i = 8 ; i<16 ; i++){
        setPiece(squares,i,"pawn","black")
        }
    setPiece(squares,63,"rook","white")    
    setPiece(squares,62,"knight","white")
    setPiece(squares,61,"bishop","white")
    setPiece(squares,59,"queen","white")
    setPiece(squares,60,"king","white")
    setPiece(squares,58,"bishop","white")
    setPiece(squares,57,"knight","white")
    setPiece(squares,56,"rook","white")
    for (let i = 48 ; i<56 ; i++){
        setPiece(squares,i,"pawn","white")    
    }
}


/*  ///////////////////////////////////////////////////                                                        THE GAME                         /////////////////////////////////////////////////////////////////////////////////////////////         */

function action(e) {

    
    setDerp(prev => (prev +1))
    var check = false 
    var targetSquare = useSquares[e.target.id]
    
    if (selectedSquare.selected)
    {  
        // if the same unselect
        if(selectedSquare.id === targetSquare.id ){
 
                            squares[selectedSquare.id].selected=false
                            selectedSquare.selected = false

        }


        if (canCastle(targetSquare.x,targetSquare.y)){

                    selectedSquare.selected = false
                    gameTurn++

                    check = isCheck(squares,currentPlayer)

                    
                    changePlayer()
 
        }
        for (let i=0 ; i<available_moves.length; i ++)
        {
            let id = available_moves[i][0] + available_moves[i][1]*8

  
            if (id ===  targetSquare.id){


                var suicide = kingsProtection(squares,selectedSquare.x,selectedSquare.y,targetSquare.x,targetSquare.y)

               if (!suicide){
                    gameTurn++

                    if(selectedSquare.piece === "pawn" && (targetSquare.y===0 || targetSquare.y=== 7))
                    {
                        setPromoteMenu([true,targetSquare.id])


                    }
                    else {
                    setPiece(squares,targetSquare.id,selectedSquare.piece,selectedSquare.pieceColor)
                    }
                    resetSquare(squares,selectedSquare.id)
                    selectedSquare.selected = false
                    setMoveList((prev)=>[...prev,{"piece":selectedSquare.piece,
                                                    "pieceColor":selectedSquare.pieceColor,
                                                    "targetId":targetSquare.id,
                                                    "currentX":selectedSquare.x,
                                                    "currentY":selectedSquare.y }])
                    
   

                    check = isCheck(squares,currentPlayer)

                    changePlayer()
                    if (check){
                        if (isCheckmate()) {
                            changePlayer()
                            setWinner({winner:currentPlayer,reason:"checkmate"})
                                gameTurn = 0
                                selectedSquare.selected = false
                                setStartMenu(false)

 
                        }
                    }

               }
               break;
                
            }     
        }   
}
    else {

  

   
        if ( targetSquare.pieceColor === currentPlayer)
        {

        selectSquare(targetSquare.id,targetSquare.x,targetSquare.y,targetSquare.piece,targetSquare.pieceColor,targetSquare.lastMoveTurn)
        available_moves = available_squares(selectedSquare.x,selectedSquare.y,selectedSquare.piece,selectedSquare.pieceColor)
        }
 
    }

} 


function filterCells(cells){
    let finalCells = []
        for (let i =0 ; i<cells.length; i++)
        {        if (cells[i][1]>=0 && cells[i][1]<8){
            if (cells[i][0]>=0 && cells[i][0]<8)
            {
                finalCells.push(cells[i])
            }
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
    var cells = [[x+2, y+1], [x+2, y-1], [x-2, y+1], [x-2, y-1],
             [x+1, y+2], [x+1, y-2], [x-1, y+2], [x-1, y-2]]
    var finalCells = filterCells(cells)
    var paths = finalCells.map((cell)=>[cell])

   return paths
}


function move_pawn(x,y){
    var cells = []
    if (selectedSquare.pieceColor === "black"){
        if ( squares[selectedSquare.x + 8*(selectedSquare.y+1)].piece ===""){
            cells.push([x,y+1])
  
            if ( squares[selectedSquare.x + 8*(selectedSquare.y+2)].piece ==="" && selectedSquare.moveTurn==0){

                cells.push([x,y+2])
        }
     }
        if ( selectedSquare.x+1 <8  && squares[selectedSquare.x+1 + 8*(selectedSquare.y+1)].pieceColor ==="white" ){
            cells.push([x+1,y+1])


        }
        if (selectedSquare.x-1 >=0 && squares[selectedSquare.x-1 + 8*(selectedSquare.y+1)].pieceColor ==="white"){
            cells.push([x-1,y+1])


      }
    }
    else {
          if ( squares[selectedSquare.x + 8*(selectedSquare.y-1)].piece ===""){


            cells.push([x,y-1])
            if ( squares[selectedSquare.x + 8*(selectedSquare.y-2)].piece ==="" && selectedSquare.moveTurn==0){

                cells.push([x,y-2])
                    }
                     }
        if ( selectedSquare.x+1 <8  && squares[selectedSquare.x+1 + 8*(selectedSquare.y-1)].pieceColor ==="black"){

            cells.push([x+1,y-1])

        }
        if (selectedSquare.x-1 >=0 && squares[selectedSquare.x-1 + 8*(selectedSquare.y-1)].pieceColor ==="black" ){

            cells.push([x-1,y-1])

        }
    }

return cells

}

function king_move (x,y){

    let cells = [[x-1, y], [x-1, y+1], [x, y+1], [x+1, y+1],
             [x+1, y], [x+1, y-1], [x, y-1], [x-1, y-1]]
    var finalCells = filterCells(cells)         
    var paths = finalCells.map((cell)=>[cell] )  

    return paths


}


















function available_squares(x, y , piece, pieceColor) {

    var availableSquares = []
    var availableMoves = []
    if (piece === "knight")
    {
       availableSquares = move_knight_cells(x,y)

    }
    else if (piece === "bishop")
    {  
        availableSquares = move_diagonaly_cells(x,y)
    }
    else if (piece === "rook")
    {
        availableSquares = move_straight_cells(x,y)
    }
    else if (piece === "queen")
    {
        availableSquares =move_diagonaly_cells(x,y)
        availableSquares = availableSquares.concat(move_straight_cells(x,y))
    }
    else if (piece === "pawn"){
        availableMoves = move_pawn(x,y)
        return availableMoves
    }
    else if  (piece === "king"){
        availableSquares = king_move(x,y)

    }

  


 /* for each path */      
    for ( let i=0 ; i<availableSquares.length ; i++){
        /*for each square */
        for ( let j = 0 ; j<availableSquares[i].length; j++){

                let id = 8*availableSquares[i][j][1] + availableSquares[i][j][0] 

                if (squares[id].piece === ""){

                    availableMoves.push(availableSquares[i][j])
                }    
                else{
                    if(selectedSquare.pieceColor !== squares[id].pieceColor){
                        availableMoves.push(availableSquares[i][j])

                    }

                    break 
                }   
            }
        }

 


            
//     //     })
//     // });



return availableMoves
}













useEffect ( ()=>{
    setUseSquares(squares)
},[selectedSquare.selected])






var promoteElements = promotePieces.map((piece)=>{
    return(<div className={`square ${currentPlayer}--${piece} promote`} onClick = {promoteHandler} id = {piece}></div>)
})



/* transforms the squares to JSX*/
const squareElements =useSquares.map((square)=>{ 
    if (square.piece){
    var pieceClass = `${square.pieceColor}--${square.piece}`
    }
    return(     
                  
                <div className = {`square ${square.selected ? "red": square.color} ${pieceClass}`}  id={square.id} onClick = {action}> 
                    {square.id}
                </div>
  
                
                )

})



const moveListElements = moveList.map(move=>{
    let x = move.targetId%8
    let y  = Math.floor(move.targetId/8)
    let squareLetters= ["a","b","c","d","e","f","g","e"]
    
    return (<div><p className = { move.pieceColor==="white" ? "white--move" : "black--move"}>{`${move.piece} ${squareLetters[x]}${y}`}</p></div>)
})


function resetHandler(e){
    console.log(e.target.id)
    gameTurn = 0
    // for (let i=0; i<64 ;i ++){
    //     resetSquare(squares,i)
    //     // squares[i].moveTurn=0
    // }

    

    selectedSquare.selected = false
    // setMoveList([])
    setStartMenu(false)


    if (e.target.id ==="draw"){
        setWinner({winner:'',reason:"draw"})

                console.log(winner)
    }
    else if (e.target.id ==="surrender"){
        console.log("what")
        changePlayer()
        setWinner({winner:currentPlayer,reason:"resign"})

        console.log(winner)
    }
        currentPlayer = "white"
        setDerp(prev => (prev +1))

}

// console.log(moveListElements)







return(
    <div className = {`container`}>
        <div className={`menus overlay ${ startMenu ? "hidden": ""}`}>
            <div onClick = {startMenuToggle} className = {`start`}><p>{`start`}</p>
                        
            <h5> <span style = {{color:winner.winner}}>{`${winner.winner}`} <br></br> </span>{` ${winner.winner ? "won" : ""}`} </h5>
            <p className="">{` ${winner.winner ? `by  ${winner.reason}` : ""}`}</p>
            
            
            
            </div></div>   
         <div className={`menus overlay ${ promoteMenu[0] ? "": "hidden"}`} >
            <div className={`promote}`}> 
                {promoteElements} 
            </div>
   
        </div>

        <div className = "board--container">
            {squareElements}
        </div>
        <div className="movelist--container">
            <div onClick = {resetHandler} className = "btn" id = "surrender"> surrender</div>
            <div onClick = {resetHandler} className = "btn" id = "draw"> draw</div>
            {moveListElements}
        </div>
    </div>)
}