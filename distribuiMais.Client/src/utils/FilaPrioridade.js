export class FilaPrioridade {
    constructor() {
        this.fila = [];
    }

    enfileirar(vertice) {
        this.fila.push(vertice);
        this.fila.sort((a, b) => a.distancia - b.distancia); // Ordenar por distância
    }

    desenfileirar() {
        return this.fila.shift();
    }

    isEmpty() {
        return this.fila.length === 0;
    }

    atualizarFila(verticeAtualizado) {
        // Remover vértice antigo da fila
        this.fila = this.fila.filter(v => v.nome !== verticeAtualizado.nome);
        // Adicionar vértice atualizado
        this.enfileirar(verticeAtualizado);
    }
}
