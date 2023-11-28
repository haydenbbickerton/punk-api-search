<template>
  <div class="flex space-x-8">
    <div class="flex flex-col items-start text-left">
      <h2 class="text-xl font-semibold mt-4 cursor-pointer hover:text-blue-500">
        <router-link :to="`/beer/${id}`"> {{ name }}</router-link>
      </h2>
      <span class="text-gray-500 mb-4">{{ description }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
};
</script>