const apiKey = '5f091a11cbbefa43e2175d620bd83c2b'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

export const getCityWeather = async (city: string) => {
  const results = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}`)
  const cityWeather = await results.json()
  return cityWeather
}

export const getCoordWeather = async (coordinates: Array<number>) => {
  const results = await fetch(`${baseUrl}?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${apiKey}`)
  const coordWeather = await results.json()
  return coordWeather
}