import { Ship, GameBoard, Player } from "./Battleship";

window.onload = function () {
	const GamePlay = document.querySelectorAll(".GamePlayer");
	const player1 = new Player(true); // Player real
	const player2 = new Player(false); // Player computador

	player1.SetGame();

	player1.sea.forEach((cell) => {
		const cellElement = document.createElement("Button");
		cellElement.className = "cell";
		GamePlay.appendChild(cellElement);
	});

	player2.SetGame();

	player1.ShipPosition();
	player2.ShipPosition();
};
