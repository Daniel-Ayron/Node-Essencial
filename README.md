# 🚀 Estudo de API REST: Gerenciamento de Posts

Este projeto foi desenvolvido como um exercício prático para consolidar fundamentos de **Node.js**, **Fastify** e **TypeScript**. O foco principal foi a criação de um sistema CRUD (Create, Read, Update, Delete) performático, utilizando boas práticas de tipagem e manipulação de dados em memória, baseado num estudo fornecido pelo canal Rocketseat.

---

## 🛠️ Tecnologias e Ferramentas

* **Node.js**: Ambiente de execução para JavaScript no servidor.
* **TypeScript**: Adição de tipagem estática para maior segurança e produtividade.
* **Fastify**: Micro-framework focado em performance extrema e baixa sobrecarga.
* **TSX**: Execução de arquivos TypeScript com suporte nativo a ESM.
* **Crypto (randomUUID)**: Geração de identificadores únicos universais.

---

## 🧠 Conceitos Aplicados

Durante o desenvolvimento, explorei conceitos que vão além do básico de uma API:

### 1. Branded Types (Tipagem Avançada)
Utilizei **Branded Types** para o `IdPost`. Isso garante que o TypeScript diferencie uma string comum de um ID de post legítimo, evitando erros de lógica onde um ID poderia ser confundido com qualquer outro texto.

### 2. Encapsulamento e Memória
Em vez de arrays simples, optei pelo uso de **Map** para o armazenamento em memória.
* **Performance**: O `Map` oferece uma busca (`get`) e remoção (`delete`) muito mais eficiente que um array.
* **Campos Privados**: A classe `DataBase` utiliza campos privados (`#posts`), garantindo que os dados só possam ser manipulados através dos métodos públicos definidos.

### 3. Semântica HTTP e Status Codes
A API segue os padrões da indústria para respostas:
* `201 Created`: Para criação de novos registros.
* `200 OK`: Para listagens com sucesso.
* `204 No Content`: Para atualizações e deleções, onde não há necessidade de retornar um corpo na resposta.

---

## 📁 Estrutura do Projeto

* `server.ts`: Configuração do servidor Fastify, definição das rotas e lógica de Request/Reply.
* `database-memory.ts`: Camada de persistência em memória, utilizando classes e tipagens robustas.

---

## 🚀 Como Executar

1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor em modo de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  O servidor estará rodando em: `http://localhost:3301`

