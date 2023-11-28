<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-semibold mb-8">
      <img src="@/assets/logo.svg" class="hover:animate-wobble inline h-10" alt="Beer logo" />
      Beers
    </h1>

    <form class="w-2/3 mx-auto text-left mb-16 flex space-x-6" autocomplete="off">
      <div class="flex-grow">
        <label class="block mb-2" for="beers-filter">Filter beers</label>
        <input v-model="beerQuery" id="beers-filter" type="text"
          class="w-full shadow border border-gray-300 p-3 rounded" />
      </div>
      <div class="flex-grow">
        <label class="block mb-2" for="beers-sort">Sort</label>
        <select v-model="sortBy" id="beers-sort" class="w-full shadow border border-gray-300 p-3 rounded">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div class="flex-grow">
        <label class="block mb-2" for="beers-sort">Pagination</label>
        <select v-model.number="perPage" type="number" id="beers-per-page"
          class="relative inline-flex items-center px-4 py-2 shadow border border-gray-300 p-3 rounded">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <a @click="prevPage" href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous </a>
        <a @click="nextPage" href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next </a>
      </div>

    </form>
    <div class="grid grid-cols-12 gap-8 relative">
      <div class="space-y-8 col-span-8">
        <BeerItem v-for="beer of sortedBeers" :key="beer.id" :id="beer.id" :name="beer.name"
          :description="beer.description" />
      </div>
      <div class="col-span-4">
        <div class="sticky top-0">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderBy } from 'lodash';
import { ref, computed, watch, onMounted } from 'vue';
import { getBeers } from '@/api/beerApi.js';
import BeerItem from './components/BeerItem.vue';

const useBeersSort = beers => {
  const sortBy = ref('asc');
  const sortedBeers = computed(() => orderBy(beers.value, ['name'], [sortBy.value]));
  return { sortBy, sortedBeers };
};

const useBeersFilter = beers => {
  const beerQuery = ref('');
  const filteredBeers = computed(() => {
    if (!beerQuery.value) return beers.value;

    const query = beerQuery.value.toLowerCase();
    return beers.value.filter(({ name }) =>
      name.toLowerCase().includes(query)
    );
  });

  return {
    beerQuery,
    filteredBeers,
  };
};

export default {
  components: {
    BeerItem,
  },
  setup() {
    const beers = ref([]);
    const page = ref(1);
    const perPage = ref(10);
    const { beerQuery, filteredBeers } = useBeersFilter(beers);
    const { sortBy, sortedBeers } = useBeersSort(filteredBeers);

    const prevPage = () => {
      if (page.value > 1)
        page.value--
    };
    const nextPage = () => page.value++;

    const doGetBeers = async () => {
      beers.value = await getBeers({ page: page.value, perPage: perPage.value });
    };

    watch([page, perPage], doGetBeers);

    watch(beerQuery, (newQuery, oldQuery) => {
      console.log(`New query: ${newQuery}. Old Query: ${oldQuery}`);
    });

    onMounted(() => {
      doGetBeers();
    });

    return {
      beers,
      beerQuery,
      sortBy,
      filteredBeers,
      sortedBeers,
      perPage,
      prevPage,
      nextPage,
    };
  },
};
</script>