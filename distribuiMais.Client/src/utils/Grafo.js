import { Vertice } from "./Vertice";
import { FilaPrioridade } from "./FilaPrioridade";

export class Grafo {
    constructor() {
        this.vertices = [];
    }

    insereVertice(nome) {
        let vertice = this.vertices.find(v => v.nome === nome);
        if (!vertice) {
            vertice = new Vertice(nome);
            this.vertices.push(vertice);
        }
        return vertice;
    }

    insereAresta(nome1, nome2, peso) {
        const vertice1 = this.insereVertice(nome1);
        const vertice2 = this.insereVertice(nome2);
        vertice1.insereAdjacencia(vertice2, peso);
        vertice2.insereAdjacencia(vertice1, peso); // Assumindo grafo não direcionado
    }

    dijkstra(inicioNome, fimNome) {
        const inicio = this.getVertice(inicioNome);
        const fim = this.getVertice(fimNome);

        // Inicializar fonte única
        for (let vertice of this.vertices) {
            vertice.distancia = Number.MAX_SAFE_INTEGER;
            vertice.pai = null;
        }
        inicio.distancia = 0;

        const Q = new FilaPrioridade();
        Q.enfileirar(inicio);

        while (!Q.isEmpty()) {
            const u = Q.desenfileirar();

            for (let { vertice: v, peso } of u.adjacencia) {
                // Passo de relaxamento
                if (parseInt(u.distancia) + parseInt(peso) < parseInt(v.distancia)) {
                    v.distancia = parseInt(u.distancia) + parseInt(peso);
                    v.pai = u;
                    Q.atualizarFila(v);
                }
            }
        }

        // Reconstruir o menor caminho
        let caminhoMinimo = [];
        let atual = fim;
        while (atual !== null) {
            caminhoMinimo.push(atual);
            atual = atual.pai;
        }
        caminhoMinimo.reverse();

        return caminhoMinimo.map(v => v.nome);
    }

    getVertice(nome) {
        return this.vertices.find(v => v.nome === nome);
    }
}
