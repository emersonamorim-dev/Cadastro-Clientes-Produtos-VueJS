# Cadastro-Clientes-Produtos-VueJS - Teste DataStone 🚀 🔄 🌐

### Visão Geral
Codificação de projeto para uma aplicação Vue.js para um Teste Técnico na DataStone destinada a gerenciar clientes, produtos e a associação entre eles. A aplicação é desenvolvida com base nos princípios da arquitetura Vue.js, proporcionando uma experiência de usuário intuitiva e eficiente.

### Tecnologias Usadas:

- VUEJS
- Node
- Javascript
- TailwindCSS

### Comandos para rodar o projeto:

``` npm install ```

``` npm install tailwindcss ```

``` npm run serve ```

### Estrutura do Projeto
O projeto é estruturado de maneira organizada, seguindo as melhores práticas recomendadas pela comunidade Vue.js. A estrutura de pastas é clara e intuitiva, facilitando a navegação e manutenção do código-fonte.

1 - /src/components: Contém os componentes Vue.js que compõem a interface da aplicação.

2 - /src/pages: Contém os componentes Vue.js que implemente Produtos e Associação.

3 - /src/service: Armazena o serviço de simulação (MockService) utilizado para interação com clientes e produtos.

4 - /src/App.vue e /src/main.js: Arquivos de configuração e inicialização da aplicação Vue.js.

### Cadastro de Cliente
Este é um componente Vue.js responsável por fornecer uma interface para cadastro, edição, ativação/desativação e listagem de clientes. Abaixo, você encontrará uma descrição dos métodos, orientação a objetos, SOLID e design patterns utilizados no código.

### Métodos
- validarCPF(cpf: string): boolean
Método utilizado para validar o formato do CPF do cliente, retornando true se válido e false caso contrário.

- validarTelefone(telefone: string): boolean
Método utilizado para validar o formato do telefone do cliente, retornando true se válido e false caso contrário.

- validarEmail(email: string): boolean
Método utilizado para validar o formato do e-mail do cliente, retornando true se válido e false caso contrário.

- carregarClientes(): void
Método responsável por carregar a lista de clientes ao criar o componente. Caso não haja clientes armazenados localmente, faz uma chamada ao serviço mock para obtê-los.

- salvarCliente(): void
Método para salvar um novo cliente. Utiliza o serviço mock para persistir o cliente e, em seguida, atualiza a lista local de clientes e limpa os campos do formulário.

- salvarClientesLocalmente(): void
Método para salvar a lista de clientes localmente no armazenamento.

- editarCliente(cliente: Cliente): void
Método para iniciar o modo de edição de um cliente, preenchendo os campos do formulário com os dados do cliente selecionado.

- atualizarCliente(): void
Método para atualizar um cliente existente durante o modo de edição. Atualiza a lista local de clientes e limpa os campos do formulário após a atualização.

- cancelarEdicao(): void
Método para cancelar o modo de edição, limpando os campos do formulário.

- ativarDesativarCliente(clienteId: number): void
Método para ativar ou desativar um cliente existente. Atualiza o status do cliente na lista local e persiste a alteração no armazenamento.

### Orientação a Objetos, SOLID e Design Patterns
O código segue os princípios da orientação a objetos, especialmente no que diz respeito à encapsulação e reutilização de código. A separação de responsabilidades é evidente, com métodos específicos para validação, manipulação de dados e interação com o armazenamento local. Não há evidências de design patterns específicos neste código, mas os conceitos SOLID, especialmente o princípio da responsabilidade única, são considerados na estrutura do código.


### Cadastro de Produto
Este é um componente Vue.js responsável por fornecer uma interface para cadastro, edição, ativação/desativação e listagem de produtos. Abaixo, você encontrará uma descrição dos métodos, orientação a objetos, SOLID e design patterns utilizados no código.

### Métodos
- carregarProdutos(): void
Método responsável por carregar a lista de produtos ao criar o componente. Caso não haja produtos armazenados localmente, faz uma chamada ao serviço mock para obtê-los.

- salvarProduto(): void
Método para salvar um novo produto. Utiliza o serviço mock para persistir o produto e, em seguida, atualiza a lista local de produtos e limpa os campos do formulário.

- salvarProdutosLocalmente(): void
Método para salvar a lista de produtos localmente no armazenamento.

- editarProduto(produto: Produto): void
Método para iniciar o modo de edição de um produto, preenchendo os campos do formulário com os dados do produto selecionado.

- atualizarProduto(): void
Método para atualizar um produto existente durante o modo de edição. Atualiza a lista local de produtos e limpa os campos do formulário após a atualização.

- cancelarEdicao(): void
Método para cancelar o modo de edição, limpando os campos do formulário.

- ativarDesativarProduto(produtoId: number): void
Método para ativar ou desativar um produto existente. Atualiza o status do produto na lista local e persiste a alteração no armazenamento.

### Orientação a Objetos, SOLID e Design Patterns
O código segue os princípios da orientação a objetos, especialmente no que diz respeito à encapsulação e reutilização de código. A separação de responsabilidades é evidente, com métodos específicos para validação, manipulação de dados e interação com o armazenamento local. Não há evidências de design patterns específicos neste código, mas os conceitos SOLID, especialmente o princípio da responsabilidade única, são considerados na estrutura do código.


