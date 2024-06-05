import { Graph } from "react-d3-graph";
import icon from '../assets/drugstore.svg';
import { useState } from "react";

function GraphComponent({graphId, vertexes, edges, width, height, label}) {
    // graph payload (with minimalist structure)
    console.log(vertexes);
    const data = {
        nodes: vertexes,
        links: edges
    };

    // the graph configuration, just override the ones you need
    const myConfig = {
        nodeHighlightBehavior: true,
        panAndZoom: true,
        node: {
            highlightStrokeColor: "blue",
            size: 300,
            svg: icon,
            fontColor: "#fff",
            fontSize: 16,
            highlightFontSize: 16,
            labelPosition: "top",
        },
        link: {
            highlightColor: "lightblue",
        },
        height: height,
        width: width,
        initialZoom: 1,
    };

    const onClickNode = function (nodeId) {
        window.alert(`Clicked node ${nodeId}`);
    };

    const onClickLink = function (source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    return (
        <div className="graph-container">
            {label && <label>{label}</label>}
            <Graph
                id={graphId} // id is mandatory
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
            />
        </div>
    )
}

export default GraphComponent;