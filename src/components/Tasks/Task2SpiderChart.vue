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
    <h2>Task 2: Find the Accomplice</h2>
    <p>Compare the skills of the villain with potential accomplices. Find the best match to cover all skill dimensions!</p>
    <canvas id="radarChart"></canvas>
  </div>
  <div class="navigation">
      <button @click="$router.push('/Daten-Krimi/')">Back to Landing Page</button>
      <button @click="$router.push('/Daten-Krimi/task1')">Previous Task</button>
      <button @click="$router.push('/Daten-Krimi/task3')">Next Task</button>
  </div>
  </template>
  </DefaultTask>
</template>

<script>
import DefaultTask from "@/components/Tasks/DefaultTask.vue";
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default {
  components: { DefaultTask, Radar },
  mounted() {
    const ctx = document.getElementById("radarChart").getContext("2d");

    const villainSkills = [90, 70, 80, 50, 60];
    const accompliceSkills = [
      [50, 40, 20, 70, 80],
      [40, 60, 90, 30, 50],
      [80, 70, 50, 60, 90], // Best match
    ];

    const radarChart = new ChartJS(ctx, {
      type: "radar",
      data: {
        labels: ["Strength", "Stealth", "Hacking", "Strategy", "Charisma"],
        datasets: [
          {
            label: "Villain",
            data: villainSkills,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
          {
            label: "Accomplice 1",
            data: accompliceSkills[0],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          },
          {
            label: "Accomplice 2",
            data: accompliceSkills[1],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
          {
            label: "Accomplice 3",
            data: accompliceSkills[2],
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 2,
          },
        ],
      },
    });
  },
};
</script>

<style>
#radarChart {
  max-width: 600px;
  margin: 0 auto;
}
</style>
