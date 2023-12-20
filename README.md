# Scrap-SimilarWeb

## Descrição

O Projeto Speedio Web Scraper API é uma API construída em Node.js utilizando o framework Express e Puppeteer para realizar scraping de informações de sites. A API permite a extração de dados de sites fornecendo a URL como entrada e retorna informações relevantes, como o país de origem dos visitantes.

## Como Usar

### Instalação

1. Clone este repositório:
   
   Pela chave HTTPS:
   
   ```bash
   git clone https://github.com/GabrielaMoura25/Scrap-SimilarWeb.git
   ```
   
   Pela chave SSH:
   
   ```bash
   git@github.com:GabrielaMoura25/Scrap-SimilarWeb.git
   ```

3. Navegue até o diretório do projeto:
   
   ```bash
   cd Scrap-SimilarWeb
   ```
   
5. Navegue até a pasta do projeto:
   
   ```bash
   cd similarweb-scraper-api
   ```
   
7. Instale as dependências:
   
   ```bash
   npm install
   ```

### Configuração

1. Certifique-se de ter o [Node.js](https://nodejs.org/) e o npm instalados.
2. Certifique-se de ter o [MongoDB](https://www.mongodb.com/) instalado localmente.

### Execução

1. Inicie a aplicação:
   
   ```bash
   npm run dev
   ```
   
3. Acesse a API usando ferramentas como o Postman ou Insomnia

## Rotas da API

### POST /salve_info

- Descrição: Essa rota recebe uma URL como entrada, realiza scraping das informações do site e salva os dados no banco de dados.
  
- Parâmetros da Solicitação (JSON):
  ```json
  {
    "url": "www.example.com"
  }
  ```
- Resposta de Sucesso(Exemplo):
  ```json
  {
    "status": "success",
    "message": "Data scraped successfully",
    "websiteId": "5f84aef3ab8b1345902fe869"
  }
  ```
- Resposta de Erro (Exemplo):
  ```json
  {
    "status": "error",
    "message": "Internal server error"
  }
  ```

### POST /get_info

- Descrição: Esta rota recebe uma URL como entrada, busca as informações do site no banco de dados e retorna-as. Se as informações ainda não estiverem disponíveis, retorna um código de erro.

- Parâmetros da Solicitação (JSON):
   ```json
  {
    "url": "www.example.com"
  }
    ```
- Resposta de Sucesso (Exemplo):
  ```json
  {
    "status": "success",
    "message": "Data retrieved successfully",
    "websiteInfo": {
      "_id": "5f84aef3ab8b1345902fe869",
      ...
    }
  }
  ```
- Resposta de Erro (exemplo):
  ```json
  {
    "status": "error",
    "message": "Website not found"
  }
  ```
## Aproveite!

Desenvolvido por Gabriela Moura, © 2023.

