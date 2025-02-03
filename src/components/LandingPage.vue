<template>
  <header class="w3-container w3-red w3-center" style="padding:128px 16px">
    <h1 class="w3-margin w3-jumbo">Welcome to the Crime Investigation Game</h1>
    <p class="w3-xlarge">Subtitel</p>
    <a href="#StartGame" class="w3-button w3-black w3-padding-large w3-large w3-margin-top">Start the mission!</a>
  </header>
  <main>
    <div id="StartGame">
      <h1>Welcome to the Crime Investigation Game</h1>
      <p>Your mission is to find the villain, their accomplice, and their hiding place.</p>
      <p>Complete all four tasks to solve the mystery!</p>
      <ul>
        <li><router-link to="/Daten-Krimi/task1">Task 1: Identify the Villain</router-link></li>
        <li><router-link to="/Daten-Krimi/task2">Task 2: Find the Accomplice</router-link></li>
        <li><router-link to="/Daten-Krimi/task3">Task 3: Locate the Hiding Place</router-link></li>
        <li><router-link to="/Daten-Krimi/task4">Task 4: Disable the Timer</router-link></li>
        <li><router-link to="/Daten-Krimi/task">Task</router-link></li>
      </ul>
    </div>
  </main>
</template>

<style>

</style>