# Blog Backend

**Descrição**: API para o meu blog, incluindo funcionalidades para exibir a palavra do dia.

## 🌟 Funcionalidades
- Exibir a palavra do dia usando scrapping de um site externo.
- Gerenciamento de dados com suporte a banco de dados.
- Logs detalhados para monitoramento.
- Configuração de ambiente para diferentes ambientes (desenvolvimento, produção, etc.).

## 🚀 Tecnologias Utilizadas
- **TypeScript**: Linguagem principal para o desenvolvimento.
- **Express**: Framework para criação da API.
- **Cheerio**: Utilizado para scrapping de dados.
- **Axios**: Para realizar requisições HTTP.
- **Pino**: Para logs eficientes.
- **Prisma**: ORM para banco de dados.
- **Mongoose**: Para integração com MongoDB.


## 🛠️ Configuração e Execução

### Pré-requisitos
Certifique-se de ter instalado:
- Node.js (versão 14 ou superior)
- Yarn ou npm

### Instalação
1. Clone o repositório:
```bash
git clone https://github.com/parlandin/blog-backend.git
```
2. Instale as dependências:
```bash
yarn install
# ou 
npm install
```

### Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
env
```bash
SCRAPPER_WORD_OF_DAY_URL = <URL do site para scraping>
DATABASE_URL= <URL do banco de dados>
```
### Rodando o projeto
Para ambiente de desenvolvimento:

```bash
yarn dev
```

Para ambiente de produção:
```bash
 yarn start
```

## ⚙️ Scripts Disponíveis

    dev: Inicia o servidor em modo de desenvolvimento.
    prisma:generate: Gera os arquivos do Prisma.
    prisma:migrate: Aplica as migrações no banco de dados.
    prisma:studio: Abre a interface do Prisma Studio.
    build: Compila o código TypeScript para JavaScript.

## 📝 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

Desenvolvido por parlandin ❤️
