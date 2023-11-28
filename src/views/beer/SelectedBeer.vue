<template>
  <div class="text-left pt-4">
    <h2 class="text-xl font-semibold mb-4">Selected beer</h2>
    <div v-if="hasBeer">
      <h3 class="text-lg mb-4 border-b pb-3">{{ beer.name }}</h3>
      <div class="mb-4">{{ beer.description }}</div>
      <div class="output">
        <pre><code class="jsontext" v-html="jsonOutput"></code></pre>
      </div>
    </div>
    <p v-else>No beer selected</p>
  </div>
</template>

<script>
import { isNil } from 'lodash';
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBeerById } from '@/api/beerApi.js';


const formatJson = data => {
  try {
    jsonInput.value = JSON.stringify(JSON.parse(data), null, 4);
  } catch (e) {
    alert("Invalid JSON");
  }
};

export default {
  setup() {
    const beer = ref(null);
    const route = useRoute();
    const hasBeer = computed(() => !isNil(beer.value && beer.value.id));
    const jsonOutput = computed(() => hasBeer.value ? JSON.stringify(beer.value, undefined, 4) : "");

    const initGetBeerById = async id => {
      beer.value = await getBeerById(id);
    };

    watch(() => route.params.id, initGetBeerById);

    onMounted(() => {
      initGetBeerById(route.params.id);
    });

    return {
      beer,
      hasBeer,
      jsonOutput
    };
  },
};
</script>

<style scoped>
.output {
  overflow: auto;
  width: 100%;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

.jsontext {
  border: none;
  resize: none;
  outline: none;
  display: block;
  height: 200px;
  width: 100%;
  background-color: #f6f6f6;
  padding: 0px;
  margin: 0px;
}
</style>