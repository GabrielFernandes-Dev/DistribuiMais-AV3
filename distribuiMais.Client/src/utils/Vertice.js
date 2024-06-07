export class Vertice {
    constructor(nome) {
        this.nome = nome;
        this.distancia = Number.MAX_SAFE_INTEGER; // Distância da origem
        this.pai = null; // Pai na árvore de menor caminho
        this.adjacencia = []; // Vértices adjacentes
    }

    insereAdjacencia(vertice, peso) {
        this.adjacencia.push({ vertice, peso });
    }
}
