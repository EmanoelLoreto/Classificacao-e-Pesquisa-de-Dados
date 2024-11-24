class Game {
	constructor(id, title, developer, price, genres) {
		this.id = id;
		this.title = title;
		this.developer = developer;
		this.price = price;
		this.genres = genres;
	}
}

class BSTNode {
	constructor(game) {
		this.game = game;
		this.left = null;
		this.right = null;
	}
}

class BST {
	constructor() {
		this.root = null;
	}

	insert(game) {
		const newNode = new BSTNode(game);
		
		if (!this.root) {
			this.root = newNode;
			return;
		}

		let current = this.root;
		while (true) {
			if (game.price < current.game.price) {
				if (!current.left) {
					current.left = newNode;
					break;
				}
				current = current.left;
			} else {
				if (!current.right) {
					current.right = newNode;
					break;
				}
				current = current.right;
			}
		}
	}

	findByPrice(price) {
		const result = [];
		
		const traverse = (node) => {
			if (!node) return;
			
			if (node.game.price === price) {
				result.push(node.game);
			}
			
			if (price <= node.game.price) traverse(node.left);
			if (price >= node.game.price) traverse(node.right);
		};

		traverse(this.root);
		return result;
	}

	findByPriceRange(minPrice, maxPrice) {
		const result = [];
		
		const traverse = (node) => {
			if (!node) return;
			
			if (node.game.price >= minPrice && node.game.price <= maxPrice) {
				result.push(node.game);
			}
			
			if (minPrice <= node.game.price) traverse(node.left);
			if (maxPrice >= node.game.price) traverse(node.right);
		};

		traverse(this.root);
		return result;
	}
}

class GenreHashTable {
	constructor(size = 101) {
		this.table = new Array(size).fill().map(() => []);
		this.size = size;
	}

	hash(genre) {
		let hash = 0;
		for (let i = 0; i < genre.length; i++) {
			hash = (hash * 31 + genre.charCodeAt(i)) % this.size;
		}
		return hash;
	}

	insert(game) {
		game.genres.forEach(genre => {
			const index = this.hash(genre);
			if (!this.table[index].some(g => g.id === game.id)) {
				this.table[index].push(game);
			}
		});
	}

	findByGenre(genre) {
		const index = this.hash(genre);
		return this.table[index].filter(game => game.genres.includes(genre));
	}
}

class MiniSteam {
	constructor() {
		this.bst = new BST();
		this.genreHashTable = new GenreHashTable();
		this.games = new Map();
	}

	addGame(id, title, developer, price, genres) {
		const game = new Game(id, title, developer, price, genres);
		this.games.set(id, game);
		this.bst.insert(game);
		this.genreHashTable.insert(game);
	}

	findGamesByPrice(price) {
		return this.bst.findByPrice(price);
	}

	findGamesByPriceRange(minPrice, maxPrice) {
		return this.bst.findByPriceRange(minPrice, maxPrice);
	}

	findGamesByGenre(genre) {
		return this.genreHashTable.findByGenre(genre);
	}
}

const store = new MiniSteam();

import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayMenu() {
    console.log('\n=== Mini Steam ===');
    console.log('1. Adicionar novo jogo');
    console.log('2. Buscar jogos por preço exato');
    console.log('3. Buscar jogos por faixa de preço');
    console.log('4. Buscar jogos por gênero');
    console.log('5. Listar todos os jogos');
    console.log('0. Sair');
    console.log('================');
}

async function questionAsync(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function addGameMenu() {
    const id = parseInt(await questionAsync('ID do jogo: '));
    const title = await questionAsync('Título: ');
    const developer = await questionAsync('Desenvolvedor: ');
    const price = parseInt(await questionAsync('Preço (em reais): '));
    const genresInput = await questionAsync('Gêneros (separados por vírgula): ');
    const genres = genresInput.split(',').map(g => g.trim());

	console.clear();
    store.addGame(id, title, developer, price, genres);
    console.log('\nJogo adicionado com sucesso!');
}

async function searchByPrice() {
    const price = parseInt(await questionAsync('Digite o preço desejado: '));
    const games = store.findGamesByPrice(price);
    
	console.clear();
    console.log('\nJogos encontrados:');
    games.forEach(game => {
        console.log(`- ${game.title} (R$ ${game.price})`);
    });
}

async function searchByPriceRange() {
    const minPrice = parseInt(await questionAsync('Preço mínimo: '));
    const maxPrice = parseInt(await questionAsync('Preço máximo: '));
    const games = store.findGamesByPriceRange(minPrice, maxPrice);
    
	console.clear();
    console.log('\nJogos encontrados:');
    games.forEach(game => {
        console.log(`- ${game.title} (R$ ${game.price})`);
    });
}

async function searchByGenre() {
    const genre = await questionAsync('Digite o gênero desejado: ');
    const games = store.findGamesByGenre(genre);
    
	console.clear();
    console.log('\nJogos encontrados:');
    games.forEach(game => {
        console.log(`- ${game.title} (Gêneros: ${game.genres.join(', ')})`);
    });
}

function listAllGames() {
	console.clear();
    console.log('\nTodos os jogos:');
    store.games.forEach(game => {
        console.log(`- ${game.title} (R$ ${game.price}) | Gêneros: ${game.genres.join(', ')}`);
    });
}

async function mainMenu() {
    while (true) {
        displayMenu();
        const choice = await questionAsync('Escolha uma opção: ');

        switch (choice) {
            case '1':
                await addGameMenu();
                break;
            case '2':
                await searchByPrice();
                break;
            case '3':
                await searchByPriceRange();
                break;
            case '4':
                await searchByGenre();
                break;
            case '5':
                listAllGames();
                break;
            case '0':
                console.log('Encerrando...');
                rl.close();
                return;
            default:
                console.log('Opção inválida!');
        }
    }
}


store.addGame(1, "The Witcher 3", "CD Projekt Red", 100, ["RPG", "Action"]);
store.addGame(2, "Stardew Valley", "ConcernedApe", 50, ["Simulation", "RPG"]);
store.addGame(3, "Counter-Strike 2", "Valve", 0, ["FPS", "Action"]);

mainMenu();
