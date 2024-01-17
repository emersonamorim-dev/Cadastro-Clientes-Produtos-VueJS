<template>
  <div class="produtos-form max-w-2xl mx-auto">
    <h2 class="font-semibold text-2xl mb-4">Cadastro de Produto</h2>

    <!-- Formulário para cadastrar novo produto -->
    <form @submit.prevent="salvarProduto" class="mb-6">
      <div class="mb-4">
        <label for="nome" class="block text-sm font-semibold mb-2">Nome:</label>
        <input v-model="produto.nome" type="text" id="nome" class="w-4/5 px-2 py-2 border rounded-md focus:outline-none focus:border-green-500" required>
      </div>

      <div class="mb-4">
        <label for="ativo" class="block text-sm font-semibold mb-2">Ativo:</label>
        <select v-model="produto.ativo" id="ativo" class="w-4/5 px-2 py-2 border rounded-md focus:outline-none focus:border-green-500" required>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>

      <button type="submit" class="bg-green-500 text-white px-6 py-3 rounded-md cursor-pointer">Salvar</button>
    </form>

    <!-- Seção de Edição de Produto -->
    <div v-if="editarProdutoId !== null">
     <h2 class="text-2xl font-bold mb-4">Editar Produto</h2>
     <!-- Formulário para editar um produto existente -->
     <form @submit.prevent="atualizarProduto" class="mb-6">
       <!-- Campos de entrada para editar o produto selecionado -->
       <button type="submit" class="bg-green-500 text-white px-6 py-3 rounded-md cursor-pointer mr-4">Atualizar</button>
       <button @click="cancelarEdicao" class="bg-gray-500 text-white px-6 py-3 rounded-md cursor-pointer">Cancelar</button>
     </form>
   </div>
   

    <hr class="my-12">

    <h2 class="text-2xl font-bold mb-4">Lista de Produtos</h2>
    <!-- Tabela para exibir a lista de produtos -->
    <table class="w-full p-6">
      <thead>
        <tr>
          <th class="py-2 px-4 border">ID</th>
          <th class="py-2 px-4 border">Nome</th>
          <th class="py-2 px-4 border">Ativo</th>
          <th class="py-2 px-4 border">Ações</th>
        </tr>
      </thead>
      <tbody>

      <!-- Loop pelos produtos para exibir na tabela -->
       <tr v-for="produto in produtos" :key="produto.id" class="border-b">
         <td class="py-2 px-4 border">{{ produto.id }}</td>
         <td class="py-2 px-4 border">{{ produto.nome }}</td>
         <td class="py-2 px-4 border">{{ produto.ativo ? 'Sim' : 'Não' }}</td>
         <td class="py-2 px-4 border">
           <!-- Botões para editar e ativar/desativar o produto -->
           <button @click="editarProduto(produto)" class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mr-2">Editar</button>
           <button @click="ativarDesativarProduto(produto.id)" :class="{'bg-green-500': produto.ativo, 'bg-red-500': !produto.ativo, 'text-white': true, 'px-4': true, 'py-2': true, 'rounded-md': true, 'cursor-pointer': true}">
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
      produto: {
        nome: '',
        ativo: false,
      },
      produtos: [],
      // Rastreia o ID do produto sendo editado
      editarProdutoId: null, 
    };
  },
  created() {
    this.carregarProdutos();
  },
  methods: {
    // Carrega a lista de produtos ao criar o componente
    carregarProdutos() {
      // Obtem produtos armazenados localmente
      this.produtos = JSON.parse(localStorage.getItem('produtos')) || [];

      if (this.produtos.length === 0) {
        mockService
          .obterProdutos()
          .then((produtos) => {
            this.produtos = produtos;

        // Salva os produtos no armazenamento local    
            this.salvarProdutosLocalmente(); 
          })
          .catch((error) => {
            console.error('Erro ao carregar produtos:', error);
          });
      }
    },
    // Salva um novo produto
    salvarProduto() {
      mockService
        .salvarProduto(this.produto)
        .then((produtoSalvo) => {
          console.log('Produto salvo:', produtoSalvo);

          this.produtos.push(produtoSalvo);

          // Atualiza os produtos no armazenamento local      
          this.salvarProdutosLocalmente(); 

          this.produto = {
            nome: '',
            ativo: false,
          };
        })
        .catch((error) => {
          console.error('Erro ao salvar o produto:', error);
        });
    },

    // Salva produtos no armazenamento local
     salvarProdutosLocalmente() {
      localStorage.setItem('produtos', JSON.stringify(this.produtos));
    },

  // Função para iniciar o modo de edição de um produto
  editarProduto(produto) {
      this.editarProdutoId = produto.id;
      // Copia os dados do produto para o formulário de edição
      this.produto = { ...produto };
    },
    // Função para atualizar um produto existente
    atualizarProduto() {
      if (this.editarProdutoId) {
        // Índice do produto no array usando o ID
        const index = this.produtos.findIndex((produto) => produto.id === this.editarProdutoId);

        if (index !== -1) {
          // Atualiza os dados do produto no array
          this.produtos[index] = { ...this.produto };

          // Atualiza o localStorage com a lista de produtos atualizada
          localStorage.setItem('produtos', JSON.stringify(this.produtos));

          console.log(`Produto atualizado com ID: ${this.editarProdutoId}`);

          // Limpar os campos de edição
          this.editarProdutoId = null;
          this.produto = { nome: '', ativo: false };
        } else {
          console.error('Produto não encontrado.');
        }
      }
    },

    // Cancela o modo de edição
    cancelarEdicao() {
      this.editarProdutoId = null;
      this.produto = { nome: '', ativo: false };
    },
    
    // Função para ativar ou desativar um produto
    ativarDesativarProduto(produtoId) {
      const index = this.produtos.findIndex((produto) => produto.id === produtoId);

      if (index !== -1) {
        // Inverte o status "ativo" do produto
        this.produtos[index].ativo = !this.produtos[index].ativo;

        localStorage.setItem('produtos', JSON.stringify(this.produtos));
        
        console.log(`Produto ativado/desativado com ID: ${produtoId}`);
      } else {
        console.error('Produto não encontrado.');
      }
    },
  },
};
</script>
