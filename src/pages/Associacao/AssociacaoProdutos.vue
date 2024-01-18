<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Associação de Produtos</h2>

    <!-- Seleção de Cliente e Produto -->
    <div class="flex flex-wrap mb-6">
      <div class="w-full sm:w-1/2 md:w-1/3 mb-2">
        <label for="cliente" class="block mb-2">Selecione um Cliente:</label>
        <select v-model="clienteSelecionado" id="cliente" class="border p-2 rounded-md w-full">
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome }}</option>
        </select>
      </div>
      <div class="w-full sm:w-1/2 md:w-1/3 mb-2">
        <label for="produto" class="block mb-2">Selecione um Produto:</label>
        <select v-model="produtoSelecionado" id="produto" class="border p-2 rounded-md w-full">
          <option v-for="produto in produtosDisponiveis" :key="produto.id" :value="produto.id">{{ produto.nome }}</option>
        </select>
      </div>
      <div class="w-full">
        <button v-if="clienteSelecionado && produtoSelecionado" @click="associarProdutoSelecionado"
          class="bg-green-500 text-white p-2 rounded-md">Associar Produto ao Cliente</button>
      </div>
    </div>

    <!-- Lista de Produtos Associados ao Cliente -->
    <h3 class="text-xl font-bold mb-2">Produtos Associados ao Cliente</h3>
    <ul class="mb-6">
      <template v-if="produtosAssociados.length > 0">
        <li v-for="produto in produtosAssociados" :key="produto.id"
          class="flex items-center justify-between border-b py-2">
          <span>{{ produto.nome }}</span>
          <button @click="desassociarProduto(produto.id)"
            class="bg-gray-500 text-white p-2 rounded-md">Desassociar</button>
        </li>
      </template>
      <template v-else>
        <li>Nenhum produto associado a este cliente.</li>
      </template>
    </ul>

    <div v-if="produtoAssociado">
      <p>Produto associado com sucesso: {{ produtoAssociado.nome }}</p>
    </div>

    <!-- Lista de Produtos Disponíveis para Associação -->
    <h3 class="text-xl font-bold mb-2">Produtos Disponíveis para Associação</h3>
    <ul>
      <template v-if="produtosDisponiveis.length > 0">
        <li v-for="produto in produtosDisponiveis" :key="produto.id"
          class="flex items-center justify-between border-b py-2">
          <span>{{ produto.nome }}</span>
          <button @click="associarProduto(produto.id)" class="bg-green-500 text-white p-2 rounded-md">Associar</button>
        </li>
      </template>
      <template v-else>
        <li>Nenhum produto disponível para associação.</li>
      </template>
    </ul>
  </div>
</template>

<script>
import mockService from '@/service/MockService';

export default {
  data() {
    return {
      clientes: [],
      produtosDisponiveis: [],
      clienteSelecionado: null,
      produtosAssociados: [],
      produtoSelecionado: null,
      carregandoProdutos: false,
      produtoAssociado: null,
    };
  },
  created() {
    this.carregarClientes();
  },
  methods: {
    async carregarClientes() {
      try {
        const clientesArmazenados = JSON.parse(localStorage.getItem('clientes')) || [];
        this.clientes = clientesArmazenados;

        if (clientesArmazenados.length > 0) {
          this.clienteSelecionado = this.clienteSelecionado || clientesArmazenados[0].id;
          await this.carregarProdutos();
        }
      } catch (error) {
        this.tratarErro(error);
      }
    },
    async carregarProdutos() {
      try {
        const produtosArmazenados = JSON.parse(localStorage.getItem('produtos')) || [];
        this.produtosDisponiveis = produtosArmazenados;
      } catch (error) {
        this.tratarErro(error);
      }
    },

    async carregarProdutosAssociados() {
      if (!this.clienteSelecionado) return;

      this.carregandoProdutos = true;

      const produtosAssociados = JSON.parse(localStorage.getItem(`produtosAssociados-${this.clienteSelecionado}`)) || [];
      const produtosDisponiveis = JSON.parse(localStorage.getItem('produtos')) || [];

      this.produtosAssociados = produtosAssociados;
      this.produtosDisponiveis = produtosDisponiveis;

      this.carregandoProdutos = false;
    },

    async associarProdutoSelecionado() {
      try {
        if (!this.clienteSelecionado || !this.produtoSelecionado) {
          throw new Error('Selecione um cliente e um produto para associar.');
        }

        console.log('Associando produto:', this.produtoSelecionado, 'ao cliente:', this.clienteSelecionado);

        await this.associarProduto(this.produtoSelecionado);
      } catch (error) {
        this.tratarErro(error);
      }
    },

    async associarProduto(produtoId) {
      try {
        const clienteEncontrado = this.clientes.find(cliente => cliente.id == this.clienteSelecionado);

        const produtoEncontrado = this.produtosDisponiveis.find(produto => produto.id === produtoId);


        await mockService.associarProdutoAoCliente(clienteEncontrado.id, produtoId);
        console.log('Produto associado com sucesso.');

        // Atualiza os produtos associados após a associação
        await this.carregarProdutosAssociados();
        this.salvarLocalStorage();

        // Exibe produto add lista de produtos associados
        this.produtoAssociado = produtoEncontrado;
        this.produtosAssociados.push(produtoEncontrado);
      } catch (error) {
        this.tratarErro(error);
      }
    },


    async desassociarProduto(produtoId) {
      try {
        console.log('Desassociando produto:', produtoId, 'do cliente:', this.clienteSelecionado);

        await mockService.desassociarProdutoDoCliente(this.clienteSelecionado, produtoId);
        console.log('Produto desassociado com sucesso.');
        await this.carregarProdutosAssociados();
        this.salvarLocalStorage();
      } catch (error) {
        this.tratarErro(error);
      }
    },

    tratarErro(error) {
      console.error('Erro:', error.message || error);
    },

    salvarLocalStorage() {
      // Converte objetos reativos para objetos simples antes de salvar no localStorage
      const clientesSimples = this.clientes.map(({ ativo, ...rest }) => rest);
      localStorage.setItem('clientes', JSON.stringify(clientesSimples));
      localStorage.setItem('produtos', JSON.stringify(this.produtosDisponiveis));
      localStorage.setItem(`produtosAssociados-${this.clienteSelecionado}`, JSON.stringify(this.produtosAssociados));
    },
  },
};
</script>

