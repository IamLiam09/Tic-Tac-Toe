const gameObject = () => {
	const players = {
		player1: {
			name: "player1",
			symbol: "x",
			turn: true,
		},
		player2: {
			name: "player2",
			symbol: "o",
			turn: false,
		},
	};

	// The game board array
	const gameBoard = ["", "", "", "", "", "", "", "", ""];
	// assigning the objects to variables from the object
	const play1 = players.player1;
	const play2 = players.player2;
	
	// Audio for click
	const audio = new Audio()
	const audio2 = new Audio()
	audio.src  = "click3.wav"
	audio2.src = "click2.wav"

	// Win possibilities
	const winPossiblity = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[6, 4, 2],
		]
	// Check for win or tie
	function outcome(){
		let roundwon = false
		let symbolWon
		for(let i = 0; i <= 7; i++){
			const win = winPossiblity[i]
			const a = gameBoard[win[0]]
			const b = gameBoard[win[1]]
			const c = gameBoard[win[2]]
			if(a === "" || b === "" || c === "" ){
				continue
			}
			if(a === b && b === c){
				symbolWon = b
				// console.log(b)
				roundwon = true
				break
			}
		}

		if(roundwon){
			resultAction("win", symbolWon)
		}
		if(!gameBoard.includes("")){
			resultAction("Tie")
		}
	}
	function resultAction(result, symbol){
		if(result === "win" && symbol === "x"){
			// console.log(symbol)
			winner("player1")
		}if(result === "win" && symbol === "o"){
			// console.log(symbol)
			winner("player2")
		}if(result === "Tie"){
			console.log("Tie")
		}
	}
	function updateBoard(indx){
		gameBoard[indx] = currentplayer()
		
	}
	function winner (name){
		const body = document.querySelector("body")
		const innerdiv = document.createElement("div")
		innerdiv.classList.add("popup")
		innerdiv.innerHTML = `<p class="winnertext"><span class="colorwin">${name} </span>won</p>`
		body.append(innerdiv)
	}
	function currentplayer (){
		let recentplayer
		if(play1.turn === false){
			recentplayer = "x"
		}else{
			recentplayer = "o"
		}
		return recentplayer
	}
	// Get the the gameboard div and populating it.
	function populate() {
		const gameboardDivs = document.querySelectorAll(".gameboardDivs");
		gameboardDivs.forEach((gameboard, i) => {
			gameboard.addEventListener("click", (e) => {
				if (play1.turn === true && e.target.innerHTML === "") {
					// console.log("working");
					gameboard.innerHTML = play1.symbol;
					gameboard.classList.add("xclass");
					play1.turn = false;
					play2.turn = true;
					updateBoard(e.target.id)
					// play1arry.push(e.target.id)
					outcome()
					audio.play()
				}
				if (play2.turn === true && e.target.innerHTML === "") {
					// console.log("second");
					gameboard.innerHTML = play2.symbol;
					gameboard.classList.add("oclass");
					play1.turn = true;
					play2.turn = false;
					updateBoard(e.target.id)
					// play2arry.push(e.target.id)
					outcome()
					audio2.play()
				}
			});
		});
	}
	return { populate, gameBoard}
};
const game = gameObject()
game.populate()