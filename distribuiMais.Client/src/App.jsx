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
  const generateLink = (source, target, street, pesos) => {
    return {
      source: source,
      target: target,
      street: street,
      label: pesos
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
  const [streetDestinations, setStreetDestinations] = useState({});
  const [selectedDestination, setSelectedDestination] = useState(null);


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

  // Funções auxiliares
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
  
  // Handlers de eventos
  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  // Montar grafo com todas as rotas
  const handleVertex = () => {
    const aux = [];
    aux.push(generateNodeObject(center[0]?.nome));
    destinations.forEach((destination) => {
      aux.push(generateNodeObject(destination.nome))
    })
    setVertexData(aux);
  };

  const montarDestinationAux = () => {
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
    return destinationAux;
  };

  const streetDict = (destinationAux) => {
    const newStreetDict = {};
    destinationAux.forEach(item => {
      item.streets.forEach(street => {
        if (!newStreetDict[street]) {
          newStreetDict[street] = [];
        }
        newStreetDict[street].push(item.id);
      });
    });
    return newStreetDict;
  };

  const handleEdge = () => {
    let destinationAux = montarDestinationAux();

    const newStreetDict = streetDict(destinationAux);
    setStreetDestinations(newStreetDict);

    // Passo 2: Criar os pares source-target incluindo a street
    const pairs = [];
    Object.keys(newStreetDict).forEach(street => {
      const ids = newStreetDict[street];
      if (ids.length > 1) {
        for (let i = 0; i < ids.length; i++) {
          for (let j = i + 1; j < ids.length; j++) {
            pairs.push(generateLink(findDestinationById(ids[i]).nome, findDestinationById(ids[j]).nome, parseInt(street), findStreetById(street).tempo));
          }
        }
      } else {
        pairs.push(generateLink(center[0].nome, findDestinationById(ids[0]).nome, parseInt(street), findStreetById(street).tempo))
      }
    });
    
    setEdgeData(pairs);
  };

  // Montar grafo com menor caminho
  const handleVertexD = (resultado) => {
    const aux = [];
    resultado.forEach((destination) => {
      aux.push(generateNodeObject(destination.nome))
    })
    setVertexDataD(aux);
  };

  const updateDijkstra = () => {
    // Monta objeto para executar o dikjstra
    const objVerticesDijkstra = MontarObjetoDijkstra(streetDestinations);
    // Executa o dijkstra
    const resultadoDijkstra = ExecutarDijkstra(objVerticesDijkstra, "cd", selectedDestination);
    
    handleVertexD(resultadoDijkstra)
    const pairsD = [];
    for (let i = 0; i < resultadoDijkstra.length - 1; i++) {
      let idStreet = findStreetByVertices(resultadoDijkstra[i].nome, resultadoDijkstra[i + 1].nome)
      pairsD.push(generateLink(resultadoDijkstra[i].nome, resultadoDijkstra[i + 1].nome, idStreet, findStreetById(idStreet).tempo));
    }
    // Resultado
    setEdgeDataD(pairsD);
  };

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

    return verticesDijkstra;
  }

  function ExecutarDijkstra(vertices, inicio, fim) {
    const grafo = new Grafo()
    
    vertices.forEach(vertice => {
      let vertice1 = grafo.insereVertice(vertice.vertice1)
      let vertice2 = grafo.insereVertice(vertice.vertice2)
      grafo.insereAresta(vertice1, vertice2, vertice.peso)
    });

    const verticeInicio = grafo.getVertice(inicio)
    const verticeFim = grafo.getVertice(fim)
    const resultado = grafo.dijkstra(verticeInicio, verticeFim)
    return resultado;
  }

  // Renderização
  return (
    <>
      <Menu></Menu>
      <div className="app-container">
        <div>
          <h1>Todas as rotas</h1>
          <GraphComponent width={800} height={600} graphId={"graph-id"} vertexes={vertexData} edges={edgeData} />
        </div>
        <div className="right-app-container" style={{ margin: "0 2rem" }}>
          <div style={{ marginTop: "3rem" }}>
            <Select label="Destino" options={destinations.filter(destination => destination.farmacia == 1)} onChange={handleDestinationChange} />
            <Select label="Medicamento" options={drugs} />
            <button style={{ margin: "2rem" }} onClick={updateDijkstra}>Atualizar</button>
            <button style={{ margin: "2rem" }}>Cancelar</button>
          </div>
          <GraphComponent label={"Resultado"} width={400} height={300} graphId={"result-graph-id"} vertexes={vertexDataD} edges={edgeDataD} />
        </div>
      </div>
    </>
  );
}

export default App;
