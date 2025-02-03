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
            <!-- Toolbar for selecting X, Y, and color -->
            <div class="toolbar">
                <label>X-Axis:</label>
                <select v-model="selectedX">
                <option v-for="attr in numericalAttributes" :key="attr" :value="attr">{{ attr }}</option>
                </select>
        
                <label>Y-Axis:</label>
                <select v-model="selectedY">
                <option v-for="attr in numericalAttributes" :key="attr" :value="attr">{{ attr }}</option>
                </select>
        
                <label>Color By:</label>
                <select v-model="selectedColor">
                <option v-for="attr in categoricalAttributes" :key="attr" :value="attr">{{ attr }}</option>
                </select>
            </div>
        
            <!-- Scatterplot -->
            <div ref="scatterplot"></div>
        
            <!-- Display Selected Point ID -->
            <div class="selected-point">
                <h3>Selected Point:</h3>
                <p v-if="selectedPoint !== null">ID: {{ selectedPoint }}</p>
                <p v-else>Click on a point to see its ID.</p>
            </div>
        </template>
        </DefaultTask>
</template>
  
  <script>
  import DefaultTask from "@/components/Tasks/DefaultTask.vue";
  import * as d3 from "d3";
  
  export default {
    components: { DefaultTask},
    data() {
      return {
        dataset: [],
        numericalAttributes: ["Height", "Weight", "Reaction Time", "Memory Score", "Logical Thinking"],
        categoricalAttributes: ["Favorite Hobby", "Preferred Drink", "Time of Day Preference"],
        selectedX: "Height",
        selectedY: "Weight",
        selectedColor: "Favorite Hobby",
        selectedPoint: null,
      };
    },
    watch: {
      selectedX() {
        this.drawScatterplot();
      },
      selectedY() {
        this.drawScatterplot();
      },
      selectedColor() {
        this.drawScatterplot();
      },
    },
    mounted() {
      this.generateData();
      this.drawScatterplot();
    },
    methods: {
      generateData() {
        // Generate normal data
        this.dataset = Array.from({ length: 39 }, (_, id) => ({
          id: id + 1,
          Height: Math.floor(Math.random() * 50) + 150, // 150-200 cm
          Weight: Math.floor(Math.random() * 40) + 50, // 50-90 kg
          "Reaction Time": Math.floor(Math.random() * 100) + 200, // 200-300 ms
          "Memory Score": Math.floor(Math.random() * 40) + 60, // 60-100
          "Logical Thinking": Math.floor(Math.random() * 40) + 60, // 60-100
          "Favorite Hobby": ["Sports", "Music", "Reading"][Math.floor(Math.random() * 3)],
          "Preferred Drink": ["Tea", "Coffee", "Juice"][Math.floor(Math.random() * 3)],
          "Time of Day Preference": ["Morning", "Afternoon", "Evening"][Math.floor(Math.random() * 3)],
        }));
  
        // Add an extreme outlier
        this.dataset.push({
          id: 40,
          Height: 250, // Extreme value
          Weight: 20, // Extreme value
          "Reaction Time": 600, // Extreme value
          "Memory Score": 10, // Extreme value
          "Logical Thinking": 10, // Extreme value
          "Favorite Hobby": "Sports",
          "Preferred Drink": "Juice",
          "Time of Day Preference": "Morning",
        });
      },
      drawScatterplot() {
        if (!this.selectedX || !this.selectedY || !this.selectedColor) return;
  
        const margin = { top: 20, right: 30, bottom: 50, left: 50 };
        const width = 500 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
  
        d3.select(this.$refs.scatterplot).selectAll("*").remove();
  
        const svg = d3
          .select(this.$refs.scatterplot)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
  
        // Scales
        const xScale = d3.scaleLinear()
          .domain(d3.extent(this.dataset, (d) => d[this.selectedX]))
          .range([0, width]);
  
        const yScale = d3.scaleLinear()
          .domain(d3.extent(this.dataset, (d) => d[this.selectedY]))
          .range([height, 0]);
  
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
          .domain([...new Set(this.dataset.map(d => d[this.selectedColor]))]);
  
        // Axes
        svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(xScale));
        svg.append("text")
          .attr("x", width/2)
          .attr("y", height*1.1)
          .attr("class", "axis-label")
          .style("text-anchor", "middle")
          .text(this.selectedX);
  
        svg.append("g").call(d3.axisLeft(yScale));
        svg.append("text")
          .attr("x", -30)
          .attr("y", height/2)
          .attr("class", "axis-label")
          .text(this.selectedY)
          .style("writing-mode", "sideways-lr")
          .style("text-anchor", "middle");
  
        // Scatterplot points
        const circles = svg.selectAll("circle")
          .data(this.dataset)
          .enter()
          .append("circle")
          .attr("cx", (d) => xScale(d[this.selectedX]))
          .attr("cy", (d) => yScale(d[this.selectedY]))
          .attr("r", d => d.id === this.selectedPoint ? 10 : 6) // Highlight selected point
          .attr("fill", (d) => colorScale(d[this.selectedColor]))
          .attr("stroke", (d) => d.id === this.selectedPoint ? "black" : "none")
          .style("cursor", "pointer")
          .style("opacity", (d) => d.id === this.selectedPoint ? 1.0 : 0.8)
          .on("click", (event, d) => this.selectPoint(d));
      },
      selectPoint(d) {
        this.selectedPoint = d.id;
        this.drawScatterplot();
      }
    }
  };
  </script>