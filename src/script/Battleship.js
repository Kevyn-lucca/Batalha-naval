class Ship {
	constructor() {
		this.sunk = false;
	}

	isSunk() {
		return (this.sunk = true);
	}
}

class GameBoard {
	constructor() {
		this.sea = []; // Inicializa o array 'sea'
	}

	// Método para configurar o jogo
	SetGame() {
		this.sea = new Array(100).fill("water"); // Preenche o array 'sea' com 100 elementos "water"
	}

	// Método para colocar o navio
	PutShip(ship, position) {
		let newShip = new Ship(ship.size);
		for (let i = 0; i < ship.size; i++) {
			this.sea[position + i] = newShip; // Usa a mesma instância do navio para todas as posições
		}
	}

	GotAttacked(attack) {
		let target = this.sea[attack];
		// Checa se um navio ou nada está naquele local
		if (target instanceof Ship) {
			target.isSunk();
			this.sea[attack] = "Sunken Ship";
		} else {
			this.sea[attack] = "cannonball"; // Se não tiver navio, marca com bola de canhão
		}
	}

	GameEnd() {
		const allCellsValid = this.sea.every(
			(cell) =>
				cell === "water" || cell === "Sunken Ship" || cell === "cannonball"
		);
		// Retorna "Game over" se todas as células forem válidas, caso contrário continua o jogo
		if (allCellsValid) {
			return "Game over";
		} else {
		}
	}
}

class Player extends GameBoard {
	constructor(real) {
		super();
		this.real = real;
	}

	ShipPosition() {
		if (this.real == true) {
			//Solicitar ao jogador para clicar e colocar um navio em cada posição
			const ships = [
				{ size: 6 },
				{ size: 4 },
				{ size: 4 },
				{ size: 3 },
				{ size: 3 },
				{ size: 3 },
				{ size: 2 },
				{ size: 2 },
				{ size: 2 },
			];

			ships.forEach((ship) => {
				let position = parseInt();
				//prompt(`Digite a posição inicial para o navio (de 0 a 99):`)
				// passe um valor pelo click do mouse
				this.PutShip(ship, position);
			});
		} else {
			const ships = [
				{ size: 6, position: 2 },
				{ size: 4, position: 12 },
				{ size: 4, position: 22 },
				{ size: 3, position: 32 },
				{ size: 3, position: 42 },
				{ size: 3, position: 52 },
				{ size: 2, position: 62 },
				{ size: 2, position: 72 },
				{ size: 2, position: 82 },
			];

			ships.forEach((ship) => {
				this.PutShip(ship, ship.position);
			});
		}
	}
}
export { Player, GameBoard, Ship };
