class MockService {
  constructor() {
    this.clientes = [];
    this.produtos = [];
  }

  salvarCliente(cliente) {
    const clienteSalvo = { ...cliente, id: Math.floor(Math.random() * 1000) };
    this.clientes.push(clienteSalvo);
    return Promise.resolve(clienteSalvo);
  }

  listarClientes() {
    return Promise.resolve([...this.clientes]);
  }

  obterClientePorId(clienteId) {
    const cliente = this.clientes.find(c => c.id === clienteId);
    return Promise.resolve(cliente);
  }

  editarCliente(clienteId, novoCliente) {
    const index = this.clientes.findIndex(c => c.id === clienteId);
    if (index !== -1) {
      this.clientes[index] = { ...novoCliente, id: clienteId };
      return Promise.resolve(this.clientes[index]);
    } else {
      return Promise.reject(new Error('Cliente não encontrado'));
    }
  }

  desativarCliente(clienteId) {
    const index = this.clientes.findIndex(c => c.id === clienteId);
    if (index !== -1) {
      this.clientes[index].ativo = false;
      return Promise.resolve(true);
    } else {
      return Promise.reject(new Error('Cliente não encontrado'));
    }
  }

  obterClientes() {
    return Promise.resolve([...this.clientes]);
  }


  // Métodos relacionados ao produto
  salvarProduto(produto) {
    const produtoSalvo = { ...produto, id: Math.floor(Math.random() * 1000) };
    this.produtos.push(produtoSalvo);
    return Promise.resolve(produtoSalvo);
  }

  listarProdutos() {
    return Promise.resolve([...this.produtos]);
  }

  obterProdutoPorId(produtoId) {
    const produto = this.produtos.find(p => p.id === produtoId);
    return Promise.resolve(produto);
  }

  editarProduto(produtoId, novoProduto) {
    const index = this.produtos.findIndex(p => p.id === produtoId);
    if (index !== -1) {
      this.produtos[index] = { ...novoProduto, id: produtoId };
      return Promise.resolve(this.produtos[index]);
    } else {
      return Promise.reject(new Error('Produto não encontrado'));
    }
  }

  atualizarProduto(produtoId, novosDadosProduto) {
    return new Promise((resolve, reject) => {
      const index = this.produtos.findIndex(p => p.id === produtoId);
      if (index !== -1) {
        // Atualiza apenas os campos fornecidos em novosDadosProduto
        this.produtos[index] = { ...this.produtos[index], ...novosDadosProduto };
        resolve(this.produtos[index]);
      } else {
        reject(new Error('Produto não encontrado'));
      }
    });
  }

  ativarDesativarProduto(produtoId) {
    const index = this.produtos.findIndex(p => p.id === produtoId);
    if (index !== -1) {
      this.produtos[index].ativo = !this.produtos[index].ativo;
      return Promise.resolve(this.produtos[index]);
    } else {
      return Promise.reject(new Error('Produto não encontrado'));
    }
  }

  obterProdutos() {
    return Promise.resolve([...this.produtos]);
  }

  // Métodos relacionados à associação de produtos e clientes
  associarProdutoAoCliente(clienteId, produtoId) {
    const clienteEncontrado = this.clientes.find(c => c.id === clienteId);

    if (clienteEncontrado) {
      // Verifica se o produto já está associado ao cliente
      if (!clienteEncontrado.produtos.includes(produtoId)) {
        clienteEncontrado.produtos.push(produtoId);
        return Promise.resolve(true);
      }
    }
  }


  desassociarProdutoDoCliente(clienteId, produtoId) {
    const clienteIndex = this.clientes.findIndex(c => c.id === clienteId);

    if (clienteIndex !== -1) {
      const produtoIndex = this.clientes[clienteIndex].produtos.findIndex(p => p === produtoId);

      if (produtoIndex !== -1) {
        this.clientes[clienteIndex].produtos.splice(produtoIndex, 1);
        return Promise.resolve(true);
      } else {
        return Promise.reject(new Error('Produto não associado ao cliente'));
      }
    } else {
      return Promise.reject(new Error('Cliente não encontrado'));
    }
  }

  obterProdutosAssociados(clienteId) {
    const cliente = this.clientes.find(c => c.id === clienteId);

    if (cliente) {
      const produtosAssociados = cliente.produtos.map(produtoId => this.produtos.find(p => p.id === produtoId));
      return Promise.resolve(produtosAssociados);
    } else {
      return Promise.reject(new Error('Cliente não encontrado'));
    }
  }

  obterProdutosNaoAssociados(clienteId) {
    const cliente = this.clientes.find(c => c.id === clienteId);

    if (cliente) {
      const produtosAssociadosIds = new Set(cliente.produtos);
      const produtosNaoAssociados = this.produtos.filter(p => !produtosAssociadosIds.has(p.id));
      return Promise.resolve(produtosNaoAssociados);
    } else {
      return Promise.reject(new Error('Cliente não encontrado'));
    }
  }
}

const mockService = new MockService();
export default mockService;
