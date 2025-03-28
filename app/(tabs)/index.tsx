

import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_KEY = "NS27FSG8Z43KS73F65ETURXMT"; // API KEY from visualcrossing

const WeatherViewModel = {
  fetchWeather: async (city) => {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${API_KEY}&contentType=json`
     
      );
      await AsyncStorage.setItem("lastWeather", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      return null;
    }
  },
  getCachedWeather: async () => {
    const data = await AsyncStorage.getItem("lastWeather");
    return data ? JSON.parse(data) : null;
  },
};


const WeatherScreen = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadCachedWeather = async () => {
      const cachedData = await WeatherViewModel.getCachedWeather();
      if (cachedData) setWeather(cachedData);
    };
    loadCachedWeather();
  }, []);

  const searchWeather = async () => {
    if (!city) return;
    setLoading(true);
    const data = await WeatherViewModel.fetchWeather(city);
    if (data) setWeather(data);
    setLoading(false);
  };
  const onRefresh = useCallback(async () => {
    if (!city) return;
    setRefreshing(true);
    const data = await WeatherViewModel.fetchWeather(city);
    if (data) setWeather(data);
    setRefreshing(false);
  }, [city]);

  return (
    <ScrollView
    contentContainerStyle={styles.container}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  >
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search weather" onPress={searchWeather} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.text}>Temperature: {weather?.currentConditions?.temp}°C</Text>
          <Text style={styles.text}>Humidity: {weather?.currentConditions?.humidity}%</Text>
          <Text style={styles.text}>Wind Speed: {weather?.currentConditions?.windspeed} m/s</Text>
          <Text style={styles.text}>Description: {weather?.description} m/s</Text>
         
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 50},
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  weatherContainer: { marginTop: 20 },
  text: { fontSize: 18, marginBottom: 5 },
});

export default WeatherScreen;
