<template>
  <div class="weather">
    <i class="pi pi-cog" @click="changeView"></i>
    <p v-if="!cities.length">
      Please select cities in settings to receive information about the weather
    </p>
    <weather-item
      v-else
      v-for="city in cities"
      :key="city.id"
      :name="city.name"
      :main="city.main"
      :wind="city.wind"
      :weather="city.weather"
    ></weather-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import WeatherItem from "../components/WeatherItem.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    WeatherItem
  },
  name: "Weather",
  emits: ["set-current-view"],
  setup(props, { emit }) {
    const store = useStore();

    const cities = computed(() => store.getters.cities);

    const changeView = () => emit("set-current-view", "settings");

    return { changeView, cities };
  }
});
</script>

<style lang="scss" scoped>
.weather {
  width: 100%;
  height: 100%;
  position: relative;
  & > i {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
