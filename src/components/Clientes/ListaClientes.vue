<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Lista de Clientes</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border">
        <thead>
          <tr>
            <th class="border p-2">ID</th>
            <th class="border p-2">Nome</th>
            <th class="border p-2">Documento</th>
            <th class="border p-2">Telefone</th>
            <th class="border p-2">E-mail</th>
            <th class="border p-2">Ativo</th>
            <th class="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td class="border p-2">{{ cliente.id }}</td>
            <td class="border p-2">{{ cliente.nome }}</td>
            <td class="border p-2">{{ cliente.documento }}</td>
            <td class="border p-2">{{ cliente.telefone }}</td>
            <td class="border p-2">{{ cliente.email }}</td>
            <td class="border p-2">{{ cliente.ativo ? 'Sim' : 'Não' }}</td>
            <td class="border p-2">
              <button @click="editarCliente(cliente)"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">Editar</button>
              <button @click="ativarDesativarCliente(cliente)" :class="botaoClasse(cliente.ativo)">
                {{ cliente.ativo ? 'Desativar' : 'Ativar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import mockService from '@/service/MockService';

export default {
  data() {
    return {
      clientes: [],
      clienteEdit: {},
      showEditDialog: false,
    };
  },
  created() {
    this.carregarClientes();
  },
  methods: {
    carregarClientes() {
      mockService
        .obterClientes()
        .then((clientes) => {
          this.clientes = clientes;
        })
        .catch((error) => {
          console.error('Erro ao carregar clientes:', error);
        });
    },
    // Método para persistir os clientes no local storage
    persistirClientes() {
      localStorage.setItem('clientes', JSON.stringify(this.clientes));
    },

    // Método para carregar os clientes do local storage
    carregarClientesLocalStorage() {
      const clientesArmazenados = JSON.parse(localStorage.getItem('clientes')) || [];
      this.clientes = clientesArmazenados;
    },

    editarCliente(cliente) {
      this.clienteEdit = { ...cliente };
      this.showEditDialog = true;
    },

    salvarEdicao() {
      // Lógica para salvar as alterações no cliente
      console.log('Salvando as alterações:', this.clienteEdit);

      // Simulando a persistência dos dados no array de clientes
      const index = this.clientes.findIndex((c) => c.id === this.clienteEdit.id);
      if (index !== -1) {
        this.clientes.splice(index, 1, { ...this.clienteEdit });
        this.persistirClientes();
      }

      this.showEditDialog = false;
    },

    // Altera o estado ativo
    ativarDesativarCliente(cliente) {
      cliente.ativo = !cliente.ativo;
      console.log(`Cliente ${cliente.nome} agora está ${cliente.ativo ? 'ativo' : 'inativo'}.`);
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
