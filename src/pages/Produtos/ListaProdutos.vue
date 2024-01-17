<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Lista de Produtos</h2>

    <table class="w-full border-collapse border">
      <thead>
        <tr>
          <th class="border p-2">ID</th>
          <th class="border p-2">Nome</th>
          <th class="border p-2">Ativo</th>
          <th class="border p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" :key="produto.id">
          <td class="border p-2">{{ produto.id }}</td>
          <td class="border p-2">{{ produto.nome }}</td>
          <td class="border p-2">{{ produto.ativo ? 'Sim' : 'Não' }}</td>
          <td class="border p-2">
            <button @click="editarProduto(produto.id)"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Editar</button>
            <button @click="ativarDesativarProduto(produto.id)" :class="botaoClasse(produto.ativo)">
              {{ produto.ativo ? 'Desativar' : 'Ativar' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import mockService from '@/service/MockService';

export default {
  data() {
    return {
      produtos: [],
    };
  },
  created() {
    this.carregarProdutos();
  },
  methods: {
    carregarProdutos() {
      mockService
        .obterProdutos()
        .then((produtos) => {
          this.produtos = produtos;
        })
        .catch((error) => {
          console.error('Erro ao carregar produtos:', error);
        });
    },
    editarProduto(produtoId) {
      console.log('Editar produto com ID:', produtoId);
    },
    ativarDesativarProduto(produtoId) {
      console.log('Ativar/Desativar produto com ID:', produtoId);
    },
    botaoClasse(ativo) {
      return {
        'bg-green-500': ativo,
        'bg-red-500': !ativo,
        'text-white': true,
        'px-4': true,
        'py-2': true,
        'rounded': true,
        'hover:bg-gray-600': true,
      };
    },
  },
};
</script>

