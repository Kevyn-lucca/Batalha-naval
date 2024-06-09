import { Player } from "./Battleship.js";

window.onload = function () {
	const GamePlay = document.querySelector(".GamePlayer");
	const GamePlay2 = document.querySelector(".GamePlayer2");
	const player1 = new Player(true); // Jogador real
	const player2 = new Player(false); // Jogador computador

	player1.SetGame();
	player1.sea.forEach((sea, index) => {
		// Adicionando manipulador de eventos aos botões do jogador 1
		const seaElement = document.createElement("button");
		seaElement.className = "sea";
		seaElement.textContent = " ";
		seaElement.addEventListener("click", () => {
			player1.ShipPosition(index); // Chama ShipPosition com o índice do botão clicado
			seaElement.disabled = true; // Desativa o botão após o clique
		});
		GamePlay.appendChild(seaElement);
	});

	player2.SetGame();
	player2.ShipPosition(); // Posiciona automaticamente os navios do jogador 2

	player2.sea.forEach((sea, index) => {
		// Adicionando manipulador de eventos aos botões do jogador 2
		const seaElement = document.createElement("button");
		seaElement.className = "sea";
		seaElement.textContent = " ";
		seaElement.addEventListener("click", () => {
			player2.ShipPosition(index);
			seaElement.disabled = true;
		});
		GamePlay2.appendChild(seaElement);
	});
};
