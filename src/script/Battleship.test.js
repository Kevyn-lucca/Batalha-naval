import { Ship, GameBoard, Player } from "./Battleship";

describe("Ship", () => {
	test("should create a ship with given length", () => {
		const ship = new Ship();
		expect(ship.size).toBe(undefined);
		expect(ship.sunk).toBe(false);
	});

	test("should return true if the ship is sunk", () => {
		const ship = new Ship();
		ship.isSunk();
		expect(ship.isSunk()).toBe(true);
	});
});

describe("GameBoard", () => {
	let game;

	beforeEach(() => {
		game = new GameBoard();
		game.SetGame();
	});

	test('should initialize sea with 100 "water" elements', () => {
		expect(game.sea.length).toBe(100);
		expect(game.sea.every((space) => space === "water")).toBe(true);
	});

	test("should put ships on the board", () => {
		const ship = new Ship();
		game.PutShip(ship, 0);
		expect(game.sea.filter((space) => space instanceof Ship).length).toBe(1);
	});

	test('should mark "Sunken Ship" if the ship is sunk after attack', () => {
		const ship = new Ship();
		game.PutShip(ship, 0);
		game.GotAttacked(0); // Hit the ship
		expect(game.sea[0]).toBe("Sunken Ship");
	});

	test('should mark "cannonball" if the attack hits nothing', () => {
		game.GotAttacked(5); // Example attack
		expect(game.sea[5]).toBe("cannonball");
	});

	test('should return "Game over" if all ships are sunk', () => {
		const ship = new Ship();
		game.PutShip(ship, 0);
		game.GotAttacked(0); // Hit the ship
		expect(game.GameEnd()).toBe("Game over");
	});
});

describe("Player", () => {
	let player;

	beforeEach(() => {
		player = new Player(true);
	});

	test("should control ship position for human player", () => {
		player.ControlShipPosition();
		expect(player.sea.filter((space) => space instanceof Ship).length).toBe(9);
	});
});
