import {getCoordWeather} from '../api/cities'

interface Position {
  coords: {latitude: number; longitude: number; accuracy: number};
}


const  getLongAndLat = (): Promise<Position> => {
  return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

export const getCurrentWeather = async () => {
  const coordinates: Position = await getLongAndLat();
  const lat = coordinates?.coords?.latitude
  const long = coordinates?.coords?.longitude
  try {
    if (lat && long) {
      const coordWeather = await getCoordWeather([lat, long]);
      return coordWeather   
    }
  } catch (err) {
    console.log(err);
  }
};



