import { Vertice } from "./Vertice";
import { FilaPrioridade } from "./FilaPrioridade";

export class Grafo {
    constructor(){
        this.vertices = []
    }

    insereVertice(nome){
        for(let i = 0; i < this.vertices.length; i++){
            if(this.vertices[i].nome == nome) return this.vertices[i]
        }
        const vertice = new Vertice(nome);
        this.vertices.push(vertice);
        return vertice
    }

    insereAresta(vertice1, vertice2, peso){
        for(let vertice of this.vertices){
            if(vertice.nome == vertice1.nome){
                vertice.insereAdjacencia({vertice : vertice2, peso : peso})
            }
        }
    }

    getVertice(nome) {
        return this.vertices.find(vertice => vertice.nome === nome);
    }

    dijkstra(inicio, fim){
        //Inicialize single source
        for(let vertice of this.vertices){
            vertice.chave = Number.MAX_SAFE_INTEGER
            vertice.pai = null
        }
        inicio.chave = 0

        let S = []
        let Q = new FilaPrioridade()
        let caminhoMinimo = []

        for(let i = 0; i < this.vertices.length; i++){
            Q.enfileirar(this.vertices[i])
        }
        
        while(Q.filaHeap.length != 0){

            let verticeMenorChave = Q.desenfileirar()
            S.push(verticeMenorChave)

            for(let i = 0; i < verticeMenorChave.adjacencia.length; i++){
                //relax
                if(verticeMenorChave.chave + verticeMenorChave.adjacencia[i].peso < verticeMenorChave.adjacencia[i].vertice.chave){
                    Q.filaHeap.forEach(q =>{
                        if(q.nome == verticeMenorChave.adjacencia[i].vertice.nome){
                            q.chave = verticeMenorChave.chave + verticeMenorChave.adjacencia[i].peso
                            q.pai = verticeMenorChave
                        }
                    })
                }
            }

            Q.filaHeap.sort((a,b) => a.chave - b.chave)
            
        }

        let K = []
        for(let a = 1; a < S.length; a++){ //sem pegar origem com pai nulo
            K.push(S[a])
        }

        let atual = fim
        while(atual && atual.pai != null){
            caminhoMinimo.push(atual)
            atual = K.find(k => k.nome == atual.pai.nome)
        }

        caminhoMinimo.push(inicio)
        caminhoMinimo.reverse()

        return caminhoMinimo
    }
}
