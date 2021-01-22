<template>
  <Card class="content">
    <template #content>
      <component
        :is="currentView"
        @set-current-view="setCurrentView"
      ></component>
    </template>
  </Card>
  <Toast position="top-center" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { getCurrentWeather } from "./utils/gelocation";
import Toast from "primevue/toast";
import Card from "primevue/card";
import Weather from "./views/Weather.vue";
import Settings from "./views/Settings.vue";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  components: {
    Card,
    Weather,
    Settings,
    Toast
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const state = reactive({
      currentView: "weather"
    });

    onMounted(async () => {
      try {
        const currentWeather = await getCurrentWeather();
        const currentWeatherExists = store.getters.cities.findIndex(
          (c: typeof store.state.cities[0]) => currentWeather.id === c.id
        );
        if (currentWeather && currentWeatherExists === -1) {
          store.commit("addCity", currentWeather);
        }
      } catch {
        toast.add({
          severity: "info",
          summary: "Info",
          detail: "Your location is not accesable",
          life: 3000
        });
      }
    });

    const cachedCities = localStorage.getItem("cities");
    if (cachedCities) {
      store.dispatch("setCities", JSON.parse(cachedCities));
    }

    const setCurrentView = (view: string) => (state.currentView = view);

    return { ...toRefs(state), setCurrentView };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  height: 100vh;
}
.content {
  height: auto;
  min-height: 8rem;
  width: 50%;
  margin: 0 auto;
}

i {
  cursor: pointer;
}
</style>