### Associação de Produtos
Este é um componente Vue.js que permite associar produtos a clientes. Abaixo estão descritos os métodos, a orientação a objetos, SOLID e design patterns utilizados no código.

### Métodos
- carregarClientes(): Promise<void>
Carrega a lista de clientes ao criar o componente. Se houver clientes armazenados localmente, seleciona o primeiro cliente e carrega os produtos disponíveis.

- carregarProdutos(): Promise<void>
Carrega a lista de produtos disponíveis ao criar o componente.

- carregarProdutosAssociados(): Promise<void>
Carrega os produtos associados a um cliente selecionado. Atualiza as listas produtosAssociados e produtosDisponiveis.

- associarProdutoSelecionado(): Promise<void>
Associa o produto selecionado ao cliente selecionado. Atualiza as listas de produtos associados e disponíveis.

- associarProduto(produtoId: number): Promise<void>
Associa um produto específico ao cliente selecionado. Atualiza as listas de produtos associados e disponíveis e exibe uma mensagem de sucesso.

- desassociarProduto(produtoId: number): Promise<void>
Desassocia um produto do cliente selecionado. Atualiza as listas de produtos associados e disponíveis.

- tratarErro(error: Error): void
Exibe mensagens de erro no console.

- salvarLocalStorage(): void
Converte objetos reativos para objetos simples e salva no armazenamento local (localStorage), atualizando as listas de clientes, produtos e produtos associados.

### Orientação a Objetos, SOLID e Design Patterns
O código segue princípios da orientação a objetos, especialmente no uso de objetos para representar clientes e produtos, e na utilização de métodos específicos para realizar operações relacionadas a essas entidades.

O SOLID é considerado no código, especialmente nos princípios de responsabilidade única e dependência invertida. Cada método tem uma responsabilidade única e as dependências são injetadas quando necessário.

Não há evidências de design patterns específicos neste código, mas os conceitos SOLID e a orientação a objetos são aplicados de maneira clara e organizada.


### Mock Service
Este é um serviço simulado (MockService) que fornece métodos para manipular dados fictícios de clientes e produtos. Abaixo estão descritos os métodos, a orientação a objetos, SOLID e design patterns utilizados no código.

### Métodos
Métodos relacionados a Clientes
- salvarCliente(cliente: Object): Promise<Object>
Cria e salva um novo cliente com um ID gerado aleatoriamente.

- listarClientes(): Promise<Array<Object>>
Retorna uma cópia da lista de clientes.

- obterClientePorId(clienteId: number): Promise<Object>
Obtém um cliente específico com base no ID.

- editarCliente(clienteId: number, novoCliente: Object): Promise<Object>
Edita um cliente existente com base no ID.

- desativarCliente(clienteId: number): Promise<boolean>
Desativa um cliente existente com base no ID.

- obterClientes(): Promise<Array<Object>>
Retorna uma cópia da lista de clientes.

### Métodos relacionados a Produtos
- salvarProduto(produto: Object): Promise<Object>
Cria e salva um novo produto com um ID gerado aleatoriamente.
- listarProdutos(): Promise<Array<Object>>
Retorna uma cópia da lista de produtos.
- obterProdutoPorId(produtoId: number): Promise<Object>
Obtém um produto específico com base no ID.
- editarProduto(produtoId: number, novoProduto: Object): Promise<Object>
Edita um produto existente com base no ID.
- atualizarProduto(produtoId: number, novosDadosProduto: Object): Promise<Object>
Atualiza um produto existente com base no ID, modificando apenas os campos fornecidos em novosDadosProduto.
- ativarDesativarProduto(produtoId: number): Promise<Object>
Ativa ou desativa um produto existente com base no ID.
- obterProdutos(): Promise<Array<Object>>
Retorna uma cópia da lista de produtos.

### Métodos relacionados à Associação de Produtos e Clientes
- associarProdutoAoCliente(clienteId: number, produtoId: number): Promise<boolean>
Associa um produto a um cliente, verificando se o produto já está associado.

- desassociarProdutoDoCliente(clienteId: number, produtoId: number): Promise<boolean>
Desassocia um produto de um cliente.

- obterProdutosAssociados(clienteId: number): Promise<Array<Object>
Obtém os produtos associados a um cliente.

- obterProdutosNaoAssociados(clienteId: number): Promise<Array<Object>
Obtém os produtos que não estão associados a um cliente.

### Orientação a Objetos, SOLID e Design Patterns
O código segue os princípios da orientação a objetos, com a criação de uma classe MockService que encapsula a lógica de manipulação de dados de clientes e produtos.

Quanto aos princípios SOLID, a classe MockService apresenta métodos específicos e responsabilidades únicas para cada operação. Além disso, é possível destacar o uso de injeção de dependência nos métodos, facilitando a manutenção e a extensibilidade.

Não há evidências claras de design patterns específicos neste código, mas a estrutura adotada reflete conceitos sólidos da programação orientada a objetos.

### Conclusão
O projeto Vue.js reflete um compromisso com as melhores práticas de desenvolvimento, proporcionando uma base sólida para a construção de aplicativos web escaláveis e de alta qualidade. A arquitetura, a organização do código e a aplicação de conceitos como orientação a objetos e princípios SOLID demonstram a busca pela excelência no desenvolvimento de software.

### Autor:
Emerson Amorim
