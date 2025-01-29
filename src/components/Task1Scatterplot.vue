<template>
  <div>
    <h2>Task 1: Identify the Villain</h2>
    <p>Analyze the scatterplot matrix below to find the outlier. The villain is the outlier!</p>
    <div id="scatterplot"></div>
  </div>
  <div class="navigation">
      <button @click="$router.push('/Daten-Krimi/')">Back to Landing Page</button>
      <button @click="$router.push('/Daten-Krimi/task2')">Next Task</button>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  mounted() {
    const data = [
      { attr1: 10, attr2: 20, attr3: 30, attr4: 40 },
      { attr1: 11, attr2: 21, attr3: 31, attr4: 41 },
      { attr1: 10.5, attr2: 20.5, attr3: 30.5, attr4: 40.5 },
      { attr1: 100, attr2: 200, attr3: 300, attr4: 400 }, // Outlier
      { attr1: 12, attr2: 22, attr3: 32, attr4: 42 },
    ];
    const size = 150;
    const padding = 30;
    const keys = Object.keys(data[0]);
    const n = keys.length;

    const scales = {};
    keys.forEach((key) => {
      scales[key] = d3.scaleLinear()
        .domain(d3.extent(data, (d) => d[key]))
        .range([padding, size - padding]);
    });

    const svg = d3.select('#scatterplot')
      .append('svg')
      .attr('width', size * n)
      .attr('height', size * n);

    keys.forEach((xKey, i) => {
      keys.forEach((yKey, j) => {
        const cell = svg.append('g')
          .attr('transform', `translate(${i * size}, ${j * size})`);

        cell.append('rect')
          .attr('width', size)
          .attr('height', size)
          .attr('fill', '#f9f9f9')
          .attr('stroke', '#ddd');

        if (xKey !== yKey) {
          cell.selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', (d) => scales[xKey](d[xKey]))
            .attr('cy', (d) => size - scales[yKey](d[yKey]))
            .attr('r', 5)
            .attr('fill', (d) => (d.attr1 === 100 ? 'red' : 'steelblue'));
        }
      });
    });
  },
};
</script>

<style>
#scatterplot {
  margin: 20px;
}
</style>
