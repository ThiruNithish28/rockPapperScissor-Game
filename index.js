// STRATEGY FOR JAVASCRIPT 
// 1. Think about what steps we need
// 2. Convert those steps into code 

/*STEPS:
  when we click the btn 
  1. Computer randomly selects a move 
  2. Compare the moves to get the result
  3. Display the result in popup
*/  

 const rockEmoji = String.fromCodePoint(0x270A); 
    const paperEmoji = String.fromCodePoint(0x1F590); 
    const scissorEmoji = String.fromCodePoint(0x270C);
      
    // const score ={
    //     wins : 0,
    //     losses : 0,
    //     ties : 0
    // }
    // to retrive the store value we use localStorage.getItem("name")
//   "" let score = JSON.parse(localStorage.getItem('score')); "
    // we know that JSON Object is in string we want to convert into Object by using JSON we do it , ie; JSON.parse() which is to convert JSON Object to JS Object 
   // when we acess score it returns error becase after reset the value in score is NULL , to overcome or fix the error we set defalut value if it is NULL
      // if(!score){
      //     score={
      //         wins:0,
      //         losses:0,
      //         ties:0
      //     };
      // }
         // instead of doing above when can short it by using default operator in above code "let score = JSON.parse(localStorage.getItem('score'));" (FALSE || defalut value ) whenever after reset the code it be null so it falsy value when the left value is false is goes moves on right in below code 
      let score = JSON.parse(localStorage.getItem('score')) || {
          wins: 0,
          losses: 0,
          ties: 0
      };

      updateScoreElement();    // to display the initial score in the HTML page

    function resetScore(){
        if(true){
            score.wins = 0;
            score.losses = 0;
            score.ties = 0
            console.log("reset");
            // if add the local stroage to the const score then whenever click the reset button  it will cant reset without remove from the localStorage so we use removeItem()
            localStorage.removeItem('Score');
            // after remove the data in localStorage object it set as NULL (ie; When Something Doesn't Exist In LocalStorage => NULL) now at the bottom code will acess the score which value is null so it gives an error 
            // to overcome or fix the error we set defalut value if it is NULL
           
        //      alert(`Your score is reset sucessfully ! 
        // Wins: ${score.wins} losess: ${score.losses} Tie: ${score.ties}`);
            
            // to display score in html page 
             updateScoreElement();
            
        }
    }

    function playGame(playerMove){
        const computerMove = pickComputerMove();
        let result =' ';
        let playerMoveEmoji = '';
        if(playerMove === 'rock'){
            if(computerMove === `rock ${rockEmoji}`){
                result = 'Tie... ';
            }else if(computerMove === `paper ${paperEmoji}`){
                result ='You Lose...';
            }else if(computerMove === `scissors ${scissorEmoji}`){
                result = 'WOW! You Win...';
            }
            playerMoveEmoji = rockEmoji;
        }
        else if(playerMove ==='paper'){
          
            if(computerMove === `rock ${rockEmoji}`){
                result = 'WOW! You Win...';
            }else if(computerMove === `paper ${paperEmoji}`){
                result = 'Tie... ';
            }else if(computerMove === `scissors ${scissorEmoji}`){
                result ='You Lose...'; 
            }
            playerMoveEmoji = paperEmoji;
            
        }
        else if(playerMove === 'scissors'){
            if(computerMove === `rock ${rockEmoji}`){
                result ='You Lose...'; 
            }else if(computerMove === `paper ${paperEmoji}`){
                result = 'WOW! You Win...';
            }else if(computerMove === `scissors ${scissorEmoji}`){
                result = 'Tie... ';
            }
            playerMoveEmoji = scissorEmoji;     
        }
        
   //       update score 
     
        if(result === 'WOW! You Win...'){
            score.wins++;
        }else if(result === 'You Lose...'){
            score.losses++;
        }else if(result ==='Tie... '){
            score.ties++;   
        }
        // when we refresh the page the score will be starts from zero for the responsive we use " localStoage " in-build function in which add/store value in local storage we use "localStorage.setItem("name","store vale ")".
        localStorage.setItem("score" ,JSON.stringify(score));
        // note where the store value using localStorage should be in  string so we use "JSON to convert (JSON.stringify())"
        
//         alert(`You picked ${playerMove} ${playerMoveEmoji}. coumputer picked ${computerMove}. 
//         ${result}
// Wins: ${score.wins} losess: ${score.losses} Tie: ${score.ties}`);
        
        updateScoreElement();
        displayMoves(playerMove,computerMove, playerMoveEmoji);
        displayResults(result)
    }
    
// function for computer move
    function pickComputerMove (){
          const randomNumber = Math.random();
          let computerMove ='';
          if(randomNumber >= 0 && randomNumber <1/3){
             computerMove =`rock ${rockEmoji}`;
          }else if(randomNumber >=1/3 && randomNumber < 2/3){
             computerMove = `paper ${paperEmoji}`;
          }else{
             computerMove = `scissors ${scissorEmoji}`;
          }
          return computerMove;
    }

// function to display the score
    function updateScoreElement(){
        document.body.querySelector('.score-js')
            .innerHTML = `Wins: ${score.wins} losess: ${score.losses} Tie: ${score.ties}`
    }

// function to display the moves 
    function displayMoves(playerMove,computerMove,playerMoveEmoji){
        document.body.querySelector('.moves-js')
            .innerHTML = `You picked ${playerMove} ${playerMoveEmoji}. coumputer picked ${computerMove}.`;
    }

    function displayResults(result){
        document.body.querySelector('.result-js')
            .innerHTML = `${result}`;
    }
