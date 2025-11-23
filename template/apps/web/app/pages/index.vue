<script setup lang="ts">
const { data, status, error } = await useFetch(useBaseUrl("/"));
</script>

<template>
  <div>
    <h1>Welcome to Your Vue.js App</h1>
    <p>This is a simple Vue.js application setup.</p>

    <p v-if="status == 'idle'">Data loading</p>
    <p v-else-if="status == 'error'">Error: {{ error }}</p>
    <p v-else>Data: {{ data }}</p>
  </div>
</template>
