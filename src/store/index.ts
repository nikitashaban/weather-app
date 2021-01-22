import { createStore} from 'vuex'

import { getCityWeather } from '../api/cities'


interface City {
  base: string;
  clouds: {
      all: number;
  };
  cod: number;
  coord: {
      lon: number;
      lat: number;
  };
  dt: number;
  id: number;
  main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: Array<{
    escription: string;
    icon: string;
    id: number;
    main: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
}

export interface State {
  cities: Array<City>;
}



export const store = createStore<State>({
  state: {
    cities: []
  },
  mutations: {
    setCities(state, value) {
      state.cities = value
    },
    addCity(state, value) {
      localStorage.setItem('cities', JSON.stringify([...state.cities, value]))
      state.cities.push(value)
    },
    deleteCity(state, index) {
      state.cities.splice(index, 1)
      localStorage.setItem('cities', JSON.stringify(state.cities))
    }
  },
  actions: {
    setCities(context, value) {
      context.commit('setCities', value)
    },
    async addCity(context, value) { 
      const result = await getCityWeather(value)
      if(result.cod !== 200) {
        throw new Error('Something went wrong')
      }
      context.commit('addCity', result)
    },
    deleteCity(context, value) {
      const cityIndex = context.state.cities.findIndex((c) => c.id === value);
      if (cityIndex !== -1) {
        context.commit('deleteCity', cityIndex)
      }
    
    }
  },
  getters: {
    cities: (state) => {
      return state.cities
    },
  }
})
