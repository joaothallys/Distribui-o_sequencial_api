# Distribuição de contatos via api

Este script Node.js lê um arquivo CSV contendo IDs de contato, e para cada contato, realiza uma requisição POST para uma API, utilizando o módulo `axios`. A cada requisição, o script aguarda 5 segundos antes de prosseguir para a próxima, para evitar sobrecarga no servidor.

## Pré-requisitos

- Node.js (v14 ou superior)
- NPM (v6 ou superior)
- Arquivo `contatos.csv` no mesmo diretório do script, contendo os IDs dos contatos.

## Instalação

1. **Clone o repositório ou copie o código para o seu projeto:**

   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd <NOME_DO_SEU_PROJETO>
   ```

2. **Instale as dependências necessárias:**

   O script utiliza os pacotes `axios` e `neat-csv`. Você pode instalá-los usando o NPM:

   ```bash
   npm node install
   npm install axios neat-csv
   ```

## Uso

1. **Configuração do arquivo CSV:**

   O arquivo `contatos.csv` deve estar no mesmo diretório que o script e deve conter uma coluna chamada `contactsID`, que armazena os IDs dos contatos que serão utilizados nas requisições.

2. **Configuração do `customer_id` na URL:**

   No código, substitua `'Customer_id'` na URL pelo valor do `customer_id` correspondente ao cliente para o qual você deseja fazer as requisições:

   ```javascript
   const baseUrl =
     "https://app.poli.digital/api/v1/customers/Customer_id/contacts/redirect/contacts/";
   ```

   Certifique-se de que o `customer_id` correto seja usado para garantir que as requisições sejam feitas ao cliente certo.

3. **Configuração do Token de Autenticação:**

   Substitua `'seu_token'` pelo token de autenticação da API que você deseja acessar:

   ```javascript
   const token = "seu_token";
   ```

4. **Execução do Script:**

   Para rodar o script, use o seguinte comando no terminal:

   ```bash
   node <NOME_DO_SEU_SCRIPT>.js
   ```

   O script irá:

   - Ler o arquivo CSV
   - Para cada contato, fará uma requisição POST para a API especificada
   - Exibirá no console a resposta da API ou um erro, caso ocorra

5. **Configuração dos IDs de Usuários:**

   O array `userIDs` no código contém os IDs de usuários que serão utilizados nas requisições. Ele alternará entre esses IDs durante as requisições:

   ```javascript
   const userIDs = ["user_id", "user_id"];
   ```

   Substitua `'user_id'` pelos IDs reais de usuários conforme necessário.

## Personalização

Se você precisar extrair diferentes campos da resposta da API, modifique a função `extractFieldsFromResponse` para incluir os campos desejados:

```javascript
function extractFieldsFromResponse(data) {
  return {
    customer_id: data.customer_id,
    channel_id: data.channel_id,
    contact_id: data.contact_id,
    origin_id: data.origin_id,
  };
}
```

## Notas

- **Atraso Entre Requisições:** Um atraso de 5 segundos foi adicionado entre cada requisição para evitar sobrecarga da API. Este atraso pode ser ajustado conforme necessário.
- **Tratamento de Erros:** O script trata os erros de leitura do CSV e das requisições, exibindo uma mensagem de erro no console para cada falha.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---
