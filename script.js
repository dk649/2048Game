window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result') // can use getElementById can also be used here 
    const width = 4;
    let squares = [];
    let score = 0;


    // create a playing board 

        function createBoard() {

            for(let i=0; i< width*width; i++){
                square = document.createElement('div')
                square.innerHTML = 0 
                gridDisplay.appendChild(square)
                squares.push(square)
            }

            generate();
            generate();
        }

        createBoard();

        // generate a number randomly 

        function generate(){
            let randomNumber = Math.floor(Math.random() * squares.length) // math.random gives you a number between 0 and less then 1 which is * by 16 and rounded down by math.floor
            if(squares[randomNumber].innerHTML == 0){
                squares[randomNumber].innerHTML = 2
                squares[randomNumber].classList.add('box')
                    checkForGameOver() // check to see if the game is over 
            }else generate(); // here it runs again if there is a 2 in the square 
        }

        //swipe right

        function moveRight() {
            for(let i = 0; i < width*width; i++) {
                    if(i % 4 === 0){   // % is modulus remainder if remainder = 0 
                        let totalOne = squares[i].innerHTML //To get the HTML markup contained within an element
                        let totalTwo = squares[i+1].innerHTML
                        let totalThree = squares[i+2].innerHTML
                        let totalFour = squares[i+3].innerHTML
                        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                        //console.log(row);

                        let filterRow = row.filter(num => num)
                        console.log(filterRow)

                        let missing = 4 - filterRow.length;
                        let zeros = new Array(missing).fill(0) // just another way to create an array. you can leave out the new keyword
                       // console.log(zeros);

                        let newRow = zeros.concat(filterRow)
                        //console.log(newRow)

                        squares[i].innerHTML = newRow[0]
                        squares[i+1].innerHTML = newRow[1]
                        squares[i+2].innerHTML = newRow[2]
                        squares[i+3].innerHTML = newRow[3]

                    }// end of for loop 

            }
        }

        //moveRight();


        //swipe left

        function moveLeft() {

            for(let i=0; i < width*width; i++){
                if (i % 4 === 0){

                    let totalOne = squares[i].innerHTML //To get the HTML markup contained within an element
                    let totalTwo = squares[i+1].innerHTML
                    let totalThree = squares[i+2].innerHTML
                    let totalFour = squares[i+3].innerHTML
                    let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                    let filteredRow = row.filter(num => num)
                    let missing = 4 - filteredRow.length
                    let zeros = Array(missing).fill(0)
                    let newRow = filteredRow.concat(zeros)


                    squares[i].innerHTML = newRow[0]
                    squares[i+1].innerHTML = newRow[1]
                    squares[i+2].innerHTML = newRow[2]
                    squares[i+3].innerHTML = newRow[3]
                

                }



            }// end of for loop
        }

        //moveLeft();


        //swipe Down

        function moveDown(){

            for(i =0; i< 4; i++){

                let totalOne = squares[i+1].innerHTML
                let totalTwo = squares[i+width].innerHTML
                let totalThree = squares[i+(width*2)].innerHTML
                let totalFour = squares[i+(width*3)].innerHTML
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredColumn = column.filter(num => num)
                let missing = 4 - filteredColumn.length
                let zeros = Array(missing).fill(0)
                let newColumn = zeros.concat(filteredColumn)

                squares[i].innerHTML = newColumn[0]
                squares[i+width].innerHTML = newColumn[1]
                squares[i+(width*2)].innerHTML = newColumn[2]
                squares[i+(width*3)].innerHTML = newColumn[3]



            }
        }




         //swipe up

         function moveUp(){

            for(i =0; i< 4; i++){

                let totalOne = squares[i+1].innerHTML
                let totalTwo = squares[i+width].innerHTML
                let totalThree = squares[i+(width*2)].innerHTML
                let totalFour = squares[i+(width*3)].innerHTML
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredColumn = column.filter(num => num)
                let missing = 4 - filteredColumn.length
                let zeros = Array(missing).fill(0)
                let newColumn = filteredColumn.concat(zeros)

                squares[i].innerHTML = newColumn[0]
                squares[i+width].innerHTML = newColumn[1]
                squares[i+(width*2)].innerHTML = newColumn[2]
                squares[i+(width*3)].innerHTML = newColumn[3]



            }
        }

        function combineRow(){
            for(let i=0; i< 15; i++){
                    if(squares[i].innerHTML === squares[i+1].innerHTML){

                        let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                        squares[i].innerHTML = combineTotal
                        squares[i+1].innerHTML = 0
                       // score += combineTotal
                       // scoreDisplay.innerHTML = score
                    }


            }

            //checkForWin()
        }

        function combineColumn(){
            for(let i=0; i< 12; i++){
                    if(squares[i].innerHTML === squares[i+width].innerHTML){

                        let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                        squares[i].innerHTML = combineTotal
                        squares[i+width].innerHTML = 0
                        //score += combineTotal
                        //scoreDisplay.innerHTML = score
                    }


            }

            //checkForWin()
        }
    

        // assign keycodes

        function control(e){

            if(e.keyCode === 39){

                keyRight()

            } else if (e.keyCode === 37){
                keyLeft()

            } else if (e.keyCode=== 38){
                KeyUp()
            } else if (e.keyCode === 40){

                keyDown()
            }



        }

        document.addEventListener('keyup', control)


        function keyRight(){
            moveRight()
            combineRow()
            moveRight()
            generate()


        }


        function keyLeft(){

            moveLeft()
            combineRow()
            moveLeft()
            generate()
        }



        function keyDown(){

            moveDown()
            combineColumn()
            moveDown()
            generate()

        }

        function KeyUp(){

            moveUp()
            combineColumn()
            moveUp()
            generate()
        }


        //check for win 2048 in the squares

        function checkForWin(){

            for(i = 0; i < squares.length; i++){

                if(squares[i].innerHTML == 2048) {
                    resultDisplay.innerHTML ='You Win'
                    document.addEventListener('keyup', control)
                }
            }
        }


        function checkForGameOver() {

            let zeros =0;
            for(let i = 0; i < squares.length; i++) {


                if(squares[i].innerHTML == 0){

                    zeros++;
                }
            }

            if(zeros === 0){

                resultDisplay.innerHTML = 'you lose'
                document.addEventListener('keyup', control)
            }

        }
});