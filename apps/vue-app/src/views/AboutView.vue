<script setup lang="ts">
import { useMainStore } from '../store';

const store = useMainStore();
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-primary">
      Hello Vue 3 + TypeScript + Bootstrap 5
    </h1>
    <p>Counter: {{ store.counter }}</p>
    <button
      class="btn btn-primary"
      @click="store.increment"
    >
      Increment
    </button>
  </div>
</template>
