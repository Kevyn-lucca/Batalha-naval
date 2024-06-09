import { Ship, GameBoard } from "./Battleship";

describe("Ship", () => {
	test("should create a ship with given length", () => {
		const ship = new Ship(3);
		expect(ship.length).toBe(3);
		expect(ship.sunk).toBe(false);
		expect(ship.hit).toBe(0);
	});

	test("should return true if the ship is sunk", () => {
		const ship = new Ship(3);
		ship.isSunk(); // hit = 1
		ship.isSunk(); // hit = 2
		ship.isSunk(); // hit = 3
		expect(ship.isSunk()).toBe(true);
	});
});

describe("ShipGameBoard", () => {
	let game;

	beforeEach(() => {
		game = new ShipGameBoard();
		game.SetGame();
	});

	test('should initialize sea with 100 "water" elements', () => {
		expect(game.sea.length).toBe(100);
		expect(game.sea.every((space) => space === "water")).toBe(true);
	});

	test("should put ships on the board", () => {
		game.PutShip();
		expect(game.sea.filter((space) => space instanceof Ship).length).toBe(9);
	});

	test('should mark "Sunken Ship" if the ship is sunk after attack', () => {
		game.PutShip();
		game.GotAttacked(0); // Hit the ship
		game.GotAttacked(1); // Hit the ship
		game.GotAttacked(2); // Hit the ship
		expect(game.sea[0]).toBe("Sunken Ship");
		expect(game.sea[1]).toBe("Sunken Ship");
		expect(game.sea[2]).toBe("Sunken Ship");
	});

	test('should mark "cannonball" if the attack hits nothing', () => {
		game.GotAttacked(5); // Example attack
		expect(game.sea[5]).toBe("cannonball");
	});
});
