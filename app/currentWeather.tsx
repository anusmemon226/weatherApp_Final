import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useStore } from '../store'
import { router } from 'expo-router'
import { useQuery } from '@tanstack/react-query'

const API_KEY = "0fc1f1c60959468f84a43027251501"

const currentWeather = () => {
    const { city, location, setWeather } = useStore()
    const fetchWeatherDetails = async () => {
        let url = ""
        if (city != "") {
            url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=10&aqi=no`
        } else if (location.latitude != "" && location.longitude != "") {
            url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location?.latitude},${location?.longitude}&days=10&aqi=no`
        }
        const weatherDetails = await fetch(url)
        const resp = await weatherDetails.json()
        return resp
    }
    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['weather'],
        queryFn: fetchWeatherDetails
    })

    useEffect(() => {
        setWeather(data)
    }, [data])

    if (isPending) {
        return <ActivityIndicator size={"large"}></ActivityIndicator>
    }


    return (
        <View className='h-full'>
            <View className='flex justify-center items-center h-[85%]'>
                <Image source={{ uri: `${data?.current.condition.icon}` }} alt='Weather Icon' />
                <View className='my-3 flex items-center'>
                    <Text className=''>Latitude : {data.location.lat}</Text>
                    <Text>Longitude : {data?.location.lon}</Text>
                </View>
                <View className='my-3'>
                    <Text className='text-2xl text-center px-3'>{data?.location.name}, {data?.location.region}, {data?.location.country}</Text>
                </View>
                <View className='flex items-center my-3'>
                    <Text className='text-[50px] font-bold'>{data?.current.temp_c}°C</Text>
                    <Text className='text-lg'>Feel Like: {data?.current.feelslike_c}°C</Text>
                </View>
                <View className='flex items-center my-3'>
                    <Text className='text-lg'>Humidity : {data?.current.humidity}</Text>
                    <Text className='text-lg'>Wind Speed : {data?.current.wind_kph} km/h</Text>
                    <Text className='text-lg'>Cloud : {data?.current.cloud}%</Text>
                </View>
            </View>
            <View className='w-full px-3 h-[15%]'>
                <TouchableOpacity onPress={() => router.push("./weatherForecast")} className='p-3 bg-red-400 m-3 border border-gray-400 rounded-md'><Text className='text-center text-xl text-white'>Next</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default currentWeather