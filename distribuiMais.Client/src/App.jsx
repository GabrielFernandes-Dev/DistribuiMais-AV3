import { useEffect, useState } from "react";
import "./public/css/App.css";
import GraphComponent from "./components/Graph";
import Menu from "./components/Menu";
import Select from "./components/Select";
import { generateAPIHandler, setInitialData } from "./utils/utils";

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
  const [streets, setStreets] = useState([]);
  const [streetLinks, setStreetLinks] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [center, setCenter] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [stock, setStock] = useState([]);


  useEffect(() => {
    const apiHandlers = [
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
  const handleVertex = () => {
    const aux = [];
    aux.push(generateNodeObject(center[0]?.nome, 0, 0));
    destinations.forEach((destination, index) => {
      aux.push(generateNodeObject(destination.nome))
    })
    setVertexData(aux);
  }
  const handleEdge = () => {
    let destinationAux = destinations.map((destination) => {
      return {
        ...destination,
        streets: []
      }
    });
    streetLinks.forEach((link) => {
      console.log(destinationAux);
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
      console.log(ids);
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

    // Resultado
    console.log(pairs);
    setEdgeData(pairs);
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
          <GraphComponent label={"Resultado"} width={400} height={300} graphId={"result-graph-id"} vertexes={vertexData} edges={edgeData} />
        </div>
      </div>
    </>
  );
}

export default App;