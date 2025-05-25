import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import UploadArtScreen from "../screens/UploadArtScreen";
import WikiArtScreen from "../screens/WikiArtScreen";
import ArtistDetailScreen from "../screens/ArtistDetailScreen";
import DetailScreen from "../screens/DetailScreen";
import LoginScreen from "../screens/LoginScreen";
import AboutScreen from "../screens/AboutScreen";

import Feather from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="image" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Subir Arte"
        component={UploadArtScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="upload" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="WikiArt"
        component={WikiArtScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="book-open" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Acerca de"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="info" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
    </Stack.Navigator>
  );
}
