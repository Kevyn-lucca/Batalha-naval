class Ship {
	constructor(size) {
		this.size = size;
		this.hits = 0;
		this.sunk = false;
	}

	isSunk() {
		return this.sunk;
	}

	hit() {
		this.hits += 1;
		if (this.hits >= this.size) {
			this.sunk = true;
		}
	}
}

class GameBoard {
	constructor() {
		this.sea = [];
		this.ships = [];
	}

	SetGame() {
		this.sea = new Array(100).fill("water");
		this.ships = [];
	}

	isPositionValid(size, position) {
		for (let i = 0; i < size; i++) {
			if (this.sea[position + i] !== "water") {
				return false;
			}
		}
		return true;
	}

	addShip(ship, position) {
		if (this.isPositionValid(ship.size, position)) {
			this.PutShip(ship, position);
			this.ships.push(ship);
			return true;
		}
	}

	PutShip(ship, position) {
		for (let i = 0; i < ship.size; i++) {
			this.sea[position + i] = ship;
		}
	}

	GotAttacked(attack) {
		const target = this.sea[attack];
		if (target instanceof Ship) {
			target.hit();
			if (target.isSunk()) {
				for (let i = 0; i < target.size; i++) {
					this.sea[attack - target.size + 1 + i] = "Sunken Ship";
				}
			}
			return "hit";
		} else {
			this.sea[attack] = "cannonball";
			return "miss";
		}
	}

	GameEnd() {
		const allCellsValid = this.sea.every(
			(cell) =>
				cell === "water" || cell === "Sunken Ship" || cell === "cannonball"
		);

		if (allCellsValid) {
			return "Game over";
		} else {
			return "Game still in progress";
		}
	}
}

class Player extends GameBoard {
	constructor(real, boardId) {
		super();
		this.real = real;
		this.boardElement = document.getElementById(boardId);
		this.shipIndex = 0;
	}

	ShipPosition() {
		if (this.real === true) {
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

			const handleCellClick = (event) => {
				const cell = event.target;
				const position = parseInt(cell.dataset.index);

				if (this.shipIndex < ships.length) {
					try {
						this.addShip(ships[this.shipIndex], position);
						this.markShipOnBoard(ships[this.shipIndex].size, position);
						this.shipIndex++;

						if (this.shipIndex >= ships.length) {
							this.boardElement.removeEventListener("click", handleCellClick);
							this.boardElement.removeEventListener(
								"mouseover",
								handleMouseOver
							);
							this.boardElement.removeEventListener("mouseout", handleMouseOut);
							const machine = new MachinePlayer("machine-board");
							machine.SetGame();
							machine.autoPlaceShips();
							alert("All ships placed! Game started.");
							this.startGame(machine);
						}
					} catch (error) {
						alert(error.message);
					}
				}
			};

			const handleMouseOver = (event) => {
				const cell = event.target;
				const position = parseInt(cell.dataset.index);

				if (
					this.shipIndex < ships.length &&
					this.isPositionValid(ships[this.shipIndex].size, position)
				) {
					this.previewShipOnBoard(ships[this.shipIndex].size, position);
				}
			};

			const handleMouseOut = (event) => {
				this.clearPreview();
			};

			this.boardElement.addEventListener("click", handleCellClick);
			this.boardElement.addEventListener("mouseover", handleMouseOver);
			this.boardElement.addEventListener("mouseout", handleMouseOut);
		}
	}

	markShipOnBoard(size, position) {
		for (let i = 0; i < size; i++) {
			const cell = this.boardElement.querySelector(
				`[data-index="${position + i}"]`
			);
			if (cell) {
				cell.classList.add("ship");
			}
		}
	}

	previewShipOnBoard(size, position) {
		for (let i = 0; i < size; i++) {
			const cell = this.boardElement.querySelector(
				`[data-index="${position + i}"]`
			);
			if (cell && cell.classList.contains("ship") === false) {
				cell.classList.add("preview");
			}
		}
	}

	clearPreview() {
		const cells = this.boardElement.querySelectorAll(".cell.preview");
		cells.forEach((cell) => cell.classList.remove("preview"));
	}

	startGame(machine) {
		this.boardElement.addEventListener("click", (event) => {
			const cell = event.target;
			const position = parseInt(cell.dataset.index);

			const result = machine.GotAttacked(position);
			if (result === "hit") {
				cell.classList.add("hit");
			} else {
				cell.classList.add("miss");
			}

			const machineMove = machine.randomAttack();
			const machineCell = document.getElementById(machineMove.position);

			if (machineCell) {
				if (machineMove.result === "hit") {
					machineCell.classList.add("hit");
				} else {
					machineCell.classList.add("miss");
				}

				if (this.GameEnd() === "Game over") {
					alert("You won!");
				} else if (machine.GameEnd() === "Game over") {
					alert("Machine won!");
				}
			}
		});
	}
}

class MachinePlayer extends GameBoard {
	constructor(boardId, boardMachine) {
		super();
	}

	autoPlaceShips() {
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
			let placed = false;
			while (!placed) {
				const position = Math.floor(Math.random() * 100);
				placed = this.addShip(ship, position);
			}
		});
	}
	randomAttack() {
		let attackPosition;
		do {
			attackPosition = Math.floor(Math.random() * 100);
		} while (
			this.sea[attackPosition] === "cannonball" ||
			this.sea[attackPosition] === "Sunken Ship"
		);
		const result = this.GotAttacked(attackPosition);
		return { position: attackPosition, result };
	}
}

const player = new Player(true, "player-board");
const player2 = new Player(false, "machine-board");
player.SetGame();
player2.SetGame();
createBoard();
createMachineBoard();
player.ShipPosition();
player2.ShipPosition;

function createBoard() {
	const boardElement = document.getElementById("player-board");
	for (let i = 0; i < 100; i++) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		cell.dataset.index = i;
		cell.id = i;
		boardElement.appendChild(cell);
	}
}

function createMachineBoard() {
	const boardMachineElement = document.getElementById("machine-board");
	for (let i = 0; i < 100; i++) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		cell.dataset.index = i;
		cell.id = i;
		boardMachineElement.appendChild(cell);
	}
}
