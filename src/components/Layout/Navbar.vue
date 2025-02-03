<template>
  <div class="w3-top">
    <div class="w3-bar w3-red w3-card w3-left-align w3-large">
      <!-- Toggle Button for Small Screens -->
      <button 
        class="w3-bar-item w3-button w3-hide-large w3-right w3-padding-large w3-red" 
        @click="toggleMenu"
      >
        <i class="fa fa-bars"></i>
      </button>

      <!-- Navbar Links -->
      <router-link to="/Daten-Krimi/" class="w3-bar-item w3-button w3-padding-large" :class="{'w3-white': isActive('/Daten-Krimi/')}">Home</router-link>
      <router-link to="/Daten-Krimi/task1" class="w3-bar-item w3-button w3-padding-large w3-hide-small" :class="{'w3-white': isActive('/Daten-Krimi/task1')}">Task 1</router-link>
      <router-link to="/Daten-Krimi/task2" class="w3-bar-item w3-button w3-padding-large w3-hide-small" :class="{'w3-white': isActive('/Daten-Krimi/task2')}">Task 2</router-link>
      <router-link to="/Daten-Krimi/task3" class="w3-bar-item w3-button w3-padding-large w3-hide-small" :class="{'w3-white': isActive('/Daten-Krimi/task3')}">Task 3</router-link>
      <router-link to="/Daten-Krimi/task4" class="w3-bar-item w3-button w3-padding-large w3-hide-small" :class="{'w3-white': isActive('/Daten-Krimi/task4')}">Task 4</router-link>
    </div>

    <!-- Dropdown Menu for Small Screens -->
    <div v-if="menuOpen" class="w3-bar-block w3-white w3-hide-large">
      <router-link to="/Daten-Krimi/" class="w3-bar-item w3-button w3-padding-large" @click="closeMenu">Home</router-link>
      <router-link to="/Daten-Krimi/task1" class="w3-bar-item w3-button w3-padding-large" @click="closeMenu">Task 1</router-link>
      <router-link to="/Daten-Krimi/task2" class="w3-bar-item w3-button w3-padding-large" @click="closeMenu">Task 2</router-link>
      <router-link to="/Daten-Krimi/task3" class="w3-bar-item w3-button w3-padding-large" @click="closeMenu">Task 3</router-link>
      <router-link to="/Daten-Krimi/task4" class="w3-bar-item w3-button w3-padding-large" @click="closeMenu">Task 4</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const menuOpen = ref(false);

    const isActive = (path) => route.path === path;
    const toggleMenu = () => (menuOpen.value = !menuOpen.value);
    const closeMenu = () => (menuOpen.value = false);

    return { isActive, menuOpen, toggleMenu, closeMenu };
  }
};
</script>