<script setup>
import { onMounted } from 'vue'
import * as d3 from 'd3'
import { useGraphData } from '../../stores/graphData'

const graphData = useGraphData()

// let tickCounter = 0
// let maxTicks = 100
onMounted(async () => {
    const container = document.getElementById('graphContainer')
    const containerWidth = container.getBoundingClientRect().width
    const containerHeight = container.getBoundingClientRect().height
    const nodes = JSON.parse(JSON.stringify(graphData.graphNodes))
    const edges = JSON.parse(JSON.stringify(graphData.graphEdges))

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 928 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom
    // append the svg object to the body of the page
    var svg = d3
        .select('#graphContainer')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('class', 'graph-svg')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    var link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll()
        .data(edges)
        .join('line')
    var node = svg
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 5)
        .style('fill', (d) => color(d.Community))

    node.append('title').text((d) => d.id)
    node.call(
        d3
            .drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded)
    )
    function dragStarted(event, d) {
        // maxTicks++
        if (!event.active) simulation.alphaTarget(0.3).restart() // Restarts the simulation with a low alpha target
        d.fx = d.x // Fix the node's position
        d.fy = d.y
    }

    function dragged(event, d) {
        // maxTicks++
        d.fx = event.x // Update the node's fixed position
        d.fy = event.y
    }

    function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0) // Set the alpha target back to 0
        // Optionally, uncomment the next two lines to unfix the position after dragging
        // d.fx = null;
        // d.fy = null;
    }
    var simulation = d3
        .forceSimulation(nodes) // Force algorithm is applied to data.nodes
        .force(
            'link',
            d3
                .forceLink(edges) // This force provides links between nodes
                .id(function (d) {
                    return d.id
                }) // This provide  the id of a node
        )
        .force('charge', d3.forceManyBody().strength(-20)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('tick', ticked) // This force attracts nodes to the center of the svg area

    function determineCharge(nodesLength) {
        let outputNum = -1
        if (nodesLength < 100) {
            outputNum = -400
        } else if (nodesLength >= 100 && nodesLength < 500) {
            outputNum = -100
        } else if (nodesLength >= 500 && nodesLength < 1000) {
            outputNum = -10
        } else {
            outputNum = -1
        }
        return outputNum
    }

    // This function is run at each iteration of the force algorithm, updating the nodes position.
    function ticked() {
        // tickCounter++
        // if (tickCounter > maxTicks) {
        //     simulation.stop()
        // }
        link.attr('x1', function (d) {
            return d.source.x
        })
            .attr('y1', function (d) {
                return d.source.y
            })
            .attr('x2', function (d) {
                return d.target.x
            })
            .attr('y2', function (d) {
                return d.target.y
            })

        node.attr('cx', function (d) {
            return d.x
        }).attr('cy', function (d) {
            return d.y
        })
    }
    simulation.alphaTarget(0.3)
    var zoom = d3.zoom().on('zoom', (event) => {
        svg.attr('transform', event.transform)
    })

    d3.select('svg').call(zoom)
    function setInitialZoom() {
        console.log('setting zoom')
        // this function needs to be written to find the size of the graph and set the svg to fit the graph
    }
})
</script>

<template>
    <div id="graphContainer"></div>
</template>

<style>
#graphContainer {
    width: 100%;
    padding: 0% 5%;
    height: 85vh;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.graph-svg {
    background-color: rgba(0, 0, 0, 0.8);
}
</style>
