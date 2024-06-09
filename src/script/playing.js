import { Player } from "./Battleship.js";

window.onload = function () {
	const GamePlay = document.querySelector(".GamePlayer");
	const GamePlay2 = document.querySelector(".GamePlayer2");
	const player1 = new Player(true); // Player real
	const player2 = new Player(false); // Player computador

	player1.SetGame();

	player1.sea.forEach((sea) => {
		const seaElement = document.createElement("Button");
		seaElement.className = "sea";
		GamePlay.appendChild(seaElement);
	});

	player2.SetGame();
	player2.sea.forEach((sea) => {
		const seaElement = document.createElement("Button");
		seaElement.className = "sea";
		GamePlay2.appendChild(seaElement);
	});

	player1.ShipPosition();
	player2.ShipPosition();
};
