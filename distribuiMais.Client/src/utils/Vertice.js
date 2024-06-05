export class Vertice {
    constructor(nome){
        this.nome = nome
        this.chave 
        this.pai 
        this.adjacencia = []
    }

    insereAdjacencia(vertice){
        this.adjacencia.push(vertice)
    }
}