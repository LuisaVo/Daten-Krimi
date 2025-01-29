<template>
  <div>
    <h2>Task 4: Disable the Timer</h2>
    <p>Analyze the network graph below to find the main switch with the most connections.</p>
    <div id="network"></div>
  </div>
  <div class="navigation">
      <button @click="$router.push('/Daten-Krimi/')">Back to Landing Page</button>
      <button @click="$router.push('/Daten-Krimi/task3')">Previous Task</button>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  mounted() {
    const nodes = [
      { id: "Switch A" },
      { id: "Switch B" },
      { id: "Switch C" },
      { id: "Switch D" },
      { id: "Switch E" }, // Most connected
    ];
    const links = [
      { source: "Switch A", target: "Switch B" },
      { source: "Switch A", target: "Switch C" },
      { source: "Switch B", target: "Switch C" },
      { source: "Switch C", target: "Switch E" },
      { source: "Switch D", target: "Switch E" },
    ];

    const width = 600;
    const height = 400;

    const svg = d3
      .select("#network")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#aaa");

    const node = svg
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", "#69b3a2");

    node.append("title").text((d) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  },
};
</script>

<style>
#network {
  max-width: 600px;
  margin: 20px auto;
}
</style>
