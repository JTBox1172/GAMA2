<script setup>
import { onMounted } from 'vue'
import * as d3 from 'd3'

const props = defineProps({
    nodes: {
        type: Array,
        required: true,
    },
    edges: {
        type: Array,
        required: true,
    },
})
let data = {
    nodes: props.nodes,
    links: props.edges,
}
let tickCounter = 0
let maxTicks = 100
onMounted(async () => {
    const container = document.getElementById('graphContainer')
    const containerWidth = container.getBoundingClientRect().width
    const containerHeight = container.getBoundingClientRect().height
    console.log(containerWidth)
    console.log(containerHeight)

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const links = data.links.map((d) => ({ ...d }))
    const nodes = data.nodes.map((d) => ({ ...d }))

    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 928 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom
    // append the svg object to the body of the page
    var svg = d3
        .select('#graphContainer')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('class','graph-svg')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    var link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll()
        .data(links)
        .join('line')
    var node = svg
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 5)
        .style('fill', (d) => color(d.community))

    node.append('title').text((d) => d.id)
    node.call(
        d3
            .drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded)
    )
    function dragStarted(event) {
        maxTicks = maxTicks + 100
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
    }
    // Update the subject (dragged node) position during drag.
    function dragged(event) {
        event.subject.fx = event.x
        event.subject.fy = event.y
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragEnded(event) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
    }
    var simulation = d3
        .forceSimulation(nodes) // Force algorithm is applied to data.nodes
        .force(
            'link',
            d3
                .forceLink(links) // This force provides links between nodes
                .id(function (d) {
                    return d.id
                }) // This provide  the id of a node
        )
        .force('charge', d3.forceManyBody()) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
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
        tickCounter++
        if (tickCounter > maxTicks) {
            simulation.stop()
        }
        console.log('ticked func running')
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
    var zoom = d3.zoom().on('zoom', (event) => {
        console.log('scroll event', event)
        svg.attr('transform', event.transform)
    })

    d3.select('svg').call(zoom)
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
.graph-svg{
    background-color: rgba(0,0,0,0.8);
}
</style>
