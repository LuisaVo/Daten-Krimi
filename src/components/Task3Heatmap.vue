<template>
  <div>
    <h2>Task 3: Locate the Hiding Place</h2>
    <p>Use the heatmap below to identify where the criminals are hiding.</p>
    <div id="heatmap"></div>
  </div>
  <div class="navigation">
      <button @click="$router.push('/Daten-Krimi/')">Back to Landing Page</button>
      <button @click="$router.push('/Daten-Krimi/task2')">Previous Task</button>
      <button @click="$router.push('/Daten-Krimi/task4')">Next Task</button>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  mounted() {
    const data = [
      [0, 0, 10, 30, 50],
      [20, 50, 70, 80, 90],
      [10, 30, 50, 70, 100],
      [30, 50, 90, 60, 40],
      [40, 30, 20, 10, 5], // Criminals hide here
    ];
    const width = 400;
    const height = 400;

    const colorScale = d3
      .scaleSequential(d3.interpolateReds)
      .domain([0, 100]);

    const svg = d3
      .select("#heatmap")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const gridSize = width / data.length;

    data.forEach((row, i) => {
      row.forEach((value, j) => {
        svg
          .append("rect")
          .attr("x", j * gridSize)
          .attr("y", i * gridSize)
          .attr("width", gridSize)
          .attr("height", gridSize)
          .attr("fill", colorScale(value));
      });
    });
  },
};
</script>

<style>
#heatmap {
  max-width: 400px;
  margin: 20px auto;
}
</style>
