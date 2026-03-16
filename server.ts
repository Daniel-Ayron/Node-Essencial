import {fastify} from 'fastify' // Importação do fastify, um micro framework focado em performance
import { DataBase, type IdPost, type Post } from './database-memory.js' // Importação do banco em memória e as tipagens de Post

const server = fastify(); // Criação da instância do servidor
const database = new DataBase(); // Inicialização do banco de dados (Map)

// ROTA DE CRIAÇÃO (POST)
// Usamos Generics <{Body: Post}> para garantir que o corpo da requisição siga a interface Post
server.post<{Body: Post}>('/posts', (request, reply) =>{
    const {publicationDate, postContent, likeNumbers} = request.body; // Desestruturação dos dados recebidos

    database.create({
        publicationDate,
        postContent,
        likeNumbers
    })

    // Retorna status 201 (Created) indicando que o recurso foi criado com sucesso
    return reply.status(201).send();
});

// ROTA DE LISTAGEM (GET)
server.get('/posts', (request, reply) =>{
  const posts = database.list(); // Busca todos os posts no banco

  return posts; // Por padrão, o Fastify já envia o status 200 (OK) e os dados em JSON
});

// ROTA DE ATUALIZAÇÃO (PUT)
// Passamos Body e Params no Generic para tipar tanto os dados novos quanto o ID na URL
server.put<{
    Body: Post,
    Params: {id: string}
}>('/posts/:id', (request, reply) => {
    const {publicationDate, postContent, likeNumbers} = request.body;
    const {id} = request.params; // Captura o ID da URL (:id)
    
    // Convertendo a string para IdPost (Branded Type) para garantir integridade no banco
    const postId = id as IdPost;

    database.update(postId, {
        publicationDate,
        postContent,
        likeNumbers
    })

    // Status 204 (No Content) indica sucesso, mas sem corpo na resposta (padrão em edições)
    return reply.status(204).send();
})

// ROTA DE EXCLUSÃO (DELETE)
server.delete<{Params: {id: string}}>('/posts/:id', (request, reply) => {
    const {id} = request.params;
    const postId = id as IdPost;

    database.delete(postId);

    // Status 204 (No Content) para confirmar a exclusão com sucesso
    return reply.status(204).send()
})

// INICIALIZAÇÃO DO SERVIDOR
server.listen({
    port: 3301 // Define a porta onde a API ficará ouvindo
}).then(() => {
    console.log("Servidor rodando em http://localhost:3301")
})