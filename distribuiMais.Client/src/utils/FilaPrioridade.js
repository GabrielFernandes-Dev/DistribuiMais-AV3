export class FilaPrioridade {
    constructor(){
        this.filaHeap = []
    }

    enfileirar(vertice){
        this.filaHeap.push(vertice)
    }

    desenfileirar(){
        return this.filaHeap.shift()
    }
}