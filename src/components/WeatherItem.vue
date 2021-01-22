<template>
  <div class="content">
    <h6>{{ name }}</h6>
    <div class="content-media">
      <img
        :src="`http://openweathermap.org/img/w/${weather[0].icon}.png`"
        alt="weather"
      />
      <p>{{ mainTemp }} ℃</p>
    </div>
    <p>Feels like {{ feelsTemp }} ℃. {{ main.escription }}</p>
    <div class="content-info">
      <span> {{ wind.speed }} m/s SSE</span>
      <span> {{ main.pressure }}hPa</span>
    </div>
    <div class="content-info">
      <span> Humidity: {{ main.humidity }}%</span>
      <span> Visibility: {{ 10000 }}m</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { convertKtoC } from "../utils/temperature";

export default defineComponent({
  name: "WeatherItem",
  props: ["name", "main", "weather", "wind"],
  setup(props) {
    const mainTemp = computed(() => convertKtoC(props.main.temp));
    const feelsTemp = computed(() => convertKtoC(props.main.feels_like));

    return { mainTemp, feelsTemp };
  }
});
</script>

<style lang="scss" scoped>
.content {
  font-size: 16px;
  text-align: start;
  margin-bottom: 0.75rem;
  & > h6 {
    text-align: left;
    font-size: 20px;
    margin: 0;
  }
  &-media {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-info {
    display: flex;
    justify-content: space-between;
  }
}
</style>
