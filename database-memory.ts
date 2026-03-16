import { randomUUID } from "node:crypto" // Módulo nativo do Node para geração de IDs únicos (UUID)

// DEFINIÇÃO DE TIPOS (TypeScript)
// Branded Type: Uma técnica avançada para garantir que um ID de Post não seja confundido com uma string comum
export type IdPost = string & {readonly __brand: unique symbol} 

// Interface que define a estrutura de um Post no sistema
export interface Post {
    publicationDate: string,
    postContent: string,
    likeNumbers: number,
}

// CLASSE DE BANCO DE DADOS EM MEMÓRIA
export class DataBase {
    // Uso do '#' para tornar a propriedade privada (Encapsulamento). 
    // O Map é escolhido pela performance superior ao buscar/deletar itens por chave.
    #posts = new Map<IdPost, Post>()

    // Método para listar todos os posts convertendo o Map em um Array formatado
    list() {
        // entries() retorna um iterador de [chave, valor]
        return Array.from(this.#posts.entries()).map((postArray) => {
            const id = postArray[0]; // A chave do Map (IdPost)
            const data = postArray[1]; // O valor do Map (Objeto Post)

            // Retorna um objeto unindo o ID com os dados do post (Spread operator)
            return { id, ...data }
        })
    }

    // Método para criar um novo post gerando um ID aleatório
    create(post: Post) {
        // randomUUID() gera um identificador único universal
        const idpost = randomUUID() as IdPost;

        // Salva no Map associando o ID ao objeto post
        return this.#posts.set(idpost, post)
    }

    // Método para atualizar um post existente substituindo os dados no Map
    update(idpost: IdPost, post: Post) {
        this.#posts.set(idpost, post)
    }

    // Método para remover um post do Map através do seu ID
    delete(idpost: IdPost) {
        this.#posts.delete(idpost)
    }
}