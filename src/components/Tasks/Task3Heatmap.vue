<template>
      <DefaultTask>
      <template #description>
          <h1>Task 1: Identify the Villain</h1>
          <p>Analyze the scatterplot matrix below to find the outlier—this is the villain!</p>
          </template>
      <template #explanation>
          <h1>Scatterplot</h1>
          <p>Scatterplotexplanation</p>
          </template>
      <template #chart>
        <div>
          <h2>Task 3: Locate the Hiding Place</h2>
          <p>Use the heatmap below to identify where the criminals are hiding.</p>
          <div id="heatmap"></div>
        </div>
        </template>
        </DefaultTask>
</template>

<script>
import DefaultTask from "@/components/Tasks/DefaultTask.vue";
import * as d3 from "d3";

export default {
  components: { DefaultTask},
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
