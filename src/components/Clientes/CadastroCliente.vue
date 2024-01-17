<template>
  <div class="w-full p-6">
    <h2 class="font-semibold text-2xl mb-4">Cadastro de Cliente</h2>

    <form @submit.prevent="salvarCliente">
      <div class="form-group mb-6">
        <div class="relative">
          <label for="nome" class="block mb-2 text-sm font-bold">Nome:</label>
          <input v-model="cliente.nome" type="text" id="nome" placeholder="Digite seu Nome" :class="'border-green-500'"
            class="w-4/5 px-2 py-2 border rounded-md focus:outline-none" required>
        </div>
      </div>

      <div class="form-group mb-6">
        <label for="documento" class="block mb-2 text-sm font-bold">Documento:</label>
        <div class="relative">
          <input v-model="cliente.documento" type="number" id="documento" placeholder="Digite seu CPF"
            :class="{ 'border-red-500': !validDocumento, 'border-green-500': validDocumento }"
            @input="validDocumento = validarCPF(cliente.documento)"
            class="w-4/5 px-2 py-2 border rounded-md focus:outline-none focus:border-green-500" required />
          <span v-if="cliente.documento && !validDocumento" class="text-red-500 absolute right-8 right-0 top-1/4 w-1/5"><i
              class="fas fa-times"></i></span>
          <span v-if="cliente.documento && validDocumento"
            class="text-green-500 absolute right-8 right-0 top-1/4 w-1/5"><i class="fas fa-check"></i></span>
        </div>
      </div>

      <div class="form-group mb-6">
        <label for="telefone" class="block mb-2 text-sm font-bold">Telefone:</label>
        <div class="relative">
          <input v-model="cliente.telefone" type="number" id="telefone" placeholder="Digite seu Telefone"
            :class="{ 'border-red-500': !validTelefone, 'border-green-500': validTelefone }"
            @input="validTelefone = validarTelefone(cliente.telefone)"
            class="w-4/5 px-2 py-2 border rounded-md focus:outline-none focus:border-green-500" required />
          <span v-if="cliente.telefone && !validTelefone" class="text-red-500 absolute right-8 right-0 top-1/4 w-1/5"><i
              class="fas fa-times"></i></span>
          <span v-if="cliente.telefone && validTelefone" class="text-green-500 absolute right-8 right-0 top-1/4 w-1/5"><i
              class="fas fa-check"></i></span>
        </div>
      </div>

      <div class="form-group mb-6">
        <label for="email" class="block mb-2 text-sm font-bold">E-mail:</label>
        <div class="relative">
          <input v-model="cliente.email" type="email" id="email" placeholder="Digite seu E-mail"
            :class="{ 'border-red-500': !validEmail, 'border-green-500': validEmail }"
            @input="validEmail = validarEmail(cliente.email)"
            class="w-4/5 px-2 py-2 border rounded-md focus:outline-none focus:border-green-500 relative" required />
          <span v-if="cliente.email && !validEmail"
            class="text-red-500 absolute right-8 top-1/4 w-1/5 transform -translate-y-8/2"><i
              class="fas fa-times"></i></span>
          <span v-if="cliente.email && validEmail"
            class="text-green-500 absolute right-8 top-1/2 w-1/5 transform -translate-y-1/2"><i
              class="fas fa-check"></i></span>
        </div>
      </div>

      <div class="mb-4">
        <label for="ativo" class="block text-sm font-semibold mb-2">Ativo:</label>
        <select v-model="cliente.ativo" id="ativo"
          class="w-4/5 px-2 py-2 border rounded-md focus:outline-none focus:border-green-500" required>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>

      <button type="submit" class="bg-green-500 text-white px-6 py-3 rounded-md cursor-pointer">Salvar</button>
    </form>

    <!-- Seção de Edição de Cliente -->
    <div v-if="editarClienteId !== null">
      <h2 class="text-2xl font-bold mb-4">Editar Cliente</h2>
      <form @submit.prevent="atualizarCliente" class="mb-6">
        <button type="submit" class="bg-green-500 text-white px-6 py-3 rounded-md cursor-pointer mr-4">Atualizar</button>
        <button @click="cancelarEdicao"
          class="bg-gray-500 text-white px-6 py-3 rounded-md cursor-pointer">Cancelar</button>
      </form>
    </div>

    <hr class="my-12">
    <!-- Seção de Lista de Clientes -->
    <div class="w-full p-6">
      <h2 class="text-3xl font-bold mb-4">Lista de Clientes</h2>

      <table class="min-w-full border-collapse border rounded-md overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-3">ID</th>
            <th class="border p-3 max-w-xs overflow-hidden whitespace-nowrap">Nome</th>
            <th class="border p-3">Documento</th>
            <th class="border p-3">Telefone</th>
            <th class="border p-3">E-mail</th>
            <th class="border p-3">Ativo</th>
            <th class="border p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id" class="border-b">
            <td class="border p-3">{{ cliente.id }}</td>
            <td class="border p-3 max-w-xs overflow-hidden whitespace-nowrap">{{ cliente.nome }}</td>
            <td class="border p-3">{{ cliente.documento }}</td>
            <td class="border p-3">{{ cliente.telefone }}</td>
            <td class="border p-3">{{ cliente.email }}</td>
            <td class="border p-3">{{ cliente.ativo ? 'Sim' : 'Não' }}</td>
            <td class="border p-3 flex items-center space-x-2">
              <button @click="editarCliente(cliente)"
                class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">Editar</button>
              <button @click="ativarDesativarCliente(cliente.id)"
                :class="{ 'bg-green-500': cliente.ativo, 'bg-red-500': !cliente.ativo, 'text-white': true, 'px-4': true, 'py-2': true, 'rounded-md': true, 'cursor-pointer': true }">
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
      cliente: {
        nome: '',
        documento: '',
        telefone: '',
        email: '',
        ativo: false,
      },
      // Expressões regulares para validação
      cpfRegex: /^\d{11}$/,
      telefoneRegex: /^\d{11}$/,
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

      // Status de validação para cada input
      validDocumento: true,
      validTelefone: true,
      validEmail: true,
      validAtivo: true,

      clientes: [],
      editarClienteId: null,
    };
  },
  created() {
    this.carregarClientes();
  },
  methods: {
    validarCPF(cpf) {
      return this.cpfRegex.test(cpf);
    },
    validarTelefone(telefone) {
      return this.telefoneRegex.test(telefone);
    },
    validarEmail(email) {
      return this.emailRegex.test(email);
    },

    // Carrega a lista de clientes ao criar o componente
    carregarClientes() {
      this.clientes = JSON.parse(localStorage.getItem('clientes')) || [];

      if (this.clientes.length === 0) {
        mockService
          .obterClientes()
          .then((clientes) => {
            this.clientes = clientes;

            // Salva os clientes no armazenamento local
            this.salvarClientesLocalmente();
          })
          .catch((error) => {
            console.error('Erro ao carregar clientes:', error);
          });
      }
    },

    // Salva um novo cliente
    salvarCliente() {
      mockService
        .salvarCliente(this.cliente)
        .then((clienteSalvo) => {
          console.log('Cliente salvo:', clienteSalvo);

          this.clientes.push(clienteSalvo);

          // Atualiza os clientes no armazenamento local
          this.salvarClientesLocalmente();

          this.cliente = {
            nome: '',
            documento: '',
            telefone: '',
            email: '',
            ativo: false,
          };
        })
        .catch((error) => {
          console.error('Erro ao salvar o cliente:', error);
        });
    },

    // Salva clientes no armazenamento local
    salvarClientesLocalmente() {
      localStorage.setItem('clientes', JSON.stringify(this.clientes));
    },

    // Função para iniciar o modo de edição de um cliente
    editarCliente(cliente) {
      this.editarClienteId = cliente.id;
      this.cliente = { ...cliente };
    },

    // Função para atualizar um cliente existente
    atualizarCliente() {
      if (this.editarClienteId) {
        const index = this.clientes.findIndex((cliente) => cliente.id === this.editarClienteId);

        if (index !== -1) {
          this.clientes[index] = { ...this.cliente };
          localStorage.setItem('clientes', JSON.stringify(this.clientes));

          console.log(`Cliente atualizado com ID: ${this.editarClienteId}`);

          // Limpar os campos de edição
          this.editarClienteId = null;
          this.cliente = {
            nome: '',
            documento: '',
            telefone: '',
            email: '',
            ativo: false,
          };
        } else {
          console.error('Cliente não encontrado.');
        }
      }
    },

    // Cancela o modo de edição
    cancelarEdicao() {
      this.editarClienteId = null;
      this.cliente = {
        nome: '',
        documento: '',
        telefone: '',
        email: '',
        ativo: false,
      };
    },

    // Função para ativar ou desativar um cliente
    ativarDesativarCliente(clienteId) {
      const index = this.clientes.findIndex((cliente) => cliente.id === clienteId);

      if (index !== -1) {
        this.clientes[index].ativo = !this.clientes[index].ativo;
        localStorage.setItem('clientes', JSON.stringify(this.clientes));

        console.log(`Cliente ativado/desativado com ID: ${clienteId}`);
      } else {
        console.error('Cliente não encontrado.');
      }
    },
  },
};
</script>
