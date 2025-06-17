<template>
        <DefaultTask>
        <template #description>
            <h1>Task 1: Identify the Villain</h1>
            <p>Analyze the scatterplot matrix below to find the outlier—this is the villain!</p>
            </template>
        <template #explanation>
            <h1>Scatterplot</h1>
            <p>
              <strong>Scatterplot</strong> is a data visualization technique used to display the relationship between two numerical variables. Each data point is represented as a mark (dot) positioned along the X and Y axes according to its values for the selected attributes.
            </p>
            <ul>
              <li><strong>Data Types:</strong> Quantitative (numerical) variables for X and Y axes; optional categorical variable for color encoding.</li>
              <li><strong>Marks:</strong> Points (dots) representing individual data records.</li>
              <li><strong>Channels:</strong> Position (X and Y) for numerical attributes; color for categorical grouping.</li>
            </ul>
            <p>
              <strong>Pros:</strong> Simple and effective for identifying patterns, trends, clusters, and outliers in two variables.<br>
              <strong>Cons:</strong> Can become cluttered with large datasets; limited to visualizing relationships between two (or three, with color) variables at a time.
            </p>
            </template>
        <template #use>
            <h1>How to Use</h1>
            <p>Select the attributes for the X and Y axes, and choose a categorical attribute for color encoding. Click on a point in the scatterplot to see its ID.</p>
            <p>Use the dropdown menus to change the attributes displayed on the X and Y axes, and the color of the points. The scatterplot will update automatically to reflect your selections.</p>
            <p>Look for the point that stands out significantly from the others—this is the outlier or "villain" in the dataset.</p>
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
        numericalAttributes: [
          "Reaction Time",
          "Memory Score",
          "Creativity",
          "Self Defense",
          "Manipulation",
          "Lock Picking"
        ],
        categoricalAttributes: [
          "Alibi Strength",
          "Motive",
          "Suspect Group"
        ],
        selectedX: "Reaction Time",
        selectedY: "Memory Score",
        selectedColor: null,
        selectedPoint: null,
        // For color mapping
        colorScales: {
          "Alibi Strength": d3.scaleOrdinal()
            .domain(["None", "Weak", "Average", "Strong", "Unbreakable"])
            .range(d3.schemeSet1),
          "Motive": d3.scaleOrdinal()
            .domain(["Revenge", "Greed", "Jealousy", "Power", "Unknown"])
            .range(d3.schemeSet2),
          "Suspect Group": d3.scaleOrdinal()
            .domain(["Staff", "Guest", "Family", "Outsider", "Unknown"])
            .range(d3.schemeSet3),
        }
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
      // Helper for normal distribution
      randomNormal(mean, std) {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      },
      generateData() {
        const alibiOptions = ["None", "Weak", "Average", "Strong", "Unbreakable"];
        const motiveOptions = ["Revenge", "Greed", "Jealousy", "Power", "Unknown"];
        const groupOptions = ["Staff", "Guest", "Family", "Outsider", "Unknown"];
        // Generate 39 normal entries
        this.dataset = Array.from({ length: 39 }, (_, id) => ({
          id: id + 1,
          "Reaction Time": Math.round(this.randomNormal(250, 20)),
          "Memory Score": Math.round(this.randomNormal(80, 10)),
          "Creativity": Math.round(this.randomNormal(70, 15)),
          "Self Defense": Math.round(this.randomNormal(60, 12)),
          "Manipulation": Math.round(this.randomNormal(50, 10)),
          "Lock Picking": Math.round(this.randomNormal(40, 8)),
          "Alibi Strength": alibiOptions[Math.floor(Math.random() * alibiOptions.length)],
          "Motive": motiveOptions[Math.floor(Math.random() * motiveOptions.length)],
          "Suspect Group": groupOptions[Math.floor(Math.random() * groupOptions.length)],
        }));

        // Add an extreme outlier (the villain)
        this.dataset.push({
          id: 40,
          "Reaction Time": 600,
          "Memory Score": 10,
          "Creativity": 10,
          "Self Defense": 10,
          "Manipulation": 100,
          "Lock Picking": 100,
          "Alibi Strength": "None",
          "Motive": "Revenge",
          "Suspect Group": "Outsider"
        });
      },
      drawScatterplot() {
        if (!this.selectedX || !this.selectedY) return;

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

        // Color: use selected categorical attribute if set
        let color = "#1f77b4";
        if (this.selectedColor && this.colorScales[this.selectedColor]) {
          color = d => this.colorScales[this.selectedColor](d[this.selectedColor]);
        }

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
        svg.selectAll("circle")
          .data(this.dataset)
          .enter()
          .append("circle")
          .attr("cx", (d) => xScale(d[this.selectedX]))
          .attr("cy", (d) => yScale(d[this.selectedY]))
          .attr("r", d => d.id === this.selectedPoint ? 10 : 6)
          .attr("fill", color)
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