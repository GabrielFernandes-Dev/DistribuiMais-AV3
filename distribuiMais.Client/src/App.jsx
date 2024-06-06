import { useEffect, useState } from "react";
import "./public/css/App.css";
import GraphComponent from "./components/Graph";
import Menu from "./components/Menu";
import Select from "./components/Select";
import { generateAPIHandler, setInitialData } from "./utils/utils";
import { Grafo } from "./utils/Grafo";

function App() {
  const generateNodeObject = (id, x, y) => {
    return {
      id: id,
      x: x,
      y: y,
    };
  };
  const generateLink = (source, target, street) => {
    return {
      source: source,
      target: target,
      street: street
    };
  };

  const [vertexData, setVertexData] = useState([]);
  const [edgeData, setEdgeData] = useState([]);
  const [vertexDataD, setVertexDataD] = useState([]);
  const [edgeDataD, setEdgeDataD] = useState([]);
  const [streets, setStreets] = useState([]);
  const [streetLinks, setStreetLinks] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [center, setCenter] = useState([]);
  const [centerStreets, setCenterStreets] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [stock, setStock] = useState([]);


  useEffect(() => {
    const apiHandlers = [
      generateAPIHandler("centrodistribuicaohasrua", setCenterStreets),
      generateAPIHandler("medicamento", setDrugs),
      generateAPIHandler("destino", setDestinations),
      generateAPIHandler("centrodistribuicao", setCenter),
      generateAPIHandler("rua", setStreets),
      generateAPIHandler("destinohasrua", setStreetLinks),
      generateAPIHandler("estoque", setStock)
    ];
    setInitialData(apiHandlers);
  }, []);

  useEffect(() => {
    if (destinations.length > 0 && streetLinks.length > 0 && center.length > 0) {
      handleVertex();
      handleEdge();
    }
  }, [center, destinations, streetLinks])

  const findDestinationById = (id) => {
    return destinations.filter(destination => destination.iddestino == id)[0];
  }

  const findStreetById = (id) => {
    return streets.filter(street => street.idrua == id)[0];
  }

  const findDestinationIdByName = (name) => { 
    if (name === center[0]?.nome) {
      return center[0];
    }
    return destinations.filter(destination => destination.nome == name)[0].iddestino;
  }

  const findStreetByVertices = (source, target) => {
    const sourceId = findDestinationIdByName(source);
    const targetId = findDestinationIdByName(target);
  
    let sourceLinks
    if (sourceId.idcentrodistribuicao == undefined) {
      sourceLinks = streetLinks.filter(link => link.destino_iddestino == sourceId);
    }
    else {
      sourceLinks = centerStreets.filter(link => link.centrodistribuicao_idcentrodistribuicao == sourceId.idcentrodistribuicao);
    }
    
    const targetLinks = streetLinks.filter(link => link.destino_iddestino == targetId);
  
    for (let sourceLink of sourceLinks) {
      for (let targetLink of targetLinks) {
        if (sourceLink.rua_idrua === targetLink.rua_idrua) {
          return sourceLink.rua_idrua;
        }
      }
    }
    return null; // Retorna null se nenhum link comum for encontrado
  };

  const handleVertex = () => {
    const aux = [];
    aux.push(generateNodeObject(center[0]?.nome));
    destinations.forEach((destination) => {
      aux.push(generateNodeObject(destination.nome))
    })
    setVertexData(aux);
  }

  const handleVertexD = (resultado) => {
    const aux = [];
    resultado.forEach((destination) => {
      aux.push(generateNodeObject(destination.nome))
    })
    setVertexDataD(aux);
  }

  const handleEdge = () => {
    let destinationAux = destinations.map((destination) => {
      return {
        ...destination,
        streets: []
      }
    });

    streetLinks.forEach((link) => {
      const destination = link.destino_iddestino;
      const street = link.rua_idrua;
      destinationAux.filter((item) => item.iddestino == destination)[0].streets.push(street);
    });

    destinationAux = destinationAux.map((item) => {
      return {
        id: item.iddestino,
        streets: item.streets
      }
    });

    const streetDict = {};
    destinationAux.forEach(item => {
      item.streets.forEach(street => {
        if (!streetDict[street]) {
          streetDict[street] = [];
        }
        streetDict[street].push(item.id);
      });
    });

    // Passo 2: Criar os pares source-target incluindo a street
    const pairs = [];
    Object.keys(streetDict).forEach(street => {
      const ids = streetDict[street];
      // console.log(ids);
      if (ids.length > 1) {
        for (let i = 0; i < ids.length; i++) {
          for (let j = i + 1; j < ids.length; j++) {
            pairs.push(generateLink(findDestinationById(ids[i]).nome, findDestinationById(ids[j]).nome, parseInt(street)));
          }
        }
      } else {
        pairs.push(generateLink(center[0].nome, findDestinationById(ids[0]).nome, parseInt(street)))
      }
    });
    
    // Monta objeto para executar o dikjstra
    const objVerticesDijkstra = MontarObjetoDijkstra(streetDict);
    // Executa o dijkstra
    const resultadoDijkstra = ExecutarDijkstra(objVerticesDijkstra, "cd", "f5"); // TODO - Alterar para pegar o destino selecionado ("f5" está fixo precisa vir do select destino)

    handleVertexD(resultadoDijkstra)
    const pairsD = [];
    for (let i = 0; i < resultadoDijkstra.length - 1; i++) {
      pairsD.push(generateLink(resultadoDijkstra[i].nome, resultadoDijkstra[i + 1].nome, findStreetByVertices(resultadoDijkstra[i].nome, resultadoDijkstra[i + 1].nome)));
    }

    console.log("Olhando pares do dijkstra retornados na montagem");
    console.log(pairsD);

    // Resultado
    setEdgeData(pairs);
    setEdgeDataD(pairsD);
  }

  function MontarObjetoDijkstra(streetDict) {
    const verticesDijkstra = []
    Object.keys(streetDict).forEach(street => {
      const ids = streetDict[street];
      if (ids.length > 1) {
        for (let i = 0; i < ids.length; i++) {
          for (let j = i + 1; j < ids.length; j++) {
            const adjacencia = {
              vertice1: findDestinationById(ids[i]).nome,
              vertice2: findDestinationById(ids[j]).nome,
              peso: findStreetById(parseInt(street)).tempo
            }
            verticesDijkstra.push(adjacencia);

            const adjacencia2 = {
              vertice1: findDestinationById(ids[j]).nome,
              vertice2: findDestinationById(ids[i]).nome,
              peso: findStreetById(parseInt(street)).tempo
            }
            verticesDijkstra.push(adjacencia2);
          }
        }
      } else {
        const adjacencia = {
          vertice1: center[0].nome,
          vertice2: findDestinationById(ids[0]).nome,
          peso: findStreetById(parseInt(street)).tempo
        }
        verticesDijkstra.push(adjacencia);

        const adjacencia2 = {
          vertice1: findDestinationById(ids[0]).nome,
          vertice2: center[0].nome,
          peso: findStreetById(parseInt(street)).tempo
        }
        verticesDijkstra.push(adjacencia2);
      }
    })

    // console.log("Olhando vértices do dijkstra retornados na montagem");
    // console.log(verticesDijkstra)
    return verticesDijkstra;
  }

  function ExecutarDijkstra(vertices, inicio, fim) {
    const grafo = new Grafo()
    
    console.log("Construir grafo");
    vertices.forEach(vertice => {
      let vertice1 = grafo.insereVertice(vertice.vertice1)
      let vertice2 = grafo.insereVertice(vertice.vertice2)
      grafo.insereAresta(vertice1, vertice2, vertice.peso)
      //console.log("Olhando grafo: " + grafo.vertices[0].adjacencia[0].vertice.nome);
    });

    const verticeInicio = grafo.getVertice(inicio)
    const verticeFim = grafo.getVertice(fim)
    const resultado = grafo.dijkstra(verticeInicio, verticeFim)
    console.log("Resultado");
    for(let v = 0; v < resultado.length; v++){
      console.log(resultado[v].nome)
    }
    console.log("Fim resultado");
    return resultado;
  }

  return (
    <>
      <Menu></Menu>
      <div className="app-container">
        <div>
          <h1>Todas as rotas</h1>
          <GraphComponent width={800} height={600} graphId={"graph-id"} vertexes={vertexData} edges={edgeData} />
        </div>
        <div className="right-app-container" style={{ margin: "0 2rem" }}>
          <div>
            <Select label="Destino" options={destinations} />
            <Select label="Medicamento" options={drugs} />
            <button style={{ margin: "2rem" }}>Atualizar</button>
            <button style={{ margin: "2rem" }}>Cancelar</button>
          </div>
          <GraphComponent label={"Resultado"} width={400} height={300} graphId={"result-graph-id"} vertexes={vertexDataD} edges={edgeDataD} /> // TODO - Alterar para pegar o destino selecionado e mostrar apenas após clicar em atualizar
        </div>
      </div>
    </>
  );
}

export default App;
