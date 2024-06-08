class Ship {
	constructor(length) {
		this.length = length; // Comprimento do navio
		this.sunk = false; // Estado inicial do navio
		this.hit = 0; // Número de acertos recebidos
	}

	// Método para verificar se o navio está afundado
	isSunk() {
		this.hit += 1; // Incrementa o número de acertos
		if (this.hit >= this.length) {
			this.sunk = true; // Se os acertos são maiores ou iguais ao comprimento, o navio está afundado
		}
		return this.sunk;
	}
}

class ShipGameBoard {
	constructor() {
		this.sea = []; // Inicializa o array 'sea'
	}

	// Método para configurar o jogo
	SetGame() {
		this.sea = new Array(100).fill("water"); // Preenche o array 'sea' com 90 elementos "water"
	}

	// Método para colocar o navio
	PutShip() {
		// Modificar essa função para ela adicionar diversos barcos
		// so escolher posição, hardcode vida do navio
		// Adiciona um novo navio ao array 'sea'
		const ships = [
			{ size: 6, position: 0 },
			{ size: 4, position: 11 },
			{ size: 4, position: 22 },
			{ size: 3, position: 33 },
			{ size: 3, position: 44 },
			{ size: 3, position: 55 },
			{ size: 2, position: 66 },
			{ size: 2, position: 77 },
			{ size: 2, position: 88 },
		]; // Vidas e posições dos navios

		ships.forEach((ship) => {
			this.sea[ship.position] = new Ship(ship.size);
		});
	}

	GotAttacked(attack) {
		let target = this.sea[attack];
		// Checa se um navio ou nada está naquele local
		if (target instanceof Ship) {
			target.isSunk();
			if (target.sunk == true) {
				this.sea[attack] = "Sunken Ship"; // Se tiver um navio, substitui aquele espaço por um navio afundado, quando o hp do navio chegar a zero
			}
		} else {
			this.sea[attack] = "cannonball"; // Se não tiver, substitui aquele espaço no array por uma bola de canhão
		}
	}

	GameEnd() {
		if (this.sea instanceof Ship) {
			//O jogo continua
		} else {
			return "Game over";
		}
	}
}

export { Ship, ShipGameBoard };
