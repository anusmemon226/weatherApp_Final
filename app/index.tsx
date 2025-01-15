import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { useStore } from '../store'


const Home = () => {
    const [city, setCity] = useState("")
    const [location, setLocation] = useState({
        latitude: "",
        longitude: ""
    })
    const {setInputCity,setInputLocation} = useStore()
    const runQuery = () => {
        if (location.latitude != "" && location.longitude != "") {
            setInputLocation(location)
            router.push("./currentWeather")
        }else if(city != ""){
            setInputCity(city)
            router.push("./currentWeather")
        } 
        else {
            Alert.alert("Error", "Please Input City or Location Coordinates")
        }
    }
    return (
        <View className='flex justify-center items-center h-full bg-white'>
            <Image source={require("../assets/weather.png")} />
            <View className='w-full px-3'>
                <TextInput onChangeText={(val) => setLocation({ ...location, latitude: val })} inputMode='decimal' value={location.latitude} className='border border-gray-400 m-3' placeholder='Enter Latitude' />
                <TextInput onChangeText={(val) => setLocation({ ...location, longitude: val })} inputMode='decimal' value={location.longitude} className='border border-gray-400 m-3' placeholder='Enter Longitude' />
                <Text className='text-center m-3'>OR</Text>
                <TextInput onChangeText={(val) => setCity(val)} inputMode='text' value={city} className='border border-gray-400 m-3' placeholder='Enter City Name' />
                <TouchableOpacity onPress={runQuery} className='p-3 bg-red-400 m-3 mt-10 border border-gray-400 rounded-md'><Text className='text-center text-xl text-white'>Next</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default Home