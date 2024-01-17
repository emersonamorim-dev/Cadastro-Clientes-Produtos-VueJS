import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

// Use o VueRouter
const app = createApp(App);

// Importa os componentes das páginas
import CadastroCliente from '@/components/Clientes/CadastroCliente.vue';
import ListaClientes from '@/components/Clientes/ListaClientes.vue';
import CadastroProduto from '@/pages/Produtos/CadastroProduto.vue';
import ListaProdutos from '@/pages/Produtos/ListaProdutos.vue';
import AssociacaoProdutos from '@/pages/Associacao/AssociacaoProdutos.vue';

const routes = [
  { path: '/', redirect: '/clientes/cadastro' }, 
  { path: '/clientes/cadastro', component: CadastroCliente },
  { path: '/clientes/lista', component: ListaClientes },
  { path: '/produtos/cadastro', component: CadastroProduto },
  { path: '/produtos/lista', component: ListaProdutos },
  { path: '/associacao', component: AssociacaoProdutos }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);

app.component('router-view', app.component('router-view') || app.component('RouterView'));

app.mount('#app');

export default router;



