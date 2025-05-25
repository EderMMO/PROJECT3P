import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

export default function AboutScreen() {
  return (
    <ImageBackground
      source={require("../images/Fondo_1.jpg")} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentBox}>
          <Text style={styles.title}>Galería de Arte</Text>
          <Text style={styles.subtitle}>Acerca de la Aplicación</Text>

          <Text style={styles.paragraph}>
            Esta aplicación es una galería de arte que permite explorar obras de pintores famosos a lo largo de la historia. 
            Podrás descubrir detalles, guardar tus obras favoritas y aprender más sobre grandes artistas y sus creaciones.
          </Text>

          <Text style={[styles.subtitle, { marginTop: 30 }]}>Desarrolladores</Text>
          <Text style={styles.paragraph}>Oscar Eduardo</Text>
          <Text style={styles.paragraph}>Rufino Botello</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  contentBox: {
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 7,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    textAlign: "center",
  },
});
