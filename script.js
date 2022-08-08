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

	// Global variables
	let body = document.querySelector("body");
	let restartButton = document.getElementById("restart");
	let firstPlayer = document.getElementById("firstplayer");
	let secondPlayer = document.getElementById("secondplayer");
	let firstPlayerActive = false;
	let secondPlayerActive = false;
	let xWinnerName = "player1";
	let oWinnerName = "player2";
	let random = document.querySelector(".selectUser");

	// The game board array
	let gameBoard = ["", "", "", "", "", "", "", "", ""];

	// assigning the objects to variables from the object
	const play1 = players.player1;
	const play2 = players.player2;
	let storePlayer1 = "player1";
	let storePlayer2 = "player2";
	let storePlayer1Switch = false;
	let storePlayer2Switch = false;
	// Audio for click
	const audio = new Audio();
	const audio2 = new Audio();
	const humanWon = new Audio();
	const botWon = new Audio();
	audio.src = "sound/click3.wav";
	audio2.src = "sound/click2.wav";
	humanWon.src = "sound/Bot-won.wav";
	botWon.src = "sound/Bot-won.wav";

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
	];
	// Check for win or tie
	function outcome() {
		let roundwon = false;
		let symbolWon;
		for (let i = 0; i <= 7; i++) {
			const win = winPossiblity[i];
			const a = gameBoard[win[0]];
			const b = gameBoard[win[1]];
			const c = gameBoard[win[2]];
			if (a === "" || b === "" || c === "") {
				continue;
			}
			if (a === b && b === c) {
				symbolWon = b;
				roundwon = true;
				break;
			}
		}

		if (roundwon) {
			resultAction("win", symbolWon);
		}
		if (!gameBoard.includes("") && roundwon === false) {
			resultAction("Tie");
		}
	}
	function resultAction(result, symbol) {
		if (result === "win" && symbol === "x") {
			winner(xWinnerName);
			humanWon.play();
		}
		if (result === "win" && symbol === "o") {
			winner(oWinnerName);
			botWon.play();
		}
		if (result === "Tie" && result !== "win") {
			tie();
		}
	}
	function updateBoard(indx) {
		gameBoard[indx] = currentplayer();
	}
	// The winner popup div
	function winner(name) {
		const popup = document.querySelector(".popup");
		popup.style.display = "flex";
		const colorwin = (document.querySelector(".colorwin").innerHTML = name);
	}
	// A popup for Tie
	function tie() {
		const tie = document.querySelector(".tie");
		tie.style.display = "flex";
	}
	function currentplayer() {
		let recentplayer;
		if (play1.turn === false) {
			recentplayer = "x";
		} else {
			recentplayer = "o";
		}
		return recentplayer;
	}
	// restart
	function restart() {
		const gameboardDivsCleared = document.querySelectorAll(".gameboardDivs");
		gameboardDivsCleared.forEach((gameboardclear) => {
			gameboardclear.classList.remove("xclass") ||
				gameboardclear.classList.remove("oclass");
			gameboardclear.innerHTML = "";
			gameBoard = ["", "", "", "", "", "", "", "", ""];
		});
	}
	// Get the the gameboard div and populate it.
	function populate() {
		const gameboardDivs = document.querySelectorAll(".gameboardDivs");
		gameboardDivs.forEach((gameboard) => {
			gameboard.addEventListener("click", (e) => {
				if (play1.turn === true && e.target.innerHTML === "") {
					gameboard.innerHTML = play1.symbol;
					gameboard.classList.add("xclass");
					play1.turn = false;
					play2.turn = true;
					updateBoard(e.target.id);
					outcome();
					audio.play();
				}
				if (play2.turn === true && e.target.innerHTML === "") {
					gameboard.innerHTML = play2.symbol;
					gameboard.classList.add("oclass");
					play1.turn = true;
					play2.turn = false;
					updateBoard(e.target.id);
					outcome();
					audio2.play();
				}
			});
		});
	}
	// Remove the text of the players for the input form to pop up
	function removePlayers() {
		const selectUser = document.querySelector(".selectUser");
		selectUser.innerHTML = "";
	}
	function nameform() {
		const selectUser = document.querySelector(".selectUser");
		selectUser.innerHTML = `<form class="form" id="toSubmit">
									<input type="text" id="name" class="form__input" autocomplete="off" placeholder="Name">
								</form>`;
	}
	// To fix when I come back to make an Ai
	function firstPlayerClicked(intial = storePlayer1) {
		if (storePlayer1Switch) {
			const firstselection = document.createElement("h1");
			// const secondSelection = document.createElement("h1");
			const div1 = document.createElement("div");
			// const div2 = document.createElement("div");
			div1.classList.add("selectUser");
			// div2.classList.add("innerdiv");
			firstselection.classList.add("selecttext");
			firstselection.classList.add("firstselect");
			firstselection.id = "firstplayer";
			// secondSelection.id = "Ai";
			// secondSelection.classList.add("selecttext");
			firstselection.innerText = intial;
			// secondSelection.innerText = "Ai";
			div1.appendChild(firstselection);
			// div1.appendChild(secondSelection);
			body.appendChild(div1);
			storePlayer1Switch = false;
			firstPlayerActive = true;
		}
	}
	// To fix when I come back to make an Ai
	function secondPlayerClicked(intial = storePlayer2) {
		if (storePlayer2Switch) {
			const firstselection = document.createElement("h1");
			// const secondSelection = document.createElement("h1");
			const div1 = document.createElement("div");
			// const div2 = document.createElement("div");
			div1.classList.add("selectUser");
			// div2.classList.add("innerdiv");
			firstselection.classList.add("selecttext");
			firstselection.classList.add("secondselect");
			firstselection.id = "secondplayer";
			// secondSelection.id = "Ai";
			// secondSelection.classList.add("selecttext");
			firstselection.innerText = intial;
			// secondSelection.innerText = "Ai";
			div1.appendChild(firstselection);
			// div1.appendChild(secondSelection);
			body.appendChild(div1);
			storePlayer2Switch = false;
			secondPlayerActive = true;
		}
	}
	function turnStoreSwitchForPlayer1() {
		storePlayer1Switch = true;
		firstPlayerClicked();
	}
	function turnStoreSwitchForPlayer2() {
		storePlayer2Switch = true;
		secondPlayerClicked();
	}
	// button to submit name being saved
	function createButton() {
		const button = document.createElement("button");
		button.classList.add("saveName");
		button.innerText = "save";
		const form = document.getElementById("toSubmit");

		form.appendChild(button);
	}
	function nameFromForm(e) {
		let pname = "";
		const form = document.getElementById("name");
		e.preventDefault();
		pname = form.value;
		if (pname.length > 5 && firstPlayerActive) {
			xWinnerName = pname;
			firstPlayer.innnerText = ``;
			firstPlayer.innerText = `${xWinnerName.substring(0, 5)}...`;
			firstPlayerActive = false;
		}
		if (pname.length <= 5 && firstPlayerActive) {
			xWinnerName = pname;
			firstPlayer.innnerText = ``;
			firstPlayer.innerText = xWinnerName;
			firstPlayerActive = false;
		}

		if (pname.length > 5 && secondPlayerActive) {
			oWinnerName = pname;
			secondPlayer.innnerText = ``;
			secondPlayer.innerText = `${oWinnerName.substring(0, 5)}...`;
			secondPlayerActive = false;
		}
		if (pname.length <= 5 && secondPlayerActive) {
			oWinnerName = pname;
			secondPlayer.innnerText = ``;
			secondPlayer.innerText = oWinnerName;
			secondPlayerActive = false;
		}
	}
	// if the character of the name is longer that this put a particular set of character and return ...
	function removeSelectUser() {
		const selectUser = document.querySelector(".selectUser");
		selectUser.remove();
	}
	// a function to check the character length of the player

	// Event listeners for buttons
	restartButton.addEventListener("click", restart);
	firstPlayer.addEventListener("click", turnStoreSwitchForPlayer1);
	secondPlayer.addEventListener("click", turnStoreSwitchForPlayer2);
	// The Eventlisener to toggle win/tie and play game again
	body.addEventListener("click", function (e) {
		if (e.target.classList.contains("popup")) {
			const popup = document.querySelector(".popup");
			popup.style.display = "none";
			restart();
		}
		if (e.target.classList.contains("tie")) {
			const tie = document.querySelector(".tie");
			tie.style.display = "none";
			restart();
		}
		if (e.target.classList.contains("selectUser")) {
			removeSelectUser();
		}
		if (e.target.classList.contains("firstselect")) {
			removePlayers();
			nameform();
		}
		if (e.target.classList.contains("secondselect")) {
			removePlayers();
			nameform();
		}
		if (e.target.classList.contains("form__input")) {
			createButton();
		}
		if (e.target.classList.contains("saveName")) {
			nameFromForm(e);
			removeSelectUser();
		}
	});

	return { populate, nameFromForm };
};
const game = gameObject();
game.populate();
