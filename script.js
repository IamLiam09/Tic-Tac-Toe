var active = true;
function gameObject() {
	boardArr = ["", "", "", "", "", "", "", "", ""];
}
const players = {
	player1: {
		name: "player1",
		symbol: "x",
	},
	player2: {
		name: "player2",
		symbol: "o",
	},
};
const player1Symbol = ({ player1 }) => {
	return player1.symbol;
};
const player2Symbol = ({ player2 }) => {
	return player2.symbol;
};
function display(div) {
	// var active = false;
	if (active === 1) {
		div.innerHTML = player1Symbol(players);
	} else {
		div.innerHTML = player2Symbol(players);
	}
}
const gameboardDivs = document.querySelectorAll(".gameboardDivs");
gameboardDivs.forEach((gameboarddiv, i) => {
	gameboarddiv.addEventListener("click", function populate() {
		if(active === true) {
			gameboarddiv.innerHTML = player1Symbol(players);
			active = false
		}else{
			gameboarddiv.innerHTML = player2Symbol(players);
			active = true
		}
	});
});
