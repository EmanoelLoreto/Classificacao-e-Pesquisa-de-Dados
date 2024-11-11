class Node {
	constructor(id, name, description, price) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.left = null;
		this.right = null;
	}
}

class ProductBST {
	constructor() {
		this.root = null;
	}

	// Inserir um novo produto
	insert(id, name, description, price) {
		const newNode = new Node(id, name, description, price);

		if (this.root === null) {
			this.root = newNode;
			return;
		}

		let current = this.root;
		while (true) {
			if (id < current.id) {
				if (current.left === null) {
					current.left = newNode;
					break;
				}
				current = current.left;
			} else if (id > current.id) {
				if (current.right === null) {
					current.right = newNode;
					break;
				}
				current = current.right;
			} else {
				throw new Error('Produto com este ID já existe');
			}
		}
	}

	// Buscar um produto pelo ID
	search(id) {
		let current = this.root;
		
		while (current !== null) {
			if (id === current.id) {
				return current;
			}
			if (id < current.id) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		
		return null;
	}

	// Encontrar o menor valor na subárvore
	findMin(node) {
		let current = node;
		while (current.left !== null) {
			current = current.left;
		}
		return current;
	}

	// Remover um produto pelo ID
	remove(id) {
		this.root = this._removeNode(this.root, id);
	}

	_removeNode(node, id) {
		if (node === null) {
			return null;
		}

		if (id < node.id) {
			node.left = this._removeNode(node.left, id);
			return node;
		} else if (id > node.id) {
			node.right = this._removeNode(node.right, id);
			return node;
		} else {
			// Caso 1: Nó folha
			if (node.left === null && node.right === null) {
				return null;
			}
			// Caso 2: Nó com apenas um filho
			if (node.left === null) {
				return node.right;
			}
			if (node.right === null) {
				return node.left;
			}
			// Caso 3: Nó com dois filhos
			const minNode = this.findMin(node.right);
			node.id = minNode.id;
			node.name = minNode.name;
			node.description = minNode.description;
			node.price = minNode.price;
			node.right = this._removeNode(node.right, minNode.id);
			return node;
		}
	}

	// Listar produtos em ordem crescente de ID
	inOrderTraversal(callback) {
		this._inOrder(this.root, callback);
	}

	_inOrder(node, callback) {
		if (node !== null) {
			this._inOrder(node.left, callback);
			callback(node);
			this._inOrder(node.right, callback);
		}
	}
}

import readline from 'readline';

const productTree = new ProductBST();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('\n=== Sistema de Gerenciamento de Produtos ===');
    console.log('1. Inserir novo produto');
    console.log('2. Remover produto');
    console.log('3. Buscar produto');
    console.log('4. Listar todos os produtos');
    console.log('5. Sair');
    console.log('==========================================');
    rl.question('Escolha uma opção: ', handleOption);
}

function handleOption(option) {
    switch (option) {
        case '1':
            insertProduct();
            break;
        case '2':
            removeProduct();
            break;
        case '3':
            searchProduct();
            break;
        case '4':
            listProducts();
            break;
        case '5':
            console.log('Encerrando o programa...');
            rl.close();
            break;
        default:
            console.log('Opção inválida!');
            showMenu();
            break;
    }
}

function insertProduct() {
    rl.question('ID do produto: ', (id) => {
        rl.question('Nome do produto: ', (name) => {
            rl.question('Descrição do produto: ', (description) => {
                rl.question('Preço do produto: ', (price) => {
                    try {
                        productTree.insert(
                            parseInt(id),
                            name,
                            description,
                            parseFloat(price)
                        );
                        console.log('Produto inserido com sucesso!');
                    } catch (error) {
                        console.log('Erro ao inserir produto:', error.message);
                    }
                    showMenu();
                });
            });
        });
    });
}

function removeProduct() {
    rl.question('Digite o ID do produto a ser removido: ', (id) => {
        try {
            productTree.remove(parseInt(id));
            console.log('Produto removido com sucesso!');
        } catch (error) {
            console.log('Erro ao remover produto:', error.message);
        }
        showMenu();
    });
}

function searchProduct() {
    rl.question('Digite o ID do produto: ', (id) => {
        const product = productTree.search(parseInt(id));
        if (product) {
            console.log('\nProduto encontrado:');
            console.log(`ID: ${product.id}`);
            console.log(`Nome: ${product.name}`);
            console.log(`Descrição: ${product.description}`);
            console.log(`Preço: R$ ${product.price.toFixed(2)}`);
        } else {
            console.log('Produto não encontrado!');
        }
        showMenu();
    });
}

function listProducts() {
    console.log('\nLista de Produtos (em ordem crescente de ID):');
    let hasProducts = false;
    
    productTree.inOrderTraversal((node) => {
        hasProducts = true;
        console.log(`ID: ${node.id} | Nome: ${node.name} | Preço: R$ ${node.price.toFixed(2)}`);
    });

    if (!hasProducts) {
        console.log('Nenhum produto cadastrado.');
    }
    showMenu();
}

// Iniciar o programa
console.log('Bem-vindo ao Sistema de Gerenciamento de Produtos!');
showMenu();