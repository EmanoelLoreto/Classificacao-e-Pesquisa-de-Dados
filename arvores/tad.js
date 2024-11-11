class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null;
	}

	// Inserção
	insert(value) {
		const newNode = new Node(value);
		
		if (this.root === null) {
			this.root = newNode;
			return;
		}
		
		this._insertNode(this.root, newNode);
	}

	_insertNode(node, newNode) {
		if (newNode.value < node.value) {
			if (node.left === null) {
				node.left = newNode;
			} else {
				this._insertNode(node.left, newNode);
			}
		} else {
			if (node.right === null) {
				node.right = newNode;
			} else {
				this._insertNode(node.right, newNode);
			}
		}
	}

	// Impressão em pré-ordem (raiz-esquerda-direita)
	preOrder() {
		const result = [];
		this._preOrderTraversal(this.root, result);
		return result;
	}

	_preOrderTraversal(node, result) {
		if (node !== null) {
			result.push(node.value);
			this._preOrderTraversal(node.left, result);
			this._preOrderTraversal(node.right, result);
		}
	}

	// Impressão em ordem simétrica (esquerda-raiz-direita)
	inOrder() {
		const result = [];
		this._inOrderTraversal(this.root, result);
		return result;
	}

	_inOrderTraversal(node, result) {
		if (node !== null) {
			this._inOrderTraversal(node.left, result);
			result.push(node.value);
			this._inOrderTraversal(node.right, result);
		}
	}

	// Impressão em pós-ordem (esquerda-direita-raiz)
	postOrder() {
		const result = [];
		this._postOrderTraversal(this.root, result);
		return result;
	}

	_postOrderTraversal(node, result) {
		if (node !== null) {
			this._postOrderTraversal(node.left, result);
			this._postOrderTraversal(node.right, result);
			result.push(node.value);
		}
	}

	// Busca
	search(value) {
		return this._searchNode(this.root, value);
	}

	_searchNode(node, value) {
		if (node === null || node.value === value) {
			return node;
		}

		if (value < node.value) {
			return this._searchNode(node.left, value);
		}
		return this._searchNode(node.right, value);
	}

	// Deleção
	delete(value) {
		this.root = this._deleteNode(this.root, value);
	}

	_deleteNode(node, value) {
		if (node === null) {
			return null;
		}

		if (value < node.value) {
			node.left = this._deleteNode(node.left, value);
			return node;
		} else if (value > node.value) {
			node.right = this._deleteNode(node.right, value);
			return node;
		}

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
		let successor = this._findMin(node.right);
		node.value = successor.value;
		node.right = this._deleteNode(node.right, successor.value);
		return node;
	}

	_findMin(node) {
		while (node.left !== null) {
			node = node.left;
		}
		return node;
	}
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

console.log("Pré-ordem:", bst.preOrder());     // [10, 5, 3, 7, 15]
console.log("Em ordem:", bst.inOrder());       // [3, 5, 7, 10, 15]
console.log("Pós-ordem:", bst.postOrder());    // [3, 7, 5, 15, 10]

console.log("Busca por 7:", bst.search(7));    // Node { value: 7, left: null, right: null }
console.log("Busca por 9:", bst.search(9));    // null

bst.delete(5);
console.log("Após deletar 5:", bst.inOrder()); // [3, 7, 10, 15]