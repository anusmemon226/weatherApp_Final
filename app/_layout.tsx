import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import "../global.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
export const queryClient = new QueryClient()

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='currentWeather' />
        <Stack.Screen name='weatherForecast' />
      </Stack>
    </QueryClientProvider>
  )
}

export default RootLayout