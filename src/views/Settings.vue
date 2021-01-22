<template>
  <div class="settings">
    <i class="pi  pi-times" @click="changeView"></i>
    <h5 class="settings-title">Settings</h5>
    <draggable handle=".pi-bars" v-model="cities" class="settings-items">
      <transition-group>
        <div v-for="city in cities" :key="city.id">
          <i class="pi pi-bars"></i>
          {{ city.name }}
          <i class="pi   pi-trash" @click="removeCity(city.id)"></i>
        </div>
      </transition-group>
    </draggable>
    <div class="settings-menu">
      <span class="p-float-label">
        <InputText id="city" type="text" v-model="newCityName" />
        <label for="city">Add location</label>
      </span>
      <Button icon="pi pi-check" @click="addNewCity" :disabled="!newCityName" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  name: "Settings",
  components: {
    draggable: VueDraggableNext,
    InputText,
    Button
  },
  emits: ["set-current-view"],
  setup(props, { emit }) {
    const store = useStore();
    const toast = useToast();

    const newCityName = ref("");

    const cities = computed({
      get: () => store.getters.cities,
      set: (val: typeof store.state.cities) => store.dispatch("setCities", val)
    });
    const changeView = () => emit("set-current-view", "weather");
    const addNewCity = async () => {
      const cityExists = store.getters.cities.find(
        (c: typeof store.state.cities[0]) =>
          c.name.toLowerCase() === newCityName.value.toLowerCase()
      );
      if (cityExists) {
        toast.add({
          severity: "error",
          summary: "City is already added",
          life: 3000
        });
        newCityName.value = "";
        return;
      }
      try {
        await store.dispatch("addCity", newCityName.value);
        toast.add({
          severity: "success",
          summary: "City successfully added",
          life: 3000
        });
      } catch {
        toast.add({
          severity: "error",
          summary: "Not Found",
          detail: "There is no such city in our service",
          life: 3000
        });
      }
      newCityName.value = "";
    };

    const removeCity = (id: string) => {
      store.dispatch("deleteCity", id);
      toast.add({
        severity: "success",
        summary: "City successfully deleted",
        detail: "There is no such city in our service",
        life: 3000
      });
    };

    return { changeView, cities, newCityName, addNewCity, removeCity };
  }
});
</script>

<style lang="scss" scoped>
.settings {
  width: 100%;
  height: 100%;
  position: relative;
  & > i {
    position: absolute;
    top: 0;
    right: 0;
  }

  &-title {
    margin: 0 0 1rem 0;
    text-align: left;
    font-size: 20px;
  }

  &-items {
    margin-bottom: 2rem;

    & > div {
      background: rgb(237, 235, 233);
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      & i:first-child {
        margin-right: 0.5rem;
      }
      & i:nth-child(2) {
        margin-left: auto;
      }
    }
  }

  &-menu {
    width: 50%;
    display: flex;
    margin: 0 auto;
    & > span {
      width: 100%;
      & input {
        width: 100%;
      }
      margin-right: 0.5rem;
    }
  }
}
</style>
