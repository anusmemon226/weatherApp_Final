import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useStore } from '../store'

const weatherForecast = () => {
    const { weather } = useStore()
    const renderWeatherCard = ({item}:{item:any})=>{
        const date = new Date(item.date)
        let currentDay = ""
        if(date.getDay()==0){
            currentDay = "Monday"
        }else if(date.getDay()==1){
            currentDay = "Tuesday"
        }else if(date.getDay()==2){
            currentDay = "Wednesday"
        }else if(date.getDay()==3){
            currentDay = "Thursday"
        }else if(date.getDay()==4){
            currentDay = "Friday"
        }else if(date.getDay()==5){
            currentDay = "Saturday"
        }else if(date.getDay()==6){
            currentDay = "Sunday"
        }
        return (
            <View className='bg-yellow-200 py-4 my-2 mx-6 rounded-lg'>
                <Text className='text-center'>{currentDay}</Text>
                <View className='flex flex-row justify-evenly mx-4 py-3'>
                    <Text>Minimum: {item.day.mintemp_c}°C</Text>
                    <Text>Maximum: {item.day.maxtemp_c}°C</Text>
                </View>
                <Text className='text-center text-lg'>Will it rain ? {item.will_it_rain == 0 ? "Yes" : "No"}</Text>
                <Text className='text-center text-lg'>Condition: {item.day.condition.text}</Text>
            </View>
        )
    }

    return (
        <View className='flex items-center h-full'>
            <View className='py-5'>
                <Text className='text-center text-xl bg-gray-600 px-5 py-2 text-white rounded-xl'>Daily</Text>
            </View>
            <View className='w-full mb-40'>
                <FlatList data={weather.forecast.forecastday} renderItem={renderWeatherCard}/>
            </View>
        </View>
    )
}

export default weatherForecast