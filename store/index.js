import { create } from 'zustand'


export const useStore = create((set) => ({
    city:"",
    location:{latitude:"",longitude:""},
    weather : {},
    setInputCity: (city)=>{
        set({city:city})
    },
    setInputLocation:(inputLocation)=>{
        set({location:{latitude:inputLocation.latitude,longitude:inputLocation.longitude}})
    },
    setWeather : (weatherDetails)=>{
        set({weather:weatherDetails})
    }
}))